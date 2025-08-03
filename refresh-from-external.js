const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, remove, get } = require('firebase/database');
const https = require('https');
const crypto = require('crypto');

console.log('🚀 External content refresh script started at:', new Date().toISOString());

const firebaseConfig = {
  apiKey: "AIzaSyAru4IFHn19f2RQB3z8LFiGHr4PYynUkd8",
  authDomain: "russiantranslator-aa708.firebaseapp.com",
  databaseURL: "https://russiantranslator-aa708-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "russiantranslator-aa708",
  storageBucket: "russiantranslator-aa708.firebasestorage.app",
  messagingSenderId: "631900278460",
  appId: "1:631900278460:web:ac2ed8da7da1b856fc8ab9"
};

const app = initializeApp(firebaseConfig);
const rtdb = getDatabase(app);

function fetchContent() {
  return new Promise((resolve, reject) => {
    const url = 'https://raw.githubusercontent.com/prabhat76/russian-translator-content/master/data/content.json';
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const content = JSON.parse(data);
          resolve(content);
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`HTTP request failed: ${error.message}`));
    });
  });
}

async function refreshDatabase() {
  try {
    console.log('🔄 Starting database refresh from external repository...');
    
    // Fetch content from external repository
    console.log('📥 Fetching content from GitHub...');
    const contentData = await fetchContent();
    console.log('✅ Content fetched successfully');
    
    const enContent = contentData.en || {};
    const ruContent = contentData.ru || {};
    
    // Generate content hash for comparison
    const contentHash = crypto.createHash('md5').update(JSON.stringify({en: enContent, ru: ruContent})).digest('hex');
    console.log('📋 New content hash:', contentHash);
    
    console.log('📊 Content loaded:');
    console.log(`  EN sections: ${Object.keys(enContent).join(', ')}`);
    console.log(`  RU sections: ${Object.keys(ruContent).join(', ')}`);
    
    // Check current database content
    console.log('🔍 Checking current database content...');
    const currentData = await get(ref(rtdb, 'content'));
    console.log('Current data exists:', currentData.exists());
    
    const forceSync = process.argv.includes('--force');
    console.log('🔧 Force sync:', forceSync);
    
    let shouldUpdate = true;
    if (currentData.exists() && !forceSync) {
      const current = currentData.val();
      console.log('Current languages:', Object.keys(current));
      console.log('Current hash:', current.contentHash || 'none');
      console.log('Current version:', current.version || 'none');
      
      if (current.contentHash === contentHash) {
        console.log('⏭️ Content unchanged, skipping update');
        shouldUpdate = false;
      } else {
        console.log('🔄 Content changed, proceeding with update');
      }
    } else if (forceSync) {
      console.log('💪 Force sync enabled, updating regardless of changes');
    }
    
    if (!shouldUpdate) {
      console.log('✅ Sync completed - no changes needed');
      process.exit(0);
    }
    
    // Clear existing content first
    console.log('🗑️ Clearing existing content...');
    await remove(ref(rtdb, 'content'));
    console.log('✅ Content cleared');
    
    // Upload fresh content
    const newContent = {
      en: enContent,
      ru: ruContent,
      lastUpdated: new Date().toISOString(),
      version: Date.now(),
      source: 'external-repository',
      contentHash: contentHash,
      syncTrigger: forceSync ? 'force' : 'auto'
    };
    
    console.log('📤 Uploading fresh content...');
    await set(ref(rtdb, 'content'), newContent);
    console.log('✅ Content uploaded');
    
    // Verify upload
    console.log('🔍 Verifying upload...');
    const verifyData = await get(ref(rtdb, 'content'));
    if (verifyData.exists()) {
      const verified = verifyData.val();
      console.log('✅ Verification successful!');
      console.log('Verified languages:', Object.keys(verified));
      console.log('Last updated:', verified.lastUpdated);
      console.log('Version:', verified.version);
      console.log('Source:', verified.source);
    } else {
      throw new Error('Verification failed - no data found after upload');
    }
    
    console.log('🎉 Database refresh completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Database refresh failed:', error.message);
    console.error('Error details:', error);
    if (error.stack) console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

refreshDatabase();
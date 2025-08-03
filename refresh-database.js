const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, remove, get } = require('firebase/database');
const fs = require('fs');

console.log('🚀 Local refresh script started at:', new Date().toISOString());

const firebaseConfig = {
  apiKey: "AIzaSyAru4IFHn19f2RQB3z8LFiGHr4PYynUkd8",
  authDomain: "russiantranslator-aa708.firebaseapp.com",
  databaseURL: "https://russiantranslator-aa708-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "russiantranslator-aa708",
  storageBucket: "russiantranslator-aa708.firebasestorage.app",
  messagingSenderId: "631900278460",
  appId: "1:631900278460:web:ac2ed8da7da1b856fc8ab9"
};

console.log('🔧 Firebase config loaded:', {
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  projectId: firebaseConfig.projectId
});

const app = initializeApp(firebaseConfig);
const rtdb = getDatabase(app);
console.log('🔥 Firebase initialized successfully');

async function refreshDatabase() {
  try {
    console.log('🔄 Starting database refresh at:', new Date().toISOString());
    
    // Check if files exist
    console.log('📁 Checking files...');
    if (!fs.existsSync('data/en.json')) throw new Error('data/en.json not found');
    if (!fs.existsSync('data/ru.json')) throw new Error('data/ru.json not found');
    console.log('✅ Files exist');
    
    // Read content files
    console.log('📖 Reading content files...');
    const enContent = JSON.parse(fs.readFileSync('data/en.json', 'utf8'));
    const ruContent = JSON.parse(fs.readFileSync('data/ru.json', 'utf8'));
    
    console.log('📊 Content loaded:');
    console.log(`  EN sections: ${Object.keys(enContent).join(', ')}`);
    console.log(`  RU sections: ${Object.keys(ruContent).join(', ')}`);
    
    // Check current database content
    console.log('🔍 Checking current database content...');
    const currentData = await get(ref(rtdb, 'content'));
    console.log('Current data exists:', currentData.exists());
    if (currentData.exists()) {
      const current = currentData.val();
      console.log('Current languages:', Object.keys(current));
      console.log('Current version:', current.version || 'none');
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
      source: 'local-script'
    };
    
    console.log('📤 Uploading fresh content...');
    console.log('Upload payload keys:', Object.keys(newContent));
    
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
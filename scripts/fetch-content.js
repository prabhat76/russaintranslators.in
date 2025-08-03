const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('🔄 Fetching content during build...');

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
          
          // Ensure data directory exists
          const dataDir = path.join(__dirname, '../src/data');
          if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
          }
          
          // Write content to build-time file
          fs.writeFileSync(
            path.join(dataDir, 'build-content.json'), 
            JSON.stringify(content, null, 2)
          );
          
          console.log('✅ Content fetched and saved for build');
          console.log(`📊 Languages: ${Object.keys(content).join(', ')}`);
          
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

fetchContent()
  .then(() => {
    console.log('🎉 Build-time content fetch completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Build-time content fetch failed:', error.message);
    process.exit(1);
  });
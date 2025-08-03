// Test file to trigger GitHub Actions workflow
// This file helps verify that the workflow runs on data changes

const fs = require('fs');

console.log('🧪 Testing GitHub Actions trigger...');

// Read current data
const enData = JSON.parse(fs.readFileSync('data/en.json', 'utf8'));

// Add a test timestamp to trigger the workflow
enData._test_trigger = new Date().toISOString();

// Write back to trigger the workflow
fs.writeFileSync('data/en.json', JSON.stringify(enData, null, 2));

console.log('✅ Test trigger added to en.json');
console.log('📝 Commit and push this change to test the GitHub workflow');
#!/usr/bin/env node

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get, update, remove } = require('firebase/database');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyAru4IFHn19f2RQB3z8LFiGHr4PYynUkd8",
  authDomain: "russiantranslator-aa708.firebaseapp.com",
  databaseURL: "https://russiantranslator-aa708-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "russiantranslator-aa708"
};

const app = initializeApp(firebaseConfig);
const rtdb = getDatabase(app);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class ContentUploader {
  constructor() {
    this.supportedLanguages = ['en', 'ru'];
    this.supportedSections = ['nav', 'hero', 'about', 'services', 'gallery', 'contact', 'appointments'];
  }

  async showMenu() {
    console.log('\n🚀 Content Upload Manager');
    console.log('========================');
    console.log('1. Upload from local files');
    console.log('2. Add single key-value pair');
    console.log('3. Bulk add key-value pairs');
    console.log('4. Update existing content');
    console.log('5. Delete content');
    console.log('6. View current content');
    console.log('7. Export content to files');
    console.log('8. Validate content structure');
    console.log('9. Exit');
    
    return new Promise((resolve) => {
      rl.question('\nSelect option (1-9): ', resolve);
    });
  }

  async uploadFromFiles() {
    console.log('\n📁 Uploading from local files...');
    
    const dataDir = path.join(__dirname, '../data');
    const content = {};

    for (const lang of this.supportedLanguages) {
      const filePath = path.join(dataDir, `${lang}.json`);
      
      if (fs.existsSync(filePath)) {
        try {
          const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          content[lang] = fileContent;
          console.log(`✅ Loaded ${lang}.json`);
        } catch (error) {
          console.error(`❌ Error loading ${lang}.json:`, error.message);
          return;
        }
      } else {
        console.log(`⚠️ ${lang}.json not found, skipping...`);
      }
    }

    if (Object.keys(content).length === 0) {
      console.log('❌ No content files found to upload');
      return;
    }

    try {
      const uploadData = {
        ...content,
        lastUpdated: new Date().toISOString(),
        version: Date.now(),
        source: 'local-files'
      };

      await set(ref(rtdb, 'content'), uploadData);
      console.log('✅ Content uploaded successfully!');
      
      // Show summary
      Object.entries(content).forEach(([lang, sections]) => {
        console.log(`  ${lang}: ${Object.keys(sections).length} sections`);
      });
      
    } catch (error) {
      console.error('❌ Upload failed:', error.message);
    }
  }

  async addSingleKeyValue() {
    console.log('\n➕ Add Single Key-Value Pair');
    
    const language = await this.promptChoice('Language', this.supportedLanguages);
    const section = await this.promptChoice('Section', this.supportedSections);
    const key = await this.promptInput('Key name');
    const value = await this.promptInput('Value');

    if (!key || !value) {
      console.log('❌ Key and value are required');
      return;
    }

    try {
      // Check if key already exists
      const existingData = await get(ref(rtdb, `content/${language}/${section}/${key}`));
      if (existingData.exists()) {
        const overwrite = await this.promptConfirm(`Key "${key}" already exists. Overwrite?`);
        if (!overwrite) return;
      }

      await set(ref(rtdb, `content/${language}/${section}/${key}`), value);
      console.log(`✅ Added ${language}.${section}.${key} = "${value}"`);
      
    } catch (error) {
      console.error('❌ Failed to add key-value pair:', error.message);
    }
  }

  async bulkAddKeyValues() {
    console.log('\n📦 Bulk Add Key-Value Pairs');
    console.log('Enter JSON format: {"key1": "value1", "key2": "value2"}');
    
    const language = await this.promptChoice('Language', this.supportedLanguages);
    const section = await this.promptChoice('Section', this.supportedSections);
    const jsonInput = await this.promptInput('JSON data');

    try {
      const data = JSON.parse(jsonInput);
      
      if (typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Input must be a JSON object');
      }

      const updates = {};
      Object.entries(data).forEach(([key, value]) => {
        updates[`content/${language}/${section}/${key}`] = value;
      });

      await update(ref(rtdb), updates);
      console.log(`✅ Added ${Object.keys(data).length} key-value pairs to ${language}.${section}`);
      
    } catch (error) {
      console.error('❌ Bulk add failed:', error.message);
    }
  }

  async updateContent() {
    console.log('\n🔄 Update Existing Content');
    
    const language = await this.promptChoice('Language', this.supportedLanguages);
    const section = await this.promptChoice('Section', this.supportedSections);
    
    // Show existing keys
    const sectionData = await get(ref(rtdb, `content/${language}/${section}`));
    if (!sectionData.exists()) {
      console.log(`❌ Section ${language}.${section} doesn't exist`);
      return;
    }

    const existingKeys = Object.keys(sectionData.val());
    console.log(`\nExisting keys: ${existingKeys.join(', ')}`);
    
    const key = await this.promptChoice('Key to update', existingKeys);
    const currentValue = sectionData.val()[key];
    
    console.log(`\nCurrent value: "${currentValue}"`);
    const newValue = await this.promptInput('New value');

    if (!newValue) {
      console.log('❌ Value is required');
      return;
    }

    try {
      await set(ref(rtdb, `content/${language}/${section}/${key}`), newValue);
      console.log(`✅ Updated ${language}.${section}.${key}`);
      console.log(`  Old: "${currentValue}"`);
      console.log(`  New: "${newValue}"`);
      
    } catch (error) {
      console.error('❌ Update failed:', error.message);
    }
  }

  async deleteContent() {
    console.log('\n🗑️ Delete Content');
    
    const language = await this.promptChoice('Language', this.supportedLanguages);
    const section = await this.promptChoice('Section', this.supportedSections);
    
    // Show existing keys
    const sectionData = await get(ref(rtdb, `content/${language}/${section}`));
    if (!sectionData.exists()) {
      console.log(`❌ Section ${language}.${section} doesn't exist`);
      return;
    }

    const existingKeys = Object.keys(sectionData.val());
    console.log(`\nExisting keys: ${existingKeys.join(', ')}`);
    
    const key = await this.promptChoice('Key to delete', existingKeys);
    const currentValue = sectionData.val()[key];
    
    console.log(`\nValue to delete: "${currentValue}"`);
    const confirm = await this.promptConfirm('Are you sure you want to delete this?');
    
    if (!confirm) return;

    try {
      await remove(ref(rtdb, `content/${language}/${section}/${key}`));
      console.log(`✅ Deleted ${language}.${section}.${key}`);
      
    } catch (error) {
      console.error('❌ Delete failed:', error.message);
    }
  }

  async viewContent() {
    console.log('\n👁️ Current Content Structure');
    
    try {
      const snapshot = await get(ref(rtdb, 'content'));
      if (!snapshot.exists()) {
        console.log('❌ No content found in database');
        return;
      }

      const content = snapshot.val();
      
      Object.entries(content).forEach(([lang, sections]) => {
        if (this.supportedLanguages.includes(lang)) {
          console.log(`\n📝 ${lang.toUpperCase()}:`);
          Object.entries(sections).forEach(([section, fields]) => {
            if (typeof fields === 'object' && !Array.isArray(fields)) {
              console.log(`  ${section}: ${Object.keys(fields).length} fields`);
              Object.entries(fields).forEach(([key, value]) => {
                const preview = typeof value === 'string' && value.length > 50 
                  ? value.substring(0, 50) + '...' 
                  : value;
                console.log(`    ${key}: "${preview}"`);
              });
            }
          });
        }
      });
      
    } catch (error) {
      console.error('❌ Failed to fetch content:', error.message);
    }
  }

  async exportContent() {
    console.log('\n📤 Export Content to Files');
    
    try {
      const snapshot = await get(ref(rtdb, 'content'));
      if (!snapshot.exists()) {
        console.log('❌ No content found in database');
        return;
      }

      const content = snapshot.val();
      const exportDir = path.join(__dirname, '../data/export');
      
      if (!fs.existsSync(exportDir)) {
        fs.mkdirSync(exportDir, { recursive: true });
      }

      for (const lang of this.supportedLanguages) {
        if (content[lang]) {
          const filePath = path.join(exportDir, `${lang}.json`);
          fs.writeFileSync(filePath, JSON.stringify(content[lang], null, 2));
          console.log(`✅ Exported ${lang}.json`);
        }
      }
      
      console.log(`📁 Files exported to: ${exportDir}`);
      
    } catch (error) {
      console.error('❌ Export failed:', error.message);
    }
  }

  async validateContent() {
    console.log('\n🔍 Validating Content Structure');
    
    try {
      const snapshot = await get(ref(rtdb, 'content'));
      if (!snapshot.exists()) {
        console.log('❌ No content found in database');
        return;
      }

      const content = snapshot.val();
      const issues = [];

      // Check language consistency
      const languages = Object.keys(content).filter(key => this.supportedLanguages.includes(key));
      
      if (languages.length === 0) {
        issues.push('❌ No supported languages found');
      }

      // Check section consistency across languages
      const allSections = new Set();
      languages.forEach(lang => {
        if (content[lang] && typeof content[lang] === 'object') {
          Object.keys(content[lang]).forEach(section => allSections.add(section));
        }
      });

      languages.forEach(lang => {
        const langSections = Object.keys(content[lang] || {});
        allSections.forEach(section => {
          if (!langSections.includes(section)) {
            issues.push(`⚠️ Missing section "${section}" in ${lang}`);
          }
        });
      });

      // Check key consistency within sections
      allSections.forEach(section => {
        const allKeys = new Set();
        languages.forEach(lang => {
          if (content[lang] && content[lang][section]) {
            Object.keys(content[lang][section]).forEach(key => allKeys.add(key));
          }
        });

        languages.forEach(lang => {
          if (content[lang] && content[lang][section]) {
            const langKeys = Object.keys(content[lang][section]);
            allKeys.forEach(key => {
              if (!langKeys.includes(key)) {
                issues.push(`⚠️ Missing key "${key}" in ${lang}.${section}`);
              }
            });
          }
        });
      });

      if (issues.length === 0) {
        console.log('✅ Content structure is valid!');
        console.log(`📊 Summary:`);
        console.log(`  Languages: ${languages.length}`);
        console.log(`  Sections: ${allSections.size}`);
        
        languages.forEach(lang => {
          const totalKeys = Object.values(content[lang] || {}).reduce((sum, section) => {
            return sum + (typeof section === 'object' ? Object.keys(section).length : 0);
          }, 0);
          console.log(`  ${lang}: ${totalKeys} total keys`);
        });
      } else {
        console.log(`❌ Found ${issues.length} issues:`);
        issues.forEach(issue => console.log(`  ${issue}`));
      }
      
    } catch (error) {
      console.error('❌ Validation failed:', error.message);
    }
  }

  async promptChoice(prompt, choices) {
    console.log(`\n${prompt}:`);
    choices.forEach((choice, index) => {
      console.log(`${index + 1}. ${choice}`);
    });
    
    return new Promise((resolve) => {
      const askChoice = () => {
        rl.question(`Select (1-${choices.length}): `, (answer) => {
          const index = parseInt(answer) - 1;
          if (index >= 0 && index < choices.length) {
            resolve(choices[index]);
          } else {
            console.log('Invalid choice, try again.');
            askChoice();
          }
        });
      };
      askChoice();
    });
  }

  async promptInput(prompt) {
    return new Promise((resolve) => {
      rl.question(`${prompt}: `, resolve);
    });
  }

  async promptConfirm(prompt) {
    return new Promise((resolve) => {
      rl.question(`${prompt} (y/N): `, (answer) => {
        resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
      });
    });
  }

  async run() {
    console.log('🚀 Content Upload Manager Started');
    
    while (true) {
      const choice = await this.showMenu();
      
      switch (choice) {
        case '1':
          await this.uploadFromFiles();
          break;
        case '2':
          await this.addSingleKeyValue();
          break;
        case '3':
          await this.bulkAddKeyValues();
          break;
        case '4':
          await this.updateContent();
          break;
        case '5':
          await this.deleteContent();
          break;
        case '6':
          await this.viewContent();
          break;
        case '7':
          await this.exportContent();
          break;
        case '8':
          await this.validateContent();
          break;
        case '9':
          console.log('👋 Goodbye!');
          rl.close();
          process.exit(0);
        default:
          console.log('Invalid option, please try again.');
      }
    }
  }
}

// Run the uploader
const uploader = new ContentUploader();
uploader.run().catch(console.error);
#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const uploaderPath = path.join(__dirname, 'content-uploader.js');

// Handle quick commands
if (args.includes('--validate')) {
  console.log('🔍 Running content validation...');
  // Auto-select validation option
  const child = spawn('node', [uploaderPath], { stdio: 'inherit' });
  child.on('close', (code) => {
    process.exit(code);
  });
} else if (args.includes('--export')) {
  console.log('📤 Running content export...');
  // Auto-select export option
  const child = spawn('node', [uploaderPath], { stdio: 'inherit' });
  child.on('close', (code) => {
    process.exit(code);
  });
} else {
  // Run normal interactive mode
  const child = spawn('node', [uploaderPath], { stdio: 'inherit' });
  child.on('close', (code) => {
    process.exit(code);
  });
}
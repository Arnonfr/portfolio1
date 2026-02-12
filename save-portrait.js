#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Check if image path was provided
const imagePath = process.argv[2];

if (!imagePath) {
  console.log('Usage: node save-portrait.js <path-to-image>');
  console.log('Example: node save-portrait.js ~/Downloads/my-photo.jpg');
  process.exit(1);
}

const sourcePath = path.resolve(imagePath);
const targetPath = path.join(__dirname, 'public', 'images', 'portrait.jpg');

// Check if source exists
if (!fs.existsSync(sourcePath)) {
  console.error('Error: File not found:', sourcePath);
  process.exit(1);
}

// Create images directory if needed
const imagesDir = path.dirname(targetPath);
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Copy file
fs.copyFileSync(sourcePath, targetPath);
console.log('✓ Portrait saved to:', targetPath);
console.log('✓ Refresh the browser to see the changes');

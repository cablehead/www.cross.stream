#!/usr/bin/env node

const { chromium } = require('playwright');
const path = require('path');

async function takeScreenshot(width, outputPath, page = 'hero-diagram.html') {
  if (!width || !outputPath) {
    console.error('Usage: node screenshot.js <width> <output-path> [page]');
    console.error('Example: node screenshot.js 400 ./www index.html');
    process.exit(1);
  }

  const browser = await chromium.launch();
  const playwrightPage = await browser.newPage();
  
  // Set viewport size
  await playwrightPage.setViewportSize({ width: parseInt(width), height: 1080 });
  
  // Navigate to the page
  await playwrightPage.goto(`http://localhost:3021/${page}`);
  
  // Wait for content to load
  await playwrightPage.waitForLoadState('networkidle');
  
  // Take screenshot
  const filename = `screenshot-${width}.png`;
  const fullPath = path.join(outputPath, filename);
  
  await playwrightPage.screenshot({ 
    path: fullPath,
    fullPage: true 
  });
  
  console.log(`Screenshot saved: ${fullPath}`);
  
  await browser.close();
}

// Get command line arguments
const [,, width, outputPath, page] = process.argv;
takeScreenshot(width, outputPath, page);
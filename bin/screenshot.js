#!/usr/bin/env node

const { chromium } = require('playwright');
const path = require('path');

async function takeScreenshot(width, outputPath) {
  if (!width || !outputPath) {
    console.error('Usage: node screenshot.js <width> <output-path>');
    console.error('Example: node screenshot.js 400 ./www');
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewportSize({ width: parseInt(width), height: 1080 });
  
  // Navigate to the page
  await page.goto('http://localhost:3021/hero-diagram.html');
  
  // Wait for content to load
  await page.waitForLoadState('networkidle');
  
  // Take screenshot
  const filename = `screenshot-${width}.png`;
  const fullPath = path.join(outputPath, filename);
  
  await page.screenshot({ 
    path: fullPath,
    fullPage: true 
  });
  
  console.log(`Screenshot saved: ${fullPath}`);
  
  await browser.close();
}

// Get command line arguments
const [,, width, outputPath] = process.argv;
takeScreenshot(width, outputPath);
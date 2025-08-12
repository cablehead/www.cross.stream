#!/usr/bin/env node

const { chromium } = require('playwright');
const path = require('path');

// Page mappings
const PAGE_MAP = {
  '/': '',
  '/hero-diagram/': 'hero-diagram/',
  '/components-guide/': 'components-guide/'
};

async function takeScreenshot(page, width, outputFile) {
  if (!page || !width || !outputFile) {
    console.error('Usage: node screenshot.js <page> <width> <output-file>');
    console.error('Pages: /, /hero-diagram/, /components-guide/');
    console.error('Example: node screenshot.js /hero-diagram/ 1024 screenshots/desktop.png');
    process.exit(1);
  }

  // Map page to URL path
  const urlPath = PAGE_MAP[page];
  if (urlPath === undefined) {
    console.error(`Unknown page: ${page}`);
    console.error('Available pages:', Object.keys(PAGE_MAP).join(', '));
    process.exit(1);
  }

  const browser = await chromium.launch();
  const playwrightPage = await browser.newPage();
  
  // Set viewport size
  await playwrightPage.setViewportSize({ width: parseInt(width), height: 1080 });
  
  // Navigate to the page
  const url = `http://localhost:3021/${urlPath}`;
  console.log(`Navigating to: ${url}`);
  await playwrightPage.goto(url);
  
  // Wait for content to load
  await playwrightPage.waitForLoadState('networkidle');
  
  // Take screenshot
  await playwrightPage.screenshot({ 
    path: outputFile,
    fullPage: true 
  });
  
  console.log(`Screenshot saved: ${outputFile}`);
  
  await browser.close();
}

// Get command line arguments
const [,, page, width, outputFile] = process.argv;
takeScreenshot(page, width, outputFile);
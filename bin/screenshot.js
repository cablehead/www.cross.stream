#!/usr/bin/env node

const { chromium } = require("playwright");
const path = require("path");

async function takeScreenshot(pageOrUrl, width, outputFile, aspectRatio) {
  if (!pageOrUrl || !width || !outputFile) {
    console.error(
      "Usage: node screenshot.js <page-or-url> <width> <output-file> [aspectRatio]",
    );
    console.error("Examples:");
    console.error("  node screenshot.js /canvas/ 1024 screenshots/canvas.png");
    console.error("  node screenshot.js http://localhost:3021/canvas/v0.1/ 1024 screenshots/canvas-v01.png");
    console.error("  node screenshot.js / 1200x630 og.png 1.91:1");
    process.exit(1);
  }

  // Determine if input is a full URL or a path
  let url;
  if (pageOrUrl.startsWith('http://') || pageOrUrl.startsWith('https://')) {
    url = pageOrUrl;
  } else {
    // Treat as path, prepend localhost
    const urlPath = pageOrUrl.startsWith('/') ? pageOrUrl.slice(1) : pageOrUrl;
    url = `http://localhost:3021/${urlPath}`;
  }

  const browser = await chromium.launch();
  const playwrightPage = await browser.newPage();

  // Parse width and height
  let viewportWidth, viewportHeight, screenshotOptions;

  if (width.includes("x")) {
    // Handle WIDTHxHEIGHT format
    const [w, h] = width.split("x").map((n) => parseInt(n));
    viewportWidth = w;
    viewportHeight = h;
    screenshotOptions = {
      path: outputFile,
      clip: { x: 0, y: 0, width: w, height: h },
    };
  } else {
    // Default behavior - width only, full page
    viewportWidth = parseInt(width);
    viewportHeight = 1080;
    screenshotOptions = {
      path: outputFile,
      fullPage: true,
    };
  }

  // Set viewport size
  await playwrightPage.setViewportSize({
    width: viewportWidth,
    height: viewportHeight,
  });

  // Navigate to the page
  console.log(`Navigating to: ${url}`);
  await playwrightPage.goto(url);

  // Wait for content to load
  await playwrightPage.waitForLoadState("networkidle");

  // Take screenshot
  await playwrightPage.screenshot(screenshotOptions);

  console.log(`Screenshot saved: ${outputFile}`);

  await browser.close();
}

// Get command line arguments
const [, , pageOrUrl, width, outputFile, aspectRatio] = process.argv;
takeScreenshot(pageOrUrl, width, outputFile, aspectRatio);

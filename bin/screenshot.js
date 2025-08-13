#!/usr/bin/env node

const { chromium } = require("playwright");
const path = require("path");

// Page mappings
const PAGE_MAP = {
  "/": "",
  "/hero-diagram/": "hero-diagram/",
  "/components-guide/": "components-guide/",
};

async function takeScreenshot(page, width, outputFile, aspectRatio) {
  if (!page || !width || !outputFile) {
    console.error(
      "Usage: node screenshot.js <page> <width> <output-file> [aspectRatio]",
    );
    console.error("Pages: /, /hero-diagram/, /components-guide/");
    console.error(
      "Example: node screenshot.js /hero-diagram/ 1024 screenshots/desktop.png",
    );
    console.error(
      "Example with aspect ratio: node screenshot.js / 1200x630 og.png 1.91:1",
    );
    process.exit(1);
  }

  // Map page to URL path
  const urlPath = PAGE_MAP[page];
  if (urlPath === undefined) {
    console.error(`Unknown page: ${page}`);
    console.error("Available pages:", Object.keys(PAGE_MAP).join(", "));
    process.exit(1);
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
  const url = `http://localhost:3021/${urlPath}`;
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
const [, , page, width, outputFile, aspectRatio] = process.argv;
takeScreenshot(page, width, outputFile, aspectRatio);

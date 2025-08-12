# cross.stream Hero Diagram

Interactive demo showing cross.stream's event flow system.

## Quick Start

```bash
npm install
http-nu :3021 {|req| .static "www" $req.path}
dumbpipe listen-tcp --host 127.0.0.1:3021
```

Visit http://localhost:3021/hero-diagram/

## Screenshot Tool

Generate screenshots of different pages at various viewport sizes:

```bash
node bin/screenshot.js <page> <width> <output-file>
```

**Available pages:**

- `/` - Main index page (screenshot showcase)
- `/hero-diagram/` - Interactive demo
- `/components-guide/` - Component style guide

**Examples:**

```bash
node bin/screenshot.js /hero-diagram/ 400 screenshots/mobile.png      # Mobile
node bin/screenshot.js /hero-diagram/ 768 screenshots/tablet.png      # Tablet  
node bin/screenshot.js /hero-diagram/ 1024 screenshots/desktop.png    # Desktop
node bin/screenshot.js / 1024 screenshots/review.png                  # Index review
```

## Development Loop

**5-step iterative process:**

1. **Plan** - Design the changes you want to make
2. **Change** - Implement the modifications to components/pages
3. **Screenshots** - Generate responsive screenshots + review screenshot
4. **Review** - Examine the review screenshot for visual issues
5. **Critique** - Identify the most glaring problems and iterate

**Screenshot commands for the loop:**

```bash
# Generate responsive screenshots
node bin/screenshot.js /hero-diagram/ 400 screenshots/screenshot-400.png
node bin/screenshot.js /hero-diagram/ 768 screenshots/screenshot-768.png  
node bin/screenshot.js /hero-diagram/ 1024 screenshots/screenshot-1024.png

# Generate review screenshot
node bin/screenshot.js / 1024 screenshots/review.png

# Review screenshots/review.png for issues and critique
```

## Structure

- `www/` - Static files
  - `hero-diagram/` - Main interactive demo
  - `components-guide/` - Living style guide for terminal components
  - `components/` - Reusable Lit components (terminal-panel, terminal-line,
    event-bubble)
  - `screenshots/` - Generated responsive screenshots
  - `styles.css` - Shared terminal component styles
- `bin/` - Tools and scripts
- `store/` - Database files (ignored)

## Components

The project uses Lit components for terminal UI consistency:

- **terminal-panel** - Container with header and content areas
- **terminal-line** - Command line with syntax highlighting
- **event-bubble** - Store event visualization

Visit http://localhost:3021/components-guide/ for the complete style guide.

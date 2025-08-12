# cross.stream Hero Diagram

Interactive demo showing cross.stream's event flow system.

## Quick Start

```bash
npm install
http-nu :3021 {|req| .static "www" $req.path}
dumbpipe listen-tcp --host 127.0.0.1:3021
```

Visit http://localhost:3021/hero-diagram.html

## Screenshot Tool

Generate responsive screenshots:

```bash
node bin/screenshot.js <width> <output-path>
```

Examples:
```bash
node bin/screenshot.js 400 www    # Mobile
node bin/screenshot.js 768 www    # Tablet  
node bin/screenshot.js 1024 www   # Desktop
```

Output: `screenshot-<width>.png` in specified directory.

## Development Workflow

When making changes to the hero-diagram.html:

1. **Update screenshots**: Generate all 3 responsive screenshots
   ```bash
   node bin/screenshot.js 400 www    # Mobile
   node bin/screenshot.js 768 www    # Tablet  
   node bin/screenshot.js 1024 www   # Desktop
   ```

2. **Update index snapshot**: Take a screenshot of the index.html page for review
   ```bash
   node bin/screenshot.js 1024 /tmp index.html
   ```

3. **Review the index snapshot**: Critically examine the `/tmp/screenshot-1024.png` to verify:
   - All three screenshots display correctly
   - Responsive layout works across viewport sizes  
   - Changes are properly reflected in all views

## Structure

- `www/` - Static files
- `bin/` - Tools and scripts
- `store/` - Database files (ignored)
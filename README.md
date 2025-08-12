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

## Structure

- `www/` - Static files
- `bin/` - Tools and scripts
- `store/` - Database files (ignored)
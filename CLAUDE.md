## Git Commit Style Preferences

When committing: review `git diff`

- Use conventional commit format: `type: subject line`
- Keep subject line concise and descriptive
- **NEVER include marketing language, promotional text, or AI attribution**
- **NEVER add "Generated with Claude Code", "Co-Authored-By: Claude", or similar
  spam**
- Follow existing project patterns from git log
- Prefer just a subject and no body, unless the change is particularly complex

Example good commit messages from this project:

- `test: allow dead code in test utility methods`
- `fix: improve error handling`
- `feat: add a --fallback option to .static to support SPAs`
- `refactor: remove axum dependency, consolidate unix socket, tcp and tls handling`

## Code Quality

```
deno fmt README.md CLAUDE.md ./www
```

### CSS Guidelines

**NEVER use `!important` in CSS.** Instead, diagnose why the CSS is not working
as expected:

- Check CSS specificity and selector precedence
- Look for conflicting styles in media queries
- Verify proper cascading order
- Use more specific selectors when needed
- Investigate component scoping issues

Using `!important` masks underlying CSS architecture problems and creates
maintenance debt.

**NEVER use `font-weight` for emphasis.** Use color, typography scale, or other
visual methods instead of making text bold.

## Development

A web server is running on port 3021 serving the www/ directory. You can access:

- http://localhost:3021/ # main page
- http://localhost:3021/canvas/ # business model canvas
- http://localhost:3021/review/ # to view the main in 3x page widths

The project uses Lit components. Components are in www/components/

### Template System

The project uses Jinja2 templates with minijinja-cli for server-side rendering:

- `base.html` - Base template with common HTML structure
- `index.html` - Main page template (extends base.html)
- `canvas/index.html` - Canvas page template (extends ../base.html)
- `serve.nu` - Nushell server script with minijinja integration

#### Testing Templates

**Test templates directly with minijinja-cli:**
```bash
# Test individual templates
minijinja-cli ./index.html
minijinja-cli ./canvas/index.html

# Should output fully rendered HTML, no raw {% %} syntax
```

**Test full stack with serve.nu:**
```bash
# Start the server (runs in background)
cat serve.nu | http-nu :3021 -

# Test with curl
curl -s localhost:3021 | head -10              # main page
curl -s localhost:3021/canvas/ | head -10      # canvas page
curl -I localhost:3021/global.css              # static files

# Verify templates are rendered (should return 0)
curl -s localhost:3021/canvas/ | grep -c "{% extends"
```

**Template troubleshooting:**
- Ensure paths are correct in template inheritance (`../base.html` for subdirectories)
- Set `components_path_value` variable in child templates for script paths
- Test minijinja-cli directly before testing through server

### Development Loop (for AI agents)

**5-step iterative process:**

1. **Screenshot** - Generate the review screenshot
2. **Review** - Re-examine the review screenshot with completely fresh eyes
   - **CRITICAL: View as if seeing for the first time** - ignore all previous
     context
   - **EXPECT the issue NOT to be fixed** - assume your changes didn't work
   - Describe exactly what you see in the image, not what you expect to see
   - **Verify changes worked**: Did the previous change apply as intended, or
     did something break/disappear?
   - Look at visual details literally before drawing any conclusions
3. **Critique** - Identify the most glaring problem you can see, and describe
   it, then ask for what the user would like to work on
4. **Plan** - Design the changes you want to make
5. **Change** - Implement the modifications to components/pages
6. **Loop**

```bash
# Generate review screenshot  
node bin/screenshot.js / 1200 www/screenshots/review.png
# Review www/screenshots/review.png for issues and critique
```

## Never

respond with Perfect!

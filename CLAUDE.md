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

## Development Workflow

A web server is running on port 3021 serving the www/ directory. You can access:

- http://localhost:3021/ for the screenshot showcase
- http://localhost:3021/hero-diagram/ for the main interactive demo
- http://localhost:3021/components-guide/ for the component style guide

The project uses Lit components for terminal UI. Components are in
www/components/ and shared styles in www/styles.css.

Use the redesigned screenshot tool:
`node bin/screenshot.js <page> <width> <output-file>`

### Development Loop (for AI agents)

**5-step iterative process:**

1. **Plan** - Design the changes you want to make
2. **Change** - Implement the modifications to components/pages
3. **Screenshot** - Generate the review screenshot
4. **Review** - Examine the review screenshot for visual issues
   - **EXPECT the issue NOT to be fixed** - assume your changes didn't work
   - Describe exactly what you see in the image, not what you expect to see
   - Look at visual details literally before drawing any conclusions
5. **Critique** - Identify the most glaring problem you can see, and describe it

```bash
# Generate review screenshot  
node bin/screenshot.js / 1200 www/screenshots/review.png
# Review www/screenshots/review.png for issues and critique
```

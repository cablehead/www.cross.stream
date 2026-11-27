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

The site is one page, served by `www/serve.nu`:

```bash
http-nu --datastar :3021 www/serve.nu
```

- `www/index.html` - the page, a minijinja template rendered by `.mj`
- `www/serve.nu` - the page's data (the demo frames, the parts of xs, the
  release) and the server
- `www/site.css` - every value a token, raw tags styled once
- `www/assets/og.png` - the link preview

Datastar runs the one interactive part, the query switch.

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
# Generate a screenshot
node bin/screenshot.js / 1200 www/screenshots/review.png
# Review www/screenshots/review.png for issues and critique
```

## Never

respond with Perfect!

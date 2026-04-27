# Build & Publishing Guide

## Building the Package

### Prerequisites

- Node.js 14+ and npm installed
- TypeScript installed (included in devDependencies)

### Build Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Build the package**
   ```bash
   npm run build
   ```
   This generates:
   - `dist/index.js` - CommonJS version
   - `dist/index.esm.js` - ES Module version
   - `dist/index.d.ts` - TypeScript declarations
   - Source maps for debugging

3. **Verify build output**
   ```bash
   ls -la dist/
   ```
   You should see `.js`, `.d.ts`, and `.map` files

## Testing Before Publishing

### Local Testing

```bash
# Link package locally
npm link

# In another project
npm link use-ph-location

# Test importing
import { usePhLocation } from 'use-ph-location';
```

### Build Verification

```bash
# Clean and rebuild
npm run clean
npm run build

# Check for errors
npm test
```

## Publishing to NPM

### Step 1: Prepare Your Package

Before publishing, update these files:

1. **package.json** - Update repository and author info
   ```json
   {
     "name": "use-ph-location",
     "version": "1.0.0",
     "author": "Your Name <your.email@example.com>",
     "repository": {
       "type": "git",
       "url": "https://github.com/yourusername/use-ph-location"
     },
     "bugs": {
       "url": "https://github.com/yourusername/use-ph-location/issues"
     }
   }
   ```

2. **Create .npmrc** (optional)
   ```
   registry=https://registry.npmjs.org/
   ```

3. **Create GitHub repository** (recommended)
   - Initialize git
   - Create repository on GitHub
   - Push code

### Step 2: Publish

```bash
# Build first
npm run build

# Login to NPM (first time only)
npm login
# You'll be prompted for:
# - Username
# - Password
# - Email

# Publish
npm publish

# Verify
npm info use-ph-location
```

### Step 3: Post-Publish

1. Add a git tag
   ```bash
   git tag -a v1.0.0 -m "Release v1.0.0"
   git push origin v1.0.0
   ```

2. Create GitHub Release
   - Go to GitHub repository
   - Click "Releases"
   - Create release from tag
   - Add changelog notes

3. Announce
   - Post on Twitter/social media
   - Share in relevant communities
   - Submit to npm showcases

## Version Management

### Semantic Versioning

Format: `MAJOR.MINOR.PATCH`

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (1.1.0): New features (backward compatible)
- **PATCH** (1.0.1): Bug fixes (backward compatible)

### Update Version

```bash
# Patch release
npm version patch      # 1.0.0 -> 1.0.1

# Minor release
npm version minor      # 1.0.1 -> 1.1.0

# Major release
npm version major      # 1.1.0 -> 2.0.0

# Custom version
npm version 1.5.0
```

## Updating Dependencies

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Update to latest
npm install --save-dev typescript@latest

# After updates, rebuild
npm run build
```

## NPM Scripts Reference

```bash
npm run build      # Build the package
npm run dev        # Watch mode for development
npm run clean      # Remove dist folder
npm test           # Run tests
npm prepublish     # Runs before publish (auto)
```

## Troubleshooting

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Login Issues

```bash
# Check login status
npm whoami

# Logout and login again
npm logout
npm login

# Clear cache if needed
npm cache clean --force
```

### Publishing Errors

**Error: You do not have permission to publish**
- Check if package name is available
- Use different package name
- Verify npm account permissions

**Error: Package already published**
- Update version number
- Use `npm version patch`

**Error: Large package size**
- Check .npmignore file
- Remove unnecessary files
- Limit included files in package.json

## .npmignore

Create `.npmignore` to exclude files from package:

```
src/
examples/
*.md
*.json
node_modules/
dist/
.git
.gitignore
tsconfig.json
.DS_Store
```

## GitHub Actions CI/CD (Optional)

Create `.github/workflows/publish.yml`:

```yaml
name: Publish

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm install
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Support After Publishing

- Monitor npm downloads: https://npm-stat.com/charts.html?package=use-ph-location
- Check package health: https://snyk.io/advisor/npm-package/use-ph-location
- Update regularly with bug fixes and features
- Maintain documentation

## Helpful Resources

- [NPM Publishing Docs](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [Semantic Versioning](https://semver.org/)
- [How to Write a README](https://www.makeareadme.com/)
- [TypeScript Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/)

---

**Your package is ready to share with the world! 🚀**

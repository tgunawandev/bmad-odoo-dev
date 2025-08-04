# GitHub Actions Auto-Publish Setup

This document explains how to set up automatic publishing to npm using GitHub Actions.

## 1. Add NPM Token to GitHub Secrets

1. Go to your GitHub repository: `https://github.com/tgunawandev/bmad-odoo-dev`
2. Click on **Settings** tab
3. In the left sidebar, click on **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Set the secret name as: `NPM_TOKEN`
6. Set the secret value as: `[YOUR_NPM_TOKEN_HERE]` (use the token provided by the repository owner)
7. Click **Add secret**

## 2. How Auto-Publish Works

The GitHub Actions workflow (`.github/workflows/publish.yml`) will automatically:

### Triggers
- **Push to main branch** with changes to important files:
  - `package.json` (version changes)
  - `agents/**`, `tasks/**`, `templates/**` (content changes)
  - `checklists/**`, `data/**`, `teams/**`
  - `bin/**`, `scripts/**`, `config.yaml`
- **Manual workflow dispatch** (can be triggered manually from GitHub Actions tab)

### Process
1. **Version Check**: Compares package.json version with what's published on npm
2. **Skip if Exists**: If version already exists on npm, skips publishing
3. **Validation**: Runs `npm run validate` to ensure package integrity
4. **Build**: Runs `npm run build` to create distribution files
5. **Test**: Runs tests if available (optional)
6. **Publish**: Publishes to npm with `--tag latest` flag
7. **Verify @latest**: Ensures @latest tag points to the new version
8. **GitHub Release**: Creates a GitHub release with changelog

### Version Support
The workflow ensures both versioned and @latest installations work:
- `npm install bmad-odoo-dev` → installs @latest
- `npm install bmad-odoo-dev@latest` → installs @latest  
- `npm install bmad-odoo-dev@1.2.0` → installs specific version

## 3. Manual Publishing (Alternative)

If you prefer manual control or need to publish without GitHub Actions:

```bash
# Using the manual publish script
npm run publish-manual

# Or traditional npm publish
npm run build
npm publish --tag latest
```

## 4. Publishing New Versions

To publish a new version:

1. **Update version** in `package.json`:
   ```json
   {
     "version": "1.3.0"
   }
   ```

2. **Commit and push** to main branch:
   ```bash
   git add package.json
   git commit -m "🔖 Bump version to 1.3.0"
   git push origin main
   ```

3. **GitHub Actions will automatically**:
   - Detect the version change
   - Build and validate the package
   - Publish to npm as `bmad-odoo-dev@1.3.0` and update `@latest`
   - Create GitHub release `v1.3.0`

## 5. Monitoring

- **GitHub Actions**: Monitor workflow runs at `https://github.com/tgunawandev/bmad-odoo-dev/actions`
- **NPM Package**: Check published versions at `https://www.npmjs.com/package/bmad-odoo-dev`
- **Notifications**: GitHub will send notifications on workflow success/failure

## 6. Troubleshooting

### Common Issues

1. **NPM_TOKEN Invalid**: 
   - Check if the token in GitHub secrets matches your npm token
   - Ensure token has publish permissions

2. **Version Already Exists**:
   - The workflow will skip publishing if version exists
   - Update package.json version to publish

3. **Build Failures**:
   - Check the GitHub Actions logs
   - Ensure all dependencies are properly declared
   - Validate locally with `npm run validate`

### Manual Override

If auto-publish fails, you can manually publish:

```bash
# Set npm token (one time setup)
npm config set //registry.npmjs.org/:_authToken [YOUR_NPM_TOKEN_HERE]

# Build and publish
npm run build
npm publish --tag latest

# Verify
npm view bmad-odoo-dev@latest version
```

## 7. Security Notes

- The npm token is stored as a GitHub secret (encrypted)
- Token only has publish permissions for this package
- Workflow runs in isolated GitHub-hosted runners
- No sensitive data is logged in workflow outputs
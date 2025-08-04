# BMAD-METHOD-ODOO Setup Guide

## GitHub Repository Setup

1. **Initialize Git Repository**:
   ```bash
   cd /home/tgunawan/project/01-web/odoo/BMAD-METHOD-ODOO
   git init
   git add .
   git commit -m "Initial commit: BMAD-METHOD-ODOO expansion pack v1.0.0"
   ```

2. **Connect to GitHub Repository**:
   ```bash
   git remote add origin git@github.com:tgunawandev/BMAD-METHOD-ODOO.git
   git branch -M main
   git push -u origin main
   ```

## NPM Publishing Setup

1. **Login to NPM**:
   ```bash
   npm login
   # Enter your NPM credentials
   ```

2. **Publish to NPM**:
   ```bash
   npm publish
   ```

## GitHub Repository Configuration

### Required Secrets for CI/CD

Add these secrets in GitHub repository settings:

1. **NPM_TOKEN**: Your NPM authentication token
   - Go to npmjs.com → Account → Access Tokens
   - Create automation token
   - Add to GitHub Secrets

### Branch Protection

Set up branch protection for `main`:
- Require pull request reviews
- Require status checks to pass
- Require branches to be up to date

## Installation Instructions for Users

Once published, users can install with:

```bash
# Install core BMAD-METHOD (required)
npm install bmad-method

# Install Odoo expansion pack
npm install bmad-method-odoo

# Verify installation
npx bmad-odoo validate
```

## Integration with BMAD-METHOD Core

### User Guide Updates Needed

Add the content from `docs/user-guide-extension.md` to the main BMAD-METHOD user guide:

1. **Location**: https://github.com/bmadcode/bmad-method/blob/main/bmad-core/user-guide.md
2. **Sections to Add**:
   - Odoo Expansion Pack Agents (in Special Agents section)
   - Odoo Expansion Pack Configuration (in Core Configuration section)
   - Odoo Development Workflow (new section)
   - Odoo Development Best Practices (in Best Practices section)

### Pull Request for Core Integration

Create a pull request to bmadcode/bmad-method with:
- User guide updates
- Documentation for expansion pack integration
- Installation instructions for expansion packs

## Testing the Setup

1. **Local Testing**:
   ```bash
   # Test CLI commands
   npx bmad-odoo --help
   npx bmad-odoo agents
   npx bmad-odoo team-files
   npx bmad-odoo validate
   ```

2. **Integration Testing**:
   ```bash
   # Test with real Odoo project
   cd /path/to/odoo/project
   npm install bmad-method-odoo
   cp node_modules/bmad-method-odoo/teams/team-odoo-fullstack.txt ./
   ```

3. **AI Agent Testing**:
   - Upload team file to AI agent
   - Test agent role switching (*odoo-functional-consultant, etc.)
   - Test slash commands (*OdooMethod create-addon, etc.)

## Release Process

1. **Version Updates**:
   ```bash
   npm version patch  # or minor/major
   git push --follow-tags
   ```

2. **GitHub Release**:
   - Create release on GitHub
   - CI/CD will automatically publish to NPM

3. **Documentation Updates**:
   - Update CHANGELOG.md
   - Update README.md with new features
   - Update user guide integration

## Maintenance

### Regular Updates

1. **BMAD-METHOD Compatibility**:
   - Test with new BMAD-METHOD versions
   - Update peer dependency requirements
   - Maintain backward compatibility

2. **Odoo Version Support**:
   - Test with new Odoo releases
   - Update supported versions list
   - Add version-specific patterns

3. **Community Feedback**:
   - Monitor GitHub issues
   - Respond to user feedback
   - Implement feature requests

### Quality Assurance

1. **Automated Testing**:
   - CI/CD runs on every commit
   - Compatibility testing with BMAD-METHOD
   - Structure validation

2. **Manual Testing**:
   - Test with real Odoo projects
   - Validate AI agent functionality
   - Check documentation accuracy

## Support Channels

1. **GitHub Issues**: Technical problems and bug reports
2. **GitHub Discussions**: Feature requests and general questions
3. **BMAD Discord**: Community support and collaboration
4. **Documentation Wiki**: Detailed guides and examples

## Success Metrics

Track these metrics for expansion pack success:

1. **Adoption**:
   - NPM download statistics
   - GitHub stars and forks
   - Community feedback

2. **Quality**:
   - Issue resolution time
   - User satisfaction
   - Code quality metrics

3. **Integration**:
   - BMAD-METHOD compatibility
   - Odoo ecosystem integration
   - Community contributions
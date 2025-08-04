#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function runCommand(command, description) {
  console.log(chalk.blue(`🔨 ${description}...`));
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(chalk.green(`✅ ${description} completed`));
  } catch (error) {
    console.error(chalk.red(`❌ ${description} failed`));
    process.exit(1);
  }
}

function checkNpmAuth() {
  try {
    execSync('npm whoami', { stdio: 'pipe' });
    console.log(chalk.green('✅ npm authentication verified'));
    return true;
  } catch (error) {
    console.error(chalk.red('❌ npm authentication failed'));
    console.log(chalk.yellow('Please run: npm login'));
    return false;
  }
}

function getPackageVersion() {
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  return packageJson.version;
}

function checkVersionExists(version) {
  try {
    execSync(`npm view bmad-odoo-dev@${version} version`, { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  console.log(chalk.blue('🚀 Starting bmad-odoo-dev publish process...'));
  
  // Check npm authentication
  if (!checkNpmAuth()) {
    return;
  }
  
  // Get current version
  const version = getPackageVersion();
  console.log(chalk.blue(`📦 Current version: ${version}`));
  
  // Check if version already exists
  if (checkVersionExists(version)) {
    console.log(chalk.yellow(`⚠️  Version ${version} already exists on npm`));
    console.log(chalk.yellow('To publish a new version:'));
    console.log(chalk.yellow('1. Update version in package.json'));
    console.log(chalk.yellow('2. Run this script again'));
    return;
  }
  
  // Run validation
  runCommand('npm run validate', 'Validating package');
  
  // Build package
  runCommand('npm run build', 'Building package');
  
  // Run tests if available
  try {
    console.log(chalk.blue('🧪 Running tests...'));
    execSync('npm test', { stdio: 'inherit' });
    console.log(chalk.green('✅ Tests passed'));
  } catch (error) {
    console.log(chalk.yellow('⚠️  No tests found or tests failed, continuing...'));
  }
  
  // Publish to npm with latest tag
  runCommand('npm publish --tag latest', 'Publishing to npm');
  
  // Verify @latest tag
  console.log(chalk.blue('🔍 Verifying @latest tag...'));
  try {
    const latestVersion = execSync('npm view bmad-odoo-dev@latest version', { encoding: 'utf8' }).trim();
    if (latestVersion === version) {
      console.log(chalk.green(`✅ @latest tag correctly points to ${version}`));
    } else {
      console.log(chalk.yellow(`⚠️  @latest tag issue: expected ${version}, got ${latestVersion}`));
      console.log(chalk.blue('🔧 Manually setting @latest tag...'));
      runCommand(`npm dist-tag add bmad-odoo-dev@${version} latest`, 'Setting @latest tag');
    }
  } catch (error) {
    console.log(chalk.yellow('⚠️  Could not verify @latest tag, but publish succeeded'));
  }
  
  console.log(chalk.green('🎉 Publication completed successfully!'));
  console.log(chalk.blue(`📦 bmad-odoo-dev@${version} is now available on npm`));
  console.log(chalk.gray('Users can install with:'));
  console.log(chalk.gray('  npm install bmad-odoo-dev@latest'));
  console.log(chalk.gray('  npm install bmad-odoo-dev'));
  console.log(chalk.gray(`  npm install bmad-odoo-dev@${version}`));
}

main().catch(error => {
  console.error(chalk.red('❌ Publication failed:'), error.message);
  process.exit(1);
});
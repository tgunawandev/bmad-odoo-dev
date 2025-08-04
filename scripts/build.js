#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

async function build() {
  console.log(chalk.blue('🔨 Building BMAD-METHOD-ODOO expansion pack...'));
  
  try {
    const distDir = path.join(__dirname, '..', 'dist');
    await fs.ensureDir(distDir);
    
    // Copy teams directory to dist for easy access
    const teamsDir = path.join(__dirname, '..', 'teams');
    const distTeamsDir = path.join(distDir, 'teams');
    await fs.copy(teamsDir, distTeamsDir);
    
    // Copy other directories to dist
    const directories = ['agents', 'tasks', 'templates', 'checklists', 'data'];
    for (const dir of directories) {
      const srcDir = path.join(__dirname, '..', dir);
      const destDir = path.join(distDir, dir);
      if (await fs.pathExists(srcDir)) {
        await fs.copy(srcDir, destDir);
      }
    }
    
    // Copy config and other files
    const files = ['config.yaml', 'CLAUDE.md'];
    for (const file of files) {
      const srcFile = path.join(__dirname, '..', file);
      const destFile = path.join(distDir, file);
      if (await fs.pathExists(srcFile)) {
        await fs.copy(srcFile, destFile);
      }
    }
    
    console.log(chalk.green('✅ Build completed successfully!'));
    console.log(chalk.blue(`   Distribution files created in: ${distDir}`));
    
  } catch (error) {
    console.error(chalk.red('❌ Build failed:'), error.message);
    process.exit(1);
  }
}

build();
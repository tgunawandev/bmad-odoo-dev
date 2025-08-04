#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const yaml = require('yaml');
const chalk = require('chalk');

async function validate() {
  console.log(chalk.blue('🔍 Validating BMAD-METHOD-ODOO expansion pack structure...'));
  
  let isValid = true;
  const errors = [];
  const warnings = [];
  
  try {
    // Check required files
    const requiredFiles = [
      'package.json',
      'config.yaml',
      'CLAUDE.md',
      'README.md'
    ];
    
    for (const file of requiredFiles) {
      const filePath = path.join(__dirname, '..', file);
      if (!await fs.pathExists(filePath)) {
        errors.push(`Missing required file: ${file}`);
        isValid = false;
      }
    }
    
    // Check required directories
    const requiredDirs = [
      'agents',
      'tasks',
      'templates',
      'teams',
      'checklists',
      'data'
    ];
    
    for (const dir of requiredDirs) {
      const dirPath = path.join(__dirname, '..', dir);
      if (!await fs.pathExists(dirPath)) {
        errors.push(`Missing required directory: ${dir}`);
        isValid = false;
      }
    }
    
    // Validate config.yaml
    const configPath = path.join(__dirname, '..', 'config.yaml');
    if (await fs.pathExists(configPath)) {
      try {
        const configContent = await fs.readFile(configPath, 'utf8');
        const config = yaml.parse(configContent);
        
        if (!config.agents || config.agents.length === 0) {
          warnings.push('No agents defined in config.yaml');
        }
        
        if (!config.tasks || config.tasks.length === 0) {
          warnings.push('No tasks defined in config.yaml');
        }
        
      } catch (err) {
        errors.push(`Invalid YAML in config.yaml: ${err.message}`);
        isValid = false;
      }
    }
    
    // Check agent files
    const agentsDir = path.join(__dirname, '..', 'agents');
    if (await fs.pathExists(agentsDir)) {
      const agentFiles = await fs.readdir(agentsDir);
      if (agentFiles.length === 0) {
        warnings.push('No agent files found in agents directory');
      }
    }
    
    // Check team files
    const teamsDir = path.join(__dirname, '..', 'teams');
    if (await fs.pathExists(teamsDir)) {
      const teamFiles = await fs.readdir(teamsDir);
      const txtFiles = teamFiles.filter(file => file.endsWith('.txt'));
      if (txtFiles.length === 0) {
        errors.push('No team configuration files (.txt) found in teams directory');
        isValid = false;
      }
    }
    
    // Print results
    console.log('');
    if (errors.length > 0) {
      console.log(chalk.red('❌ Validation Errors:'));
      errors.forEach(error => console.log(chalk.red(`   • ${error}`)));
    }
    
    if (warnings.length > 0) {
      console.log(chalk.yellow('⚠️  Validation Warnings:'));
      warnings.forEach(warning => console.log(chalk.yellow(`   • ${warning}`)));
    }
    
    if (isValid) {
      console.log(chalk.green('✅ BMAD-METHOD-ODOO expansion pack structure is valid!'));
    } else {
      console.log(chalk.red('❌ BMAD-METHOD-ODOO expansion pack structure is invalid'));
      process.exit(1);
    }
    
  } catch (error) {
    console.error(chalk.red('❌ Validation failed:'), error.message);
    process.exit(1);
  }
}

validate();
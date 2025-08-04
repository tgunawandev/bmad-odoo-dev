#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const yaml = require('yaml');

const program = new Command();

program
  .name('bmad-odoo')
  .description('BMAD-METHOD-ODOO expansion pack CLI')
  .version('1.3.0');

// Calculate MD5 hash of file content
function calculateFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex').substring(0, 16);
}

program
  .command('install')
  .description('Install BMAD-METHOD-ODOO expansion pack into current project')
  .action(async () => {
    console.log(chalk.blue('🚀 Installing BMAD-METHOD-ODOO expansion pack...'));
    
    try {
      // Check if we're in a directory (don't require .bmad-core)
      const currentDir = process.cwd();
      console.log(chalk.blue(`📁 Installing in: ${currentDir}`));
      
      // Check if .bmad-core exists (recommended but not required)
      const bmadCoreExists = await fs.pathExists(path.join(currentDir, '.bmad-core'));
      if (!bmadCoreExists) {
        console.log(chalk.yellow('⚠️  No .bmad-core directory found. Consider initializing BMAD-METHOD first:'));
        console.log(chalk.yellow('   npx bmad-method install'));
        console.log(chalk.blue('   Continuing with expansion pack installation...'));
      }

      // Create .bmad-odoo-dev directory
      const expansionDir = '.bmad-odoo-dev';
      const expansionPath = path.join(currentDir, expansionDir);
      
      if (await fs.pathExists(expansionPath)) {
        console.log(chalk.yellow('⚠️  Expansion pack already exists. Reinstalling...'));
        await fs.remove(expansionPath);
      }

      await fs.ensureDir(expansionPath);
      console.log(chalk.green(`✅ Created: ${expansionDir}/`));

      // Create subdirectories
      const subdirs = ['agents', 'tasks', 'templates', 'checklists', 'data'];
      for (const subdir of subdirs) {
        await fs.ensureDir(path.join(expansionPath, subdir));
      }

      // Track files for install manifest
      const installedFiles = [];

      // Copy config.yaml
      const configContent = `name: bmad-odoo-dev
version: 1.2.0
short-title: Odoo ERP Development Pack
description: >-
  This expansion pack extends BMad Method with comprehensive Odoo ERP development
  capabilities. It's designed for teams that need to define, implement, and manage
  Odoo modules, customizations, and integrations using Doodba deployment patterns
  and OCA community standards.
author: BMad Community
slashPrefix: BMadOdooDev`;
      
      const configPath = path.join(expansionPath, 'config.yaml');
      await fs.writeFile(configPath, configContent);
      console.log(chalk.green(`   ✅ Config: config.yaml`));
      
      installedFiles.push({
        path: `${expansionDir}/config.yaml`,
        hash: calculateFileHash(configPath),
        modified: false
      });

      // Copy agents
      const agentsSrcDir = path.join(__dirname, '..', 'agents');
      if (await fs.pathExists(agentsSrcDir)) {
        const agentFiles = await fs.readdir(agentsSrcDir);
        for (const file of agentFiles) {
          if (file.endsWith('.md')) {
            const srcPath = path.join(agentsSrcDir, file);
            const destPath = path.join(expansionPath, 'agents', file);
            await fs.copy(srcPath, destPath);
            console.log(chalk.green(`   ✅ Agent: ${file}`));
            
            installedFiles.push({
              path: `${expansionDir}/agents/${file}`,
              hash: calculateFileHash(destPath),
              modified: false
            });
          }
        }
      }

      // Copy tasks
      const tasksSrcDir = path.join(__dirname, '..', 'tasks');
      if (await fs.pathExists(tasksSrcDir)) {
        const taskFiles = await fs.readdir(tasksSrcDir);
        for (const file of taskFiles) {
          if (file.endsWith('.md')) {
            const srcPath = path.join(tasksSrcDir, file);
            const destPath = path.join(expansionPath, 'tasks', file);
            await fs.copy(srcPath, destPath);
            console.log(chalk.green(`   ✅ Task: ${file}`));
            
            installedFiles.push({
              path: `${expansionDir}/tasks/${file}`,
              hash: calculateFileHash(destPath),
              modified: false
            });
          }
        }
      }

      // Copy templates
      const templatesSrcDir = path.join(__dirname, '..', 'templates');
      if (await fs.pathExists(templatesSrcDir)) {
        const templateFiles = await fs.readdir(templatesSrcDir);
        for (const file of templateFiles) {
          if (file.endsWith('.yaml') || file.endsWith('.yml')) {
            const srcPath = path.join(templatesSrcDir, file);
            const destPath = path.join(expansionPath, 'templates', file);
            await fs.copy(srcPath, destPath);
            console.log(chalk.green(`   ✅ Template: ${file}`));
            
            installedFiles.push({
              path: `${expansionDir}/templates/${file}`,
              hash: calculateFileHash(destPath),
              modified: false
            });
          }
        }
      }

      // Copy checklists
      const checklistsSrcDir = path.join(__dirname, '..', 'checklists');
      if (await fs.pathExists(checklistsSrcDir)) {
        const checklistFiles = await fs.readdir(checklistsSrcDir);
        for (const file of checklistFiles) {
          if (file.endsWith('.md')) {
            const srcPath = path.join(checklistsSrcDir, file);
            const destPath = path.join(expansionPath, 'checklists', file);
            await fs.copy(srcPath, destPath);
            console.log(chalk.green(`   ✅ Checklist: ${file}`));
            
            installedFiles.push({
              path: `${expansionDir}/checklists/${file}`,
              hash: calculateFileHash(destPath),
              modified: false
            });
          }
        }
      }

      // Copy data
      const dataSrcDir = path.join(__dirname, '..', 'data');
      if (await fs.pathExists(dataSrcDir)) {
        const dataFiles = await fs.readdir(dataSrcDir);
        for (const file of dataFiles) {
          if (file.endsWith('.md')) {
            const srcPath = path.join(dataSrcDir, file);
            const destPath = path.join(expansionPath, 'data', file);
            await fs.copy(srcPath, destPath);
            console.log(chalk.green(`   ✅ Data: ${file}`));
            
            installedFiles.push({
              path: `${expansionDir}/data/${file}`,
              hash: calculateFileHash(destPath),
              modified: false
            });
          }
        }
      }

      // Generate install-manifest.yaml
      const installManifest = {
        version: '1.2.0',
        installed_at: new Date().toISOString(),
        install_type: 'expansion-pack',
        expansion_pack_id: 'bmad-odoo-dev',
        expansion_pack_name: 'bmad-odoo-dev',
        ides_setup: ['claude-code'],
        files: installedFiles
      };

      const manifestPath = path.join(expansionPath, 'install-manifest.yaml');
      await fs.writeFile(manifestPath, yaml.stringify(installManifest));
      console.log(chalk.green(`   ✅ Manifest: install-manifest.yaml`));

      console.log(chalk.green('\n✅ BMAD-ODOO-DEV expansion pack installed successfully!'));
      console.log(chalk.blue(`\n📁 Installed to: ${expansionDir}/`));
      console.log(chalk.blue('\n🎯 Odoo agents now available:'));
      console.log('   • *odoo-analyst');
      console.log('   • *odoo-architect');
      console.log('   • *odoo-developer');
      console.log(chalk.blue('\n⚡ Slash commands available:'));
      console.log('   • *BMadOdooDev create-addon');
      console.log('   • *BMadOdooDev enhance-existing');
      console.log('   • *BMadOdooDev plan-migration');
      console.log(chalk.yellow('\n🔄 Please restart Claude Code to discover new agents'));
      
    } catch (error) {
      console.error(chalk.red('❌ Installation failed:'), error.message);
      process.exit(1);
    }
  });

program
  .command('validate')
  .description('Validate BMAD-METHOD-ODOO installation')
  .action(async () => {
    console.log(chalk.blue('🔍 Validating BMAD-METHOD-ODOO installation...'));
    
    try {
      const packagePath = path.join(__dirname, '..', 'package.json');
      const configPath = path.join(__dirname, '..', 'config.yaml');
      
      if (!await fs.pathExists(packagePath)) {
        throw new Error('Package.json not found');
      }
      
      if (!await fs.pathExists(configPath)) {
        throw new Error('Config.yaml not found');
      }

      const config = yaml.parse(await fs.readFile(configPath, 'utf8'));
      console.log(chalk.green('✅ BMAD-METHOD-ODOO expansion pack is valid'));
      console.log(chalk.blue(`   Version: ${config.version}`));
      console.log(chalk.blue(`   Agents: ${config.agents.length} available`));
      console.log(chalk.blue(`   Tasks: ${config.tasks.length} available`));
      console.log(chalk.blue(`   Templates: ${config.templates.length} available`));
      
    } catch (error) {
      console.error(chalk.red('❌ Validation failed:'), error.message);
      process.exit(1);
    }
  });

program
  .command('team-files')
  .description('List available team configuration files')
  .action(async () => {
    console.log(chalk.blue('📁 Available team configuration files:'));
    
    try {
      const teamsDir = path.join(__dirname, '..', 'teams');
      const files = await fs.readdir(teamsDir);
      
      files.forEach(file => {
        if (file.endsWith('.txt')) {
          console.log(chalk.green(`   ✓ ${file}`));
        }
      });
      
      console.log(chalk.blue('\n📝 Usage:'));
      console.log('   cp node_modules/bmad-method-odoo/teams/team-odoo-fullstack.txt ./');
      console.log('   # Upload to your AI agent with: "Your critical operating instructions are attached"');
      
    } catch (error) {
      console.error(chalk.red('❌ Failed to list team files:'), error.message);
    }
  });

program
  .command('agents')
  .description('List available Odoo specialist agents')
  .action(async () => {
    console.log(chalk.blue('🤖 Available Odoo specialist agents:'));
    
    const agents = [
      { name: '*odoo-analyst', desc: 'Business process analysis, requirements gathering, functional specifications, epic creation, and development story management (Scrum Master)' },
      { name: '*odoo-architect', desc: 'System architecture, technical design, deployment strategy, and migration planning' },
      { name: '*odoo-developer', desc: 'Code implementation, module development, deployment execution, and troubleshooting' }
    ];
    
    agents.forEach(agent => {
      console.log(chalk.green(`   ${agent.name}`));
      console.log(chalk.gray(`     ${agent.desc}`));
    });
    
    console.log(chalk.blue('\n⚙️  Available slash commands:'));
    const commands = [
      { name: '*BMadOdooDev create-addon', desc: 'Generate new Odoo addon' },
      { name: '*BMadOdooDev enhance-existing', desc: 'Plan system enhancements' },
      { name: '*BMadOdooDev plan-migration', desc: 'Structure version upgrades' },
      { name: '*BMadOdooDev doodba-deploy', desc: 'Deployment planning' }
    ];
    
    commands.forEach(cmd => {
      console.log(chalk.yellow(`   ${cmd.name}`));
      console.log(chalk.gray(`     ${cmd.desc}`));
    });
  });

program.parse();
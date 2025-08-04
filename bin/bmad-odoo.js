#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const semver = require('semver');
const yaml = require('yaml');

const program = new Command();

program
  .name('bmad-odoo')
  .description('BMAD-METHOD-ODOO expansion pack CLI')
  .version('1.0.0');

program
  .command('install')
  .description('Install BMAD-METHOD-ODOO expansion pack')
  .action(async () => {
    console.log(chalk.blue('🚀 Installing BMAD-METHOD-ODOO expansion pack...'));
    
    try {
      // First install BMAD-METHOD core if not present
      console.log(chalk.blue('📦 Checking BMAD-METHOD core installation...'));
      
      try {
        // Try to run bmad-method to check if it's installed
        const { execSync } = require('child_process');
        execSync('npx bmad-method --version', { stdio: 'pipe' });
        console.log(chalk.green('✅ BMAD-METHOD core found'));
      } catch (error) {
        console.log(chalk.yellow('📥 Installing BMAD-METHOD core...'));
        const { execSync } = require('child_process');
        execSync('npx bmad-method install', { stdio: 'inherit' });
        console.log(chalk.green('✅ BMAD-METHOD core installed'));
      }

      // Integrate with existing .bmad-core structure
      const bmadCorePath = path.join(process.cwd(), '.bmad-core');
      if (!await fs.pathExists(bmadCorePath)) {
        console.error(chalk.red('❌ .bmad-core folder not found. Please run this from a BMAD-METHOD project.'));
        console.log(chalk.yellow('   Initialize BMAD-METHOD first: npx bmad-method install'));
        process.exit(1);
      }

      console.log(chalk.blue('🔧 Integrating Odoo agents with BMAD-METHOD core...'));

      // Copy agents to .bmad-core/agents/
      const agentsSrcDir = path.join(__dirname, '..', 'agents');
      const agentsDestDir = path.join(bmadCorePath, 'agents');
      await fs.ensureDir(agentsDestDir);
      
      const agentFiles = await fs.readdir(agentsSrcDir);
      for (const file of agentFiles) {
        if (file.endsWith('.md')) {
          const srcPath = path.join(agentsSrcDir, file);
          const destPath = path.join(agentsDestDir, file);
          await fs.copy(srcPath, destPath);
          console.log(chalk.green(`   ✅ Agent: ${file} → .bmad-core/agents/`));
        }
      }

      // Copy tasks to .bmad-core/tasks/
      const tasksSrcDir = path.join(__dirname, '..', 'tasks');
      const tasksDestDir = path.join(bmadCorePath, 'tasks');
      await fs.ensureDir(tasksDestDir);
      
      const taskFiles = await fs.readdir(tasksSrcDir);
      for (const file of taskFiles) {
        if (file.endsWith('.md')) {
          const srcPath = path.join(tasksSrcDir, file);
          const destPath = path.join(tasksDestDir, file);
          await fs.copy(srcPath, destPath);
          console.log(chalk.green(`   ✅ Task: ${file} → .bmad-core/tasks/`));
        }
      }

      // Copy templates to .bmad-core/templates/
      const templatesSrcDir = path.join(__dirname, '..', 'templates');
      const templatesDestDir = path.join(bmadCorePath, 'templates');
      await fs.ensureDir(templatesDestDir);
      
      const templateFiles = await fs.readdir(templatesSrcDir);
      for (const file of templateFiles) {
        if (file.endsWith('.yaml') || file.endsWith('.yml')) {
          const srcPath = path.join(templatesSrcDir, file);
          const destPath = path.join(templatesDestDir, file);
          await fs.copy(srcPath, destPath);
          console.log(chalk.green(`   ✅ Template: ${file} → .bmad-core/templates/`));
        }
      }

      // Update core-config.yaml to add Odoo expansion pack
      const configPath = path.join(bmadCorePath, 'core-config.yaml');
      if (await fs.pathExists(configPath)) {
        console.log(chalk.blue('⚙️  Updating BMAD configuration...'));
        
        let configContent = await fs.readFile(configPath, 'utf8');
        
        // Add Odoo expansion pack configuration
        if (!configContent.includes('expansionPacks:')) {
          configContent += '\n# Expansion Packs\nexpansionPacks:\n';
        }
        
        if (!configContent.includes('bmad-method-odoo')) {
          configContent += `  bmad-method-odoo:
    enabled: true
    version: "1.0.2"
    slashPrefix: "OdooMethod"
    agents: ["odoo-functional-consultant", "odoo-technical-architect", "odoo-developer", "odoo-migration-specialist", "doodba-devops-expert"]
    domain: "odoo-development"
`;
          await fs.writeFile(configPath, configContent);
          console.log(chalk.green('   ✅ Updated core-config.yaml with Odoo expansion pack'));
        }
      }

      console.log(chalk.green('\n✅ BMAD-METHOD-ODOO expansion pack installed successfully!'));
      console.log(chalk.blue('\n🎯 Odoo agents now available in your BMAD-METHOD project:'));
      console.log('   • Agent switching: *odoo-functional-consultant, *odoo-technical-architect, *odoo-developer');
      console.log('   • Slash commands: *OdooMethod create-addon, *OdooMethod enhance-existing, *OdooMethod plan-migration');
      console.log(chalk.blue('\n📁 Files integrated into .bmad-core structure:'));
      console.log('   • 5 Odoo agents → .bmad-core/agents/');
      console.log('   • 3 Odoo tasks → .bmad-core/tasks/');  
      console.log('   • 3 Odoo templates → .bmad-core/templates/');
      console.log('   • Configuration updated in core-config.yaml');
      
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
      { name: '*odoo-functional-consultant', desc: 'Business process analysis and requirements' },
      { name: '*odoo-technical-architect', desc: 'System architecture and technical design' },
      { name: '*odoo-developer', desc: 'Implementation and coding guidance' },
      { name: '*odoo-migration-specialist', desc: 'Version migrations and upgrades' },
      { name: '*doodba-devops-expert', desc: 'Deployment and infrastructure' }
    ];
    
    agents.forEach(agent => {
      console.log(chalk.green(`   ${agent.name}`));
      console.log(chalk.gray(`     ${agent.desc}`));
    });
    
    console.log(chalk.blue('\n⚙️  Available slash commands:'));
    const commands = [
      { name: '*OdooMethod create-addon', desc: 'Generate new Odoo addon' },
      { name: '*OdooMethod enhance-existing', desc: 'Plan system enhancements' },
      { name: '*OdooMethod plan-migration', desc: 'Structure version upgrades' },
      { name: '*OdooMethod doodba-deploy', desc: 'Deployment planning' }
    ];
    
    commands.forEach(cmd => {
      console.log(chalk.yellow(`   ${cmd.name}`));
      console.log(chalk.gray(`     ${cmd.desc}`));
    });
  });

program.parse();
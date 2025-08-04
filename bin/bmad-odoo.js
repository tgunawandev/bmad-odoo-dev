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
      // Check if bmad-method is installed
      const bmadPath = path.join(process.cwd(), 'node_modules', 'bmad-method');
      if (!await fs.pathExists(bmadPath)) {
        console.error(chalk.red('❌ BMAD-METHOD core not found. Please install bmad-method first:'));
        console.log(chalk.yellow('   npm install bmad-method'));
        process.exit(1);
      }

      // Check version compatibility
      const bmadPackage = await fs.readJSON(path.join(bmadPath, 'package.json'));
      if (!semver.satisfies(bmadPackage.version, '>=4.30.0')) {
        console.error(chalk.red(`❌ BMAD-METHOD version ${bmadPackage.version} is not compatible.`));
        console.log(chalk.yellow('   Please upgrade to version 4.30.0 or higher.'));
        process.exit(1);
      }

      console.log(chalk.green('✅ BMAD-METHOD-ODOO expansion pack installed successfully!'));
      console.log(chalk.blue('\n📚 Next steps:'));
      console.log('   1. Copy team files: cp node_modules/bmad-method-odoo/teams/team-odoo-fullstack.txt ./');
      console.log('   2. Upload to your AI agent with instruction: "Your critical operating instructions are attached"');
      console.log('   3. Use Odoo agents: *odoo-functional-consultant, *odoo-technical-architect, etc.');
      console.log('   4. Use slash commands: *OdooMethod create-addon, *OdooMethod enhance-existing');
      
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
#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

async function postinstall() {
  console.log(chalk.blue('📦 Setting up BMAD-METHOD-ODOO expansion pack...'));
  
  try {
    // Check if this is being installed as a dependency
    const currentDir = process.cwd();
    const isInNodeModules = currentDir.includes('node_modules');
    
    if (isInNodeModules) {
      // We're being installed as a dependency
      const projectRoot = currentDir.split('node_modules')[0];
      const bmadConfigPath = path.join(projectRoot, 'bmad-config.json');
      
      // Check if BMAD-METHOD is already configured
      if (await fs.pathExists(bmadConfigPath)) {
        const config = await fs.readJSON(bmadConfigPath);
        
        // Add Odoo expansion pack to config
        if (!config.expansionPacks) {
          config.expansionPacks = [];
        }
        
        const odooPackExists = config.expansionPacks.some(pack => pack.name === 'bmad-method-odoo');
        if (!odooPackExists) {
          config.expansionPacks.push({
            name: 'bmad-method-odoo',
            version: '1.0.0',
            path: 'node_modules/bmad-method-odoo',
            enabled: true
          });
          
          await fs.writeJSON(bmadConfigPath, config, { spaces: 2 });
          console.log(chalk.green('✅ BMAD-METHOD-ODOO registered in project configuration'));
        }
      }
    }
    
    console.log(chalk.green('✅ Post-install setup completed!'));
    console.log(chalk.blue('\n📝 Next steps:'));
    console.log('   1. Run: npx bmad-odoo team-files');
    console.log('   2. Copy: cp node_modules/bmad-method-odoo/teams/team-odoo-fullstack.txt ./');
    console.log('   3. Upload team file to your AI agent');
    
  } catch (error) {
    console.log(chalk.yellow('⚠️  Post-install setup completed with warnings'));
    console.log(chalk.gray(`   ${error.message}`));
  }
}

postinstall();
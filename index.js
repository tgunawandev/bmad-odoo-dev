const fs = require('fs-extra');
const path = require('path');
const yaml = require('yaml');

class BmadMethodOdoo {
  constructor() {
    this.packagePath = path.join(__dirname, 'package.json');
    this.configPath = path.join(__dirname, 'config.yaml');
  }

  async getConfig() {
    try {
      const configContent = await fs.readFile(this.configPath, 'utf8');
      return yaml.parse(configContent);
    } catch (error) {
      throw new Error(`Failed to load config: ${error.message}`);
    }
  }

  async getPackageInfo() {
    try {
      return await fs.readJSON(this.packagePath);
    } catch (error) {
      throw new Error(`Failed to load package info: ${error.message}`);
    }
  }

  async getAgents() {
    const config = await this.getConfig();
    return config.agents || [];
  }

  async getTasks() {
    const config = await this.getConfig();
    return config.tasks || [];
  }

  async getTemplates() {
    const config = await this.getConfig();
    return config.templates || [];
  }

  async getTeamFiles() {
    const teamsDir = path.join(__dirname, 'teams');
    try {
      const files = await fs.readdir(teamsDir);
      return files.filter(file => file.endsWith('.txt'));
    } catch (error) {
      return [];
    }
  }

  async copyTeamFile(filename, destination) {
    const srcPath = path.join(__dirname, 'teams', filename);
    const destPath = path.resolve(destination);
    
    if (!await fs.pathExists(srcPath)) {
      throw new Error(`Team file not found: ${filename}`);
    }
    
    await fs.copy(srcPath, destPath);
    return destPath;
  }

  async isCompatibleWith(bmadMethodVersion) {
    const packageInfo = await this.getPackageInfo();
    const requiredVersion = packageInfo.bmadMethod.supportedVersions['bmad-method'];
    
    const semver = require('semver');
    return semver.satisfies(bmadMethodVersion, requiredVersion);
  }

  getInstallationGuide() {
    return {
      steps: [
        'Install core BMAD-METHOD: npm install bmad-method',
        'Install Odoo expansion pack: npm install bmad-method-odoo',
        'Copy team file: cp node_modules/bmad-method-odoo/teams/team-odoo-fullstack.txt ./',
        'Upload team file to your AI agent with instruction: "Your critical operating instructions are attached"',
        'Use Odoo agents: *odoo-functional-consultant, *odoo-technical-architect, etc.',
        'Use slash commands: *OdooMethod create-addon, *OdooMethod enhance-existing'
      ],
      cliCommands: {
        install: 'npx bmad-odoo install',
        validate: 'npx bmad-odoo validate',
        agents: 'npx bmad-odoo agents',
        teamFiles: 'npx bmad-odoo team-files'
      }
    };
  }
}

module.exports = BmadMethodOdoo;
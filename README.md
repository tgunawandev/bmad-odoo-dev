# BMAD-METHOD-ODOO: Odoo Development Expansion Pack

[![Version](https://img.shields.io/npm/v/bmad-method-odoo?color=blue&label=version)](https://www.npmjs.com/package/bmad-method-odoo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![BMAD-METHOD](https://img.shields.io/badge/BMAD--METHOD-v4.30%2B-brightgreen)](https://github.com/bmadcode/bmad-method)
[![Odoo](https://img.shields.io/badge/Odoo-13%2B-purple)](https://www.odoo.com)

**Specialized AI agents for Odoo ERP development using BMAD-METHOD framework with Doodba and OCA community patterns.**

## Overview

BMAD-METHOD-ODOO extends the powerful BMAD-METHOD framework with Odoo-specific expertise, transforming your AI agents into specialized Odoo development consultants. Perfect for brownfield projects, addon development, and enterprise Odoo customizations.

## Key Features

### 🎯 **Odoo-Specialized AI Agents**
- **Odoo Functional Consultant**: Business process analysis and requirements gathering
- **Odoo Technical Architect**: Module design, data modeling, and integration architecture  
- **Odoo Developer**: Addon development with ORM expertise and inheritance patterns
- **Odoo Migration Specialist**: Version upgrades and data migration strategies
- **Doodba DevOps Expert**: Docker deployment and environment management

### 🔧 **Brownfield-Focused Workflows**
- **Addon Creation**: From business requirement to deployable addon
- **System Enhancement**: Extending existing Odoo installations safely
- **Migration Planning**: Structured approach to version upgrades
- **Integration Design**: External system connections and API development

### 📋 **Odoo-Specific Templates**
- **Odoo PRD Template**: Business process focused requirements
- **Addon Architecture Template**: Technical specifications for modules
- **Migration Story Template**: Structured upgrade planning
- **Customization Brief**: Enhancement planning for existing systems

### 🏗️ **Doodba & OCA Integration**
- Full support for Doodba (Docker Odoo Base) deployment patterns
- OCA (Odoo Community Association) best practices and guidelines
- Multi-database, multi-company environment support
- Community addon integration and contribution workflows

## Quick Start

### Prerequisites

- Node.js v20+ (BMAD-METHOD core will be installed automatically)
- Existing Odoo project (recommended) or new project setup

### Installation

```bash
# Simple one-command installation (integrates with existing BMAD-METHOD project)
npx bmad-method-odoo install
```

That's it! This single command will:
- Detect your existing BMAD-METHOD project (recommended but not required)
- **Install 5 Odoo agents** into `.bmad-odoo-dev/agents/`
- **Add 3 Odoo tasks** to `.bmad-odoo-dev/tasks/`  
- **Add 3 Odoo templates** to `.bmad-odoo-dev/templates/`
- **Generate install manifest** for tracking and updates
- **No manual file uploads required** - seamless integration!

### Alternative Installation

If you prefer the traditional approach:

```bash
# Install both packages locally
npm install bmad-method bmad-method-odoo

# Then run setup
npx bmad-odoo install
```

## Usage

### 1. Agent Integration (Automatic)

After installation, Odoo agents are **automatically available** in your BMAD-METHOD project:

**No file uploads needed!** The agents are automatically discovered by BMAD-METHOD.

**Available Agents:**
- `*odoo-functional-consultant` - Business process analysis and requirements
- `*odoo-technical-architect` - System architecture and technical design  
- `*odoo-developer` - Implementation and coding guidance
- `*odoo-migration-specialist` - Version migrations and upgrades
- `*doodba-devops-expert` - Deployment and infrastructure

### 2. Addon Development Workflow

The expansion pack fully supports Odoo addon development with specialized tasks:

**Available through `*OdooMethod` slash prefix:**
- `*OdooMethod create-addon` - Complete addon generation from business requirements
- `*OdooMethod enhance-existing` - Brownfield system enhancements  
- `*OdooMethod plan-migration` - Version upgrade planning
- `*OdooMethod doodba-deploy` - Deployment and infrastructure

**Integrated Templates:**
- **Odoo PRD Template** - Business requirements with Odoo-specific sections
- **Odoo Architecture Template** - Technical design with ORM patterns
- **Odoo Story Template** - Development tasks with OCA compliance

### 3. Development Process

```bash
# Standard BMAD workflow with Odoo specialization
npx bmad-method shard

# Stories generated in docs/stories/ include:
# - Odoo-specific technical context
# - OCA compliance requirements  
# - Doodba deployment patterns
# - Community module recommendations
```

## Supported Odoo Environments

### ✅ Fully Supported
- **Doodba-based deployments** (Docker Odoo Base)
- **OCA community addons** integration
- **Multi-database environments** (production pattern)
- **Odoo versions**: 13.0, 14.0, 15.0, 16.0, 17.0, 18.0

### 🎯 Specialized For
- **Brownfield projects** - Existing Odoo installations
- **Enterprise customizations** - Complex business requirements
- **Multi-company setups** - Operating unit management
- **Community contributions** - OCA-compliant addon development

## Architecture Integration

### With BMAD-METHOD Core
BMAD-METHOD-ODOO seamlessly integrates with the core framework:

- **Inherits** all core BMAD agents (PM, QA, SM)
- **Extends** planning and development workflows with Odoo expertise
- **Maintains** compatibility with core BMAD updates
- **Preserves** existing BMAD project configurations

### Odoo Environment Integration
Works perfectly with your existing Odoo setup:

- **Detects** Doodba project structure automatically
- **Integrates** with invoke task workflows
- **Supports** multiple database environments
- **Follows** OCA development patterns

## Example Workflows

### Creating a New Addon

1. **Planning Phase** (Web UI):
   ```
   *odoo-functional-consultant
   "I need to create a sales commission addon for multi-tier sales teams"
   ```

2. **Architecture Phase** (Web UI):
   ```
   *odoo-technical-architect  
   "Design the data model and integration points for this sales commission system"
   ```

3. **Development Phase** (IDE):
   - Stories created automatically with full context
   - Odoo Developer agent provides ORM guidance
   - Doodba DevOps expert handles deployment

### Enhancing Existing System

1. **Analysis**:
   ```
   *OdooMethod enhance-existing
   "Add approval workflow to purchase orders over $10k"
   ```

2. **Implementation**:
   - Brownfield enhancement patterns
   - Safe inheritance strategies  
   - Integration testing guidance

## Best Practices

### For Odoo Development
- **Always use inheritance** over direct modification
- **Follow OCA patterns** for community compatibility
- **Test in isolated environments** before production
- **Document business logic** in functional specifications

### For BMAD Integration
- **Start with PRD creation** using Odoo Functional Consultant
- **Use architecture phase** for complex integrations
- **Leverage story sharding** for development organization
- **Follow BMAD development cycle** for consistency

## Troubleshooting

### Common Issues

**Expansion pack not recognized:**
```bash
# Ensure proper installation
npm list bmad-method-odoo
npx bmad-method validate --expansion-pack odoo
```

**Odoo commands not available:**
```bash
# Check slash prefix configuration
grep -r "OdooMethod" node_modules/bmad-method-odoo/
```

**Doodba integration issues:**
```bash
# Verify project structure
ls -la docker-compose.yml common.yaml repos.yaml
```

## Contributing

We welcome contributions to improve Odoo development workflows:

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/odoo-enhancement`
3. **Add Odoo-specific agents/tasks/templates**
4. **Test with real Odoo projects**
5. **Submit pull request**

### Areas for Contribution
- Additional Odoo version support
- Industry-specific templates
- Advanced migration strategies
- Integration patterns with external systems

## Support & Community

- 💬 [Discord Community](https://discord.gg/gk8jAdXWmj) - Join the BMAD community
- 🐛 [Issue Tracker](https://github.com/tgunawandev/BMAD-METHOD-ODOO/issues)
- 📚 [Documentation](https://github.com/tgunawandev/BMAD-METHOD-ODOO/wiki)
- 🎥 [Video Tutorials](https://www.youtube.com/@BMadCode) - BMAD-METHOD channel

## Compatibility

| BMAD-METHOD | BMAD-METHOD-ODOO | Odoo Versions | Status |
|-------------|------------------|---------------|---------|
| 4.30.x+     | 1.0.x           | 13.0-18.0     | ✅ Active |
| 4.25.x-4.29.x | -             | -             | ❌ Not supported |

## License

MIT License - see [LICENSE](LICENSE) for details.

## Credits & Acknowledgments

This expansion pack extends and builds upon several amazing open-source projects:

### Core Framework
- **[BMAD-METHOD](https://github.com/bmadcode/bmad-method)** by **Brian (BMad) Madison** - The foundational AI-driven development framework that makes this expansion pack possible

### Odoo Ecosystem
- **[Odoo](https://www.odoo.com)** by **Odoo SA** - The comprehensive open-source ERP platform
- **[Odoo Community Association (OCA)](https://odoo-community.org)** - Community-driven best practices, standards, and high-quality addons
- **[Doodba](https://github.com/Tecnativa/doodba)** by **Tecnativa** - Docker-based Odoo development and deployment framework

### Development Tools & Patterns
- **[Doodba Copier Template](https://github.com/Tecnativa/doodba-copier-template)** - Project scaffolding and development patterns
- **[OCA Maintainer Quality Tools](https://github.com/OCA/maintainer-quality-tools)** - Code quality and testing standards
- **[pre-commit-odoo](https://github.com/OCA/odoo-pre-commit-hooks)** - Development workflow automation

### Community & Inspiration  
- **BMAD Community** - For continuous feedback and collaboration
- **Odoo Developer Community** - For sharing knowledge and best practices
- **Open Source Contributors** - Everyone who contributes to the Odoo ecosystem

### Special Thanks
- **Brian (BMad) Madison** - For creating BMAD-METHOD and inspiring AI-driven development workflows
- **Tecnativa Team** - For Doodba framework and excellent Odoo containerization patterns
- **OCA Contributors** - For maintaining high-quality community standards and modules
- **Odoo SA** - For building an amazing open-source ERP platform

This expansion pack stands on the shoulders of giants - thank you to all the contributors who make the Odoo ecosystem incredible!

---

<sub>Built with ❤️ for the Odoo development community, extending the powerful BMAD-METHOD framework</sub>
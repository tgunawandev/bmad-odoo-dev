# BMAD-ODOO-DEV: Odoo Development Expansion Pack

[![Version](https://img.shields.io/npm/v/bmad-odoo-dev?color=blue&label=version)](https://www.npmjs.com/package/bmad-odoo-dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![BMAD-METHOD](https://img.shields.io/badge/BMAD--METHOD-v4.30%2B-brightgreen)](https://github.com/bmadcode/bmad-method)
[![Odoo](https://img.shields.io/badge/Odoo-13%2B-purple)](https://www.odoo.com)

**Specialized AI agents for Odoo ERP development using BMAD-METHOD framework with Doodba and OCA community patterns.**

## Overview

BMAD-ODOO-DEV extends the powerful BMAD-METHOD framework with Odoo-specific expertise, transforming your AI agents into specialized Odoo development consultants. Perfect for brownfield projects, addon development, and enterprise Odoo customizations.

## Key Features

### 🎯 **Odoo-Specialized AI Agents**
- **Odoo Analyst (Sofia)**: Business process analysis, requirements gathering, functional specifications, epic creation, and development story management (includes Scrum Master responsibilities)
- **Odoo Architect (Diego)**: System architecture, technical design, deployment strategy, and migration planning
- **Odoo Developer (Carlos)**: Code implementation, module development, deployment execution, and troubleshooting

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
npx bmad-odoo-dev install
```

That's it! This single command will:
- Detect your existing BMAD-METHOD project (recommended but not required)
- **Install 3 specialized Odoo agents** into `.bmad-odoo-dev/agents/`
- **Add 3 Odoo tasks** to `.bmad-odoo-dev/tasks/`  
- **Add 3 Odoo templates** to `.bmad-odoo-dev/templates/`
- **Generate install manifest** for tracking and updates
- **No manual file uploads required** - seamless integration!

### Alternative Installation

If you prefer the traditional approach:

```bash
# Install both packages locally
npm install bmad-method bmad-odoo-dev

# Then run setup
npx bmad-odoo install
```

## Usage

### 1. Agent Integration (Automatic)

After installation, Odoo agents are **automatically available** in your BMAD-METHOD project:

**No file uploads needed!** The agents are automatically discovered by BMAD-METHOD.

**Available Agents:**
- `*odoo-analyst` - Business process analysis, requirements gathering, functional specifications, epic creation, and development story management (Scrum Master)
- `*odoo-architect` - System architecture, technical design, deployment strategy, and migration planning
- `*odoo-developer` - Code implementation, module development, deployment execution, and troubleshooting

### 2. Addon Development Workflow

The expansion pack fully supports Odoo addon development with specialized tasks:

**Available through `*BMadOdooDev` slash prefix:**
- `*BMadOdooDev create-addon` - Complete addon generation from business requirements
- `*BMadOdooDev enhance-existing` - Brownfield system enhancements  
- `*BMadOdooDev plan-migration` - Version upgrade planning

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

1. **Business Analysis Phase** (Web UI):
   ```
   *odoo-analyst
   "I need to create a sales commission addon for multi-tier sales teams"
   ```

2. **Architecture Phase** (Web UI):
   ```
   *odoo-architect  
   "Design the data model and integration points for this sales commission system"
   ```

3. **Story Creation Phase** (Web UI):
   ```
   *odoo-analyst
   "Transform the architecture into detailed development stories for the sales commission system"
   ```

4. **Development Phase** (IDE):
   - Stories created automatically with full context
   - Odoo Developer agent provides ORM guidance and deployment execution

### Enhancing Existing System

1. **Analysis**:
   ```
   *BMadOdooDev enhance-existing
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
- **Start with business analysis** using Odoo Analyst
- **Use architecture phase** for complex integrations and technical design
- **Transform architecture into stories** using Odoo Analyst (Scrum Master role)
- **Follow BMAD development cycle** for consistency

## Troubleshooting

### Common Issues

**Expansion pack not recognized:**
```bash
# Ensure proper installation
npm list bmad-odoo-dev
npx bmad-odoo validate
```

**Odoo commands not available:**
```bash
# Check slash prefix configuration
grep -r "BMadOdooDev" node_modules/bmad-odoo-dev/
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
- 🐛 [Issue Tracker](https://github.com/tgunawandev/bmad-odoo-dev/issues)
- 📚 [Documentation](https://github.com/tgunawandev/bmad-odoo-dev/wiki)
- 🎥 [Video Tutorials](https://www.youtube.com/@BMadCode) - BMAD-METHOD channel

## Compatibility

| BMAD-METHOD | BMAD-ODOO-DEV | Odoo Versions | Status |
|-------------|---------------|---------------|---------|
| 4.30.x+     | 1.3.x+        | 13.0-18.0     | ✅ Active |
| 4.25.x-4.29.x | -           | -             | ❌ Not supported |

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

<sub>Built with ❤️ for the Odoo development community, extending the powerful BMAD-METHOD framework with streamlined 3-agent workflow and enhanced Scrum Master capabilities</sub>
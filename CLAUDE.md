# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BMAD-METHOD-ODOO is an expansion pack that extends the powerful BMAD-METHOD framework with Odoo ERP development capabilities. It transforms AI agents into specialized Odoo development consultants while maintaining full compatibility with core BMAD-METHOD updates.

**Key Integration Points:**
- **Extends** BMAD-METHOD v4.30+ without replacing core functionality
- **Focuses** on brownfield Odoo projects and existing system enhancements
- **Integrates** with Doodba (Docker Odoo Base) deployment patterns
- **Follows** OCA (Odoo Community Association) best practices and standards
- **Supports** Odoo versions 13.0 through 18.0

## Essential Commands

### Installation and Setup

```bash
# Install alongside core BMAD-METHOD (required)
npm install bmad-method bmad-method-odoo

# Initialize BMAD with Odoo expansion pack
npx bmad-method install --expansion-pack odoo

# Validate expansion pack installation
npx bmad-method validate --expansion-pack odoo

# Check compatibility
npm list bmad-method-odoo
```

### Team File Usage for AI Agents

```bash
# Get Odoo-specific team bundle for Web UI agents
cp node_modules/bmad-method-odoo/dist/teams/team-odoo-fullstack.txt ./

# Upload to your AI agent (Gemini Gem, CustomGPT, etc.) with instruction:
# "Your critical operating instructions are attached, do not break character as directed"
```

### Document Workflow Management

```bash
# Shard planning documents into development stories
npx bmad-method shard

# Documents are processed from:
# - docs/prd.md (Product Requirements Document)
# - docs/architecture.md (Technical Architecture)

# Generated stories appear in:
# - docs/stories/ (Individual development tasks)
```

## Specialized Agent Workflow

### Phase 1: Planning (Web UI)

Use these specialized agents in your Web UI (ChatGPT, Gemini, Claude, etc.):

#### Business Analysis
- `*odoo-functional-consultant` - Business process analysis and requirements gathering
  - Analyzes business workflows and pain points
  - Creates functional specifications aligned with Odoo capabilities
  - Identifies integration points with existing systems

#### Technical Architecture  
- `*odoo-technical-architect` - Module design, data modeling, and integration architecture
  - Designs technical solution following OCA patterns
  - Plans module dependencies and inheritance strategies
  - Ensures compatibility with existing Odoo installations

#### Implementation Planning
- `*odoo-developer` - Technical implementation guidance with ORM expertise
  - Provides detailed implementation roadmaps
  - Identifies potential technical challenges
  - Suggests best practices for Odoo development

### Phase 2: Development (IDE)

After completing planning phase and generating PRD/Architecture documents:

```bash
# Process planning documents into actionable stories
npx bmad-method shard

# Work with generated stories in docs/stories/
# Each story contains:
# - Business context from PRD
# - Technical guidance from Architecture
# - Odoo-specific implementation details
```

## Odoo-Specific Slash Commands

Available through the `*OdooMethod` slash prefix:

### Addon Development
- `*OdooMethod create-addon` - Generate new addon from business requirements
  - Creates complete addon structure following OCA guidelines
  - Includes manifest, models, views, and security configurations
  - Provides inheritance patterns for brownfield integration

### System Enhancement
- `*OdooMethod enhance-existing` - Plan brownfield system enhancements
  - Analyzes existing module dependencies
  - Plans safe inheritance and extension strategies
  - Provides migration and rollback procedures

### Version Management
- `*OdooMethod plan-migration` - Structure version upgrade approach
  - Assesses compatibility between Odoo versions
  - Plans module update sequences
  - Identifies potential breaking changes

### Deployment Management
- `*OdooMethod doodba-deploy` - Deployment planning and execution
  - Creates Docker compose configurations
  - Plans multi-environment deployment strategies
  - Provides monitoring and scaling recommendations

## Architecture Integration

### Core BMAD-METHOD Compatibility

This expansion pack maintains full compatibility with core BMAD-METHOD:

- **Inherits** all core agents (PM, QA, SM, Architect, Developer)
- **Extends** planning and development workflows with Odoo expertise  
- **Preserves** existing BMAD project configurations and workflows
- **Maintains** compatibility with future BMAD updates

### Doodba Framework Integration

Works seamlessly with Doodba-based Odoo projects:

- **Detects** Doodba project structure automatically
- **Integrates** with invoke task workflows (`tasks.py`)
- **Supports** multiple database environments (devel, test, prod)
- **Follows** OCA development patterns and community standards

## Reference Project Integration

The expansion pack integrates knowledge from these reference projects:

### odoo16-erp (/home/tgunawan/project/01-web/odoo/odoo16-erp)
- **Manufacturing ERP** with extensive OCA module integration
- **Multi-database** production environment patterns
- **Advanced Jasper Reports** and custom reporting
- **Complex business workflows** and approval systems

Key patterns learned:
```bash
# Module management (CRITICAL: Always specify modules)
docker compose run --rm odoo odoo -d database_name -u module_name --stop-after-init

# Smart module updates using click-odoo
docker compose run --rm odoo click-odoo-update -d database_name

# Interactive Python scripting with Odoo environment
echo "python_code_here" | docker compose run --rm odoo click-odoo -d database_name --rollback
```

### odoo17-b2b (/home/tgunawan/project/01-web/odoo/odoo17-b2b)
- **B2B commerce** platform implementations
- **Multi-company** and partner relationship management
- **Integration patterns** with external systems

### odoo18-hris (/home/tgunawan/project/01-web/odoo/odoo18-hris)
- **HR management** system architecture
- **Payroll** and timesheet management
- **Employee lifecycle** management patterns

## Daily Development Workflow

### 1. Environment Setup (Doodba Projects)
```bash
# Navigate to your Odoo project
cd /path/to/your/odoo-project

# Initialize development environment
invoke develop
invoke git-aggregate  
invoke img-build --pull
invoke start
```

### 2. AI-Driven Planning Phase
```bash
# In Web UI with team-odoo-fullstack.txt uploaded:
# 1. Start with business analysis
*odoo-functional-consultant
"I need to enhance our manufacturing process with advanced lot tracking"

# 2. Move to technical architecture  
*odoo-technical-architect
"Design the technical solution for advanced lot tracking in manufacturing"

# 3. Get implementation guidance
*odoo-developer  
"Provide detailed implementation steps for the lot tracking enhancement"
```

### 3. Development Phase
```bash
# Process planning documents
npx bmad-method shard

# Work with generated stories in IDE
# Each story in docs/stories/ contains complete context

# Standard Doodba development cycle
invoke install --modules=your_new_module
invoke test --modules=your_new_module
invoke restart
```

### 4. Testing and Deployment
```bash
# Use specialized deployment agent
*OdooMethod doodba-deploy
"Plan deployment strategy for the new lot tracking module"

# Execute deployment steps as provided by agent
invoke img-build --pull
invoke git-aggregate
# ... additional deployment steps as recommended
```

## Best Practices

### For Odoo Development
- **Always use inheritance** over direct modification of core modules
- **Follow OCA patterns** for community compatibility and long-term maintenance
- **Test in isolated environments** before production deployment
- **Document business logic** in functional specifications using AI agents

### For BMAD Integration  
- **Start with PRD creation** using Odoo Functional Consultant in Web UI
- **Use architecture phase** for complex integrations and system design
- **Leverage story sharding** to break down large features into manageable tasks
- **Follow BMAD development cycle** for consistency and quality assurance

### For Brownfield Projects
- **Analyze existing modules** before making changes
- **Plan inheritance strategies** to avoid conflicts
- **Test integration points** thoroughly
- **Maintain upgrade compatibility** with future Odoo versions

## Common Development Scenarios

### Creating New Business Module
1. **Business Analysis** (Web UI):
   ```
   *odoo-functional-consultant
   "Create a sales commission tracking system for multi-tier sales teams"
   ```

2. **Technical Design** (Web UI):
   ```
   *odoo-technical-architect
   "Design data model and integration points for sales commission system"
   ```

3. **Implementation** (IDE):
   - Stories automatically generated with complete context
   - Technical guidance provided by specialized agents
   - Integration patterns for existing Odoo installation

### Enhancing Existing System
```bash
# Analysis and planning
*OdooMethod enhance-existing
"Add approval workflow to purchase orders over $10,000"

# Implementation follows established patterns
# - Safe inheritance strategies
# - Integration testing procedures  
# - Rollback and recovery plans
```

### Version Migration Planning
```bash
*OdooMethod plan-migration
"Plan migration from Odoo 16 to Odoo 17 for manufacturing modules"

# Provides:
# - Compatibility assessment
# - Migration sequence planning
# - Testing strategies
# - Rollback procedures
```

## Configuration Files

### Core Configuration (config.yaml)
- **slashPrefix**: `OdooMethod` for Odoo-specific commands
- **category**: `domain-specific` for Odoo development focus
- **framework**: `doodba` for Docker-based deployment
- **community**: `oca` for community module standards

### Integration Settings
- **inheritsFrom**: `bmad-method` for core compatibility
- **extendsCore**: `true` for additive functionality
- **standalone**: `false` requiring core BMAD installation

## Supported Environments

### Fully Supported
- **Doodba-based deployments** (Docker Odoo Base)  
- **OCA community addons** integration and development
- **Multi-database environments** (development, testing, production)
- **Odoo versions**: 13.0, 14.0, 15.0, 16.0, 17.0, 18.0

### Specialized For
- **Brownfield projects** with existing Odoo installations
- **Enterprise customizations** with complex business requirements
- **Multi-company setups** and organizational unit management
- **Community contributions** following OCA-compliant development

## Troubleshooting

### Expansion Pack Issues
```bash
# Verify installation
npm list bmad-method-odoo
npx bmad-method validate --expansion-pack odoo

# Check team file availability
ls -la node_modules/bmad-method-odoo/dist/teams/

# Validate slash prefix
grep -r "OdooMethod" node_modules/bmad-method-odoo/
```

### Integration Issues
```bash
# Verify core BMAD compatibility
npx bmad-method --version  # Should be v4.30+

# Check project structure recognition
npx bmad-method validate

# Verify Doodba project detection
ls -la docker-compose.yml common.yaml tasks.py
```

### Development Issues
```bash
# Standard Doodba troubleshooting
invoke logs --tail=50
invoke restart
invoke resetdb --modules=base

# Module installation verification
docker compose run --rm odoo click-odoo -d database_name --rollback -c "
modules = env['ir.module.module'].search([('state', '=', 'installed')])
print([m.name for m in modules if 'your_module' in m.name])
"
```

## Important Notes

- **This is an expansion pack** - requires core BMAD-METHOD installation
- **Non-breaking design** - all BMAD-METHOD updates remain compatible
- **Doodba integration** - works with existing Doodba project structures
- **OCA compliance** - follows community standards for long-term maintainability
- **Brownfield focus** - designed for enhancing existing Odoo installations

## Quick Reference

### Most Common Commands
```bash
# Setup expansion pack
npm install bmad-method bmad-method-odoo
npx bmad-method install --expansion-pack odoo

# Get team file for AI agents
cp node_modules/bmad-method-odoo/dist/teams/team-odoo-fullstack.txt ./

# Process planning into development stories
npx bmad-method shard

# Work with Doodba development cycle
invoke develop && invoke start
invoke install --modules=your_module && invoke test
```

### Emergency Recovery
```bash
# Reset expansion pack installation
npm uninstall bmad-method-odoo
npm install bmad-method-odoo
npx bmad-method install --expansion-pack odoo

# Verify core BMAD compatibility
npx bmad-method validate
```
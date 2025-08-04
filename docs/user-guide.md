# BMAD-METHOD-ODOO User Guide

Complete guide for using the BMAD-METHOD-ODOO expansion pack with specialized Odoo development agents.

## Odoo Specialized Agents

BMAD-METHOD-ODOO introduces specialized agents for Odoo ERP development:

#### *odoo-functional-consultant
**Role**: Expert Odoo Functional Consultant  
**Expertise**: Business process analysis and Odoo requirements gathering  
**Use When**: 
- Analyzing business workflows and identifying Odoo solutions
- Mapping business processes to standard Odoo functionality  
- Creating functional specifications aligned with Odoo capabilities
- Planning user roles and permission structures

**Example Usage**:
```
*odoo-functional-consultant
"I need to enhance our manufacturing process with advanced lot tracking and quality control workflows"
```

#### *odoo-technical-architect
**Role**: Expert Odoo Technical Architect  
**Expertise**: Odoo system architecture and technical design  
**Use When**:
- Designing scalable Odoo technical solutions
- Planning module architecture following OCA patterns
- Planning integration architecture with external systems
- Ensuring compatibility with future Odoo versions

**Example Usage**:
```
*odoo-technical-architect
"Design the technical solution for multi-company inventory management with automated procurement"
```

#### *odoo-developer
**Role**: Expert Odoo Developer  
**Expertise**: Odoo module development and implementation  
**Use When**:
- Implementing Odoo modules following OCA standards
- Developing using proper ORM patterns and best practices
- Creating secure and performant custom functionality
- Implementing comprehensive testing and quality assurance

**Example Usage**:
```
*odoo-developer
"Implement a custom approval workflow for purchase orders over $10,000 with email notifications"
```

#### *odoo-migration-specialist
**Role**: Expert Odoo Migration Specialist  
**Expertise**: Odoo version migrations and system upgrades  
**Use When**:
- Planning safe migration strategies between Odoo versions
- Assessing custom module compatibility and upgrade requirements
- Designing data migration and system transition approaches
- Developing rollback and contingency strategies

**Example Usage**:
```
*odoo-migration-specialist
"Plan migration from Odoo 16 to Odoo 17 for our manufacturing setup with 15 custom modules"
```

#### *doodba-devops-expert
**Role**: Expert Doodba DevOps Engineer  
**Expertise**: Docker-based Odoo deployment and infrastructure  
**Use When**:
- Designing scalable Doodba deployment architectures
- Planning CI/CD pipelines for Odoo module deployment
- Implementing monitoring, backup, and disaster recovery
- Optimizing performance and resource utilization

**Example Usage**:
```
*doodba-devops-expert
"Design production deployment architecture for multi-database Odoo setup with 500+ concurrent users"
```

## Installation and Configuration

The BMAD-METHOD-ODOO expansion pack extends the core framework with domain-specific capabilities for Odoo development.

#### Installation

Simple one-command installation:

```bash
# Install both BMAD-METHOD core and Odoo expansion pack
npx bmad-method-odoo install

# This automatically:
# - Installs BMAD-METHOD core (if needed)
# - Sets up Odoo expansion pack
# - Copies team files to your project
# - No compilation required
```

#### Team File Setup

Team files are automatically copied during installation:

```bash
# Files automatically available in your project:
# - team-odoo-fullstack.txt (complete Odoo development team)
# - team-odoo-functional.txt (business analysis focused)

# Upload team-odoo-fullstack.txt to your AI agent with instruction:
# "Your critical operating instructions are attached, do not break character as directed"
```

#### Slash Commands

The expansion pack introduces Odoo-specific slash commands:

- `*OdooMethod create-addon` - Generate new Odoo addon from business requirements
- `*OdooMethod enhance-existing` - Plan brownfield system enhancements  
- `*OdooMethod plan-migration` - Structure version upgrade approach
- `*OdooMethod doodba-deploy` - Deployment planning and execution

#### CLI Commands

```bash
# Install expansion pack
npx bmad-odoo install

# Validate installation
npx bmad-odoo validate

# List available agents
npx bmad-odoo agents

# Show team configuration files
npx bmad-odoo team-files
```

## Odoo Development Workflow

The BMAD-METHOD-ODOO expansion pack provides a specialized workflow for Odoo ERP development projects.

#### Phase 1: Business Analysis (Web UI)

Start with business process analysis using specialized agents:

1. **Requirements Gathering**:
   ```
   *odoo-functional-consultant
   "Analyze our current order-to-cash process and identify areas for Odoo optimization"
   ```

2. **Solution Design**:
   ```
   *odoo-technical-architect
   "Design technical architecture for multi-company sales workflow with automated pricing"
   ```

#### Phase 2: Planning and Documentation

Process planning outputs through BMAD framework:

```bash
# Shard planning documents into development stories
npx bmad-method shard

# Stories generated in docs/stories/ with Odoo-specific context
```

#### Phase 3: Development (IDE)

Work with generated stories using specialized development guidance:

- Stories include business context from PRD
- Technical guidance from Architecture phase  
- Odoo-specific implementation details
- OCA compliance requirements

#### Phase 4: Deployment

Use deployment specialist for production readiness:

```
*OdooMethod doodba-deploy
"Plan production deployment for manufacturing ERP with 200 users across 3 locations"
```

### Doodba Integration

The expansion pack integrates seamlessly with Doodba-based Odoo projects:

```bash
# Standard Doodba development cycle with BMAD integration
invoke develop && invoke git-aggregate && invoke start
invoke install --modules=your_new_module
invoke test --modules=your_new_module
invoke restart
```

### OCA Compliance

All generated code and guidance follows OCA (Odoo Community Association) standards:

- Module structure follows OCA guidelines
- Code quality standards (flake8, pylint-odoo)
- Security best practices implementation  
- Community contribution readiness

## Best Practices

#### Brownfield Development Focus

The expansion pack specializes in enhancing existing Odoo installations:

- **Safe inheritance strategies** over core modifications
- **Compatibility planning** for future Odoo versions
- **Integration testing** with existing modules
- **Rollback procedures** for safe deployment

#### Architecture Principles

- **Non-breaking design**: Maintains full BMAD-METHOD compatibility
- **OCA compliance**: Ensures community standards adherence
- **Version support**: Compatible with Odoo 13.0 through 18.0
- **Doodba integration**: Works with Docker Odoo Base deployments

#### Development Lifecycle

1. **Business Analysis** → Functional requirements with Odoo mapping
2. **Technical Architecture** → System design with OCA patterns  
3. **Story Generation** → Development tasks with full context
4. **Implementation** → OCA-compliant module development
5. **Testing** → Comprehensive validation and QA
6. **Deployment** → Doodba-based production deployment

This expansion pack transforms AI agents into specialized Odoo development consultants while maintaining full compatibility with core BMAD-METHOD updates and workflows.
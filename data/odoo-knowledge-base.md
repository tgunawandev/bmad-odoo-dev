# Odoo Knowledge Base for BMAD-METHOD-ODOO

## Essential Patterns & Quick Reference

> **Note**: For comprehensive, up-to-date Odoo documentation, use Context7 commands:
> - `*odoo-docs {topic}` - Get specific Odoo documentation  
> - `*odoo-api {module}` - Get API reference for modules
> - `*odoo-version {version} {topic}` - Get version-specific information

### Core Inheritance Patterns

**Class Inheritance** (extending models):
```python
class ResPartnerExtension(models.Model):
    _inherit = 'res.partner'
    custom_field = fields.Char('Custom Field')
```

**Prototype Inheritance** (delegation):
```python
class CustomPartner(models.Model):
    _name = 'custom.partner'
    _inherits = {'res.partner': 'partner_id'}
    partner_id = fields.Many2one('res.partner', required=True, ondelete='cascade')
```

**In-place Extension**:
```python
class ResPartner(models.Model):
    _inherit = 'res.partner'  # No _name = extends existing model
    new_field = fields.Char('New Field')
```

### Essential Field Types

| Type | Usage | Example |
|------|-------|---------|
| `Char` | Short text | `name = fields.Char('Name', required=True)` |
| `Text` | Long text | `description = fields.Text('Description')` |
| `Integer` | Numbers | `quantity = fields.Integer('Quantity', default=1)` |
| `Float` | Decimals | `price = fields.Float('Price', digits=(16,2))` |
| `Boolean` | True/False | `active = fields.Boolean('Active', default=True)` |
| `Date` | Date only | `date_start = fields.Date('Start Date')` |
| `Datetime` | Date + Time | `create_date = fields.Datetime('Created')` |
| `Selection` | Dropdown | `state = fields.Selection([('draft','Draft')], 'State')` |
| `Many2one` | Foreign key | `partner_id = fields.Many2one('res.partner')` |
| `One2many` | Reverse FK | `line_ids = fields.One2many('sale.line', 'order_id')` |
| `Many2many` | Link table | `tag_ids = fields.Many2many('product.tag')` |

### Common ORM Operations

**Creating Records**:
```python
# Single record
record = self.env['model.name'].create({'field1': 'value1'})

# Multiple records  
records = self.env['model.name'].create([
    {'field1': 'value1'}, {'field1': 'value2'}
])
```

**Reading/Searching**:
```python
# Search and read
records = self.env['model.name'].search([('field', '=', 'value')])
records = self.env['model.name'].search([('field', 'in', ['val1', 'val2'])])

# Browse by ID
record = self.env['model.name'].browse(record_id)
```

**Updating Records**:
```python
records.write({'field1': 'new_value'})
```

### Essential Mixins

| Mixin | Purpose | Key Fields Added |
|-------|---------|------------------|
| `mail.thread` | Chatter/messaging | `message_ids`, tracking |
| `website.published.mixin` | Website visibility | `website_published`, `website_url` |
| `portal.mixin` | Customer portal access | `access_url`, `access_token` |
| `rating.mixin` | Customer ratings | Rating functionality |

### Security Patterns

**Groups**: `res.groups.xml`
```xml
<record id="group_manager" model="res.groups">
    <field name="name">Manager</field>
    <field name="category_id" ref="base.module_category"/>
</record>
```

**Access Rights**: `ir.model.access.csv`
```csv
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_model_user,model.access.user,model_model,base.group_user,1,0,0,0
```

**Record Rules**: Domain-based row-level security
```python
<record id="rule_own_records" model="ir.rule">
    <field name="domain">[('user_id', '=', user.id)]</field>
</record>
```

## BMAD-METHOD Integration

### Workflow Phases

1. **Business Analysis** (*odoo-analyst): Requirements → Functional Specs → User Stories
2. **Architecture** (*odoo-architect): Technical Design → Module Planning → Integration Strategy  
3. **Story Creation** (*odoo-analyst as SM): Architecture → Development Stories
4. **Development** (*odoo-developer): Stories → Implementation → Testing → Deployment

### Story-Driven Development

**Epic Structure**: Business feature → Technical components → Development stories
**Story Format**: BMAD standard with Odoo-specific acceptance criteria
**Implementation**: `*develop-story` command follows BMAD workflow

### OCA Compliance Checklist

- [ ] Follow OCA coding standards and conventions
- [ ] Use proper module structure and naming
- [ ] Include comprehensive tests and documentation  
- [ ] Implement proper security and access controls
- [ ] Follow inheritance patterns for maintainability
- [ ] Use standard Odoo patterns and avoid custom solutions

## Troubleshooting Quick Reference

### Common Issues

**Import Errors**: Check `__init__.py` files and circular imports
**Field Errors**: Verify field definitions and database schema
**Access Errors**: Check security groups and record rules
**View Errors**: Validate XML syntax and field references
**ORM Errors**: Use `self.env.cr.commit()` carefully in transactions

### Debug Commands

```python
# Enable developer mode
import logging
_logger = logging.getLogger(__name__)
_logger.info("Debug message")

# SQL debugging  
self.env.cr.execute("SELECT * FROM table WHERE condition")
results = self.env.cr.fetchall()
```

---

> **For comprehensive documentation**: Use Context7 integration commands available in all agents
> **For BMAD workflows**: Follow story-driven development patterns

**Planning Phase (Web UI)**:
- Use Odoo Functional Consultant for business process analysis
- Use Odoo Technical Architect for system design
- Generate PRD with Odoo-specific templates
- Create technical architecture with Odoo patterns

**Development Phase (IDE)**:
- Use BMAD story sharding for Odoo development tasks
- Follow Odoo Developer agent guidance
- Implement using OCA standards and patterns
- Test with Odoo-specific testing frameworks

**Deployment Phase**:
- Use Doodba DevOps Expert for deployment planning
- Follow Doodba deployment patterns
- Integrate with existing Odoo infrastructure

### Document Flow Integration

**PRD → Architecture → Stories → Implementation**:
1. Business requirements captured in Odoo PRD template
2. Technical design documented in Odoo Architecture template
3. Stories generated with Odoo-specific context
4. Implementation guided by Odoo development patterns

## OCA (Odoo Community Association) Standards

### Code Quality Standards

**Python Code Standards**:
- Follow PEP 8 for Python code formatting
- Use pylint-odoo for Odoo-specific code analysis
- Implement proper error handling and logging
- Write comprehensive docstrings

**Module Structure Standards**:
```
module_name/
├── __init__.py
├── __manifest__.py          # Module metadata
├── models/                  # Business logic
│   ├── __init__.py
│   └── *.py
├── views/                   # User interface
│   └── *.xml
├── security/                # Access control
│   ├── ir.model.access.csv
│   └── *.xml
├── data/                    # Master data
│   └── *.xml
├── demo/                    # Demo data
│   └── *.xml
├── static/                  # Web assets
│   └── description/
│       ├── icon.png
│       └── index.html
├── tests/                   # Test code
│   ├── __init__.py
│   └── test_*.py
└── README.rst              # Module documentation
```

**Naming Conventions**:
- Module names: `category_subcategory_feature`
- Model names: `module.model_name`
- Field names: `descriptive_field_name`
- Method names: `action_verb_object`

### Development Best Practices

**Model Development**:
- Use appropriate field types for data
- Implement proper constraints and validations
- Follow Odoo lifecycle methods (create, write, unlink)
- Use computed fields efficiently with dependencies

**View Development**:
- Follow Odoo UI/UX guidelines
- Use appropriate view types for data presentation
- Implement proper search and filter capabilities
- Ensure responsive design principles

**Security Implementation**:
- Define business-oriented user groups
- Implement least-privilege access control
- Use record rules for row-level security
- Validate all user inputs

## Doodba Framework Integration

### Development Environment

**Doodba Project Structure**:
```
doodba-project/
├── common.yaml              # Shared configurations
├── devel.yaml              # Development environment
├── test.yaml               # Testing environment
├── prod.yaml               # Production environment
├── docker-compose.yml      # Active environment symlink
├── tasks.py                # Invoke task definitions
├── odoo/
│   ├── Dockerfile          # Custom Odoo image
│   ├── custom/             # Custom modules and configuration
│   ├── auto/               # Auto-generated files
│   └── build.d/            # Build scripts
└── repos.yaml              # Repository definitions
```

**Common Development Commands**:
```bash
# Environment management
invoke develop              # Initialize development environment
invoke start               # Start development containers
invoke stop                # Stop containers
invoke restart             # Restart Odoo service

# Module management
invoke install --modules=module_name    # Install specific modules
invoke test --modules=module_name       # Test specific modules
invoke lint                # Run code quality checks

# Database management
invoke resetdb             # Reset database with base modules
invoke backup              # Create database backup
invoke restore             # Restore from backup
```

### Production Deployment

**Deployment Patterns**:
- Docker-based containerization
- Multi-environment support (dev/test/prod)
- Automated backup and monitoring
- Load balancing and scaling capabilities

**Best Practices**:
- Use environment-specific configurations
- Implement proper secret management
- Set up comprehensive monitoring
- Plan for disaster recovery

## Common Odoo Development Scenarios

### New Module Creation

**Business Requirements Analysis**:
1. Identify business process gaps
2. Map requirements to Odoo capabilities
3. Plan custom development needs
4. Design integration points

**Technical Implementation**:
1. Create module structure
2. Define data models
3. Implement business logic
4. Create user interfaces
5. Set up security rules
6. Write tests and documentation

### Existing System Enhancement

**Assessment Process**:
1. Analyze current module dependencies
2. Plan inheritance strategies
3. Identify integration impacts
4. Design migration procedures

**Implementation Approach**:
1. Use inheritance over modification
2. Maintain upgrade compatibility
3. Test thoroughly with existing data
4. Plan rollback procedures

### Integration Development

**Integration Patterns**:
- REST API endpoints for external systems
- Scheduled jobs for batch processing
- Webhooks for real-time notifications
- File-based import/export processes

**Security Considerations**:
- API authentication and authorization
- Input validation and sanitization
- Rate limiting and throttling
- Audit logging and monitoring

## Version Management and Compatibility

### Odoo Version Strategy

**Long-Term Support (LTS) Versions**:
- Recommended for production deployments
- Extended support and security updates
- More stable upgrade paths
- Better OCA module compatibility

**Version Upgrade Planning**:
- Assess custom module compatibility
- Plan data migration requirements
- Test upgrade procedures thoroughly
- Prepare rollback strategies

### OCA Module Management

**Module Selection Criteria**:
- Business requirement alignment
- Module maturity and maintenance status
- Version compatibility
- Community support and documentation

**Integration Considerations**:
- Dependency management
- Conflict resolution
- Performance impact assessment
- Customization requirements

## Performance Optimization

### Database Optimization

**Query Optimization**:
- Use appropriate database indexes
- Optimize search domains and filters
- Implement efficient pagination
- Avoid N+1 query problems

**Data Management**:
- Archive old data appropriately
- Implement proper data retention policies
- Use batch processing for large operations
- Monitor database size and performance

### Application Optimization

**Code Optimization**:
- Use computed fields efficiently
- Implement proper caching strategies
- Optimize view rendering
- Minimize API calls and network requests

**Infrastructure Optimization**:
- Use appropriate server sizing
- Implement load balancing
- Configure caching layers
- Monitor system resources

## Security Best Practices

### Access Control

**User Management**:
- Define role-based access control
- Implement least-privilege principles
- Use multi-factor authentication
- Monitor user access patterns

**Data Protection**:
- Encrypt sensitive data
- Implement proper backup security
- Use secure communication protocols
- Comply with data protection regulations

### Code Security

**Input Validation**:
- Validate all user inputs
- Prevent SQL injection attacks
- Sanitize data for output
- Implement proper error handling

**API Security**:
- Use secure authentication methods
- Implement rate limiting
- Validate API inputs thoroughly
- Log security events

## Testing Strategies

### Unit Testing

**Test Coverage**:
- Test all business logic methods
- Validate constraints and validations
- Test error conditions and edge cases
- Maintain high test coverage (>80%)

**Test Organization**:
- Group tests by functionality
- Use descriptive test names
- Implement proper test data setup
- Ensure test independence

### Integration Testing

**System Integration**:
- Test module interactions
- Validate view rendering
- Test security rules
- Verify external integrations

**Performance Testing**:
- Test with realistic data volumes
- Validate response times
- Monitor resource usage
- Test concurrent user scenarios

## Troubleshooting Common Issues

### Development Issues

**Module Installation Problems**:
- Check module dependencies
- Verify manifest file syntax
- Review Python code for errors
- Check file permissions and structure

**Performance Issues**:
- Analyze database query performance
- Review computed field dependencies
- Check for inefficient searches
- Monitor system resource usage

### Deployment Issues

**Environment Configuration**:
- Verify Docker container configuration
- Check database connectivity
- Validate file permissions
- Review environment variables

**Integration Problems**:
- Test API endpoints independently
- Verify authentication and authorization
- Check data format compatibility
- Monitor integration logs

## Useful Resources

### Official Documentation
- Odoo Developer Documentation: https://www.odoo.com/documentation/
- OCA Guidelines: https://github.com/OCA/odoo-community.org
- Doodba Documentation: https://github.com/Tecnativa/doodba

### Development Tools
- VSCode Extensions: Odoo development support
- PyCharm Plugins: Odoo development assistance
- Database Tools: pgAdmin, DBeaver for PostgreSQL
- API Testing: Postman, Insomnia for API development

### Community Resources
- OCA GitHub Repositories: Community modules and tools
- Odoo Community Forums: Support and discussions
- Stack Overflow: Technical questions and answers
- YouTube Tutorials: Video learning resources

This knowledge base serves as a reference for AI agents working on Odoo development projects using BMAD-METHOD workflows. It provides the context needed to make informed decisions about Odoo development patterns, best practices, and integration strategies.
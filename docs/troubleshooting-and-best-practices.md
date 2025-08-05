# BMAD-Odoo Troubleshooting & Best Practices

## Overview

This guide provides comprehensive troubleshooting solutions and best practices for using BMAD-Odoo agents effectively. It covers common issues, performance optimization, and proven strategies for successful Odoo development.

---

## Common Issues & Solutions

### Agent Communication Issues

#### Issue: Agent doesn't understand the request
**Symptoms**:
- Agent asks for clarification repeatedly
- Provides generic or irrelevant responses
- Cannot match request to available commands

**Solutions**:
```bash
# ❌ Vague request
"Make the system better"

# ✅ Specific request
"Add customer credit limit field to sales order form view so sales managers can see credit information during order approval"
```

**Best Practice**:
- Always include WHO (user persona), WHAT (specific functionality), WHY (business value)
- Mention specific Odoo modules and technical context
- Provide example scenarios and expected outcomes

#### Issue: Multiple agents giving conflicting advice
**Symptoms**:
- Different technical approaches from architect vs developer
- Conflicting priorities between analyst and PM
- Inconsistent implementation patterns

**Solution Process**:
```bash
# Step 1: Clarify roles and responsibilities
*odoo-pm
*coordinate-stakeholders

# Step 2: Establish technical direction
*odoo-architect  
*design-architecture

# Step 3: Align on business priorities
*odoo-analyst
*story-prioritization

# Step 4: Coordinate implementation
*odoo-sm
*coordinate-cross-team
```

**Prevention**:
- Start with clear business requirements from analyst
- Get architectural approval before implementation
- Use PM for coordination on complex projects

### Development Issues

#### Issue: Module installation failures
**Symptoms**:
```bash
# Error examples
"Module not found in addons path"
"Dependency 'custom_module' not found"
"Database constraint violation during installation"
```

**Diagnostic Steps**:
```bash
# 1. Check module structure
find . -name "__manifest__.py" -exec dirname {} \;

# 2. Validate manifest syntax
python -c "import ast; ast.parse(open('addon_name/__manifest__.py').read())"

# 3. Check dependencies
grep -r "depends" addon_name/__manifest__.py

# 4. Verify Python syntax
find addon_name -name "*.py" -exec python -m py_compile {} \;
```

**Common Solutions**:
```yaml
missing_dependencies:
  problem: "Dependency module not installed"
  solution: "Install dependencies first: docker-compose run --rm odoo odoo -d db -i dependency_module --stop-after-init"

syntax_errors:
  problem: "Python or XML syntax errors"
  solution: "Use validation commands from quick-addon-creation.md"

path_issues:
  problem: "Module not in correct addons path"
  solution: "Verify module in odoo/custom/src/addons/ directory"

database_conflicts:
  problem: "Database constraint violations"
  solution: "Check for existing data conflicts, use upgrade instead of install"
```

#### Issue: Doodba deployment problems
**Symptoms**:
- Services won't start
- Database connection failures
- Module update failures

**Troubleshooting Workflow**:
```bash
# 1. Check service status
docker-compose ps
invoke logs --tail=50

# 2. Verify database connectivity
docker-compose run --rm odoo click-odoo --list-databases

# 3. Check module status
docker-compose run --rm odoo click-odoo -d db_name --rollback -c "
modules = env['ir.module.module'].search([('name', 'in', ['module_name'])])
for m in modules: print(f'{m.name}: {m.state}')
"

# 4. Reset if necessary
invoke stop
invoke git-aggregate
invoke img-build --pull
invoke start
```

**Prevention Strategies**:
- Always use `invoke` commands for consistency
- Monitor logs during deployment
- Keep backups of working database states
- Test in development environment first

### Performance Issues

#### Issue: Slow response times after customization
**Symptoms**:
- Forms take >3 seconds to load
- List views timeout with large datasets
- Reports take >30 seconds to generate

**Performance Analysis**:
```bash
# 1. Enable query logging
# In odoo.conf: log_level = debug_sql

# 2. Monitor database queries
invoke logs --follow | grep -i "sql\|query"

# 3. Check for N+1 query problems
docker-compose run --rm odoo click-odoo -d db_name --rollback -c "
# Test problematic view or operation
# Monitor SQL queries in logs
"
```

**Optimization Strategies**:
```python
# ❌ N+1 Query Problem
for record in records:
    print(record.partner_id.name)  # One query per record

# ✅ Optimized with prefetch
records_with_partners = records.with_context(prefetch_fields=['partner_id'])
for record in records_with_partners:
    print(record.partner_id.name)  # Single query with JOIN

# ❌ Slow computed field
@api.depends('line_ids')
def _compute_total(self):
    for record in self:
        record.total = sum(line.amount for line in record.line_ids)

# ✅ Optimized computed field
@api.depends('line_ids.amount')
def _compute_total(self):
    for record in self:
        record.total = sum(record.line_ids.mapped('amount'))
```

#### Issue: Memory consumption in large datasets
**Solutions**:
```python
# ❌ Load all records in memory
all_records = self.env['large.model'].search([])
for record in all_records:
    process_record(record)

# ✅ Process in batches
batch_size = 1000
offset = 0
while True:
    batch = self.env['large.model'].search([], limit=batch_size, offset=offset)
    if not batch:
        break
    for record in batch:
        process_record(record)
    offset += batch_size
    self.env.cr.commit()  # Free memory
```

### Quality Issues

#### Issue: Tests failing after implementation
**Common Test Failures**:
```python
# Assertion errors
AssertionError: Expected 'confirmed', got 'draft'

# Missing data errors  
ValueError: Expected singleton: record.set()

# Access rights errors
AccessError: Sorry, you are not allowed to access this document
```

**Debugging Approach**:
```python
class TestDebugExample(TransactionCase):
    
    def test_with_debugging(self):
        # Add debugging output
        print(f"Record state: {self.record.state}")
        print(f"User groups: {self.env.user.groups_id.mapped('name')}")
        
        # Use pdb for interactive debugging
        import pdb; pdb.set_trace()
        
        # Test the actual functionality
        result = self.record.action_confirm()
        self.assertEqual(self.record.state, 'confirmed')
```

**Common Solutions**:
```yaml
state_issues:
  problem: "Record not in expected state"
  solution: "Check workflow conditions and required fields"

access_rights:
  problem: "User lacks required permissions"  
  solution: "Add user to correct groups in test setup"

singleton_errors:
  problem: "Operation expects single record, got recordset"
  solution: "Use ensure_one() or iterate over recordset"
```

---

## Best Practices by Scenario

### Lightning Development (< 2 hours)

**Do's**:
```bash
# ✅ Use rapid-story for clear scope
*odoo-analyst
*rapid-story

# ✅ Follow existing patterns exactly
*odoo-developer
*brownfield-enhance

# ✅ Test immediately after changes
*doodba-deploy
```

**Don'ts**:
```bash
# ❌ Don't skip business analysis
# ❌ Don't create new patterns for small changes
# ❌ Don't skip testing because "it's small"
```

**Quality Gates**:
- [ ] Existing functionality unchanged
- [ ] New functionality works as specified
- [ ] No performance degradation
- [ ] Clear rollback procedure

### Rapid Development (2-8 hours)

**Planning Phase**:
```bash
# 1. Clear requirements (30 minutes max)
*odoo-analyst
*gather-requirements
*rapid-story

# 2. Technical validation (15 minutes max)
*odoo-architect  # Only if integration complexity
*plan-modules

# 3. Implementation (most of the time)
*odoo-developer
*quick-addon
*write-tests
```

**Quality Checkpoints**:
- [ ] Requirements clearly understood
- [ ] Technical approach validated
- [ ] Implementation follows OCA patterns
- [ ] Tests cover main functionality
- [ ] Deployment verified in dev environment

### Sprint Development (1-3 days)

**Team Coordination**:
```bash
# Daily standup
*odoo-sm
*facilitate-standup

# Progress tracking
*odoo-pm
*track-progress

# Quality validation
*odoo-qa
*validate-odoo-module
```

**Success Metrics**:
- Daily progress visible to stakeholders
- Blockers identified and resolved quickly
- Quality maintained throughout sprint
- Deliverable ready for production

---

## Performance Best Practices

### Database Optimization

**Indexing Strategy**:
```python
class OptimizedModel(models.Model):
    _name = 'optimized.model'
    
    # Add indexes for frequently searched fields
    partner_id = fields.Many2one('res.partner', 'Partner', index=True)
    date_field = fields.Date('Date', index=True)
    state = fields.Selection([...], index=True)
    
    # Composite index for common search combinations
    _sql_constraints = [
        ('unique_partner_date', 'UNIQUE(partner_id, date_field)', 'Duplicate not allowed')
    ]
```

**Query Optimization**:
```python
# ✅ Efficient search with limited fields
records = self.env['model.name'].search_read(
    domain=[('field', '=', 'value')],
    fields=['name', 'partner_id', 'amount'],
    limit=100
)

# ✅ Use read_group for aggregations
data = self.env['model.name'].read_group(
    domain=[],
    fields=['amount:sum'],
    groupby=['partner_id']
)

# ✅ Batch operations
self.env['model.name'].browse(ids).write({'state': 'done'})
```

### Memory Management

**Large Dataset Processing**:
```python
@api.model
def process_large_dataset(self):
    """Process large datasets efficiently"""
    batch_size = 1000
    processed = 0
    
    while True:
        records = self.search([], limit=batch_size, offset=processed)
        if not records:
            break
            
        # Process batch
        for record in records:
            record.process_item()
            
        # Commit and free memory
        self.env.cr.commit()
        processed += len(records)
        
        # Log progress
        _logger.info(f"Processed {processed} records")
```

### View Performance

**Efficient Views**:
```xml
<!-- ✅ Limit fields in tree views -->
<tree limit="80" default_order="create_date desc">
    <field name="name"/>
    <field name="partner_id"/>
    <field name="state"/>
</tree>

<!-- ✅ Use groups for conditional fields -->
<field name="internal_field" groups="base.group_system"/>

<!-- ✅ Optimize search views -->
<search>
    <field name="name" filter_domain="[('name', 'ilike', self)]"/>
    <filter name="recent" domain="[('create_date', '>=', (context_today() - datetime.timedelta(days=30)).strftime('%Y-%m-%d'))]"/>
</search>
```

---

## Security Best Practices

### Access Control

**Model Security**:
```csv
# ir.model.access.csv
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_model_user,model.user,model_model,base.group_user,1,1,1,0
access_model_manager,model.manager,model_model,base.group_system,1,1,1,1
```

**Record Rules**:
```xml
<!-- Multi-company rule -->
<record id="model_company_rule" model="ir.rule">
    <field name="name">Model: multi-company</field>
    <field name="model_id" ref="model_model"/>
    <field name="domain_force">[('company_id', 'in', company_ids)]</field>
</record>

<!-- User-specific rule -->
<record id="model_user_rule" model="ir.rule">
    <field name="name">Model: user access</field>
    <field name="model_id" ref="model_model"/>
    <field name="domain_force">[('user_id', '=', user.id)]</field>
    <field name="groups" eval="[(4, ref('base.group_user'))]"/>
</record>
```

### Input Validation

**Secure Model Methods**:
```python
class SecureModel(models.Model):
    _name = 'secure.model'
    
    @api.constrains('amount')
    def _check_amount(self):
        for record in self:
            if record.amount < 0:
                raise ValidationError(_('Amount must be positive'))
    
    @api.model
    def create(self, vals):
        # Validate input
        if 'critical_field' in vals:
            self._validate_critical_field(vals['critical_field'])
        return super().create(vals)
    
    def _validate_critical_field(self, value):
        # Implement validation logic
        if not self._is_valid_value(value):
            raise UserError(_('Invalid value for critical field'))
```

---

## Maintenance Best Practices

### Code Quality

**Code Standards**:
```python
# ✅ Good code structure
class WellStructuredModel(models.Model):
    _name = 'well.structured.model'
    _description = 'Well Structured Model'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'sequence, name'
    
    # Fields grouped by type
    name = fields.Char('Name', required=True, tracking=True)
    description = fields.Text('Description')
    sequence = fields.Integer('Sequence', default=10)
    
    # Relationships
    partner_id = fields.Many2one('res.partner', 'Partner')
    line_ids = fields.One2many('model.line', 'parent_id', 'Lines')
    
    # Computed fields
    total_amount = fields.Float('Total', compute='_compute_total', store=True)
    
    # Constraints
    @api.constrains('name')
    def _check_name(self):
        if not self.name.strip():
            raise ValidationError(_('Name is required'))
    
    # Computed methods
    @api.depends('line_ids.amount')
    def _compute_total(self):
        for record in self:
            record.total_amount = sum(record.line_ids.mapped('amount'))
    
    # Business methods
    def action_confirm(self):
        self.ensure_one()
        return self.write({'state': 'confirmed'})
```

**Documentation Standards**:
```python
def complex_business_method(self, param1, param2=None):
    """
    Process complex business logic with multiple parameters.
    
    Args:
        param1 (str): Primary parameter for processing
        param2 (dict, optional): Additional configuration options
        
    Returns:
        dict: Processing results with status and data
        
    Raises:
        ValidationError: When param1 is invalid
        UserError: When business rules are violated
    """
    # Implementation here
    pass
```

### Testing Strategy

**Comprehensive Tests**:
```python
class TestComprehensive(TransactionCase):
    
    def setUp(self):
        super().setUp()
        # Set up test data
        self.partner = self.env['res.partner'].create({'name': 'Test Partner'})
        self.model = self.env['test.model'].create({
            'name': 'Test Record',
            'partner_id': self.partner.id
        })
    
    def test_creation(self):
        """Test record creation with valid data"""
        record = self.env['test.model'].create({
            'name': 'New Record',
            'partner_id': self.partner.id
        })
        self.assertEqual(record.name, 'New Record')
        self.assertTrue(record.active)
    
    def test_validation(self):
        """Test input validation"""
        with self.assertRaises(ValidationError):
            self.env['test.model'].create({
                'name': '',  # Should fail validation
                'partner_id': self.partner.id
            })
    
    def test_business_logic(self):
        """Test business method functionality"""
        result = self.model.process_business_logic()
        self.assertTrue(result['success'])
        self.assertEqual(self.model.state, 'processed')
    
    def test_access_rights(self):
        """Test security access controls"""
        user = self.env['res.users'].create({
            'name': 'Test User',
            'login': 'testuser'
        })
        with self.assertRaises(AccessError):
            self.model.with_user(user).write({'name': 'Unauthorized Change'})
```

---

## Monitoring and Troubleshooting

### Health Check Commands

**System Health**:
```bash
# Check service status
docker-compose ps

# Monitor resource usage
docker stats

# Check database connections
docker-compose run --rm odoo click-odoo --list-databases

# Verify module states
docker-compose run --rm odoo click-odoo -d db_name --rollback -c "
modules = env['ir.module.module'].search([('state', '=', 'installed')])
print(f'Installed modules: {len(modules)}')
"
```

**Performance Monitoring**:
```bash
# Monitor slow queries
invoke logs --follow | grep -i "slow\|performance"

# Check memory usage
docker-compose exec odoo ps aux --sort=-%mem | head -10

# Monitor disk usage
df -h
docker system df
```

### Log Analysis

**Common Log Patterns**:
```bash
# Error patterns to watch
grep -i "error\|exception\|traceback" logs/odoo.log

# Performance issues
grep -i "slow\|timeout\|memory" logs/odoo.log

# Security issues
grep -i "access\|permission\|forbidden" logs/odoo.log

# Database issues
grep -i "database\|postgres\|sql" logs/odoo.log
```

**Automated Monitoring**:
```bash
# Create monitoring script
#!/bin/bash
# monitor-odoo.sh

# Check service health
if ! docker-compose ps | grep -q "Up"; then
    echo "ALERT: Odoo services not running"
    # Send notification
fi

# Check database connectivity
if ! docker-compose run --rm odoo click-odoo --list-databases > /dev/null 2>&1; then
    echo "ALERT: Database connectivity issues"
    # Send notification
fi

# Check disk space
if [ $(df / | tail -1 | awk '{print $5}' | sed 's/%//') -gt 80 ]; then
    echo "ALERT: Disk space usage above 80%"
    # Send notification
fi
```

---

## Emergency Procedures

### System Recovery

**Database Recovery**:
```bash
# 1. Stop services
invoke stop

# 2. Restore from backup
docker-compose run --rm odoo dropdb db_name
docker-compose run --rm odoo createdb db_name
docker-compose run --rm odoo psql -d db_name -f /backup/db_backup.sql

# 3. Restart services
invoke start

# 4. Verify system health
invoke logs --tail=100
```

**Module Recovery**:
```bash
# Uninstall problematic module
docker-compose run --rm odoo odoo -d db_name --uninstall module_name --stop-after-init

# Reset module to previous version
git checkout HEAD~1 -- odoo/custom/src/addons/module_name/

# Rebuild and restart
invoke img-build
invoke restart

# Reinstall module
docker-compose run --rm odoo odoo -d db_name -i module_name --stop-after-init
```

### Rollback Procedures

**Code Rollback**:
```bash
# 1. Identify last working commit
git log --oneline -10

# 2. Create rollback branch
git checkout -b rollback-emergency

# 3. Reset to working state
git reset --hard [working_commit_hash]

# 4. Deploy rollback
invoke img-build --pull
invoke restart
```

**Data Rollback**:
```bash
# 1. Stop applications
invoke stop

# 2. Restore database
# Use latest working backup

# 3. Restart with previous version
git checkout [previous_tag]
invoke img-build
invoke start
```

This comprehensive troubleshooting guide provides the foundation for maintaining high-quality, performant Odoo systems while using BMAD-Odoo agents effectively.
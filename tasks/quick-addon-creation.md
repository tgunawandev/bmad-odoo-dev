# Quick Addon Creation Task

## Purpose

Rapidly create new Odoo addons with OCA compliance and proper structure for fast development cycles, specifically optimized for brownfield Odoo environments.

## When to Use This Task

**Use this task when:**

- Need to create a new addon quickly for brownfield enhancement
- Business requirement is well-defined and focused
- Standard addon structure is sufficient
- Development timeline is tight (same-day delivery needed)
- Following established patterns from existing project

**Use create-odoo-addon.md when:**
- Complex addon with extensive customization needed
- Multiple integration points and business logic
- Comprehensive documentation and testing required

## Prerequisites

**Required Information:**
- Addon name and purpose clearly defined
- Target Odoo version (13.0-18.0)
- Basic business requirements and workflow
- Integration points with existing modules
- OCA category classification

**Development Environment:**
- Doodba-based Odoo project
- Access to existing project structure for pattern reference
- Git repository for version control

## Quick Addon Creation Process

### 1. Addon Planning (5 minutes)

Quickly define addon structure and requirements:

#### Addon Metadata
```yaml
addon_name: "[snake_case_addon_name]"
display_name: "[Human Readable Addon Name]"
odoo_version: "[16.0]"  # Specify target version
category: "[Category]"  # e.g., "Sales", "Inventory", "Accounting"
author: "[Your Company], Odoo Community Association (OCA)"
depends: ["base", "web"]  # Basic dependencies
application: false  # Usually false for extensions
auto_install: false
```

#### Business Context (Brief)
- **Purpose**: One sentence describing what this addon does
- **Primary Users**: Who will use this addon
- **Key Features**: 2-3 main features this addon provides
- **Integration**: Which existing modules it integrates with

### 2. Rapid Structure Creation (10 minutes)

Create addon directory structure with essential files:

#### Directory Structure
```bash
# Create addon directory
mkdir -p odoo/custom/src/addons/[addon_name]
cd odoo/custom/src/addons/[addon_name]

# Create standard directory structure
mkdir -p models views security data demo tests static/description static/src/js wizards
```

#### Essential Files Creation

**__init__.py** (Root):
```python
from . import models
from . import wizards
```

**__manifest__.py**:
```python
{
    'name': '[Display Name]',
    'version': '16.0.1.0.0',
    'category': '[Category]',
    'summary': '[Brief summary of functionality]',
    'description': """
[Addon Description]

This addon provides:
* [Feature 1]
* [Feature 2]
* [Feature 3]
    """,
    'author': '[Your Company], Odoo Community Association (OCA)',
    'website': 'https://github.com/OCA/[repository]',
    'license': 'AGPL-3',
    'depends': [
        'base',
        'web',
    ],
    'data': [
        'security/ir.model.access.csv',
        'views/[model_name]_views.xml',
        'views/menu_items.xml',
        'data/initial_data.xml',
    ],
    'demo': [
        'demo/demo_data.xml',
    ],
    'installable': True,
    'auto_install': False,
    'application': False,
}
```

### 3. Quick Model Implementation (15 minutes)

Create basic model structure following Odoo patterns:

#### models/__init__.py
```python
from . import [model_name]
```

#### models/[model_name].py (Template)
```python
from odoo import api, fields, models, _
from odoo.exceptions import ValidationError, UserError


class [ModelName](models.Model):
    _name = '[model.name]'
    _description = '[Model Description]'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'name'
    _rec_name = 'name'

    # Basic fields
    name = fields.Char(
        string='Name',
        required=True,
        tracking=True
    )
    
    description = fields.Text(
        string='Description'
    )
    
    active = fields.Boolean(
        string='Active',
        default=True,
        tracking=True
    )
    
    # Relationships
    company_id = fields.Many2one(
        'res.company',
        string='Company',
        default=lambda self: self.env.company,
        required=True
    )
    
    user_id = fields.Many2one(
        'res.users',
        string='Responsible',
        default=lambda self: self.env.user,
        tracking=True
    )
    
    # State management (if needed)
    state = fields.Selection([
        ('draft', 'Draft'),
        ('confirmed', 'Confirmed'),
        ('done', 'Done'),
    ], string='Status', default='draft', tracking=True)
    
    # Basic constraints
    @api.constrains('name')
    def _check_name(self):
        for record in self:
            if not record.name.strip():
                raise ValidationError(_('Name cannot be empty'))
    
    # Basic business method
    def action_confirm(self):
        self.ensure_one()
        if self.state != 'draft':
            raise UserError(_('Only draft records can be confirmed'))
        self.state = 'confirmed'
```

### 4. Quick View Implementation (10 minutes)

Create basic views with standard patterns:

#### views/[model_name]_views.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <!-- Form View -->
    <record id="view_[model_name]_form" model="ir.ui.view">
        <field name="name">[model.name].form</field>
        <field name="model">[model.name]</field>
        <field name="arch" type="xml">
            <form string="[Model Display Name]">
                <header>
                    <button name="action_confirm" type="object" 
                            string="Confirm" class="oe_highlight"
                            invisible="state != 'draft'"/>
                    <field name="state" widget="statusbar"/>
                </header>
                <sheet>
                    <div class="oe_title">
                        <h1>
                            <field name="name" placeholder="Enter name..."/>
                        </h1>
                    </div>
                    <group>
                        <group>
                            <field name="user_id"/>
                            <field name="company_id" groups="base.group_multi_company"/>
                        </group>
                        <group>
                            <field name="active"/>
                        </group>
                    </group>
                    <notebook>
                        <page string="Description">
                            <field name="description" nolabel="1"/>
                        </page>
                    </notebook>
                </sheet>
                <div class="oe_chatter">
                    <field name="message_follower_ids"/>
                    <field name="activity_ids"/>
                    <field name="message_ids"/>
                </div>
            </form>
        </field>
    </record>

    <!-- Tree View -->
    <record id="view_[model_name]_tree" model="ir.ui.view">
        <field name="name">[model.name].tree</field>
        <field name="model">[model.name]</field>
        <field name="arch" type="xml">
            <tree string="[Model Display Names]">
                <field name="name"/>
                <field name="user_id"/>
                <field name="state"/>
                <field name="company_id" groups="base.group_multi_company"/>
            </tree>
        </field>
    </record>

    <!-- Search View -->
    <record id="view_[model_name]_search" model="ir.ui.view">
        <field name="name">[model.name].search</field>
        <field name="model">[model.name]</field>
        <field name="arch" type="xml">
            <search string="Search [Model Display Names]">
                <field name="name"/>
                <field name="user_id"/>
                <filter name="my_records" string="My Records" 
                        domain="[('user_id', '=', uid)]"/>
                <separator/>
                <filter name="draft" string="Draft" 
                        domain="[('state', '=', 'draft')]"/>
                <group expand="0" string="Group By">
                    <filter string="Status" name="group_state" 
                            context="{'group_by': 'state'}"/>
                    <filter string="Responsible" name="group_user" 
                            context="{'group_by': 'user_id'}"/>
                </group>
            </search>
        </field>
    </record>
</odoo>
```

#### views/menu_items.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <!-- Action -->
    <record id="action_[model_name]" model="ir.actions.act_window">
        <field name="name">[Model Display Names]</field>
        <field name="res_model">[model.name]</field>
        <field name="view_mode">tree,form</field>
        <field name="help" type="html">
            <p class="o_view_nocontent_smiling_face">
                Create your first [model display name]!
            </p>
        </field>
    </record>

    <!-- Menu Items -->
    <menuitem id="menu_[addon_name]_root" 
              name="[Addon Display Name]" 
              sequence="100"/>
    
    <menuitem id="menu_[model_name]" 
              name="[Model Display Names]" 
              parent="menu_[addon_name]_root" 
              action="action_[model_name]" 
              sequence="10"/>
</odoo>
```

### 5. Quick Security Setup (5 minutes)

Create basic security configuration:

#### security/ir.model.access.csv
```csv
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_[model_name]_user,[model.name].user,model_[model_name],base.group_user,1,1,1,1
access_[model_name]_manager,[model.name].manager,model_[model_name],base.group_system,1,1,1,1
```

### 6. Basic Data and Demo (5 minutes)

Create initial data and demo records:

#### data/initial_data.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <data noupdate="1">
        <!-- Initial configuration data here -->
    </data>
</odoo>
```

#### demo/demo_data.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <data>
        <record id="demo_[model_name]_1" model="[model.name]">
            <field name="name">Demo [Model Name] 1</field>
            <field name="description">This is a demo record</field>
        </record>
        
        <record id="demo_[model_name]_2" model="[model.name]">
            <field name="name">Demo [Model Name] 2</field>
            <field name="description">Another demo record</field>
        </record>
    </data>
</odoo>
```

### 7. Quick Documentation (5 minutes)

Create minimal but essential documentation:

#### README.rst
```rst
===================
[Addon Display Name]
===================

.. |badge1| image:: https://img.shields.io/badge/maturity-Beta-yellow.png
    :target: https://odoo-community.org/page/development-status
    :alt: Beta

|badge1|

[Brief description of what this addon does]

**Table of contents**

.. contents::
   :local:

Features
========

* [Feature 1]
* [Feature 2]
* [Feature 3]

Usage
=====

1. Go to [Menu Path]
2. Create new [Model Name]
3. Fill in required information
4. Confirm when ready

Bug Tracker
===========

Bugs are tracked on `GitHub Issues <https://github.com/OCA/[repository]/issues>`_.

Credits
=======

Authors
~~~~~~~

* [Your Company]

Contributors
~~~~~~~~~~~~

* [Your Name] <[your.email@company.com]>

Maintainers
~~~~~~~~~~~

This module is maintained by the OCA.
```

#### static/description/index.html
```html
<section class="oe_container">
    <div class="oe_row oe_spaced">
        <div class="oe_span12">
            <h2 class="oe_slogan">[Addon Display Name]</h2>
            <h3 class="oe_slogan">[Brief tagline describing the addon]</h3>
        </div>
    </div>
</section>

<section class="oe_container oe_dark">
    <div class="oe_row oe_spaced">
        <div class="oe_span12">
            <h2>Features</h2>
            <ul>
                <li>[Feature 1]</li>
                <li>[Feature 2]</li>
                <li>[Feature 3]</li>
            </ul>
        </div>
    </div>
</section>
```

### 8. Quick Testing and Validation (10 minutes)

Validate addon structure and basic functionality:

#### Pre-Installation Validation
```bash
# Check addon structure
find . -name "*.py" -exec python -m py_compile {} \;

# Validate XML files
find . -name "*.xml" -exec xmllint --noout {} \;

# Check manifest syntax
python -c "import ast; ast.parse(open('__manifest__.py').read())"
```

#### Installation Test
```bash
# Install addon using Doodba
cd [project_root]
docker-compose run --rm odoo odoo -d [test_db] -i [addon_name] --stop-after-init

# Verify installation
docker-compose run --rm odoo click-odoo -d [test_db] --rollback -c "
module = env['ir.module.module'].search([('name', '=', '[addon_name]')])
print(f'Module state: {module.state}')
"
```

#### Basic Functionality Test
```bash
# Access web interface and test:
# 1. Navigate to addon menu
# 2. Create new record
# 3. Test basic workflow
# 4. Verify data persistence
```

## Quick Addon Creation Checklist

### Structure Validation
- [ ] Directory structure follows Odoo standards
- [ ] All Python files have proper imports
- [ ] Manifest file is complete and valid
- [ ] XML files are well-formed
- [ ] Security access rules are defined

### Functionality Validation
- [ ] Addon installs without errors
- [ ] Menu items appear correctly
- [ ] Forms can be opened and used
- [ ] Basic CRUD operations work
- [ ] Business logic functions correctly

### Quality Validation
- [ ] Code follows basic OCA patterns
- [ ] No obvious security issues
- [ ] Basic error handling implemented
- [ ] Consistent naming conventions used
- [ ] Documentation is present

## Quick Reference Templates

### Common Field Types
```python
# Basic fields
char_field = fields.Char(string='Text', required=True)
text_field = fields.Text(string='Long Text')
integer_field = fields.Integer(string='Number', default=0)
float_field = fields.Float(string='Decimal', digits=(12, 2))
boolean_field = fields.Boolean(string='Yes/No', default=False)
date_field = fields.Date(string='Date')
datetime_field = fields.Datetime(string='Date & Time')

# Selection field
selection_field = fields.Selection([
    ('option1', 'Option 1'),
    ('option2', 'Option 2'),
], string='Choose Option', default='option1')

# Relationships
many2one_field = fields.Many2one('res.partner', string='Partner')
one2many_field = fields.One2many('model.line', 'parent_id', string='Lines')
many2many_field = fields.Many2many('product.product', string='Products')
```

### Common View Patterns
```xml
<!-- Readonly field -->
<field name="field_name" readonly="1"/>

<!-- Invisible based on condition -->
<field name="field_name" invisible="state != 'draft'"/>

<!-- Required based on condition -->
<field name="field_name" required="state == 'confirmed'"/>

<!-- Domain filter -->
<field name="partner_id" domain="[('is_company', '=', True)]"/>
```

## Success Criteria

Quick addon creation is successful when:

1. Addon structure follows Odoo/OCA standards
2. Addon installs without errors in target environment
3. Basic functionality works as expected
4. Menu navigation and CRUD operations function correctly
5. Security model provides appropriate access control
6. Code follows established project patterns
7. Documentation provides basic usage information
8. Addon is ready for iterative enhancement

## Important Notes

- **Speed vs. Completeness**: Focus on essential functionality first
- **Pattern Consistency**: Follow existing project patterns religiously
- **OCA Compliance**: Maintain basic OCA standards even in quick development
- **Iterative Enhancement**: Plan for future enhancements and refactoring
- **Testing Priority**: Prioritize installation and basic functionality testing
- **Documentation**: Keep documentation minimal but present

Remember: Quick addon creation is about getting a working foundation rapidly that can be enhanced iteratively. Focus on core functionality and standard patterns.
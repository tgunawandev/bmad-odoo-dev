# Create Odoo Addon

You are tasked with creating a new Odoo addon based on business requirements and technical specifications. This task involves generating a complete addon structure following OCA standards and Odoo best practices.

## Task Objectives

### Primary Goals
- Create a complete addon structure with all necessary files
- Implement business logic according to specifications
- Follow OCA development standards and guidelines
- ensure compatibility with target Odoo version
- Provide comprehensive documentation and testing

### Success Criteria
- Addon installs without errors on target Odoo version
- All functional requirements are implemented
- Code passes OCA quality checks (flake8, pylint-odoo)
- Basic unit tests are included
- Documentation is complete and accurate

## Prerequisites

### Required Information
- **Business Requirements**: Clear functional specifications
- **Technical Architecture**: Data model and integration design
- **Target Odoo Version**: Specific version compatibility (13.0-18.0)
- **Module Dependencies**: Required standard and OCA modules
- **Integration Points**: External systems or APIs to connect

### Development Environment
- Doodba-based development environment
- Access to OCA module templates and tools
- Git repository for version control
- Testing database and environment

## Implementation Process

### 1. Addon Structure Creation

#### Manifest File (`__manifest__.py`)
```python
{
    'name': 'Module Name',
    'version': '16.0.1.0.0',
    'category': 'Category',
    'summary': 'Brief module description',
    'description': """
Long description of the module functionality.
Include:
- Key features
- Business use cases
- Integration points
- Configuration requirements
    """,
    'author': 'Your Company, Odoo Community Association (OCA)',
    'website': 'https://github.com/OCA/project-repo',
    'license': 'AGPL-3',
    'depends': [
        'base',
        'web',
        # Add required dependencies
    ],
    'data': [
        'security/ir.model.access.csv',
        'security/security.xml',
        'views/model_views.xml',
        'views/menu_items.xml',
        'data/initial_data.xml',
    ],
    'demo': [
        'demo/demo_data.xml',
    ],
    'installable': True,
    'auto_install': False,
    'application': False,
    'external_dependencies': {
        'python': [],
        'bin': [],
    },
}
```

#### Directory Structure
```
addon_name/
├── __init__.py
├── __manifest__.py
├── models/
│   ├── __init__.py
│   └── model_name.py
├── views/
│   ├── model_views.xml
│   └── menu_items.xml
├── security/
│   ├── ir.model.access.csv
│   └── security.xml
├── data/
│   └── initial_data.xml
├── demo/
│   └── demo_data.xml
├── tests/
│   ├── __init__.py
│   └── test_model.py
├── static/
│   ├── description/
│   │   ├── icon.png
│   │   └── index.html
│   └── src/
│       └── js/
├── wizards/
│   ├── __init__.py
│   └── wizard_name.py
└── README.rst
```

### 2. Model Implementation

#### Base Model Structure
```python
from odoo import api, fields, models, _
from odoo.exceptions import ValidationError, UserError

class CustomModel(models.Model):
    _name = 'custom.model'
    _description = 'Custom Model Description'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'sequence, name'
    _rec_name = 'name'
    
    # Basic fields
    name = fields.Char(
        string='Name',
        required=True,
        translate=True,
        tracking=True
    )
    
    description = fields.Text(
        string='Description',
        translate=True
    )
    
    sequence = fields.Integer(
        string='Sequence',
        default=10,
        help='Used to order records'
    )
    
    active = fields.Boolean(
        string='Active',
        default=True,
        tracking=True
    )
    
    # State management
    state = fields.Selection([
        ('draft', 'Draft'),
        ('confirmed', 'Confirmed'),
        ('done', 'Done'),
        ('cancelled', 'Cancelled')
    ], string='Status', default='draft', tracking=True)
    
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
    
    # Computed fields
    @api.depends('field1', 'field2')
    def _compute_calculated_field(self):
        for record in self:
            record.calculated_field = record.field1 + record.field2
    
    calculated_field = fields.Float(
        string='Calculated Field',
        compute='_compute_calculated_field',
        store=True
    )
    
    # Constraints
    @api.constrains('field1')
    def _check_field1(self):
        for record in self:
            if record.field1 < 0:
                raise ValidationError(_('Field1 must be positive'))
    
    # CRUD hooks
    @api.model
    def create(self, vals):
        # Custom creation logic
        if 'sequence' not in vals:
            vals['sequence'] = self._get_next_sequence()
        return super().create(vals)
    
    def write(self, vals):
        # Custom update logic
        if 'state' in vals and vals['state'] == 'confirmed':
            self._validate_confirmation()
        return super().write(vals)
    
    def unlink(self):
        # Custom deletion logic
        if any(record.state == 'confirmed' for record in self):
            raise UserError(_('Cannot delete confirmed records'))
        return super().unlink()
    
    # Business methods
    def action_confirm(self):
        self.ensure_one()
        if self.state != 'draft':
            raise UserError(_('Only draft records can be confirmed'))
        self.state = 'confirmed'
        self.message_post(body=_('Record confirmed'))
    
    def action_cancel(self):
        self.ensure_one()
        if self.state == 'done':
            raise UserError(_('Cannot cancel completed records'))
        self.state = 'cancelled'
        self.message_post(body=_('Record cancelled'))
    
    # Private methods
    def _get_next_sequence(self):
        last_record = self.search([], order='sequence desc', limit=1)
        return (last_record.sequence or 0) + 10
    
    def _validate_confirmation(self):
        # Validation logic for confirmation
        if not self.name:
            raise ValidationError(_('Name is required for confirmation'))
```

### 3. View Implementation

#### Form View
```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <record id="view_custom_model_form" model="ir.ui.view">
        <field name="name">custom.model.form</field>
        <field name="model">custom.model</field>
        <field name="arch" type="xml">
            <form string="Custom Model">
                <header>
                    <button name="action_confirm" type="object" 
                            string="Confirm" class="oe_highlight"
                            invisible="state != 'draft'"/>
                    <button name="action_cancel" type="object" 
                            string="Cancel"
                            invisible="state in ('done', 'cancelled')"/>
                    <field name="state" widget="statusbar" 
                           statusbar_visible="draft,confirmed,done"/>
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
                            <field name="sequence"/>
                            <field name="active"/>
                        </group>
                    </group>
                    <notebook>
                        <page string="Description">
                            <field name="description" nolabel="1"/>
                        </page>
                        <page string="Additional Info">
                            <group>
                                <field name="calculated_field"/>
                            </group>
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
    <record id="view_custom_model_tree" model="ir.ui.view">
        <field name="name">custom.model.tree</field>
        <field name="model">custom.model</field>
        <field name="arch" type="xml">
            <tree string="Custom Models" 
                  decoration-info="state=='draft'"
                  decoration-success="state=='done'"
                  decoration-muted="state=='cancelled'">
                <field name="sequence" widget="handle"/>
                <field name="name"/>
                <field name="user_id"/>
                <field name="calculated_field"/>
                <field name="state"/>
                <field name="company_id" groups="base.group_multi_company"/>
            </tree>
        </field>
    </record>

    <!-- Search View -->
    <record id="view_custom_model_search" model="ir.ui.view">
        <field name="name">custom.model.search</field>
        <field name="model">custom.model</field>
        <field name="arch" type="xml">
            <search string="Search Custom Models">
                <field name="name"/>
                <field name="user_id"/>
                <field name="company_id" groups="base.group_multi_company"/>
                <separator/>
                <filter name="my_records" string="My Records" 
                        domain="[('user_id', '=', uid)]"/>
                <filter name="active" string="Active" 
                        domain="[('active', '=', True)]"/>
                <separator/>
                <filter name="draft" string="Draft" 
                        domain="[('state', '=', 'draft')]"/>
                <filter name="confirmed" string="Confirmed" 
                        domain="[('state', '=', 'confirmed')]"/>
                <group expand="0" string="Group By">
                    <filter string="Status" name="group_state" 
                            context="{'group_by': 'state'}"/>
                    <filter string="Responsible" name="group_user" 
                            context="{'group_by': 'user_id'}"/>
                    <filter string="Company" name="group_company" 
                            context="{'group_by': 'company_id'}"
                            groups="base.group_multi_company"/>
                </group>
            </search>
        </field>
    </record>
</odoo>
```

### 4. Security Implementation

#### Access Rights (`security/ir.model.access.csv`)
```csv
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_custom_model_user,custom.model.user,model_custom_model,base.group_user,1,1,1,1
access_custom_model_manager,custom.model.manager,model_custom_model,base.group_system,1,1,1,1
```

#### Security Groups (`security/security.xml`)
```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <!-- Security Groups -->
    <record model="res.groups" id="group_custom_model_user">
        <field name="name">Custom Model User</field>
        <field name="category_id" ref="base.module_category_operations"/>
        <field name="implied_ids" eval="[(4, ref('base.group_user'))]"/>
    </record>

    <record model="res.groups" id="group_custom_model_manager">
        <field name="name">Custom Model Manager</field>
        <field name="category_id" ref="base.module_category_operations"/>
        <field name="implied_ids" eval="[(4, ref('group_custom_model_user'))]"/>
    </record>

    <!-- Record Rules -->
    <record id="custom_model_rule_user" model="ir.rule">
        <field name="name">Custom Model: User Access</field>
        <field name="model_id" ref="model_custom_model"/>
        <field name="domain_force">[
            '|',
            ('user_id', '=', user.id),
            ('company_id', 'in', user.company_ids.ids)
        ]</field>
        <field name="groups" eval="[(4, ref('group_custom_model_user'))]"/>
    </record>

    <record id="custom_model_rule_manager" model="ir.rule">
        <field name="name">Custom Model: Manager Access</field>
        <field name="model_id" ref="model_custom_model"/>
        <field name="domain_force">[(1, '=', 1)]</field>
        <field name="groups" eval="[(4, ref('group_custom_model_manager'))]"/>
    </record>
</odoo>
```

### 5. Menu and Actions

#### Menu Items (`views/menu_items.xml`)
```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <!-- Actions -->
    <record id="action_custom_model" model="ir.actions.act_window">
        <field name="name">Custom Models</field>
        <field name="res_model">custom.model</field>
        <field name="view_mode">tree,form</field>
        <field name="context">{}</field>
        <field name="domain">[]</field>
        <field name="help" type="html">
            <p class="o_view_nocontent_smiling_face">
                Create your first custom model!
            </p>
            <p>
                Custom models help you manage your business processes
                efficiently with powerful features and integrations.
            </p>
        </field>
    </record>

    <!-- Menu Items -->
    <menuitem id="menu_custom_root" 
              name="Custom Module" 
              sequence="10"/>
    
    <menuitem id="menu_custom_models" 
              name="Custom Models" 
              parent="menu_custom_root" 
              action="action_custom_model" 
              sequence="10"/>
</odoo>
```

### 6. Testing Implementation

#### Unit Tests (`tests/test_model.py`)
```python
from odoo.tests import TransactionCase
from odoo.exceptions import ValidationError, UserError

class TestCustomModel(TransactionCase):
    
    def setUp(self):
        super().setUp()
        self.CustomModel = self.env['custom.model']
        self.user = self.env.ref('base.user_demo')
        
    def test_create_model(self):
        """Test model creation with required fields"""
        model = self.CustomModel.create({
            'name': 'Test Model',
            'user_id': self.user.id,
        })
        
        self.assertEqual(model.name, 'Test Model')
        self.assertEqual(model.state, 'draft')
        self.assertEqual(model.user_id, self.user)
        self.assertTrue(model.active)
        
    def test_confirm_action(self):
        """Test confirmation workflow"""
        model = self.CustomModel.create({
            'name': 'Test Model',
            'user_id': self.user.id,
        })
        
        # Test confirmation
        model.action_confirm()
        self.assertEqual(model.state, 'confirmed')
        
        # Test cannot confirm again
        with self.assertRaises(UserError):
            model.action_confirm()
            
    def test_validation_constraints(self):
        """Test model validation constraints"""
        with self.assertRaises(ValidationError):
            self.CustomModel.create({
                'name': 'Test Model',
                'field1': -1,  # Should fail constraint
            })
            
    def test_computed_fields(self):
        """Test computed field calculation"""
        model = self.CustomModel.create({
            'name': 'Test Model',
            'field1': 10,
            'field2': 20,
        })
        
        self.assertEqual(model.calculated_field, 30)
        
    def test_sequence_generation(self):
        """Test automatic sequence generation"""
        model1 = self.CustomModel.create({'name': 'Model 1'})
        model2 = self.CustomModel.create({'name': 'Model 2'})
        
        self.assertGreater(model2.sequence, model1.sequence)
```

### 7. Documentation

#### README.rst
```rst
============
Custom Model
============

.. !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   !! This file is generated by oca-gen-addon-readme !!
   !! changes will be overwritten.                   !!
   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

.. |badge1| image:: https://img.shields.io/badge/maturity-Beta-yellow.png
    :target: https://odoo-community.org/page/development-status
    :alt: Beta

|badge1|

This module provides custom model functionality for managing business processes.

**Table of contents**

.. contents::
   :local:

Features
========

* Custom model creation and management
* Workflow management with state transitions
* Multi-company support
* Activity and messaging integration
* Comprehensive security model

Usage
=====

To use this module:

1. Go to Custom Module menu
2. Create a new custom model
3. Fill in required information
4. Use workflow actions to manage state

Bug Tracker
===========

Bugs are tracked on `GitHub Issues <https://github.com/OCA/project-repo/issues>`_.

Credits
=======

Authors
~~~~~~~

* Your Company

Contributors
~~~~~~~~~~~~

* Your Name <your.email@example.com>

Maintainers
~~~~~~~~~~~

This module is maintained by the OCA.

.. image:: https://odoo-community.org/logo.png
   :alt: Odoo Community Association
   :target: https://odoo-community.org

OCA, or the Odoo Community Association, is a nonprofit organization whose
mission is to support the collaborative development of Odoo features and
promote its widespread use.

This module is part of the `OCA/project-repo <https://github.com/OCA/project-repo/tree/16.0/custom_model>`_ project on GitHub.

You are welcome to contribute. To learn how please visit https://odoo-community.org/page/Contribute.
```

## Quality Assurance

### Pre-commit Hooks
```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/OCA/odoo-pre-commit-hooks
    rev: v1.0.0
    hooks:
      - id: oca-checks-odoo-module
      - id: oca-checks-po
  - repo: https://github.com/psf/black
    rev: 22.3.0
    hooks:
      - id: black
  - repo: https://github.com/pycqa/flake8
    rev: 4.0.1
    hooks:
      - id: flake8
        additional_dependencies: [flake8-bugbear==21.9.2]
  - repo: https://github.com/pycqa/isort
    rev: 5.10.1
    hooks:
      - id: isort
        name: isort except __init__.py
        exclude: /__init__\.py$
```

### Testing Checklist
- [ ] Module installs without errors
- [ ] All views render correctly
- [ ] Security rules work as expected
- [ ] Unit tests pass
- [ ] Code passes linting checks
- [ ] Documentation is complete
- [ ] Demo data loads correctly

## Deployment Instructions

### Installation Steps
1. Copy addon to Odoo addons path
2. Update addon list: `invoke install --modules=custom_model`
3. Install addon from Apps menu
4. Configure security groups if needed
5. Import initial data if required

### Post-Installation
1. Verify addon functionality
2. Train users on new features
3. Monitor performance and usage
4. Set up backup procedures

Remember: This task creates the foundation for Odoo addon development. Focus on code quality, security, and user experience while following OCA standards for community compatibility.
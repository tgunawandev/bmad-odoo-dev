# Rapid Brownfield Story Creation Task

## Purpose

Create quick, focused development stories for small brownfield enhancements that can be completed in a single development session. Optimized for fast development cycles and minimal disruption to existing Odoo systems.

## When to Use This Task

**Use this task when:**

- Enhancement can be completed in 2-4 hours of focused development
- Change follows existing patterns exactly
- Integration is straightforward with minimal risk
- No new architecture or significant design required
- Single developer can complete independently

**Use create-next-story when:**
- Enhancement requires multiple days of development
- New patterns or architecture needed
- Complex integration requirements

**Use create-odoo-epic when:**
- Multiple coordinated stories needed
- Significant system changes required

## Quick Assessment Checklist

Before creating the story, validate it meets rapid development criteria:

- [ ] Enhancement scope is clearly defined and small
- [ ] Existing system patterns can be followed
- [ ] No external API integration required
- [ ] No database schema changes needed (or only additive)
- [ ] Testing approach is straightforward
- [ ] Rollback procedure is simple

## Rapid Story Template

### Story Header
```yaml
story_id: "[RAPID-ODO-XXX]"
type: "Rapid Brownfield Enhancement"
priority: "[High/Medium/Low]"
estimated_effort: "[1-4 hours]"
developer_type: "Single developer"
complexity: "Low"
```

### User Story (Concise)
```
As a [user type],
I want [specific enhancement],
So that [immediate business benefit].
```

### Context (Essential Only)

**Existing System:**
- Module: [Specific Odoo module being enhanced]
- Pattern: [Existing pattern this follows]
- Integration: [How it connects to existing functionality]

**Change Scope:**
- Files to modify: [Specific files that will be changed]
- New files: [Any new files needed]
- Database changes: [Minimal database changes if any]

### Acceptance Criteria (Focused)

**Functional:**
1. [Primary functional requirement - specific and testable]
2. [Secondary requirement if applicable]
3. [Integration requirement - how it works with existing features]

**Quality:**
4. Existing functionality continues to work unchanged
5. Follows existing code patterns and standards
6. Basic testing covers the enhancement

### Implementation Guide (Direct)

**Files to Modify:**
- `path/to/file.py`: [Specific changes needed]
- `path/to/view.xml`: [View modifications needed]
- `path/to/other.py`: [Additional changes]

**Pattern to Follow:**
- Reference: [Point to existing similar functionality]
- Approach: [Brief description of implementation approach]

**Testing Strategy:**
- Manual test: [Specific steps to validate functionality]
- Existing tests: [Which existing tests should still pass]

### Quick Validation

**Before Implementation:**
- [ ] Change approach is clear and straightforward
- [ ] No ambiguity in requirements
- [ ] Existing pattern reference identified
- [ ] Testing approach is simple

**After Implementation:**
- [ ] Functional requirements met
- [ ] Existing functionality unchanged
- [ ] Pattern consistency maintained
- [ ] Manual testing completed

### Risk Assessment (Simple)

**Primary Risk:** [Main risk to existing system]
**Mitigation:** [Simple approach to avoid risk]
**Rollback:** [How to undo changes if needed]

## Quick Story Creation Process

### 1. Rapid Requirements Gathering (5 minutes)
- Identify the specific enhancement needed
- Confirm it fits rapid development criteria
- Identify existing pattern to follow
- Define success criteria

### 2. Pattern Identification (5 minutes)
- Find existing similar functionality
- Identify files and code patterns to follow
- Confirm integration approach
- Validate simplicity of implementation

### 3. Story Documentation (10 minutes)
- Complete the rapid story template
- Focus on essential information only
- Eliminate unnecessary details
- Ensure implementation guidance is clear

### 4. Quick Validation (5 minutes)
- Confirm story can be implemented in estimated time
- Validate that existing patterns are sufficient
- Ensure testing approach is straightforward
- Confirm rollback procedure is simple

## Examples of Rapid Brownfield Stories

### Example 1: Add Field to Existing Form
```yaml
story_id: "RAPID-ODO-001"
type: "Rapid Brownfield Enhancement"
estimated_effort: "2 hours"

user_story: |
  As a sales manager,
  I want to see customer credit limit on the sales order form,
  So that I can make informed approval decisions.

context:
  module: "sale"
  pattern: "Follow existing readonly field pattern in sale.order form"
  integration: "Display existing res.partner.credit_limit field"

acceptance_criteria:
  1. Credit limit displays on sales order form
  2. Field is readonly and updates when customer changes
  3. Existing sales order functionality unchanged

implementation:
  files_to_modify:
    - "sale/views/sale_views.xml": "Add credit_limit field to sale.order.form"
  pattern: "Copy approach from existing customer fields in same form"
  testing: "Create sales order, change customer, verify credit limit displays"

risk:
  primary: "Form layout issues"
  mitigation: "Follow existing field placement patterns"
  rollback: "Remove field from view XML"
```

### Example 2: Add Simple Business Rule
```yaml
story_id: "RAPID-ODO-002"
type: "Rapid Brownfield Enhancement"
estimated_effort: "3 hours"

user_story: |
  As a warehouse manager,
  I want to prevent stock moves with zero quantity,
  So that we avoid data inconsistencies.

context:
  module: "stock"
  pattern: "Follow existing validation constraint pattern"
  integration: "Add constraint to stock.move model"

acceptance_criteria:
  1. System prevents creating stock moves with qty = 0
  2. Clear error message displayed to user
  3. Existing stock functionality unchanged

implementation:
  files_to_modify:
    - "stock/models/stock_move.py": "Add @api.constrains validation"
  pattern: "Copy validation pattern from existing constraints in same model"
  testing: "Try to create move with zero qty, verify error message"

risk:
  primary: "Breaking existing moves with zero quantity"
  mitigation: "Only apply to new moves, add data migration for existing"
  rollback: "Remove constraint method"
```

## Success Criteria

The rapid story creation is successful when:

1. Story can be completed in estimated timeframe (1-4 hours)
2. Implementation approach is clear and unambiguous
3. Existing pattern reference provides sufficient guidance
4. Testing approach is simple and executable
5. Risk mitigation is straightforward
6. Rollback procedure is clearly defined
7. Business value is delivered with minimal system impact

## Important Guidelines

**Keep it Simple:**
- Focus on essential information only
- Eliminate unnecessary documentation
- Use existing patterns whenever possible
- Avoid over-engineering solutions

**Risk Management:**
- Prefer additive changes over modifications
- Follow established patterns religiously  
- Test impact on existing functionality
- Plan simple rollback procedures

**Quality Focus:**
- Maintain code consistency with existing system
- Follow established naming conventions
- Include basic validation and error handling
- Document changes for future maintenance

**Time Management:**
- Validate time estimates before starting
- Stop and reassess if complexity grows
- Escalate to full story process if needed
- Maintain focus on single enhancement

Remember: The goal is rapid, safe enhancement of existing Odoo systems with minimal disruption and maximum business value delivery.
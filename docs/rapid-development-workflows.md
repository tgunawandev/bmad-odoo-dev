# Rapid Development Workflows for BMAD-Odoo

## Overview

This document provides optimized workflows for rapid Odoo development using BMAD-Odoo agents, specifically designed for brownfield enhancements and fast delivery cycles. Each workflow is time-boxed and focused on immediate business value delivery.

## Workflow Categories

### 🚀 **Lightning Workflows** (15 minutes - 2 hours)
For immediate fixes and tiny enhancements

### ⚡ **Rapid Workflows** (2-8 hours) 
For small features and quick modules

### 🏃 **Sprint Workflows** (1-3 days)
For complete features and moderate complexity

### 🔄 **Continuous Workflows** (Ongoing)
For maintenance and incremental improvements

---

## Lightning Workflows ⚡

### Lightning Fix (15-30 minutes)
**Use Case**: Critical bug fix or tiny UI adjustment

```bash
# 1. Quick analysis (2 minutes)
*odoo-analyst
"Quick fix needed: [describe issue]"
# Expected: Simple problem statement

# 2. Direct implementation (10-15 minutes) 
*odoo-developer
*brownfield-enhance
# Make direct code change following existing patterns

# 3. Immediate deployment (5-10 minutes)
*doodba-deploy
# Test change in development environment
```

**Example**: Fix typo in form label, adjust field visibility, correct validation message

### Lightning Enhancement (30-60 minutes)
**Use Case**: Add simple field or basic functionality

```bash
# 1. Rapid story creation (5 minutes)
*odoo-analyst
*rapid-story
# Create focused story with clear scope

# 2. Quick implementation (20-40 minutes)
*odoo-developer
*brownfield-enhance
# Follow rapid story guidance exactly

# 3. Quick validation (5-15 minutes)
*doodba-test
# Validate functionality and existing system integrity
```

**Example**: Add readonly field to form, create simple computed field, add basic filter

### Lightning Report (1-2 hours)
**Use Case**: Simple report or view modification

```bash
# 1. Business requirement (10 minutes)
*odoo-analyst
*rapid-story
# Define report requirements and data sources

# 2. Report implementation (60-90 minutes)
*odoo-developer
*quick-addon  # If new report module needed
*brownfield-enhance  # If extending existing reports

# 3. Validation and deployment (10-20 minutes)
*doodba-deploy
*doodba-test
```

**Example**: Customer aging report, sales summary by region, inventory status report

---

## Rapid Workflows 🏃

### Rapid Feature Addition (2-4 hours)
**Use Case**: Small business feature with basic workflow

```bash
# 1. Requirements analysis (30 minutes)
*odoo-analyst
*gather-requirements
*rapid-story

# 2. Technical planning (15 minutes)
*odoo-architect  # Only if integration complexity exists
*plan-modules

# 3. Implementation (2-3 hours)
*odoo-developer
*quick-addon  # For new functionality
*write-tests  # Basic test coverage
*doodba-deploy

# 4. Quality validation (30 minutes)
*odoo-qa
*validate-odoo-module
```

**Example**: Customer approval workflow, product categorization system, simple inventory adjustment

### Rapid Module Creation (4-6 hours)
**Use Case**: Complete small module with CRUD operations

```bash
# 1. Business specification (45 minutes)
*odoo-analyst
*create-functional-spec  # Lightweight version
*map-odoo-modules  # Identify dependencies

# 2. Architecture design (30 minutes)
*odoo-architect
*design-architecture  # Focus on data model and integration

# 3. Module implementation (3-4 hours)
*odoo-developer
*create-module  # Full module structure
*implement-feature  # Business logic
*write-tests  # Comprehensive tests

# 4. Deployment and validation (45 minutes)
*doodba-deploy
*odoo-qa
*validate-odoo-module
```

**Example**: Equipment maintenance tracker, document approval system, customer complaint management

### Rapid Integration (4-8 hours)
**Use Case**: Connect Odoo with external system or API

```bash
# 1. Integration analysis (60 minutes)
*odoo-analyst
*stakeholder-interview  # Understand integration needs
*create-functional-spec

# 2. Integration architecture (45 minutes)
*odoo-architect
*design-integration  # API design and data flow
*security-design  # Authentication and authorization

# 3. Implementation (4-6 hours)
*odoo-developer
*create-module  # Integration module
*implement-feature  # API connections and data handling
*write-tests  # Integration tests

# 4. Testing and deployment (60 minutes)
*odoo-qa
*test-odoo-integration
*doodba-deploy
*troubleshoot-deployment
```

**Example**: Payment gateway integration, shipping API connection, accounting system sync

---

## Sprint Workflows 🏃‍♂️

### Sprint Feature Development (1-3 days)
**Use Case**: Complete business feature with multiple components

```bash
# Day 1: Planning and Architecture (4-6 hours)
# Morning: Business analysis
*odoo-analyst
*analyze-process  # Current state analysis
*gather-requirements  # Detailed requirements
*create-functional-spec

# Afternoon: Technical design
*odoo-architect
*design-architecture  # Complete technical design
*plan-modules  # Module structure and dependencies

# Day 2: Implementation (6-8 hours)
# Sprint planning
*odoo-sm
*plan-sprint  # Break into development tasks
*draft  # Create detailed stories

# Development
*odoo-developer
*develop-story  # Implement each story
*create-module  # New modules as needed
*enhance-existing  # Modify existing modules

# Day 3: Quality and Deployment (4-6 hours)
# Testing
*odoo-qa
*validate-odoo-module
*test-workflow  # Business process testing
*coordinate-uat  # User acceptance testing

# Deployment
*odoo-developer
*deploy-system
*troubleshoot-deployment
```

**Example**: Complete sales commission system, advanced inventory management, multi-stage approval workflow

### Sprint Enhancement Project (2-3 days)
**Use Case**: Significant enhancement to existing system

```bash
# Day 1: Analysis and Planning
*odoo-pm
*assess-current-system  # Current system analysis
*plan-brownfield-enhancement

*odoo-analyst
*gap-analysis  # Identify enhancement opportunities
*create-epic  # Define project scope

# Day 2-3: Coordinated Implementation
*odoo-sm
*manage-sprint  # Sprint coordination
*remove-impediments

*odoo-developer
*enhance-existing  # System enhancements
*migrate-data  # Data updates if needed
*optimize-performance

*odoo-qa
*test-brownfield-enhancement
*validate-upgrade  # Ensure compatibility
```

**Example**: Enhance existing CRM with advanced lead scoring, upgrade inventory with lot tracking, extend accounting with advanced reporting

---

## Continuous Workflows 🔄

### Daily Maintenance Workflow
**Use Case**: Ongoing system maintenance and small improvements

```bash
# Morning standup (15 minutes)
*odoo-sm
*facilitate-standup  # Daily progress and impediments

# Request processing (Throughout day)
*odoo-analyst
*rapid-story  # Process small enhancement requests

*odoo-developer
*brownfield-enhance  # Implement quick fixes
*doodba-deploy  # Regular deployment cycles

# End of day (30 minutes)
*odoo-qa
*assess-quality-metrics  # Monitor system health
*review-test-coverage  # Ensure quality maintenance
```

### Weekly Sprint Cycle
**Use Case**: Regular feature delivery and improvements

```bash
# Monday: Sprint Planning (2 hours)
*odoo-sm
*plan-sprint  # Plan week's work
*refine-backlog  # Refine upcoming stories

*odoo-analyst
*story-prioritization  # Prioritize based on business value

# Tuesday-Thursday: Development (6 hours/day)
*odoo-developer
*develop-story  # Implement planned stories
*write-tests  # Maintain test coverage
*doodba-deploy  # Regular testing

# Friday: Review and Retrospective (3 hours)
*odoo-sm
*review-sprint  # Demo completed work
*retrospective  # Process improvement

*odoo-qa
*validate-enhancement  # Final quality validation
```

### Monthly Improvement Cycle
**Use Case**: Strategic improvements and technical debt management

```bash
# Week 1: Assessment and Planning
*odoo-pm
*track-progress  # Review monthly objectives
*assess-risks  # Identify emerging risks

*odoo-architect
*research  # Research new patterns and improvements

# Week 2-3: Implementation
*odoo-sm
*process-improvement  # Implement process improvements
*team-health-check  # Assess team satisfaction

*odoo-developer
*review-code  # Code quality improvements
*optimize-performance  # Performance enhancements

# Week 4: Validation and Planning
*odoo-qa
*performance-benchmark  # Performance validation
*create-test-automation  # Improve test automation

*odoo-pm
*prepare-next-cycle  # Plan next month's objectives
```

---

## Workflow Selection Guide

### Time-Based Selection

| Available Time | Workflow Type | Typical Deliverable |
|----------------|---------------|-------------------|
| 15-30 minutes | Lightning Fix | Bug fix, label change |
| 30-60 minutes | Lightning Enhancement | Simple field addition |
| 1-2 hours | Lightning Report | Basic report or view |
| 2-4 hours | Rapid Feature | Small business feature |
| 4-6 hours | Rapid Module | Complete small module |
| 4-8 hours | Rapid Integration | External system connection |
| 1-3 days | Sprint Feature | Complete business capability |
| 2-3 days | Sprint Enhancement | Major system enhancement |

### Complexity-Based Selection

| Complexity Level | Recommended Workflow | Agent Involvement |
|-----------------|---------------------|------------------|
| **Simple** | Lightning workflows | analyst + developer |
| **Moderate** | Rapid workflows | analyst + architect + developer + qa |
| **Complex** | Sprint workflows | All agents + pm coordination |
| **Strategic** | Continuous workflows | Full team coordination |

### Business Impact Selection

| Business Impact | Urgency | Workflow Choice |
|----------------|---------|-----------------|
| **Critical Fix** | Immediate | Lightning Fix |
| **User Request** | Same day | Lightning Enhancement |
| **Business Process** | This week | Rapid Feature |
| **System Integration** | This sprint | Sprint Feature |
| **Strategic Initiative** | This quarter | Continuous workflow |

---

## Optimization Tips

### Speed Optimization
1. **Pre-defined templates**: Use quick-addon-template for common patterns
2. **Pattern reuse**: Always reference existing similar functionality
3. **Minimal documentation**: Focus on essential information only
4. **Automated testing**: Use doodba-test for rapid validation
5. **Incremental deployment**: Deploy frequently for early feedback

### Quality Optimization
1. **Early QA involvement**: Include odoo-qa even in rapid workflows
2. **Continuous validation**: Test after each significant change  
3. **Pattern consistency**: Always follow existing system patterns
4. **Risk assessment**: Always consider impact on existing functionality
5. **Rollback planning**: Have simple rollback procedures ready

### Team Optimization
1. **Clear communication**: Use specific business language with agents
2. **Context sharing**: Provide complete context to avoid research overhead
3. **Parallel work**: Use multiple agents simultaneously when possible
4. **Knowledge capture**: Document patterns and decisions for reuse
5. **Continuous improvement**: Regular retrospectives and process updates

---

## Success Metrics

### Delivery Speed
- **Lightning workflows**: 95% completed within time box
- **Rapid workflows**: 90% completed within time box  
- **Sprint workflows**: 85% completed within time box

### Quality Measures
- **Zero regression**: No existing functionality broken
- **Test coverage**: Minimum 80% for new functionality
- **User satisfaction**: 90%+ approval for delivered features
- **Performance impact**: <5% degradation acceptable

### Process Health
- **Team velocity**: Consistent or improving over time
- **Technical debt**: Managed and decreasing
- **Knowledge sharing**: All team members can use workflows
- **Continuous improvement**: Process refinements each sprint

Remember: The key to successful rapid development is matching the workflow complexity to the actual business need, not over-engineering solutions, and maintaining quality throughout the accelerated process.
# Create Odoo Epic Task

## Purpose

Create a comprehensive development epic for Odoo implementations that groups related user stories, defines business value, and provides technical coordination for brownfield enhancements or new feature development.

## When to Use This Task

**Use this task when:**

- Business requirement is too large for a single story (2-6 stories needed)
- Multiple related features need coordinated development
- Significant Odoo module enhancement or new module creation
- Cross-functional coordination is required
- Phased delivery approach is beneficial for business value

**Use create-next-story when:**
- Single story can deliver the complete requirement
- No coordination between multiple development efforts needed

## Prerequisites

**Required Inputs:**
- Business requirements or functional specifications
- User personas and workflow requirements
- Success criteria and business value metrics
- Technical constraints and integration requirements

**Odoo-Specific Requirements:**
- Target Odoo version (13.0-18.0)
- Existing module dependencies and customizations
- Integration requirements with standard Odoo modules
- Multi-company and localization considerations

## Instructions

### 1. Epic Foundation

Establish the epic structure and business alignment:

#### Epic Metadata
- **Epic ID**: Generate unique identifier (e.g., EPIC-ODO-001)
- **Business Theme**: High-level business capability being delivered
- **Target Odoo Version**: Specific version compatibility requirement
- **Epic Size**: Number of anticipated stories (2-6 typical range)
- **Business Priority**: Critical/High/Medium based on business impact
- **Target Timeline**: Planned delivery timeframe and milestones

#### Epic Vision Statement
```
For [target users/stakeholders],
Who need [business problem/opportunity],
The [epic name] epic
Will deliver [key business capabilities]
That provide [measurable business value]
Unlike [current state or alternatives].
```

### 2. Business Value Definition

Clearly articulate the business case and expected outcomes:

#### Business Objectives
- **Primary Goal**: The main business outcome this epic will achieve
- **Secondary Goals**: Additional benefits that will be realized
- **Success Metrics**: Quantifiable measures of success (KPIs, ROI, efficiency gains)
- **Business Impact**: How this epic supports broader organizational objectives

#### User Value Proposition
- **End User Benefits**: Direct improvements to user experience and productivity
- **Process Improvements**: Business process optimizations and automation
- **System Integration**: Enhanced connectivity and data flow
- **Compliance/Risk**: Regulatory compliance or risk mitigation benefits

### 3. Scope and Story Breakdown

Define the epic scope and break it down into manageable stories:

#### Epic Scope
**Included in Epic:**
- Core functionality that must be delivered together
- Essential integrations and dependencies
- Minimum viable feature set for business value

**Excluded from Epic:**
- Future enhancements that can be delivered separately
- Nice-to-have features that don't impact core value
- Advanced configurations that can be added later

#### Story Identification

Break down the epic into specific user stories:

```yaml
story_breakdown:
  story_1:
    title: "[Story 1 Title]"
    user_story: "As a [user], I want [capability], so that [value]"
    business_value: "[Specific business value delivered]"
    technical_focus: "[Primary technical implementation area]"
    estimated_effort: "[Story points or time estimate]"
    dependencies: "[Other stories or external dependencies]"
    
  story_2:
    title: "[Story 2 Title]"
    user_story: "As a [user], I want [capability], so that [value]"
    business_value: "[Specific business value delivered]"
    technical_focus: "[Primary technical implementation area]"
    estimated_effort: "[Story points or time estimate]"
    dependencies: "[Other stories or external dependencies]"
```

### 4. Odoo-Specific Technical Architecture

Define the technical approach and Odoo integration strategy:

#### Module Architecture
- **New Modules**: Modules that will be created for this epic
- **Extended Modules**: Existing modules that will be enhanced
- **OCA Dependencies**: Community modules that will be integrated
- **Standard Module Integration**: How epic integrates with standard Odoo

#### Data Model Design
- **New Models**: Business objects that will be created
- **Model Extensions**: Existing models that will be enhanced
- **Relationships**: Key relationships between models
- **Data Migration**: Existing data that needs to be migrated or transformed

#### Integration Architecture
- **Internal Integrations**: Connections with other Odoo modules
- **External Integrations**: APIs and external system connections
- **Data Flow**: How data moves through the system
- **Security Model**: Access controls and permissions architecture

### 5. Development Coordination

Plan the coordination and dependencies between stories:

#### Story Dependencies
Map the relationships between stories and external dependencies:

```yaml
dependency_map:
  story_1:
    prerequisites: "[Stories or tasks that must be completed first]"
    enables: "[Stories that can start after this completes]"
    external_dependencies: "[External systems or resources needed]"
    
  story_2:
    prerequisites: "[Dependencies for story 2]"
    enables: "[What this story enables]"
    external_dependencies: "[External dependencies]"
```

#### Delivery Phases
Plan incremental delivery that provides business value:

```yaml
delivery_phases:
  phase_1:
    name: "[Phase 1 Name - Minimal Viable Feature]"
    stories: "[Stories included in phase 1]"
    business_value: "[Business value delivered in phase 1]"
    success_criteria: "[How success is measured for phase 1]"
    
  phase_2:
    name: "[Phase 2 Name - Enhanced Functionality]"
    stories: "[Stories included in phase 2]"
    business_value: "[Additional business value in phase 2]"
    success_criteria: "[Success criteria for phase 2]"
```

### 6. Quality and Testing Strategy

Define comprehensive quality assurance approach:

#### Testing Strategy
- **Unit Testing**: Component-level testing approach
- **Integration Testing**: Module and system integration validation
- **User Acceptance Testing**: Business scenario validation with stakeholders
- **Performance Testing**: System performance and scalability validation
- **Migration Testing**: Data migration and upgrade validation

#### Quality Gates
- **Story Completion**: Criteria for individual story completion
- **Phase Completion**: Criteria for phase-level completion
- **Epic Completion**: Overall epic completion and acceptance criteria
- **Production Readiness**: Criteria for production deployment

### 7. Risk Assessment and Mitigation

Identify epic-level risks and mitigation strategies:

#### Technical Risks
- **Integration Complexity**: Risk of complex integration challenges
- **Performance Impact**: Risk of performance degradation
- **Data Migration**: Risk of data migration issues
- **Version Compatibility**: Risk of Odoo version compatibility issues

#### Business Risks
- **User Adoption**: Risk of low user adoption or resistance
- **Process Change**: Risk of business process disruption
- **Timeline Impact**: Risk of delays affecting business objectives
- **Resource Availability**: Risk of insufficient resources or expertise

#### Mitigation Strategies
```yaml
risk_mitigation:
  technical_risks:
    - risk: "[Technical risk description]"
      impact: "[High/Medium/Low]"
      probability: "[High/Medium/Low]"
      mitigation: "[Specific mitigation approach]"
      
  business_risks:
    - risk: "[Business risk description]"
      impact: "[High/Medium/Low]"
      probability: "[High/Medium/Low]"
      mitigation: "[Specific mitigation approach]"
```

### 8. Epic Validation and Approval

Validate the epic before story development begins:

#### Epic Completeness
- [ ] Epic vision clearly articulates business value
- [ ] Story breakdown covers complete business requirement
- [ ] Technical architecture is sound and feasible
- [ ] Dependencies are identified and manageable
- [ ] Quality strategy ensures comprehensive validation

#### Stakeholder Alignment
- [ ] Business stakeholders approve epic scope and value
- [ ] Technical stakeholders validate architecture approach
- [ ] Project management approves timeline and resource requirements
- [ ] Quality assurance approves testing strategy

#### Resource and Timeline Validation
- [ ] Required skills and expertise are available
- [ ] Timeline is realistic given story estimates and dependencies
- [ ] External dependencies can be resolved within timeframe
- [ ] Risk mitigation strategies are feasible and effective

## Epic Template Output

Use this template for the final epic documentation:

```yaml
epic_id: "[EPIC-ID]"
title: "[Epic Title]"
business_theme: "[High-level business capability]"
odoo_version: "[Target Odoo version]"
priority: "[Critical/High/Medium]"
estimated_timeline: "[Timeline estimate]"

vision_statement: |
  For [target users],
  Who need [business problem],
  The [epic name] epic
  Will deliver [key capabilities]
  That provide [business value]
  Unlike [current state].

business_value:
  primary_objectives:
    - "[Primary business objective 1]"
    - "[Primary business objective 2]"
  success_metrics:
    - metric: "[Metric name]"
      target: "[Target value]"
      measurement: "[How it will be measured]"

scope:
  included:
    - "[Core functionality 1]"
    - "[Core functionality 2]"
  excluded:
    - "[Future enhancement 1]"
    - "[Future enhancement 2]"

stories:
  - id: "[STORY-ID-1]"
    title: "[Story 1 Title]"
    user_story: "[Story 1 user story]"
    business_value: "[Story 1 business value]"
    estimated_effort: "[Effort estimate]"
    
  - id: "[STORY-ID-2]"
    title: "[Story 2 Title]"
    user_story: "[Story 2 user story]"
    business_value: "[Story 2 business value]"
    estimated_effort: "[Effort estimate]"

technical_architecture:
  modules:
    new: "[New modules to be created]"
    extended: "[Existing modules to be extended]"
    dependencies: "[OCA and standard module dependencies]"
  
  data_models:
    new: "[New models to be created]"
    extended: "[Existing models to be extended]"
    relationships: "[Key model relationships]"

delivery_phases:
  - phase: 1
    name: "[Phase 1 Name]"
    stories: "[Story IDs in phase 1]"
    business_value: "[Phase 1 business value]"
    
  - phase: 2
    name: "[Phase 2 Name]"
    stories: "[Story IDs in phase 2]"
    business_value: "[Phase 2 business value]"

quality_strategy:
  testing_approach: "[Testing strategy summary]"
  quality_gates: "[Key quality gates]"
  acceptance_criteria: "[Epic-level acceptance criteria]"

risks:
  - risk: "[Risk description]"
    impact: "[High/Medium/Low]"
    probability: "[High/Medium/Low]"
    mitigation: "[Mitigation strategy]"

dependencies:
  - dependency: "[Dependency description]"
    type: "[Internal/External]"
    status: "[Status/Timeline]"
```

## Success Criteria

The epic creation is successful when:

1. Epic clearly articulates business value and strategic alignment
2. Story breakdown covers complete business requirement without gaps
3. Technical architecture is feasible and follows Odoo best practices
4. Dependencies are identified and have clear resolution paths
5. Quality strategy ensures comprehensive validation and testing
6. Risk assessment identifies major risks with viable mitigation strategies
7. Stakeholders approve epic scope, approach, and timeline
8. Epic provides clear coordination structure for story development

## Important Notes

- **Business Value Focus**: Every story in the epic must contribute to measurable business value
- **Odoo Best Practices**: Follow OCA standards and Odoo architectural patterns
- **Incremental Delivery**: Plan phases that deliver business value incrementally
- **Risk Management**: Proactively identify and plan mitigation for major risks
- **Stakeholder Alignment**: Ensure all stakeholders understand and approve the epic approach
- **Coordination Structure**: Provide clear guidance for managing story dependencies

Remember: A well-structured epic enables coordinated development while maintaining focus on business value delivery and technical excellence.
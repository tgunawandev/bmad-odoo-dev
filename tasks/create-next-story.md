# Create Next Story Task

## Purpose

Create a detailed, actionable development story from business requirements or technical specifications that follows BMAD-METHOD patterns and provides complete context for AI-driven development.

## When to Use This Task

**Use this task when:**

- Converting business requirements into implementable development stories
- Breaking down technical architecture into development tasks
- Creating stories that will be implemented by AI developers
- Need comprehensive story documentation with full business and technical context
- Following BMAD-METHOD story creation patterns

## Prerequisites

**Required Inputs:**
- Business requirements or functional specifications
- Technical architecture or design documentation (if available)
- User personas and workflow context
- Acceptance criteria and success metrics

**Optional Context:**
- Existing system documentation for brownfield projects
- Integration requirements and constraints
- Performance and scalability requirements
- Security and compliance considerations

## Instructions

### 1. Story Foundation

Establish the core story information:

#### Story Metadata
- **Story ID**: Generate unique identifier (e.g., ODO-001, ODO-002)
- **Epic Reference**: Link to parent epic if applicable
- **Priority**: High/Medium/Low based on business value
- **Estimated Effort**: Story points or time estimate
- **Target Sprint**: Planned development iteration

#### User Story Statement
```
As a [user type/persona],
I want [specific capability or action],
So that [clear business value/benefit].
```

### 2. Story Context (CRITICAL for AI Development)

Provide comprehensive context that eliminates the need for external research:

#### Business Context
- **Background**: Why this story exists and its business importance
- **Current State**: How users currently accomplish this task (if applicable)
- **Desired Future State**: Clear vision of the improved experience
- **Business Rules**: Any constraints or business logic requirements
- **Success Metrics**: How success will be measured

#### Technical Context
- **System Integration**: How this fits with existing systems
- **Technology Stack**: Relevant frameworks, libraries, and tools
- **Architecture Alignment**: How this follows established patterns
- **Data Requirements**: Database changes, data flow, and integrations
- **Performance Requirements**: Speed, scalability, and resource constraints

### 3. Detailed Acceptance Criteria

Create comprehensive, testable acceptance criteria:

#### Functional Requirements
```
GIVEN [initial conditions/context]
WHEN [user action or trigger]
THEN [expected system behavior]
AND [additional behavior if applicable]
```

#### Non-Functional Requirements
- Performance criteria (response time, throughput)
- Security requirements (authentication, authorization, data protection)
- Usability standards (accessibility, user experience)
- Compatibility requirements (browsers, devices, versions)

#### Integration Requirements
- API contracts and data formats
- External system dependencies
- Error handling and edge cases
- Data validation and business rule enforcement

### 4. Implementation Guidance

Provide clear technical direction for AI developers:

#### Technical Approach
- **Recommended Architecture**: High-level implementation strategy
- **Key Components**: Major classes, modules, or services to create/modify
- **Integration Points**: External APIs, databases, or services to connect
- **Design Patterns**: Specific patterns to follow for consistency

#### Development Tasks (Breakdown)
Break the story into specific, actionable tasks:

1. **Database/Model Changes**
   - [ ] Create/modify database schema
   - [ ] Implement data models and relationships
   - [ ] Add validation and constraints

2. **Business Logic Implementation**
   - [ ] Implement core business logic
   - [ ] Add business rule validation
   - [ ] Handle edge cases and error conditions

3. **User Interface Components**
   - [ ] Create/modify user interface elements
   - [ ] Implement user interactions and workflows
   - [ ] Add responsive design and accessibility features

4. **Integration Development**
   - [ ] Implement API endpoints or connections
   - [ ] Add data transformation and validation
   - [ ] Handle authentication and authorization

5. **Testing and Validation**
   - [ ] Write unit tests for business logic
   - [ ] Create integration tests for workflows
   - [ ] Implement user acceptance test scenarios

### 5. Quality Assurance

Define comprehensive testing and validation requirements:

#### Testing Strategy
- **Unit Testing**: Test individual components and business logic
- **Integration Testing**: Test system interactions and data flow
- **User Acceptance Testing**: Validate business scenarios and workflows
- **Performance Testing**: Validate response times and resource usage

#### Validation Checklist
- [ ] Functional requirements met
- [ ] Non-functional requirements satisfied
- [ ] Integration points working correctly
- [ ] Error handling implemented
- [ ] Security requirements addressed
- [ ] Performance criteria met
- [ ] User experience validated
- [ ] Documentation updated

### 6. Definition of Done

Establish clear completion criteria:

#### Development Completion
- [ ] All acceptance criteria implemented and verified
- [ ] Code follows established standards and patterns
- [ ] Unit tests written and passing
- [ ] Integration tests implemented and passing
- [ ] Code review completed and approved

#### Quality Assurance
- [ ] User acceptance testing scenarios pass
- [ ] Performance requirements met
- [ ] Security requirements validated
- [ ] Error handling tested and working
- [ ] Cross-browser/device compatibility verified

#### Documentation and Deployment
- [ ] Technical documentation updated
- [ ] User documentation updated (if applicable)
- [ ] Deployment procedures documented
- [ ] Rollback procedures validated
- [ ] Production deployment completed

### 7. Risk Assessment and Mitigation

Identify and plan for potential risks:

#### Technical Risks
- **Complexity Risk**: Aspects that may be more complex than estimated
- **Integration Risk**: Dependencies on external systems or services
- **Performance Risk**: Potential performance bottlenecks or scalability issues
- **Compatibility Risk**: Potential compatibility issues with existing systems

#### Mitigation Strategies
- **Risk 1**: [Description] → **Mitigation**: [Specific approach]
- **Risk 2**: [Description] → **Mitigation**: [Specific approach]
- **Fallback Plan**: Alternative approach if primary approach fails

### 8. Story Validation

Before finalizing the story, validate:

#### Completeness Check
- [ ] Story provides complete context for independent development
- [ ] All dependencies and integration points identified
- [ ] Acceptance criteria are specific and testable
- [ ] Technical guidance is clear and actionable

#### Feasibility Assessment
- [ ] Story can be completed within estimated timeframe
- [ ] Required skills and resources are available
- [ ] Technical approach is sound and feasible
- [ ] Dependencies can be resolved within timeline

#### Business Value Validation
- [ ] Story delivers clear business value
- [ ] Success criteria are measurable
- [ ] Priority aligns with business objectives
- [ ] Stakeholder approval obtained

## Story Template Output

Use this template for the final story documentation:

```yaml
story_id: [STORY-ID]
title: "[Story Title]"
epic: "[Epic Reference]"
priority: "[High/Medium/Low]"
effort_estimate: "[Story Points/Hours]"
target_sprint: "[Sprint Number/Date]"

user_story: |
  As a [user type],
  I want [capability],
  So that [business value].

business_context: |
  [Complete business background and context]

technical_context: |
  [Technical architecture and integration details]

acceptance_criteria:
  functional:
    - criteria: |
        GIVEN [context]
        WHEN [action]
        THEN [expected result]
  non_functional:
    - performance: "[Performance requirements]"
    - security: "[Security requirements]"
    - usability: "[Usability requirements]"

implementation_guidance:
  approach: "[Technical approach]"
  components: "[Key components to create/modify]"
  patterns: "[Design patterns to follow]"

tasks:
  - category: "Database/Models"
    items:
      - task: "[Specific database task]"
        completed: false
  - category: "Business Logic"
    items:
      - task: "[Specific logic task]"
        completed: false

testing_strategy:
  unit_tests: "[Unit testing requirements]"
  integration_tests: "[Integration testing requirements]"
  acceptance_tests: "[UAT scenarios]"

definition_of_done:
  - "[Completion criteria 1]"
  - "[Completion criteria 2]"

risks:
  - risk: "[Risk description]"
    mitigation: "[Mitigation strategy]"

dependencies:
  - dependency: "[Dependency description]"
    status: "[Status/Timeline]"
```

## Success Criteria

The story creation is successful when:

1. Story provides complete context for independent AI development
2. All acceptance criteria are specific, testable, and measurable
3. Technical guidance eliminates ambiguity and provides clear direction
4. Business value is clearly articulated and aligned with objectives
5. Story can be completed within estimated timeframe with available resources
6. Quality assurance requirements ensure comprehensive validation
7. Risk assessment identifies and mitigates potential issues

## Important Notes

- **Context is Critical**: AI developers need complete context to work independently
- **Specificity Matters**: Vague requirements lead to misaligned implementations
- **Business Value First**: Every story must deliver measurable business value
- **Technical Feasibility**: Ensure stories are technically achievable within constraints
- **Quality Focus**: Build quality requirements into every story from the beginning
- **Risk Awareness**: Proactively identify and mitigate potential issues

Remember: A well-crafted story eliminates the need for additional research and provides everything needed for successful AI-driven development.
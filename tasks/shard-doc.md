# Shard Document Task

## Purpose

Break down large documents (PRDs, Architecture documents, or Epics) into implementable development stories that follow BMAD-METHOD patterns and provide complete context for AI-driven development.

## When to Use This Task

**Use this task when:**

- Converting comprehensive PRD into development stories
- Breaking down technical architecture into implementation tasks
- Transforming epics into manageable development stories
- Need to create a coordinated set of stories from larger specifications
- Following BMAD-METHOD story sharding patterns

**Input documents typically include:**
- Product Requirements Documents (PRD)
- Technical Architecture Documents
- Business Epic specifications
- Functional specifications

## Prerequisites

**Required Inputs:**
- Source document to be sharded (PRD, Architecture, or Epic)
- Clear understanding of development capacity and sprint structure
- Target Odoo version and technical constraints
- Stakeholder priorities and timeline requirements

**Document Structure Expected:**
- Clear business requirements and objectives
- Technical specifications or architectural guidance
- User personas and workflow requirements
- Success criteria and acceptance criteria

## Sharding Process

### 1. Document Analysis and Preparation

Analyze the source document to understand scope and complexity:

#### Document Assessment
- **Document Type**: [PRD/Architecture/Epic/Other]
- **Business Scope**: [High-level business capability being addressed]
- **Technical Complexity**: [Assessment of technical implementation complexity]
- **User Impact**: [Number and types of users affected]
- **Integration Requirements**: [Systems and modules involved]
- **Timeline Constraints**: [Delivery deadlines and milestone requirements]

#### Sharding Strategy
- **Story Size Target**: [Typical story size for this project - e.g., 2-5 days of development]
- **Sprint Length**: [Target sprint duration for story planning]
- **Delivery Phases**: [Number of incremental delivery phases planned]
- **Dependencies**: [Major dependencies that affect story sequencing]

### 2. Business Value Decomposition

Break down business value into deliverable increments:

#### Value Stream Identification
Identify distinct value streams that can be delivered independently:

```yaml
value_streams:
  stream_1:
    name: "[Value Stream 1 Name - e.g., Basic User Management]"
    business_value: "[Specific business value delivered]"
    user_impact: "[Which users benefit and how]"
    complexity: "[High/Medium/Low]"
    dependencies: "[Prerequisites for this stream]"
  
  stream_2:
    name: "[Value Stream 2 Name - e.g., Advanced Reporting]"
    business_value: "[Specific business value delivered]"
    user_impact: "[Which users benefit and how]"
    complexity: "[High/Medium/Low]"
    dependencies: "[Prerequisites for this stream]"
```

#### Story Identification Within Streams
For each value stream, identify specific user stories:

```yaml
value_stream_stories:
  stream_1_stories:
    - story_concept: "[Story concept - e.g., User registration and profile management]"
      user_persona: "[Specific user type]"
      business_value: "[Specific value delivered]"
      estimated_complexity: "[Story points or time estimate]"
    
    - story_concept: "[Story concept - e.g., User authentication and security]"
      user_persona: "[Specific user type]"
      business_value: "[Specific value delivered]"
      estimated_complexity: "[Story points or time estimate]"
```

### 3. Technical Architecture Mapping

Map business requirements to technical implementation:

#### Component Identification
Identify technical components needed for implementation:

```yaml
technical_components:
  models:
    - component: "[Model name - e.g., user.profile]"
      purpose: "[Business purpose]"
      complexity: "[Implementation complexity]"
      dependencies: "[Technical dependencies]"
  
  views:
    - component: "[View name - e.g., user profile form]"
      purpose: "[User interface purpose]"
      complexity: "[Implementation complexity]"
      dependencies: "[Related models and data]"
  
  integrations:
    - component: "[Integration name - e.g., email notification system]"
      purpose: "[Integration purpose]"
      complexity: "[Implementation complexity]"
      dependencies: "[External systems or APIs]"
```

#### Story-Component Mapping
Map stories to technical components:

```yaml
story_component_mapping:
  story_1:
    components:
      - models: "[Models needed for this story]"
      - views: "[Views needed for this story]"
      - integrations: "[Integrations needed for this story]"
      - tests: "[Testing requirements for this story]"
```

### 4. Story Creation and Detailing

Create detailed, implementable stories from the analysis:

#### Story Template Application
For each identified story, create comprehensive documentation:

```yaml
story_details:
  story_id: "[STORY-ID]"
  title: "[Descriptive story title]"
  
  user_story: |
    As a [specific user persona],
    I want [specific capability],
    So that [measurable business value].
  
  business_context: |
    [Complete business background from source document]
    [Why this story exists and its importance]
    [How it fits into the overall business objective]
  
  technical_context: |
    [Technical architecture and implementation approach]
    [Integration requirements and constraints]
    [Performance and security considerations]
  
  acceptance_criteria:
    functional:
      - criteria: |
          GIVEN [initial conditions]
          WHEN [user action]
          THEN [expected result]
    non_functional:
      - performance: "[Performance requirements]"
      - security: "[Security requirements]"
      - usability: "[Usability requirements]"
  
  implementation_guidance:
    approach: "[Technical implementation approach]"
    components: "[Specific components to create/modify]"
    patterns: "[Design patterns to follow]"
    
  tasks:
    - category: "[Task category - e.g., Models]"
      items:
        - task: "[Specific implementation task]"
          estimated_effort: "[Time estimate]"
```

### 5. Story Prioritization and Sequencing

Organize stories for optimal delivery value:

#### Dependency Analysis
Map dependencies between stories and external factors:

```yaml
story_dependencies:
  story_1:
    prerequisites: 
      - "[Other stories that must be completed first]"
      - "[External dependencies that must be resolved]"
    enables:
      - "[Stories that can begin after this story completes]"
    risk_factors:
      - "[Factors that could impact this story's timeline]"
```

#### Delivery Sequence Planning
Plan story delivery sequence for maximum business value:

```yaml
delivery_phases:
  phase_1:
    name: "[Phase 1 - Minimum Viable Feature]"
    business_objective: "[Primary business value delivered]"
    stories:
      - id: "[STORY-ID-1]"
        priority: "High"
        rationale: "[Why this story is in phase 1]"
    success_criteria: "[How success is measured for this phase]"
    
  phase_2:
    name: "[Phase 2 - Enhanced Functionality]"
    business_objective: "[Additional business value delivered]"
    stories:
      - id: "[STORY-ID-2]"
        priority: "Medium"
        rationale: "[Why this story is in phase 2]"
    success_criteria: "[How success is measured for this phase]"
```

### 6. Quality Assurance Planning

Define testing and validation strategy across stories:

#### Cross-Story Testing Strategy
Plan testing approach that spans multiple stories:

```yaml
testing_strategy:
  integration_testing:
    scope: "[Integration points between stories]"
    approach: "[How integration will be tested]"
    validation: "[Integration success criteria]"
  
  user_acceptance_testing:
    scenarios: "[End-to-end business scenarios]"
    stakeholders: "[Who will participate in UAT]"
    success_criteria: "[UAT completion criteria]"
  
  performance_testing:
    scope: "[Performance requirements across stories]"
    benchmarks: "[Performance benchmarks to meet]"
    validation: "[Performance testing approach]"
```

#### Story-Level Quality Gates
Define quality requirements for individual stories:

```yaml
quality_gates:
  story_completion:
    - "[Quality requirement 1 - e.g., All acceptance criteria met]"
    - "[Quality requirement 2 - e.g., Unit tests pass]"
    - "[Quality requirement 3 - e.g., Code review completed]"
  
  phase_completion:
    - "[Phase quality requirement 1 - e.g., Integration tests pass]"
    - "[Phase quality requirement 2 - e.g., UAT scenarios validated]"
    - "[Phase quality requirement 3 - e.g., Performance benchmarks met]"
```

### 7. Risk Assessment and Mitigation

Identify and plan for risks across the story set:

#### Cross-Story Risk Analysis
Assess risks that affect multiple stories or overall delivery:

```yaml
risks:
  technical_risks:
    - risk: "[Technical risk description]"
      impact: "[High/Medium/Low]"
      probability: "[High/Medium/Low]"
      affected_stories: "[Stories that would be impacted]"
      mitigation: "[Risk mitigation strategy]"
  
  business_risks:
    - risk: "[Business risk description]"
      impact: "[High/Medium/Low]"
      probability: "[High/Medium/Low]"
      affected_stories: "[Stories that would be impacted]"
      mitigation: "[Risk mitigation strategy]"
```

### 8. Validation and Finalization

Validate the story set before development begins:

#### Completeness Validation
- [ ] **All business requirements from source document are covered**
- [ ] **Each story delivers independent business value**
- [ ] **Technical architecture is completely addressed**
- [ ] **User personas and workflows are fully supported**
- [ ] **Integration requirements are addressed across stories**

#### Feasibility Assessment
- [ ] **Story estimates align with development capacity**
- [ ] **Dependencies have realistic resolution timelines**
- [ ] **Technical approach is sound for each story**
- [ ] **Resource requirements are available**
- [ ] **Timeline is realistic given constraints**

#### Stakeholder Alignment
- [ ] **Business stakeholders approve story breakdown**
- [ ] **Technical stakeholders validate implementation approach**
- [ ] **Priority and sequencing align with business objectives**
- [ ] **Quality requirements are agreed upon**
- [ ] **Risk mitigation strategies are approved**

## Sharding Output Template

### Story Collection Summary
```yaml
sharding_summary:
  source_document: "[Source document name and version]"
  sharding_date: "[Date sharding was completed]"
  total_stories: "[Number of stories created]"
  estimated_total_effort: "[Total effort estimate across all stories]"
  delivery_phases: "[Number of planned delivery phases]"
  
story_collection:
  - story_id: "[STORY-ID-1]"
    title: "[Story title]"
    priority: "[High/Medium/Low]"
    phase: "[Delivery phase]"
    estimated_effort: "[Effort estimate]"
    dependencies: "[Key dependencies]"
    
  - story_id: "[STORY-ID-2]"
    title: "[Story title]"
    priority: "[High/Medium/Low]"
    phase: "[Delivery phase]"
    estimated_effort: "[Effort estimate]"
    dependencies: "[Key dependencies]"

delivery_roadmap:
  phase_1:
    stories: "[Story IDs in phase 1]"
    business_value: "[Business value delivered]"
    timeline: "[Estimated timeline]"
    
  phase_2:
    stories: "[Story IDs in phase 2]"
    business_value: "[Business value delivered]"
    timeline: "[Estimated timeline]"

cross_story_considerations:
  integration_points: "[Major integration points between stories]"
  shared_components: "[Technical components used by multiple stories]"
  testing_strategy: "[Overall testing and validation approach]"
  risk_mitigation: "[Major risks and mitigation strategies]"
```

## Success Criteria

Document sharding is successful when:

1. **Complete Coverage**: All business requirements from source document are addressed
2. **Independent Value**: Each story delivers measurable business value independently
3. **Implementation Ready**: Stories provide complete context for AI-driven development
4. **Realistic Scope**: Story estimates align with development capacity and timeline
5. **Clear Dependencies**: Dependencies are identified and have resolution plans
6. **Quality Focus**: Testing and validation strategy ensures comprehensive coverage
7. **Stakeholder Alignment**: All stakeholders approve the story breakdown and approach

## Important Guidelines

**Business Value Focus:**
- Every story must deliver measurable business value
- Stories should be sequenced to maximize early value delivery
- Business context must be preserved in each story

**Technical Coherence:**
- Maintain architectural consistency across stories
- Plan for shared components and integration points
- Consider technical debt and refactoring needs

**Development Efficiency:**
- Size stories appropriately for development capacity
- Minimize dependencies between stories where possible
- Provide complete context to eliminate research overhead

**Quality Assurance:**
- Plan testing strategy that spans story boundaries
- Define clear acceptance criteria for each story
- Establish quality gates for phases and overall delivery

Remember: Effective document sharding transforms large specifications into actionable development stories while maintaining business context and technical coherence. The investment in thorough sharding pays dividends in development speed and quality.
# Specification — Unnnic AI-Native Design System

## Problem Statement

When developers use AI-assisted coding with Unnnic Design System, LLMs frequently:

- Select incorrect components for a given use case
- Use wrong or non-existent design tokens
- Generate inconsistent code that doesn't follow DS patterns
- Hallucinate props, events, or slots that don't exist
- Duplicate existing component functionality

**Root cause:** LLMs lack structured, versioned access to Unnnic knowledge.

## Goals

1. **Version-pinned context** — AI uses knowledge matching the installed `@weni/unnnic-system` version
2. **Structured component API** — Props, events, slots with types and defaults
3. **Token mapping** — SCSS/CSS variable names linked to semantic purpose
4. **Pattern guidance** — Do/don't rules and accessibility guidelines
5. **Anti-hallucination** — Validation of props and tokens before code generation
6. **Zero infrastructure** — No new servers; distribute via npm packages

## User Stories

### US-01: Developer uses Cursor Skill for component guidance

**As a** developer using Cursor  
**I want** the AI to automatically know about Unnnic components  
**So that** I get accurate suggestions without manual context

**Acceptance Criteria:**
- [ ] Skill is auto-detected from `node_modules/@weni/unnnic-system/.cursor/skills/`
- [ ] Skill covers top 20 components with props and usage patterns
- [ ] Skill size is under 4K tokens
- [ ] Skill includes token naming conventions

### US-02: Developer implements Figma design with Code Connect

**As a** developer implementing a Figma design  
**I want** the Figma MCP to return real Unnnic component code  
**So that** I don't have to manually translate design to code

**Acceptance Criteria:**
- [ ] Top 18 components have Code Connect mappings
- [ ] Figma MCP `get_design_context` returns mapped code snippets
- [ ] Prop variants are correctly mapped from Figma properties
- [ ] Code snippets use correct import paths

### US-03: Developer searches for components via MCP

**As a** developer  
**I want** to search for components by functionality  
**So that** I can find the right component for my use case

**Acceptance Criteria:**
- [ ] `unnnic.search` returns relevant components for queries like "input", "modal", "button"
- [ ] Results include component name, summary, and props overview
- [ ] Results are ranked by relevance
- [ ] Search works offline (local MCP server)

### US-04: Developer validates code before commit

**As a** developer  
**I want** to validate that my code uses correct props and tokens  
**So that** I catch errors before they reach code review

**Acceptance Criteria:**
- [ ] `unnnic.validate_usage` checks props against component schema
- [ ] `unnnic.validate_usage` checks tokens against token catalog
- [ ] Deprecated props/tokens trigger warnings with replacements
- [ ] Unknown props/tokens trigger errors with suggestions

### US-05: CI validates AI-generated code

**As a** team lead  
**I want** CI to validate Unnnic usage in PRs  
**So that** AI-generated code meets our standards

**Acceptance Criteria:**
- [ ] Snapshot generation runs on every release
- [ ] Schema validation fails the build on errors
- [ ] Missing component docs fail the build
- [ ] MCP package version matches DS package version

## Priority Components for Code Connect

1. UnnnicButton
2. UnnnicInput + UnnnicFormElement
3. UnnnicSelect
4. UnnnicDialog
5. UnnnicCheckbox + UnnnicCheckboxGroup
6. UnnnicRadio + UnnnicRadioGroup
7. UnnnicIcon
8. UnnnicDrawer
9. UnnnicTextarea
10. UnnnicSkeletonLoading
11. UnnnicToast
12. UnnnicChip
13. UnnnicTabs
14. UnnnicPopover
15. UnnnicPageHeader
16. UnnnicDatePicker
17. UnnnicSwitch
18. UnnnicTag
19. UnnnicTooltip

## Token Categories

| Category | SCSS Pattern | Example |
|----------|--------------|---------|
| Background | `$unnnic-color-bg-{variant}` | `$unnnic-color-bg-accent-strong` |
| Foreground | `$unnnic-color-fg-{variant}` | `$unnnic-color-fg-emphasized` |
| Border | `$unnnic-color-border-{variant}` | `$unnnic-color-border-base` |
| Spacing | `$unnnic-space-{n}` | `$unnnic-space-4` |
| Typography | `@include unnnic-font-{style}` | `@include unnnic-font-body` |
| Radius | `$unnnic-radius-{n}` | `$unnnic-radius-2` |
| Shadow | `$unnnic-shadow-{n}` | `$unnnic-shadow-1` |

## Entity Types

| Type | ID Pattern | Source |
|------|------------|--------|
| Component | `component:{ExportName}` | TypeScript types |
| Token | `token:{path}` | Style Dictionary |
| Pattern | `pattern:{slug}` | Storybook MDX |
| Example | `example:{storyId}` | Storybook stories |

## Success Metrics

| Metric | Target |
|--------|--------|
| Components with ComponentDoc | 100% |
| Tokens with TokenDoc | 100% |
| Code Connect coverage | Top 18 components |
| Skill token size | ≤4K |
| MCP response latency | ≤500ms |
| Schema validation pass rate | 100% |

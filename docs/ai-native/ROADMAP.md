# Unnnic AI-Native — Implementation Roadmap

This roadmap operationalizes the [SPEC.md](./SPEC.md) into concrete implementation phases with deliverables and acceptance criteria.

## Summary

| Phase | Deliverable | Effort | Dependencies |
|-------|-------------|--------|--------------|
| 1 | Cursor Skill | 2-3 days | None |
| 2 | Code Connect (Top 10) | 3-5 days | Figma library |
| 3 | Snapshot Generator | 5-7 days | Phase 1 |
| 4 | MCP Server | 5-7 days | Phase 3 |
| 5 | CI/CD Integration | 2-3 days | Phase 3, 4 |
| 6 | Refinement | 3-5 days | All above |

**Total estimated effort:** 20-30 days

---

## Phase 1: Cursor Skill (2-3 days)

### Objective

Provide immediate value with minimal effort by shipping a structured Cursor skill in the npm package.

### Deliverables

- [ ] `.cursor/skills/unnnic/SKILL.md` — Cursor skill file
- [ ] Updated `package.json` with `.cursor` in `files` array
- [ ] Documentation in README about skill usage

### Tasks

1. **Create skill file structure**
   ```
   .cursor/
   └── skills/
       └── unnnic/
           └── SKILL.md
   ```

2. **Write skill content** (~2-3K tokens)
   - Version declaration
   - Top 20 components quick reference
   - Token categories and naming
   - Common patterns (forms, feedback)
   - MCP tool instructions (for future use)
   - Figma integration workflow

3. **Update package.json**
   ```json
   {
     "files": ["dist", "src", "public", ".cursor"]
   }
   ```

4. **Test skill loading**
   - Install package in test project
   - Verify Cursor detects skill from `node_modules`

### Acceptance Criteria

- [ ] Skill file is included in published npm package
- [ ] Cursor auto-loads skill when package is installed
- [ ] Skill size is under 4K tokens
- [ ] Skill covers top 20 components

---

## Phase 2: Code Connect (3-5 days)

### Objective

Enable precise design-to-code workflows by mapping Figma components to code implementations.

### Deliverables

- [ ] Code Connect mappings for 10 priority components
- [ ] Documentation for adding new mappings
- [ ] Integration with Figma library

### Priority Components

| # | Component | Figma Node | Complexity |
|---|-----------|------------|------------|
| 1 | UnnnicButton | TBD | Low |
| 2 | UnnnicInput | TBD | Medium |
| 3 | UnnnicFormElement | TBD | Low |
| 4 | UnnnicSelect | TBD | High |
| 5 | UnnnicModal | TBD | Medium |
| 6 | UnnnicTable | TBD | High |
| 7 | UnnnicIcon | TBD | Low |
| 8 | UnnnicDropdown | TBD | Medium |
| 9 | UnnnicCard | TBD | Low |
| 10 | UnnnicTabs | TBD | Medium |

### Tasks

1. **Setup Code Connect**
   ```bash
   npm install @figma/code-connect
   ```

2. **Get Figma node IDs**
   - Access Figma library file
   - Document node IDs for each component

3. **Create mapping files**
   ```
   src/components/Button/Button.figma.ts
   src/components/Input/Input.figma.ts
   ...
   ```

4. **Configure build**
   - Add Code Connect build to CI
   - Publish mappings to Figma

5. **Test integration**
   - Select component in Figma
   - Verify Figma MCP returns correct snippets

### Acceptance Criteria

- [ ] 10 components have Code Connect mappings
- [ ] Figma Dev Mode shows code snippets
- [ ] Figma MCP `get_design_context` returns mapped code
- [ ] Prop mappings cover common variants

---

## Phase 3: Snapshot Generator (5-7 days)

### Objective

Build the CLI tool that extracts DS knowledge into structured JSON entities.

### Deliverables

- [ ] `@weni/unnnic-ai-generator` package
- [ ] CLI with `build` and `validate` commands
- [ ] Entity extraction for tokens, components, patterns, examples
- [ ] Schema validation for all outputs

### Package Structure

```
packages/ai-generator/
├── package.json
├── src/
│   ├── cli.ts              # CLI entry point
│   ├── extractors/
│   │   ├── tokens.ts       # Style Dictionary extraction
│   │   ├── components.ts   # TypeScript API extraction
│   │   └── storybook.ts    # Storybook stories/docs
│   ├── builders/
│   │   ├── entity.ts       # Transform to entity docs
│   │   └── search.ts       # Build search index
│   ├── validators/
│   │   └── schema.ts       # JSON Schema validation
│   └── index.ts
└── tsconfig.json
```

### Tasks

1. **Setup package**
   - Create `packages/ai-generator/`
   - Configure TypeScript and build

2. **Implement token extractor**
   - Read `src/assets/tokens/*.json`
   - Flatten nested structure
   - Resolve aliases
   - Generate SCSS/CSS variable names

3. **Implement component extractor**
   - Parse `dist/index.d.ts`
   - Extract props, events, slots
   - Link to source files
   - Parse JSDoc for descriptions

4. **Implement Storybook extractor**
   - Parse `storybook-static/index.json`
   - Extract stories as ExampleDoc
   - Extract MDX as PatternDoc

5. **Build search index**
   - Create keyword index
   - Include titles, summaries, tags

6. **Add schema validation**
   - Validate all entities against schemas
   - Fail on validation errors

7. **Create CLI**
   ```bash
   unnnic-ai build --version X.Y.Z --out dist/
   unnnic-ai validate --dir dist/
   ```

### Acceptance Criteria

- [ ] CLI generates valid snapshot from current repo
- [ ] All entities pass schema validation
- [ ] Every exported component has ComponentDoc
- [ ] All Style Dictionary tokens have TokenDoc
- [ ] Search index includes all entities

---

## Phase 4: MCP Server (5-7 days)

### Objective

Implement the MCP server that provides queryable access to DS knowledge via stdio.

### Deliverables

- [ ] `@weni/unnnic-system-mcp` package
- [ ] MCP server with 4 tools
- [ ] Snapshot bundled in package
- [ ] npx-runnable CLI

### Package Structure

```
packages/mcp/
├── package.json
├── bin/
│   └── mcp-server.js
├── dist/
│   ├── manifest.json
│   ├── entities/
│   └── index/
└── src/
    ├── server.ts
    ├── tools/
    │   ├── search.ts
    │   ├── get-component.ts
    │   ├── get-token.ts
    │   └── validate-usage.ts
    └── loader.ts
```

### Tasks

1. **Setup MCP package**
   - Create `packages/mcp/`
   - Add `@modelcontextprotocol/sdk` dependency
   - Configure bin entry point

2. **Implement snapshot loader**
   - Load entities from bundled dist/
   - Cache in memory
   - Handle version resolution

3. **Implement tools**
   
   **unnnic.search**
   - Fuzzy search across entities
   - Filter by kind
   - Return ranked results

   **unnnic.get_component**
   - Fetch ComponentDoc by name
   - Normalize name variations
   - Suggest similar on not found

   **unnnic.get_token**
   - Fetch TokenDoc by name/path
   - Support SCSS and CSS var names

   **unnnic.validate_usage**
   - Validate props exist
   - Validate tokens exist
   - Check deprecations
   - Return suggestions

4. **Create server entry**
   - Setup stdio transport
   - Register tool handlers
   - Handle errors gracefully

5. **Test with Cursor**
   - Configure `.cursor/mcp.json`
   - Test all tools
   - Verify response format

### Acceptance Criteria

- [ ] Server starts via `npx @weni/unnnic-system-mcp`
- [ ] All 4 tools respond correctly
- [ ] Invalid queries return helpful errors
- [ ] Deprecated items return warnings
- [ ] Response includes version metadata

---

## Phase 5: CI/CD Integration (2-3 days)

### Objective

Automate snapshot generation and MCP package publishing on release.

### Deliverables

- [ ] GitHub Actions workflow for snapshot generation
- [ ] Automatic MCP package publishing
- [ ] PR validation workflow
- [ ] Quality gates

### Tasks

1. **Create release workflow**
   ```yaml
   # .github/workflows/ai-release.yml
   on:
     push:
       tags: ['v*']
   
   jobs:
     build-ai:
       steps:
         - Build library
         - Build Storybook
         - Generate snapshot
         - Validate schemas
         - Publish @weni/unnnic-system-mcp
   ```

2. **Create PR validation workflow**
   ```yaml
   # .github/workflows/ai-validate.yml
   on:
     pull_request:
   
   jobs:
     validate:
       steps:
         - Build
         - Dry-run snapshot
         - Check coverage thresholds
   ```

3. **Configure npm publishing**
   - Setup NPM_TOKEN secret
   - Configure package access
   - Ensure version sync with main package

4. **Add quality gates**
   - Minimum component coverage
   - Schema validation required
   - Storybook build required

### Acceptance Criteria

- [ ] Release tag triggers snapshot build
- [ ] MCP package publishes with same version
- [ ] PRs fail if snapshot generation fails
- [ ] Coverage thresholds enforced

---

## Phase 6: Refinement (3-5 days)

### Objective

Improve quality, add deprecation support, and expand coverage.

### Deliverables

- [ ] Deprecation extraction from JSDoc/CHANGELOG
- [ ] Expanded Code Connect coverage
- [ ] Improved search relevance
- [ ] Developer documentation

### Tasks

1. **Deprecation extraction**
   - Parse `@deprecated` JSDoc tags
   - Parse CHANGELOG for removals
   - Include in entity docs

2. **Expand Code Connect**
   - Add remaining high-use components
   - Improve prop mappings
   - Add variant coverage

3. **Search improvements**
   - Tune scoring algorithm
   - Add synonym support
   - Improve partial matching

4. **Documentation**
   - Add setup guide for consumers
   - Document MCP tool usage
   - Add troubleshooting guide

### Acceptance Criteria

- [ ] Deprecated props/tokens flagged in responses
- [ ] 20+ components have Code Connect
- [ ] Search returns relevant results for common queries
- [ ] Documentation enables self-service setup

---

## Milestones

### M1: MVP (Phases 1-2)

**Goal:** Immediate value with skill and Code Connect

- Cursor skill in npm package
- Top 10 Code Connect mappings
- Basic design-to-code workflow

### M2: Full MCP (Phases 3-4)

**Goal:** Structured access to all DS knowledge

- Complete snapshot generation
- Working MCP server
- Search and validation tools

### M3: Production (Phases 5-6)

**Goal:** Automated, high-quality system

- CI/CD automation
- Deprecation support
- Full Code Connect coverage

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| TypeScript parsing complexity | Medium | Medium | Start with simple cases, iterate |
| Figma node ID changes | Low | High | Document in mapping files |
| MCP SDK breaking changes | Low | Medium | Pin SDK version |
| Skill detection issues | Low | Low | Test in multiple projects |

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Components with docs | 100% | ComponentDoc count / exports |
| Tokens with docs | 100% | TokenDoc count / Style Dictionary tokens |
| Code Connect coverage | Top 20 | Figma mappings / priority list |
| Skill token size | <4K | Token counter |
| MCP response time | <500ms | Tool call latency |

# Tasks — Unnnic AI-Native Design System

> **Version:** 0.1.0  
> **Last updated:** 2026-08-12

## Phase 1: Cursor Skill (2-3 days)

### TASK-1.1: Create skill directory structure
- **Status:** Done
- **Files:**
  - `.cursor/skills/unnnic/SKILL.md`
- **Acceptance:** Directory exists with SKILL.md file

### TASK-1.2: Write skill content
- **Status:** Done
- **Files:**
  - `.cursor/skills/unnnic/SKILL.md`
- **Acceptance:**
  - [ ] Covers top 20 components with props
  - [ ] Includes token naming conventions
  - [ ] Includes common patterns
  - [ ] Size under 4K tokens

### TASK-1.3: Update package.json files array
- **Status:** Done
- **Files:**
  - `package.json`
- **Acceptance:** `.cursor` included in `files` array

### TASK-1.4: Test skill auto-detection
- **Status:** Pending
- **Steps:**
  1. Publish package to npm (or use `npm link`)
  2. Install in test project
  3. Verify Cursor detects skill from `node_modules`
- **Acceptance:** Skill appears in Cursor skill list

---

## Phase 2: Code Connect (3-5 days)

### TASK-2.1: Install Code Connect dependency
- **Status:** Pending
- **Command:** `npm install -D @figma/code-connect`
- **Acceptance:** Package added to devDependencies

### TASK-2.2: Get Figma node IDs for priority components
- **Status:** Pending
- **Components:**
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
- **Acceptance:** Node IDs documented for each component

### TASK-2.3: Create Code Connect mappings
- **Status:** Pending
- **Files to create:**
  - `src/components/Button/Button.figma.ts`
  - `src/components/Input/Input.figma.ts`
  - `src/components/FormElement/FormElement.figma.ts`
  - `src/components/Select/Select.figma.ts`
  - `src/components/ui/dialog/Dialog.figma.ts`
  - `src/components/Checkbox/Checkbox.figma.ts`
  - `src/components/CheckboxGroup/CheckboxGroup.figma.ts`
  - `src/components/Radio/Radio.figma.ts`
  - `src/components/RadioGroup/RadioGroup.figma.ts`
  - `src/components/Icon.figma.ts`
  - `src/components/ui/drawer/Drawer.figma.ts`
  - `src/components/TextArea/TextArea.figma.ts`
  - `src/components/SkeletonLoading/SkeletonLoading.figma.ts`
  - `src/components/Toast/Toast.figma.ts`
  - `src/components/Chip/Chip.figma.ts`
  - `src/components/ui/tabs/Tabs.figma.ts`
  - `src/components/ui/popover/Popover.figma.ts`
  - `src/components/PageHeader/PageHeader.figma.ts`
  - `src/components/DatePicker/DatePicker.figma.ts`
  - `src/components/Switch/Switch.figma.ts`
  - `src/components/Tag/Tag.figma.ts`
  - `src/components/ToolTip/ToolTip.figma.ts`
- **Acceptance:** Each file maps Figma props to component props

### TASK-2.4: Configure Code Connect build
- **Status:** Pending
- **Files:**
  - `figma.config.json` or equivalent
  - Update `package.json` scripts
- **Acceptance:** `npm run code-connect:publish` works

### TASK-2.5: Test Figma MCP integration
- **Status:** Pending
- **Steps:**
  1. Publish Code Connect to Figma
  2. Select component in Figma Dev Mode
  3. Use Figma MCP `get_design_context`
  4. Verify returned code snippet
- **Acceptance:** Correct Unnnic code returned for mapped components

---

## Phase 3: Snapshot Generator (5-7 days)

### TASK-3.1: Create generator package structure
- **Status:** Pending
- **Directory:** `packages/ai-generator/` or `tools/ai-generator/`
- **Files:**
  - `package.json`
  - `tsconfig.json`
  - `src/cli.ts`
  - `src/index.ts`
- **Acceptance:** Package builds successfully

### TASK-3.2: Implement token extractor
- **Status:** Pending
- **File:** `src/extractors/tokens.ts`
- **Input:** `src/assets/tokens/*.json`
- **Output:** `TokenDoc[]`
- **Acceptance:**
  - [ ] Reads all token JSON files
  - [ ] Flattens nested structure
  - [ ] Resolves aliases
  - [ ] Generates SCSS/CSS variable names
  - [ ] Passes schema validation

### TASK-3.3: Implement component extractor
- **Status:** Pending
- **File:** `src/extractors/components.ts`
- **Input:** `dist/index.d.ts`
- **Output:** `ComponentDoc[]`
- **Acceptance:**
  - [ ] Parses TypeScript declarations
  - [ ] Extracts props, events, slots
  - [ ] Links to source files
  - [ ] Parses JSDoc for descriptions
  - [ ] Passes schema validation

### TASK-3.4: Implement Storybook extractor
- **Status:** Pending
- **File:** `src/extractors/storybook.ts`
- **Input:** `storybook-static/index.json`, `src/stories/*.mdx`
- **Output:** `PatternDoc[]`, `ExampleDoc[]`
- **Acceptance:**
  - [ ] Parses Storybook index
  - [ ] Creates ExampleDoc per story
  - [ ] Creates PatternDoc per MDX
  - [ ] Passes schema validation

### TASK-3.5: Implement search index builder
- **Status:** Pending
- **File:** `src/builders/search.ts`
- **Input:** All entity docs
- **Output:** `index/search.json`
- **Acceptance:**
  - [ ] Indexes titles, summaries, keywords
  - [ ] Supports kind filtering
  - [ ] Returns ranked results

### TASK-3.6: Implement schema validator
- **Status:** Pending
- **File:** `src/validators/schema.ts`
- **Acceptance:**
  - [ ] Validates against JSON schemas
  - [ ] Reports actionable errors
  - [ ] Fails fast on first error (configurable)

### TASK-3.7: Create CLI
- **Status:** Pending
- **File:** `src/cli.ts`
- **Commands:**
  - `unnnic-ai build --version X.Y.Z --out dist/`
  - `unnnic-ai validate --dir dist/`
  - `unnnic-ai build --dry-run`
- **Acceptance:** All commands work correctly

---

## Phase 4: MCP Server (5-7 days)

### TASK-4.1: Create MCP package structure
- **Status:** Pending
- **Directory:** `packages/mcp/`
- **Files:**
  - `package.json` (with `bin` entry)
  - `bin/mcp-server.js`
  - `src/server.ts`
- **Acceptance:** Package structure matches plan

### TASK-4.2: Implement snapshot loader
- **Status:** Pending
- **File:** `src/loader.ts`
- **Acceptance:**
  - [ ] Loads entities from bundled dist/
  - [ ] Caches in memory
  - [ ] Handles missing files gracefully

### TASK-4.3: Implement unnnic.search tool
- **Status:** Pending
- **File:** `src/tools/search.ts`
- **Acceptance:**
  - [ ] Fuzzy search across entities
  - [ ] Filters by kind
  - [ ] Returns ranked results
  - [ ] Includes version in response

### TASK-4.4: Implement unnnic.get_component tool
- **Status:** Pending
- **File:** `src/tools/get-component.ts`
- **Acceptance:**
  - [ ] Fetches ComponentDoc by name
  - [ ] Normalizes name variations
  - [ ] Suggests similar on not found
  - [ ] Includes version in response

### TASK-4.5: Implement unnnic.get_token tool
- **Status:** Pending
- **File:** `src/tools/get-token.ts`
- **Acceptance:**
  - [ ] Fetches TokenDoc by name/path
  - [ ] Supports SCSS and CSS var names
  - [ ] Includes version in response

### TASK-4.6: Implement unnnic.validate_usage tool
- **Status:** Pending
- **File:** `src/tools/validate-usage.ts`
- **Acceptance:**
  - [ ] Validates props exist on component
  - [ ] Validates tokens exist in catalog
  - [ ] Returns deprecation warnings
  - [ ] Suggests alternatives for unknowns

### TASK-4.7: Create MCP server entry point
- **Status:** Pending
- **Files:**
  - `src/server.ts`
  - `bin/mcp-server.js`
- **Acceptance:**
  - [ ] Starts via `npx @weni/unnnic-system-mcp`
  - [ ] Uses stdio transport
  - [ ] Registers all tools
  - [ ] Handles errors gracefully

### TASK-4.8: Test with Cursor
- **Status:** Pending
- **Steps:**
  1. Configure `.cursor/mcp.json` in test project
  2. Test each tool via Cursor
  3. Verify response format
- **Acceptance:** All tools respond correctly in Cursor

---

## Phase 5: CI/CD Integration (2-3 days)

### TASK-5.1: Create release workflow
- **Status:** Pending
- **File:** `.github/workflows/ai-release.yml`
- **Triggers:** Push to `v*` tags
- **Steps:**
  1. Build library
  2. Build Storybook
  3. Generate snapshot
  4. Validate schemas
  5. Publish MCP package
- **Acceptance:** Workflow runs successfully on tag push

### TASK-5.2: Create PR validation workflow
- **Status:** Pending
- **File:** `.github/workflows/ai-validate.yml`
- **Triggers:** Pull requests
- **Steps:**
  1. Build
  2. Dry-run snapshot
  3. Check coverage thresholds
- **Acceptance:** PRs fail if snapshot generation fails

### TASK-5.3: Configure npm publishing
- **Status:** Pending
- **Steps:**
  1. Setup NPM_TOKEN secret
  2. Configure package access
  3. Ensure version sync
- **Acceptance:** MCP package publishes with same version as DS

---

## Phase 6: Refinement (3-5 days)

### TASK-6.1: Extract deprecations
- **Status:** Pending
- **Sources:**
  - JSDoc `@deprecated` tags
  - CHANGELOG.md
- **Acceptance:** Deprecated props/tokens flagged in responses

### TASK-6.2: Improve search relevance
- **Status:** Pending
- **Improvements:**
  - Tune scoring algorithm
  - Add synonym support
  - Better partial matching
- **Acceptance:** Common queries return relevant results

### TASK-6.3: Update SKILL.md with all priority components
- **Status:** Pending
- **Acceptance:** Skill covers all 18+ priority components

### TASK-6.4: Write developer documentation
- **Status:** Pending
- **Files:**
  - `docs/ai-native/GETTING-STARTED.md`
  - `docs/ai-native/TROUBLESHOOTING.md`
- **Acceptance:** Self-service setup guide for consumers

---

## Summary

| Phase | Tasks | Status |
|-------|-------|--------|
| 1. Cursor Skill | 4 | 3 Done, 1 Pending |
| 2. Code Connect | 5 | 0 Done, 5 Pending |
| 3. Snapshot Generator | 7 | 0 Done, 7 Pending |
| 4. MCP Server | 8 | 0 Done, 8 Pending |
| 5. CI/CD | 3 | 0 Done, 3 Pending |
| 6. Refinement | 4 | 0 Done, 4 Pending |
| **Total** | **31** | **3 Done, 28 Pending** |

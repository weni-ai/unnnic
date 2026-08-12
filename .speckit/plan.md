# Technical Plan — Unnnic AI-Native Design System

> **Version:** 0.1.0  
> **Status:** Validated against spec.md and constitution.md  
> **Last updated:** 2026-08-12  
> **Covers:** US-01, US-02, US-03, US-04, US-05

## User Story Coverage

| User Story | Solution | Phase |
|------------|----------|-------|
| US-01: Cursor Skill | `.cursor/skills/unnnic/SKILL.md` in npm package | 1 |
| US-02: Code Connect | `.figma.ts` files for 19 priority components | 2 |
| US-03: MCP Search | `unnnic.search` + `unnnic.get_component` tools | 3-4 |
| US-04: Validation | `unnnic.validate_usage` tool | 4 |
| US-05: CI Validation | GitHub Actions workflows | 5 |

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        SOURCE OF TRUTH                          │
├─────────────────────────────────────────────────────────────────┤
│  Design Tokens        │  Component Types    │  Storybook Docs   │
│  src/assets/tokens/   │  dist/index.d.ts    │  src/stories/     │
│  (Style Dictionary)   │  (TypeScript)       │  (MDX + Stories)  │
└──────────┬────────────┴─────────┬───────────┴─────────┬─────────┘
           │                      │                     │
           └──────────────────────┼─────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SNAPSHOT GENERATOR                          │
│                  (runs on npm release only)                     │
├─────────────────────────────────────────────────────────────────┤
│  CLI: unnnic-ai build --version X.Y.Z --out dist/               │
│                                                                 │
│  Outputs:                                                       │
│  - manifest.json (version metadata)                             │
│  - entities/component/*.json (ComponentDoc)                     │
│  - entities/token/*.json (TokenDoc)                             │
│  - entities/pattern/*.json (PatternDoc)                         │
│  - entities/example/*.json (ExampleDoc)                         │
│  - index/search.json (search index)                             │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DISTRIBUTION (npm)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  @weni/unnnic-system                @weni/unnnic-system-mcp     │
│  (main DS package)                  (AI knowledge package)      │
│  ├── dist/                          ├── dist/                   │
│  ├── src/                           │   ├── manifest.json       │
│  └── .cursor/                       │   ├── entities/           │
│      └── skills/                    │   └── index/              │
│          └── unnnic/                └── bin/                    │
│              └── SKILL.md               └── mcp-server.js       │
│                                                                 │
│  Same semver: v3.32.0 ←────────────→ v3.32.0                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| Generator CLI | TypeScript + Node.js 20 | Same stack as DS, type safety |
| MCP Server | `@modelcontextprotocol/sdk` | Official SDK, stdio transport |
| Schema Validation | `ajv` | Fast JSON Schema validation |
| TypeScript Parsing | TypeScript Compiler API | Accurate type extraction |
| Build | Vite | Already used by DS |
| Testing | Vitest | Already used by DS |

## Package Structure

### Main Package: `@weni/unnnic-system`

```
@weni/unnnic-system/
├── dist/
│   ├── unnnic.mjs
│   ├── unnnic.umd.js
│   ├── style.css
│   └── index.d.ts          ← Source for component extraction
├── src/
│   ├── components/
│   │   └── Button/
│   │       ├── Button.vue
│   │       ├── types.ts
│   │       └── Button.figma.ts  ← Code Connect mapping
│   └── assets/
│       └── tokens/         ← Source for token extraction
└── .cursor/
    └── skills/
        └── unnnic/
            └── SKILL.md    ← Distributed via npm
```

### MCP Package: `@weni/unnnic-system-mcp`

```
@weni/unnnic-system-mcp/
├── package.json
├── bin/
│   └── mcp-server.js       # CLI entry (#!/usr/bin/env node)
├── dist/
│   ├── manifest.json       # Snapshot metadata
│   ├── entities/
│   │   ├── component/      # ComponentDoc JSON files
│   │   ├── token/          # TokenDoc JSON files
│   │   ├── pattern/        # PatternDoc JSON files
│   │   └── example/        # ExampleDoc JSON files
│   └── index/
│       └── search.json     # Pre-built search index
└── src/
    ├── server.ts           # MCP server implementation
    ├── tools/
    │   ├── search.ts
    │   ├── get-component.ts
    │   ├── get-token.ts
    │   └── validate-usage.ts
    └── loader.ts           # Snapshot loader with caching
```

## MCP Tools API

### `unnnic.search`

```typescript
// Input
{
  query: string;
  kinds?: ('component' | 'token' | 'pattern' | 'example')[];
  limit?: number;  // default: 10
}

// Output
{
  version: string;
  results: Array<{
    kind: string;
    id: string;
    title: string;
    summary: string;
    score: number;
  }>;
}
```

### `unnnic.get_component`

```typescript
// Input
{ name: string; }  // e.g., "UnnnicButton" or "Button"

// Output
{
  version: string;
  component: ComponentDoc;
}
```

### `unnnic.get_token`

```typescript
// Input
{ name: string; }  // e.g., "color.bg.accent-strong" or "$unnnic-color-bg-accent-strong"

// Output
{
  version: string;
  token: TokenDoc;
}
```

### `unnnic.validate_usage`

```typescript
// Input
{
  component: string;
  props?: string[];
  tokens?: string[];
}

// Output
{
  valid: boolean;
  errors: Array<{
    type: 'unknown_prop' | 'unknown_token' | 'deprecated' | 'removed';
    name: string;
    message: string;
    suggestion?: string;
  }>;
  warnings: Array<{
    type: 'deprecated';
    name: string;
    message: string;
    replacement?: string;
  }>;
}
```

## Entity Schemas

All entities follow JSON Schema definitions in `.speckit/schemas/`:

- `manifest.schema.json` — Snapshot metadata
- `component.schema.json` — ComponentDoc with props, events, slots
- `token.schema.json` — TokenDoc with formats and usage rules
- `pattern.schema.json` — PatternDoc with do/don't guidelines
- `example.schema.json` — ExampleDoc with code snippets

## Code Connect Format

```typescript
// Button.figma.ts
import figma from '@figma/code-connect';
import { UnnnicButton } from '@weni/unnnic-system';

figma.connect(UnnnicButton, 'https://figma.com/design/.../node-id=...', {
  props: {
    type: figma.enum('Type', {
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
      Warning: 'warning',
      Attention: 'attention',
    }),
    size: figma.enum('Size', {
      Large: 'large',
      Small: 'small',
    }),
    disabled: figma.boolean('Disabled'),
    loading: figma.boolean('Loading'),
  },
  example: (props) => (
    <UnnnicButton
      type={props.type}
      size={props.size}
      disabled={props.disabled}
      loading={props.loading}
    >
      Button Label
    </UnnnicButton>
  ),
});
```

## CI/CD Integration

### Release Workflow

```yaml
# .github/workflows/ai-release.yml
on:
  push:
    tags: ['v*']

jobs:
  build-ai:
    steps:
      - Build library (npm run build)
      - Build Storybook (npm run build-storybook)
      - Generate snapshot (unnnic-ai build)
      - Validate schemas
      - Publish @weni/unnnic-system-mcp
```

### PR Validation

```yaml
# .github/workflows/ai-validate.yml
on:
  pull_request:

jobs:
  validate:
    steps:
      - Build
      - Dry-run snapshot (unnnic-ai build --dry-run)
      - Check coverage thresholds
```

## Token Cost Analysis

| Component | Tokens Added | When Loaded |
|-----------|--------------|-------------|
| Cursor Skill | ~2-3K | Session start |
| Code Connect (per component) | ~1-2K | Via Figma MCP |
| MCP search | ~500-1K | On-demand |
| MCP get_component | ~1-2K | On-demand |
| MCP validate_usage | ~500 | Before commit |

**Estimated increase per session:** +15-25% tokens

## Security Considerations

1. **No secrets in snapshots** — Only public API surface
2. **Read-only operations** — MCP server only reads, never writes
3. **Local execution** — stdio transport, no network exposure
4. **Version pinning** — Prevents supply chain attacks

---

## Implementation Phases

### Phase 1: Cursor Skill (2-3 days) — US-01

**Goal:** Immediate value with zero infrastructure

**Deliverables:**
- `.cursor/skills/unnnic/SKILL.md` — Component/token quick reference
- Updated `package.json` with `.cursor` in files array

**Validation:**
- Skill auto-detected from `node_modules`
- Token count ≤4K

**Status:** ✅ Done

---

### Phase 2: Code Connect (3-5 days) — US-02

**Goal:** Precise Figma-to-code mapping

**Deliverables:**
- `@figma/code-connect` integration
- `.figma.ts` files for 19 priority components

**Priority Components:**
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

**Validation:**
- Figma Dev Mode shows code snippets
- `get_design_context` returns Unnnic code

**Status:** 🔲 Pending

---

### Phase 3: Snapshot Generator (5-7 days) — US-03, US-05

**Goal:** Extract DS knowledge into structured JSON

**Deliverables:**
- `packages/ai-generator/` — CLI package
- Token extractor (Style Dictionary → TokenDoc)
- Component extractor (TypeScript → ComponentDoc)
- Storybook extractor (MDX/stories → PatternDoc/ExampleDoc)
- Search index builder
- Schema validator

**CLI:**
```bash
unnnic-ai build --version X.Y.Z --out dist/
unnnic-ai validate --dir dist/
```

**Validation:**
- All entities pass JSON Schema validation
- 100% component coverage
- 100% token coverage

**Status:** 🔲 Pending

---

### Phase 4: MCP Server (5-7 days) — US-03, US-04

**Goal:** Queryable access to DS knowledge

**Deliverables:**
- `@weni/unnnic-system-mcp` — npm package
- MCP server with stdio transport
- Tools: `search`, `get_component`, `get_token`, `validate_usage`

**Configuration:**
```json
// .cursor/mcp.json
{
  "mcpServers": {
    "unnnic": {
      "command": "npx",
      "args": ["@weni/unnnic-system-mcp"]
    }
  }
}
```

**Validation:**
- All tools respond in ≤500ms
- Response tokens ≤2K per entity
- Works offline

**Status:** 🔲 Pending

---

### Phase 5: CI/CD Integration (2-3 days) — US-05

**Goal:** Automated snapshot generation on release

**Deliverables:**
- `.github/workflows/ai-release.yml` — Release workflow
- `.github/workflows/ai-validate.yml` — PR validation

**Validation:**
- MCP package version = DS package version
- PRs fail on snapshot errors

**Status:** 🔲 Pending

---

### Phase 6: Refinement (3-5 days)

**Goal:** Polish and documentation

**Deliverables:**
- Deprecation extraction from JSDoc/CHANGELOG
- Search relevance tuning
- Developer documentation

**Status:** 🔲 Pending

---

## Dependencies Graph

```
Phase 1 (Skill) ─────────────────────────────────────┐
                                                     │
Phase 2 (Code Connect) ──────────────────────────────┤
                                                     │
Phase 3 (Generator) ─────┬───────────────────────────┤
                         │                           │
                         ▼                           │
Phase 4 (MCP Server) ────┼───────────────────────────┤
                         │                           │
                         ▼                           ▼
Phase 5 (CI/CD) ─────────┴───────────────────► Release
                                                     │
Phase 6 (Refinement) ────────────────────────────────┘
```

**Critical Path:** Phase 3 → Phase 4 → Phase 5

**Parallel Work:** Phases 1, 2 can run independently

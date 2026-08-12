# Unnnic AI-Native Design System — Specification

This document specifies the architecture for making Unnnic Design System AI-native, enabling LLMs (particularly Cursor) to accurately understand and use components, tokens, and patterns during development.

## Problem Statement

When developers use AI-assisted coding with Unnnic, LLMs frequently:

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

## Non-Goals

- Runtime code execution or screenshot-based understanding
- Private Figma file ingestion (public references only)
- Real-time sync with design tools (snapshot-based instead)

---

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
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CONSUMER PROJECT                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  .cursor/mcp.json:                                              │
│  {                                                              │
│    "mcpServers": {                                              │
│      "unnnic": {                                                │
│        "command": "npx",                                        │
│        "args": ["@weni/unnnic-system-mcp"]                      │
│      }                                                          │
│    }                                                            │
│  }                                                              │
│                                                                 │
│  Cursor auto-detects:                                           │
│  - Skill from node_modules/@weni/unnnic-system/.cursor/skills/  │
│  - MCP server via npx (stdio transport)                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Cursor Skill

### Purpose

Provide structured context to LLMs at the start of development sessions, without requiring MCP server calls for basic guidance.

### Location

```
@weni/unnnic-system/
└── .cursor/
    └── skills/
        └── unnnic/
            └── SKILL.md
```

Cursor automatically detects skills in `node_modules/*/.cursor/skills/`.

### Content Structure

The skill should be ~2-3K tokens and include:

1. **Version declaration** — Current package version
2. **Component quick reference** — Top 20 components with one-line descriptions
3. **Token categories** — Colors, spacing, typography, shadows, radii
4. **Naming conventions** — SCSS variables, CSS custom properties
5. **Common patterns** — Forms, feedback, navigation
6. **MCP instructions** — How to use MCP tools when available
7. **Figma integration** — How to work with Figma MCP

### Distribution

Included in `@weni/unnnic-system` package via `files` array in `package.json`:

```json
{
  "files": ["dist", "src", "public", ".cursor"]
}
```

---

## Code Connect

### Purpose

Bridge Figma components to code implementations, enabling precise design-to-code workflows via Figma MCP.

### Location

```
@weni/unnnic-system/
└── src/
    └── components/
        └── Button/
            ├── Button.vue
            ├── types.ts
            └── Button.figma.ts  ← Code Connect mapping
```

### Priority Components (Phase 1)

1. UnnnicButton
2. UnnnicInput + UnnnicFormElement
3. UnnnicSelect
4. UnnnicDialog
5. UnnnicCheckbox + UnnnicCheckboxGroup
5. UnnnicRadio + UnnnicRadioGroup
6. UnnnicIcon
7. UnnnicDrawer
8. UnnnicTextarea
9. UnnnicSkeletonLoading
10. UnnnicToast
11. UnnnicChip
12. UnnnicTabs
13. UnnnicPopover
14. UnnnicPageHeader
15. UnnnicDatePicker
16. UnnnicSwitch
17. UnnnicTag
18. UnnnicTooltip

### Mapping Format

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

---

## MCP Server

### Purpose

Provide structured, queryable access to Unnnic knowledge with version pinning and validation.

### Transport

**stdio** — Server runs locally via `npx`, zero infrastructure required.

### Package

```
@weni/unnnic-system-mcp/
├── package.json
├── bin/
│   └── mcp-server.js      # Entry point
├── dist/
│   ├── manifest.json      # Snapshot metadata
│   ├── entities/
│   │   ├── component/     # ComponentDoc JSON files
│   │   ├── token/         # TokenDoc JSON files
│   │   ├── pattern/       # PatternDoc JSON files
│   │   └── example/       # ExampleDoc JSON files
│   └── index/
│       └── search.json    # Pre-built search index
└── src/
    └── server.ts          # MCP server implementation
```

### Tools

#### `unnnic.search`

Search across all entity types.

**Input:**
```typescript
{
  query: string;           // Search term
  kinds?: EntityKind[];    // Filter: 'component' | 'token' | 'pattern' | 'example'
  limit?: number;          // Max results (default: 10)
}
```

**Output:**
```typescript
{
  version: string;         // Package version served
  results: Array<{
    kind: EntityKind;
    id: string;
    title: string;
    summary: string;
    score: number;
  }>;
}
```

#### `unnnic.get_component`

Fetch full component documentation.

**Input:**
```typescript
{
  name: string;  // e.g., "UnnnicButton" or "Button"
}
```

**Output:**
```typescript
{
  version: string;
  component: ComponentDoc;
}
```

#### `unnnic.get_token`

Fetch token documentation.

**Input:**
```typescript
{
  name: string;  // e.g., "color.bg.accent-strong" or "$unnnic-color-bg-accent-strong"
}
```

**Output:**
```typescript
{
  version: string;
  token: TokenDoc;
}
```

#### `unnnic.validate_usage`

Validate component props and tokens against the schema.

**Input:**
```typescript
{
  component: string;       // Component name
  props?: string[];        // Props being used
  tokens?: string[];       // Tokens being used
}
```

**Output:**
```typescript
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

### Configuration

Consumer projects configure via `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "unnnic": {
      "command": "npx",
      "args": ["@weni/unnnic-system-mcp"]
    }
  }
}
```

---

## Entity Schemas

All entities follow JSON Schema definitions in `docs/ai-native/schemas/`.

### Entity ID Format

| Kind | Pattern | Example |
|------|---------|---------|
| Component | `component:{ExportName}` | `component:UnnnicButton` |
| Token | `token:{path}` | `token:color.bg.accent-strong` |
| Pattern | `pattern:{slug}` | `pattern:forms.validation` |
| Example | `example:{storyId}` | `example:form-button--primary` |

### Source References

Every entity MUST include at least one source reference:

```typescript
interface SourceRef {
  type: 'repo_file' | 'storybook_story' | 'storybook_docs' | 'figma';
  path?: string;        // File path for repo_file
  ref?: string;         // Git ref (tag/sha)
  storyId?: string;     // For storybook types
  url?: string;         // For figma type
}
```

---

## Snapshot Generator

### CLI

```bash
unnnic-ai build \
  --version 3.32.0 \
  --git-sha abc123 \
  --out dist/
```

### Extraction Rules

#### Tokens

1. Read `src/assets/tokens/*.json` (Style Dictionary format)
2. Flatten nested structure into `TokenDoc` entities
3. Include SCSS variable name: `$unnnic-{path}`
4. Include CSS variable name: `--unnnic-{path}`
5. Resolve aliases to final values

#### Components

1. Parse `dist/index.d.ts` for exported components
2. Extract props interface from TypeScript types
3. Match with Storybook stories by naming convention
4. Extract JSDoc comments for descriptions

#### Patterns

1. Parse Storybook MDX files (`src/stories/*.mdx`)
2. Extract title, description, do/don't lists
3. Link to related components and tokens

#### Examples

1. Parse `storybook-static/index.json` after build
2. Create `ExampleDoc` for each story
3. Include story args and source code when available

### Validation

All output entities MUST validate against schemas in `docs/ai-native/schemas/`.

CI pipeline fails if:
- Any entity fails schema validation
- Exported component has no corresponding `ComponentDoc`
- Token from Style Dictionary has no corresponding `TokenDoc`

---

## Version Resolution

### Strict Mode (default)

MCP server reads installed `@weni/unnnic-system` version from consumer's `package.json` and serves matching snapshot.

### Version Mismatch Handling

If consumer has `@weni/unnnic-system@3.32.0` but MCP package is `@weni/unnnic-system-mcp@3.31.0`:

1. Log warning
2. Serve closest available version
3. Include version in response for transparency

### Snapshot Immutability

Each published snapshot is immutable and tied to:
- `packageVersion` (semver)
- `gitSha` (commit hash)
- `publishedAt` (ISO timestamp)

---

## Token Cost Analysis

| Component | Tokens Added | When Loaded |
|-----------|--------------|-------------|
| Cursor Skill | ~2-3K | Session start |
| Code Connect (per component) | ~1-2K | Via Figma MCP |
| MCP search | ~500-1K | On-demand |
| MCP get_component | ~1-2K | On-demand |
| MCP validate_usage | ~500 | Before commit |

**Estimated increase per session:** +15-25% tokens

---

## Security Considerations

1. **No secrets in snapshots** — Only public API surface
2. **Read-only operations** — MCP server only reads, never writes
3. **Local execution** — stdio transport, no network exposure
4. **Version pinning** — Prevents supply chain attacks via mismatched versions

---

## Implementation

See [`.speckit/`](../../.speckit/) for the specification-driven development artifacts:

- **constitution.md** — Project principles and constraints
- **spec.md** — Requirements and user stories
- **plan.md** — Technical architecture
- **tasks.md** — Implementation task breakdown

Run `/speckit.plan` to generate or update the technical plan, then `/speckit.tasks` to break it into actionable items.

---

## References

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Figma Code Connect](https://www.figma.com/developers/code-connect)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Cursor Skills Documentation](https://docs.cursor.com/context/skills)

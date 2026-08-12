# Unnnic AI-Native — Technical Architecture

This document details the technical implementation of the AI-native architecture for Unnnic Design System.

## Package Structure

### Main Package: `@weni/unnnic-system`

```
@weni/unnnic-system/
├── dist/
│   ├── unnnic.mjs           # ESM bundle
│   ├── unnnic.umd.js        # UMD bundle
│   ├── style.css            # Compiled styles
│   ├── index.d.ts           # TypeScript declarations
│   └── tokens/              # JS token exports
├── src/
│   ├── components/          # Vue components
│   ├── assets/
│   │   ├── tokens/          # Style Dictionary JSON
│   │   └── scss/            # Generated + manual SCSS
│   └── stories/             # Storybook stories + MDX
├── .cursor/
│   └── skills/
│       └── unnnic/
│           └── SKILL.md     # Cursor skill (distributed)
└── package.json
```

### MCP Package: `@weni/unnnic-system-mcp`

```
@weni/unnnic-system-mcp/
├── bin/
│   └── mcp-server.js        # CLI entry point
├── dist/
│   ├── manifest.json        # Snapshot metadata
│   ├── entities/
│   │   ├── component/       # ComponentDoc files
│   │   ├── token/           # TokenDoc files
│   │   ├── pattern/         # PatternDoc files
│   │   └── example/         # ExampleDoc files
│   └── index/
│       └── search.json      # Pre-built search index
├── src/
│   ├── server.ts            # MCP server implementation
│   ├── tools/               # Tool handlers
│   ├── loader.ts            # Snapshot loader
│   └── search.ts            # Search implementation
└── package.json
```

---

## Snapshot Generator

### Module: `@weni/unnnic-ai-generator`

Located in `packages/ai-generator/` (monorepo) or `tools/ai-generator/` (single repo).

### CLI Interface

```bash
# Build snapshot from current repo state
unnnic-ai build \
  --version 3.32.0 \
  --git-sha $(git rev-parse HEAD) \
  --out dist/

# Validate existing snapshot
unnnic-ai validate --dir dist/

# Dry run (no output, validation only)
unnnic-ai build --dry-run
```

### Core Modules

#### Token Extractor

```typescript
// src/extractors/tokens.ts

interface TokenExtractorConfig {
  tokensDir: string;          // src/assets/tokens/
  prefix: string;             // 'unnnic'
}

interface ExtractedToken {
  path: string[];             // ['color', 'bg', 'accent-strong']
  value: string | number;     // '#0C8076'
  rawValue: unknown;          // { value: '{color.teal.8}' }
  aliasOf?: string;           // 'color.teal.8'
  category: string;           // 'color'
}

async function extractTokens(config: TokenExtractorConfig): Promise<ExtractedToken[]>;
```

**Algorithm:**
1. Read all `*.json` files from `tokensDir`
2. Recursively flatten nested token objects
3. Resolve aliases (values starting with `{`)
4. Categorize by top-level path segment

#### Component Extractor

```typescript
// src/extractors/components.ts

interface ComponentExtractorConfig {
  dtsPath: string;            // dist/index.d.ts
  componentsDir: string;      // src/components/
}

interface ExtractedComponent {
  exportName: string;         // 'UnnnicButton'
  filePath: string;           // 'src/components/Button/Button.vue'
  props: PropDef[];
  events: EventDef[];
  slots: SlotDef[];
}

interface PropDef {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: string;
  deprecated?: boolean;
}

async function extractComponents(config: ComponentExtractorConfig): Promise<ExtractedComponent[]>;
```

**Algorithm:**
1. Parse `dist/index.d.ts` using TypeScript compiler API
2. Find all exported component declarations
3. Extract props interface for each component
4. Match with source `.vue` files for additional metadata
5. Parse JSDoc comments for descriptions and deprecations

#### Storybook Extractor

```typescript
// src/extractors/storybook.ts

interface StorybookExtractorConfig {
  storiesDir: string;         // src/stories/
  indexPath: string;          // storybook-static/index.json
}

interface ExtractedStory {
  id: string;                 // 'form-button--primary'
  title: string;              // 'Form/Button'
  name: string;               // 'Primary'
  importPath: string;         // './src/stories/Button.stories.js'
  tags: string[];             // ['autodocs']
}

interface ExtractedDocs {
  id: string;                 // 'form-button--docs'
  title: string;
  content: string;            // MDX content
}

async function extractStorybook(config: StorybookExtractorConfig): Promise<{
  stories: ExtractedStory[];
  docs: ExtractedDocs[];
}>;
```

**Algorithm:**
1. Read `storybook-static/index.json` for story metadata
2. Parse MDX files for documentation content
3. Link stories to components by title convention

### Output Builder

```typescript
// src/builder.ts

interface BuildConfig {
  version: string;
  gitSha: string;
  outDir: string;
}

async function buildSnapshot(config: BuildConfig): Promise<void> {
  const tokens = await extractTokens({ ... });
  const components = await extractComponents({ ... });
  const { stories, docs } = await extractStorybook({ ... });

  // Transform to entity documents
  const tokenDocs = tokens.map(toTokenDoc);
  const componentDocs = components.map(toComponentDoc);
  const patternDocs = docs.map(toPatternDoc);
  const exampleDocs = stories.map(toExampleDoc);

  // Build search index
  const searchIndex = buildSearchIndex([
    ...tokenDocs,
    ...componentDocs,
    ...patternDocs,
    ...exampleDocs,
  ]);

  // Validate against schemas
  await validateAll([...tokenDocs, ...componentDocs, ...patternDocs, ...exampleDocs]);

  // Write output
  await writeManifest(config, { tokens, components, patterns, examples });
  await writeEntities('token', tokenDocs);
  await writeEntities('component', componentDocs);
  await writeEntities('pattern', patternDocs);
  await writeEntities('example', exampleDocs);
  await writeSearchIndex(searchIndex);
}
```

---

## MCP Server

### Transport

**stdio** — Server communicates via stdin/stdout using JSON-RPC 2.0.

### Implementation

```typescript
// src/server.ts

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({
  name: 'unnnic-design-system',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {},
    resources: {},
  },
});

// Tool: unnnic.search
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'unnnic.search') {
    return handleSearch(request.params.arguments);
  }
  // ... other tools
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Tool Handlers

```typescript
// src/tools/search.ts

interface SearchArgs {
  query: string;
  kinds?: ('component' | 'token' | 'pattern' | 'example')[];
  limit?: number;
}

async function handleSearch(args: SearchArgs): Promise<ToolResult> {
  const snapshot = await loadSnapshot();
  const results = search(snapshot.searchIndex, args.query, {
    kinds: args.kinds,
    limit: args.limit ?? 10,
  });

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        version: snapshot.manifest.packageVersion,
        results: results.map(r => ({
          kind: r.kind,
          id: r.id,
          title: r.title,
          summary: r.summary,
          score: r.score,
        })),
      }),
    }],
  };
}
```

```typescript
// src/tools/get-component.ts

interface GetComponentArgs {
  name: string;
}

async function handleGetComponent(args: GetComponentArgs): Promise<ToolResult> {
  const snapshot = await loadSnapshot();
  
  // Normalize name (UnnnicButton, unnnicButton, Button -> UnnnicButton)
  const normalizedName = normalizeName(args.name);
  const component = snapshot.components.get(`component:${normalizedName}`);

  if (!component) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          error: 'not_found',
          message: `Component "${args.name}" not found`,
          suggestions: findSimilar(snapshot, args.name),
        }),
      }],
      isError: true,
    };
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        version: snapshot.manifest.packageVersion,
        component,
      }),
    }],
  };
}
```

```typescript
// src/tools/validate-usage.ts

interface ValidateUsageArgs {
  component: string;
  props?: string[];
  tokens?: string[];
}

async function handleValidateUsage(args: ValidateUsageArgs): Promise<ToolResult> {
  const snapshot = await loadSnapshot();
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Validate component exists
  const component = snapshot.components.get(`component:${normalizeName(args.component)}`);
  if (!component) {
    errors.push({
      type: 'unknown_component',
      name: args.component,
      message: `Component "${args.component}" does not exist`,
    });
    return formatValidationResult(false, errors, warnings);
  }

  // Validate props
  const validProps = new Set(component.api.props.map(p => p.name));
  for (const prop of args.props ?? []) {
    if (!validProps.has(prop)) {
      errors.push({
        type: 'unknown_prop',
        name: prop,
        message: `Prop "${prop}" does not exist on ${args.component}`,
        suggestion: findSimilarProp(component, prop),
      });
    }
  }

  // Validate tokens
  for (const token of args.tokens ?? []) {
    const normalizedToken = normalizeTokenName(token);
    if (!snapshot.tokens.has(`token:${normalizedToken}`)) {
      errors.push({
        type: 'unknown_token',
        name: token,
        message: `Token "${token}" does not exist`,
        suggestion: findSimilarToken(snapshot, token),
      });
    }
  }

  // Check deprecations
  for (const prop of args.props ?? []) {
    const propDef = component.api.props.find(p => p.name === prop);
    if (propDef?.deprecation?.deprecated) {
      warnings.push({
        type: 'deprecated',
        name: prop,
        message: `Prop "${prop}" is deprecated`,
        replacement: propDef.deprecation.replacement,
      });
    }
  }

  return formatValidationResult(errors.length === 0, errors, warnings);
}
```

### Snapshot Loading

```typescript
// src/loader.ts

interface Snapshot {
  manifest: Manifest;
  components: Map<string, ComponentDoc>;
  tokens: Map<string, TokenDoc>;
  patterns: Map<string, PatternDoc>;
  examples: Map<string, ExampleDoc>;
  searchIndex: SearchIndex;
}

let cachedSnapshot: Snapshot | null = null;

async function loadSnapshot(): Promise<Snapshot> {
  if (cachedSnapshot) {
    return cachedSnapshot;
  }

  // Resolve package path (works with npx)
  const packagePath = require.resolve('@weni/unnnic-system-mcp/dist/manifest.json');
  const distPath = path.dirname(packagePath);

  const manifest = await readJSON(path.join(distPath, 'manifest.json'));
  
  cachedSnapshot = {
    manifest,
    components: await loadEntities(distPath, 'component'),
    tokens: await loadEntities(distPath, 'token'),
    patterns: await loadEntities(distPath, 'pattern'),
    examples: await loadEntities(distPath, 'example'),
    searchIndex: await readJSON(path.join(distPath, 'index', 'search.json')),
  };

  return cachedSnapshot;
}
```

### Search Implementation

```typescript
// src/search.ts

interface SearchIndex {
  entries: SearchEntry[];
}

interface SearchEntry {
  kind: string;
  id: string;
  title: string;
  summary: string;
  keywords: string[];
  deprecated?: boolean;
}

function search(index: SearchIndex, query: string, options: SearchOptions): SearchResult[] {
  const queryTokens = tokenize(query.toLowerCase());
  const results: SearchResult[] = [];

  for (const entry of index.entries) {
    // Skip if kind filter doesn't match
    if (options.kinds && !options.kinds.includes(entry.kind)) {
      continue;
    }

    // Calculate score
    let score = 0;

    // Exact title match
    if (entry.title.toLowerCase() === query.toLowerCase()) {
      score += 100;
    }

    // Title contains query
    if (entry.title.toLowerCase().includes(query.toLowerCase())) {
      score += 50;
    }

    // Keyword matches
    for (const keyword of entry.keywords) {
      for (const queryToken of queryTokens) {
        if (keyword.startsWith(queryToken)) {
          score += 10;
        }
      }
    }

    // Summary contains query
    if (entry.summary.toLowerCase().includes(query.toLowerCase())) {
      score += 5;
    }

    if (score > 0) {
      results.push({
        ...entry,
        score,
      });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, options.limit ?? 10);
}
```

---

## Cursor Skill Structure

```markdown
# Unnnic Design System

Version: {version} — synced with @weni/unnnic-system

## Quick Start

Import components from `@weni/unnnic-system`:
\`\`\`vue
<script setup>
import { UnnnicButton, UnnnicInput, UnnnicFormElement } from '@weni/unnnic-system';
</script>
\`\`\`

## Components

### Form Controls
| Component | Purpose | Key Props |
|-----------|---------|-----------|
| UnnnicButton | Actions | type, size, loading, disabled |
| UnnnicInput | Text input | type, size, iconLeft, iconRight |
| UnnnicFormElement | Form wrapper | label, error, message |
| UnnnicSelect | Dropdown | options, modelValue |
| UnnnicCheckbox | Boolean input | modelValue, label |
| UnnnicRadio | Single choice | modelValue, options |
| UnnnicSwitch | Toggle | modelValue, label |

### Feedback
| Component | Purpose | Key Props |
|-----------|---------|-----------|
| UnnnicModal | Dialog | title, showCloseButton |
| UnnnicToast | Notification | type, message |
| UnnnicAlert | Inline message | type, message |
| UnnnicBanner | Page-level alert | type, message |

### Layout
| Component | Purpose | Key Props |
|-----------|---------|-----------|
| UnnnicCard | Container | - |
| UnnnicTabs | Navigation | modelValue |
| UnnnicTable | Data display | headers, items |
| UnnnicPagination | Page navigation | modelValue, total |

## Tokens

### Colors
- Background: `$unnnic-color-bg-{variant}`
- Foreground: `$unnnic-color-fg-{variant}`
- Border: `$unnnic-color-border-{variant}`

Variants: base, muted, accent-strong, success, warning, critical

### Spacing
`$unnnic-space-{n}` where n = 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20

Base unit: 4px (space-1 = 4px, space-4 = 16px)

### Typography
Use mixins: `@include unnnic-font-{style}`
Styles: display-1 to display-4, body, caption-1, caption-2, action

## Patterns

### Form with Validation
\`\`\`vue
<UnnnicFormElement label="Email" :error="errors.email">
  <UnnnicInput v-model="email" type="error" />
</UnnnicFormElement>
\`\`\`

### Button Actions
- Primary action: `type="primary"` (one per section)
- Secondary action: `type="secondary"`
- Destructive: `type="warning"`

## MCP Tools

When available, use these tools for accurate information:
- `unnnic.search` — Find components/tokens
- `unnnic.get_component` — Full component API
- `unnnic.validate_usage` — Check props/tokens before commit

## Figma Integration

When implementing from Figma:
1. Use Figma MCP `get_design_context` for structure
2. Match Figma component names to Unnnic components
3. Use semantic tokens, not hardcoded colors
```

---

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/ai-snapshot.yml
name: AI Snapshot

on:
  push:
    tags:
      - 'v*'

jobs:
  build-snapshot:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: npm ci

      - name: Build library
        run: npm run build

      - name: Build Storybook
        run: npm run build-storybook

      - name: Generate AI snapshot
        run: |
          npx unnnic-ai build \
            --version ${{ github.ref_name }} \
            --git-sha ${{ github.sha }} \
            --out packages/mcp/dist/

      - name: Validate snapshot
        run: npx unnnic-ai validate --dir packages/mcp/dist/

      - name: Publish MCP package
        run: |
          cd packages/mcp
          npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Quality Gates

```yaml
# .github/workflows/ai-validate.yml
name: AI Validation

on:
  pull_request:

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build && npm run build-storybook

      - name: Dry run snapshot
        run: npx unnnic-ai build --dry-run

      - name: Check coverage
        run: |
          npx unnnic-ai coverage \
            --min-components 0.9 \
            --min-tokens 1.0
```

---

## Dependencies

### Generator Package

```json
{
  "name": "@weni/unnnic-ai-generator",
  "dependencies": {
    "typescript": "^5.0.0",
    "ajv": "^8.0.0",
    "glob": "^10.0.0",
    "gray-matter": "^4.0.0"
  }
}
```

### MCP Server Package

```json
{
  "name": "@weni/unnnic-system-mcp",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0"
  },
  "bin": {
    "unnnic-mcp": "./bin/mcp-server.js"
  }
}
```

---

## Testing Strategy

### Unit Tests

- Token extractor: Parse sample tokens, verify output format
- Component extractor: Parse sample TypeScript, verify props extraction
- Search: Verify scoring algorithm
- Validation: Test prop/token validation logic

### Integration Tests

- Full snapshot generation from test fixtures
- MCP server tool responses
- Cursor skill loading verification

### E2E Tests

- Install packages in test project
- Configure Cursor MCP
- Verify tool calls return expected data

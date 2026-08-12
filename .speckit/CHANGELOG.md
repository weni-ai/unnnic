# Changelog — Unnnic AI-Native Design System

All notable changes to the AI-native specifications and skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-08-12

### Added

- **Cursor Skill** (`.cursor/skills/unnnic/SKILL.md`)
  - Priority components reference with key props
  - Form Controls: Button, Input, FormElement, TextArea, Select, MultiSelect, Checkbox, CheckboxGroup, Radio, RadioGroup, Switch, DatePicker
  - Feedback & Overlays: Dialog, DrawerNext, Toast, Popover, ToolTip, Disclaimer
  - Display: Icon, Chip, Tag, SkeletonLoading, Tabs, SegmentedControl, PageHeader
  - Legacy component mapping with modern alternatives
  - Design tokens reference (colors, spacing, icon sizes, typography, radii, shadows)
  - Common patterns (form validation, button hierarchy, toast notifications, composable components)
  - Figma integration guidelines
  - Common mistakes to avoid

- **Spec Kit Structure** (`.speckit/`)
  - `constitution.md` — Core principles and constraints
  - `spec.md` — User stories and acceptance criteria
  - `plan.md` — Technical architecture and implementation phases
  - `tasks.md` — Detailed task breakdown by phase

- **JSON Schemas** (`.speckit/schemas/`)
  - `manifest.schema.json` — Snapshot metadata
  - `component.schema.json` — ComponentDoc with props, events, slots
  - `token.schema.json` — TokenDoc with formats and usage rules
  - `pattern.schema.json` — PatternDoc with do/don't guidelines
  - `example.schema.json` — ExampleDoc with code snippets

### Changed

- Migrated from `docs/ai-native/` to Spec Kit format in `.speckit/`
- Consolidated schemas into `.speckit/schemas/`

### Defined

- 5 User Stories (US-01 to US-05) with acceptance criteria
- 19 Priority Components for Code Connect
- 6 Implementation Phases with dependencies
- Token cost analysis (~15-25% increase per session)
- Zero infrastructure approach (local MCP via npx)

---

## Roadmap

### [0.2.0] - Planned

- Code Connect mappings for priority components
- `@figma/code-connect` integration

### [0.3.0] - Planned

- Snapshot Generator CLI (`unnnic-ai build`)
- Token extractor (Style Dictionary → TokenDoc)
- Component extractor (TypeScript → ComponentDoc)

### [0.4.0] - Planned

- MCP Server package (`@weni/unnnic-system-mcp`)
- Tools: `search`, `get_component`, `get_token`, `validate_usage`

### [1.0.0] - Planned

- CI/CD integration
- Full documentation
- Production-ready release

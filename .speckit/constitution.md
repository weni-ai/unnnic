# Constitution — Unnnic AI-Native Design System

> **Version:** 0.1.0  
> **Last updated:** 2026-08-12

This document defines the non-negotiable principles that govern the development of the AI-native capabilities for Unnnic Design System.

## Project Identity

**Name:** Unnnic AI-Native Design System  
**Package:** `@weni/unnnic-system`  
**Scope:** Enable LLMs to accurately understand and use Unnnic components, tokens, and patterns during development

## Core Principles

### 1. Version Pinning is Mandatory

All AI knowledge MUST be tied to a specific package version. The MCP server and snapshots MUST serve data matching the installed `@weni/unnnic-system` version. No "latest" fallbacks without explicit user consent.

### 2. Zero Infrastructure

The solution MUST NOT require new servers, databases, or cloud services. All components MUST run locally via npm/npx or be distributed as static files through npm packages.

### 3. Source of Truth Hierarchy

1. **TypeScript types** (`dist/index.d.ts`) — Authoritative for component API
2. **Style Dictionary tokens** (`src/assets/tokens/`) — Authoritative for design tokens
3. **Storybook** (`src/stories/`) — Advisory for patterns and examples
4. **CHANGELOG.md** — Authoritative for deprecations and removals

### 4. Anti-Hallucination by Design

Every entity MUST include `sourceRefs` pointing to verifiable sources. The MCP server MUST provide a `validate_usage` tool to catch invalid props/tokens before code generation.

### 5. Incremental Value

Each phase MUST deliver standalone value:
- Phase 1 (Skill) works without MCP
- Phase 2 (Code Connect) works without MCP
- Phase 3+ (MCP) enhances but doesn't replace earlier phases

## Technical Constraints

### Languages and Frameworks

- **Generator/MCP Server:** TypeScript (Node.js 20+)
- **Design System:** Vue 3, SCSS, Style Dictionary
- **Schemas:** JSON Schema Draft 2020-12

### Distribution

- **Skill:** Bundled in `@weni/unnnic-system` npm package
- **MCP Server:** Separate `@weni/unnnic-system-mcp` npm package
- **Snapshots:** Bundled in MCP package (not fetched remotely)

### Transport

- MCP uses **stdio** transport only (no HTTP server)
- Consumer projects configure via `.cursor/mcp.json`

## Quality Standards

### Schema Validation

All generated entities MUST validate against schemas in `docs/ai-native/schemas/`. CI MUST fail on validation errors.

### Coverage Requirements

- 100% of exported components MUST have `ComponentDoc`
- 100% of Style Dictionary tokens MUST have `TokenDoc`
- Top 18 components MUST have Code Connect mappings

### Token Budget

- Cursor Skill: ≤4K tokens
- MCP responses: ≤2K tokens per entity

## Non-Goals

- Real-time Figma sync (snapshot-based only)
- Private Figma file ingestion
- Runtime code execution
- Screenshot-based UI understanding
- Embeddings or semantic search (keyword search only for MVP)

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-08-12 | Use stdio transport for MCP | Zero infrastructure, works offline |
| 2026-08-12 | Bundle skill in main package | Auto-discovery by Cursor, single version |
| 2026-08-12 | Separate MCP package | Smaller main package, opt-in for consumers |

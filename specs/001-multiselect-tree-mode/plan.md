# Implementation Plan: UnnnicMultiSelect tree mode (collapsible children)

**Branch**: `feat/multiselect-tree-mode` | **Date**: 2026-10-29 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-multiselect-tree-mode/spec.md`

## Summary

Add an optional, one-level `children` field to `SelectOption`. With it, `UnnnicMultiSelect` renders a collapsible tree:
- parent and child checkboxes, with an indeterminate parent;
- a flat `modelValue` that a fully checked parent fills with itself and its enabled children;
- search over parents and children;
- WAI-ARIA tree keyboard and roles;
- an ellipsized closed field.

The work starts from the stashed prototype (research R1), corrected for:
- the `UnnnicSelect` search scope (R2);
- enabled-children normalization and incoming parent values (R3);
- ArrowRight moving to the first child (R4);
- the 350-line limit, met by extracting an internal `MultiSelectTreeOptions.vue` (R5);
- source-only localization (R6).

## Technical Context

**Language/Version**: TypeScript 5 in Vue 3 SFCs (`<script setup lang="ts">`); tests and stories in JavaScript

**Primary Dependencies**: Vue `^3.4.8` (peer), reka-ui (popover), `@vueuse/core`, vue-i18n 9

**Storage**: N/A (no persisted state)

**Testing**: Vitest + `@vue/test-utils` (`src/components/**/__tests__/`), snapshots

**Target Platform**: Modern browsers through consumer apps (agent-builder-webapp first)

**Project Type**: Component library (`@weni/unnnic-system`, Vite library build)

**Performance Goals**: Responsive with 50 parents × 10 children opened and searched (spec, Peak Load)

**Constraints**:
- No new dependency.
- Flat-mode snapshots unchanged.
- Files ≤ 350 lines.
- Only `en.json` edited.

**Scale/Scope**: 1 component and 1 subcomponent changed, 1 internal component and 1 composable added, 2 shared composables extended

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Pre-design | Post-design |
|------|------------|-------------|
| IV. Versioned Contracts: additive, minor, flat behavior unchanged | ✅ | ✅ (contracts/multiselect-tree.md) |
| V. Traceability: Product Spec pinned by tag | ✅ | ✅ (webapp spec pin pending, tracked in the spec checklist) |
| VI. No Silent Divergence: FR-013 recorded, not implemented | ✅ | ✅ |
| X. Type Safety: new code in TypeScript | ✅ | ✅ |
| XI. Single Responsibility: ≤ 350 lines | ⚠️ the prototype's `index.vue` is about 430 lines | ✅ R5 extraction |
| XII / XIII. Naming and events (project exceptions) | ✅ | ✅ |
| XIV / XV. Tokens and BEM | ✅ | ✅ |
| XX. Testing: behavior tests, intentional snapshots | ✅ | ✅ (R7) |
| XXI. Accessibility: tree roles and keyboard | ✅ | ✅ |
| XXIII. i18n: source locale only | ⚠️ the prototype edits `pt_br`/`es` | ✅ R6 |

No unjustified violations.

## Project Structure

### Documentation (this feature)

```text
specs/001-multiselect-tree-mode/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── multiselect-tree.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── Select/
│   │   ├── types.ts                         # + children
│   │   └── __tests__/Select.spec.js         # + children does not affect Select search
│   └── MultiSelect/
│       ├── index.vue                        # tree branch, display items, keyboard wiring, ellipsis
│       ├── MultiSelectOption.vue            # CheckboxValue, chevron, level
│       ├── MultiSelectTreeOptions.vue       # new, internal: grouped tree rows + ARIA
│       └── __tests__/
│           ├── MultiSelect.spec.js          # + tree mode
│           ├── MultiSelectOption.spec.js    # + chevron, level, 'less'
│           └── __snapshots__/MultiSelectOption.spec.js.snap
├── composables/
│   ├── useSelectBase.ts                     # optional filterOptions strategy, matchesSearch
│   ├── useSelectKeyboard.ts                 # ArrowRight/ArrowLeft/Space options, clamp
│   ├── useMultiSelectSelection.ts           # new: model <-> values, check state, toggle, display
│   ├── useMultiSelectRows.ts                # new: rows, arrow handlers
│   └── useTreeExpansion.ts                  # new: expansion state
├── lib/
│   ├── tree-selection.ts                    # new: pure selection and search rules
│   └── __tests__/tree-selection.spec.ts     # new: unit tests for the rules
├── locales/en.json                          # + expand, collapse
└── stories/MultiSelect.stories.js           # + WithChildren, WithChildrenAndSearch
CHANGELOG.md                                 # Unreleased
```

**Structure Decision**: Existing library layout. The new component stays in the `MultiSelect/` folder and is not exported from `src/components/index.ts`.

## Complexity Tracking

No violations to justify.

## Inherited Context

- Product Spec: Novos filtros na aba Conversations do Audit (015-audit-filters) — https://github.com/weni-ai/vtex-cx-nexus-specs/blob/05e22e396efd0260e3d68ffdd5039eb3ec88bc9e/specs/015-audit-filters/spec.md
- Pinned version: tag `015-audit-filters-v1.0.0` (commit `05e22e396efd0260e3d68ffdd5039eb3ec88bc9e`)
- Architecture doc: none
- Engineering Spec: `specs/001-multiselect-tree-mode/spec.md`

## Delivery Sequence

1. Types and the shared composables (`types.ts`, `useSelectBase`, `useSelectKeyboard`). Everything else builds on them, and `UnnnicSelect` must be proven unchanged first.
2. `src/lib/tree-selection.ts` (the pure rules every UI piece reads), then `useTreeExpansion`, `useMultiSelectSelection` and `useMultiSelectRows`.
3. `MultiSelectOption`, then `MultiSelectTreeOptions`, then `index.vue` wiring, in dependency order.
4. Locale key, stories and CHANGELOG.
5. Validation: tests, lint, type-check, build, then the Storybook check from quickstart.md.
6. Release `3.37.0-staging`, then `3.37.0`, after review.

**Cross-repository coordination**: agent-builder-webapp bumps to `3.37.0` after release. Its spec must drop `selectionDisplay` and `#before-options` before it is pinned here. Nothing has to ship before this repository.

## Peak Load Plan

- Declared peak: 50 parents × 10 children (550 options), opened and searched.
- How this plan sustains it:
  - collapsed children are not rendered;
  - selection lookups use a `Set` built once per `modelValue` change;
  - rows, check states and display items are `computed`.
- How it is verified: a `MultiSelect.spec.js` case mounts 550 options, expands all and searches, asserting the row counts. A manual Storybook check confirms there is no visible lag.

## Observability Plan

- Structured logs added: none. The library does not log, and labels and search text MUST NOT be logged (Principle III).
- Correlation identifier: N/A (no I/O).
- Error reports: N/A. Invalid input is handled locally (spec, Failure Handling).
- Signals watched after rollout: issues reported by agent-builder-webapp on the Topic filter during staging.

## Rollout and Rollback Plan

- Rollout: tag `3.37.0-staging` (alpha prerelease), integrate in the webapp staging, then the version bump on `main` publishes `3.37.0`.
- Backward compatibility window: indefinite. Every addition is optional.
- Rollback: consumers pin `3.36.x`. Reverting only affects consumers that pass `children`, which fall back to a flat list of parents.
- Migration reversibility: N/A.

## Divergence Gate

- Divergences found while planning: none new. FR-013 is already recorded in the spec (amendment pending), and no task implements a "+N" summary.
- Tasks blocked by an open amendment: none.

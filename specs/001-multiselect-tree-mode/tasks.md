---

description: "Task list for UnnnicMultiSelect tree mode"
---

# Tasks: UnnnicMultiSelect tree mode (collapsible children)

**Input**: Design documents from `/specs/001-multiselect-tree-mode/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/multiselect-tree.md, quickstart.md

**Tests**: Required. The spec's Test Strategy maps SC-001 (FR-012 value semantics) to `MultiSelect.spec.js › tree mode`, and the constitution requires flat snapshots to stay unchanged.

**Organization**: The engineering spec has no user stories of its own, so its capabilities are grouped as stories:

- **US1 (P1)**: tree rendering and selection (FR-011, FR-012)
- **US2 (P1)**: search over the tree (FR-011)
- **US3 (P1)**: keyboard and ARIA (NFR-003)
- **US4 (P2)**: closed-field display and ellipsis

Source prototype: `stash@{0}` (tracked files) and `stash@{0}^3` (`src/composables/useMultiSelectTree.ts`); see research R1.

## Format: `[ID] [P?] [Story] Description`

## Phase 1: Setup

- [X] T001 Confirm the baseline: `npx vitest run src/components/MultiSelect src/components/Select` passes on `feat/multiselect-tree-mode-impl` before any change.

---

## Phase 2: Foundational (blocking)

- [X] T002 [P] Add `children?: SelectOption[]` to `SelectOption` in src/components/Select/types.ts
- [X] T003 Export `getOptionChildren` and `optionMatchesSearch` from src/composables/useSelectBase.ts, and make `filteredOptions` tree-aware **only when `variant === 'multi'`**: a matching parent keeps all its children, a non-matching parent with matching children keeps only those, and a leaf is filtered as today (R2).
- [X] T004 [P] Extend src/composables/useSelectKeyboard.ts with optional `onArrowRight` and `onArrowLeft` (both may return a new focus index), `toggleOnSpace`, the `isEditableTarget` guard, and focus clamping when the list shrinks (R4).
- [X] T005 Create src/composables/useMultiSelectTree.ts from the prototype with the R3 rules:
  - `selectedValues` includes the enabled children implied by a selected parent;
  - the driving children are the enabled ones, or all when every child is disabled;
  - `TreeRow.checkState` is precomputed;
  - transitions start from `modelValue` plus the implied children;
  - add `handleArrowRight` and `handleArrowLeft` returning focus indexes, and `toAriaChecked` (R5).

**Checkpoint**: `UnnnicSelect` tests still pass.

---

## Phase 3: US1, tree rendering and selection (P1) 🎯 MVP

**Goal**: Parents with collapsible children, full and partial selection in a flat `modelValue`.

**Independent test**: Mount with topics and leaves, expand a topic, check one child (the parent shows `'less'`), check the parent (the value holds the parent and its enabled children).

- [X] T006 [P] [US1] Write the tree selection tests in src/components/MultiSelect/__tests__/MultiSelect.spec.js (`describe('tree mode')`):
  - collapsed by default; expanding shows the children;
  - parent check and uncheck, child toggles, and parent normalization;
  - `'less'` checks the parent;
  - disabled children are skipped;
  - an incoming parent value implies its children;
  - unknown values are kept;
  - `returnObject`;
  - `children: []` is a leaf;
  - expansion resets on close;
  - 550-option smoke test.
- [X] T007 [P] [US1] Write the option tests in src/components/MultiSelect/__tests__/MultiSelectOption.spec.js: chevron rendered only when `expandable`, `update:expanded`, the `--level-2` class, the level-1 spacer, and `active: 'less'` emitting `true`. Update src/components/MultiSelect/__tests__/__snapshots__/MultiSelectOption.spec.js.snap only for the `<!--v-if-->` placeholder.
- [X] T008 [US1] Update src/components/MultiSelect/MultiSelectOption.vue:
  - `active: CheckboxValue`;
  - `level`, `expandable`, `expanded`;
  - chevron `<button type="button" tabindex="-1">` with `UnnnicIcon` (`keyboard_arrow_down` / `keyboard_arrow_right`, size `ant`);
  - spacer on level-1 leaves, `--level-2` padding `$unnnic-space-7`;
  - emits `update:expanded`.
- [X] T009 [US1] Create src/components/MultiSelect/MultiSelectTreeOptions.vue (internal, not exported):
  - one `unnnic-multi-select__option-group` (gap `$unnnic-space-4`) per root;
  - `UnnnicMultiSelectOption` rows with `data-option-index`, `focused`, `level`, `expandable`, `expanded`;
  - emits `select` (option, selected) and `expand` (option, expanded).
- [X] T010 [US1] Wire tree mode in src/components/MultiSelect/index.vue:
  - `useMultiSelectTree`; `MultiSelectTreeOptions` under `v-if="isTreeMode"`, with the flat list unchanged under `v-else`;
  - route `handleSelectOption` to `toggleOption` in tree mode;
  - `resetExpanded` on close;
  - keep the file ≤ 350 lines.

**Checkpoint**: US1 tests pass; flat snapshots unchanged.

---

## Phase 4: US2, search over the tree (P1)

**Goal**: Search matches parent and child labels; matching branches are expanded while searching.

**Independent test**: With `enableSearch`, search a child label (its parent shows expanded with only the matching children) and a parent label (all its children show).

- [X] T011 [P] [US2] Add search tests in src/components/MultiSelect/__tests__/MultiSelect.spec.js:
  - parent match; child-only match;
  - no match shows `without_results`;
  - branches start expanded and can still be collapsed and expanded while searching;
  - manual expansion restored after clearing.
- [X] T012 [P] [US2] Add a test in src/components/Select/__tests__/Select.spec.js proving `UnnnicSelect` search ignores `children` (a parent with a matching child is not returned).
- [X] T013 [US2] Ensure `isSearchActive` starts every branch expanded while keeping the chevron usable (a search-only collapsed set) in src/composables/useMultiSelectTree.ts.

---

## Phase 5: US3, keyboard and ARIA (P1)

**Goal**: The tree is operable by keyboard and exposes WAI-ARIA tree semantics (NFR-003).

**Independent test**: ArrowDown → ArrowRight (expand) → ArrowRight (first child) → Space (toggle) → ArrowLeft (to parent) → ArrowLeft (collapse) → Enter (toggle parent); the tree and row ARIA attributes are present.

- [X] T014 [P] [US3] Add keyboard and ARIA tests in src/components/MultiSelect/__tests__/MultiSelect.spec.js:
  - the full key path;
  - Space typed in the search input does not toggle;
  - focus clamped after a collapse;
  - `role="tree"`, `aria-multiselectable`, `treeitem`, `aria-level`, `aria-checked` (`mixed`), `aria-expanded`;
  - flat lists ignore ArrowRight, ArrowLeft and Space.
- [X] T015 [US3] Add the ARIA attributes in src/components/MultiSelect/MultiSelectTreeOptions.vue, and pass `toggleOnSpace`, `onArrowRight` and `onArrowLeft` (tree mode only) from src/components/MultiSelect/index.vue to `useSelectKeyboard`, navigating over `visibleRows`.
- [X] T016 [P] [US3] Add `expand` ("Expand") and `collapse` ("Collapse") to src/locales/en.json **only** (R6).

---

## Phase 6: US4, closed-field display and ellipsis (P2)

**Goal**: The closed field lists the display items, comma-separated, with ellipsis on overflow.

**Independent test**: A fully checked parent shows once; a partial parent shows its checked children; long text is ellipsized; the X emits `[]`.

- [X] T017 [P] [US4] Add closed-field tests in src/components/MultiSelect/__tests__/MultiSelect.spec.js: `inputValue` for full parent, partial parent and leaves in tree order; `clearable` emits `[]`.
- [X] T018 [US4] Use `displayItems` for `selectedItems` in tree mode, and add `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` to `.input-itself` inside `:deep(.unnnic-multi-select__input)` in src/components/MultiSelect/index.vue.

---

## Phase 7: Polish and cross-cutting

- [X] T019 [P] Add the `WithChildren` and `WithChildrenAndSearch` stories (topics with subtopics plus the leaves Unclassified and Other) in src/stories/MultiSelect.stories.js.
- [X] T020 [P] Add `Unreleased` entries (Added: tree mode in **UnnnicMultiSelect**; Changed: ellipsis on the closed field) in CHANGELOG.md.
- [X] T021 Run `npx vitest run src/components/MultiSelect src/components/Select`, ESLint and Prettier on the changed files, and `vue-tsc --noEmit` on the changed files; fix any issues.
- [X] T022 Verify that `index.vue`, `useMultiSelectTree.ts` and `MultiSelectTreeOptions.vue` are each ≤ 350 lines, and that no `pt_br.json` or `es.json` change is staged.

## Phase 8: Layering refactor (research R8)

- [X] T023 Move the selection and search rules into pure functions over option values in src/lib/tree-selection.ts, with unit tests in src/lib/__tests__/tree-selection.spec.ts.
- [X] T024 Return `useSelectBase` to a flat filter with an optional `filterOptions` strategy, and expose `isSearchActive` and `matchesSearch` (R2).
- [X] T025 Replace src/composables/useMultiSelectTree.ts with `useMultiSelectSelection` (model adaptation for flat and tree lists), `useMultiSelectRows` (rows and arrow handlers) and `useTreeExpansion` (expansion state); move `toAriaChecked` into `MultiSelectTreeOptions.vue`.
- [X] T026 Wire one selection and keyboard path in src/components/MultiSelect/index.vue, feeding the flat markup from the same rows; keep flat behavior, the flat `returnObject` closed field and the snapshots unchanged.
- [X] T027 Run the MultiSelect, Select and lib tests, ESLint, Prettier and `vue-tsc`; verify every touched file is ≤ 350 lines.

---

## Dependencies

- Phase 2 blocks everything. T003 and T005 are sequential (T005 imports from T003); T002 and T004 can run in parallel.
- US1 (T006–T010) comes before US2, US3 and US4, which touch the same files (`index.vue`, `MultiSelectTreeOptions.vue`).
- US2, US3 and US4 are independent of each other once US1 lands; their test tasks [P] can be written in parallel.
- Polish runs last.

## Parallel examples

- Phase 2: T002 and T004 together, then T003 → T005.
- US1: T006 and T007 together, then T008 → T009 → T010.
- After US1: T011, T012, T014, T016 and T017 together.

## Implementation strategy

MVP is US1 (tree selection), which is enough for the webapp's Topic filter without search. US2 and US3 complete FR-011 and NFR-003 for the same release. US4 is polish of the closed field. Everything ships in one minor release (`3.37.0`).

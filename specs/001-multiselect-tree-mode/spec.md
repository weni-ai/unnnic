# Engineering Specification: UnnnicMultiSelect tree mode (collapsible children)

**Repository**: unnnic (`@weni/unnnic-system`) — frontend

**Feature Branch**: `feat/multiselect-tree-mode`

**Created**: 2026-10-29

**Status**: Draft

## Inheritance from Product Spec

- Product Spec: Novos filtros na aba Conversations do Audit (015-audit-filters) — https://github.com/weni-ai/vtex-cx-nexus-specs/blob/05e22e396efd0260e3d68ffdd5039eb3ec88bc9e/specs/015-audit-filters/spec.md
- Pinned version: tag `015-audit-filters-v1.0.0` (commit `05e22e396efd0260e3d68ffdd5039eb3ec88bc9e`)
- Architecture doc: none
- Inherited binding decisions: BD-001 (options inside one filter combine with OR, different filters combine with AND); BD-002 (filtering is read-only); BD-005 (status and agents apply on change, the panel applies only on **Apply filters**). BD-003, BD-004 and BD-006 do not constrain this repository.
- Scope of this spec: the tree mode of `UnnnicMultiSelect` (topics with collapsible subtopics, full and partial selection, search over the tree, keyboard and ARIA) and the ellipsis on the closed field, consumed by the Topic filter of agent-builder-webapp.
- Divergences: FR-013 (closed topic field shows every selected name instead of "first item +N") — amendment pending in `vtex-cx-nexus-specs`; see [Divergences](#divergences)

## Scope in This Repository

**This repository implements**:

- An optional, one-level `children` field on `SelectOption`, rendered by `UnnnicMultiSelect` as a tree (FR-011).
- Tree selection semantics in a flat `modelValue`: checking a parent selects it and all its children, checking some children shows the parent as partially checked (FR-012).
- Search over parent and child labels with the existing controlled `search` prop (FR-011).
- Expand and collapse per parent, collapsed by default (Product Spec defaults: "tópicos da árvore recolhidos").
- Keyboard operation and ARIA tree semantics (NFR-003).
- Ellipsis on the closed field when the comma-separated labels overflow, in every mode of `UnnnicMultiSelect`.
- A Storybook story and unit tests for the tree, and a minor release of `@weni/unnnic-system`.

**Out of scope here**:

- The Audit filter bar, the **More filters** panel, URL persistence, the request to nexus-ai and the agents notice of FR-007 — **agent-builder-webapp** (`specs/004-audit-conversation-filters`).
- Filtering conversations by topic and subtopic — **nexus-conversations / nexus-ai**.
- The "first item +N" closed-field summary of FR-013 — not delivered; see [Divergences](#divergences).
- A `#before-options` slot. The webapp draft contract (`contracts/unnnic-multiselect-tree.md`) asks for it to place the FR-007 notice; the developer decided (2026-10-29) not to add it, so agent-builder-webapp must render the notice without it and update its spec.
- Tree mode in `UnnnicSelect` (single select): `children` is ignored there and its behavior does not change.
- More than one level of nesting.

**Depends on**: nothing at runtime. agent-builder-webapp consumes the release; its draft spec `specs/004-audit-conversation-filters` (untracked in `weni-ai/agent-builder-webapp`, not yet pinnable) MUST be updated to the contract below — drop `selectionDisplay` and `#before-options` — before it is committed and pinned here.

## Current State

- `src/components/MultiSelect/index.vue` (321 lines) — `UnnnicMultiSelect`. Renders a `PopoverTrigger` with a readonly `UnnnicInput` that shows `selectedItems` labels joined by `', '` (clipped without ellipsis when long), and a `PopoverContent` (reka-ui, teleported) with an optional search `UnnnicInput` and a flat `v-for` of `UnnnicMultiSelectOption` over `filteredOptions`. `modelValue` is an array of values (or objects with `returnObject`). Supports `clearable`, `disabled`, infinite scroll (`scroll-end`, `finishInfiniteScroll`, `resetInfiniteScroll`) and exposes `openPopover`, `setOpenPopover`, `filteredOptions`, `calculatedPopoverHeight`, `selectedItems`, `inputValue`.
- `src/components/MultiSelect/MultiSelectOption.vue` — `UnnnicMultiSelectOption`, an `UnnnicCheckbox` row with `label`, `active: boolean`, `disabled`, `focused`; emits `update:modelValue` with `!active`.
- `src/components/Checkbox/Checkbox.vue` — already supports the indeterminate value `'less'` (`CheckboxValue = boolean | 'less'`).
- `src/composables/useSelectBase.ts` — shared by `UnnnicSelect` (`'single'`) and `UnnnicMultiSelect` (`'multi'`): popover state, trigger width, `filteredOptions` (case-insensitive `includes` over `itemLabel` and `itemValue`, flat), popover height.
- `src/composables/useSelectKeyboard.ts` — shared ArrowUp, ArrowDown and Enter over a flat list, bound to `document` while the popover is open; scrolls to `[data-option-index]`.
- `src/components/Select/types.ts` — `SelectOption { label?, value?, disabled?, [key]: unknown }`, `SelectBaseProps`.
- `src/components/MultiSelect/__tests__/MultiSelect.spec.js` (867 lines, 18 `describe` blocks including snapshots, keyboard and infinite scroll) and `MultiSelectOption.spec.js`, with snapshots in `__tests__/__snapshots__/`.
- `src/stories/MultiSelect.stories.js` — Default, ReturnObject, AlternativeValueKey, AlternativeValueLabel, Clearable, Disabled, WithSearch, WithInfiniteScroll.
- `src/locales/en.json` — source locale (`search`, `without_results` already used by the component).
- Nearest analogous feature: the infinite scroll addition to `UnnnicMultiSelect`, which added optional props and exposed members without changing flat snapshots.

## Technical Approach

### Components Affected

| Component | Change | Why |
|-----------|--------|-----|
| `src/components/Select/types.ts` | modified | Add `children?: SelectOption[]` to `SelectOption`. |
| `src/composables/useSelectBase.ts` | modified | Tree-aware `filteredOptions` for the `'multi'` variant only; export `getOptionChildren` and `optionMatchesSearch`. `'single'` keeps the flat filter. |
| `src/composables/useMultiSelectTree.ts` | new | Tree state and rules: tree detection, visible rows, check state, toggle with normalization, expansion, display items, reset. Keeps `index.vue` under the 350-line limit. |
| `src/composables/useSelectKeyboard.ts` | modified | Optional `onArrowRight`, `onArrowLeft` and `toggleOnSpace` options; skip handling when the event target is an editable field; clamp the focused index when the list shrinks. |
| `src/components/MultiSelect/MultiSelectOption.vue` | modified | `active: CheckboxValue`; optional `level`, `expandable`, `expanded`; chevron button; emits `update:expanded`. |
| `src/components/MultiSelect/index.vue` | modified | Tree branch of the template (`v-if="isTreeMode"`), flat branch unchanged (`v-else`); closed field uses display items; ellipsis CSS; tree keyboard wiring; reset expansion on close. |
| `src/locales/en.json` | modified | Add `expand` ("Expand") and `collapse` ("Collapse") for the chevron `aria-label`. |
| `src/stories/MultiSelect.stories.js` | modified | `WithChildren` and `WithChildrenAndSearch` stories with topics, subtopics and leaf options. |
| `src/components/MultiSelect/__tests__/*.spec.js` | modified | Tree tests; flat snapshots unchanged. |
| `CHANGELOG.md` | modified | `Unreleased` entries (Added: tree mode; Changed: ellipsis on the closed field). |

### Flow

1. **Input.** The consumer passes `options` where some options have `children` (topics with subtopics) and others do not (for example "No matching topic"). `isTreeMode` is `true` when at least one option has a non-empty `children` array; otherwise every code path is today's flat path.
2. **Search.** With `enableSearch` and a non-empty `search`, `filteredOptions` (`'multi'`) returns: a parent whose label or value matches, with all its children; a parent that does not match but has matching children, with only those children; a matching leaf. Matching uses today's rule (lowercased `includes` on `itemLabel` and `itemValue`).
3. **Rows.** `useMultiSelectTree` turns `filteredOptions` into `optionGroups` (one group per root: the root row plus its children when expanded) and `visibleRows` (the flat list keyboard navigation walks). A row is `{ option, parent, level: 1 | 2, hasChildren, isExpanded, index }`. When a search starts, every parent in the result is expanded; the user can still collapse and expand them while searching.
4. **Render.** The options container gets `role="tree"` and `aria-multiselectable="true"`. Each group (`unnnic-multi-select__option-group`) renders `UnnnicMultiSelectOption` rows with `role="treeitem"`, `aria-level`, `aria-checked` (`mixed` for `'less'`), `aria-expanded` on parents and `data-option-index` from `visibleRows`.
5. **Check state.** `getCheckState(option)`: a leaf is `true` when its value is in `modelValue`. A parent is `true` when its value is in `modelValue` or all its enabled children are; `'less'` when only some children are; `false` otherwise.
6. **Toggle.** `toggleOption(row)` computes the next value array and emits a single `update:modelValue`:
   - parent to checked: add the parent and every enabled child; parent to unchecked: remove the parent and every enabled child;
   - child: add or remove it, then normalize its parent — the parent value is present only when all its children are present;
   - disabled children are never added or removed by a parent toggle;
   - with `returnObject`, the same rules run over values and the emitted array holds the option objects.
7. **Closed field.** In tree mode, `selectedItems` is `displayItems`: a fully checked parent is listed once without its children, a partial parent lists only its checked children, in tree order. `inputValue` joins their labels with `', '` (today's format). `clearable` emits `[]` as today. The trigger input text gets `text-overflow: ellipsis`.
8. **Close.** On popover close, the search is cleared (today) and expansion resets so parents start collapsed on the next open.

### Rejected Alternatives

- **A separate `UnnnicTreeSelect` component**: duplicates popover, search, checkbox, keyboard and infinite-scroll mechanics already in `UnnnicMultiSelect`; the Product Spec asks to reuse the existing multi-select. An optional `children` field is additive and backward compatible.
- **Nested `modelValue` (`{ parent: [children] }`)**: breaks the existing flat contract and forces consumers to reshape values; a flat array maps directly to the query parameters the webapp sends.
- **Tree logic inside `index.vue`**: the file is already at 321 lines and the tree adds roughly 200; a composable keeps both files under 350 lines and makes the rules unit-testable.
- **Tree-aware filtering for `UnnnicSelect` too**: `UnnnicSelect` does not render children; returning parents for matching children would change its search results with no consumer asking for it.

## Contracts

| Interface | Change | Version impact | Backward compatible |
|-----------|--------|----------------|---------------------|
| `SelectOption.children?: SelectOption[]` (`UnnnicMultiSelect`) | added, one level | minor | yes — options without `children` render, emit and navigate exactly as today |
| `UnnnicMultiSelect` tree selection semantics (`update:modelValue`) | added | minor | yes — flat lists unchanged |
| `UnnnicMultiSelect` closed field (`inputValue`, `selectedItems`) | modified: ellipsis on overflow; in tree mode, display items | minor | yes — same text in flat mode; CSS only |
| `UnnnicMultiSelect` keyboard (tree): ArrowRight, ArrowLeft, Space | added | minor | yes — flat lists keep ArrowUp, ArrowDown and Enter only |
| `UnnnicMultiSelectOption` props `active: boolean \| 'less'`, `level`, `expandable`, `expanded`; emit `update:expanded` | added / widened | minor | yes — all optional; `active: boolean` still valid |
| `useSelectKeyboard` options `onArrowRight`, `onArrowLeft`, `toggleOnSpace` | added | minor | yes — optional |
| `useSelectBase` exports `getOptionChildren`, `optionMatchesSearch` | added | minor | yes |
| i18n keys `expand`, `collapse` (`en.json`) | added | minor | yes |

Release: `@weni/unnnic-system` `3.37.0` (next minor after `3.36.0`), first as `3.37.0-staging` (alpha prerelease).

**Consumers affected**: agent-builder-webapp (Topic filter) adopts it through a version bump. Its draft contract `contracts/unnnic-multiselect-tree.md` differs from this one in three points that its spec must absorb: no `selectionDisplay` (FR-013 divergence), no `#before-options` slot, and search matching is case-insensitive but not accent-insensitive (today's behavior, which the draft mislabels). Every other consumer is unaffected; the release notes in `CHANGELOG.md` describe the additions.

## Non-Functional Requirements

### Peak Load

No server-side load. Rendering peak: a project's topic list, expected in the tens of topics with up to tens of subtopics each; the component MUST stay responsive with 50 parents × 10 children (550 options) open and searched, on the same hardware the webapp targets. Rows are not virtualized; collapsed parents render no child rows, and `visibleRows`, `getCheckState` and `displayItems` are `computed` over a `Set` of selected values.

### Observability

The component logs nothing, including search text and option labels (Principle III). State is observable by the consumer through `update:modelValue`, `update:search` and the exposed `selectedItems` and `inputValue`. No correlation identifier applies.

### Failure Handling

There is no I/O. Invalid input is handled locally: `children: []` behaves as a leaf; grandchildren are ignored (one level); an incoming `modelValue` with a parent value but missing children shows the parent and its children checked and the next emission includes them; values not found in `options` are kept in `modelValue` untouched and are not displayed. Duplicate values across parents are the consumer's responsibility and are documented in the story.

### Security and Authorization

The trust boundary is the props from the consumer. Labels are rendered with text interpolation (no `v-html`), so option labels cannot inject markup. No secrets, no authorization: access to the Audit list is enforced by the webapp and the backend (BD-002).

## Test Strategy

| Inherited success criterion | How this repository proves it |
|------------------------------|-------------------------------|
| SC-001 (combinations return the expected conversations by BD-001, FR-010 and FR-012) | This repository owns only the FR-012 value semantics the webapp sends. `MultiSelect.spec.js › tree mode`: checking a parent emits the parent and all enabled children; unchecking removes them; checking every child adds the parent; unchecking one child removes the parent and shows `'less'`; partial selection emits only the checked children; disabled children are never toggled by the parent; `returnObject` emits the same set as objects. The OR/AND combination and the conversation result are proven in agent-builder-webapp and nexus-conversations. |
| SC-002, SC-003, SC-004, SC-005 | Not owned by this repository (agents data, URL persistence, list latency, adoption). |

**Flow coverage**: open the popover, expand a parent, check a child, check the parent, collapse, close and reopen (collapsed again); search "Pag" with parent match and with child-only match, then clear; closed field text for full parent, partial parent and mixed leaves; keyboard path ArrowDown → ArrowRight (expand) → ArrowRight (first child) → Space (toggle) → ArrowLeft (to parent) → ArrowLeft (collapse) → Enter (toggle parent); `clearable` X emits `[]`.

**Failure paths covered**: `children: []`; incoming parent value without children; unknown values in `modelValue`; search with no match shows `without_results`; Space typed in the search input does not toggle a row; focus index clamped when a collapse or search shrinks the list.

**Stubbed at the boundary**: none beyond today's setup. `PopoverContent` is teleported, so tree tests query `document` and drive `UnnnicMultiSelectOption` through `findAllComponents`. Existing flat snapshots MUST NOT change; `MultiSelectOption.spec.js.snap` gains only the conditional chevron placeholder (`<!--v-if-->`), explained in the PR.

**Visual check**: Storybook `WithChildren` and `WithChildrenAndSearch` compared against Figma `Audit`, nodes `3137:22064` and `3137:22216` (chevron, indentation `$unnnic-space-7` for level 2, group gap `$unnnic-space-4`).

## Rollout and Rollback

1. Merge to `main` through the stacked PR; publish `3.37.0-staging` (alpha) for the webapp to integrate on staging.
2. Release `3.37.0` with the version bump and `CHANGELOG.md` entry.
3. agent-builder-webapp bumps `@weni/unnnic-system` and passes topics with `children`.

Rollback: consumers pin the previous minor. Because every addition is optional and flat lists are unchanged, rolling back the webapp does not require reverting this release, and reverting this release only breaks consumers that already pass `children` (they fall back to a flat list of parents).

## Constitution Alignment

| Principle | How this spec complies | Exception + justification |
|-----------|------------------------|---------------------------|
| IV. Versioned Contracts | Every addition is optional; minor bump to `3.37.0`; alpha prerelease first; flat snapshots unchanged. | none |
| V. Specification Traceability | Pinned to tag `015-audit-filters-v1.0.0`; inheritance section in the mandated format. The upstream webapp spec is still untracked, so it cannot be pinned yet. | Pending: pin `agent-builder-webapp` `specs/004-audit-conversation-filters` by commit once it is committed, before `/speckit-plan`. |
| VI. No Silent Divergence | FR-013 is recorded below and not implemented in a contradicting way until the amendment is decided. | none |
| VII. Commit Messages | Conventional, scoped commits per layer (`feat(MultiSelect): …`, `test(MultiSelect): …`, `docs(MultiSelect): …`). | none |
| VIII. Changelog Maintenance | `Unreleased` entries for Added (tree mode) and Changed (ellipsis), named in bold, above the current `3.36.0` heading; the release commit turns them into `3.37.0`. | none |
| X. Type Safety | New composable and changed composables in TypeScript; `TreeRow` and `CheckboxValue` typed; tests and stories stay JavaScript like their neighbours. | none |
| XI. Single Responsibility | Tree rules live in `useMultiSelectTree.ts`; `index.vue` and the composable each stay under 350 lines. | none |
| XII. Naming Conventions | `useMultiSelectTree.ts` camelCase; component files under the PascalCase exception. | Project exception (component folders and SFCs). |
| XIII. Component Architecture | New emit `update:expanded` follows Vue convention; handlers `handleToggleExpanded`, state `isTreeMode`, `isSearchActive`. | Project exception (emitted names without `on`). |
| XIV / XV. Styling and BEM | `$unnnic-space-*` and `$unnnic-icon-size-*` tokens only; classes `unnnic-multi-select__option-group`, `unnnic-multi-select-option--level-2`, `unnnic-multi-select-option__expand`. | none |
| XVI. State Management | Selection stays controlled by `modelValue`; only the visual expansion state is local. | none |
| XX. Testing | Behavior tests colocated in `__tests__/`; snapshot change limited to the option placeholder and explained. | none |
| XXI. Accessibility | `role="tree"` / `treeitem`, `aria-level`, `aria-checked="mixed"`, `aria-expanded`; chevron is a `<button type="button" tabindex="-1">` with a translated `aria-label`; keyboard per NFR-003. | none |
| XXII. Performance | No new dependency; computed state; collapsed children not rendered. | none |
| XXIII. Internationalization | `expand` and `collapse` added to `src/locales/en.json` only. | Project exception (localization lock): pt_br and es arrive through Crowdin after merge. |
| XXV. Maintainability | Search matching shared through `optionMatchesSearch` in `useSelectBase`; keyboard rules stay in `useSelectKeyboard`. | none |

## Implementation Decisions

- **Tree detection**: `isTreeMode` is `true` when any option has a non-empty `children` array. Mixed lists (topics plus "No matching topic") render leaves at level 1 with a spacer where the chevron would be, so labels align.
- **Value normalization**: the parent value is present in the emitted array if and only if all its enabled children are, so the webapp can read topics and subtopics from one flat array (FR-012).
- **Search matching**: today's lowercase `includes` over `itemLabel` and `itemValue`, for parents and children; no accent folding, to keep one matching rule across `UnnnicSelect` and `UnnnicMultiSelect`.
- **Expansion during search**: when `search` becomes non-empty, all parents in the result start expanded, and the user can collapse or expand them freely; collapses made during a search are kept while typing and discarded when the search is cleared, which restores the manual expansion state. Everything resets on close.
- **Keyboard**: ArrowUp/ArrowDown over `visibleRows`; ArrowRight expands a collapsed parent or moves to its first child; ArrowLeft collapses an expanded parent or moves from a child to its parent; Space and Enter toggle the focused row in tree mode. Keys typed in the search input are ignored by the row handlers.
- **Closed field**: comma-separated display items (fully checked parent once, partial parent's checked children), with ellipsis on overflow, for every `UnnnicMultiSelect`; the CSS is scoped to `.unnnic-multi-select__input` so `UnnnicSelect` and the search input are unaffected.
- **Infinite scroll**: unchanged; new pages append root options and are rendered as trees when they carry `children`.

## Divergences

- **FR-013 — closed topic field.** Inherited: with several topics or subtopics selected, the closed field MUST show the first item and the count of the rest ("Status do pedido +2") with an X to clear. Decided by the developer (2026-10-29): `UnnnicMultiSelect` keeps today's comma-separated labels, with ellipsis on overflow, and does not add a `selectionDisplay: 'summary'` mode. This contradicts FR-013, so this spec does not deliver the summary and the Topic filter cannot satisfy FR-013 until the amendment is decided. Amendment: to be opened in `vtex-cx-nexus-specs` against `015-audit-filters` (link pending), shared with the same divergence recorded in agent-builder-webapp `specs/004-audit-conversation-filters`. When it is approved and tagged, update `Pinned version`. If it is rejected, this spec is amended to add the summary mode. Nothing else in this spec depends on it; the X to clear is already delivered by `clearable`.

## Open Questions

None blocking. The pending items are tracked above: the FR-013 amendment link and pinning the webapp spec once it is committed.

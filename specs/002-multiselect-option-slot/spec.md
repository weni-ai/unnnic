# Engineering Specification: UnnnicMultiSelect custom option content (status tags)

**Repository**: unnnic (`@weni/unnnic-system`) — frontend

**Feature Branch**: `feat/multiselect-option-slot` (stacked on `feat/multiselect-tree-mode-impl`)

**Created**: 2026-11-17

**Status**: Draft

## Inheritance from Product Spec

- Product Spec: Novos filtros na aba Conversations do Audit (015-audit-filters) — https://github.com/weni-ai/vtex-cx-nexus-specs/blob/05e22e396efd0260e3d68ffdd5039eb3ec88bc9e/specs/015-audit-filters/spec.md
- Pinned version: tag `015-audit-filters-v1.0.0` (commit `05e22e396efd0260e3d68ffdd5039eb3ec88bc9e`)
- Architecture doc: none
- Inherited binding decisions: BD-001 (options inside one filter combine with OR); BD-002 (filtering is read-only); BD-005 (status applies on change). The reuse decisions of the Product Spec also bind this slice: status "reusa a seleção múltipla com caixas de seleção dos filtros atuais" and "Etiquetas de status […] reusam os da lista atual". BD-003, BD-004 and BD-006 do not constrain this repository.
- Scope of this spec: a scoped `#option` slot in `UnnnicMultiSelect` (flat and tree modes) that lets the consumer render custom content, such as an `UnnnicTag`, as the label of each option checkbox, consumed by the Status filter of agent-builder-webapp (FR-005).
- Divergences: none

## Scope in This Repository

**This repository implements**:

- A scoped `#option` slot in `UnnnicMultiSelect`, with the same slot props as the existing `#option` slot of `UnnnicSelect` (`option`, `label`, `active`, `focused`, `index`). `active` is widened to `boolean | 'less'`.
- The slot content renders as the clickable label of the option checkbox, so clicking the tag toggles the option, and the checkbox gets its accessible name from the content.
- Support in both modes: flat rows and tree rows (parents and children) from spec `001-multiselect-tree-mode`.
- An additive `#label` slot in `UnnnicCheckbox`, and a default slot in `UnnnicMultiSelectOption` that forwards to it.
- Row spacing that matches the Figma when the slot is used.
- A Storybook story that reproduces the Figma status filter, unit tests, and a changelog entry.

**Out of scope here**:

- The Status filter (`FilterStatus.vue`), its options, the status-to-color map and the reuse of the list tags: **agent-builder-webapp** (`specs/004-audit-conversation-filters`). The map already exists in `src/views/Supervisor/SupervisorConversations/ConversationsTable/ConversationRow.vue` (`statusProps`).
- Tags in the closed field. The Figma closed state (`3136:5026`) shows only the placeholder "All status". The closed field keeps the comma-separated labels from spec 001, and `UnnnicMultiSelect` gets no `#selected` slot.
- `UnnnicSelect` (single select). It already has an `#option` slot (`src/components/Select/index.vue`, `defineSlots`) and needs no change.
- A presentation field on `SelectOption` (for example `tag` or `scheme`); see [Rejected Alternatives](#rejected-alternatives).
- Changing the height of `UnnnicTag`; see [Implementation Decisions](#implementation-decisions).

**Depends on**:

- `feat/multiselect-tree-mode-impl` (spec `001-multiselect-tree-mode`): this slice builds on its `MultiSelectOption.vue`, `MultiSelectTreeOptions.vue` and `useMultiSelectRows.ts`.
- agent-builder-webapp: `specs/004-audit-conversation-filters` at commit `165db551d5aee5cdb841b4cf7ee2c0e0b742765e` describes `FilterStatus.vue` with plain text labels (`contracts/components.md`, "FilterStatus.vue"). The webapp spec must be amended to render `UnnnicTag` through `#option`. Pin that amendment commit here when it exists (Principle V).

## Current State

Paths refer to `feat/multiselect-tree-mode-impl`, the base of this branch.

- `src/components/MultiSelect/index.vue` (291 lines): `UnnnicMultiSelect`. In flat mode it renders `UnnnicMultiSelectOption` for each row of `visibleRows`, with `label` set to `String(row.option[itemLabel])`. In tree mode it delegates to `UnnnicMultiSelectTreeOptions` with `optionGroups`. It has no slots. The options container `.unnnic-multi-select__options` uses `gap: $unnnic-space-6`.
- `src/components/MultiSelect/MultiSelectTreeOptions.vue` (64 lines): internal tree renderer. It renders `UnnnicMultiSelectOption` per row with `role="treeitem"`, `aria-level`, `aria-checked` and `aria-expanded`, inside `.unnnic-multi-select__option-group` (`gap: $unnnic-space-4`).
- `src/components/MultiSelect/MultiSelectOption.vue` (101 lines): optional chevron button or spacer, then `UnnnicCheckbox` with `label`, `active: CheckboxValue`, `disabled`. It has no slots.
- `src/components/Checkbox/Checkbox.vue` (148 lines): a `<label>` that wraps the `<input type="checkbox">` and a `<p class="unnnic-checkbox__label">` for `label` or `textRight`. It has no slots. Tests: `src/components/Checkbox/Checkbox.spec.js`.
- `src/components/Select/index.vue`: `UnnnicSelect` already declares `defineSlots<{ option?: (props: { option; label; active: boolean; focused; index }) => unknown; selected?: … }>()` and forwards `#option` into `PopoverOption`. This is the reference contract for the new slot.
- `src/components/Select/types.ts`: `SelectOption` (with `children?` from spec 001) and `SelectBaseProps`.
- `src/composables/useMultiSelectRows.ts`: `OptionRow { option, parent, level, hasChildren, isExpanded, checkState, index }`, shared by flat and tree rendering.
- `src/composables/useSelectBase.ts`: `calcPopoverHeight` for `'multi'` assumes 22px rows and 24px gaps, and sets the popover `min-height` and `max-height` to that value.
- `src/components/Tag/Tag.vue` / `DefaultTag.vue`: `UnnnicTag` with `scheme` (`green`, `red`, `orange`, `blue`, `gray`, …) mapped to `--unnnic-color-bg-*-plain` / `bg-muted`, pill radius, `$unnnic-font-caption-1`. Size `medium` is 28px tall.
- `src/stories/MultiSelect.stories.js`: stories through `WithChildrenAndSearch` and `WithInfiniteScroll`. Tests: `src/components/MultiSelect/__tests__/MultiSelect.spec.js`, `MultiSelectOption.spec.js`, and snapshots.
- Nearest analogous feature: the `#option` slot of `UnnnicSelect`, an additive scoped slot that kept the default rendering unchanged.

## Technical Approach

### Components Affected

| Component | Change | Why |
|-----------|--------|-----|
| `src/components/Checkbox/Checkbox.vue` | modified | Add an optional `#label` slot, declared with `defineSlots`. When it is provided, the slot renders inside the `<label>` in a `<span class="unnnic-checkbox__label-slot">` in place of the `<p>`. Without the slot, the markup does not change. |
| `src/components/MultiSelect/MultiSelectOption.vue` | modified | Add an optional default slot that forwards to `UnnnicCheckbox #label` only when it is provided. |
| `src/components/MultiSelect/MultiSelectTreeOptions.vue` | modified | Accept an `option` slot and forward it to each row (parents and children) with the row slot props. |
| `src/components/MultiSelect/index.vue` | modified | Declare `defineSlots<{ option?: … }>()`. Forward `#option` to flat rows and to `UnnnicMultiSelectTreeOptions` only when the consumer provides it. Add the modifier `unnnic-multi-select__options--custom-option` (`gap: $unnnic-space-3`). |
| `src/composables/useMultiSelectRows.ts` | modified | Export `toOptionSlotProps(row, itemLabel, focusedIndex)`, so flat and tree rendering build the slot props in one place. |
| `src/components/Select/types.ts` | modified | Export `MultiSelectOptionSlotProps { option: SelectOption; label: string; active: CheckboxValue; focused: boolean; index: number }`. |
| `src/stories/MultiSelect.stories.js` | modified | Add a `WithOptionSlot` story with the five Audit statuses rendered as `UnnnicTag` (green, red, orange, blue, gray), matching Figma `3136:5416`. |
| `src/components/Checkbox/Checkbox.spec.js` | modified | Tests for the `#label` slot. |
| `src/components/MultiSelect/__tests__/MultiSelectOption.spec.js` | modified | Tests for the default slot forwarding. |
| `src/components/MultiSelect/__tests__/MultiSelect.spec.js` | modified | Tests for `#option` in flat and tree modes. Existing snapshots are unchanged. |
| `CHANGELOG.md` | modified | `Unreleased` → Added entries for `UnnnicMultiSelect` and `UnnnicCheckbox`. |

### Flow

1. **Consumer.** The webapp passes `#option="{ option, label }"` and renders `<UnnnicTag :text="label" :scheme="statusScheme(option.value)" />`, reusing the status-to-scheme map of its conversation list.
2. **Slot detection.** `index.vue` computes `hasOptionSlot = Boolean(slots.option)`. When it is `false`, every template branch is identical to today, which keeps the snapshots unchanged.
3. **Slot props.** For each rendered row, `toOptionSlotProps` returns `{ option: row.option, label: String(row.option[itemLabel] ?? ''), active: row.checkState, focused: focusedIndex === row.index, index: row.index }`. `active` is `true`, `false` or `'less'` (partial parent in tree mode).
4. **Flat render.** Each `UnnnicMultiSelectOption` receives `:customLabel="hasOptionSlot"` and a default slot with `<UnnnicMultiSelectSlotRender :render="slots.option" :slotProps="toOptionSlotProps(…)" />`.
5. **Tree render.** `UnnnicMultiSelectTreeOptions` receives `:renderOption="slots.option"` and renders each row in the same way. The chevron, indentation, ARIA attributes and `data-option-index` stay owned by the library.
6. **Checkbox.** `UnnnicMultiSelectOption` forwards its default slot to `UnnnicCheckbox #label`. Inside the native `<label>`, a click on the tag toggles the `<input>`. The existing `change` handler emits `update:model-value`, and `toggleOption` emits `update:modelValue` exactly as today.
7. **Spacing.** With the slot, the options container gets `unnnic-multi-select__options--custom-option` (`gap: $unnnic-space-3`, the 12px gap of the Figma). `calcPopoverHeight` does not change. Five 28px tag rows with 12px gaps (188px) fit in the 228px that `optionsLines: 5` reserves, so the five statuses show without scrolling.
8. **Unchanged paths.** Search still matches `itemLabel` and `itemValue`. Keyboard navigation and toggling still act on rows. The closed field still shows comma-separated labels. Infinite scroll still appends rows that receive the slot.

### Rejected Alternatives

- **Presentation field on `SelectOption` (`tag: { scheme }`, `scheme`) or an `itemTagScheme` prop**: couples the shared option type to one visual (`UnnnicTag`). It would make the library duplicate the status-to-color map that the webapp already owns, while the Product Spec requires reusing the list tags. Every new option visual (icon, avatar, counter) would then need another field.
- **A `variant="tag"` prop on `UnnnicMultiSelect`**: the same coupling. It also fixes tag size and color logic inside the library for a single consumer.
- **Rendering the slot next to the checkbox instead of inside its `<label>`**: clicking the tag would not toggle the option without extra click handling, and the checkbox would lose its accessible name.
- **Replacing the whole row with the slot (checkbox included)**: the consumer would re-implement checkbox states (`'less'`, disabled) and ARIA, and tree rows would lose the chevron and indentation that spec 001 standardizes.
- **Rendering the label as HTML (`v-html`)**: forbidden by Principle II, and it would not reuse `UnnnicTag`.
- **Changes to `UnnnicSelect`**: it already supports custom option content through `#option`.

## Contracts

| Interface | Change | Version impact | Backward compatible |
|-----------|--------|----------------|---------------------|
| `UnnnicMultiSelect` scoped slot `#option` `{ option, label, active: boolean \| 'less', focused, index }` | added | minor | yes. Without the slot, the render is identical. |
| `UnnnicCheckbox` slot `#label` | added | minor | yes. The `label` and `textRight` props behave as today when the slot is absent. |
| `UnnnicMultiSelectOption` default slot | added | minor | yes. Without the slot, the `label` prop is rendered. |
| Type `MultiSelectOptionSlotProps` (`src/components/Select/types.ts`) | added | minor | yes |
| CSS class `unnnic-multi-select__options--custom-option` | added | minor | yes. It is applied only with the slot. |

Release: in the same minor as the tree mode of spec 001 if that minor is not yet released, otherwise in the next minor. Before the stable release, a prerelease from a `*-staging` tag on the `alpha` dist-tag.

**Consumers affected**: agent-builder-webapp adopts the slot in `FilterStatus.vue` through a version bump. Its spec `004-audit-conversation-filters` must be amended (see Depends on). Any difference between the colors of its `ConversationRow.vue` map and the Figma (`AI-Assisted` green, `Not Assisted` red, `Transferred to human support` orange, `In progress` blue, `Not classified` gray) is resolved in the webapp. No other consumer is affected. An older library version ignores an unknown slot, so a consumer that passes `#option` to it gets plain text labels.

## Non-Functional Requirements

### Peak Load

No server-side load. The rendering peak is the same as in spec 001: the component MUST stay responsive with 550 options (50 parents × 10 children) open and searched, each rendered through the slot. The status filter has five options. The slot adds one consumer component per rendered row. Collapsed children are still not rendered, and slot props are built from the existing `computed` rows.

### Observability

The component logs nothing, and in particular no option labels or search text (Principle III). The consumer observes state through `update:modelValue`, `update:search` and the exposed `selectedItems` and `inputValue`. No correlation identifier applies.

### Failure Handling

There is no I/O. Without the slot, the text label renders. Empty slot content leaves the checkbox without a visible label. The story documents that slot content MUST carry text (`label`), so the checkbox keeps an accessible name. Interactive elements (buttons, links) inside the slot are not supported, because they would be nested in a `<label>`. The story and the slot JSDoc document this. Errors thrown by slot content propagate to the host's Vue error handler, as for any slot.

### Security and Authorization

The trust boundary is the consumer's props and slot content. The library renders slot content as Vue vnodes and the fallback label with text interpolation, with no `v-html`. No secrets and no authorization: access to the Audit list is enforced by the webapp and the backend (BD-002).

## Test Strategy

| Inherited success criterion | How this repository proves it |
|------------------------------|-------------------------------|
| SC-001 (filter combinations return the expected conversations by BD-001, FR-010 and FR-012; validates FR-005) | This repository owns only the guarantee that the slot does not change emitted values. `MultiSelect.spec.js › option slot`: clicking the slot content of two options emits the same `update:modelValue` arrays as clicking the plain labels (OR within the filter is then applied by the webapp and the backend); `returnObject` emits the same objects; a disabled option ignores clicks on its slot content. The combinations and conversation results are proven in agent-builder-webapp and nexus-conversations. |
| SC-002, SC-003, SC-004, SC-005 | Not owned by this repository (agents data, URL persistence, list latency, adoption). |

**Flow coverage**:

- Flat mode: render `#option` with an `UnnnicTag` for five options, then assert the tag text and that the slot receives `option`, `label`, `active`, `focused` and `index`. Click a tag and check that the option is selected and `active` becomes `true`. Click it again and check it is cleared. Search by label still filters the tagged rows. Keyboard ArrowDown and Enter toggle the focused tagged row.
- Tree mode: a partial parent receives `active: 'less'`, children render through the slot at level 2, and the chevron and `aria-*` attributes are still present.
- `UnnnicCheckbox`: the `#label` slot renders inside the `<label>`, and clicking it emits `update:model-value`. With `label` only, the `<p>` renders as before.

**Failure paths covered**: no slot (existing snapshots unchanged, no `--custom-option` class); disabled option with slot content (no emission); search with no match shows `without_results` with the slot provided; infinite scroll pages render through the slot.

**Stubbed at the boundary**: none beyond today's setup. `PopoverContent` is teleported, so tests query `document`. Existing snapshots of `MultiSelect`, `MultiSelectOption` and `Checkbox` MUST NOT change.

**Visual check**: compare Storybook `WithOptionSlot` against Figma `Audit`, nodes `3136:5416` (open: checkbox, `$unnnic-space-2` between checkbox and tag, `$unnnic-space-3` between rows, five rows without scroll) and `3136:5026` (closed: placeholder, unchanged).

## Rollout and Rollback

1. Create `feat/multiselect-option-slot` on top of `feat/multiselect-tree-mode-impl` in the Graphite stack, and merge it to `main` through its PR.
2. Publish a prerelease (`*-staging` tag, `alpha` dist-tag) so the webapp can integrate on staging.
3. Ship the stable release with the `CHANGELOG.md` entry.
4. agent-builder-webapp amends its spec, bumps `@weni/unnnic-system`, and passes `#option` in `FilterStatus.vue`.

Rollback: the webapp removes the slot usage or pins the previous version. Older versions ignore the slot and show text labels, so no data or behavior is lost. Reverting this release affects only consumers that pass `#option`, and they fall back to text labels.

## Constitution Alignment

| Principle | How this spec complies | Exception + justification |
|-----------|------------------------|---------------------------|
| II. Security and Secrets | No `v-html`. Slot content is vnodes, and the fallback uses text interpolation. | none |
| IV. Versioned Contracts | Every addition is optional, with a minor bump, a prerelease first and unchanged snapshots. | none |
| V. Specification Traceability | Pinned to tag `015-audit-filters-v1.0.0`, with the inheritance section in the mandated format. The webapp spec (`165db551`) does not yet request this slice. | Pending: pin the webapp spec amendment commit that adopts `#option` before `/speckit-plan`. |
| VI. No Silent Divergence | Nothing inherited is contradicted. The Product Spec reuse decision (list tags) is what drives a slot rather than a library-owned color map. | none |
| VII. Commit Messages | Scoped, atomic commits: `feat(Checkbox): add label slot`, `feat(MultiSelect): add option slot`, `test(MultiSelect): …`, `docs(MultiSelect): …`. | none |
| VIII. Changelog Maintenance | `Unreleased` → Added: **UnnnicMultiSelect** `#option` slot, **UnnnicCheckbox** `#label` slot. | none |
| IX. Code as Documentation | A comment in `Checkbox.vue` explains why the slot renders inside the `<label>` (click target and accessible name). Story descriptions are in English. | none |
| X. Type Safety | `defineSlots` types in `Checkbox.vue`, `MultiSelectOption.vue`, `MultiSelectTreeOptions.vue` and `index.vue`. `MultiSelectOptionSlotProps` is exported. Tests and stories stay JavaScript like their neighbours. | none |
| XI. Single Responsibility | `index.vue` grows by about 15 lines (under 350). Slot props are built once in `useMultiSelectRows.ts`. | none |
| XIII. Component Architecture | Slot name `option` matches `UnnnicSelect`. The internal component stays in `MultiSelect/`. | none |
| XIV / XV. Styling and BEM | Only the `$unnnic-space-3` and `$unnnic-space-2` tokens. New classes: `unnnic-multi-select__options--custom-option` and `unnnic-checkbox__label-slot`. | none |
| XVI. State Management | No new state. The slot reads row state derived from `modelValue`. | none |
| XX. Testing | Behavior tests colocated in the existing `__tests__/` and `Checkbox.spec.js`. Snapshots are unchanged. The story documents the new slot. | none |
| XXI. Accessibility | Slot content is the checkbox label, which provides the accessible name. Row keyboard handling and tree ARIA are unchanged. The tag shows its text, so color is not the only cue. | none |
| XXII. Performance | No new dependency. Slot props come from computed rows. | none |
| XXIII. Internationalization | No new library strings. Option labels come from the consumer. | none |
| XXV. Maintainability | Same slot contract as `UnnnicSelect`. One slot-props builder for flat and tree. The status color logic stays in the webapp, which already owns it. | none |

## Implementation Decisions

- **Slot instead of a data field**: the library offers a rendering seam and the consumer keeps the domain map (status to tag scheme). This follows the Product Spec reuse decision and the precedent of `UnnnicSelect #option`.
- **No <slot> element inside the popover content**: a <slot> forwarded inside PopoverContent changes when reka assigns ria-controls, which altered four existing MultiSelect snapshots. The slot function therefore travels through a prop to MultiSelectSlotRender.ts, and the snapshots stay unchanged. Found by bisecting index.vue during implementation.
- **Slot props parity**: same names as `UnnnicSelect` (`option`, `label`, `active`, `focused`, `index`). Only `active` is widened to `boolean | 'less'` for tree mode. `level` is not exposed; the consumer reads `option.children` if it needs it.
- **Slot placement**: inside the checkbox `<label>`, in a `<span class="unnnic-checkbox__label-slot">` (`display: inline-flex; min-width: 0`), so long tags can truncate with the `UnnnicTag` ellipsis in a narrow popover. A `<p>` wrapper is avoided because `UnnnicTag` renders block elements.
- **Disabled options**: the checkbox shows the disabled state and the native label ignores clicks. The library does not dim slot content; the consumer styles it if needed.
- **Row gap**: `$unnnic-space-3` only when the slot is used, matching the Figma 12px gap between tag rows. The gap without the slot stays `$unnnic-space-6`, and the tree group gap stays `$unnnic-space-4`.
- **Popover height**: unchanged. Tag rows with the 12px gap fit in the height that `optionsLines` reserves. No row-height prop is added, because slot content height is up to the consumer.
- **Tag height**: `UnnnicTag` medium is 28px and the Figma tag is 30px. This spec does not change `UnnnicTag`, because the change would affect every tag consumer. The 2px gap is accepted in the visual check and can be raised with Design separately.
- **Closed field**: unchanged (comma-separated labels, ellipsis from spec 001). The Figma closed state shows only the placeholder, and no consumer asks for tags there.

## Divergences

none

## Open Questions

None blocking. The pending item is tracked above: pin the agent-builder-webapp spec amendment that adopts `#option` in `FilterStatus.vue`.

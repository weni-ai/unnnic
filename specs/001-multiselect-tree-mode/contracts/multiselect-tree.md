# Contract: `UnnnicMultiSelect` tree mode (`@weni/unnnic-system` 3.37.0)

The public interface added by this feature. Every addition is optional, and flat
option lists render, emit and navigate exactly as in `3.36.0`.

## `UnnnicMultiSelect`

### Props

| Prop | Change | Notes |
|------|--------|-------|
| `options[].children` | added | `SelectOption[]`, one level. Tree mode turns on when any option has non-empty `children`. |

Every other prop is unchanged: `modelValue`, `options`, `itemLabel`, `itemValue`, `returnObject`, `enableSearch`, `search`, `clearable`, `disabled`, `placeholder`, `label`, `size`, `optionsLines`, `infiniteScroll*`.

### Events

| Event | Change | Payload |
|-------|--------|---------|
| `update:modelValue` | semantics added in tree mode | A flat array of values (or objects with `returnObject`). A fully checked parent contributes itself and its enabled children; a partial parent contributes only its checked children. |
| `update:search`, `scroll-end` | unchanged | — |

No slots are added. `selectionDisplay` and `#before-options` are **not** part of this contract (spec, Scope and Divergences).

### Closed field

- Comma-separated labels, ellipsized when they overflow (all modes).
- Tree mode: a fully checked parent appears once, without its children; a partial parent lists its checked children.

### Exposed members

Unchanged names. In tree mode, `selectedItems` returns the display items and `inputValue` their joined labels.

### Keyboard and ARIA (tree mode)

| Key | Behavior |
|-----|----------|
| ArrowUp / ArrowDown | Move over the visible rows. |
| ArrowRight | Expand a collapsed parent, or move to the first child of an expanded one. |
| ArrowLeft | Collapse an expanded parent, or move from a child to its parent. |
| Space / Enter | Toggle the focused row. |

- The list has `role="tree"` and `aria-multiselectable="true"`.
- Rows have `role="treeitem"`, `aria-level`, `aria-checked` (`true`, `false` or `mixed`), and `aria-expanded` on parents.
- The chevron is a `<button>` with `aria-expanded` and an `aria-label` from `expand` / `collapse`.

## `UnnnicMultiSelectOption`

| Prop / event | Change |
|--------------|--------|
| `active` | widened to `boolean \| 'less'` |
| `level` | added, `1 \| 2`, optional |
| `expandable`, `expanded` | added, `boolean`, default `false` |
| `update:expanded` | added, payload `boolean` |
| `update:modelValue` | unchanged name; emits `true` when `active` is `false` or `'less'` |

## Composables

| Export | Change |
|--------|--------|
| `useSelectBase` → `getOptionChildren(option)` | added |
| `useSelectBase` → `optionMatchesSearch(option, searchLower, itemLabel, itemValue)` | added |
| `useSelectKeyboard` options `onArrowRight`, `onArrowLeft` (may return a new focus index), `toggleOnSpace` | added |

## i18n

`expand`: "Expand", `collapse`: "Collapse" in `src/locales/en.json`. The other locales arrive through Crowdin.

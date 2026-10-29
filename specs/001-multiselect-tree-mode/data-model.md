# Data Model: UnnnicMultiSelect tree mode

Nothing is persisted. These are the in-memory shapes the component works with.

## SelectOption (extended)

| Field | Type | Rule |
|-------|------|------|
| `[itemLabel]` | `string` | Displayed label (default key `label`). |
| `[itemValue]` | `unknown` | Identity (default key `value`). MUST be unique across parents and children. |
| `disabled` | `boolean?` | A disabled option cannot be toggled, and parent toggles skip it. |
| `children` | `SelectOption[]?` | One level only. `[]` or absent means a leaf. Grandchildren are ignored. |

## OptionRow (internal, `useMultiSelectRows`)

| Field | Type | Rule |
|-------|------|------|
| `option` | `SelectOption` | The original option object from `options`; search never clones it. |
| `parent` | `SelectOption \| null` | `null` for level 1. |
| `level` | `1 \| 2` | `aria-level`. |
| `hasChildren` | `boolean` | Renders the chevron. |
| `isExpanded` | `boolean` | While searching, `true` unless the user collapsed it during the search; otherwise the manual state. |
| `checkState` | `boolean \| 'less'` | Derived; see the state rules below. |
| `index` | `number` | Position in `visibleRows`; `data-option-index` and keyboard focus. |

## Selection state

The rules below are pure functions in `src/lib/tree-selection.ts` over option values; `useMultiSelectSelection` converts `modelValue` to values and back (keeping the received objects with `returnObject`). A flat list follows the same rules, as leaves.

- `selectedValues` = the values in `modelValue`, plus the enabled children of every parent whose value is in `modelValue`.
- A parent's **driving children** are its enabled children, or all its children when every child is disabled.
- A parent's `checkState`:
  - `true` when every driving child is in `selectedValues`;
  - `'less'` when at least one child is;
  - `false` otherwise.
- A leaf's `checkState` is `true` when its value is in `selectedValues`.

## Transitions (one `update:modelValue` per user action)

| Action | Result |
|--------|--------|
| Check a parent | Add the parent and every enabled child. |
| Uncheck a parent (checked or `'less'` clicked) | `'less'` → check (same as checking). Checked → remove the parent and every enabled child. |
| Toggle a child | Add or remove it, then add the parent value when all driving children are present, or remove it otherwise. |
| Toggle a level-1 leaf | Add or remove it (flat behavior). |
| Clear (X) | `[]`. |

The base of every transition is `modelValue`, plus the implied children of R3, so unknown values are kept and implied children become explicit.

## Expansion state (`useTreeExpansion`)

- `expandedValues: Set<value>`, local to the component.
- Reset when the popover closes.
- `searchCollapsedValues: Set<value>`, used instead while `enableSearch && search` is set: every parent starts expanded, and the user's collapses during the search go here. It is discarded when the search starts or ends.

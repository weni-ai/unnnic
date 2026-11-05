# Quickstart: validate UnnnicMultiSelect tree mode

## Prerequisites

- Node 20 on `PATH` (on this machine, `C:\Program Files\nodejs`).
- `npm install` done at the repository root.

## Automated checks

```bash
npx vitest run src/components/MultiSelect src/components/Select
npm run lint
npm run type-check
npm run build
```

Expected:
- All tests pass.
- Flat `MultiSelect.spec.js.snap` and `Select` snapshots are unchanged.
- `MultiSelectOption.spec.js.snap` only gains the conditional chevron placeholder.

## Manual check (Storybook)

```bash
npm run storybook
```

Open **Form/MultiSelect**:

1. **WithChildren**: parents start collapsed. Expand a topic, check one subtopic, and the parent shows indeterminate. Check the rest, and the parent shows checked. The closed field shows the parent label once, and the leaves (Unclassified, Other) align with the parents.
2. **WithChildrenAndSearch**: type part of a subtopic; its parent appears expanded with only the matching children, and its chevron still collapses and expands it. Type a parent label, and all its children show. Clear the search, and the manual expansion comes back. Close and reopen, and everything is collapsed.
3. Keyboard (popover open): ArrowDown to a parent → ArrowRight (expands) → ArrowRight (first child) → Space (toggles) → ArrowLeft (to parent) → ArrowLeft (collapses) → Enter (toggles parent). Typing a space in the search field does not toggle a row.
4. Select many items: the closed field ends with an ellipsis, and the X clears everything.
5. **Default**, **WithSearch**, **WithInfiniteScroll**: unchanged behavior.

Compare 1 and 2 against Figma `Audit`, nodes `3137:22064` and `3137:22216`. See [contracts/multiselect-tree.md](contracts/multiselect-tree.md) for the expected interface.

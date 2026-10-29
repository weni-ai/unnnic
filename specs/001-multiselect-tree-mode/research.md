# Research: UnnnicMultiSelect tree mode

No `NEEDS CLARIFICATION` remained in the Technical Context. The decisions below
settle the points the spec leaves to the plan.

## R1. Reuse of the stashed prototype

- **Decision**: Reuse the prototype stashed as `multiselect tree mode (pre golden path)` (`stash@{0}`; the new composable is in `stash@{0}^3`) as the starting point, applying the corrections in R2–R6 and leaving out its `pt_br.json` and `es.json` edits.
- **Rationale**: It already implements most of the spec (tree rows, chevron, ARIA, search over the tree, keyboard options, ellipsis, stories, tests). Rewriting it would add risk without changing the result.
- **Alternatives considered**: Rewriting from scratch (slower, same design); applying the stash as is (violates the spec on R2–R6 and the localization lock).

## R2. Search filter scope

- **Decision**: `useSelectBase` stays flat and accepts an optional `filterOptions` strategy; only `UnnnicMultiSelect` passes the tree filter (`filterTreeOptions`). The matching rule stays in `useSelectBase` and is injected (`matchesSearch`).
- **Rationale**: The prototype changed the filter for both variants. The spec keeps `UnnnicSelect` unchanged (Contracts, Rejected Alternatives). A strategy keeps the shared composable free of tree knowledge and of a `variant` branch, and the tree filter returns the original options instead of clones.
- **Alternatives considered**: Branching on `variant === 'multi'` inside `useSelectBase` (the shared composable learns about children); a separate matching rule in the tree layer (duplicates it, against Principle XXV).

## R3. Check state and normalization over enabled children

- **Decision**: The children that drive a parent's state are its enabled children, or all of them when every child is disabled. A parent is checked when all of those children are selected, `'less'` when any child is selected, and unchecked otherwise. A parent value in `modelValue` implies its enabled children: they show checked, and the next emission includes them. The parent value is emitted if and only if all of those children are present.
- **Rationale**: The spec's Flow (step 5) and Failure Handling (incoming parent value without children). The prototype counted every child, including disabled ones, so a parent with a disabled unchecked child could never be fully checked. It also ignored a parent value that arrived without its children.
- **Alternatives considered**: Counting disabled children (a parent can get stuck partial); dropping a parent value that arrives without its children (loses state the consumer restored from a URL).

## R4. Keyboard: ArrowRight on an expanded parent

- **Decision**: `onArrowRight` may return a new index, like `onArrowLeft`. On an expanded parent it returns the index of the first child.
- **Rationale**: Spec Implementation Decisions (Keyboard). In the prototype, ArrowRight only expanded.
- **Alternatives considered**: none; this follows the WAI-ARIA tree pattern.

## R5. File size of `index.vue`

- **Decision**: Move the tree list markup and its `aria-checked` mapping into an internal `src/components/MultiSelect/MultiSelectTreeOptions.vue` (not exported), and the rows and arrow handlers into `useMultiSelectRows` (see R8). Rows carry a precomputed `checkState`.
- **Rationale**: Applied directly, the prototype brings `index.vue` from 321 to about 430 lines, past the 350-line limit (Principle XI). The tree list is a cohesive unit with its own markup, ARIA and styles.
- **Alternatives considered**: Keeping it inline and justifying it (avoidable); exporting the new component publicly (no consumer needs it, and it would widen the contract).

## R6. Localization

- **Decision**: Add `expand` and `collapse` to `src/locales/en.json` only.
- **Rationale**: The localization lock (`AGENTS.md`, `crowdin.yml`, constitution Principle XXIII). The prototype also edited `pt_br.json` and `es.json`.
- **Alternatives considered**: none.

## R7. Testing seams

- **Decision**: Extend `MultiSelect.spec.js` (tree mode `describe`) and `MultiSelectOption.spec.js`. Query the teleported popover through `document`, and drive rows through `findAllComponents(UnnnicMultiSelectOption)`. Add one `Select.spec.js` case proving that `children` does not change `UnnnicSelect` search. Unit-test the pure rules in `src/lib/__tests__/tree-selection.spec.ts`.
- **Rationale**: These are the seams the prototype already validated. The `Select` case guards R2. Pure functions are tested directly, like `teleport-target`; `src/utils/**` is excluded from Vitest, so the rules live in `src/lib`.
- **Alternatives considered**: Standalone composable tests (the repository tests composables through their components).

## R8. Layering of the selection rules

- **Decision**: Pure rules over option values in `src/lib/tree-selection.ts`; `useMultiSelectSelection` adapts `modelValue` to them for flat and tree lists alike; `useMultiSelectRows` builds rows and arrow handlers; `useTreeExpansion` owns the expansion state. `index.vue` only wires them and keeps the flat markup under `v-else`, fed by the same rows.
- **Rationale**: A flat list is a tree of leaves, so one selection path removes the mode branching from `index.vue` (selection, check state, keyboard). Value-based rules do not depend on `returnObject` and are unit-testable without mounting. Flat behavior and snapshots stay identical; the one kept difference is the closed field of a flat `returnObject` list, which shows `modelValue` as received so selected objects missing from `options` (infinite scroll) still show.
- **Alternatives considered**: A single `useMultiSelectTree` composable with separate flat code in `index.vue` (the first implementation: two selection paths and mode checks in the component); a strategy object per mode (two implementations of the same rules).

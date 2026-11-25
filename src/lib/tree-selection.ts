/**
 * Pure selection rules for options with one level of children.
 * Rules work on option values (`option[itemValue]`); converting them from and
 * to a component model is the caller's job. Options without children are
 * leaves, so a flat list follows the same rules.
 */
import type { CheckboxValue } from '../components/Checkbox/Checkbox.vue';
import type { SelectOption } from '../components/Select/types';

export type GetOptionValue = (option: SelectOption) => unknown;
export type OptionMatcher = (option: SelectOption) => boolean;

export function getOptionChildren(option: SelectOption): SelectOption[] {
  return Array.isArray(option.children) ? option.children : [];
}

export function hasOptionChildren(option: SelectOption) {
  return getOptionChildren(option).length > 0;
}

export function isTreeOptions(options: SelectOption[]) {
  return options.some(hasOptionChildren);
}

export function flattenTreeOptions(options: SelectOption[]) {
  return options.flatMap((option) => [option, ...getOptionChildren(option)]);
}

/**
 * Children that decide whether a parent is fully checked. Disabled children
 * are skipped so they cannot keep a parent partial forever, unless every
 * child is disabled.
 */
export function getDrivingChildren(parent: SelectOption) {
  const children = getOptionChildren(parent);
  const enabled = children.filter((child) => !child.disabled);
  return enabled.length ? enabled : children;
}

/** Roots kept by a search: the matching ones and those with a matching child. */
export function filterTreeOptions(
  options: SelectOption[],
  matches: OptionMatcher,
) {
  return options.filter(
    (option) => matches(option) || getOptionChildren(option).some(matches),
  );
}

/** Children shown under a kept root: all of them when the root matches. */
export function getVisibleChildren(
  option: SelectOption,
  matches: OptionMatcher,
) {
  const children = getOptionChildren(option);
  return matches(option) ? children : children.filter(matches);
}

/**
 * A parent value received without its children (e.g. restored from a URL)
 * implies its enabled children, so they count as selected.
 */
export function withImpliedChildren(
  options: SelectOption[],
  values: unknown[],
  getValue: GetOptionValue,
) {
  const explicit = new Set(values);
  const implied = options
    .filter((option) => explicit.has(getValue(option)))
    .flatMap(getOptionChildren)
    .filter((child) => !child.disabled && !explicit.has(getValue(child)))
    .map(getValue);

  return [...values, ...implied];
}

export function getCheckState(
  option: SelectOption,
  selected: Set<unknown>,
  getValue: GetOptionValue,
): CheckboxValue {
  const isSelected = (item: SelectOption) => selected.has(getValue(item));
  const children = getOptionChildren(option);

  if (!children.length) return isSelected(option);
  if (getDrivingChildren(option).every(isSelected)) return true;
  return children.some(isSelected) ? 'less' : false;
}

function findParent(
  options: SelectOption[],
  option: SelectOption,
  getValue: GetOptionValue,
) {
  const value = getValue(option);
  return options.find((root) =>
    getOptionChildren(root).some((child) => getValue(child) === value),
  );
}

/** The parent value is present only while all its driving children are. */
function syncParentValue(
  parent: SelectOption,
  values: unknown[],
  getValue: GetOptionValue,
) {
  const parentValue = getValue(parent);
  const selected = new Set(values);
  const rest = values.filter((value) => value !== parentValue);
  const isFull = getDrivingChildren(parent).every((child) =>
    selected.has(getValue(child)),
  );

  return isFull ? [...rest, parentValue] : rest;
}

/**
 * Checks or unchecks an option. A parent toggles its enabled children; a
 * child or leaf toggles itself. `values` must already include implied
 * children; values unknown to `options` are kept.
 */
export function toggleOptionValue(
  options: SelectOption[],
  values: unknown[],
  option: SelectOption,
  checked: boolean,
  getValue: GetOptionValue,
) {
  const isParent = hasOptionChildren(option);
  const parent = isParent ? option : findParent(options, option, getValue);
  const toggled = isParent
    ? getOptionChildren(option).filter((child) => !child.disabled)
    : [option];
  const toggledValues = toggled.map(getValue);

  const next = values.filter((value) => !toggledValues.includes(value));
  if (checked) next.push(...toggledValues);

  return parent ? syncParentValue(parent, next, getValue) : next;
}

/** Selected options in tree order, where a full parent replaces its children. */
export function getDisplayOptions(
  options: SelectOption[],
  selected: Set<unknown>,
  getValue: GetOptionValue,
) {
  const isSelected = (item: SelectOption) => selected.has(getValue(item));

  return options.flatMap((option) => {
    if (!hasOptionChildren(option)) return isSelected(option) ? [option] : [];
    if (getCheckState(option, selected, getValue) === true) return [option];
    return getOptionChildren(option).filter(isSelected);
  });
}

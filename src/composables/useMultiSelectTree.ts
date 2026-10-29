/**
 * Tree selection, expansion and closed-field display for MultiSelect.
 * One level of children. Options without children stay leaf nodes.
 */
import { computed, ref, watch, type ComputedRef } from 'vue';
import type { CheckboxValue } from '../components/Checkbox/Checkbox.vue';
import type { SelectOption } from '../components/Select/types';
import { getOptionChildren } from './useSelectBase';

type ModelItem = SelectOption | unknown;

export interface UseMultiSelectTreeProps {
  options: SelectOption[];
  modelValue: ModelItem[];
  itemValue: string;
  itemLabel: string;
  returnObject: boolean;
  search: string;
  enableSearch: boolean;
}

export interface TreeRow {
  option: SelectOption;
  parent: SelectOption | null;
  level: 1 | 2;
  hasChildren: boolean;
  isExpanded: boolean;
  checkState: CheckboxValue;
  index: number;
}

function optionHasChildren(option: SelectOption) {
  return getOptionChildren(option).length > 0;
}

/**
 * Children that decide whether a parent is fully checked. Disabled children
 * are skipped so they cannot keep a parent partial forever, unless every
 * child is disabled.
 */
function getDrivingChildren(parent: SelectOption) {
  const children = getOptionChildren(parent);
  const enabled = children.filter((child) => !child.disabled);
  return enabled.length ? enabled : children;
}

export function toAriaChecked(state: CheckboxValue) {
  if (state === 'less') return 'mixed';
  return state ? 'true' : 'false';
}

export function useMultiSelectTree(
  props: UseMultiSelectTreeProps,
  emit: (event: 'update:modelValue', value: ModelItem[]) => void,
  filteredOptions: ComputedRef<SelectOption[]>,
) {
  const expandedValues = ref(new Set<unknown>());
  /**
   * While searching, parents start expanded and the user may still collapse
   * them; this set is discarded when the search starts or ends, so the manual
   * expansion is back once the search is cleared.
   */
  const searchCollapsedValues = ref(new Set<unknown>());

  const isTreeMode = computed(() => props.options.some(optionHasChildren));

  const isSearchActive = computed(
    () => props.enableSearch && Boolean(props.search),
  );

  watch(isSearchActive, () => {
    searchCollapsedValues.value = new Set();
  });

  function getOptionValue(option: SelectOption) {
    return option[props.itemValue];
  }

  function getModelItemValue(item: ModelItem) {
    return props.returnObject ? (item as SelectOption)[props.itemValue] : item;
  }

  function toModelItem(option: SelectOption): ModelItem {
    return props.returnObject ? option : getOptionValue(option);
  }

  const treeIndex = computed(() => {
    const optionByValue = new Map<unknown, SelectOption>();
    const parentByValue = new Map<unknown, SelectOption>();

    for (const option of props.options) {
      optionByValue.set(getOptionValue(option), option);

      for (const child of getOptionChildren(option)) {
        optionByValue.set(getOptionValue(child), child);
        parentByValue.set(getOptionValue(child), option);
      }
    }

    return { optionByValue, parentByValue };
  });

  /**
   * A parent value received without its children (e.g. restored from a URL)
   * implies its enabled children, so they show checked and are emitted next.
   */
  const impliedChildren = computed(() => {
    const explicit = new Set(props.modelValue.map(getModelItemValue));
    const implied: SelectOption[] = [];

    for (const option of props.options) {
      if (!explicit.has(getOptionValue(option))) continue;

      for (const child of getOptionChildren(option)) {
        if (!child.disabled && !explicit.has(getOptionValue(child))) {
          implied.push(child);
        }
      }
    }

    return implied;
  });

  const selectedValues = computed(
    () =>
      new Set([
        ...props.modelValue.map(getModelItemValue),
        ...impliedChildren.value.map(getOptionValue),
      ]),
  );

  function isSelected(option: SelectOption, values = selectedValues.value) {
    return values.has(getOptionValue(option));
  }

  function resolveOption(option: SelectOption) {
    return treeIndex.value.optionByValue.get(getOptionValue(option)) ?? option;
  }

  function getCheckState(option: SelectOption): CheckboxValue {
    const original = resolveOption(option);
    const children = getOptionChildren(original);

    if (!children.length) return isSelected(original);
    if (getDrivingChildren(original).every((child) => isSelected(child))) {
      return true;
    }
    return children.some((child) => isSelected(child)) ? 'less' : false;
  }

  function isOptionExpanded(option: SelectOption) {
    const value = getOptionValue(option);
    return isSearchActive.value
      ? !searchCollapsedValues.value.has(value)
      : expandedValues.value.has(value);
  }

  const optionGroups = computed(() => {
    const groups: TreeRow[][] = [];
    let index = 0;

    for (const option of filteredOptions.value) {
      const hasChildren = optionHasChildren(option);
      const isExpanded = hasChildren && isOptionExpanded(option);

      const group: TreeRow[] = [
        {
          option,
          parent: null,
          level: 1,
          hasChildren,
          isExpanded,
          checkState: getCheckState(option),
          index: index++,
        },
      ];

      if (isExpanded) {
        for (const child of getOptionChildren(option)) {
          group.push({
            option: child,
            parent: option,
            level: 2,
            hasChildren: false,
            isExpanded: false,
            checkState: getCheckState(child),
            index: index++,
          });
        }
      }

      groups.push(group);
    }

    return groups;
  });

  const visibleRows = computed(() => optionGroups.value.flat());

  function toggleOption(option: SelectOption, selected: boolean) {
    const original = resolveOption(option);
    const parent = treeIndex.value.parentByValue.get(getOptionValue(original));
    const children = getOptionChildren(original);
    const affected = children.length
      ? [original, ...children.filter((child) => !child.disabled)]
      : [original];

    const affectedValues = new Set(affected.map(getOptionValue));
    let next = [
      ...props.modelValue,
      ...impliedChildren.value.map(toModelItem),
    ].filter((item) => !affectedValues.has(getModelItemValue(item)));

    if (selected) next.push(...affected.map(toModelItem));

    const parentToNormalize = children.length ? original : parent;
    if (parentToNormalize) {
      const values = new Set(next.map(getModelItemValue));
      const isFull = getDrivingChildren(parentToNormalize).every((child) =>
        isSelected(child, values),
      );
      const parentValue = getOptionValue(parentToNormalize);

      next = next.filter((item) => getModelItemValue(item) !== parentValue);
      if (isFull) next.push(toModelItem(parentToNormalize));
    }

    emit('update:modelValue', next);
  }

  function toggleExpanded(option: SelectOption, expanded?: boolean) {
    const value = getOptionValue(option);
    const shouldExpand = expanded ?? !isOptionExpanded(option);
    const target = isSearchActive.value
      ? searchCollapsedValues
      : expandedValues;
    const next = new Set(target.value);
    const shouldAdd = isSearchActive.value ? !shouldExpand : shouldExpand;

    if (shouldAdd) next.add(value);
    else next.delete(value);

    target.value = next;
  }

  function resetExpanded() {
    expandedValues.value = new Set();
    searchCollapsedValues.value = new Set();
  }

  /** ArrowRight: expand a collapsed parent, or move into its first child. */
  function handleArrowRight(index: number): number | void {
    const row = visibleRows.value[index];
    if (!row?.hasChildren) return;

    if (!row.isExpanded) {
      toggleExpanded(row.option, true);
      return;
    }

    return index + 1;
  }

  /** ArrowLeft: collapse an expanded parent, or move from a child to it. */
  function handleArrowLeft(index: number): number | void {
    const row = visibleRows.value[index];
    if (!row) return;

    if (row.hasChildren && row.isExpanded) {
      toggleExpanded(row.option, false);
      return;
    }

    if (!row.parent) return;

    const parentValue = getOptionValue(row.parent);
    const parentIndex = visibleRows.value.findIndex(
      (item) => item.level === 1 && getOptionValue(item.option) === parentValue,
    );
    return parentIndex >= 0 ? parentIndex : undefined;
  }

  /** Closed-field items: a full parent replaces its children. */
  const displayItems = computed(() =>
    props.options.flatMap((option) => {
      if (!optionHasChildren(option)) {
        return isSelected(option) ? [option] : [];
      }
      if (getCheckState(option) === true) return [option];
      return getOptionChildren(option).filter((child) => isSelected(child));
    }),
  );

  return {
    isTreeMode,
    optionGroups,
    visibleRows,
    getCheckState,
    toggleOption,
    toggleExpanded,
    resetExpanded,
    handleArrowRight,
    handleArrowLeft,
    displayItems,
  };
}

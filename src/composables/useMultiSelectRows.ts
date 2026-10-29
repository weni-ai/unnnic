/**
 * Rows MultiSelect renders and navigates: one group per root, followed by its
 * children while expanded. A flat list produces one leaf row per option.
 */
import { computed, toValue, type MaybeRefOrGetter } from 'vue';
import type { CheckboxValue } from '../components/Checkbox/Checkbox.vue';
import type { SelectOption } from '../components/Select/types';
import { getVisibleChildren, type OptionMatcher } from '../lib/tree-selection';
import { useTreeExpansion } from './useTreeExpansion';

export interface OptionRow {
  option: SelectOption;
  parent: SelectOption | null;
  level: 1 | 2;
  hasChildren: boolean;
  isExpanded: boolean;
  checkState: CheckboxValue;
  index: number;
}

export interface UseMultiSelectRowsProps {
  itemValue: string;
}

export interface UseMultiSelectRowsSources {
  filteredOptions: MaybeRefOrGetter<SelectOption[]>;
  isSearchActive: MaybeRefOrGetter<boolean>;
  matchesSearch: OptionMatcher;
  getCheckState: (option: SelectOption) => CheckboxValue;
}

export function useMultiSelectRows(
  props: UseMultiSelectRowsProps,
  {
    filteredOptions,
    isSearchActive,
    matchesSearch,
    getCheckState,
  }: UseMultiSelectRowsSources,
) {
  const expansion = useTreeExpansion(isSearchActive);

  function getValue(option: SelectOption) {
    return option[props.itemValue];
  }

  const optionGroups = computed(() => {
    let index = 0;

    return toValue(filteredOptions).map((option): OptionRow[] => {
      const children = getVisibleChildren(option, matchesSearch);
      const hasChildren = children.length > 0;
      const isExpanded = hasChildren && expansion.isExpanded(getValue(option));

      const root: OptionRow = {
        option,
        parent: null,
        level: 1,
        hasChildren,
        isExpanded,
        checkState: getCheckState(option),
        index: index++,
      };

      if (!isExpanded) return [root];

      return [
        root,
        ...children.map(
          (child): OptionRow => ({
            option: child,
            parent: option,
            level: 2,
            hasChildren: false,
            isExpanded: false,
            checkState: getCheckState(child),
            index: index++,
          }),
        ),
      ];
    });
  });

  const visibleRows = computed(() => optionGroups.value.flat());

  function toggleExpanded(option: SelectOption, expanded?: boolean) {
    expansion.setExpanded(getValue(option), expanded);
  }

  /** ArrowRight: expand a collapsed parent, or move into its first child. */
  function handleArrowRight(index: number): number | void {
    const row = visibleRows.value[index];
    if (!row?.hasChildren) return;
    if (row.isExpanded) return index + 1;

    toggleExpanded(row.option, true);
  }

  /** ArrowLeft: collapse an expanded parent, or move from a child to it. */
  function handleArrowLeft(index: number): number | void {
    const row = visibleRows.value[index];
    if (!row) return;

    if (row.isExpanded) {
      toggleExpanded(row.option, false);
      return;
    }

    if (!row.parent) return;
    return visibleRows.value.findIndex((item) => item.option === row.parent);
  }

  return {
    optionGroups,
    visibleRows,
    toggleExpanded,
    resetExpanded: expansion.reset,
    handleArrowRight,
    handleArrowLeft,
  };
}

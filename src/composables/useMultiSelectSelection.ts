/**
 * MultiSelect selection for flat and tree options: adapts the component model
 * (values or objects, per `returnObject`) to the pure rules in tree-selection.
 */
import { computed } from 'vue';
import type { SelectOption } from '../components/Select/types';
import {
  flattenTreeOptions,
  getCheckState as getOptionCheckState,
  getDisplayOptions,
  isTreeOptions,
  toggleOptionValue,
  withImpliedChildren,
} from '../lib/tree-selection';

type ModelItem = SelectOption | unknown;

export interface UseMultiSelectSelectionProps {
  options: SelectOption[];
  modelValue: ModelItem[];
  itemValue: string;
  returnObject: boolean;
}

export function useMultiSelectSelection(
  props: UseMultiSelectSelectionProps,
  emit: (event: 'update:modelValue', value: ModelItem[]) => void,
) {
  const isTreeMode = computed(() => isTreeOptions(props.options));

  function getValue(option: SelectOption) {
    return option[props.itemValue];
  }

  /** A single value is still accepted, as earlier versions tolerated it. */
  const modelItems = computed<ModelItem[]>(() =>
    Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue],
  );

  const modelValues = computed(() =>
    props.returnObject
      ? (modelItems.value as SelectOption[]).map(getValue)
      : modelItems.value,
  );

  const selectedValues = computed(() =>
    withImpliedChildren(props.options, modelValues.value, getValue),
  );

  const selectedSet = computed(() => new Set(selectedValues.value));

  /** Keeps the received objects, so values unknown to `options` survive. */
  function toModelItems(values: unknown[]): ModelItem[] {
    if (!props.returnObject) return values;

    const items = [
      ...flattenTreeOptions(props.options),
      ...(modelItems.value as SelectOption[]),
    ];
    const itemByValue = new Map(items.map((item) => [getValue(item), item]));
    return values.map((value) => itemByValue.get(value));
  }

  function getCheckState(option: SelectOption) {
    return getOptionCheckState(option, selectedSet.value, getValue);
  }

  function toggleOption(option: SelectOption, checked: boolean) {
    const values = toggleOptionValue(
      props.options,
      selectedValues.value,
      option,
      checked,
      getValue,
    );
    emit('update:modelValue', toModelItems(values));
  }

  function toggle(option: SelectOption) {
    if (option.disabled) return;
    toggleOption(option, getCheckState(option) !== true);
  }

  /**
   * Closed-field items. Flat `returnObject` lists show the model as received,
   * so selected objects missing from `options` (e.g. with infinite scroll)
   * still show.
   */
  const displayItems = computed<SelectOption[]>(() => {
    if (props.returnObject && !isTreeMode.value) {
      return props.modelValue as SelectOption[];
    }
    return getDisplayOptions(props.options, selectedSet.value, getValue);
  });

  return { isTreeMode, getCheckState, toggleOption, toggle, displayItems };
}

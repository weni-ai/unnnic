/**
 * Shared logic for Select and MultiSelect: popover, dimensions and search filter.
 */
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import { useElementSize } from '@vueuse/core';
import type {
  SelectOption,
  SelectPopoverHeightParams,
} from '../components/Select/types';

export type SelectVariant = 'single' | 'multi';

export type SelectOptionMatcher = (option: SelectOption) => boolean;

export interface UseSelectBaseOptions {
  /** Picks the options kept by a search. Defaults to the matching options. */
  filterOptions?: (
    options: SelectOption[],
    matches: SelectOptionMatcher,
  ) => SelectOption[];
}

export interface UseSelectBaseProps {
  options: SelectOption[];
  itemLabel: string;
  itemValue: string;
  enableSearch: boolean;
  search: string;
  optionsLines: number;
}

/**
 * Ref from useTemplateRef: trigger element or component instance (e.g. UnnnicInput).
 * useElementSize accepts both (resolves $el when ref is a component).
 */
export type SelectTriggerRef = Ref<HTMLElement | null>;
/** Ref from useTemplateRef: content container element. */
export type SelectContentRef = Ref<HTMLElement | null>;

export function useSelectBase(
  props: UseSelectBaseProps,
  variant: SelectVariant,
  triggerRef: SelectTriggerRef,
  contentRef: SelectContentRef,
  {
    filterOptions = (options, matches) => options.filter(matches),
  }: UseSelectBaseOptions = {},
) {
  const openPopover = ref(false);

  const { width: inputWidth } = useElementSize(triggerRef);
  const inputWidthString = computed(() => `${inputWidth.value}px`);

  const isSearchActive = computed(
    () => props.enableSearch && Boolean(props.search),
  );

  /** Every option matches while the search is inactive. */
  function matchesSearch(option: SelectOption) {
    if (!isSearchActive.value) return true;
    const searchLower = props.search.toLowerCase();

    const matchLabel = String(option[props.itemLabel] ?? '')
      .toLowerCase()
      .includes(searchLower);

    const matchValue = String(option[props.itemValue] ?? '')
      .toLowerCase()
      .includes(searchLower);

    return matchLabel || matchValue;
  }

  const filteredOptions = computed(() =>
    isSearchActive.value
      ? filterOptions(props.options, matchesSearch)
      : props.options,
  );

  function calcPopoverHeight(params: SelectPopoverHeightParams): string {
    const {
      optionsLength,
      optionsLines,
      enableSearch,
      variant: variantType,
    } = params;

    if (optionsLength === 0) return 'unset';

    if (variantType === 'single') {
      const popoverPadding = 32;
      const popoverGap = 4;
      const fieldsHeight = 37 * optionsLines;
      const gapsCompensation = enableSearch ? 1 : 2;
      const size =
        fieldsHeight +
        popoverPadding +
        (popoverGap * optionsLines - gapsCompensation);
      return `${enableSearch ? size + 45 + 1 : size}px`;
    }

    const popoverSearchGap = enableSearch ? 16 : 0;
    const popoverGap = 24;
    const fieldsHeight = 22 * optionsLines;
    const size = fieldsHeight + (popoverGap * optionsLines - 2);
    return `${enableSearch ? size + 51 + popoverSearchGap : size}px`;
  }

  const calculatedPopoverHeight = computed(() =>
    calcPopoverHeight({
      optionsLength: props.options?.length ?? 0,
      optionsLines: props.optionsLines,
      enableSearch: props.enableSearch,
      variant,
    }),
  );

  const popoverContentCustomStyles = computed(() => {
    const emptyFiltered = filteredOptions.value?.length === 0;
    const height = calculatedPopoverHeight.value;
    return {
      overflow: 'auto' as const,
      display: 'flex' as const,
      flexDirection: 'column' as const,
      minHeight: height,
      maxHeight: emptyFiltered ? 'unset' : height,
      height: emptyFiltered ? height : 'unset',
    };
  });

  return {
    openPopover,
    triggerRef,
    contentRef,
    inputWidthString,
    calculatedPopoverHeight,
    popoverContentCustomStyles,
    isSearchActive,
    matchesSearch,
    filteredOptions,
  };
}

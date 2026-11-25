/**
 * Shared keyboard navigation for Select and MultiSelect
 * (ArrowUp, ArrowDown, Enter, optional ArrowRight, ArrowLeft and Space).
 * Binds keydown to document when popover is open and unbinds when closed.
 */
import {
  ref,
  nextTick,
  watch,
  onBeforeUnmount,
  toValue,
  type MaybeRefOrGetter,
  type Ref,
} from 'vue';
import type { SelectOption } from '../components/Select/types';

const DATA_OPTION_INDEX = 'data-option-index';

export interface UseSelectKeyboardOptions<
  T extends SelectOption = SelectOption,
> {
  closeOnSelect?: boolean;
  closePopover: () => void;
  openPopoverRef: Ref<boolean>;
  /** May return the index to focus next. */
  onArrowRight?: (index: number, option: T) => number | void;
  /** May return the index to focus next. */
  onArrowLeft?: (index: number, option: T) => number | void;
  toggleOnSpace?: MaybeRefOrGetter<boolean>;
}

function isEditableTarget(event: KeyboardEvent) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return false;
  if (target.closest('input, textarea, button, [contenteditable="true"]')) {
    return true;
  }
  return target.isContentEditable;
}

export function useSelectKeyboard<T extends SelectOption>(
  getFilteredOptions: () => T[],
  onSelectOption: (option: T) => void,
  options: UseSelectKeyboardOptions<T>,
) {
  const {
    closeOnSelect = true,
    closePopover,
    openPopoverRef,
    onArrowRight,
    onArrowLeft,
    toggleOnSpace = false,
  } = options;
  const focusedOptionIndex = ref(-1);

  function scrollToOption(
    index: number,
    behavior: 'smooth' | 'instant' = 'smooth',
    block: 'center' | 'start' | 'end' | 'nearest' = 'center',
  ) {
    nextTick(() => {
      const option = document.querySelector(
        `[${DATA_OPTION_INDEX}="${index}"]`,
      );
      option?.scrollIntoView?.({ behavior, block });
    });
  }

  function selectFocusedOption() {
    const list = getFilteredOptions();
    const option = list[focusedOptionIndex.value];
    if (focusedOptionIndex.value < 0 || !option) return;
    if (option.disabled) return;
    onSelectOption(option);
    if (closeOnSelect) closePopover();
  }

  function handleKeyDown(event: KeyboardEvent) {
    const list = getFilteredOptions();

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (focusedOptionIndex.value <= 0) return;
      focusedOptionIndex.value--;
      scrollToOption(focusedOptionIndex.value);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (focusedOptionIndex.value >= list.length - 1) return;
      focusedOptionIndex.value++;
      scrollToOption(focusedOptionIndex.value);
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      selectFocusedOption();
      return;
    }

    const horizontalHandler =
      event.key === 'ArrowRight'
        ? onArrowRight
        : event.key === 'ArrowLeft'
          ? onArrowLeft
          : undefined;

    if (horizontalHandler) {
      if (isEditableTarget(event)) return;
      event.preventDefault();
      const option = list[focusedOptionIndex.value];
      if (!option) return;
      const nextIndex = horizontalHandler(focusedOptionIndex.value, option);
      if (typeof nextIndex === 'number' && nextIndex >= 0) {
        focusedOptionIndex.value = nextIndex;
        scrollToOption(nextIndex);
      }
      return;
    }

    if (event.key === ' ' && toValue(toggleOnSpace)) {
      if (isEditableTarget(event)) return;
      event.preventDefault();
      selectFocusedOption();
    }
  }

  function onDocumentKeyDown(e: KeyboardEvent) {
    if (!openPopoverRef.value) return;
    handleKeyDown(e);
  }

  function bindKeydown() {
    document.addEventListener('keydown', onDocumentKeyDown);
  }

  function unbindKeydown() {
    document.removeEventListener('keydown', onDocumentKeyDown);
  }

  function setupKeydownBinding() {
    watch(openPopoverRef, (isOpen) => {
      if (isOpen) nextTick(bindKeydown);
      else unbindKeydown();
    });
    watch(
      () => getFilteredOptions().length,
      (length) => {
        if (focusedOptionIndex.value >= length) {
          focusedOptionIndex.value = length - 1;
        }
      },
    );
    onBeforeUnmount(unbindKeydown);
  }

  return {
    focusedOptionIndex,
    scrollToOption,
    handleKeyDown,
    setupKeydownBinding,
  };
}

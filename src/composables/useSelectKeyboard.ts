/**
 * Shared keyboard navigation for Select and MultiSelect (ArrowUp, ArrowDown, Enter).
 * Binds keydown to document when popover is open and unbinds when closed.
 */
import { ref, nextTick, watch, onBeforeUnmount, type Ref } from 'vue';
import type { SelectOption } from '../components/Select/types';

const DATA_OPTION_INDEX = 'data-option-index';

export interface UseSelectKeyboardOptions {
  closeOnSelect?: boolean;
  closePopover: () => void;
  openPopoverRef: Ref<boolean>;
}

export function useSelectKeyboard<T extends SelectOption>(
  getFilteredOptions: () => T[],
  onSelectOption: (option: T) => void,
  options: UseSelectKeyboardOptions,
) {
  const { closeOnSelect = true, closePopover, openPopoverRef } = options;
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

  function handleKeyDown(event: KeyboardEvent) {
    const validKeys = ['ArrowUp', 'ArrowDown', 'Enter'];
    if (!validKeys.includes(event.key)) return;

    event.preventDefault();
    const list = getFilteredOptions();

    if (event.key === 'ArrowUp') {
      if (focusedOptionIndex.value <= 0) return;
      focusedOptionIndex.value--;
      scrollToOption(focusedOptionIndex.value);
    } else if (event.key === 'ArrowDown') {
      if (focusedOptionIndex.value >= list.length - 1) return;
      focusedOptionIndex.value++;
      scrollToOption(focusedOptionIndex.value);
    } else if (
      event.key === 'Enter' &&
      focusedOptionIndex.value >= 0 &&
      list[focusedOptionIndex.value]
    ) {
      const option = list[focusedOptionIndex.value];
      if (option?.disabled) return;
      onSelectOption(option);
      if (closeOnSelect) closePopover();
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
    onBeforeUnmount(unbindKeydown);
  }

  return {
    focusedOptionIndex,
    scrollToOption,
    handleKeyDown,
    setupKeydownBinding,
  };
}

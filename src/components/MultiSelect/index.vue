<template>
  <div class="unnnic-multi-select">
    <Popover
      :open="openPopover"
      @update:open="setOpenPopover"
    >
      <PopoverTrigger class="w-full">
        <UnnnicInput
          ref="multiSelectInputRef"
          :modelValue="inputValue"
          class="unnnic-multi-select__input"
          readonly
          useFocusProp
          :focus="openPopover"
          :size="props.size"
          :placeholder="props.placeholder"
          :label="props.label"
          :errors="props.errors"
          :message="props.message"
          :iconRight="openPopover ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          :disabled="props.disabled"
          :showClear="!!selectedItems.length && props.clearable"
          @clear="emit('update:modelValue', [])"
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        class="h-full"
        :style="popoverContentCustomStyles"
        :width="inputWidthString"
      >
        <div
          ref="contentRef"
          class="unnnic-multi-select__content"
        >
          <UnnnicInput
            v-if="props.enableSearch"
            class="unnnic-multi-select__input-search"
            :modelValue="props.search"
            :placeholder="$t('search')"
            iconLeft="search"
            @update:model-value="handleSearch"
          />
          <p
            v-if="filteredOptions.length === 0"
            class="unnnic-multi-select__content-no-results"
          >
            {{ $t('without_results') }}
          </p>
          <template v-else>
            <UnnnicMultiSelectTreeOptions
              v-if="isTreeMode"
              :groups="optionGroups"
              :itemLabel="props.itemLabel"
              :itemValue="props.itemValue"
              :focusedIndex="focusedOptionIndex"
              @select="toggleOption"
              @expand="toggleExpanded"
            />
            <div
              v-else
              class="unnnic-multi-select__options"
            >
              <UnnnicMultiSelectOption
                v-for="row in visibleRows"
                :key="String(row.option[props.itemValue])"
                :data-option-index="row.index"
                :label="String(row.option[props.itemLabel] ?? '')"
                :active="row.checkState"
                :focused="focusedOptionIndex === row.index"
                :disabled="row.option.disabled"
                @update:model-value="toggleOption(row.option, $event)"
              />
            </div>
            <div
              v-if="props.infiniteScroll && infiniteScrollLoading"
              class="unnnic-multi-select__infinite-loading"
            >
              <UnnnicIconLoading
                scheme="fg-base"
                size="sm"
              />
            </div>
          </template>
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, useTemplateRef } from 'vue';

import { useInfiniteScroll } from '@vueuse/core';

import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import UnnnicInput from '../Input/Input.vue';
import UnnnicIconLoading from '../IconLoading/IconLoading.vue';
import UnnnicMultiSelectOption from './MultiSelectOption.vue';
import UnnnicMultiSelectTreeOptions from './MultiSelectTreeOptions.vue';

import { useSelectBase } from '../../composables/useSelectBase';
import { useSelectKeyboard } from '../../composables/useSelectKeyboard';
import { useMultiSelectSelection } from '../../composables/useMultiSelectSelection';
import { useMultiSelectRows } from '../../composables/useMultiSelectRows';
import { filterTreeOptions } from '../../lib/tree-selection';
import type { SelectBaseProps, SelectOption } from '../Select/types';

defineOptions({
  name: 'UnnnicMultiSelect',
});

interface MultiSelectProps extends SelectBaseProps {
  modelValue: (SelectOption | unknown)[];
  infiniteScroll?: boolean;
  infiniteScrollDistance?: number;
  infiniteScrollCanLoadMore?: () => boolean;
}

const props = withDefaults(defineProps<MultiSelectProps>(), {
  size: 'md',
  type: 'normal',
  placeholder: '',
  optionsLines: 5,
  returnObject: false,
  itemLabel: 'label',
  itemValue: 'value',
  locale: 'en',
  enableSearch: false,
  disabled: false,
  label: '',
  errors: '',
  message: '',
  search: '',
  clearable: false,
  infiniteScroll: false,
  infiniteScrollDistance: 10,
  infiniteScrollCanLoadMore: () => true,
});

const emit = defineEmits<{
  'update:modelValue': [value: (SelectOption | unknown)[]];
  'update:search': [value: string];
  'scroll-end': [];
}>();

const multiSelectInputRef = useTemplateRef<HTMLElement>('multiSelectInputRef');
const contentRef = useTemplateRef<HTMLDivElement>('contentRef');

const base = useSelectBase(props, 'multi', multiSelectInputRef, contentRef, {
  filterOptions: filterTreeOptions,
});

const openPopover = base.openPopover;
const popoverContentCustomStyles = base.popoverContentCustomStyles;
const inputWidthString = base.inputWidthString;
const filteredOptions = base.filteredOptions;

const {
  isTreeMode,
  getCheckState,
  toggleOption,
  toggle,
  displayItems: selectedItems,
} = useMultiSelectSelection(props, emit);

const {
  optionGroups,
  visibleRows,
  toggleExpanded,
  resetExpanded,
  handleArrowRight,
  handleArrowLeft,
} = useMultiSelectRows(props, {
  filteredOptions: base.filteredOptions,
  isSearchActive: base.isSearchActive,
  matchesSearch: base.matchesSearch,
  getCheckState,
});

function setOpenPopover(value: boolean) {
  base.openPopover.value = value;
}

const inputValue = computed(() =>
  selectedItems.value.map((item) => item[props.itemLabel]).join(', '),
);

function handleSearch(value: string) {
  emit('update:search', value);
}

const keyboard = useSelectKeyboard<SelectOption>(
  () => visibleRows.value.map((row) => row.option),
  toggle,
  {
    closeOnSelect: false,
    closePopover: () => setOpenPopover(false),
    openPopoverRef: base.openPopover,
    toggleOnSpace: isTreeMode,
    onArrowRight: handleArrowRight,
    onArrowLeft: handleArrowLeft,
  },
);

keyboard.setupKeydownBinding();

const focusedOptionIndex = keyboard.focusedOptionIndex;

const infiniteScrollLoading = ref(false);

function canLoadMoreInfiniteScroll(el?: unknown) {
  if (
    !props.infiniteScroll ||
    !base.openPopover.value ||
    infiniteScrollLoading.value ||
    !props.infiniteScrollCanLoadMore()
  ) {
    return false;
  }

  if (!el || typeof el !== 'object' || !('clientHeight' in el)) return false;
  return (el as HTMLElement).clientHeight > 0;
}

const scrollElement = computed(
  () =>
    (contentRef.value?.closest('.unnnic-popover') as HTMLElement | null) ??
    contentRef.value,
);

const { reset: resetInfiniteScrollObserver } = useInfiniteScroll(
  scrollElement,
  () => {
    if (infiniteScrollLoading.value) return;
    infiniteScrollLoading.value = true;
    emit('scroll-end');
  },
  {
    distance: props.infiniteScrollDistance,
    canLoadMore: canLoadMoreInfiniteScroll,
  },
);

watch(base.openPopover, (isOpen) => {
  if (!isOpen) {
    handleSearch('');
    infiniteScrollLoading.value = false;
    resetExpanded();
    return;
  }

  keyboard.focusedOptionIndex.value = -1;
  if (props.infiniteScroll) {
    nextTick(() => resetInfiniteScrollObserver());
  }
});

function finishInfiniteScroll() {
  infiniteScrollLoading.value = false;
  if (base.openPopover.value && props.infiniteScroll) {
    nextTick(() => resetInfiniteScrollObserver());
  }
}

function resetInfiniteScroll() {
  infiniteScrollLoading.value = false;
  nextTick(() => resetInfiniteScrollObserver());
}

defineExpose({
  openPopover,
  setOpenPopover,
  filteredOptions,
  calculatedPopoverHeight: base.calculatedPopoverHeight,
  selectedItems,
  inputValue,
  infiniteScrollLoading,
  finishInfiniteScroll,
  resetInfiniteScroll,
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
@use '../Select/select-shared' as shared;

:deep(.unnnic-multi-select__input) {
  @include shared.select-input-trigger;
  @include shared.select-input-ellipsis;
}

:deep(.unnnic-multi-select__input-search) {
  @include shared.select-input-search;
}

.unnnic-multi-select {
  &__content {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    gap: $unnnic-space-4;

    height: -webkit-fill-available;

    &-no-results {
      @include shared.select-content-no-results;
    }
  }

  &__options {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: $unnnic-space-6;
  }

  &__infinite-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $unnnic-space-2 0;
    min-height: $unnnic-space-10;
  }
}
</style>

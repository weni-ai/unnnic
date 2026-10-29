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
              v-if="tree.isTreeMode.value"
              :groups="tree.optionGroups.value"
              :itemLabel="props.itemLabel"
              :itemValue="props.itemValue"
              :focusedIndex="focusedOptionIndex"
              @select="handleSelectOption"
              @expand="tree.toggleExpanded"
            />
            <div
              v-else
              class="unnnic-multi-select__options"
            >
              <UnnnicMultiSelectOption
                v-for="(option, index) in filteredOptions"
                :key="String(option[props.itemValue])"
                :data-option-index="index"
                :label="String(option[props.itemLabel] ?? '')"
                :active="getActivatedOptionStatus(option)"
                :focused="focusedOptionIndex === index"
                :disabled="option.disabled"
                @update:model-value="handleSelectOption(option, $event)"
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
import { useMultiSelectTree } from '../../composables/useMultiSelectTree';
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

const base = useSelectBase(props, 'multi', multiSelectInputRef, contentRef);

const openPopover = base.openPopover;
const popoverContentCustomStyles = base.popoverContentCustomStyles;
const inputWidthString = base.inputWidthString;
const filteredOptions = base.filteredOptions;

const tree = useMultiSelectTree(props, emit, base.filteredOptions);

function setOpenPopover(value: boolean) {
  base.openPopover.value = value;
}

const selectedItems = computed<SelectOption[]>(() => {
  if (tree.isTreeMode.value) return tree.displayItems.value;

  if (props.returnObject) return props.modelValue as SelectOption[];

  const valueIds = props.modelValue.slice();
  return props.options.filter((option) =>
    valueIds.includes(option[props.itemValue]),
  );
});

const inputValue = computed(() =>
  selectedItems.value.map((item) => item[props.itemLabel]).join(', '),
);

function handleSearch(value: string) {
  emit('update:search', value);
}

function getActivatedOptionStatus(option: SelectOption) {
  if (props.returnObject) {
    return (props.modelValue as SelectOption[]).some(
      (item) => item[props.itemValue] === option[props.itemValue],
    );
  }
  return props.modelValue.includes(option[props.itemValue]);
}

function handleSelectOption(option: SelectOption, selected: boolean) {
  if (tree.isTreeMode.value) return tree.toggleOption(option, selected);

  const optionValue = option[props.itemValue];
  const value = selected
    ? [...props.modelValue, props.returnObject ? option : optionValue]
    : props.modelValue.filter((item) =>
        props.returnObject
          ? (item as SelectOption)[props.itemValue] !== optionValue
          : item !== optionValue,
      );
  emit('update:modelValue', value);
}

const keyboard = useSelectKeyboard<SelectOption>(
  () =>
    tree.isTreeMode.value
      ? tree.visibleRows.value.map((row) => row.option)
      : base.filteredOptions.value,
  (option) => {
    if (option.disabled) return;
    const active = tree.isTreeMode.value
      ? tree.getCheckState(option)
      : getActivatedOptionStatus(option);
    handleSelectOption(option, active !== true);
  },
  {
    closeOnSelect: false,
    closePopover: () => setOpenPopover(false),
    openPopoverRef: base.openPopover,
    toggleOnSpace: () => tree.isTreeMode.value,
    onArrowRight: (index) =>
      tree.isTreeMode.value ? tree.handleArrowRight(index) : undefined,
    onArrowLeft: (index) =>
      tree.isTreeMode.value ? tree.handleArrowLeft(index) : undefined,
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
    tree.resetExpanded();
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

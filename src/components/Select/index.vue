<template>
  <div class="unnnic-select">
    <Popover
      :open="openPopover"
      @update:open="setOpenPopover"
    >
      <PopoverTrigger class="w-full">
        <section
          v-if="hasSelectedSlot && selectedItem"
          ref="selectInputRef"
          class="unnnic-select__trigger-wrapper"
        >
          <span
            v-if="props.label"
            class="unnnic-select__trigger-label"
          >
            {{ props.label }}
          </span>
          <section
            :class="[
              'unnnic-select__trigger',
              `unnnic-select__trigger--${props.size}`,
              {
                'unnnic-select__trigger--focused': openPopover,
                'unnnic-select__trigger--disabled': props.disabled,
              },
            ]"
          >
            <section class="unnnic-select__trigger-content">
              <slot
                name="selected"
                :option="selectedItem"
                :label="inputValue as string"
              />
            </section>
            <UnnnicIcon
              v-if="props.clearable && !props.disabled"
              class="unnnic-select__trigger-clear"
              icon="close"
              size="ant"
              scheme="fg-base"
              clickable
              @click.stop="emit('update:modelValue', '')"
            />
            <UnnnicIcon
              class="unnnic-select__trigger-arrow"
              :icon="openPopover ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              size="ant"
              scheme="fg-base"
            />
          </section>
        </section>
        <UnnnicInput
          v-else
          ref="selectInputRef"
          :modelValue="inputValue as string"
          class="unnnic-select__input"
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
          :showClear="!!selectedItem && props.clearable"
          @clear="emit('update:modelValue', '')"
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        :class="'h-full'"
        :style="popoverContentCustomStyles"
        :width="inputWidthString"
      >
        <div
          ref="contentRef"
          class="unnnic-select__content"
        >
          <UnnnicInput
            v-if="props.enableSearch"
            class="unnnic-select__input-search"
            :modelValue="props.search"
            :placeholder="$t('search')"
            iconLeft="search"
            @update:model-value="handleSearch"
          />
          <p
            v-if="filteredOptions.length === 0"
            class="unnnic-select__content-no-results"
          >
            {{ $t('without_results') }}
          </p>
          <template v-else>
            <PopoverOption
              v-for="(option, index) in filteredOptions"
              :key="option[props.itemValue] as string"
              :data-option-index="index"
              data-testid="select-option"
              :label="option[props.itemLabel] as string"
              :active="
                option[props.itemValue] === selectedItem?.[props.itemValue]
              "
              :focused="focusedOptionIndex === index"
              :disabled="option.disabled"
              @click="handleSelectOption(option)"
            >
              <template
                v-if="$slots.option"
                #default
              >
                <slot
                  name="option"
                  :option="option"
                  :label="option[props.itemLabel] as string"
                  :active="
                    option[props.itemValue] === selectedItem?.[props.itemValue]
                  "
                  :focused="focusedOptionIndex === index"
                  :index="index"
                />
              </template>
            </PopoverOption>
            <div
              v-if="props.infiniteScroll && infiniteScrollLoading"
              class="unnnic-select__infinite-loading"
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
import {
  computed,
  ref,
  watch,
  nextTick,
  onBeforeUnmount,
  useTemplateRef,
  useSlots,
} from 'vue';

import { useInfiniteScroll } from '@vueuse/core';

import UnnnicInput from '../Input/Input.vue';
import UnnnicIcon from '../Icon.vue';
import UnnnicIconLoading from '../IconLoading/IconLoading.vue';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverOption,
} from '../ui/popover/index';

import { useSelectBase } from '../../composables/useSelectBase';
import { useSelectKeyboard } from '../../composables/useSelectKeyboard';

import type { SelectBaseProps, SelectOption } from './types';

defineOptions({
  name: 'UnnnicSelect',
});

interface SelectProps extends SelectBaseProps {
  modelValue: SelectOption | unknown;
  infiniteScroll?: boolean;
  infiniteScrollDistance?: number;
  infiniteScrollCanLoadMore?: () => boolean;
}

const props = withDefaults(defineProps<SelectProps>(), {
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
  clearable: false,
  label: '',
  errors: '',
  message: '',
  search: '',
  infiniteScroll: false,
  infiniteScrollDistance: 10,
  infiniteScrollCanLoadMore: () => true,
});

const emit = defineEmits<{
  'update:modelValue': [value: SelectOption | unknown];
  'update:search': [value: string];
  'scroll-end': [];
}>();

defineSlots<{
  option?: (props: {
    option: SelectOption;
    label: string;
    active: boolean;
    focused: boolean;
    index: number;
  }) => unknown;
  selected?: (props: { option: SelectOption; label: string }) => unknown;
}>();

const slots = useSlots();
const hasSelectedSlot = computed(() => !!slots.selected);

const selectInputRef = useTemplateRef<HTMLElement>('selectInputRef');
const contentRef = useTemplateRef<HTMLDivElement>('contentRef');

const base = useSelectBase(props, 'single', selectInputRef, contentRef);

const openPopover = base.openPopover;
const popoverContentCustomStyles = base.popoverContentCustomStyles;
const inputWidthString = base.inputWidthString;
const filteredOptions = base.filteredOptions;

function setOpenPopover(value: boolean) {
  base.openPopover.value = value;
}

const selectedItem = computed((): SelectOption | undefined => {
  if (props.returnObject) {
    if (props.modelValue == null || props.modelValue === '') return undefined;
    return props.modelValue as SelectOption;
  }

  return props.options.find(
    (option) => option[props.itemValue] === props.modelValue,
  );
});

const inputValue = computed(() => selectedItem.value?.[props.itemLabel]);

function handleSelectOption(option: SelectOption) {
  if (
    option[props.itemValue] === selectedItem.value?.[props.itemValue] ||
    option.disabled
  )
    return;
  emit(
    'update:modelValue',
    props.returnObject ? option : option[props.itemValue],
  );
  base.openPopover.value = false;
}

const keyboard = useSelectKeyboard<SelectOption>(
  () => base.filteredOptions.value,
  handleSelectOption,
  {
    closeOnSelect: true,
    closePopover: () => (base.openPopover.value = false),
    openPopoverRef: base.openPopover,
  },
);

keyboard.setupKeydownBinding();

const focusedOptionIndex = keyboard.focusedOptionIndex;

watch(base.openPopover, () => {
  if (!base.openPopover.value) {
    handleSearch('');
  } else {
    keyboard.focusedOptionIndex.value = -1;
    if (props.modelValue) {
      const selectedOptionIndex = props.options.findIndex(
        (option) =>
          option[props.itemValue] === selectedItem.value?.[props.itemValue],
      );
      keyboard.scrollToOption(selectedOptionIndex, 'instant', 'center');
    }
    if (props.infiniteScroll) {
      nextTick(() => setupInfiniteScroll());
    }
  }
});

const infiniteScrollReset = ref<(() => void) | null>(null);
const infiniteScrollLoading = ref(false);

function setupInfiniteScroll() {
  if (!props.infiniteScroll) return;
  if (infiniteScrollReset.value) {
    infiniteScrollReset.value();
    infiniteScrollReset.value = null;
  }
  nextTick(() => {
    const scrollElement = base.contentRef.value;
    if (!scrollElement) return;
    const { reset } = useInfiniteScroll(
      scrollElement,
      () => {
        if (!infiniteScrollLoading.value) {
          infiniteScrollLoading.value = true;
          emit('scroll-end');
        }
      },
      {
        distance: props.infiniteScrollDistance,
        canLoadMore: () =>
          props.infiniteScrollCanLoadMore() && !infiniteScrollLoading.value,
      },
    );
    infiniteScrollReset.value = reset;
  });
}

function finishInfiniteScroll() {
  infiniteScrollLoading.value = false;
  if (base.openPopover.value && props.infiniteScroll) {
    nextTick(() => setupInfiniteScroll());
  }
}

function resetInfiniteScroll() {
  infiniteScrollLoading.value = false;
  if (infiniteScrollReset.value) infiniteScrollReset.value();
  if (base.openPopover.value && props.infiniteScroll) {
    nextTick(() => setupInfiniteScroll());
  }
}

function handleSearch(value: string) {
  emit('update:search', value);
}

onBeforeUnmount(() => {
  if (infiniteScrollReset.value) infiniteScrollReset.value();
});

defineExpose({
  openPopover,
  setOpenPopover,
  filteredOptions,
  calculatedPopoverHeight: base.calculatedPopoverHeight,
  selectedItem,
  inputValue,
  infiniteScrollLoading,
  finishInfiniteScroll,
  resetInfiniteScroll,
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
@use './select-shared' as shared;

:deep(.unnnic-select__input) {
  @include shared.select-input-trigger;
}

:deep(.unnnic-select__input-search) {
  @include shared.select-input-search;
}

.unnnic-select {
  &__trigger-wrapper {
    display: flex;
    flex-direction: column;
    gap: $unnnic-space-1;
    width: 100%;
    text-align: left;
    font: $unnnic-font-body;
  }

  &__trigger-label {
    font: $unnnic-font-body;
    color: $unnnic-color-fg-base;
  }

  &__trigger {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: $unnnic-space-2;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    box-sizing: border-box;

    background: $unnnic-color-bg-base;
    border: 1px solid $unnnic-color-border-base;
    border-radius: $unnnic-radius-2;
    padding: $unnnic-space-3 $unnnic-space-4;
    height: 45px;

    transition: border-color 0.1s ease-in-out;

    &--sm {
      padding: $unnnic-space-2 $unnnic-space-4;
      height: 37px;
    }

    &--focused {
      border-color: $unnnic-color-border-accent-strong;
    }

    &--disabled {
      cursor: not-allowed;
      border-color: $unnnic-color-border-muted;
      background-color: $unnnic-color-bg-muted;
    }

    &-content {
      flex: 1 1 0;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: $unnnic-space-2;
      overflow: hidden;
      font: $unnnic-font-body;
      color: $unnnic-color-fg-emphasized;
    }

    &-clear,
    &-arrow {
      flex-shrink: 0;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    gap: $unnnic-space-1;

    height: -webkit-fill-available;

    &-no-results {
      @include shared.select-content-no-results;
    }
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

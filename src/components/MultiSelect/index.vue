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
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, useTemplateRef } from 'vue';

import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import UnnnicInput from '../Input/Input.vue';
import UnnnicMultiSelectOption from './MultiSelectOption.vue';

import { useSelectBase } from '../../composables/useSelectBase';
import { useSelectKeyboard } from '../../composables/useSelectKeyboard';
import type { SelectBaseProps, SelectOption } from '../Select/types';

defineOptions({
  name: 'UnnnicMultiSelect',
});

interface MultiSelectProps extends SelectBaseProps {
  modelValue: (SelectOption | unknown)[];
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
});

const emit = defineEmits<{
  'update:modelValue': [value: (SelectOption | unknown)[]];
  'update:search': [value: string];
}>();

const multiSelectInputRef = useTemplateRef<HTMLElement>('multiSelectInputRef');
const contentRef = useTemplateRef<HTMLElement>('contentRef');

const base = useSelectBase(props, 'multi', multiSelectInputRef, contentRef);

const openPopover = base.openPopover;
const popoverContentCustomStyles = base.popoverContentCustomStyles;
const inputWidthString = base.inputWidthString;
const filteredOptions = base.filteredOptions;

function setOpenPopover(value: boolean) {
  base.openPopover.value = value;
}

const selectedItems = computed<SelectOption[]>(() => {
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
  if (selected) {
    const value = props.returnObject
      ? [...props.modelValue, option]
      : [...props.modelValue, option[props.itemValue]];
    emit('update:modelValue', value);
  } else {
    const value = props.returnObject
      ? (props.modelValue as SelectOption[]).filter(
          (item) => item[props.itemValue] !== option[props.itemValue],
        )
      : props.modelValue.filter((item) => item !== option[props.itemValue]);
    emit('update:modelValue', value);
  }
}

const keyboard = useSelectKeyboard<SelectOption>(
  () => base.filteredOptions.value,
  (option) => {
    if (option.disabled) return;
    const active = getActivatedOptionStatus(option);
    handleSelectOption(option, !active);
  },
  {
    closeOnSelect: false,
    closePopover: () => (base.openPopover.value = false),
    openPopoverRef: base.openPopover,
  },
);

keyboard.setupKeydownBinding();

const focusedOptionIndex = keyboard.focusedOptionIndex;

watch(openPopover, () => {
  if (!base.openPopover.value) {
    handleSearch('');
  } else {
    keyboard.focusedOptionIndex.value = -1;
  }
});

defineExpose({
  openPopover,
  setOpenPopover,
  filteredOptions,
  calculatedPopoverHeight: base.calculatedPopoverHeight,
  selectedItems,
  inputValue,
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
@use '../Select/select-shared' as shared;

:deep(.unnnic-multi-select__input) {
  @include shared.select-input-trigger;
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
}
</style>

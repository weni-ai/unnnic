<template>
  <div class="unnnic-multi-select">
    <Popover
      :open="openPopover"
      @update:open="openPopover = $event"
    >
      <PopoverTrigger>
        <UnnnicInput
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
          :showClear="!!selectedItems.length"
          @clear="emit('update:modelValue', [])"
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        :style="{ maxHeight: calculatedMaxHeight, overflow: 'auto' }"
      >
        <div class="unnnic-multi-select__content">
          <UnnnicInput
            v-if="props.enableSearch"
            class="unnnic-multi-select__input-search"
            :modelValue="props.search"
            :placeholder="$t('search')"
            iconLeft="search"
            @update:model-value="handleSearch"
          />
          <div class="unnnic-multi-select__options">
            <UnnnicMultiSelectOption
              v-for="(option, index) in filteredOptions"
              :key="option[props.itemValue]"
              :data-option-index="index"
              :label="option[props.itemLabel]"
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
import { computed, ref } from 'vue';

import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import UnnnicInput from '../Input/Input.vue';
import UnnnicMultiSelectOption from './MultSelectOption.vue';

defineOptions({
  name: 'UnnnicMultiSelect',
});

interface MultiSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Array<{ [key: string]: any }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue: any[];
  returnObject?: boolean;
  itemLabel?: string;
  itemValue?: string;
  placeholder?: string;
  label?: string;
  type?: 'normal' | 'error';
  errors?: string | Array<string>;
  message?: string;
  size?: 'sm' | 'md';
  optionsLines?: number;
  enableSearch?: boolean;
  search?: string;
  locale?: string;
  disabled?: boolean;
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
});

const openPopover = ref(false);

const calculatedMaxHeight = computed(() => {
  if (!props.options || props.options.length === 0) return 'unset';
  const popoverSearchGap = props.enableSearch ? 16 : 0;
  const popoverGap = 24;
  const fieldsHeight = 22 * props.optionsLines;
  const size = fieldsHeight + (popoverGap * props.optionsLines - 2);
  return `${props.enableSearch ? size + 51 + popoverSearchGap : size}px`;
});

const emit = defineEmits<{
  'update:modelValue': [unknown[]];
  'update:search': [string];
}>();

const focusedOptionIndex = ref<number>(-1);

const selectedItems = computed(() => {
  if (props.returnObject) return props.modelValue;

  const modelValueValues = props.returnObject
    ? props.modelValue.map((item) => item[props.itemValue])
    : props.modelValue;

  return props.options.filter((option) =>
    modelValueValues.includes(option[props.itemValue]),
  );
});
const inputValue = computed(() => {
  return selectedItems.value.map((item) => item[props.itemLabel]).join(', ');
});

const filteredOptions = computed(() => {
  if (!props.enableSearch || !props.search) return props.options;

  return props.options.filter(
    (option) =>
      option[props.itemLabel]
        .toLowerCase()
        .includes(props.search?.toLowerCase()) ||
      option[props.itemValue]
        .toLowerCase()
        .includes(props.search?.toLowerCase()),
  );
});

const handleSearch = (value: string) => {
  emit('update:search', value);
};

const getActivatedOptionStatus = (option: (typeof props.options)[number]) => {
  if (props.returnObject) {
    return props.modelValue.find(
      (item) => item[props.itemValue] === option[props.itemValue],
    );
  }
  return props.modelValue.includes(option[props.itemValue]);
};

const handleSelectOption = (
  option: (typeof props.options)[number],
  selected: boolean,
) => {
  if (selected) {
    emit(
      'update:modelValue',
      props.returnObject
        ? [...props.modelValue, option]
        : [...props.modelValue, option[props.itemValue]],
    );
  } else {
    emit(
      'update:modelValue',
      props.returnObject
        ? props.modelValue.filter(
            (item) => item[props.itemValue] !== option[props.itemValue],
          )
        : props.modelValue.filter((item) => item !== option[props.itemValue]),
    );
  }
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

:deep(.unnnic-multi-select__input) {
  cursor: pointer;
}

:deep(.unnnic-multi-select__input-search) {
  > .icon-left {
    color: $unnnic-color-fg-base;
  }
}

:deep(.unnnic-multi-select__input) {
  > .icon-right {
    color: $unnnic-color-fg-base;
  }
}

.unnnic-multi-select {
  &__content {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    gap: $unnnic-space-4;
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

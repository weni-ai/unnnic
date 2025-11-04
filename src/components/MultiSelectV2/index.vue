<template>
  <div class="unnnic-multi-select">
    <UnnnicPopover
      v-model="openPopover"
      :popoverBalloonProps="{ maxHeight: calculatedMaxHeight }"
    >
      <template #trigger>
        <UnnnicInput
          :modelValue="inputValue"
          class="unnnic-multi-select__input"
          readonly
          :forceActiveStatus="openPopover"
          :size="props.size"
          :placeholder="props.placeholder"
          :label="props.label"
          :errors="props.errors"
          :message="props.message"
          :iconRight="openPopover ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          :disabled="props.disabled"
          showClear
          @clear="emit('update:modelValue', [])"
        />
      </template>
      <template #content>
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
              :active="
                option[props.itemValue] === selectedItems?.[props.itemValue]
              "
              :focused="focusedOptionIndex === index"
              :disabled="option.disabled"
              @update:model-value="handleSelectOption(option)"
            />
          </div>
        </div>
      </template>
    </UnnnicPopover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import UnnnicPopover from '../Popover/index.vue';
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
  'update:modelValue': [any[]];
  'update:search': [string];
}>();

const focusedOptionIndex = ref<number>(-1);

const inputValue = computed(() => {
  return props.modelValue.map((item) => item[props.itemLabel]).join(', ');
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

const selectedItems = computed(() => {
  if (props.returnObject) return props.modelValue;

  return props.options.find(
    (option) => option[props.itemValue] === props.modelValue,
  );
});

const handleSelectOption = (option: any) => {
  // TODO
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

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

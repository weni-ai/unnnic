<template>
  <div
    class="unnnic-select"
    @keydown="handleKeyDown"
  >
    <UnnnicPopover
      v-model="openPopover"
      :popoverBalloonProps="{ maxHeight: calculatedMaxHeight }"
    >
      <template #trigger>
        <UnnnicInput
          :modelValue="inputValue"
          class="unnnic-select__input"
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
          @clear="emit('update:modelValue', '')"
        />
      </template>
      <template #content>
        <div class="unnnic-select__content">
          <UnnnicInput
            v-if="props.enableSearch"
            class="unnnic-select__input-search"
            :modelValue="props.search"
            :placeholder="$t('search')"
            iconLeft="search"
            @update:model-value="handleSearch"
          />
          <UnnnicSelectOption
            v-for="(option, index) in filteredOptions"
            :key="option[props.itemValue]"
            :data-option-index="index"
            :label="option[props.itemLabel]"
            :active="
              option[props.itemValue] === selectedItem?.[props.itemValue]
            "
            :focused="focusedOptionIndex === index"
            :disabled="option.disabled"
            @click="handleSelectOption(option)"
          />
        </div>
      </template>
    </UnnnicPopover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue';
import UnnnicInput from '../Input/Input.vue';
import UnnnicPopover from '../Popover/index.vue';
import UnnnicSelectOption from './SelectOption.vue';
import UnnnicI18n from '../../mixins/i18n';

defineOptions({
  name: 'UnnnicSelect',
  mixins: [UnnnicI18n],
});

interface SelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Array<{ [key: string]: any }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue: any;
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
  label: '',
  errors: '',
  message: '',
  search: '',
});

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'update:modelValue': [value: any];
  'update:search': [value: string];
}>();

const openPopover = ref(false);

watch(openPopover, () => {
  if (!openPopover.value) {
    handleSearch('');
  } else {
    focusedOptionIndex.value = -1;
  }

  if (openPopover.value && props.modelValue) {
    const selectedOptionIndex = props.options.findIndex(
      (option) =>
        option[props.itemValue] === selectedItem.value?.[props.itemValue],
    );
    scrollToOption(selectedOptionIndex, 'instant', 'center');
  }
});

const handleKeyDown = (event) => {
  const { key } = event;
  const validKeys = ['ArrowUp', 'ArrowDown', 'Enter'];
  if (validKeys.includes(key)) {
    event.preventDefault();
    if (key === 'ArrowUp') {
      if (focusedOptionIndex.value === 0) return;
      focusedOptionIndex.value--;
      scrollToOption(focusedOptionIndex.value);
    }
    if (key === 'ArrowDown') {
      if (focusedOptionIndex.value === filteredOptions.value.length - 1) return;
      focusedOptionIndex.value++;
      scrollToOption(focusedOptionIndex.value);
    }
    if (key === 'Enter') {
      handleSelectOption(filteredOptions.value[focusedOptionIndex.value]);
    }
  }
};

const focusedOptionIndex = ref<number>(-1);

const scrollToOption = (
  index: number,
  behavior: 'smooth' | 'instant' = 'smooth',
  block: 'center' | 'start' | 'end' | 'nearest' = 'center',
) => {
  nextTick(() => {
    const option = document.querySelector(`[data-option-index="${index}"]`);
    if (option) {
      option.scrollIntoView({ behavior, block });
    }
  });
};

const calculatedMaxHeight = computed(() => {
  if (!props.options || props.options.length === 0) return 'unset';
  const popoverPadding = 32;
  const popoverGap = 4;
  // 37 = 21px (height) + 16px (padding)
  const fieldsHeight = 37 * props.optionsLines;
  const size =
    fieldsHeight + popoverPadding + (popoverGap * props.optionsLines - 2);
  return `${props.enableSearch ? size + 54 : size}px`;
});

const selectedItem = computed(() => {
  if (props.returnObject) return props.modelValue;

  return props.options.find(
    (option) => option[props.itemValue] === props.modelValue,
  );
});

const inputValue = computed(() => {
  return selectedItem.value?.[props.itemLabel];
});

const handleSelectOption = (option) => {
  if (
    option[props.itemValue] === selectedItem.value?.[props.itemValue] ||
    option.disabled
  )
    return;

  emit(
    'update:modelValue',
    props.returnObject ? option : option[props.itemValue],
  );
  openPopover.value = false;
};

const handleSearch = (value: string) => {
  emit('update:search', value);
};

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
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

:deep(.unnnic-select__input) {
  cursor: pointer;
}

:deep(.unnnic-select__input-search) {
  > .icon-left {
    color: $unnnic-color-fg-base;
  }
}

:deep(.unnnic-select__input) {
  > .icon-right {
    color: $unnnic-color-fg-base;
  }
}

.unnnic-select {
  &__content {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    gap: $unnnic-space-1;
  }
}
</style>

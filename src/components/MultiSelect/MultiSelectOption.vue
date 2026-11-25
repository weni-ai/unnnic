<template>
  <div
    :class="[
      'unnnic-multi-select-option',
      { 'unnnic-multi-select-option--level-2': props.level === 2 },
    ]"
  >
    <button
      v-if="props.expandable"
      type="button"
      class="unnnic-multi-select-option__expand"
      tabindex="-1"
      :aria-expanded="props.expanded"
      :aria-label="props.expanded ? $t('collapse') : $t('expand')"
      @click.stop="emit('update:expanded', !props.expanded)"
    >
      <UnnnicIcon
        :icon="props.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"
        size="ant"
        scheme="fg-base"
      />
    </button>
    <span
      v-else-if="props.level === 1"
      class="unnnic-multi-select-option__expand-spacer"
      aria-hidden="true"
    />
    <UnnnicCheckbox
      :modelValue="props.active"
      :disabled="props.disabled"
      :label="props.label"
      @update:model-value="emit('update:modelValue', props.active !== true)"
    />
  </div>
</template>

<script setup lang="ts">
import UnnnicCheckbox from '../Checkbox/Checkbox.vue';
import type { CheckboxValue } from '../Checkbox/Checkbox.vue';
import UnnnicIcon from '../Icon.vue';

defineOptions({
  name: 'UnnnicMultiSelectOption',
});

const emit = defineEmits<{
  'update:modelValue': [boolean];
  'update:expanded': [boolean];
}>();

interface SelectOptionProps {
  label: string;
  disabled?: boolean;
  active?: CheckboxValue;
  focused?: boolean;
  level?: 1 | 2;
  expandable?: boolean;
  expanded?: boolean;
}

const props = withDefaults(defineProps<SelectOptionProps>(), {
  disabled: false,
  active: false,
  focused: false,
  level: undefined,
  expandable: false,
  expanded: false,
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.unnnic-multi-select-option {
  display: flex;
  align-items: center;
  gap: $unnnic-space-2;
  border-radius: $unnnic-radius-1;
  font: $unnnic-font-emphasis;

  &--level-2 {
    padding-left: $unnnic-space-7;
  }

  &__expand {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: $unnnic-icon-size-5;
    height: $unnnic-icon-size-5;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    color: $unnnic-color-fg-base;
  }

  &__expand-spacer {
    display: inline-block;
    flex-shrink: 0;
    width: $unnnic-icon-size-5;
    height: $unnnic-icon-size-5;
  }
}
</style>

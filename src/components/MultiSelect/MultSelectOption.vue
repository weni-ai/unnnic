<template>
  <div :class="['unnnic-multi-select-option']">
    <UnnnicCheckbox
      :modelValue="props.active"
      :disabled="props.disabled"
      :label="props.label"
      @update:model-value="emit('update:modelValue', !props.active)"
    />
  </div>
</template>

<script setup lang="ts">
import UnnnicCheckbox from '../Checkbox/Checkbox.vue';

defineOptions({
  name: 'UnnnicMultiSelectOption',
});

const emit = defineEmits<{
  'update:modelValue': [boolean];
}>();

interface SelectOptionProps {
  label: string;
  disabled?: boolean;
  active?: boolean;
  focused?: boolean;
}

const props = withDefaults(defineProps<SelectOptionProps>(), {
  disabled: false,
  active: false,
  focused: false,
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
  border-radius: $unnnic-radius-1;
  font: $unnnic-font-emphasis;
}
</style>

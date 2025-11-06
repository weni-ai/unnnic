<template>
  <UnnnicChip
    v-if="type === 'brand' || hasCloseIcon"
    :text="text"
    type="multiple"
    :isSelected="disabled || hasCloseIcon"
    isClickable
    @click="hasCloseIcon ? $emit('close') : $emit('click')"
  />

  <DefaultTag
    v-else
    :size="type === 'next' ? 'small' : size"
    :text="text"
    :scheme="scheme"
    :leftIcon="leftIcon"
  />
</template>

<script setup lang="ts">
import UnnnicChip from '../Chip/Chip.vue';
import DefaultTag from './DefaultTag.vue';
import type { TagProps } from './types';

defineOptions({
  name: 'UnnnicTag',
});

withDefaults(defineProps<TagProps>(), {
  type: 'default',
  size: 'medium',
  text: undefined,
  disabled: false,
  scheme: 'aux-purple',
  leftIcon: '',
  hasCloseIcon: false,
});

defineEmits<{
  close: [];
  click: [];
}>();
</script>

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

<script>
import UnnnicChip from '../Chip/Chip.vue';
import DefaultTag from './DefaultTag.vue';

export default {
  name: 'UnnnicTag',
  components: {
    UnnnicChip,
    DefaultTag,
  },
  props: {
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'brand', 'next'].indexOf(value) !== -1;
      },
    },
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['small', 'medium'].includes(value);
      },
    },
    text: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    scheme: {
      type: String,
      default: 'aux-purple',
    },
    leftIcon: {
      type: String,
      default: '',
    },
    hasCloseIcon: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

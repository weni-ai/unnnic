<template>
  <component
    :is="currentComponent"
    class="unnnic-tag-content"
    v-bind="$attrs"
    :text="text"
    :disabled="disabled"
    :hasCloseIcon="hasCloseIcon"
    :scheme="scheme"
    :count="count"
    :hasBackButton="hasBackButton"
    :clickable="clickable"
    :tooltipText="tooltipText"
    :enableTooltip="enableTooltip"
    :leftIcon="leftIcon"
    :rightIcon="rightIcon"
  />
</template>

<script>
import DefaultTag from './DefaultTag.vue';
import IndicatorTag from './IndicatorTag.vue';
import BrandTag from './BrandTag.vue';
import TagNext from './TagNext.vue';

export default {
  name: 'UnnnicTag',
  props: {
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'indicator', 'brand', 'next'].indexOf(value) !== -1;
      },
    },
    text: {
      type: String,
      default: null,
    },
    tooltipText: {
      type: String,
      default: null,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hasCloseIcon: {
      type: Boolean,
      default: false,
    },
    scheme: {
      type: String,
      default: 'aux-purple',
    },
    hasBackButton: {
      type: Boolean,
      default: false,
    },
    enableTooltip: {
      type: Boolean,
      default: false,
    },
    leftIcon: {
      type: String,
      default: '',
    },
    rightIcon: {
      type: String,
      default: '',
    },
  },
  computed: {
    currentComponent() {
      if (this.type === 'indicator') return IndicatorTag;
      if (this.type === 'brand') return BrandTag;
      if (this.type === 'next') return TagNext;
      return DefaultTag;
    },
  },
};
</script>

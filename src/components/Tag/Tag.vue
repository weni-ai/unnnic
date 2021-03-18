<template>
    <component
      class="unnnic-tag-content"
      :is="currentComponent"
      :v-bind="$attrs"
      :text="text"
      :disabled="disabled"
      :hasCloseIcon="hasCloseIcon"
      :scheme="scheme"
      :count="count"
      :hasBackButton="hasBackButton"
      :clickable="clickable"
      :tooltipText="tooltipText"
      :enableTooltip="enableTooltip"
    />
</template>

<script>
import DefaultTag from './DefaultTag.vue';
import IndicatorTag from './IndicatorTag.vue';

export default {
  name: 'unnnic-tag',
  props: {
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return (
          ['default', 'indicator'].indexOf(value) !== -1
        );
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
  },
  computed: {
    currentComponent() {
      if (this.type === 'indicator') return IndicatorTag;
      return DefaultTag;
    },
  },
};
</script>

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
      :clickable="clickable"
    />
</template>

<script>
import TagDefault from './TagDefault.vue';
import TagIndicator from './TagIndicator.vue';

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
  },
  computed: {
    currentComponent() {
      if (this.type === 'indicator') return TagIndicator;
      return TagDefault;
    },
  },
};
</script>

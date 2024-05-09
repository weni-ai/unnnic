<template>
  <component
    class="unnnic-carousel-component"
    :is="currentComponent"
    v-bind="$attrs"
    :name="name"
    :clickable="clickable"
    :tagItems="tagItems"
    @selected="$emit('update:model-value', $event)"
    :modelValue="modelValue"
  />
</template>

<script>
import TagCarousel from './TagCarousel.vue';

export default {
  model: {
    event: 'update:model-value',
  },

  name: 'unnnic-carousel',
  props: {
    modelValue: {
      type: Array,
      default() {
        return [];
      },
    },
    type: {
      type: String,
      default: 'brand',
      validator(value) {
        return ['brand'].indexOf(value) !== -1;
      },
    },
    tagItems: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentComponent() {
      return TagCarousel;
    },
  },
};
</script>

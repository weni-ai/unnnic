<template>
  <component
    :is="tag"
    v-if="direct"
    :class="classes"
    :style="styles"
  ></component>

  <component
    :is="tag"
    v-else-if="showLoading"
  >
    <span
      v-for="(element, index) in elements"
      :key="index"
      :class="classes"
      :style="styles"
    >
      &zwnj;
    </span>
  </component>
</template>

<script>
import { ref, inject } from 'vue';
import { SkeletonStyle } from './skeletonTheme.vue';

export default {
  name: 'UnnnicSkeletonLoading',
  props: {
    prefix: {
      type: String,
      default: 'unnnic',
    },
    count: {
      type: Number,
      default: 1,
    },
    duration: {
      type: Number,
      default: 2,
    },
    tag: {
      type: String,
      default: 'span',
    },
    width: [String, Number],
    height: [String, Number],
    circle: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: undefined,
    },
    direct: {
      type: Boolean,
    },
  },
  setup() {
    const themeStyle = inject('_themeStyle', ref({ ...SkeletonStyle }));
    const theme = inject('_skeletonTheme', ref({}));

    return {
      themeStyle,
      theme,
    };
  },
  computed: {
    classes() {
      return [
        `${this.prefix}-skeleton`,
        this.circle ? `${this.prefix}-skeleton--circle` : '',
      ];
    },
    styles() {
      const styles = {};

      styles['--skeleton-bg'] = this.themeStyle['--skeleton-bg'];
      styles['--skeleton-highlight'] = this.themeStyle['--skeleton-highlight'];
      styles['--skeleton-duration'] = this.duration
        ? `${this.duration}s`
        : '0s';

      if (this.width) styles.width = this.width;
      if (this.height) styles.height = this.height;

      return styles;
    },
    elements() {
      return Array.from({ length: this.count }, () => ({}));
    },
    showLoading() {
      return typeof this.loading !== 'undefined'
        ? this.loading
        : this.isEmptyVNode(this.$slots.default);
    },
  },
  methods: {
    isEmptyVNode(children) {
      if (!children) return true;
      const [firstNode] = children();
      let str = firstNode.children;

      if (str) {
        // remove all line-break and space character
        str = str.replace(/(\n|\r\n|\s)/g, '');
      }
      return !str;
    },
  },
};
</script>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;

@keyframes skeleton-pulse {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }

  100% {
    opacity: 1;
  }
}

.unnnic-skeleton {
  display: inline-block;
  position: relative;
  line-height: 1;
  width: 100%;
  height: inherit;
  background-color: var(--skeleton-bg);
  border-radius: $unnnic-radius-1;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: var(--skeleton-highlight);
    animation: skeleton-pulse var(--skeleton-duration, 2s) ease-in-out 0.5s
      infinite;
  }

  &--circle {
    border-radius: 50%;
  }
}
</style>

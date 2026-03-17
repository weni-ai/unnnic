<template>
  <div>
    <component
      :is="tag"
      v-if="tag"
    >
      <slot></slot>
    </component>
    <slot v-else></slot>
  </div>
</template>

<script>
import { ref, provide } from 'vue';
import colorsTokens from '@/assets/tokens/colors.json';

const { gray } = colorsTokens.color;
export const DEFAULT_BACKGROUND = gray[3].value;
export const DEFAULT_HIGHLIGHT = gray[1].value;
export const SkeletonStyle = {
  '--skeleton-bg': DEFAULT_BACKGROUND,
  '--skeleton-highlight': DEFAULT_HIGHLIGHT,
  '--skeleton-duration': '2s',
};
export default {
  name: 'UnnnicSkeletonTheme',
  props: {
    color: {
      type: String,
      default: DEFAULT_BACKGROUND,
    },
    highlight: {
      type: String,
      default: DEFAULT_HIGHLIGHT,
    },
    duration: {
      type: Number,
      default: 2,
    },
    tag: {
      type: String,
      default: 'div',
    },
    loading: {
      type: Boolean,
      default: undefined,
    },
  },
  setup() {
    const themeStyle = ref({ ...SkeletonStyle });
    const theme = ref({});

    provide('_themeStyle', themeStyle);
    provide('_skeletonTheme', theme);

    return {
      themeStyle,
      theme,
    };
  },
  mounted() {
    const { color, highlight, duration } = this;
    this.themeStyle['--skeleton-bg'] = color;
    this.themeStyle['--skeleton-highlight'] = highlight;
    this.themeStyle['--skeleton-duration'] = duration ? `${duration}s` : '0s';
  },
};
</script>

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

<script lang="ts">
export const DEFAULT_BACKGROUND = 'var(--unnnic-color-bg-muted)';
export const DEFAULT_HIGHLIGHT = 'var(--unnnic-color-bg-base-soft)';

export type SkeletonStyleVars = {
  '--skeleton-bg': string;
  '--skeleton-highlight': string;
  '--skeleton-duration': string;
};

export const SkeletonStyle: SkeletonStyleVars = {
  '--skeleton-bg': DEFAULT_BACKGROUND,
  '--skeleton-highlight': DEFAULT_HIGHLIGHT,
  '--skeleton-duration': '2s',
};

export interface SkeletonThemeProps {
  color?: string;
  highlight?: string;
  duration?: number;
  tag?: string;
  loading?: boolean;
}
</script>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue';

defineOptions({
  name: 'UnnnicSkeletonTheme',
});

const props = withDefaults(defineProps<SkeletonThemeProps>(), {
  color: DEFAULT_BACKGROUND,
  highlight: DEFAULT_HIGHLIGHT,
  duration: 2,
  tag: 'div',
  loading: undefined,
});

const themeStyle = ref<SkeletonStyleVars>({ ...SkeletonStyle });
const theme = ref<Record<string, unknown>>({});

provide('_themeStyle', themeStyle);
provide('_skeletonTheme', theme);

onMounted(() => {
  themeStyle.value['--skeleton-bg'] = props.color;
  themeStyle.value['--skeleton-highlight'] = props.highlight;
  themeStyle.value['--skeleton-duration'] = props.duration
    ? `${props.duration}s`
    : '0s';
});

defineExpose({
  themeStyle,
  theme,
});
</script>

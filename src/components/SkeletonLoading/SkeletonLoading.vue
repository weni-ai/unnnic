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

<script setup lang="ts">
import { computed, inject, ref, useSlots, type Ref, type CSSProperties } from 'vue';
import {
  SkeletonStyle,
  type SkeletonStyleVars,
} from './skeletonTheme.vue';

defineOptions({
  name: 'UnnnicSkeletonLoading',
});

export interface SkeletonLoadingProps {
  prefix?: string;
  count?: number;
  duration?: number;
  tag?: string;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  loading?: boolean;
  direct?: boolean;
}

const props = withDefaults(defineProps<SkeletonLoadingProps>(), {
  prefix: 'unnnic',
  count: 1,
  duration: 2,
  tag: 'span',
  width: undefined,
  height: undefined,
  circle: false,
  loading: undefined,
  direct: false,
});

const slots = useSlots();

const themeStyle = inject<Ref<SkeletonStyleVars>>(
  '_themeStyle',
  ref({ ...SkeletonStyle }),
);

const classes = computed(() => {
  return [
    `${props.prefix}-skeleton`,
    props.circle ? `${props.prefix}-skeleton--circle` : '',
  ];
});

const styles = computed((): CSSProperties => {
  const nextStyles: Record<string, string | number> = {};

  nextStyles['--skeleton-bg'] = themeStyle.value['--skeleton-bg'];
  nextStyles['--skeleton-highlight'] = themeStyle.value['--skeleton-highlight'];
  nextStyles['--skeleton-duration'] = props.duration
    ? `${props.duration}s`
    : '0s';

  if (props.width) nextStyles.width = props.width;
  if (props.height) nextStyles.height = props.height;

  return nextStyles as CSSProperties;
});

const elements = computed(() => {
  return Array.from({ length: props.count }, () => ({}));
});

function isEmptyVNode(
  children: (() => unknown[]) | undefined,
): boolean {
  if (!children) return true;
  const [firstNode] = children() as Array<{ children?: string } | undefined>;
  let str = firstNode?.children;

  if (str) {
    // remove all line-break and space character
    str = str.replace(/(\n|\r\n|\s)/g, '');
  }
  return !str;
}

const showLoading = computed(() => {
  return typeof props.loading !== 'undefined'
    ? props.loading
    : isEmptyVNode(slots.default as (() => unknown[]) | undefined);
});
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

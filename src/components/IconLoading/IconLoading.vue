<template>
  <div
    :class="['unnnic-icon-loading', `unnnic-icon-loading--${scheme}`]"
    aria-atomic="true"
    aria-live="assertive"
  >
    <svg
      viewBox="0 0 50 50"
      :width="sizeInPixels"
      :height="sizeInPixels"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const SIZE_MAP = {
  xs: 12,
  sm: 16,
  ant: 20,
  md: 24,
  lg: 32,
  xl: 40,
  'avatar-nano': 20,
  'avatar-xs': 32,
  'avatar-sm': 40,
  'avatar-md': 72,
  'avatar-lg': 104,
};

const props = defineProps({
  scheme: {
    type: String,
    default: 'fg-muted',
  },
  size: {
    type: String,
    default: 'lg',
  },
});

defineOptions({ name: 'UnnnicIconLoading' });

const sizeInPixels = computed(() => SIZE_MAP[props.size] ?? SIZE_MAP.lg);
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

@keyframes unnnic-icon-loading-dash {
  0% {
    stroke-dasharray: 1 150;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90 150;
    stroke-dashoffset: -35;
  }

  100% {
    stroke-dasharray: 90 150;
    stroke-dashoffset: -124;
  }
}

@keyframes unnnic-icon-loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

.unnnic-icon-loading {
  display: inline-flex;
  user-select: none;

  svg {
    animation: unnnic-icon-loading-rotate 1.5s linear infinite;

    circle {
      fill: none;
      stroke: currentColor;
      stroke-width: 5;
      stroke-linecap: round;
      animation: unnnic-icon-loading-dash 1s ease-in-out infinite;
    }
  }

  @each $name, $color in $unnnic-scheme-colors {
    &.unnnic-icon-loading--#{$name} {
      color: $color;
    }
  }
}
</style>

<template>
  <span
    v-if="materialSymbolsName"
    :class="[
      'material-symbols-rounded',
      `unnnic-icon-scheme--${scheme}`,
      `unnnic-icon-size--${size}`,
      {
        'unnnic--clickable': clickable,
        'material-symbols-rounded--filled': filled,
      },
    ]"
    data-testid="material-icon"
    translate="no"
    @click="onClick"
    @mousedown="(event) => $emit('mousedown', event)"
    @mouseup="(event) => $emit('mouseup', event)"
  >
    {{ materialSymbolsName }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import OldIconsMap from './Icon/OldIconsMap.json';
import type { IconProps, IconSize } from './Icon/types';
import type { SchemeColor } from '@/types/scheme-colors';

defineOptions({
  name: 'UnnnicIcon',
});

export type { IconProps, IconSize, SchemeColor };

const props = withDefaults(defineProps<IconProps>(), {
  filled: false,
  icon: null,
  clickable: false,
  size: 'md',
  scheme: 'neutral-darkest',
});

const emit = defineEmits<{
  click: [event: Event];
  mousedown: [event: Event];
  mouseup: [event: Event];
}>();

const materialSymbolsName = computed(() => {
  return (
    (OldIconsMap as Record<string, string>)[props.icon as string] || props.icon
  );
});

const onClick = (event: Event) => {
  if (!props.clickable) return;
  emit('click', event);
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-icon :deep(svg) {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;

$icon-sizes:
  'xl' $unnnic-icon-size-xl,
  'lg' $unnnic-icon-size-lg,
  'md' $unnnic-icon-size-md,
  'ant' $unnnic-icon-size-ant,
  'sm' $unnnic-icon-size-sm,
  'xs' $unnnic-icon-size-xs,
  'avatar-lg' $unnnic-avatar-size-lg,
  'avatar-md' $unnnic-avatar-size-md,
  'avatar-sm' $unnnic-avatar-size-sm,
  'avatar-xs' $unnnic-avatar-size-xs,
  'avatar-nano' $unnnic-avatar-size-nano;

@font-face {
  font-family: 'Material Symbols Rounded';
  font-style: normal;
  font-weight: 300;
  src: url('../assets/fonts/Material Symbols Rounded.woff2') format('woff2');
}

@font-face {
  font-family: 'Material Symbols Rounded Filled';
  font-style: normal;
  font-weight: 300;
  src: url('../assets/fonts/Material Symbols Rounded Filled.woff2')
    format('woff2');
}

.material-symbols-rounded {
  font-family: 'Material Symbols Rounded';
  font-weight: normal;
  font-style: normal;
  width: 1em;
  height: 1em;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-feature-settings: 'liga';
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;

  &--filled {
    font-family: 'Material Symbols Rounded Filled';
  }

  @each $name, $color in $unnnic-scheme-colors {
    &.unnnic-icon-scheme--#{$name} {
      color: $color;
    }
  }

  @each $name, $size in $icon-sizes {
    &.unnnic-icon-size--#{$name} {
      font-size: $size;
    }
  }
}
</style>

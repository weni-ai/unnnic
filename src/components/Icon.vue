<template>
  <Icon
    v-if="isIconify"
    :icon="props.icon as string"
    :class="[
      'unnnic-icon',
      `unnnic-icon-scheme--${scheme}`,
      `unnnic-icon-size--${size}`,
      {
        'unnnic--clickable': clickable,
      },
    ]"
    data-testid="iconify-icon"
    @click="onClick"
    @mousedown="(event) => $emit('mousedown', event)"
    @mouseup="(event) => $emit('mouseup', event)"
  />

  <component
    :is="customSvgIcon"
    v-else-if="customSvgIcon"
    :class="[
      'unnnic-icon',
      `unnnic-icon--size-svg-${size}`,
      `unnnic-icon__size--${size}`,
      clickable ? 'unnnic--clickable' : '',
      scheme ? `unnnic-icon-scheme--${scheme}` : '',
    ]"
    data-testid="custom-icon"
    @click="onClick"
    @mousedown="(event) => $emit('mousedown', event)"
    @mouseup="(event) => $emit('mouseup', event)"
  />

  <span
    v-else-if="materialSymbolsName"
    :class="[
      'unnnic-icon',
      'material-symbols-rounded',
      `unnnic-icon-scheme--${scheme}`,
      `unnnic-icon-size--${size}`,
      `unnnic-icon__size--${size}`,
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
import { Icon } from '@iconify/vue';

import icons from '../utils/icons';
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

const isIconify = computed(
  () => (props.icon as string)?.includes(':') ?? false,
);

const customSvgIcon = computed(() => icons[props.icon as string] ?? null);

const materialSymbolsName = computed(
  () =>
    (OldIconsMap as Record<string, string>)[props.icon as string] || props.icon,
);

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
@use '@/assets/scss/icon-sizes' as *;

$icon-sizes:
  'xs' $unnnic-icon-size-3,
  'sm' $unnnic-icon-size-4,
  'ant' $unnnic-icon-size-5,
  'md' $unnnic-icon-size-6,
  'lg' $unnnic-icon-size-7,
  'xl' $unnnic-icon-size-10,
  'avatar-nano' $unnnic-icon-size-5,
  'avatar-xs' $unnnic-icon-size-7,
  'avatar-sm' $unnnic-icon-size-10,
  'avatar-md' '72px',
  'avatar-lg' '104px';

@font-face {
  font-family: 'Material Symbols Rounded';
  font-style: normal;
  font-weight: 300;
  src: url('../assets/fonts/material-symbols-rounded.woff2') format('woff2');
}

.unnnic-icon {
  position: relative;
  display: inline-block;
  vertical-align: middle;

  svg {
    width: 100%;
    height: 100%;
  }

  @each $name, $color in $unnnic-scheme-colors {
    &.unnnic-icon-scheme--#{$name} {
      color: $color;

      & .primary {
        fill: $color;
      }

      & .primary-stroke {
        stroke: $color;
      }
    }
  }

  @each $name, $size in $icon-sizes {
    &.unnnic-icon-size--#{$name} {
      font-size: $size;
    }

    &--size-svg-#{$name} {
      width: $size;
      height: $size;
    }
  }
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

  user-select: none;

  &--filled {
    font-variation-settings: 'FILL' 1;
  }
}
</style>

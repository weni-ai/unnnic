<template>
  <section :class="`unnnic-tag unnnic-tag--${size}`">
    <section
      v-if="leftIcon"
      class="unnnic-tag__icon"
    >
      <UnnnicIcon
        :icon="leftIcon"
        scheme="fg-emphasized"
        size="sm"
      />
    </section>
    <p :class="`unnnic-tag__label`">{{ text }}</p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { color as colors } from '@/assets/tokens/colors.json';

import UnnnicIcon from '../Icon.vue';

import type { DefaultTagProps } from './types';

const props = withDefaults(defineProps<DefaultTagProps>(), {
  text: undefined,
  size: 'medium',
  scheme: 'aux-purple',
  leftIcon: undefined,
});

const COLOR_MAPPING = [
  { keywords: ['green'], color: colors.green[200].value },
  { keywords: ['blue'], color: colors.blue[200].value },
  { keywords: ['purple'], color: colors.purple[200].value },
  { keywords: ['red', 'pink'], color: colors.red[200].value },
  { keywords: ['orange'], color: colors.orange[200].value },
  { keywords: ['yellow'], color: colors.yellow[200].value },
  { keywords: ['gray'], color: colors.gray[200].value },
  { keywords: ['teal', 'weni'], color: colors.teal[200].value },
];

const color = computed(() => {
  const scheme = props.scheme.toLowerCase();

  const match = COLOR_MAPPING.find(({ keywords }) =>
    keywords.some((keyword) => scheme.includes(keyword)),
  );

  return match?.color ?? colors.gray[200].value;
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $unnnic-space-1;
  border-radius: $unnnic-border-radius-pill;
  padding: calc($unnnic-space-1 * 1.5) $unnnic-space-3;

  background-color: v-bind(color);

  &--small {
    padding: calc($unnnic-space-1 * 0.5) $unnnic-space-3;
  }

  &__label {
    margin: 0;

    font: $unnnic-font-caption-1;
    color: $unnnic-color-fg-emphasized;
  }

  &__icon {
    display: flex;
  }
}
</style>

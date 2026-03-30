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

import UnnnicIcon from '../Icon.vue';

import type { DefaultTagProps } from './types';

const props = withDefaults(defineProps<DefaultTagProps>(), {
  text: undefined,
  size: 'medium',
  scheme: 'aux-purple',
  leftIcon: undefined,
});

const COLOR_MAPPING = [
  { keywords: ['green'], color: 'var(--unnnic-color-bg-green-plain)' },
  { keywords: ['blue'], color: 'var(--unnnic-color-bg-blue-plain)' },
  { keywords: ['purple'], color: 'var(--unnnic-color-bg-purple-plain)' },
  { keywords: ['red', 'pink'], color: 'var(--unnnic-color-bg-red-plain)' },
  { keywords: ['orange'], color: 'var(--unnnic-color-bg-orange-plain)' },
  { keywords: ['yellow'], color: 'var(--unnnic-color-bg-yellow-plain)' },
  { keywords: ['gray'], color: 'var(--unnnic-color-bg-muted)' },
  { keywords: ['teal', 'weni'], color: 'var(--unnnic-color-bg-teal-plain)' },
];

const color = computed(() => {
  const scheme = props.scheme.toLowerCase();

  const match = COLOR_MAPPING.find(({ keywords }) =>
    keywords.some((keyword) => scheme.includes(keyword)),
  );

  return match?.color ?? 'var(--unnnic-color-bg-muted)';
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
  width: fit-content;

  background-color: v-bind(color);

  &--small {
    padding: calc($unnnic-space-1 * 0.5) $unnnic-space-3;
  }

  &__label {
    margin: 0;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font: $unnnic-font-caption-1;
    color: $unnnic-color-fg-emphasized;
  }

  &__icon {
    display: flex;
  }
}
</style>

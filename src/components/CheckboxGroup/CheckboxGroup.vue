<template>
  <section :class="[
    'unnnic-checkbox-group__container',
    `unnnic-checkbox-group--state-${state}`,
  ]">
    <UnnnicLabel
      v-if="label"
      :label="label"
      :tooltip="labelTooltip"
      :useHtmlTooltip="labelUseHtmlTooltip"
    />

    <section class="unnnic-checkbox-group__checkboxes">
      <slot />
    </section>

    <footer
      v-if="helper"
      class="unnnic-checkbox-group__helper"
    >
      {{ helper }}
    </footer>
  </section>
</template>

<script setup>
import UnnnicLabel from '../Label/Label.vue';

const props = defineProps({
  state: {
    type: String,
    default: 'horizontal',
    validator(value) {
      return ['horizontal', 'vertical'].includes(value);
    },
  },

  label: {
    type: String,
  },

  labelTooltip: {
    type: String,
  },

  labelUseHtmlTooltip: {
    type: Boolean,
  },

  helper: {
    type: String,
  },
});
</script>
  
<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-checkbox-group {
  &__container {
    display: flex;
    flex-direction: column;
  }

  &__checkboxes {
    margin-top: $unnnic-space-3;

    display: flex;
    gap: $unnnic-space-4 $unnnic-space-6;
  }

  &__helper {
    margin-top: $unnnic-space-2;
    font: $unnnic-font-caption-2;
    color: $unnnic-color-fg-base;
  }

  &--state-horizontal {
    .unnnic-checkbox-group__checkboxes {
      flex-direction: row;
    }
  }

  &--state-vertical {
    .unnnic-checkbox-group__checkboxes {
      flex-direction: column;
    }

    .unnnic-checkbox-group__helper {
      margin-top: $unnnic-space-3;
    }
  }
}
</style>

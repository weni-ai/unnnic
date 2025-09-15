<template>
  <section class="unnnic-disclaimer">
    <UnnnicIcon
      class="unnnic-disclaimer__icon"
      size="avatar-nano"
      :icon="icon"
      :scheme="iconColor"
      data-testid="disclaimer-icon"
    />
    <p
      class="unnnic-disclaimer__text"
      data-testid="disclaimer-text"
      v-html="text"
    />
  </section>
</template>

<script setup lang="ts">
import icons from '../../utils/iconList';
import colors from '../../utils/colorsList';
import UnnnicIcon from '../Icon.vue';
import type { DisclaimerProps } from './types';

defineOptions({
  name: 'UnnnicDisclaimer',
});

export type { DisclaimerProps };

const props = withDefaults(defineProps<DisclaimerProps>(), {
  icon: 'alert-circle-1-1',
  iconColor: 'neutral-darkest',
});

const validateIcon = (value: string): boolean => {
  return icons.includes(value);
};

const validateIconColor = (value: string): boolean => {
  return colors.includes(value);
};

if (!validateIcon(props.icon as string)) {
  console.warn(`Invalid icon prop: ${props.icon}`);
}

if (!validateIconColor(props.iconColor as string)) {
  console.warn(`Invalid iconColor prop: ${props.iconColor}`);
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
.unnnic-disclaimer {
  display: inline-flex;
  align-items: center;
  gap: $unnnic-spacing-xs;
  padding: $unnnic-spacing-sm;
  border-radius: $unnnic-border-radius-sm;
  border: 1px solid $unnnic-color-neutral-soft;
  background: $unnnic-color-background-lightest;
  .unnnic-disclaimer__text {
    margin: 0;
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-line-height-large * 1.375;
    font-weight: $unnnic-font-weight-regular;
    color: $unnnic-color-neutral-dark;
  }
}
</style>

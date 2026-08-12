<template>
  <div
    :class="[
      'unnnic-avatar-icon',
      scheme,
      size,
      { disabled: !enabled },
      filled,
      { opacity: !opacity },
    ]"
  >
    <UnnnicIcon
      :icon="icon"
      :scheme="enabled ? scheme : 'fg-base'"
      :size="iconSize"
      :filled="filled"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UnnnicIcon from '../Icon.vue';
import type { SchemeColor } from '../Icon.vue';
import type { IconSize } from '../Icon/types';

defineOptions({
  name: 'UnnnicAvatarIcon',
});

export type AvatarIconSize = 'nano' | 'xs' | 'sm' | 'lg' | 'xl';

export interface AvatarIconProps {
  enabled?: boolean;
  icon?: string;
  size?: AvatarIconSize;
  scheme?: SchemeColor;
  filled?: boolean;
  opacity?: boolean;
}

const props = withDefaults(defineProps<AvatarIconProps>(), {
  enabled: true,
  icon: 'graph-stats-1',
  size: 'sm',
  scheme: 'fg-info',
  filled: false,
  opacity: true,
});

const iconSize = computed((): IconSize => {
  return {
    nano: 'xs',
    xs: 'sm',
    sm: 'md',
    lg: 'lg',
    xl: 'xl',
  }[props.size] as IconSize;
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

@each $name, $color in $unnnic-scheme-colors {
  .unnnic-avatar-icon {
    &.#{$name} {
      background-color: rgba($color, $unnnic-opacity-level-extra-light);
    }
  }

  .unnnic-avatar-icon.opacity {
    &.#{$name} {
      background-color: rgba($color, $unnnic-opacity-level-light);
    }
  }
}

.unnnic-avatar-icon.disabled {
  background-color: $unnnic-color-bg-base-soft;
}

.unnnic-avatar-icon {
  border-radius: $unnnic-border-radius-sm;
  padding: $unnnic-space-2;
  display: inline-flex;

  &.nano,
  &.xs {
    padding: $unnnic-space-1;
  }
}
</style>

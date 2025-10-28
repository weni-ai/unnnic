<template>
  <Icon
    v-if="iconifyIconName"
    :icon="iconifyIconName"
    :class="iconClasses"
    :style="iconStyles"
    v-bind="$attrs"
    @click="onClick"
    @mousedown="(event) => $emit('mousedown', event)"
    @mouseup="(event) => $emit('mouseup', event)"
  />
</template>

<script setup lang="ts">
import { Icon, loadIcon } from '@iconify/vue';
import { iconSizeTokens } from '@/assets/tokens/iconSizeTokens';
import { computed, ref, watch } from 'vue';
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

// Icon size mapping (in pixels)
const iconSizeMap: Record<IconSize, string> = {
  nano: iconSizeTokens['3'],
  xs: iconSizeTokens['3'],
  sm: iconSizeTokens['4'],
  ant: iconSizeTokens['5'],
  md: iconSizeTokens['6'],
  lg: iconSizeTokens['7'],
  xl: iconSizeTokens['10'],
  'avatar-nano': iconSizeTokens['5'],
  'avatar-xs': iconSizeTokens['7'],
  'avatar-sm': iconSizeTokens['10'],
  'avatar-md': '72px',
  'avatar-lg': '104px',
};

// State to track if icon should use fallback (-rounded instead of -outline-rounded)
const shouldUseFallback = ref<Record<string, boolean>>({});

/**
 * Builds the Material Symbols icon name with appropriate suffix
 */
const buildMaterialSymbolsIcon = (
  baseName: string,
  filled: boolean,
  useFallback = false,
) => {
  const prefix = 'material-symbols';
  const normalizedName = baseName.replace(/_/g, '-');

  // If icon already has -rounded or -outline-rounded suffix, use it as-is
  if (
    normalizedName.endsWith('-rounded') ||
    normalizedName.endsWith('-outline-rounded')
  ) {
    return `${prefix}:${normalizedName}`;
  }

  if (filled) {
    return `${prefix}:${normalizedName}-rounded`;
  }

  // For outline: use -rounded if fallback, otherwise -outline-rounded
  const suffix = useFallback ? '-rounded' : '-outline-rounded';
  return `${prefix}:${normalizedName}${suffix}`;
};

/**
 * Main computed property that returns the icon name
 * Renders immediately with default suffix, fallback is applied if needed
 */
const iconifyIconName = computed(() => {
  if (!props.icon) return null;

  const iconName = props.icon as string;

  // 1. Direct Iconify format (e.g., "mdi:heart", "lucide:star")
  if (iconName.includes(':')) {
    return iconName;
  }

  // 2. Get the base icon name (from OldIconsMap or use as-is)
  const mappedIcon = (OldIconsMap as Record<string, string>)[iconName];
  console.log('iconName', iconName);
  console.log('mappedIcon', mappedIcon);

  const baseName = mappedIcon || iconName;

  // 3. Build Material Symbols icon with fallback state
  const cacheKey = `${baseName}-${props.filled}`;
  const useFallback = shouldUseFallback.value[cacheKey] || false;

  return buildMaterialSymbolsIcon(baseName, props.filled, useFallback);
});

/**
 * Watch for icon or filled prop changes
 * Validates icon availability in parallel and switches to fallback if needed
 */
watch(
  () => [props.icon, props.filled] as const,
  async ([newIcon, newFilled]) => {
    if (!newIcon) return;

    const iconName = newIcon as string;

    // Skip validation for direct Iconify format
    if (iconName.includes(':')) return;

    // Skip validation for filled icons (always use -rounded)
    if (newFilled) return;

    // Get the base icon name
    const mappedIcon = (OldIconsMap as Record<string, string>)[iconName];
    const baseName = mappedIcon || iconName;
    const normalizedName = baseName.replace(/_/g, '-');

    // Skip validation if icon already has -rounded or -outline-rounded suffix
    if (
      normalizedName.endsWith('-rounded') ||
      normalizedName.endsWith('-outline-rounded')
    ) {
      return;
    }

    const cacheKey = `${baseName}-${newFilled}`;

    // Build the primary icon name with -outline-rounded
    const primaryIcon = buildMaterialSymbolsIcon(baseName, newFilled, false);

    try {
      // Try to load the icon with -outline-rounded
      await loadIcon(primaryIcon);
      // Success: ensure fallback is not used
      if (shouldUseFallback.value[cacheKey]) {
        shouldUseFallback.value[cacheKey] = false;
      }
    } catch {
      // Failed: switch to fallback (-rounded)
      shouldUseFallback.value[cacheKey] = true;
    }
  },
  { immediate: true },
);

const iconClasses = computed(() => [
  'unnnic-icon',
  `unnnic-icon-size--${props.size}`,
  `unnnic-icon-scheme--${props.scheme}`,
  {
    'unnnic--clickable': props.clickable,
  },
  'material-symbols-rounded',
]);

const iconStyles = computed(() => ({
  fontSize: iconSizeMap[props.size],
  width: iconSizeMap[props.size],
  height: iconSizeMap[props.size],
  minWidth: iconSizeMap[props.size],
  minHeight: iconSizeMap[props.size],
  display: 'inline-block',
  verticalAlign: 'middle',
}));

const onClick = (event: Event) => {
  if (!props.clickable) return;
  emit('click', event);
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-icon {
  position: relative;
  line-height: 1;

  :deep(svg) {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;

@each $name, $color in $unnnic-scheme-colors {
  .unnnic-icon-scheme--#{$name} {
    color: $color;

    :deep(svg) {
      color: $color;
    }
  }
}

.unnnic--clickable {
  cursor: pointer;
}
</style>

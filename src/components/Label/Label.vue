<template>
  <section class="unnnic-label">
    <p class="unnnic-label__label">{{ fullySanitize(props.label) }}</p>
    <UnnnicToolTip
      v-if="tooltip"
      enabled
      :text="tooltip"
      :enableHtml="props.useHtmlTooltip"
    >
      <UnnnicIcon
        icon="help"
        size="sm"
        scheme="fg-base"
      />
    </UnnnicToolTip>
  </section>
</template>

<script setup lang="ts">
import { fullySanitize } from '@/utils/sanitize';

import UnnnicToolTip from '../ToolTip/ToolTip.vue';
import UnnnicIcon from '../Icon.vue';

defineOptions({
  name: 'UnnnicLabel',
});

export interface LabelProps {
  label?: string;
  tooltip?: string;
  useHtmlTooltip?: boolean;
}

const props = withDefaults(defineProps<LabelProps>(), {
  label: '',
  tooltip: '',
  useHtmlTooltip: false,
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

* {
  box-sizing: border-box;
  padding: $unnnic-space-0;
  margin: $unnnic-space-0;
}

.unnnic-label {
  display: flex;
  align-items: center;
  gap: $unnnic-space-2;
  color: $unnnic-color-fg-base;

  &__label {
    font: $unnnic-font-body;
  }

  :deep(.unnnic-tooltip) {
    display: flex;
  }
}
</style>

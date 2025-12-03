<template>
  <section
    ref="popover"
    class="unnnic-select-popover"
  >
    <div
      class="unnnic-select-popover__trigger"
      data-testid="popover-trigger"
      @click="toggleOpen()"
    >
      <slot name="trigger" />
    </div>
    <div
      v-if="open"
      class="unnnic-select-popover__balloon"
      data-testid="popover-balloon"
    >
      <slot name="content" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';
import { onClickOutside, useResizeObserver } from '@vueuse/core';

const target = useTemplateRef<HTMLDivElement>('popover');

const popoverWidth = ref<string>('');

useResizeObserver(target, (entries) => {
  const entry = entries[0];
  const { width } = entry.contentRect;
  popoverWidth.value = `${width}px`;
});

onClickOutside(target, () => {
  if (props.persistent) return;
  open.value = false;
});

defineOptions({
  name: 'UnnnicPopover',
});

interface PopoverBalloonProps {
  width?: string;
  height?: string;
  maxHeight?: string;
}

interface PopoverProps {
  modelValue?: boolean;
  persistent?: boolean;
  popoverBalloonProps?: PopoverBalloonProps;
}

const props = withDefaults(defineProps<PopoverProps>(), {
  modelValue: undefined,
  persistent: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const useModelValue = computed(() => props.modelValue !== undefined);

const open = ref<boolean>(
  useModelValue.value ? Boolean(props.modelValue) : false,
);

const toggleOpen = () => {
  open.value = !open.value;
};

const calculatedPopoverWidth = computed(() => {
  return props.popoverBalloonProps?.width || popoverWidth.value;
});

const popoverHeight = computed(() => {
  return props.popoverBalloonProps?.height || 'unset';
});

const popoverMaxHeight = computed(() => {
  return props.popoverBalloonProps?.maxHeight || 'unset';
});

onMounted(() => {
  if (useModelValue.value) {
    open.value = Boolean(props.modelValue);
  }
});

watch(open, (value) => {
  if (useModelValue.value) {
    emit('update:modelValue', value);
  }
});

watch(
  () => props.modelValue,
  (value) => {
    open.value = !!value;
  },
);
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.unnnic-select-popover {
  &__balloon {
    border-radius: $unnnic-radius-2;
    padding: $unnnic-space-4;
    background: $unnnic-color-bg-base;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16);
    // margin-top: $unnnic-space-1;
    position: fixed;
    width: v-bind(calculatedPopoverWidth);
    height: v-bind(popoverHeight);
    max-height: v-bind(popoverMaxHeight);
    overflow: auto;

    &::-webkit-scrollbar {
      width: $unnnic-spacing-inline-nano;
    }

    &::-webkit-scrollbar-thumb {
      background: $unnnic-color-neutral-cleanest;
      border-radius: $unnnic-border-radius-pill;
    }

    &::-webkit-scrollbar-track {
      background: $unnnic-color-neutral-soft;
      border-radius: $unnnic-border-radius-pill;
    }
  }
}
</style>

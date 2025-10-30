<template>
  <Transition
    name="toast-slide"
    appear
    data-testid="toast-transition"
    @after-leave="$emit('destroy')"
  >
    <aside
      v-if="isVisible"
      :class="['unnnic-toast', `unnnic-toast--${type}`]"
      :role="type === 'error' ? 'alert' : 'status'"
      :aria-live="type === 'error' ? 'assertive' : 'polite'"
      data-testid="toast"
    >
      <section
        class="unnnic-toast__content"
        data-testid="toast-content"
      >
        <header
          class="unnnic-toast__header"
          data-testid="toast-header"
        >
          <UnnnicIcon
            :icon="typeConfig.icon"
            :scheme="typeConfig.scheme"
            size="ant"
            data-testid="toast-type-icon"
          />

          <h3
            class="unnnic-toast__title"
            data-testid="toast-title"
          >
            {{ title }}
          </h3>

          <UnnnicIcon
            icon="close"
            scheme="neutral-dark"
            size="ant"
            clickable
            class="unnnic-toast__close"
            data-testid="toast-close-icon"
            @click="handleClose"
            @keydown.enter="handleClose"
          />
        </header>

        <p
          v-if="description"
          data-testid="toast-text"
          class="unnnic-toast__text"
        >
          {{ description }}
        </p>
      </section>

      <UnnnicButton
        v-if="button"
        type="tertiary"
        :text="button.text"
        class="unnnic-toast__action-button"
        data-testid="toast-action-button"
        @click="handleAction"
        @keydown.enter="handleAction"
        @keydown.space.prevent="handleAction"
      />
    </aside>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

import UnnnicIcon from '@/components/Icon.vue';
import UnnnicButton from '@/components/Button/Button.vue';

import type { ToastProps, ToastEmits } from './types';
import type { SchemeColor } from '@/types/scheme-colors';

defineOptions({
  name: 'UnnnicToast',
});

const props = withDefaults(defineProps<ToastProps>(), {
  title: '',
  description: '',
  button: undefined,
  timeout: 5000,
  type: 'informational',
});

const emit = defineEmits<ToastEmits>();

const isVisible = ref(false);
let timeoutId: number | null = null;

const typeConfig = computed(() => {
  const configMap = {
    informational: { icon: 'info', scheme: 'blue-500' },
    attention: { icon: 'error', scheme: 'yellow-500' },
    success: { icon: 'check_circle', scheme: 'green-500' },
    error: { icon: 'cancel', scheme: 'red-500' },
  };

  return configMap[props.type || 'informational'] as {
    icon: string;
    scheme: SchemeColor;
  };
});

const handleClose = () => {
  isVisible.value = false;
  emit('close');
};

const handleAction = () => {
  if (props.button?.action) {
    props.button.action();
  }
};

const startTimeout = () => {
  if (props.timeout > 0) {
    timeoutId = window.setTimeout(() => {
      handleClose();
    }, props.timeout);
  }
};

const clearTimeout = () => {
  if (timeoutId) {
    window.clearTimeout(timeoutId);
    timeoutId = null;
  }
};

onMounted(() => {
  isVisible.value = true;
  startTimeout();
});

onUnmounted(() => {
  clearTimeout();
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-toast {
  position: fixed;
  bottom: $unnnic-space-4;
  right: $unnnic-space-4;
  z-index: 9999;

  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: $unnnic-space-2;

  min-width: 250px;
  max-width: 450px;
  padding: $unnnic-space-4;

  border-radius: $unnnic-radius-2;
  box-shadow: $unnnic-shadow-2;
  border: 1px solid $unnnic-color-border-base;

  &--informational {
    border-color: $unnnic-color-border-info;
    background-color: $unnnic-color-bg-info;
  }

  &--attention {
    border-color: $unnnic-color-border-warning;
    background-color: $unnnic-color-bg-warning;
  }

  &--success {
    border-color: $unnnic-color-border-success;
    background-color: $unnnic-color-bg-success;
  }

  &--error {
    border-color: $unnnic-color-border-critical;
    background-color: $unnnic-color-bg-critical;
  }

  &__content,
  &__header {
    width: 100%;

    display: flex;
    gap: $unnnic-space-2;
  }

  &__content {
    flex-direction: column;
    gap: $unnnic-space-2;
  }

  &__header {
    align-items: center;
  }

  &__title {
    flex: 1;

    margin: 0;

    font: $unnnic-font-action;
    color: $unnnic-color-fg-emphasized;
  }

  &__text {
    margin: 0;
    margin-left: $unnnic-space-7;

    font: $unnnic-font-caption-2;
    color: $unnnic-color-fg-emphasized;
  }
}

// Animations
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s ease;
}

.toast-slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.toast-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.toast-slide-enter-to,
.toast-slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>

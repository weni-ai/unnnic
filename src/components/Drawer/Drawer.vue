<template>
  <Drawer
    class="unnnic-drawer"
    data-testid="drawer"
    :open="modelValue"
    @update:open="$event ? () => {} : back()"
  >
    <DrawerContent
      v-bind="$attrs"
      :showOverlay="!withoutOverlay"
      data-testid="drawer-container"
      :size="mappedSize"
      :class="[
        'unnnic-drawer__container',
        `unnnic-drawer__container--${size}`,
        props.class,
      ].filter(Boolean).join(' ')"
    >
      <DrawerHeader class="unnnic-drawer__header">
        <section class="unnnic-drawer__title-container">
          <slot
            v-if="$slots.title"
            name="title"
          />

          <template v-else>
            <DrawerTitle
              class="unnnic-drawer__title"
              data-testid="drawer-title"
            >
              {{ title }}
            </DrawerTitle>
            <DrawerDescription
              v-if="description"
              class="unnnic-drawer__description"
              data-testid="drawer-description"
            >
              {{ description }}
            </DrawerDescription>
          </template>
        </section>
        <template #close>
          <DrawerClose>
            <UnnnicButton
              class="unnnic-drawer__close-icon"
              data-testid="close-icon"
              :iconCenter="closeIcon"
              size="small"
              type="tertiary"
              @click="back"
            />
          </DrawerClose>
        </template>
      </DrawerHeader>

      <section class="unnnic-drawer__content">
        <slot name="content"></slot>
      </section>

      <DrawerFooter
        v-if="showFooter"
        class="unnnic-drawer__footer"
        data-testid="footer"
      >
        <UnnnicButton
          v-if="secondaryButtonText"
          data-testid="secondary-button"
          size="large"
          type="tertiary"
          :disabled="disabledSecondaryButton"
          :loading="loadingSecondaryButton"
          :text="secondaryButtonText"
          @click="$emit('secondaryButtonClick')"
        />
        <UnnnicButton
          v-if="primaryButtonText"
          data-testid="primary-button"
          size="large"
          :disabled="disabledPrimaryButton"
          :loading="loadingPrimaryButton"
          :type="primaryButtonType"
          :text="primaryButtonText"
          @click="$emit('primaryButtonClick')"
        />
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>

<script setup>
import { computed } from 'vue';

import UnnnicButton from '../Button/Button.vue';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
} from '../ui/drawer';

defineOptions({
  name: 'UnnnicDrawer',
  inheritAttrs: false,
});

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  disabledPrimaryButton: {
    type: Boolean,
    default: false,
  },
  disabledSecondaryButton: {
    type: Boolean,
    default: false,
  },
  loadingPrimaryButton: {
    type: Boolean,
    default: false,
  },
  loadingSecondaryButton: {
    type: Boolean,
    default: false,
  },
  primaryButtonText: {
    type: String,
    default: '',
  },
  primaryButtonType: {
    type: String,
    default: 'primary',
  },
  secondaryButtonText: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'md',
    validator(val) {
      return ['md', 'lg', 'xl', 'gt'].includes(val);
    },
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
  withoutOverlay: {
    type: Boolean,
    default: false,
  },
  closeIcon: {
    type: String,
    default: 'arrow_forward',
  },
  distinctCloseBack: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['primaryButtonClick', 'secondaryButtonClick', 'close', 'back']);
const showFooter = computed(() => !!(props.primaryButtonText || props.secondaryButtonText));
const mappedSize = computed(() => {
  const sizes = {
    md: 'medium',
    lg: 'large',
    xl: 'extra-large',
    gt: 'giant',
  }
  return sizes[props.size] || 'medium';
});

const close = () => {
  emit('close');
};

const back = () => {
  if (props.distinctCloseBack) {
    emit('back');
  } else {
    close();
  }
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.unnnic-drawer {
  z-index: 8;
}

.unnnic-drawer__container {
  z-index: 10;

  .unnnic-drawer__close-icon {
    margin: $unnnic-spacing-nano;
    display: flex;
  }

  .unnnic-drawer__content {
    overflow-y: auto;
    color: $unnnic-color-neutral-cloudy;
    padding: $unnnic-spacing-md $unnnic-spacing-md 0 $unnnic-spacing-md;
    flex: 1 0 0;
  }

  .unnnic-drawer__footer {
    display: flex;
    padding: $unnnic-spacing-md;
    gap: $unnnic-spacing-ant;
    > * {
      flex-grow: 1;
    }
  }
}
</style>

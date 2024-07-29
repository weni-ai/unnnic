<template>
  <section
    v-if="modelValue"
    class="unnnic-modal-dialog"
  >
    <section
      class="unnnic-modal-dialog__overlay"
      @click.stop="!persistent && close()"
    />
    <section
      :class="[
        'unnnic-modal-dialog__container',
        `unnnic-modal-dialog__container--${size}`,
      ]"
    >
      <section
        v-if="$slots.leftSidebar"
        class="unnnic-modal-dialog__container__left-sidebar"
      >
        <slot name="leftSidebar" />
      </section>

      <section class="unnnic-modal-dialog__container__body">
        <header
          v-if="title"
          class="unnnic-modal-dialog__container__header"
        >
          <section class="unnnic-modal-dialog__container__title-container">
            <UnnnicIcon
              v-if="icon || type"
              class="unnnic-modal-dialog__container__title-icon"
              :icon="icon || iconsMapper[type]?.icon"
              :scheme="iconScheme || iconsMapper[type]?.scheme"
              size="md"
            />
            <h1 class="unnnic-modal-dialog__container__title-text">
              {{ title }}
            </h1>
          </section>
          <UnnnicIcon
            v-if="showCloseIcon"
            icon="close"
            clickable
            @click="close()"
          />
        </header>
        <section class="unnnic-modal-dialog__container__content">
          <slot></slot>
        </section>
        <section
          v-if="primaryButtonProps.text"
          :class="[
            'unnnic-modal-dialog__container__actions',
            {
              'unnnic-modal-dialog__container__actions--divider':
                showActionsDivider,
            },
          ]"
        >
          <UnnnicButton
            v-if="!hideSecondaryButton"
            v-bind="secondaryButtonProps"
            type="tertiary"
            :text="secondaryButtonProps.text || i18n('cancel')"
            class="unnnic-modal-dialog__container__actions__secondary-button"
            @click.stop="
              secondaryButtonProps.text
                ? $emit('secondaryButtonClick')
                : close()
            "
          />
          <UnnnicButton
            v-bind="primaryButtonProps"
            :type="
              primaryButtonProps.type ||
              primaryButtonTypeMapper[type] ||
              'primary'
            "
            :text="primaryButtonProps.text"
            class="unnnic-modal-dialog__container__actions__primary-button"
            @click.stop="$emit('primaryButtonClick')"
          />
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import UnnnicIcon from '../Icon.vue';
import UnnnicButton from '../Button/Button.vue';
import UnnnicI18n from '../../mixins/i18n';

export default {
  name: 'UnnnicModalDialog',
  components: {
    UnnnicIcon,
    UnnnicButton,
  },
  mixins: [UnnnicI18n],
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: '',
      validate(type) {
        return ['success', 'warning', 'attention'].includes(type);
      },
    },
    size: {
      type: String,
      default: 'md',
      validate(size) {
        return ['sm', 'md', 'lg'].includes(size);
      },
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    iconScheme: {
      type: String,
      default: '',
    },
    showCloseIcon: {
      type: Boolean,
      default: false,
    },
    showActionsDivider: {
      type: Boolean,
      default: false,
    },
    primaryButtonProps: {
      type: Object,
      default: () => ({}),
    },
    hideSecondaryButton: {
      type: Boolean,
      default: false,
    },
    secondaryButtonProps: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['primaryButtonClick', 'secondaryButtonClick', 'update:modelValue'],

  data() {
    return {
      defaultTranslations: {
        cancel: {
          'pt-br': 'Cancelar',
          en: 'Cancel',
          es: 'Cancelar',
        },
      },
      iconsMapper: {
        success: { icon: 'check_circle', scheme: 'aux-green-500' },
        warning: { icon: 'warning', scheme: 'aux-red-500' },
        attention: { icon: 'error', scheme: 'aux-yellow-500' },
      },
      primaryButtonTypeMapper: {
        success: 'primary',
        warning: 'warning',
        attention: 'attention',
      },
    };
  },
  watch: {
    modelValue(value) {
      this.updateBodyOverflow(value);
    },
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false);
    },
    updateBodyOverflow(isHidden) {
      document.body.style.overflow = isHidden ? 'hidden' : '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.unnnic-modal-dialog {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  &__overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
}

.unnnic-modal-dialog__container {
  display: flex;
  background: $unnnic-color-neutral-white;
  border-radius: $unnnic-spacing-xs;
  box-shadow: $unnnic-shadow-level-near;
  position: fixed;
  max-height: calc(100vh - $unnnic-spacing-giant);
  overflow: hidden;

  &--sm {
    width: 400px;
  }
  &--md {
    width: 600px;
  }
  &--lg {
    width: 800px;
  }

  &__left-sidebar {
    background-color: $unnnic-color-neutral-black;
    color: $unnnic-color-neutral-white;
  }

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $unnnic-color-neutral-soft;
    padding: $unnnic-spacing-md;
    flex-shrink: 0;
  }

  &__title-container {
    display: flex;
    align-items: center;
    gap: $unnnic-spacing-ant;
  }

  &__title-icon {
    font-size: 28px;
  }

  &__title-text {
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-title-sm;
    font-weight: $unnnic-font-weight-black;
    line-height: 28px;
    color: $unnnic-color-neutral-darkest;
  }

  &__content {
    padding: $unnnic-spacing-md;
    color: $unnnic-color-neutral-cloudy;
    flex-grow: 1;
    overflow-y: auto;
    font-family: $unnnic-font-family-secondary;

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

  &__actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'secondary-button primary-button';
    gap: $unnnic-spacing-sm;
    padding: $unnnic-spacing-md;
    flex-shrink: 0;

    &--divider {
      border-top: 1px solid $unnnic-color-neutral-soft;
    }

    &__secondary-button {
      grid-area: secondary-button;
    }

    &__primary-button {
      grid-area: primary-button;
    }
  }
}
</style>

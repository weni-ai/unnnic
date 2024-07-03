<template>
  <section :class="['unnnic-modal-dialog', `unnnic-modal-dialog--${size}`]">
    <header
      v-if="title"
      class="unnnic-modal-dialog__header"
    >
      <section class="unnnic-modal-dialog__title-container">
        <UnnnicIcon
          v-if="icon || type"
          class="unnnic-modal-dialog__title-icon"
          :icon="icon || iconsMapper[type].icon"
          :scheme="iconScheme || iconsMapper[type].scheme"
          size="md"
        />
        <h1 class="unnnic-modal-dialog__title-text">{{ title }}</h1>
      </section>
      <UnnnicIcon
        v-if="showCloseIcon"
        icon="close"
        clickable
        @click="$emit('close')"
      />
    </header>
    <section class="unnnic-modal-dialog__content">
      <slot></slot>
    </section>
    <section
      v-if="primaryButtonText"
      :class="[
        'unnnic-modal-dialog__actions',
        showActionsDivider && 'unnnic-modal-dialog__actions--divider',
      ]"
    >
      <UnnnicButton
        type="tertiary"
        :text="secondaryButtonText || i18n('cancel')"
        @click.stop="
          secondaryButtonText ? $emit('secondaryButtonClick') : $emit('close')
        "
      />
      <UnnnicButton
        :type="primaryButtonType || primaryButtonTypeMapper[type] || 'primary'"
        :text="primaryButtonText"
        @click.stop="$emit('primaryButtonClick')"
      />
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
      default: 'title',
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
    primaryButtonText: {
      type: String,
      default: '',
    },
    secondaryButtonText: {
      type: String,
      default: '',
    },
    primaryButtonType: {
      type: String,
      default: '',
    },
    showActionsDivider: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close', 'primaryButtonClick', 'secondaryButtonClick'],

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
  border-radius: $unnnic-spacing-xs;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  &--sm {
    width: 400px;
  }
  &--md {
    width: 600px;
  }
  &--lg {
    width: 800px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $unnnic-color-neutral-soft;
    padding: $unnnic-spacing-md;
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
  }

  &__actions {
    display: flex;
    gap: 16px;
    padding: $unnnic-spacing-md;
    > * {
      flex-grow: 1;
    }
    &--divider {
      border-top: 1px solid $unnnic-color-neutral-soft;
    }
  }
}
</style>

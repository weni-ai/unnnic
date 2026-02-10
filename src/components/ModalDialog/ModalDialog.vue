<template>
  <UnnnicDialog
    :open="modelValue"
    @update:open="$emit('update:modelValue', $event)"
  >
    <UnnnicDialogContent
      v-bind="$attrs"
      :size="size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'medium'"
      :parentClass="['unnnic-modal-dialog', $attrs.class]"
      class="unnnic-modal-dialog__container"
      data-testid="modal-dialog"
      @escape-key-down="persistentHandler"
      @pointer-down-outside="persistentHandler"
    >
      <section
        :class="[
          'unnnic-modal-dialog__container__body',
          {
            'unnnic-modal-dialog__container__body--left-sidebar':
              $slots.leftSidebar,
          },
        ]"
      >
        <section
          v-if="$slots.leftSidebar"
          class="unnnic-modal-dialog__container__left-sidebar"
        >
          <slot name="leftSidebar" />
        </section>
        <UnnnicDialogHeader
          v-if="title || $slots.title"
          :closeButton="showCloseIcon"
          :type="type"
        >
          <UnnnicDialogTitle>
            <slot name="title">
              {{ title }}
            </slot>
          </UnnnicDialogTitle>
        </UnnnicDialogHeader>
        <section class="unnnic-modal-dialog__container__content">
          <slot></slot>
        </section>

        <UnnnicDialogFooter
          v-if="primaryButtonProps.text"
          :class="[
            'unnnic-modal-dialog__container__actions',
            {
              'unnnic-modal-dialog__container__actions--divider':
                showActionsDivider,
            },
          ]"
          :divider="showActionsDivider"
          data-testid="actions-section"
        >
          <UnnnicButton
            v-if="!hideSecondaryButton"
            v-bind="secondaryButtonProps"
            data-testid="secondary-button"
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
            data-testid="primary-button"
            :type="
              primaryButtonProps.type ||
              primaryButtonTypeMapper[type] ||
              'primary'
            "
            :text="primaryButtonProps.text"
            class="unnnic-modal-dialog__container__actions__primary-button"
            @click.stop="$emit('primaryButtonClick')"
          />
        </UnnnicDialogFooter>
      </section>
    </UnnnicDialogContent>
  </UnnnicDialog>
</template>

<script>
import UnnnicButton from '../Button/Button.vue';
import UnnnicI18n from '../../mixins/i18n';
import UnnnicDialog from '../ui/dialog/Dialog.vue';
import UnnnicDialogContent from '../ui/dialog/DialogContent.vue';
import UnnnicDialogHeader from '../ui/dialog/DialogHeader.vue';
import UnnnicDialogTitle from '../ui/dialog/DialogTitle.vue';
import UnnnicDialogFooter from '../ui/dialog/DialogFooter.vue';

export default {
  name: 'UnnnicModalDialog',
  components: {
    UnnnicButton,
    UnnnicDialog,
    UnnnicDialogContent,
    UnnnicDialogHeader,
    UnnnicDialogTitle,
    UnnnicDialogFooter,
  },
  mixins: [UnnnicI18n],
  inheritAttrs: false,
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
      primaryButtonTypeMapper: {
        success: 'primary',
        warning: 'warning',
        attention: 'attention',
      },
    };
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false);
    },
    persistentHandler(event) {
      if (this.persistent) {
        event.preventDefault();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-modal-dialog__container {
  &__left-sidebar {
    background-color: $unnnic-color-neutral-black;
    color: $unnnic-color-neutral-white;

    grid-area: left-sidebar;
    grid-row: span 3;
  }

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;

    overflow-y: auto;

    &--left-sidebar {
      border-radius: $unnnic-radius-4 0 0 $unnnic-radius-4;
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-areas: 'left-sidebar content';
    }
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
}
</style>

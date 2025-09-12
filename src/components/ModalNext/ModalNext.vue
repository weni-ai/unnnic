<template>
  <div
    :class="[
      'unnnic-modal',
      `type-${type}`,
      {
        'show-close-button': showCloseButton,
        'show-actions-area':
          validate || actionPrimaryLabel || actionSecondaryLabel,
      },
    ]"
    @click.self="closeByDarkBackground"
  >
    <div class="container">
      <template v-if="type === 'default'">
        <div
          v-if="showCloseButton"
          class="header"
        >
          <UnnnicIcon
            icon="close-1"
            size="sm"
            clickable
            @click="$emit('close')"
          />
        </div>

        <div class="content">
          <slot></slot>
        </div>
      </template>

      <div
        v-else-if="type === 'video'"
        class="content"
      >
        <div class="aspect-ratio-box">
          <iframe
            class="aspect-ratio-box-inside"
            type="text/html"
            :src="url"
            frameborder="0"
            allowfullscreen
          />
        </div>
      </div>

      <template v-else-if="type === 'alert'">
        <div
          v-if="showCloseButton"
          class="header"
        >
          <UnnnicIcon
            icon="close-1"
            size="sm"
            clickable
            @click="$emit('close')"
          />
        </div>

        <div :class="['content', { 'with-validation': validate }]">
          <div
            v-if="icon"
            class="icon"
          >
            <UnnnicIcon
              :icon="icon"
              :scheme="scheme"
              size="xl"
            ></UnnnicIcon>
          </div>

          <div
            v-if="$slots.title?.().length || title"
            class="title"
          >
            <slot
              v-if="$slots.title?.().length"
              name="title"
            ></slot>

            <template v-else>{{ title }}</template>
          </div>

          <div
            v-if="$slots.description?.().length || description"
            class="description"
          >
            <slot
              v-if="$slots.description?.().length"
              name="description"
            >
            </slot>

            <template v-else>{{ description }}</template>
          </div>

          <div
            v-if="validate"
            class="confirm-text"
          >
            <UnnnicInput
              v-model="confirmText"
              :placeholder="validatePlaceholder"
            >
              <template #label>
                <span v-html="validateLabel" />
              </template>
            </UnnnicInput>
          </div>

          <div
            v-if="validate || actionPrimaryLabel || actionSecondaryLabel"
            class="actions"
            :style="{ marginTop: validate ? '0' : undefined }"
          >
            <UnnnicButton
              v-if="validate || actionSecondaryLabel"
              type="tertiary"
              :disabled="actionPrimaryLoading"
              @click="
                $attrs['onClickActionSecondary']
                  ? $emit('click-action-secondary', { close: justClose })
                  : $emit('close')
              "
            >
              {{ actionSecondaryLabel }}
            </UnnnicButton>

            <UnnnicButton
              v-if="validate || actionPrimaryLabel"
              :type="actionPrimaryButtonType"
              :class="
                actionPrimaryButtonType === 'primary'
                  ? ['button', buttonType]
                  : undefined
              "
              :disabled="disabled || actionPrimaryLoading"
              :loading="actionPrimaryLoading"
              @click="
                $attrs['onClickActionPrimary']
                  ? $emit('click-action-primary', { close: justClose })
                  : null
              "
            >
              {{ actionPrimaryLabel }}
            </UnnnicButton>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';
import UnnnicInput from '../Input/Input.vue';
import UnnnicButton from '../Button/Button.vue';

export default {
  name: 'UnnnicModalNext',
  components: {
    UnnnicIcon,
    UnnnicInput,
    UnnnicButton,
  },

  props: {
    type: {
      type: String,
      default: 'default',
    },

    url: String,
    icon: String,
    scheme: String,
    title: String,
    description: String,
    validate: String,
    validatePlaceholder: String,
    validateLabel: String,

    actionPrimaryLabel: String,
    actionPrimaryLoading: Boolean,
    actionPrimaryButtonType: {
      type: String,
      default: 'primary',
    },

    actionSecondaryLabel: String,

    showCloseButton: Boolean,
  },

  emits: ['close'],

  data() {
    return {
      confirmText: '',
    };
  },

  computed: {
    isPersistent() {
      return this.data?.persistent;
    },

    buttonType() {
      if (this.disabled) {
        return '';
      }

      if (this.scheme === 'feedback-red') {
        return 'danger';
      }

      if (this.scheme === 'feedback-yellow') {
        return 'alert';
      }

      return '';
    },

    disabled() {
      if (this.validate) {
        return this.confirmText !== this.validate;
      }
      // return (
      //   _.get(this.data, 'validate.text') &&
      //   this.confirmText !== this.data.validate.text
      // );

      return false;
    },
  },

  methods: {
    closeByDarkBackground() {
      this.$emit('close');
    },
    close() {
      this.justClose();

      if (this.data?.onClose) {
        this.data.onClose();
      }
    },

    justClose() {
      // this.closeModal(this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-modal {
  z-index: 5;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, $unnnic-opacity-level-overlay);
  display: flex;
  align-items: center;
  padding: 0 12.88%;
  box-sizing: border-box;

  .container {
    flex: 1;
    max-height: 90vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    border-radius: $unnnic-border-radius-sm;
    background-color: $unnnic-color-background-carpet;
    box-shadow: $unnnic-shadow-level-separated;
    padding-top: $unnnic-spacing-stack-giant;

    padding: $unnnic-spacing-stack-giant $unnnic-inline-md;

    .content {
      $scroll-size: $unnnic-inline-nano;

      flex: 1;
      overflow: overlay;

      padding-right: calc(#{$unnnic-inline-xs} + #{$scroll-size});
      width: 100%;

      &::-webkit-scrollbar {
        width: $scroll-size;
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

  &.type-video {
    .container {
      max-width: 60 * $unnnic-font-size;
      margin: 0 auto;
      padding: 0 $unnnic-inline-md;
      // padding-top: $unnnic-spacing-stack-giant;
      padding-bottom: $unnnic-spacing-stack-lg;
    }

    .content {
      .aspect-ratio-box {
        height: 0;
        overflow: hidden;
        padding-top: calc(9 / 16 * 100%);
        position: relative;
      }

      .aspect-ratio-box-inside {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }

  &.type-default .container {
    max-width: 31.125 * $unnnic-font-size;
    margin: 0 auto;
    padding: 0 $unnnic-inline-md;
    padding-top: $unnnic-spacing-stack-sm;
    padding-bottom: $unnnic-spacing-stack-giant;
  }

  .icon {
    text-align: center;
    margin-bottom: $unnnic-spacing-stack-sm;
  }

  &.type-confirm,
  &.type-alert {
    .title {
      text-align: center;
      font-family: $unnnic-font-family-secondary;
      color: $unnnic-color-neutral-darkest;
      font-weight: $unnnic-font-weight-black;
      font-size: $unnnic-font-size-title-sm;
      line-height: ($unnnic-font-size-title-sm + $unnnic-line-height-medium);
      padding-bottom: $unnnic-spacing-stack-md;
    }

    .description {
      text-align: center;

      font-family: $unnnic-font-family-secondary;
      color: $unnnic-color-neutral-cloudy;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-lg;
      line-height: ($unnnic-font-size-body-lg + $unnnic-line-height-medium);
    }
  }

  &.show-close-button .container {
    padding-top: $unnnic-spacing-stack-sm;

    .header {
      display: flex;
      justify-content: flex-end;
      margin-bottom: $unnnic-spacing-stack-xs;
    }
  }

  &.show-actions-area .container {
    padding-bottom: $unnnic-spacing-stack-lg;
  }

  &.confirm .container {
    max-width: 31.125 * $unnnic-font-size;
    margin: 0 auto;
    padding: 0 $unnnic-spacing-stack-lg;
    padding-top: $unnnic-spacing-stack-giant;
    padding-bottom: $unnnic-inline-md;

    .description {
      margin-bottom: $unnnic-spacing-stack-giant;
    }
  }

  &.type-alert .container {
    max-width: 31.125 * $unnnic-font-size;
    margin: 0 auto;

    .header {
      margin-bottom: $unnnic-spacing-stack-xs;
      text-align: right;
    }

    .content.with-validation .description {
      margin-bottom: $unnnic-spacing-stack-lg;
    }

    .confirm-text {
      margin-bottom: $unnnic-spacing-stack-lg;
    }

    .actions {
      display: grid;
      column-gap: $unnnic-inline-lg;
      grid-auto-flow: column;
      margin-top: $unnnic-spacing-stack-giant;

      .button {
        &.danger:not([disabled]) {
          background-color: $unnnic-color-feedback-red;
          color: $unnnic-color-neutral-snow;
        }

        &.alert:not([disabled]) {
          background-color: $unnnic-color-feedback-yellow;
          color: $unnnic-color-neutral-snow;
        }
      }
    }
  }
}
</style>

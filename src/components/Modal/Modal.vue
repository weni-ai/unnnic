<template>
  <Transition name="modal">
    <div
      v-if="showModal"
      v-bind="$attrs"
      ref="modalContainer"
      :class="['unnnic-modal']"
    >
      <div
        class="unnnic-modal-container"
        @click.self="onOutsideCloseClick"
      >
        <div
          ref="modal"
          class="unnnic-modal-container-background"
        >
          <div class="unnnic-modal-container-background-body">
            <div
              v-if="closeIcon"
              class="unnnic-modal-container-background-body-close_icon"
            >
              <UnnnicIcon
                icon="close-1"
                scheme="neutral-dark"
                size="sm"
                clickable
                @click="onCloseClick"
              />
            </div>
            <div
              v-if="hasIcon"
              class="unnnic-modal-container-background-body__icon-slot"
            >
              <slot name="icon"></slot>
            </div>
            <div
              v-if="modalIcon"
              :class="[
                'unnnic-modal-container-background-body-alert_icon',
                `unnnic-card-scheme--${scheme}--icon`,
                closeIcon
                  ? ''
                  : 'unnnic-modal-container-background-body-spacing_header',
              ]"
            >
              <UnnnicIcon
                :scheme="scheme"
                :icon="modalIcon"
                size="xl"
              />
            </div>
            <div class="unnnic-modal-container-background-body-title">
              {{ text }}
            </div>
          </div>
          <div
            class="unnnic-modal-container-background-body-description-container"
          >
            <div class="unnnic-modal-container-background-body-description">
              {{ description }} <slot name="message" />
              <slot name="default" />
            </div>
          </div>
          <div
            v-if="hasAlertMessage"
            class="unnnic-modal-container-background-report"
          >
            {{ alertMessage }}
          </div>
          <div
            v-if="hasButton"
            class="unnnic-modal-container-background-button"
          >
            <slot name="options" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'UnnnicModal',
  components: {
    UnnnicIcon,
  },
  props: {
    text: {
      type: String,
      default: null,
    },
    modalIcon: {
      type: String,
      default: null,
    },
    closeIcon: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: null,
    },
    alertMessage: {
      type: String,
      default: null,
    },
    showModal: {
      type: Boolean,
      default: true,
    },
    scheme: {
      type: String,
      default: null,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasAlertMessage() {
      return !(this.alertMessage === null || this.alertMessage.length === 0);
    },
    hasButton() {
      return !!this.$slots.options?.().length;
    },
    hasIcon() {
      return !!this.$slots.icon?.().length;
    },
  },
  mounted() {
    if (window.innerWidth <= 600) {
      this.mobileAnimateOpen();
    }
  },
  methods: {
    mobileAnimateReset() {
      if (this.$refs.modalContainer) {
        this.$refs.modalContainer.style.transition = null;
      }
      if (this.$refs.modal) {
        this.$refs.modal.style.transition = null;
      }
    },

    mobileAnimateOpen() {
      this.$nextTick(() => {
        if (this.$refs.modalContainer) {
          this.$refs.modalContainer.style.transition = 'none';
          this.$refs.modalContainer.style.backgroundColor = 'transparent';
        }
        if (this.$refs.modal) {
          this.$refs.modal.style.transition = 'none';
          this.$refs.modal.style.marginBottom = `${-this.$refs.modal.offsetHeight}px`;
        }

        setTimeout(() => {
          if (this.$refs.modalContainer) {
            this.$refs.modalContainer.style.transition =
              'background-color 0.2s';
            this.$refs.modalContainer.style.backgroundColor = null;
          }
          if (this.$refs.modal) {
            this.$refs.modal.style.transition = 'margin-bottom 0.2s';
            this.$refs.modal.style.marginBottom = null;
          }

          setTimeout(() => {
            this.mobileAnimateReset();
          }, 200);
        });
      });
    },

    mobileAnimateClose() {
      return new Promise((resolve) => {
        if (this.$refs.modalContainer) {
          this.$refs.modalContainer.style.transition = 'background-color 0.2s';
          this.$refs.modalContainer.style.backgroundColor = 'transparent';
        }
        if (this.$refs.modal) {
          this.$refs.modal.style.transition = 'margin-bottom 0.2s';
          this.$refs.modal.style.marginBottom = `${-this.$refs.modal.offsetHeight}px`;
        }

        setTimeout(() => {
          this.mobileAnimateReset();
          resolve();
        }, 200);
      });
    },

    onOutsideCloseClick() {
      if (this.persistent) {
        return;
      }

      this.onCloseClick();
    },

    async onCloseClick() {
      console.log('keycloak log', window);

      if (window.innerWidth <= 600) {
        await this.mobileAnimateClose();
      }

      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;

  &-container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    &-background {
      width: 31.125 * $unnnic-font-size;
      box-shadow: $unnnic-shadow-level-separated;
      transition: all 0.3s ease;
      border-radius: $unnnic-border-radius-sm;
      overflow: hidden;

      &-body {
        background-color: $unnnic-color-background-carpet;
        padding: 0 $unnnic-inline-md;
        text-align: center;
        padding-top: $unnnic-spacing-sm;

        &-title {
          text-align: center;
          font-family: $unnnic-font-family-secondary;
          color: $unnnic-color-neutral-darkest;
          font-weight: $unnnic-font-weight-black;
          font-size: $unnnic-font-size-title-sm;
          line-height: (
            $unnnic-font-size-title-sm + $unnnic-line-height-medium
          );
          padding-bottom: $unnnic-spacing-stack-md;
        }

        &-close_icon {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          padding-bottom: $unnnic-spacing-stack-xs;
        }

        &__icon-slot {
          margin-bottom: $unnnic-spacing-md;
        }

        &-alert_icon {
          width: 100%;
          display: flex;
          justify-content: center;
          padding-bottom: $unnnic-spacing-stack-sm;
        }

        &-spacing_header {
          padding-top: $unnnic-spacing-stack-giant - $unnnic-spacing-sm;
        }

        &-description {
          width: 100%;
          text-align: center;
          overflow: auto;
          font-family: $unnnic-font-family-secondary;
          color: $unnnic-color-neutral-cloudy;
          font-weight: $unnnic-font-weight-regular;
          font-size: $unnnic-font-size-body-lg;
          line-height: ($unnnic-font-size-body-lg + $unnnic-line-height-medium);

          &-container {
            background-color: $unnnic-color-background-carpet;
            padding: 0 $unnnic-inline-md;
            box-sizing: border-box;
            display: flex;
            overflow: hidden;
            padding-bottom: $unnnic-spacing-stack-giant;
          }
        }
      }

      &-report {
        width: 100%;
        min-height: 4.25 * $unnnic-font-size;
        background-color: $unnnic-color-neutral-soft;
        display: flex;
        justify-content: center;
        align-items: center;

        font-family: $unnnic-font-family-secondary;
        color: $unnnic-color-neutral-dark;
        font-weight: $unnnic-font-weight-regular;
        font-size: $unnnic-font-size-body-md;
        line-height: ($unnnic-font-size-body-md + $unnnic-line-height-medium);
      }

      &-button {
        display: flex;
        width: 100%;
        padding: $unnnic-inset-md;
        box-sizing: border-box;
        background-color: $unnnic-color-background-carpet;
        border-bottom-left-radius: $unnnic-border-radius-sm;
        border-bottom-right-radius: $unnnic-border-radius-sm;

        > * {
          flex: 1;
        }

        > :not(:last-child) {
          margin-right: $unnnic-spacing-stack-lg;
        }
      }
    }

    @media (max-width: 600px) {
      align-items: flex-end;

      &-background {
        width: 100%;
        border-radius: 1.5 * $unnnic-font-size 1.5 * $unnnic-font-size 0 0;
        box-shadow: 0px -8px 16px 0px rgba(0, 0, 0, 0.08);
        max-height: 90vh;
        display: flex;
        flex-direction: column;

        &-body {
          min-height: initial;

          &-close_icon {
            padding-bottom: 0;
          }

          &-title {
            font-weight: $unnnic-font-weight-bold;
            color: $unnnic-color-neutral-dark;
          }

          &-description {
            text-align: initial;
            padding-right: $unnnic-spacing-sm;
            margin-right: -$unnnic-spacing-sm;

            &-container {
              padding-bottom: $unnnic-spacing-md;
            }
          }
        }
      }
    }
  }
}
</style>

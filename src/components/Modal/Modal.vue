<template>
<transition name="modal" v-if="showModal">
  <div
    v-bind="$attrs"
    :class="['unnic-modal']" v-on="$listeners">
    <div class="unnic-modal-container">
      <div class="unnic-modal-container-background">
        <div class="unnic-modal-container-background-body">
          <div
              v-if="closeIcon"
              class="unnic-modal-container-background-body-close_icon">
              <u-icon
              icon="close-1"
              size="sm"
              clickable
              @click="onCloseClick"/>
            </div>
            <div :class="[
            'unnic-modal-container-background-body-alert_icon',
            `unnic-card-scheme--${scheme}--icon`,
            closeIcon ? '' : 'unnic-modal-container-background-body-spacing_header']">
              <u-icon
               :icon="modalIcon"
                size="xl"/>
              </div>
              <div class="unnic-modal-container-background-body-title">
                  <span>{{ text }}</span>
              </div>
              <div class="unnic-modal-container-background-body-description">
                  <span>{{ description }}</span>
              </div>
        </div>
        <div class="unnic-modal-container-background-report" v-if="hasAlertMessage">
            <span>
              {{ alertMessage }}
            </span>
        </div>
        <div v-else-if="hasButton" class="unnic-modal-container-background-button">
            <slot name="options" />
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import UIcon from '../Icon.vue';

export default {
  name: 'unnic-modal',
  components: { UIcon },
  props: {
    text: {
      type: String,
      default: null,
    },
    modalIcon: {
      type: String,
      default: 'alert-circle-1',
    },
    closeIcon: {
      type: Boolean,
      default: false,
    },
    hasAlertMessage: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: null,
    },
    alertMessage: {
      type: String,
      default: null,
    },
    hasButton: {
      type: Boolean,
      default: false,
    },
    showModal: {
      type: Boolean,
      default: true,
    },
    scheme: {
      type: String,
      default: null,
    },
  },
  methods: {
    onCloseClick() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnic.scss';

.unnic-modal {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;

  &-container{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

  &-background {
    width: 31.125rem;
    box-shadow: $unnic-shadow-level-separated;
    transition: all 0.3s ease;

  &-body{
      min-height: 13.75rem;
      border-top-left-radius: $unnic-border-radius-sm;
      border-top-right-radius: $unnic-border-radius-sm;
      background-color: $unnic-color-background-carpet;
      padding: 0 $unnic-inline-md;
      text-align: center;

    &-title{
      display: flex;
      justify-content: center;
      align-items: center;

      span {
      font-family: $unnic-font-family-secondary;
      color: $unnic-color-neutral-darkest;
      font-weight: $unnic-font-weight-black;
      font-size: $unnic-font-size-title-sm;
      line-height: ($unnic-font-size-title-sm + $unnic-line-height-medium);
      padding-bottom: $unnic-spacing-stack-md;
      }
    }

    &-close_icon{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        color: $unnic-color-neutral-dark;
        padding-top: $unnic-spacing-stack-sm;
        padding-bottom: $unnic-spacing-stack-xs;
    }
    &-alert_icon{
        width: 100%;
        display: flex;
        justify-content: center;
        padding-bottom: $unnic-spacing-stack-sm;
    }

    &-spacing_header{
      padding-top: $unnic-spacing-stack-giant;
    }

    &-description{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

        span {
          font-family: $unnic-font-family-secondary;
          color: $unnic-color-neutral-cloudy;
          font-weight: $unnic-font-weight-regular;
          font-size: $unnic-font-size-body-lg;
          line-height: ($unnic-font-size-body-lg + $unnic-line-height-medium);
          padding-bottom: $unnic-spacing-stack-giant;
        }
    }
  }

  &-report{
    width: 100%;
    min-height: 4.25rem;
    background-color: $unnic-color-neutral-soft;
    border-bottom-left-radius: $unnic-border-radius-sm;
    border-bottom-right-radius: $unnic-border-radius-sm;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-family: $unnic-font-family-secondary;
      color: $unnic-color-neutral-dark;
      font-weight: $unnic-font-weight-regular;
      font-size: $unnic-font-size-body-md;
      line-height: ($unnic-font-size-body-md + $unnic-line-height-medium);
    }
  }

      &-button {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        padding-bottom: $unnic-inline-giant;
        background-color: $unnic-color-background-carpet;
        border-bottom-left-radius: $unnic-border-radius-sm;
        border-bottom-right-radius: $unnic-border-radius-sm;
      }
    }
  }
}
</style>

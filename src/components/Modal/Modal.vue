<template>
    <div
    v-bind="$attrs"
    :class="['unnic-modal']" v-on="$listeners">
      <div class="unnic-modal-body">
            <div
              v-if="closeIcon"
              :class="{ 'unnic-modal-body-close_icon': closeIcon }">
              <u-icon
              icon="close-1"
              size="sm"/>
            </div>
            <div :class="{
              'unnic-modal-body-alert_icon': true,
              'unnic-modal-body-spacing_header': !closeIcon,
              }">
              <u-icon
              :icon="modalIcon"
              size="xl"/>
            </div>
            <div class="unnic-modal-body-title">
                <span>{{ text }}</span>
            </div>
             <div class="unnic-modal-body-description">
                <span>{{ description }}</span>
            </div>
      </div>
      <div class="unnic-modal-report" v-if="hasAlertMessage">
          <span>
            {{ alertMessage }}
          </span>
      </div>
    </div>
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
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnic.scss';

.unnic-modal {
  display: flex;
  flex-direction: column;
  width: 31.125rem;
  box-shadow: $unnic-shadow-level-separated;

  &-body{
    min-height: 13.75rem;
    border-radius: $unnic-border-radius-sm;
    background-color: $unnic-color-background-carpet;
    padding: 0 $unnic-inline-md;
    word-break: break-all;

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
        color: $unnic-color-feedback-yellow;
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
}
</style>

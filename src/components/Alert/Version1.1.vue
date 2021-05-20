<template>
  <div :class="['alert', `alert-position--${position}`]">
    <unnnic-icon-svg
      :icon="icon"
      :scheme="scheme"
      size="sm"
    />

    <div class="alert__content">
      <div class="alert__title">
        {{ title.toUpperCase() }}
      </div>
      <div v-show="text" class="alert__text">
        {{ text }}
      </div>
    </div>

    <div
      v-if="hideCloseText"
      class="alert__close-text unnnic--clickable"
      @click="onClose"
    >
      {{ closeText.toUpperCase() }}
    </div>
  </div>
</template>

<script>
import UnnnicIconSvg from '../Icon-svg.vue';

export default {
  components: {
    UnnnicIconSvg,
  },
  props: {
    version: {
      type: String,
      default: '1.0',
    },

    title: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    scheme: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    hideCloseText: {
      type: Boolean,
      default: true,
    },
    closeText: {
      type: String,
      default: 'CLOSE',
    },
    position: {
      type: String,
      default: 'top-right',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.alert {
  position: fixed;
  padding: $unnnic-inset-xs;

  display: inline-flex;
  align-items: center;

  font-family: $unnnic-font-family-secondary;
  border-radius: $unnnic-border-radius-sm;

  background-color: $unnnic-color-background-snow;
  box-shadow: $unnnic-shadow-level-near;
  word-spacing: $unnnic-spacing-inline-xs;
  position: fixed;

  z-index: 9999;

  &-position {
    &--top-right {
      top: 1rem;
      right: 1rem;
    }
    &--top-left {
      top: 1rem;
      left: 1rem;
    }
    &--bottom-right {
      bottom: 1rem;
      right: 1rem;
    }
    &--bottom-left {
      bottom: 1rem;
      left: 1rem;
    }
  }

  &__content {
    flex: 1;
    margin:0 $unnnic-inline-xs;
  }

  &__title {
    color: $unnnic-color-neutral-darkest;
    font-size: $unnnic-font-size-body-md;
    font-family: $unnnic-font-family-secondary;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
    font-weight: $unnnic-font-weight-bold;
  }

  &__text {
    color: $unnnic-color-neutral-dark;
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
    font-weight: $unnnic-font-weight-regular;
  }

  &__close {
    &-text {
      color: $unnnic-color-brand-sec;
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
      font-weight: $unnnic-font-weight-regular;

      margin-left: $unnnic-inline-xs;
    }
  }
}
</style>

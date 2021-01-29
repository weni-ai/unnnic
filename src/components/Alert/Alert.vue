<template>
  <div :class="['unnic-alert', `unnic-alert-position--${position}`]">
    <unnic-icon
      :class="`unnic-card-scheme--${scheme}--icon`"
      :icon="icon"
      size="sm"
    />
    <div class="unnic-alert__content">
      <div class="unnic-alert__title">
        {{ title.toUpperCase() }}
      </div>
      <div class="unnic-alert__text">
        {{ text }}
      </div>
    </div>
    <div
      v-if="closeText"
      class="unnic-alert__close-text unnic--clickable"
      @click="onClose()">
      {{ closeText.toUpperCase() }}
    </div>
    <unnic-icon
      v-else
      class="unnic-alert__close-icon"
      clickable
      icon="close-1"
      size="xs"
      @click="onClose()"
    />
  </div>
</template>

<script>
import unnicIcon from '../Icon.vue';

export default {
  name: 'UnnicAlert',
  components: { unnicIcon },
  props: {
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
    closeText: {
      type: String,
      default: null,
    },
    position: {
      type: String,
      default: 'top-right',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnic.scss';

  .unnic-alert {
    position: fixed;
    padding: $unnic-inset-xs;
    min-width: 12.5rem;

    display: inline-flex;
    align-items: center;

    font-family: $unnic-font-family-secondary;
    border-radius: $unnic-border-radius-sm;

    background-color: $unnic-color-background-snow;
    box-shadow: $unnic-shadow-level-near;
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
      margin: 0 $unnic-inline-xs;
    }

    &__title {
      font-size: $unnic-font-size-body-sm;
      font-weight: $unnic-font-weight-bold;
      color: $unnic-color-neutral-darkest;
    }

    &__text {
      font-size: $unnic-font-size-body-md;
      font-weight: $unnic-font-weight-regular;
      color: $unnic-color-neutral-dark;
    }

    &__close {
      &-icon {
        color: $unnic-color-brand-sec;
      }
      &-text {
        color: $unnic-color-brand-sec;
        font-size: $unnic-font-size-body-md;
      }
    }
  }
</style>

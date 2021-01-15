<template>
  <div class="unnic-alert">
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
    <unnic-icon
      :class="`unnic-alert__close-icon`"
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
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnic.scss';

  .unnic-alert {
    position: fixed;
    padding: $unnic-inset-xs;
    min-width: 12.5rem;
    top: 1rem;
    right: 1rem;

    display: inline-flex;
    align-items: center;

    font-family: $unnic-font-family-secondary;
    border-radius: $unnic-border-radius-sm;

    background-color: $unnic-color-background-snow;
    box-shadow: $unnic-shadow-level-near;

    z-index: 9999;

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

    &__close-icon {
      color: $unnic-color-brand-sec;
    }
  }
</style>

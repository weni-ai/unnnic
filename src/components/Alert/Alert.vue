<template>
  <div v-if="version === '1.0'" :class="['unnnic-alert', `unnnic-alert-position--${position}`]">
    <unnnic-icon
      :class="`unnnic-card-scheme--${scheme}--icon`"
      :icon="icon"
      size="sm"
    />
    <div class="unnnic-alert__content">
      <div class="unnnic-alert__title">
        {{ title.toUpperCase() }}
      </div>
      <div class="unnnic-alert__text">
        {{ text }}
      </div>
    </div>
    <div
      v-if="closeText"
      class="unnnic-alert__close-text unnnic--clickable"
      @click="onClose()">
      {{ closeText.toUpperCase() }}
    </div>
    <unnnic-icon
      v-else
      class="unnnic-alert__close-icon"
      clickable
      icon="close-1"
      size="xs"
      @click="onClose()"
    />
  </div>

  <component v-else :is="'version' + version.replace(/\./g, 'dot')" v-bind="$props"></component>
</template>

<script>
import unnnicIcon from '../Icon.vue';
import Version1dot1 from './Version1dot1.vue';

export default {
  name: 'unnnicAlert',
  components: {
    unnnicIcon,
    Version1dot1,
  },
  props: {
    version: {
      type: String,
      default: '1.1',
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
    closeText: {
      type: String,
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

  .unnnic-alert {
    position: fixed;
    padding: $unnnic-inset-xs;
    min-width: 12.5rem;

    display: inline-flex;
    align-items: center;

    font-family: $unnnic-font-family-secondary;
    border-radius: $unnnic-border-radius-sm;

    background-color: $unnnic-color-background-snow;
    box-shadow: $unnnic-shadow-level-near;
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
      margin: 0 $unnnic-inline-xs;
    }

    &__title {
      font-size: $unnnic-font-size-body-sm ;
      font-weight: $unnnic-font-weight-bold;
      color: $unnnic-color-neutral-darkest;
    }

    &__text {
      font-size: $unnnic-font-size-body-md;
      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-neutral-dark;
    }

    &__close {
      &-icon {
        color: $unnnic-color-brand-sec;
      }
      &-text {
        color: $unnnic-color-brand-sec;
        font-size: $unnnic-font-size-body-md;
      }
    }
  }
</style>

<template>
  <div
    v-if="version === '1.0'"
    :class="['unnnic-alert', `unnnic-alert-position--${position}`]"
  >
    <UnnnicIcon
      :icon="icon"
      :scheme="scheme"
      size="sm"
      data-test="unnnic-icon"
    />
    <div class="unnnic-alert__content">
      <div class="unnnic-alert__title">
        {{ sanitizedTitle }}
      </div>
      <div class="unnnic-alert__text">
        {{ sanitizedText }}
      </div>
    </div>
    <div
      v-if="closeText"
      class="unnnic-alert__close-text unnnic--clickable"
      @click="onClose()"
    >
      {{ sanitizedCloseText }}
    </div>
    <UnnnicIcon
      v-else
      clickable
      icon="close-1"
      scheme="brand-sec"
      size="xs"
      data-test="unnnic-icon-close"
      @click="onClose"
    />
  </div>

  <component
    :is="'version' + version.replace(/\./g, 'dot')"
    v-else
    v-bind="{ ...$props }"
  ></component>
</template>

<script>
import UnnnicIcon from '../Icon.vue';
import Version1dot1 from './Version1dot1.vue';
import { sanitizeHtml } from '../../utils/sanitize';

export default {
  name: 'UnnnicAlert',
  components: {
    UnnnicIcon,
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
      default: '',
    },
    position: {
      type: String,
      default: 'top-right',
    },
    linkHref: {
      type: String,
      default: '',
    },
    linkTarget: {
      type: String,
      default: '',
    },
    linkText: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  computed: {
  sanitizedTitle() {
    const sanitized = sanitizeHtml(this.title, ['b', 'i', 'u'], 500);
    return sanitized.toUpperCase();
  },
  sanitizedText() {
    return sanitizeHtml(this.text, ['b', 'i', 'u'], 1000);
  },
  sanitizedCloseText() {
    const sanitized = sanitizeHtml(this.closeText, [], 100);
    return sanitized.toUpperCase();
  },
},

};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-alert {
  position: fixed;
  padding: $unnnic-inset-xs;
  min-width: 12.5 * $unnnic-font-size;

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
      top: 1 * $unnnic-font-size;
      right: 1 * $unnnic-font-size;
    }
    &--top-left {
      top: 1 * $unnnic-font-size;
      left: 1 * $unnnic-font-size;
    }
    &--bottom-right {
      bottom: 1 * $unnnic-font-size;
      right: 1 * $unnnic-font-size;
    }
    &--bottom-left {
      bottom: 1 * $unnnic-font-size;
      left: 1 * $unnnic-font-size;
    }
  }

  &__content {
    flex: 1;
    margin: 0 $unnnic-inline-xs;
  }

  &__title {
    font-size: $unnnic-font-size-body-sm;
    font-weight: $unnnic-font-weight-bold;
    color: $unnnic-color-neutral-darkest;
  }

  &__text {
    font-size: $unnnic-font-size-body-md;
    font-weight: $unnnic-font-weight-regular;
    color: $unnnic-color-neutral-dark;
  }

  &__close {
    &-text {
      color: $unnnic-color-brand-sec;
      font-size: $unnnic-font-size-body-md;
    }
  }
}
</style>

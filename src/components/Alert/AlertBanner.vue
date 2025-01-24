<template>
  <section
    :class="[
      'banner-alert',
      {
        'banner-alert--banner-danger': type === 'danger',
        'banner-alert--banner-warning': type === 'warning',
      },
    ]"
  >
    <header
      v-show="sanitizedText"
      class="banner-alert__container-text"
    >
      <UnnnicIcon
        v-show="isShowTextIcon(type)"
        class="banner-alert__textIcon"
        :icon="getIconType(type)"
        size="sm"
        scheme="neutral-white"
        data-test="unnnic-icon"
      />
      <p class="text">{{ sanitizedText }}</p>
      <a
        v-if="sanitizedLinkHref"
        class="banner-alert__link"
        :href="sanitizedLinkHref"
        :target="sanitizedLinkTarget"
      >
        {{ sanitizedLinkText }}
      </a>
    </header>

    <div
      v-show="showCloseButton"
      class="banner-alert__close"
      @click="emitClose"
    >
      <UnnnicIcon
        icon="close"
        size="sm"
        scheme="neutral-white"
        data-test="unnnic-close-icon"
      />
    </div>
  </section>
</template>

<script>
import UnnnicIcon from '../Icon.vue';
import { sanitizeHtml } from '../../utils/sanitize';

export default {
  components: {
    UnnnicIcon,
  },
  props: {
    text: {
      type: String,
      default: null,
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    showCloseButton: {
      type: Boolean,
      default: false,
    },
    linkHref: {
      type: String,
      default: '',
    },
    linkTarget: {
      type: String,
      default: '_blank',
    },
    linkText: {
      type: String,
      default: 'Learn more',
    },
    type: {
      type: String,
      default: 'info',
    },
  },
  computed: {
    sanitizedText() {
      return sanitizeHtml(this.text, ['b', 'i', 'u'], 500);
    },
    sanitizedLinkHref() {
      return sanitizeHtml(this.linkHref, [], 100);
    },
    sanitizedLinkTarget() {
      return sanitizeHtml(this.linkTarget, [], 50);
    },
    sanitizedLinkText() {
      return sanitizeHtml(this.linkText, [], 100);
    },
  },
  methods: {
    getIconType(type) {
      if (type === 'danger') return 'block';
      if (!type.trim()) return 'info'; // check if type is empty or whitespace
      return type;
    },
    isShowTextIcon(type) {
      return ['danger', 'warning', 'info', ''].includes(type);
    },
    emitClose() {
      this.onClose();

      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.banner-alert {
  display: grid;
  grid-template-columns: 1fr auto;
  text-align: center;
  margin-bottom: $unnnic-spacing-sm;

  color: $unnnic-color-neutral-white;
  font-family: $unnnic-font-family-secondary;
  font-size: $unnnic-font-size-body-gt;
  line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
  font-weight: $unnnic-font-weight-regular;
  background-color: $unnnic-color-aux-blue-500;

  &__container-text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $unnnic-spacing-xs $unnnic-spacing-sm;
    flex-grow: 1;

    .text {
      margin: 0 $unnnic-spacing-nano 0 0;
    }
  }

  &__textIcon {
    margin-right: $unnnic-spacing-xs;
  }

  &__link {
    color: inherit;
    display: block;
    font-weight: $unnnic-font-weight-bold;
    text-decoration: underline;
    text-underline-position: under;
  }

  &__close {
    display: flex;
    align-items: center;
    max-height: 38px;
    padding: 0 $unnnic-spacing-sm;
    cursor: pointer;
    user-select: none;
    border-left: $unnnic-border-width-thinner solid $unnnic-color-aux-blue-300;
    &:hover {
      background-color: $unnnic-color-aux-blue-300;
    }
  }

  &--banner-warning {
    background-color: $unnnic-color-aux-orange-500;

    .banner-alert__close {
      border-left: $unnnic-border-width-thinner solid
        $unnnic-color-aux-orange-300;

      &:hover {
        background-color: $unnnic-color-aux-orange-300;
      }
    }
  }

  &--banner-danger {
    background-color: $unnnic-color-aux-red-500;

    .banner-alert__close {
      border-left: $unnnic-border-width-thinner solid $unnnic-color-aux-red-300;

      &:hover {
        background-color: $unnnic-color-aux-red-300;
      }
    }
  }
}
</style>

<template>
  <div
    class="unnnic-dropdown"
    @click.stop="onClickTrigger"
  >
    <div class="unnnic-dropdown__trigger">
      <slot name="trigger" />
      <div
        v-if="useOpenProp ? open : active"
        v-on-click-outside="onClickOutside"
        data-testid="dropdown-content"
        :class="[
          'unnnic-dropdown__content',
          useOpenProp ? open : active ? '' : 'unnnic-dropdown__content--hidden',
          `unnnic-dropdown__content__position-${position}`,
        ]"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { vOnClickOutside } from '@vueuse/components';

export default {
  name: 'UnnnicDropdown',
  directives: {
    onClickOutside: vOnClickOutside,
  },
  props: {
    useOpenProp: {
      type: Boolean,
      default: false,
    },
    open: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'bottom-left',
      validator(value) {
        return (
          [
            'top-left',
            'top-right',
            'none',
            'bottom-left',
            'bottom-right',
          ].indexOf(value) !== -1
        );
      },
    },
  },
  emits: ['update:open'],
  data() {
    return {
      active: false,
    };
  },
  watch: {
    open: {
      handler() {
        this.active = this.open;
      },
      immediate: true,
    },
    active() {
      this.$emit('update:open', this.active);
    },
  },
  methods: {
    onClickTrigger() {
      if (this.useOpenProp) this.$emit('update:open', !this.open);
      else this.active = !this.active;
    },
    onClickOutside() {
      if (this.useOpenProp && this.open) {
        this.$emit('update:open', false);
        return;
      }

      if (!this.active) return;
      this.active = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
.unnnic-dropdown {
  &__trigger {
    position: relative;
    display: inline-block;
  }

  &__content {
    background-color: $unnnic-color-neutral-snow;
    box-shadow: $unnnic-shadow-level-near;
    border-radius: $unnnic-border-radius-sm;
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: $unnnic-squish-xs;
    z-index: 2;
    &--hidden {
      display: none !important;
    }
    &__position {
      &-top-left {
        bottom: 100%;
        right: 1 * $unnnic-font-size;
        margin-bottom: $unnnic-spacing-stack-xs;
      }
      &-top-right {
        bottom: 100%;
        left: 1 * $unnnic-font-size;
        margin-bottom: $unnnic-inline-xs;
      }
      &-bottom-left {
        margin-top: $unnnic-spacing-stack-xs;
        top: 100%;
        right: 0;
      }
      &-bottom-right {
        margin-top: $unnnic-inline-xs;
        top: 100%;
        left: 1 * $unnnic-font-size;
      }
    }
  }
}
</style>

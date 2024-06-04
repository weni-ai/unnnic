<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    @click="$emit('update:open', !open)"
    class="unnnic-accordion"
  >
    <div class="header">
      <UnnnicIcon
        :icon="open ? 'subtract-circle-1' : 'add-circle-1'"
        scheme="neutral-clean"
        size="md"
      />

      <div :class="['title', { open }]">{{ title }}</div>

      <div
        v-show="open"
        class="actions"
      >
        <slot name="actions"></slot>
      </div>
    </div>

    <div
      ref="content"
      :class="['content', { open }]"
      :style="{ height }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  components: {
    UnnnicIcon,
  },

  props: {
    open: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
    },
  },

  data() {
    return {
      height: 0,
      setHeightToNull: null,
    };
  },

  mounted() {
    if (this.open) {
      this.height = null;
    }
  },

  watch: {
    open(value) {
      clearTimeout(this.setHeightToNull);

      if (value) {
        this.height = `${this.$refs.content.scrollHeight}px`;

        this.setHeightToNull = setTimeout(() => {
          this.height = null;
        }, 200);
      } else {
        this.height = `${this.$refs.content.scrollHeight}px`;

        setTimeout(() => {
          this.height = 0;
        }, 0);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-accordion {
  background-color: $unnnic-color-background-snow;
  padding: $unnnic-spacing-inset-md;
  border-radius: $unnnic-border-radius-md;
  z-index: 0;
  cursor: pointer;
  position: relative;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    border-radius: $unnnic-border-radius-md;
    border: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
  }

  .header {
    display: flex;
    align-items: center;

    .title {
      flex: 1;
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-lg;
      line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
      color: $unnnic-color-neutral-darkest;
      margin-left: $unnnic-spacing-inline-xs;

      &.open {
        font-weight: $unnnic-font-weight-bold;
      }
    }
  }

  .content {
    overflow: hidden;
    transition: all 0.2s;
    margin-top: 0;
    opacity: 0;

    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-lg;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
    color: $unnnic-color-neutral-dark;
  }

  .content.open {
    margin-top: $unnnic-spacing-stack-sm;
    opacity: 1;
  }
}
</style>

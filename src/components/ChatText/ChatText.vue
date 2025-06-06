<template>
  <div :class="['unnnic-chat-text', size]">
    <div class="header">
      <div :class="['title', titleColor]">
        {{ title }}

        <UnnnicToolTip
          v-if="info"
          side="top"
          class="info"
          :text="info"
          enabled
        >
          <UnnnicIcon
            class="info__icon"
            icon="info"
            size="sm"
            scheme="neutral-clean"
          ></UnnnicIcon>
        </UnnnicToolTip>
      </div>

      <slot name="actions" />
    </div>

    <div
      ref="description"
      class="description"
    >
      <slot name="description" />

      <div
        v-if="isScrollable"
        class="scrollable-gradient"
      ></div>
    </div>
  </div>
</template>

<script>
import UnnnicToolTip from '../ToolTip/ToolTip.vue';
import UnnnicIcon from '../Icon.vue';

export default {
  components: {
    UnnnicToolTip,
    UnnnicIcon,
  },

  props: {
    size: {
      type: String,
      default: 'normal',
    },

    title: {
      type: String,
    },

    titleColor: {
      type: String,
      default: 'brand-weni-soft',
    },

    info: {
      type: String,
    },
  },

  data() {
    return {
      isScrollable: false,
    };
  },

  mounted() {
    const areaScrollable =
      this.$refs.description.scrollHeight - this.$refs.description.offsetHeight;

    this.isScrollable = areaScrollable;
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-chat-text {
  border-radius: $unnnic-border-radius-lg;
  background-color: $unnnic-color-background-snow;
  max-width: 31.25 * $unnnic-font-size;
  padding: $unnnic-spacing-inset-md;
  box-sizing: border-box;
  border: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
  max-height: 15.625 * $unnnic-font-size;
  display: flex;
  flex-direction: column;

  .header {
    margin-bottom: $unnnic-spacing-stack-md;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      display: flex;

      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-black;
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
      flex: 1;

      .info {
        display: flex;
        align-items: center;

        &__icon {
          margin-left: $unnnic-spacing-inline-nano;
          cursor: default;
        }
      }

      @each $name, $color in $scheme-colors {
        &.#{$name} {
          color: $color;
        }
      }
    }
  }

  .description {
    font-family: $unnnic-font-family-primary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-lg;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
    color: $unnnic-color-neutral-darkest;
    overflow: hidden;
    position: relative;

    .intent {
      background-color: rgba(
        $unnnic-color-aux-purple,
        $unnnic-opacity-level-light
      );
      padding: calc($unnnic-line-height-md / 2) 0;
    }

    .scrollable-gradient {
      position: absolute;
      background-image: linear-gradient(
        transparent,
        $unnnic-color-background-snow
      );
      width: 100%;
      height: 5 * $unnnic-font-size;
      bottom: 0;
      left: 0;
      pointer-events: none;
    }
  }

  &.small {
    border-radius: $unnnic-border-radius-md;
    padding: $unnnic-spacing-inset-sm;
    max-height: 7.1875 * $unnnic-font-size;

    .header {
      margin-bottom: $unnnic-spacing-stack-xs;
    }

    .description {
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;

      .scrollable-gradient {
        height: 2 * $unnnic-font-size;
      }
    }
  }
}
</style>

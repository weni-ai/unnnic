<template>
  <div
    :class="`unnnic-tag
        ${!disabled ? `unnnic-tag-scheme--${scheme}` : `unnnic-tag--disabled`}
        ${clickable ? 'unnnic-tag--clickable' : ''}`"
  >
    <span
      :class="`unnnic-tag__label
      ${hasCloseIcon ? 'unnnic-tag__label--hasIcon' : ''}
      ${disabled ? 'unnnic-tag__label--disabled' : ''}`"
      >{{ text }}</span
    >
    <div
      @click.stop="emitClose"
      class="unnnic-tag__icon"
      v-if="hasCloseIcon"
    >
      <UnnnicIcon
        icon="close-1"
        scheme="neutral-darkest"
        size="xs"
      />
    </div>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'unnnic-tag',
  components: {
    UnnnicIcon,
  },
  props: {
    text: {
      type: String,
      default: null,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hasCloseIcon: {
      type: Boolean,
      default: false,
    },
    scheme: {
      type: String,
      default: 'aux-purple',
    },
  },
  methods: {
    closeClicked() {
      if (!this.closeClicked) return;
      this.$emit('close-click');
    },
    emitClose() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

@each $name, $color in $scheme-colors {
  .unnnic-tag-scheme--#{$name} {
    background-color: rgba($color, $unnnic-opacity-level-light);
    outline-style: solid;
    outline-color: rgba($color, $unnnic-opacity-level-extra-light);
    outline-width: $unnnic-border-width-thinner;
    outline-offset: -$unnnic-border-width-thinner;
  }
}

.unnnic-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $unnnic-border-radius-pill;

  &--disabled {
    background-color: $unnnic-color-background-sky;
  }

  &--clickable {
    cursor: pointer;

    @each $name, $color in $scheme-colors {
      &.unnnic-tag-scheme--#{$name}:hover {
        outline-style: solid;
        outline-color: $unnnic-color-neutral-cleanest;
        outline-width: $unnnic-border-width-thinner;
        outline-offset: -$unnnic-border-width-thinner;
      }
    }
  }

  &__label {
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-md;
    font-weight: $unnnic-font-weight-regular;
    line-height: ($unnnic-font-size-body-md + $unnnic-line-height-medium);
    padding: $unnnic-spacing-stack-nano $unnnic-inline-ant;
    color: $unnnic-color-neutral-darkest;

    &--disabled {
      color: $unnnic-color-neutral-cloudy;
    }

    &--hasIcon {
      padding-left: $unnnic-inline-ant;
      padding-right: $unnnic-spacing-stack-nano;
    }
  }

  &__icon {
    display: flex;
    margin-right: $unnnic-inline-ant;
    cursor: pointer;
  }
}
</style>

<template>
  <div
  :class="`unnnic-tag
        ${!disabled
        ? `unnnic-tag-scheme--${scheme}`
        : `unnnic-tag--disabled`}
        ${ clickable ? 'unnnic-tag--clickable' : '' }`"
    @click="$emit('click')"
  >
    <span
      :class="`unnnic-tag__label
      ${hasCloseIcon ? 'unnnic-tag__label--hasIcon' : ''}
      ${disabled ? 'unnnic-tag__label--disabled' : ''}`">{{text}}</span>
    <unnnic-icon-svg
      v-if="hasCloseIcon"
      icon="close-1"
      class="unnnic-tag__icon"
      scheme="neutral-darkest"
      size="xs"
    />
  </div>
</template>

<script>
import UnnnicIconSvg from '../Icon-svg.vue';

export default {
  name: 'unnnic-tag',
  components: {
    UnnnicIconSvg,
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
  },
};
</script>

<style lang="scss" scoped>
 @import '../../assets/scss/unnnic.scss';

$scheme-colors:
  'feedback-red' $unnnic-color-feedback-red,
  'feedback-green' $unnnic-color-feedback-green,
  'feedback-yellow' $unnnic-color-feedback-yellow,
  'feedback-blue' $unnnic-color-feedback-blue,
  'feedback-grey' $unnnic-color-feedback-grey,
   'aux-blue' $unnnic-color-aux-blue,
   'aux-purple' $unnnic-color-aux-purple,
   'aux-orange' $unnnic-color-aux-orange,
   'aux-lemon' $unnnic-color-aux-lemon,
   'aux-pink' $unnnic-color-aux-pink;

@each $name, $color in $scheme-colors {
  .unnnic-tag-scheme {
    &--#{$name} {
      background-color: rgba($color, $unnnic-opacity-level-light);
      border: $unnnic-border-width-thinner solid rgba($color, $unnnic-opacity-level-extra-light);
      &:hover {
        border: $unnnic-border-width-thinner solid $unnnic-color-neutral-cleanest;
      }
    }
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

    &--clickable{
      cursor: pointer;
    }

    &__label{
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
      margin-right: $unnnic-inline-ant;
      cursor: pointer;
    }
}

</style>

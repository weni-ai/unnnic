<template>
  <div class="unnnic-switch">
    <div
      v-if="textLeft"
      :class="[
        'unnnic-switch__label',
        'unnnic-switch__label__left',
        `unnnic-switch__label__${size}`,
      ]"
    >
      {{ textLeft }}
    </div>

    <unnnic-icon-svg
      class="unnnic-switch__icon"
      :icon="currentIcon"
      :size="iconSize"
      :scheme="iconScheme"
      :lineHeight="iconLineHeight"
      @click.native="toggleState"
    />

    <div
      v-if="textRight"
      :class="[
        'unnnic-switch__label',
        'unnnic-switch__label__right',
        `unnnic-switch__label__${size}`,
      ]"
    >
      {{ textRight }}
    </div>
  </div>
</template>

<script>
import UnnnicIconSvg from '../Icon-svg.vue';

export default {
  name: 'unnnic-switch',
  components: { UnnnicIconSvg },
  props: {
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['small', 'medium'].indexOf(value) !== -1;
      },
    },
    textLeft: {
      type: String,
      default: null,
    },
    textRight: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    initialState: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      preActive: this.initialState,
      isActive: this.initialState,
    };
  },
  methods: {
    toggleState() {
      if (this.disabled) return;
      this.preActive = !this.preActive;
      this.$emit('setIsActive', !this.isActive);
      setTimeout(() => {
        this.isActive = !this.isActive;
      }, 200);
    },
  },
  computed: {
    currentIcon() {
      if (this.disabled) {
        return this.isActive ? 'switch-selected-disabled' : 'switch-default-disabled';
      }
      return this.isActive ? 'switch-selected' : 'switch-default';
    },

    iconSize() {
      return this.size === 'small' ? 'sm' : 'md';
    },

    iconScheme() {
      return this.preActive === false ? 'neutral-soft' : 'brand-weni';
    },

    iconLineHeight() {
      return this.size === 'small' ? 'sm' : 'md';
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnnic.scss';

.unnnic-switch {
  display: flex;
  flex-direction: row;

  &__label {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    color: $unnnic-color-neutral-darkest;

    margin: $unnnic-spacing-stack-nano 0;
    margin-right: $unnnic-inline-nano;

    &__small {
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
    }

    &__medium {
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
    }
  }

  &__icon {
    align-self: center;
    margin: $unnnic-spacing-stack-nano $unnnic-inline-nano;
  }
}

.unnnic-icon__size--md.unnnic-icon__line-height--md svg {
  top: 0;
}

.unnnic-icon__size {
  &--md {
    width: 3rem;
  }
  &--sm {
    width: 2rem;
  }
}
</style>

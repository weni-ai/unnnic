<template>
  <div :class="{
    'unnic-form': true,
    'unnic-form--error': type === 'error'
    }">
    <base-input
        v-bind="attributes"
        :key="true"
        :hasIconLeft="iconLeft != null"
        :hasIconRight="hasIconRight"
        :type="type"
        :nativeType="showPassword ? 'text' : 'password'"
        v-model="text"
      />
      <UIcon
        v-if="iconLeft"
        :icon="iconLeft"
        class="icon-left"
        size="md"
        @click="onIconRightClick" />
      <UIcon
        v-if="hasIconRight"
        :icon="iconToShowRight"
        class="icon-right"
        size="md"
        :clickable="allowTogglePassword"
        @click="onIconRightClick" />
  </div>
</template>

<script>
import UIcon from '../Icon.vue';
import BaseInput from './BaseInput.vue';

export default {
  name: 'unnic-input',
  components: { UIcon, BaseInput },
  data() {
    return {
      showPassword: false,
      text: null,
    };
  },
  props: {
    type: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'error'].indexOf(value) !== -1;
      },
    },
    iconLeft: {
      type: String,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
    },
    allowTogglePassword: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onIconRightClick() {
      if (!this.allowTogglePassword) return;
      this.showPassword = !this.showPassword;
    },
  },
  computed: {
    hasIconRight() {
      return this.allowTogglePassword || this.iconRight != null;
    },
    iconToShowRight() {
      if (this.allowTogglePassword) {
        return this.showPassword ? 'view-off-1' : 'view-1-1';
      }

      return this.iconRight;
    },
    inputListeners() {
      return {
        ...this.$listeners,
        input: () => {},
      };
    },
    attributes() {
      return { ...this.$attrs, ...this.$attrs['v-bind'] };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnic.scss';

.icon {
  color: $unnic-color-neutral-clean;
}

.icon-right {
  position: absolute;
  right: 7px;
  top: 7px;
}

.unnic-form {
  font-family: $unnic-font-family-primary;

    &:focus-within .icon{
    color: $unnic-color-brand-ilha;
  }

    &--error {
      color: $unnic-color-feedback-red;
    }
}

.has-icon {
  position: relative;

  &-left {
    padding-left: calc(#{$unnic-inline-sm} + #{$unnic-icon-size-md} + #{$unnic-inline-xs});
  }

  &-right {
    padding-right: calc(#{$unnic-inline-sm} + #{$unnic-icon-size-md} + #{$unnic-inline-xs});
  }
}

.icon {
  color: $unnic-color-neutral-clean;

  &-left {
    position: absolute;
    top: 25%;
    left: $unnic-inline-sm;
  }

  &-right {
    position: absolute;
    top: 25%;
    right: $unnic-inline-sm;
  }
}

</style>

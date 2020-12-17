<template>
  <div :class="{
    'unnic-form': true,
    'unnic-form--error': type === 'error',
    'has-icon': iconLeft || iconRight,
    }">
      <base-input
        v-model="val"
        v-bind="attributes"
        :hasIconLeft="iconLeft != null"
        :hasIconRight="iconRight != null"
        :type="type"
        v-on="inputListeners"
      />
      <u-icon
        v-if="iconLeft"
        :icon="iconLeft"
        class="icon-left"
        size="md" />
      <u-icon
        v-if="iconRight"
        :icon="iconRight"
        class="icon-right"
        size="md" />
  </div>
</template>

<script>
import UIcon from '../Icon.vue';
import BaseInput from './BaseInput.vue';

export default {
  name: 'unnic-input',
  components: {
    UIcon,
    BaseInput,
  },
  data() {
    return {
      val: null,
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
    value: {
      type: String,
      default: '',
    },
    iconLeft: {
      type: String,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
    },
  },
  methods: {
    onFocus() {
      console.log('focus');
    },
  },
  computed: {
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
  watch: {
    val() {
      this.$emit('input', this.val);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnic.scss';

.unnic-form {
  font-family: $unnic-font-family-primary;

  &:focus-within .icon {
    color: $unnic-color-brand-ilha;
  }

  &--error {
    color: $unnic-color-feedback-red;
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

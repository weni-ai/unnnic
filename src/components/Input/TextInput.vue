<template>
  <div :class="{
    'unnnic-form': true,
    'unnnic-form--error': type === 'error',
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
  name: 'unnnic-input',
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
  mounted() {
    this.val = this.value;
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
    value() {
      this.val = this.value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-form {

  &:focus-within .icon {
    color: $unnnic-color-brand-weni;
  }

  &--error {
    color: $unnnic-color-feedback-red;

    .unnnic-icon {
      color: $unnnic-color-feedback-red !important;
    }
  }
}

.unnnic-icon {
  color: $unnnic-color-neutral-clean;
}

.icon {

  &-left {
    position: absolute;
    top: 25%;
    left: $unnnic-inline-sm;
  }

  &-right {
    position: absolute;
    top: 25%;
    right: $unnnic-inline-sm;
  }
}

</style>

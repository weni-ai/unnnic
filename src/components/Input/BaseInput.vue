<template>
  <input
    v-if="mask"
    v-mask="mask"
    v-bind="attributes"
    :value="fullySanitize(modelValue)"
    :class="[classes, { 'focus': forceActiveStatus }]"
    :type="nativeType"
    :readonly="readonly"
  />
  <input
    v-else
    v-bind="attributes"
    :value="fullySanitize(modelValue)"
    :class="[classes, { 'focus': forceActiveStatus }]"
    :type="nativeType"
    :maxlength="maxlength"
    :readonly="readonly"
  />
</template>

<script>
import { mask } from 'vue-the-mask';
import { fullySanitize } from '../../utils/sanitize';

export default {
  directives: { mask },
  props: {
    type: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'error'].indexOf(value) !== -1;
      },
    },
    modelValue: {
      type: String,
      default: '',
    },
    nativeType: {
      type: String,
      default: 'text',
    },
    size: {
      type: String,
      default: 'md',
    },
    mask: {
      type: [String, Array],
      default: '',
    },
    hasIconLeft: Boolean,
    hasIconRight: Boolean,
    hasClearIcon: Boolean,
    maxlength: {
      type: Number,
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    forceActiveStatus: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {};
  },
  computed: {
    attributes() {
      return {
        ...this.$attrs,
        ...this.$attrs['v-bind'],
        onInput: (event) => {
          this.$emit('update:modelValue', event.srcElement.value);
        },
      };
    },

    classes() {
      return [
        'input',
        `size-${this.size}`,
        this.type,
        {
          'input--has-icon-left': this.hasIconLeft,
          'input--has-icon-right': this.hasIconRight,
          'input--has-clear-icon': this.hasClearIcon,
        },
      ];
    },
  },
  methods: {
    fullySanitize,
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
@use './Input.scss' as *;

.input {
  @include input-base;

  box-sizing: border-box;
  width: 100%;

  &.size {
    &-md {
      @include input-md-font;
      padding: $unnnic-space-3 $unnnic-space-4;
      height: 45px;
    }

    &-sm {
      @include input-sm-font;
      padding: $unnnic-space-2 $unnnic-space-4;
      height: 37px;
    }
  }

  &.input--has-icon-left {
    padding-left: $unnnic-space-10;
  }

  &.input--has-icon-right {
    padding-right: $unnnic-space-10;
    &.input--has-clear-icon {
      padding-right: $unnnic-space-10 + $unnnic-space-6;
    }
  }

  &.input--has-clear-icon {
      padding-right: $unnnic-space-10;
    }

  &.error {
    @include input-error;
  }

  &:-ms-input-placeholder,
  &::-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: $unnnic-color-fg-muted;
  }
}
</style>

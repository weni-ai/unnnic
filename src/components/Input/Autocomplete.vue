<template>
  <div class="unnnic-autocomplete" v-click-outside="onClickOutside">
    <p v-if="label" class="unnnic-form__label"> {{ label }}  </p>
      <text-input
        v-model="val"
        v-on="inputListeners"
        :v-bind="$attrs"
        :icon-left="iconLeft"
        :icon-right="iconRight"
        :type="type"
        @focus="onFocus"
        :size="size" />
    <div
      v-show="open"
      :class="['unnnic-autocomplete__list',
                `unnnic-autocomplete__list--size-${size}`,
                message && message.length > 0 ? 'unnnic-autocomplete__list--with-message' : '']">
        <p
          v-for="(option, index) in data"
          :key="index"
          class="unnnic--clickable"
          @click="onChoose(option)" v-html="highlighted(option)" />
    </div>
    <p v-if="message" class="unnnic-form__message"> {{ message }} </p>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';
import TextInput from './TextInput.vue';

export default {
  name: 'unnnic-input',
  components: { TextInput },
  props: {
    type: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'error'].indexOf(value) !== -1;
      },
    },
    data: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    iconLeft: {
      type: String,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
    },
    highlight: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
    },
  },
  data() {
    return {
      val: null,
      open: false,
    };
  },
  watch: {
    val() {
      this.$emit('input', this.val);
    },
    value() {
      this.val = this.value;
    },
  },
  mounted() {
    this.val = this.value;
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    onFocus() {
      this.open = true;
    },
    onChoose(option) {
      this.val = option;
      this.$emit('choose', option);
      this.open = false;
    },
    onClickOutside() {
      if (!this.open) return;
      this.open = false;
    },
    highlighted(text) {
      if (!this.highlight || !this.val || this.val.length === 0) return text;
      return text.replaceAll(this.val, (match) => `<span class="unnnic-autocomplete--highlighted"> ${match} </span>`);
    },
  },
  computed: {
    inputListeners() {
      return {
        ...this.$listeners,
        input: () => {},
      };
    },
  },
};
</script>

<style lang="scss" >
@import '../../assets/scss/unnnic.scss';

.unnnic-autocomplete {
    position: relative;

    &--highlighted {
      white-space: nowrap;
      color: $unnnic-color-brand-weni;
      display: inline-block;
      font-weight: $unnnic-font-weight-bold;
    }

    &__list {
        background-color: $unnnic-color-background-snow;
        font-family: $unnnic-font-family-secondary;
        position: absolute;
        left: 0;
        right: 0;
        z-index: 1;
        top: 100%;
        border-radius: $unnnic-border-radius-sm;
        box-shadow: $unnnic-shadow-level-near;
        overflow-y: auto;
        margin: $unnnic-spacing-stack-xs 0 0 0;

        &--with-message {
          top: calc(100% - 20px);
        }

        &--size-md {
          max-height: calc(5*(#{$unnnic-font-size-body-gt} + 16px));
          font-size: $unnnic-font-size-body-gt;

          > * {
            line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
          }
        }

        &--size-sm {
          max-height: calc(5*(#{$unnnic-font-size-body-md} + 16px));
          font-size: $unnnic-font-size-body-md;

          > * {
            line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
          }
        }

        &::before {
          content: '';
          display: block;
          height: $unnnic-spacing-stack-xs;
        }

        &::after {
          content: '';
          display: block;
          height: $unnnic-spacing-stack-sm;
        }

        > * {
          padding: 0.25rem 0.5rem;
          overflow: hidden;
          white-space: nowrap;
          margin: 0;
        }
    }
}

</style>

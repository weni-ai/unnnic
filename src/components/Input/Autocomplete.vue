<template>
  <div class="unnnic-autocomplete" v-click-outside="onClickOutside">
      <text-input
        ref="input"
        v-model="val"
        v-on="inputListeners"
        :v-bind="$attrs"
        :icon-left="iconLeft"
        :icon-right="iconRight"
        :type="type"
        @focus="onFocus" />
    <div
      v-show="open"
      class="unnnic-autocomplete__list unnnic--clickable">
        <p
          v-for="(option, index) in data"
          :key="index"
          @click="onChoose(option)"> {{ option }} </p>
    </div>
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
    togglePassword: {
      type: Boolean,
      default: false,
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
      console.log('on focus');
    },
    onChoose(option) {
      console.log('choose', option);
      this.val = option;
      this.$emit('choose', option);
    },
    onClickOutside(event) {
      console.log('on click outside', event);
      console.log('ref', this.$refs.input);
      console.log(event.srcElement.offsetParent === this.$refs.input);
      if (!this.open) return;
      this.open = false;
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
    display: relative;
    &__list {
        background-color: $unnnic-color-background-snow;
        font-family: $unnnic-font-family-secondary;
        font-size: $unnnic-font-size-body-gt;
        display: absolute;
        top: 100%;
        max-height: calc(5*(#{$unnnic-font-size-body-gt} + 16px));
        border-radius: $unnnic-border-radius-sm;
        box-shadow: $unnnic-shadow-level-near;
        overflow-y: auto;
        margin: $unnnic-spacing-stack-xs 0 0 0;

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
          line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
          overflow: hidden;
          white-space: nowrap;
          margin: 0;
        }
    }
}

</style>

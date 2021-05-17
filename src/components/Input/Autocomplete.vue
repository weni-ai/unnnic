<template>
  <div class="unnnic-autocomplete" v-click-outside="onClickOutside">
    <p v-if="label" class="unnnic-form__label"> {{ label }}  </p>
      <text-input
        v-model="val"
        v-on="inputListeners"
        :v-bind="$attrs"
        :icon-left="iconLeft"
        :icon-right="iconRight"
        :tooltip-icon-right="tooltipIconRight"
        :tooltip-side-icon-right="tooltipSideIconRight"
        :tooltip-force-open-icon-right="tooltipForceOpenIconRight"
        :type="type"
        @focus="onFocus"
        :size="size"
      />

    <div v-show="open" class="unnnic-autocomplete__container-list">
      <div
        :class="['unnnic-autocomplete__list',
                  `unnnic-autocomplete__list--size-${size}`,
                  message && message.length > 0 ? 'unnnic-autocomplete__list--with-message' : '']">

          <template
            v-for="(option, index) in dataParsed"
          >
            <div
              v-if="option.type === 'category'"
              :key="index"
              class="category"
              :title="option.text"
            >
              {{ option.text }}
            </div>

            <div
              v-else
              :key="index"
              class="unnnic--clickable option"
              @click="onChoose(option)"
            >
              <div class="label" v-html="highlighted(option.text)" :title="option.text"></div>
            </div>
          </template>
      </div>
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
    tooltipIconRight: {
      type: String,
      default: null,
    },
    tooltipSideIconRight: {
      type: String,
      default: 'right',
      validator(value) {
        return ['top', 'right', 'bottom', 'left'].indexOf(value) !== -1;
      },
    },
    tooltipForceOpenIconRight: {
      type: Boolean,
      default: false,
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
      this.open = false;
      if (this.val) this.open = true;
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
      if (!this.val) return;
      this.open = true;
    },
    onChoose(option) {
      this.val = option.text;
      this.$emit('choose', option.value ? option.value : option.text);
      this.open = false;
    },
    onClickOutside() {
      if (!this.open) return;
      this.open = false;
    },
    highlighted(text) {
      if (!this.highlight || !this.val || this.val.length === 0) return text;
      return text.replaceAll(this.val, (match) => `<span class="unnnic-autocomplete--highlighted">${match.replace(/ /g, '&nbsp;')}</span>`);
    },
  },
  computed: {
    inputListeners() {
      return {
        ...this.$listeners,
        input: () => {},
      };
    },

    dataParsed() {
      return this.data.map((item) => {
        if (item.type) {
          return item;
        }

        return {
          type: 'option',
          text: String(item),
        };
      });
    },
  },
};
</script>

<style lang="scss" >
@import '../../assets/scss/unnnic.scss';

$scroll-size: 4px;

.unnnic-autocomplete {
    position: relative;
    font-family: $unnnic-font-family-secondary;

    &--highlighted {
      white-space: nowrap;
      color: $unnnic-color-brand-weni-soft;
      display: inline-block;
      font-weight: $unnnic-font-weight-bold;
    }

    &__container-list {
      background-color: $unnnic-color-background-snow;
      font-family: $unnnic-font-family-secondary;
      position: absolute;
      left: 0;
      right: 0;
      z-index: 1;
      top: 100%;
      border-radius: $unnnic-border-radius-sm;
      box-shadow: $unnnic-shadow-level-near;
      margin-top: $unnnic-spacing-stack-nano;
    }

    &__list {
      overflow-y: auto;
      margin: $unnnic-spacing-stack-xs 0 0 0;
      margin-right: $unnnic-spacing-inline-nano;
      margin-bottom: $unnnic-spacing-inline-sm;

        &::-webkit-scrollbar {
          width: $scroll-size;
          margin: 10px;
        }

        &::-webkit-scrollbar-thumb {
          background: $unnnic-color-neutral-clean;
          border-radius: $unnnic-border-radius-pill;
        }

        &::-webkit-scrollbar-track {
          background: $unnnic-color-neutral-soft;
          border-radius: $unnnic-border-radius-pill;
        }

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

        > * {
          overflow: hidden;
          white-space: nowrap;
          margin: 0;
        }

        .category {
          padding: 0;
          font-family: $unnnic-font-family-secondary;
          font-weight: $unnnic-font-weight-bold;
          font-size: $unnnic-font-size-body-md;
          line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
          color: $unnnic-color-neutral-clean;
          margin: 0 $unnnic-spacing-inline-sm;
          margin-top: $unnnic-spacing-stack-sm;
          margin-bottom: $unnnic-spacing-stack-xs;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .option {
          background-color: $unnnic-color-background-snow;
          margin: 0 $unnnic-spacing-inline-xs;
          border-radius: $unnnic-border-radius-sm;

          &:hover{
            background-color: $unnnic-color-neutral-light;
          }

          .label {
            font-family: $unnnic-font-family-secondary;
            font-weight: $unnnic-font-weight-regular;
            font-size: $unnnic-font-size-body-gt;
            line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
            color: $unnnic-color-neutral-dark;
            margin: $unnnic-spacing-stack-nano $unnnic-spacing-inline-xs;

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        &--size-sm {
          .option .label {
            font-size: $unnnic-font-size-body-md;
            line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
          }
        }
    }
}

</style>

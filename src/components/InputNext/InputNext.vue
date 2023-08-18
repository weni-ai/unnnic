<template>
  <div :class="['unnnic-input', `size-${size}`, { 'type-error': hasError }]">
    <span
      v-if="!!this.$slots.label || label"
      :class="[
        'label unnnic-font secondary color-neutral-cloudy',
        { 'body-md': size === 'sm', 'body-gt': size == 'md' },
      ]"
      @click="$refs.input.focus()"
    >
      <template v-if="!!this.$slots.label">
        <slot name="label" />
      </template>

      <template v-else-if="label">
        {{ label }}
      </template>
    </span>

    <div class="input-container" @click.self="$refs.input.focus()">
      <unnnic-icon
        v-if="iconLeft"
        :icon="iconLeft"
        size="sm"
        :scheme="iconScheme"
        @click.native="
          $listeners['icon-left-click'] ? $emit('icon-left-click') : $refs.input.focus()
        "
        :clickable="!!$listeners['icon-left-click']"
      />

      <input
        class="unnnic-font secondary"
        ref="input"
        :type="allowTogglePassword ? (showPassword ? 'text' : 'password') : nativeType"
        :placeholder="placeholder"
        @focus="focus"
        @blur="blur"
        :disabled="disabled"
        :value="value"
        @input="$emit('input', $event.srcElement.value)"
        :maxlength="maxlength"
      />

      <unnnic-icon
        v-if="iconRight"
        :icon="iconRight"
        size="sm"
        :scheme="iconScheme"
        @click.native="
          $listeners['icon-right-click'] ? $emit('icon-right-click') : $refs.input.focus()
        "
        :clickable="!!$listeners['icon-right-click']"
      />

      <unnnic-icon
        v-if="allowTogglePassword"
        :icon="showPassword ? 'view-off-1' : 'view-1-1'"
        size="sm"
        :scheme="iconScheme"
        clickable
        @click="showPassword = !showPassword"
      />
    </div>

    <div
      v-if="error && error !== true"
      class="message unnnic-font secondary body-md color-feedback-red"
    >
      {{ error }}
    </div>

    <div v-else-if="message" class="message unnnic-font secondary body-md color-neutral-cloudy">
      {{ message }}
    </div>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  components: {
    UnnnicIcon,
  },

  props: {
    value: String,
    label: String,
    iconLeft: String,
    iconRight: String,

    allowTogglePassword: Boolean,
    disabled: Boolean,

    maxlength: {
      type: [String, Number],
    },

    size: {
      type: String,
      default: 'md',
      validator: (size) => ['md', 'sm'].includes(size),
    },

    type: {
      type: String,
      default: 'normal',
      validator: (type) => ['normal', 'error'].includes(type),
    },

    nativeType: {
      type: String,
      default: 'text',
      validator: (type) => ['text', 'password'].includes(type),
    },

    placeholder: String,

    message: String,

    error: {
      type: [Boolean, String],
    },
  },

  data() {
    return {
      isFocused: false,
      showPassword: false,
    };
  },

  computed: {
    hasError() {
      return this.error === true || this.error || this.type === 'error';
    },

    iconScheme() {
      if (this.hasError) {
        return 'feedback-red';
      }

      return this.isFocused ? 'neutral-dark' : 'neutral-cloudy';
    },
  },

  methods: {
    focus() {
      this.isFocused = true;
    },

    blur() {
      this.isFocused = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-input {
  .label {
    display: inline-block;
  }

  .input-container {
    background-color: $unnnic-color-neutral-snow;
    border-radius: $unnnic-border-radius-sm;
    outline-style: solid;
    outline-color: $unnnic-color-neutral-soft;
    outline-width: $unnnic-border-width-thinner;
    outline-offset: -$unnnic-border-width-thinner;
    cursor: text;
    display: flex;
    align-items: center;
    column-gap: $unnnic-spacing-inline-xs;

    &:focus-within {
      outline-color: $unnnic-color-neutral-clean;
    }

    &:has(input:disabled) {
      outline-style: dashed;
      outline-color: $unnnic-color-neutral-cleanest;
      background-color: $unnnic-color-neutral-light;
      cursor: default;
    }

    input {
      all: unset;

      flex: 1;

      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-neutral-dark;

      &:focus::placeholder {
        color: $unnnic-color-neutral-cleanest;
      }

      &::placeholder {
        color: $unnnic-color-neutral-cloudy;
        opacity: 1; /* Firefox */
        user-select: none;
      }
    }
  }

  .message {
    margin-top: $unnnic-spacing-stack-nano;
  }

  &.size-md {
    .label {
      margin-bottom: $unnnic-spacing-stack-xs;
    }

    .input-container {
      padding: $unnnic-squish-xs;

      input {
        font-size: $unnnic-font-size-body-gt;
        line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
      }
    }
  }

  &.size-sm {
    .label {
      margin-bottom: $unnnic-spacing-stack-nano;
    }

    .input-container {
      padding: $unnnic-squish-nano;

      input {
        font-size: $unnnic-font-size-body-md;
        line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
      }
    }
  }

  &.type-error {
    .input-container {
      outline-color: $unnnic-color-feedback-red;

      input {
        color: $unnnic-color-feedback-red;

        &::placeholder {
          color: $unnnic-color-feedback-red;
        }
      }
    }
  }
}
</style>

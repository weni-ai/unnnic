<template>
  <div
    :class="{
      'unnnic-select-smart-option': true,
      'unnnic-select-smart-option--focused': focused,
      'unnnic-select-smart-option--active': active,
      'unnnic-select-smart-option--active-secondary':
        active && activeColor === 'secondary',
      'unnnic--clickable': selectable,
      'unnnic-select-smart-option--selectable': selectable,
      'unnnic-select-smart-option--with-checkbox': allowCheckbox,
    }"
    :title="label"
    data-testid="select-smart-option"
  >
    <UnnnicCheckbox
      v-if="allowCheckbox"
      ref="checkbox"
      data-testid="checkbox"
      :modelValue="active"
      :size="size"
    />
    <div>
      <span
        :class="[
          'unnnic-select-smart-option__label',
          `unnnic-select-smart-option__label--${size}`,
        ]"
        data-testid="label"
        >{{ fullySanitize(label) }}</span
      >
      <p
        v-if="description"
        data-testid="description"
        :class="[
          'unnnic-select-smart-option__description',
          `unnnic-select-smart-option__description--${size}`,
        ]"
      >
        {{ fullySanitize(description) }}
      </p>
    </div>
  </div>
</template>

<script>
import UnnnicCheckbox from '../Checkbox/Checkbox.vue';
import { fullySanitize } from '../../utils/sanitize';

export default {
  name: 'UnnnicSelectSmartOption',
  components: { UnnnicCheckbox },
  props: {
    label: {
      type: String,
      default: 'Option',
      required: true,
    },
    description: {
      type: String,
      default: '',
      required: false,
    },
    size: {
      type: String,
      default: '',
    },
    selectable: {
      type: Boolean,
      default: true,
    },
    focused: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: null,
    },
    allowCheckbox: {
      type: Boolean,
      default: false,
    },
    isMultiple: Boolean,
    activeColor: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary'].indexOf(value) !== -1;
      },
    },
  },
  methods: {
    fullySanitize,
  },
};
</script>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;
.unnnic-select-smart-option {
  background-color: $unnnic-color-background-snow;
  padding: $unnnic-spacing-stack-nano $unnnic-inline-xs;

  max-width: 100%;

  font-family: $unnnic-font-family-secondary;
  color: $unnnic-color-neutral-darkest;
  font-weight: $unnnic-font-weight-regular;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 1;

  & + & {
    margin-top: $unnnic-spacing-nano;
  }

  &--selectable:hover,
  &--focused {
    border-radius: $unnnic-border-radius-sm;

    background-color: $unnnic-color-neutral-light;
  }

  &--active:not(&--with-checkbox) {
    color: $unnnic-color-weni-600;
    font-weight: $unnnic-font-weight-bold;

    &.unnnic-select-smart-option--active-secondary {
      color: $unnnic-color-neutral-darkest;
    }
  }

  &--with-checkbox {
    padding: $unnnic-spacing-xs $unnnic-spacing-ant;
    display: flex;
    align-items: center;
    gap: $unnnic-spacing-xs;

    .unnnic-checkbox rect {
      rx: $unnnic-border-radius-md;
    }
  }

  &__label {
    display: block;

    &--md {
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
    }
    &--sm {
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
    }
  }

  &__description {
    margin: 0;

    color: $unnnic-color-neutral-cloudy;
    font-weight: $unnnic-font-weight-regular;

    &--md,
    &--sm {
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
    }
  }
}
</style>

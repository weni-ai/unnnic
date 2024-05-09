<template>
  <div
    :class="{
      'unnnic-select-smart-option': true,
      'unnnic-select-smart-option--focused': focused,
      'unnnic-select-smart-option--active': active,
      'unnnic--clickable': selectable,
      'unnnic-select-smart-option--selectable': selectable,
      'unnnic-select-smart-option--with-checkbox': allowCheckbox,
    }"
    :title="label"
  >
    <UnnnicCheckbox
      v-if="allowCheckbox"
      ref="checkbox"
      :modelValue="active"
      :size="size"
    />
    <div>
      <span
        :class="[
          'unnnic-select-smart-option__label',
          `unnnic-select-smart-option__label--${size}`,
        ]"
        >{{ label }}</span
      >
      <p
        v-if="description"
        :class="[
          'unnnic-select-smart-option__description',
          `unnnic-select-smart-option__description--${size}`,
        ]"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
import UnnnicCheckbox from '../Checkbox/Checkbox.vue';

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
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnnic.scss';
.unnnic-select-smart-option {
  background-color: $unnnic-color-background-snow;
  padding: $unnnic-spacing-stack-nano $unnnic-inline-xs;

  max-width: 100%;

  font-family: $unnnic-font-family-secondary;
  color: $unnnic-color-neutral-dark;
  font-weight: $unnnic-font-weight-regular;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 1;

  &--selectable:hover,
  &--focused,
  &--active {
    border-radius: $unnnic-border-radius-sm;

    background-color: $unnnic-color-neutral-light;
  }

  &--active:not(&--with-checkbox) {
    color: $unnnic-color-weni-600;
    font-weight: $unnnic-font-weight-bold;
  }

  &--with-checkbox {
    display: flex;
    align-items: center;
    gap: $unnnic-spacing-xs;

    .unnnic-checkbox rect {
      rx: $unnnic-border-radius-md;
    }
  }

  &__label {
    &--md {
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
    }
    &--sm {
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-small;
    }
  }

  &__description {
    margin: 0;

    color: $unnnic-color-neutral-cloudy;
    font-weight: $unnnic-font-weight-regular;

    &--md {
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
    }
    &--sm {
      font-size: $unnnic-font-size-body-sm;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-small;
    }
  }
}
</style>

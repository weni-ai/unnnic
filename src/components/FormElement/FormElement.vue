<template>
  <section class="unnnic-form-element" :class="{ 'unnnic-form-element--disabled': disabled }">
    <UnnnicLabel 
      v-if="label" 
      :label="label" 
      :tooltip="tooltip"
      :class="[
        'unnnic-form-element__label',
        {
          'unnnic-form-element__label--fixed': fixedLabel,
        },
      ]" 
    />

    <slot></slot>

    <section 
      class="unnnic-form-element__hints-container"
      v-if="message || error || !!$slots.rightMessage"
    >
      <section class="unnnic-form-element__message-container">
        <p v-if="message" class="unnnic-form-element__message">
          {{ fullySanitize(message) }}
        </p>
        <p v-if="!!error?.length" class="unnnic-form-element__message error">
          {{ Array.isArray(error) ? error.join(', ') : error }}
        </p>
      </section>
      <p v-if="!!$slots.rightMessage">
        <slot name="rightMessage" />
      </p>
    </section>
  </section>
</template>

<script lang="js">
  import { fullySanitize } from '../../utils/sanitize';
  import UnnnicLabel from '../Label/Label.vue';

  export default {
    components: {
      UnnnicLabel,
    },
    props: {
      size: {
        type: String,
        default: 'md',
        validator: (size) => ['md', 'sm'].includes(size),
      },

      label: { type: String, default: '' },

      fixedLabel: { type: Boolean, default: false },

      error: {
        type: [Boolean, String],
        default: false,
      },

      message: { type: String, default: '' },

      disabled: { type: Boolean, default: false },

      tooltip: { type: String, default: '' },
    },
    methods: {
      fullySanitize,
    },
  };
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/unnnic' as *;

  * {
    margin: $unnnic-space-0;
    padding: $unnnic-space-0;
    box-sizing: border-box;
  }

  .unnnic-form-element {
    &__label {
      font: $unnnic-font-body;
      color: $unnnic-color-neutral-cloudy;
      margin-bottom: $unnnic-space-1;
      display: flex;
      align-items: center;
      gap: $unnnic-space-2;

      &--fixed {
        margin-top: -$unnnic-font-size-body-gt - $unnnic-space-2 + $unnnic-space-1;
      }

      &--fixed {
        margin-bottom: $unnnic-space-0;
        position: absolute;
        padding: $unnnic-space-0 $unnnic-space-1;
        margin-left: $unnnic-space-2;

        &:after {
          content: ' ';
          position: absolute;
          left: $unnnic-space-0;
          bottom: $unnnic-space-1 - $unnnic-border-width-thinner;
          width: 100%;
          height: $unnnic-border-width-thinner;
          background-color: $unnnic-color-white;
        }
      }
    }

    &__message {
      &.error {
        color: $unnnic-color-fg-critical;
      }
    }

    &__hints-container {
      display: flex;
      justify-content: space-between;
      margin-top: $unnnic-space-1;
      font: $unnnic-font-caption-2;
      color: $unnnic-color-fg-base;
    }

    &__message-container {
      display: flex;
      flex-direction: column;
      gap: $unnnic-space-1;
    }

    &--disabled .unnnic-form-element__label,
    &--disabled .unnnic-form-element__message {
      user-select: none;
    }
  }
</style>

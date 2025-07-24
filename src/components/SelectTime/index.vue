<template>
  <section
    v-onClickOutside="() => (active = false)"
    class="unnnic-select-time"
  >
    <DropdownSkeleton
      ref="dropdown-skeleton"
      type="manual"
      :modelValue="active"
      position="bottom"
    >
      <TextInput
        :modelValue="modelValue"
        :iconRight="active ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        nativeType="time"
        class="unnnic-select-time__input"
        @focus="active = true"
        @blur="handleBlur"
        @update:model-value="handleInput"
        @keydown.enter="handleBlur({ close: true })"
      />

      <template #inside="props">
        <section
          :style="{ width: props.width }"
          class="unnnic-select-time__options"
        >
          <section
            v-for="hour in options"
            :ref="`hour-${hour.value}`"
            :key="hour.value"
            :class="{
              'unnnic-select-time__options__item': true,
              'unnnic-select-time__options__item--selected':
                modelValue === hour.value,
            }"
            @click="handleClickTimeOption(hour.value)"
          >
            {{ hour.label }}
          </section>
        </section>
      </template>
    </DropdownSkeleton>
  </section>
</template>

<script>
import { vOnClickOutside } from '@vueuse/components';

import DropdownSkeleton from '../Dropdown/DropdownSkeleton.vue';
import TextInput from '../Input/TextInput.vue';

import { hoursTimesOptions } from '../../utils/hours';

export default {
  name: 'SelectTime',
  components: {
    DropdownSkeleton,
    TextInput,
  },

  directives: {
    onClickOutside: vOnClickOutside,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => hoursTimesOptions,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      active: false,
    };
  },
  methods: {
    handleInput(text) {
      const { value } =
        this.options.find((hour) => hour.value.includes(text)) || {};

      if (value) {
        const hourRef = this.$refs[`hour-${value}`][0];
        if (hourRef) {
          hourRef.scrollIntoView({ behavior: 'smooth' });
        }
      }

      this.$emit('update:modelValue', text);
    },

    handleBlur({ close = false } = {}) {
      if (this.modelValue) {
        const cleanValue = this.modelValue.replace(/[^0-9]/g, '');

        if (cleanValue.length > 0) {
          let formattedTime = '';

          if (cleanValue.length === 4) {
            // Format: 0101 -> 01:01, 1310 -> 13:10
            const hours = cleanValue.substring(0, 2);
            const minutes = cleanValue.substring(2, 4);

            if (parseInt(hours) <= 23 && parseInt(minutes) <= 59) {
              formattedTime = `${hours}:${minutes}`;
            }
          } else if (cleanValue.length === 3) {
            // Format: 123 -> 01:23
            const hours = `0${cleanValue.substring(0, 1)}`;
            const minutes = cleanValue.substring(1, 3);

            if (parseInt(minutes) <= 59) {
              formattedTime = `${hours}:${minutes}`;
            }
          } else if (cleanValue.length === 2) {
            // Format: 12 -> 12:00
            const hours = cleanValue;
            formattedTime = `${hours}:00`;
          } else if (cleanValue.length === 1) {
            // Format: 1 -> 01:00
            const hours = `0${cleanValue}`;
            formattedTime = `${hours}:00`;
          }

          this.$emit('update:modelValue', formattedTime);
        }
      }

      if (close) {
        this.active = false;
      }
    },
    handleClickTimeOption(value) {
      this.$emit('update:modelValue', value);
      this.active = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

:deep(.unnnic-select-time__input) {
  &::-webkit-calendar-picker-indicator {
    background: none;
    display: none;
  }
}

.unnnic-select-time {
  &__options {
    @function calc-max-height($value) {
      @return ($value * $unnnic-font-size) - ($unnnic-spacing-xs * 2);
    }
    margin-top: $unnnic-spacing-nano;
    border-radius: $unnnic-border-radius-sm;
    box-shadow: $unnnic-shadow-level-near;
    background-color: $unnnic-color-background-snow;
    cursor: pointer;
    display: grid;
    max-height: calc-max-height(9.25);
    overflow-y: auto;

    &__item {
      margin: 0px $unnnic-spacing-nano;
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

      &:hover {
        border-radius: $unnnic-border-radius-sm;
        background-color: $unnnic-color-neutral-light;
      }

      &--selected {
        color: $unnnic-color-weni-600;
        font-weight: $unnnic-font-weight-bold;
      }
    }

    &::-webkit-scrollbar {
      width: $unnnic-spacing-inline-nano;
    }

    &::-webkit-scrollbar-thumb {
      background: $unnnic-color-neutral-cleanest;
      border-radius: $unnnic-border-radius-pill;
    }

    &::-webkit-scrollbar-track {
      background: $unnnic-color-neutral-soft;
      border-radius: $unnnic-border-radius-pill;
    }
  }
}
</style>

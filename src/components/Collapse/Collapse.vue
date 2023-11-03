<template>
  <div
    :class="[
      'unnnic-collapse',
      `unnnic-collapse--size-${size}`,
      {
        'unnnic-collapse--border-bottom': borderBottom,
        'unnnic-collapse--unspaced-icon': unspacedIcon,
        'unnnic-collapse--active': localActive,
      },
    ]"
  >
    <div class="unnnic-collapse__header" @click="localActive = !localActive">
      {{ title }}<slot name="header"></slot>

      <unnnic-icon
        size="xs"
        :icon="localActive ? 'arrow-button-up-1' : 'arrow-button-down-1'"
        :scheme="localActive ? 'neutral-dark' : 'neutral-cloudy'"
      />
    </div>

    <div v-show="localActive" class="unnnic-collapse__body">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import UnnnicIcon from '../Icon.vue';

const props = defineProps({
  title: String,
  active: Boolean,
  borderBottom: Boolean,
  unspacedIcon: Boolean,
  size: {
    type: String,
    default: 'lg',
    validator(value) {
      return ['md', 'lg'].includes(value);
    },
  },
  modelValue: Boolean,
});

const emit = defineEmits(['update:modelValue', 'change']);

const localActive = ref(false);

watch(localActive, (newActive) => {
  emit('change', newActive);
  emit('update:modelValue', newActive);
});

watch(
  () => props.active,
  (newActive) => {
    localActive.value = newActive;
  },
  { immediate: true },
);

watch(
  () => props.modelValue,
  (newActive) => {
    localActive.value = newActive;
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-collapse {
  padding-bottom: $unnnic-spacing-ant;

  &__header {
    display: flex;
    align-items: center;
    column-gap: $unnnic-spacing-ant;
    justify-content: space-between;
    cursor: pointer;
    padding: $unnnic-spacing-ant 0;
    margin-bottom: -$unnnic-spacing-ant;
    user-select: none;

    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-lg;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
    color: $unnnic-color-neutral-cloudy;

    &:hover {
      color: $unnnic-color-neutral-dark;

      ::v-deep svg .primary {
        fill: $unnnic-color-neutral-dark;
      }
    }
  }

  &__body {
    margin-top: $unnnic-spacing-ant;

    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
    color: $unnnic-color-neutral-cloudy;
  }

  &--border-bottom {
    padding-bottom: $unnnic-spacing-ant - $unnnic-border-width-thinner;
    border-bottom: $unnnic-border-width-thinner solid $unnnic-color-neutral-cleanest;
  }

  &--active .unnnic-collapse__header {
    color: $unnnic-color-neutral-dark;
  }

  &--unspaced-icon .unnnic-collapse__header {
    justify-content: flex-start;
  }

  &--size-md .unnnic-collapse__header {
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
  }
}
</style>

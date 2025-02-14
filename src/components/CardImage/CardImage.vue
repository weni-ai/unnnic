<template>
  <div :class="['unnnic-card-image', { checked: modelValue }]">
    <div class="header">
      <div class="content">
        <div
          v-if="title"
          class="u font secondary body-lg bold color-neutral-darkest"
        >
          {{ title }}
        </div>

        <div
          v-if="description"
          class="u font secondary body-md color-neutral-cloudy"
        >
          {{ description }}
        </div>
      </div>

      <UnnnicCheckbox
        :modelValue="modelValue"
        @change="$emit('update:model-value', $event)"
      />

      <UnnnicDropdown
        v-if="$slots.actions"
        position="bottom-left"
      >
        <template #trigger>
          <UnnnicIcon
            icon="navigation-menu-vertical-1"
            size="sm"
            scheme="neutral-cleanest"
            clickable
          />
        </template>

        <slot name="actions" />
      </UnnnicDropdown>
    </div>

    <img
      class="image"
      :src="image"
    />

    <div
      v-if="data.length"
      class="details"
    >
      <div
        v-for="(item, index) in data"
        :key="index"
        class="data"
      >
        <div class="u font secondary body-gt color-neutral-dark">
          {{ item.name }}
        </div>

        <div class="value-container">
          <UnnnicAvatarIcon
            :icon="item.icon"
            size="xs"
            :scheme="item.scheme"
          />

          <div class="u font secondary body-gt black color-neutral-darkest">
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';
import UnnnicCheckbox from '../Checkbox/Checkbox.vue';
import UnnnicAvatarIcon from '../AvatarIcon/AvatarIcon.vue';
import UnnnicDropdown from '../Dropdown/Dropdown.vue';

export default {
  components: {
    UnnnicIcon,
    UnnnicCheckbox,
    UnnnicAvatarIcon,
    UnnnicDropdown,
  },

  props: {
    modelValue: Boolean,
    title: String,
    description: String,
    image: String,
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-card-image {
  display: flex;
  flex-direction: column;
  row-gap: $unnnic-spacing-stack-sm;
  background-color: $unnnic-color-background-snow;
  border-radius: $unnnic-border-radius-md;
  padding: $unnnic-spacing-inset-md;
  box-sizing: border-box;

  outline-style: solid;
  outline-color: $unnnic-color-neutral-soft;
  outline-width: $unnnic-border-width-thinner;
  outline-offset: -$unnnic-border-width-thinner;

  &:hover {
    box-shadow: $unnnic-shadow-level-near;
  }

  &.checked {
    outline-color: $unnnic-color-brand-weni;
  }

  .header {
    display: flex;
    align-items: center;
    column-gap: $unnnic-spacing-inline-xs;

    .content {
      flex: 1;
      overflow: hidden;

      .u.font {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .image {
    height: 9.5 * $unnnic-font-size;
    object-fit: cover;
    user-select: none;
    border-radius: $unnnic-border-radius-sm;
  }

  .details {
    display: grid;
    grid-gap: $unnnic-spacing-inline-xs $unnnic-spacing-stack-xs;
    grid-template-columns: repeat(auto-fit, minmax(9 * $unnnic-font-size, 1fr));

    .data {
      display: flex;
      flex-direction: column;
      row-gap: $unnnic-spacing-stack-nano;

      .value-container {
        display: flex;
        column-gap: $unnnic-spacing-inline-xs;
        align-items: center;
      }
    }
  }
}
</style>

<template>
  <div class="unnnic-tabs-expanded">
    <div
      class="back-container"
      data-testid="back"
      @click="$emit('back')"
    >
      <UnnnicIcon
        icon="keyboard-arrow-left-1"
        scheme="neutral-cloudy"
      />
    </div>

    <div
      v-for="item in items"
      :key="item.value"
      class="tab"
      data-testid="tab"
      @click="$emit('update:model-value', item.value)"
    >
      <div>
        <div
          :class="[
            'u font secondary body-gt bold',
            item.value === modelValue
              ? 'color-brand-weni-soft'
              : 'color-neutral-cloudy',
          ]"
          data-testid="tab-title"
        >
          {{ item.title }}
        </div>

        <div
          data-testid="tab-description"
          class="u font secondary body-sm color-neutral-cloudy"
        >
          {{ item.description }}
        </div>
      </div>

      <div
        v-if="item.value === modelValue"
        class="close-container"
      >
        <UnnnicIcon
          icon="close-1"
          size="xs"
          clickable
          scheme="neutral-cloudy"
          data-testid="tab-close-icon"
          @click.stop="$emit('close-tab', item)"
        />
      </div>
    </div>

    <div
      class="add-container"
      data-testid="tab-add"
      @click="$emit('add')"
    >
      <UnnnicIcon
        icon="add-1"
        scheme="neutral-cloudy"
        size="sm"
      />
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
    modelValue: {
      type: [String, Number],
      required: true,
    },

    items: {
      type: Array,
      required: true,
    },
  },
  emits: ['back', 'update:model-value', 'close-tab', 'add'],
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-tabs-expanded {
  position: relative;
  display: flex;
  background-color: $unnnic-color-background-snow;
  border-bottom: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;

  > * {
    margin-bottom: -$unnnic-border-width-thinner;
  }

  .back-container,
  .add-container {
    padding: $unnnic-spacing-inset-sm;
    cursor: pointer;
    user-select: none;
    min-width: 1.375 * $unnnic-font-size;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .back-container {
    border-right: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;

    .unnnic-icon {
      width: 1.375 * $unnnic-font-size;
      height: 1.375 * $unnnic-font-size;
      min-width: 1.375 * $unnnic-font-size;
      min-height: 1.375 * $unnnic-font-size;
    }
  }

  .tab {
    cursor: pointer;
    user-select: none;
    width: 10.25 * $unnnic-font-size;
    padding: $unnnic-squish-nano;
    box-sizing: border-box;
    display: flex;
    column-gap: $unnnic-spacing-inline-sm;
    justify-content: space-between;
    border-right: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;

    > div {
      overflow: hidden;

      .u.font {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .close-container {
      min-width: fit-content;
      margin-top: $unnnic-spacing-stack-nano;
    }
  }
}
</style>

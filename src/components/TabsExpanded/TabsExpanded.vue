<template>
  <div class="unnnic-tabs-expanded">
    <div
      class="back-container"
      @click="$emit('back')"
    >
      <UnnnicIcon
        icon="keyboard-arrow-left-1"
        scheme="neutral-cloudy"
      />
    </div>

    <div
      class="tab"
      v-for="item in items"
      :key="item.value"
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
        >
          {{ item.title }}
        </div>

        <div class="u font secondary body-sm color-neutral-cloudy">
          {{ item.description }}
        </div>
      </div>

      <div
        v-if="item.value === modelValue"
        class="close-container"
      >
        <UnnnicIcon
          @click.stop="$emit('close-tab', item)"
          icon="close-1"
          size="xs"
          scheme="neutral-cloudy"
        />
      </div>
    </div>

    <div
      class="add-container"
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
    },

    items: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

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

<template>
  <div class="unnnic-tabs-expanded">
    <div class="back-container" @click="$emit('back')">
      <unnnic-icon
        icon="keyboard-arrow-left-1"
        scheme="neutral-cloudy"
      />
    </div>

    <div class="tab" v-for="item in items" :key="item.value" @click="$emit('change', item.value)">
      <div>
        <div
          :class="[
            'u font secondary body-gt bold',
            item.value === value ? 'color-brand-weni-soft' : 'color-neutral-cloudy',
          ]"
        >
          {{ item.title }}
        </div>

        <div class="u font secondary body-sm color-neutral-cloudy">
          {{ item.description }}
        </div>
      </div>

      <div v-if="item.value === value" class="close-container">
        <unnnic-icon
          @click.native.stop="$emit('close-tab', item)"
          icon="close-1"
          size="xs"
          scheme="neutral-cloudy"
        />
      </div>
    </div>

    <div class="add-container" @click="$emit('add')">
      <unnnic-icon
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
  model: {
    event: 'change',
  },

  components: {
    UnnnicIcon,
  },

  props: {
    value: {
      type: [String, Number],
    },

    items: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.unnnic-tabs-expanded {
  position: relative;
  display: flex;
  background-color: $unnnic-color-background-snow;
  border-bottom: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;

  > * {
    margin-bottom: -$unnnic-border-width-thinner;
  }

  .back-container, .add-container {
    padding: $unnnic-spacing-inset-sm;
    cursor: pointer;
    user-select: none;
    min-width: 1.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .back-container {
    border-right: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;

    .unnnic-icon {
      width: 1.375rem;
      height: 1.375rem;
      min-width: 1.375rem;
      min-height: 1.375rem;
    }
  }

  .tab {
    cursor: pointer;
    user-select: none;
    width: 10.25rem;
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

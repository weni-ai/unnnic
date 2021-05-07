<template>
  <div class="unnnic-card-dash">
    <div :class="['unnnic-card-dash__icon', `unnnic-card-scheme--${scheme}` ]">
      <UICon
        :icon="icon"
        size="xs"
      />
    </div>
    <div class="unnnic-card-dash__content">
      <div class="unnnic-card-dash__title">{{ title }}</div>
      <div class="unnnic-card-dash__data">
        <div class="unnnic-card-dash__value">{{ value }}</div>

        <div
          v-if="percent"
          :class="[
            'unnnic-card-dash__percent',
            `unnnic-card-scheme--feedback-${percent < 0 ? 'red' : 'green'}`]">
          <UICon
            icon="graph-stats-ascend-2"
            class="unnnic-card-dash__percent__icon"
            size="sm"
          />
          <div class="unnnic-card-dash__percent_value">
            {{ percent >= 0 ? `+${percent}%` : `${percent}%` }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UICon from '../Icon.vue';

export default {
  name: 'unnnic-card',
  components: { UICon },
  props: {
    title: {
      type: String,
      default: null,
    },
    value: {
      type: Number,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    percent: {
      type: Number,
      default: 0,
    },
    scheme: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/unnnic.scss";

.unnnic-card-dash {
  display: flex;
  background-color: $unnnic-color-background-snow;
  border-radius: $unnnic-border-radius-sm;
  padding: $unnnic-inset-sm;
  box-shadow: $unnnic-shadow-level-far;

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: $unnnic-inline-xs;
  }

  &__data {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__percent {
    display: flex;
    flex-direction: row;
    margin-left: auto;

    border-radius: $unnnic-border-radius-sm;
    padding: $unnnic-inline-nano $unnnic-inset-nano;

    &__icon {
      margin-right: $unnnic-inline-nano;
      line-height: $unnnic-font-size-body-lg + $unnnic-line-height-medium;
    }
  }

  &__icon {
    border-radius: $unnnic-border-radius-sm;
    padding: 2px 4px;
    align-self: flex-start;
  }

  &__title {
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-lg;
    font-weight: $unnnic-font-weight-regular;
    color: $unnnic-color-neutral-dark;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-medium;
  }

  &__value {
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-title-md;
    font-weight: $unnnic-font-weight-bold;
    color: $unnnic-color-neutral-darkest;
    padding-top: $unnnic-spacing-stack-nano;
    padding-right: $unnnic-inline-nano;
    line-height: $unnnic-font-size-title-md + $unnnic-line-height-medium;
  }

  &__percent_value {
    border-radius: $unnnic-border-radius-sm;
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-md;
    font-weight: $unnnic-font-weight-bold;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
  }

  &__percent_icon {
    border-radius: $unnnic-border-radius-sm;
  }
}
</style>

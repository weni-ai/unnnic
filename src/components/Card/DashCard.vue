<template>
  <div class="unnnic-card-dash">
    <div class="header">
      <div :class="['avatar-icon', `unnnic-card-scheme--${scheme}`]">
        <unnnic-icon :icon="icon" :scheme="scheme" size="md"/>
      </div>

      <div class="label">{{ title }}</div>
    </div>

    <div class="content">
      <div class="value">{{ value }}</div>

      <div v-if="percent" :class="['percent', `unnnic-card-scheme--feedback-${color}`]">
        <unnnic-icon
          icon="graph-stats-ascend-2"
          :scheme="`feedback-${color}`"
          size="sm"
          class="icon"
        />

        <div class="label">
          {{ percent >= 0 ? `+${percent}%` : `${percent}%` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon-svg.vue';

export default {
  name: 'unnnic-card',
  components: { UnnnicIcon },
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

  computed: {
    color() {
      return this.percent < 0 ? 'red' : 'green';
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/unnnic.scss";

.unnnic-card-dash {
  display: flex;
  flex-direction: column;
  background-color: $unnnic-color-background-snow;
  border-radius: $unnnic-border-radius-sm;
  padding: $unnnic-inset-sm;
  box-shadow: $unnnic-shadow-level-far;

  .header {
    display: flex;
    align-items: center;
    margin-bottom: $unnnic-spacing-stack-nano;

    .avatar-icon {
      width: $unnnic-avatar-size-sm;
      height: $unnnic-avatar-size-sm;
      border-radius: $unnnic-border-radius-sm;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .label {
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-lg;
      font-weight: $unnnic-font-weight-regular;
      line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
      color: $unnnic-color-neutral-dark;
      margin-left: $unnnic-inline-xs;
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    padding-left: $unnnic-avatar-size-sm + $unnnic-inline-xs;

    .value {
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-title-md;
      font-weight: $unnnic-font-weight-bold;
      line-height: $unnnic-font-size-title-md + $unnnic-line-height-md;
      color: $unnnic-color-neutral-darkest;
      margin-right: $unnnic-inline-nano;
    }

    .percent {
      display: flex;
      align-items: center;

      border-radius: $unnnic-border-radius-sm;
      padding: $unnnic-inline-nano $unnnic-inset-nano;

      .label {
        font-family: $unnnic-font-family-secondary;
        font-size: $unnnic-font-size-body-md;
        font-weight: $unnnic-font-weight-bold;
        line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
      }

      .icon {
        margin-right: $unnnic-inline-nano;
      }
    }
  }
}
</style>

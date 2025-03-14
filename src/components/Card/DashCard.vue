<template>
  <div class="unnnic-card-dash">
    <div class="header">
      <UnnnicAvatarIcon
        size="sm"
        :scheme="scheme"
        :icon="icon"
      />

      <div class="label">{{ title }}</div>
    </div>

    <div class="content">
      <div class="value">{{ value }}</div>

      <div
        v-if="percent"
        :class="['percent', `unnnic-card-scheme--feedback-${color}`]"
      >
        <UnnnicIcon
          :icon="`graph-stats-${percent >= 0 ? 'ascend' : 'descend'}-2`"
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
import UnnnicAvatarIcon from '../AvatarIcon/AvatarIcon.vue';
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'UnnnicCard',
  components: {
    UnnnicIcon,
    UnnnicAvatarIcon,
  },
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
    invertedPercentage: {
      type: Boolean,
      default: false,
    },
    scheme: {
      type: String,
      default: null,
    },
  },

  computed: {
    color() {
      if (this.invertedPercentage) {
        return this.percent < 0 ? 'green' : 'red';
      }

      return this.percent < 0 ? 'red' : 'green';
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

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

<template>
  <!-- Card Item List Selected Icon On -->
  <div
    :class="{
      'unnnic-card-account': true,
      enabled: enabled,
    }"
  >
    <div class="icon">
      <div :class="['avatar-icon', enabled ? `unnnic-card-scheme--${scheme}` : 'disabled']">
        <unnnic-icon :icon="icon" :scheme="enabled ? scheme : 'neutral-cloudy'" size="sm" />
      </div>
    </div>

    <div class="content">
      <div class="title">{{ title }}</div>

      <div class="description">{{ description }}</div>
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
    description: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    scheme: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.unnnic-card-account {
  display: flex;
  border-radius: $unnnic-border-radius-sm;
  padding: $unnnic-squish-xs;

  &.enabled {
    background-color: $unnnic-color-background-sky;
  }

  .icon {
    margin-right: $unnnic-inline-xs;

    .avatar-icon {
      width: $unnnic-avatar-size-xs;
      height: $unnnic-avatar-size-xs;
      border-radius: $unnnic-border-radius-sm;
      display: flex;
      justify-content: center;
      align-items: center;

      &.disabled {
        background-color: $unnnic-color-background-grass;
      }
    }
  }

  .content {
    .title {
      font-family: $unnnic-font-family-primary;
      font-size: $unnnic-font-size-body-lg;
      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-neutral-darkest;
      line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
    }

    .description {
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-gt;
      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-neutral-cloudy;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
      margin-top: $unnnic-spacing-stack-nano;
    }
  }
}
</style>

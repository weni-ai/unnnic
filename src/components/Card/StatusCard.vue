<template>
  <div :class="['unnnic-card-status', `unnnic-card-scheme--${scheme}--border`]">
    <div class="header">
      <UnnnicIcon
        :icon="icon"
        scheme="neutral-dark"
        size="md"
        class="icon"
      />

      <div class="label">{{ title }}</div>
    </div>

    <div class="content">
      <div class="title-container">
        <UnnnicIcon
          icon="indicator"
          :scheme="scheme"
          size="sm"
        />
        <div class="title">{{ status }}</div>
      </div>

      <div class="description">{{ description }}</div>
    </div>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'UnnnicCard',
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
    status: {
      type: String,
      default: null,
    },
    scheme: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-card-status {
  display: flex;
  flex-direction: column;
  background-color: $unnnic-color-background-sky;
  border-radius: $unnnic-border-radius-sm;
  padding: $unnnic-inset-sm;

  .header {
    display: flex;
    align-items: center;

    .icon {
      margin-right: $unnnic-spacing-inline-nano;
    }

    .label {
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-lg;
      font-weight: $unnnic-font-weight-regular;
      line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
      color: $unnnic-color-neutral-dark;
    }
  }

  .content {
    margin-top: $unnnic-spacing-stack-xs;

    .title-container {
      display: flex;
      align-items: center;

      .title {
        font-family: $unnnic-font-family-secondary;
        font-size: $unnnic-font-size-body-gt;
        font-weight: $unnnic-font-weight-regular;
        line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
        color: $unnnic-color-neutral-darkest;
      }
    }

    .description {
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-gt;
      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-neutral-cloudy;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
      margin-left: $unnnic-icon-size-sm;
    }
  }
}
</style>

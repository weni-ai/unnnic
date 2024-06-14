<template>
  <div class="unnnic-card-title">
    <div :class="['avatar-icon', `unnnic-card-scheme--${scheme}`]">
      <UnnnicIcon
        :icon="icon"
        :scheme="scheme"
        size="md"
      />
    </div>

    <div class="title">{{ title }}</div>

    <ToolTip
      v-if="hasInformationIcon"
      class="information"
      :side="infoPosition"
      :text="info"
      :enabled="enabled"
    >
      <UnnnicIcon
        icon="information-circle-4"
        class="unnnic-card-title__content_info"
        size="sm"
        scheme="neutral-soft"
      />
    </ToolTip>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';
import ToolTip from '../ToolTip/ToolTip.vue';

export default {
  name: 'UnnnicCard',
  components: { ToolTip, UnnnicIcon },
  props: {
    title: {
      type: String,
      default: null,
    },
    info: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    infoPosition: {
      type: String,
      default: 'right',
    },
    scheme: {
      type: String,
      default: null,
    },
    hasInformationIcon: {
      type: Boolean,
      default: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-card-title {
  display: flex;
  align-items: center;

  .avatar-icon {
    width: $unnnic-avatar-size-sm;
    height: $unnnic-avatar-size-sm;
    border-radius: $unnnic-border-radius-sm;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: $unnnic-inline-sm;
  }

  .title {
    font-family: $unnnic-font-family-primary;
    font-size: $unnnic-font-size-title-sm;
    font-weight: $unnnic-font-weight-regular;
    line-height: $unnnic-font-size-title-sm + $unnnic-line-height-md;
    color: $unnnic-color-neutral-darkest;
    flex: 1;
  }

  .information {
    margin-left: $unnnic-spacing-inline-xs;
  }
}
</style>

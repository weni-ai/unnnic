<template>
  <section class="unnnic-disclaimer">
    <UnnnicIcon
      class="unnnic-disclaimer__icon"
      size="avatar-nano"
      :icon="icon"
      :scheme="iconColor"
      data-testid="disclaimer-icon"
    />
    <p
      class="unnnic-disclaimer__text"
      data-testid="disclaimer-text"
      v-html="text"
    />
  </section>
</template>

<script>
import icons from '../../utils/iconList';
import colors from '../../utils/colorsList';

import unnnicIcon from '../Icon.vue';

export default {
  name: 'UnnnicDisclaimer',
  components: { unnnicIcon },
  props: {
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'alert-circle-1-1',
      validator(value) {
        return icons.includes(value);
      },
    },
    iconColor: {
      type: String,
      default: 'neutral-darkest',
      validator(value) {
        return colors.includes(value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';
.unnnic-disclaimer {
  display: inline-flex;
  align-items: center;
  gap: $unnnic-spacing-xs;
  padding: $unnnic-spacing-sm;
  border-radius: $unnnic-border-radius-sm;
  border: 1px solid $unnnic-color-neutral-soft;
  background: $unnnic-color-background-lightest;
  .unnnic-disclaimer__text {
    margin: 0;
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-line-height-large * 1.375;
    font-weight: $unnnic-font-weight-regular;
    color: $unnnic-color-neutral-dark;
  }
}
</style>

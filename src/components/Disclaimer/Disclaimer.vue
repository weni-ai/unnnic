<template>
  <div>
  <div class="unnnic-disclaimer">
    <unnnic-icon :icon="icon" size="avatar-nano" :scheme="iconScheme"/>
    <span class="unnnic-disclaimer__text">{{ text }}</span>
  </div>
</div>
</template>

<script>
import unnnicIcon from '../Icon.vue';

export default {
  name: 'unnnic-disclaimer',
  components: { unnnicIcon },
  props: {
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'alert-circle-1-1',
    },
    type: {
      type: String,
    },
  },
  computed: {
    iconScheme() {
      const typeToSchemeMap = {
        info: 'feedback-blue',
        success: 'feedback-green',
        error: 'feedback-red',
        warning: 'feedback-yellow',
      };
      return typeToSchemeMap[this.type] || '';
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
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-line-height-large * 1.375;
    font-weight: $unnnic-font-weight-regular;
    color: $unnnic-color-neutral-dark;
  }
}

</style>

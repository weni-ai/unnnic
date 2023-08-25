<template>
  <div @click="close" @keypress.enter="close" class="unnnic-button-close">
    <unnnic-icon icon="close-1" :size="size" />
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'ButtonClose',

  components: {
    UnnnicIcon,
  },

  props: {
    size: {
      type: String,
      default: 'md',
      validator(value) {
        return [
          'nano', 'xs', 'sm', 'ant', 'md', 'lg', 'xl',
          'avatar-lg', 'avatar-md', 'avatar-sm', 'avatar-xs', 'avatar-nano',
        ].indexOf(value) !== -1;
      },
    },
    close: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/unnnic.scss";

.unnnic-button-close {
  display: inline-block;

  cursor: pointer;
}
</style>

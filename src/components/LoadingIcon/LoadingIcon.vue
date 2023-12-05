<template>
  <unnnic-icon
    class="unnnic-loading-icon"
    icon="progress_activity"
    :scheme="scheme"
    :size="size"
  />
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'LoadingIcon',

  components: {
    UnnnicIcon,
  },

  props: {
    scheme: {
      type: String,
      default: 'neutral-dark'
    },
    size: {
      type: String,
      default: 'lg'
    }
  }

}
</script>

<style lang="scss" scoped>
.unnnic-loading-icon {
  user-select: none;

  animation: loading 1300ms linear infinite;

  @keyframes loading {
    0% {
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>

<template>
  <unnnic-icon
    class="unnnic-icon-loading"
    icon="progress_activity"
    :scheme="scheme"
    :size="size"
  />
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'IconLoading',

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
.unnnic-icon-loading {
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

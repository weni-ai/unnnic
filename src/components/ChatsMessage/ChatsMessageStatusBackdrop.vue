<template>
  <div class="unnnic-chats-message-status-backdrop__container">
    <div class="unnnic-chats-message-status-backdrop">
      <UnnnicIconLoading
        v-if="status === 'sending'"
        scheme="neutral-white"
        size="avatar-sm"
      />
      <UnnnicIcon
        v-else
        icon="upload"
        scheme="neutral-white"
        size="avatar-sm"
        :class="{ loading: status === 'sending' }"
      />
    </div>
  </div>
</template>
<script>
import UnnnicIconLoading from '../IconLoading/IconLoading.vue';
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'UnnnicChatsMessageStatusBackdrop',

  components: {
    UnnnicIconLoading,
    UnnnicIcon,
  },

  props: {
    status: {
      type: String,
      required: true,
      default: 'sending',
      validate(status) {
        return ['sending', 'failed'].includes(status);
      },
    },
  },
};
</script>
<style lang="scss">
@import '../../assets/scss/unnnic.scss';

.unnnic-chats-message-status-backdrop__container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  backdrop-filter: blur(1px);
}
.unnnic-chats-message-status-backdrop {
  border-radius: $unnnic-border-radius-lg;

  padding: $unnnic-spacing-ant;

  box-sizing: content-box;
  background-color: rgba($unnnic-color-neutral-darkest, 0.3);

  display: flex;

  svg {
    position: initial;
  }
}
</style>

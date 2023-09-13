<template>
  <div class="unnnic-chats-message-status-backdrop" @click="$emit('click')">
    <unnnic-icon
      :icon="status === 'sending' ? 'loading-circle-1' : 'upload-bottom-1'"
      scheme="neutral-white"
      size="avatar-sm"
    />
  </div>
</template>
<script>
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'UnnnicChatsMessageStatusBackdrop',

  components: {
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

.unnnic-chats-message-status-backdrop {
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

  .unnnic-icon {
    border-radius: $unnnic-border-radius-lg;

    padding: $unnnic-spacing-ant;

    background-color: rgba($unnnic-color-neutral-darkest, 0.3);

    svg {
      position: initial;
    }
  }
}
</style>

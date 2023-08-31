<template>
  <div class="unnnic-chats-message" :class="{ sent: type === 'sent', sending }">
    <p class="unnnic-chats-message__text">{{ message }}</p>
    <p class="unnnic-chats-message__time">{{ treatedTime }}</p>
  </div>
</template>

<script>
export default {
  name: 'UnnnicChatsMessage',
  props: {
    message: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
      validate(type) {
        return ['received', 'sent'].includes(type);
      },
    },
    time: {
      type: Date,
      default: null,
      required: true,
    },
    sending: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    treatedTime() {
      const date = new Date(this.time);
      const hours = date.getHours();
      const minutes = date.getMinutes();

      const formattedTime = `${hours}:${minutes}`;
      return formattedTime;
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnnic.scss';

.unnnic-chats-message {
  width: fit-content;
  min-width: 70px;
  max-width: 500px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: $unnnic-spacing-xs;

  border-radius: $unnnic-border-radius-lg;

  padding: $unnnic-spacing-xs;

  background-color: $unnnic-color-neutral-white;

  font-family: $unnnic-font-family-secondary;

  * {
    margin: 0;
  }

  &.sent {
    background-color: $unnnic-color-weni-50;
  }

  &.sending {
    .unnnic-chats-message__text {
      color: $unnnic-color-neutral-clean;
    }
  }

  &__text {
    padding: $unnnic-spacing-nano 0;

    color: $unnnic-color-neutral-dark;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
    word-break: break-word;
  }

  &__time {
    color: $unnnic-color-neutral-clean;
  }
}
</style>

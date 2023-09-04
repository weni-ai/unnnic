<template>
  <div
    class="unnnic-chats-message"
    :class="{
      sent: type === 'sent',
      sending: status === 'sending',
      'is-document': isDocument,
      'is-media': isMedia,
      'is-image': isImage,
      'is-video': isVideo,
    }"
    @click="$emit('click')"
  >
    <p v-if="isText" class="unnnic-chats-message__text">
      <slot name="text" :content="formattedText" />
    </p>

    <div v-if="isDocument" class="unnnic-chats-message__document">
      <unnnic-icon
        v-if="status === 'sending' || status === 'failed'"
        :icon="status === 'sending' ? 'loading-circle-1' : 'upload-bottom-1'"
        size="lg"
      />
      <unnnic-icon v-else icon="office-file-pdf-1-1" scheme="neutral-dark" size="lg" />
      <p class="unnnic-chats-message__document__text">
        {{ documentName }}
      </p>
    </div>

    <div
      v-else
      class="unnnic-chats-message__media__container"
      :class="{ failed: failedToSendMedia }"
      @click="$emit('click-image')"
    >
      <slot name="media" />
      <unnnic-chats-message-status-backdrop
        v-if="(sendingMedia || failedToSendMedia) && (isImage || isVideo)"
        :status="status"
      />
    </div>

    <unnnic-icon v-if="sendingMedia" icon="loading-circle-1" size="avatar-nano" />
    <p v-else class="unnnic-chats-message__time">{{ formattedTime }}</p>
  </div>
</template>

<script>
import UnnnicChatsMessageStatusBackdrop from './ChatsMessageStatusBackdrop.vue';
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'UnnnicChatsMessage',
  components: { UnnnicChatsMessageStatusBackdrop, UnnnicIcon },
  props: {
    type: {
      type: String,
      default: 'received',
      validate(type) {
        return ['received', 'sent'].includes(type);
      },
    },
    time: {
      type: Date,
      default: null,
      required: true,
    },
    documentName: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: 'sent',
      validate(status) {
        return ['sending', 'sent', 'failed'].includes(status);
      },
    },
  },

  computed: {
    formattedText() {
      const slotContent = this.$slots.text?.[0]?.text;
      return typeof slotContent === 'string' ? slotContent : '';
    },
    formattedTime() {
      const date = new Date(this.time);
      const hours = date.getHours();
      const minutes = date.getMinutes();

      const formattedTime = `${hours}:${minutes}`;
      return formattedTime;
    },
    isText() {
      return !!this.$slots.text;
    },
    isMedia() {
      return !!this.$slots.media;
    },
    isImage() {
      const slotContents = this.$slots.media;

      if (slotContents && slotContents[0]) {
        const isImgTag = slotContents[0].tag === 'img';
        return isImgTag;
      }
      return false;
    },
    isVideo() {
      const slotContents = this.$slots.media;

      if (slotContents && slotContents[0]) {
        const isVideoTag = slotContents[0].tag === 'video';
        return isVideoTag;
      }
      return false;
    },
    isDocument() {
      return !!this.documentName;
    },
    sendingMedia() {
      return this.isMedia && this.status === 'sending';
    },
    failedToSendMedia() {
      return (this.isImage || this.isVideo) && this.status === 'failed';
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnnic.scss';

$defaultLineHeight: $unnnic-font-size-body-gt + $unnnic-line-height-medium;

.unnnic-chats-message {
  width: fit-content;
  min-width: 70px;
  max-width: 500px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: $unnnic-spacing-xs;

  border-radius: $unnnic-border-radius-md;

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

  &.is-media {
    padding: $unnnic-spacing-nano $unnnic-spacing-xs;

    &.is-image,
    &.is-video {
      padding: $unnnic-spacing-xs;

      display: grid;
      justify-items: end;

      overflow: hidden;

      img, video {
        border-radius: $unnnic-border-radius-md;

        min-height: 200px;
        max-height: 300px;
        height: auto;
      }
    }

    &.is-image img {
      width: 200px;
      height: auto;
      max-width: 200px;

      object-fit: cover;
    }

    &.is-video video {
      width: 300px;
      max-width: 300px;
    }
  }

  &.is-document {
    min-width: 200px;
    max-width: 400px;
  }

  &__document {
    display: flex;
    align-items: center;
    gap: $unnnic-spacing-xs;

    &__text {
      &:hover {
        text-decoration: underline;

        cursor: pointer;
      }
    }
  }

  &__text, &__document__text {
    padding: $unnnic-spacing-nano 0;

    color: $unnnic-color-neutral-dark;
    line-height: $defaultLineHeight;
    word-break: break-word;
  }

  &__time {
    font-size: $unnnic-font-size-body-gt;
    line-height: $defaultLineHeight;
    color: $unnnic-color-neutral-clean;
  }

  &__media__container {
    position: relative;

    display: flex;

    &.failed {
      cursor: pointer;
    }
  }
}
</style>
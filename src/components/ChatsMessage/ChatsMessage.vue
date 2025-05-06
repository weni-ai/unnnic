<template>
  <section
    class="unnnic-chats-message"
    :class="{
      sent: type === 'sent',
      sending: status === 'sending',
      'is-document': isDocument,
      'is-media': isMedia,
      'is-image': isImage,
      'is-video': isVideo,
      'is-geo': isGeolocation,
    }"
    @mouseover="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <ReplyMessage
      v-if="replyMessage"
      class="unnnic-chats-message__reply-message"
      :replyMessage="replyMessage"
      :messageType="type"
      data-testid="reply-message"
    />
    <p
      v-if="signature"
      class="unnnic-chats-message__signature"
    >
      {{ signature }}
    </p>
    <main
      class="unnnic-chats-message__main"
      :class="{
        'is-document': isDocument,
        'is-media': isMedia,
        'is-image': isImage,
        'is-video': isVideo,
        'is-geo': isGeolocation,
      }"
    >
      <UnnnicIcon
        v-if="isGeolocation"
        class="geolocation-icon"
        icon="location_on"
        size="avatar-nano"
      />
      <UnnnicChatsMessageText
        v-if="isText"
        :text="slotText"
      />
      <div
        v-if="isDocument"
        class="unnnic-chats-message__document"
      >
        <UnnnicIconLoading
          v-if="status === 'sending'"
          scheme="neutral-dark"
          size="lg"
        />
        <UnnnicIcon
          v-else-if="status === 'failed'"
          icon="upload"
          scheme="neutral-dark"
          size="lg"
        />
        <UnnnicIcon
          v-else
          icon="article"
          scheme="neutral-dark"
          size="lg"
        />
        <p
          class="unnnic-chats-message__document__text"
          @click="$emit('click')"
        >
          {{ documentName }}
        </p>
      </div>
      <div
        v-else-if="isMedia && !isGeolocation"
        class="unnnic-chats-message__media__container"
        :class="{ failed: failedToSendMedia }"
        @click="onClickMedia"
      >
        <slot />
        <UnnnicChatsMessageStatusBackdrop
          v-if="(sendingMedia || failedToSendMedia) && (isImage || isVideo)"
          :status="status"
          @click.stop="status === 'failed' ? $emit('click') : () => {}"
        />
      </div>

      <UnnnicIconLoading
        v-if="sendingMedia"
        size="avatar-nano"
        scheme="neutral-dark"
      />

      <section
        v-if="
          enableReply && isHovering && !['sending', 'failed'].includes(status)
        "
        class="unnnic-chats-message__tooltip"
      >
        <UnnnicTooltip
          enabled
          size="right"
          :text="i18n('reply')"
          :side="type === 'sent' ? 'bottom' : 'right'"
        >
          <UnnnicIcon
            icon="reply"
            clickable
            scheme="neutral-dark"
            size="avatar-nano"
            data-testid="reply-icon"
            @click.stop="$emit('reply')"
          />
        </UnnnicTooltip>
      </section>
      <section
        v-else
        class="unnnic-chats-message__time-container"
      >
        <p class="unnnic-chats-message__time">
          {{ formattedTime }}
        </p>
        <UnnnicIcon
          v-if="type === 'sent'"
          :icon="messageStatusIcon"
          size="sm"
          :scheme="status === 'readed' ? 'aux-blue-500' : 'neutral-clean'"
        />
      </section>
    </main>
  </section>
</template>

<script>
import UnnnicChatsMessageStatusBackdrop from './ChatsMessageStatusBackdrop.vue';
import UnnnicChatsMessageText from './ChatsMessageText.vue';
import UnnnicIconLoading from '../IconLoading/IconLoading.vue';
import UnnnicIcon from '../Icon.vue';
import UnnnicTooltip from '../ToolTip/ToolTip.vue';
import UnnnicI18n from '../../mixins/i18n';
import ReplyMessage from './ReplyMessage.vue';

export default {
  name: 'UnnnicChatsMessage',
  components: {
    UnnnicChatsMessageText,
    UnnnicChatsMessageStatusBackdrop,
    UnnnicIconLoading,
    UnnnicIcon,
    UnnnicTooltip,
    ReplyMessage,
  },
  mixins: [UnnnicI18n],
  props: {
    enableReply: {
      type: Boolean,
      default: false,
    },
    replyMessage: {
      type: [Object, null],
      default: null,
    },
    type: {
      type: String,
      default: 'received',
      validate(type) {
        return ['received', 'sent'].includes(type);
      },
    },
    time: {
      type: Date,
      required: true,
    },
    signature: {
      type: String,
      default: '',
    },
    documentName: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: 'sent',
      validate(status) {
        return ['sending', 'sent', 'failed', 'received', 'readed'].includes(
          status,
        );
      },
    },
    mediaType: {
      type: String,
      default: '',
      validate(status) {
        return ['audio', 'image', 'video', 'geo'].includes(status);
      },
    },
  },

  emits: ['click', 'click-image', 'reply'],

  data() {
    return {
      isHovering: false,
      defaultTranslations: {
        reply: {
          'pt-br': 'Responder',
          en: 'Reply',
          es: 'Responder',
        },
      },
    };
  },

  computed: {
    formattedTime() {
      const date = new Date(this.time);
      const hours = date.getHours();
      let minutes = date.getMinutes();

      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      const formattedTime = `${hours}:${minutes}`;
      return formattedTime;
    },
    isMedia() {
      return !!this.mediaType;
    },
    isDocument() {
      return !!this.documentName;
    },
    isText() {
      const validText = !this.isMedia || this.isGeolocation;
      return validText && !this.isDocument;
    },
    isImage() {
      return this.isMedia && this.mediaType === 'image';
    },
    isVideo() {
      return this.isMedia && this.mediaType === 'video';
    },
    isGeolocation() {
      return this.isMedia && this.mediaType === 'geo';
    },
    slotText() {
      return (
        this.$slots?.default?.()?.[0]?.children ||
        this.$slots?.text?.()?.[0]?.children ||
        ''
      );
    },
    sendingMedia() {
      return this.isMedia && this.status === 'sending';
    },
    failedToSendMedia() {
      return (this.isImage || this.isVideo) && this.status === 'failed';
    },
    messageStatusIcon() {
      if (this.status === 'sending') return 'history';

      return this.status === 'received' || this.status === 'readed'
        ? 'done_all'
        : 'done';
    },
  },

  methods: {
    onClickMedia() {
      if (this.isImage || this.isVideo) {
        this.$emit('click-image');
      }
    },
  },
};
</script>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;

$defaultLineHeight: $unnnic-font-size-body-gt + $unnnic-line-height-medium;

.is-media .unnnic-chats-message__reply-message {
  margin: (-$unnnic-spacing-nano) (-$unnnic-spacing-nano) 0px
    (-$unnnic-spacing-nano);
}

.unnnic-chats-message {
  width: fit-content;
  min-width: 70px;
  max-width: 500px;

  display: grid;
  gap: $unnnic-spacing-nano;

  border-radius: $unnnic-border-radius-md;

  padding: $unnnic-spacing-xs $unnnic-spacing-ant;

  background-color: $unnnic-color-neutral-white;

  font-family: $unnnic-font-family-secondary;

  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);

  &__tooltip {
    display: flex;
    justify-content: end;
    min-width: 50.88px;
  }

  &__reply-message {
    margin: (-$unnnic-spacing-nano) (-$unnnic-spacing-xs) 0px
      (-$unnnic-spacing-xs);
  }

  &.sent {
    background-color: #cff8f4;
  }

  &.sending {
    .unnnic-chats-message__text {
      color: $unnnic-color-neutral-clean;
    }
  }

  &.is-media {
    padding: $unnnic-spacing-xs;
  }

  &__main {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: $unnnic-spacing-sm;

    & > * {
      margin: 0;
    }

    &.is-media {
      &.is-image,
      &.is-video {
        display: grid;
        justify-items: end;

        overflow: hidden;

        .media {
          overflow: hidden;

          border-radius: $unnnic-border-radius-md;

          min-height: 200px;
          max-height: 300px;
          height: auto;
        }
      }

      &.is-image .media {
        width: 200px;
        height: auto;
        max-width: 200px;

        object-fit: cover;
      }

      &.is-video .media {
        width: 300px;
        max-width: 300px;
      }
    }

    &.is-document {
      min-width: 200px;
      max-width: 400px;
    }
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

  &__text,
  &__document__text,
  &__signature {
    margin: 0;

    padding: $unnnic-spacing-nano 0;

    font-size: $unnnic-font-size-body-gt;
    color: $unnnic-color-neutral-dark;
    line-height: $defaultLineHeight;
    word-break: break-word;
  }

  &__signature {
    padding: 0;

    font-weight: $unnnic-font-weight-bold;
  }

  &__status-time {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: $unnnic-spacing-nano;
    min-width: 51px;
  }

  &__time {
    font-size: $unnnic-font-size-body-md;
    line-height: $defaultLineHeight;
    color: $unnnic-color-neutral-clean;
    margin: 0;
    padding: 0;

    &-container {
      display: flex;
      align-items: center;
      gap: $unnnic-spacing-nano;
    }
  }

  &__media__container {
    position: relative;

    display: flex;

    &.failed {
      cursor: pointer;
    }
  }
  .geolocation-icon {
    align-self: center;
  }
}
</style>

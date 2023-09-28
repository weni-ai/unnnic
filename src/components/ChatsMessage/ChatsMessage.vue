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
  >
    <p v-if="isText" v-html="formattedText" class="unnnic-chats-message__text" />

    <div v-if="isDocument" class="unnnic-chats-message__document">
      <unnnic-icon
        v-if="status === 'sending' || status === 'failed'"
        :icon="status === 'sending' ? 'loading-circle-1' : 'upload-bottom-1'"
        size="lg"
      />
      <unnnic-icon v-else icon="office-file-pdf-1-1" scheme="neutral-dark" size="lg" />
      <p class="unnnic-chats-message__document__text" @click="$emit('click')">
        {{ documentName }}
      </p>
    </div>

    <div
      v-else-if="isMedia"
      class="unnnic-chats-message__media__container"
      :class="{ failed: failedToSendMedia }"
      @click="$emit('click-image')"
    >
      <slot />
      <unnnic-chats-message-status-backdrop
        v-if="(sendingMedia || failedToSendMedia) && (isImage || isVideo)"
        :status="status"
        @click="status === 'failed' ? $emit('click') : () => {}"
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
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: 'sent',
      validate(status) {
        return ['sending', 'sent', 'failed'].includes(status);
      },
    },
    mediaType: {
      type: String,
      default: '',
      validate(status) {
        return ['audio', 'image', 'video'].includes(status);
      },
    },
  },

  computed: {
    formattedText() {
      const slotContent = this.$slots.default?.[0]?.text || this.$slots.text?.[0]?.text;

      function removeHtmlDangerousContent(text) {
      // eslint-disable-next-line default-param-last
        return text.replace(/<(\/)?([^> ]+)( [^>]+)?>/gi, ($1, $2 = '', $3, $4 = '') => {
          if (['b', 'i', 'u', 'ul', 'li', 'br', 'div'].includes($3)) {
            const complements = [];

            // eslint-disable-next-line no-restricted-syntax
            for (const i of $4.matchAll(
              /((?<name1>[^ =]+)="(?<value1>[^"]*)"|(?<name2>[^ =]+)='(?<value2>[^"]*)')/g,
            )) {
              const name = i.groups.name1 || i.groups.name2;
              const value = i.groups.value1 || i.groups.value2;

              if (name === 'style') {
                const styles = [];

                // eslint-disable-next-line no-restricted-syntax
                for (const j of value.matchAll(/(?<propertyName>[^:]+):(?<propertyValue>[^;]+);?/g)) {
                  if (j.groups.propertyName.toLowerCase().trim() === 'text-align') {
                    styles.push(
                      `${j.groups.propertyName
                        .toLowerCase()
                        .trim()}: ${j.groups.propertyValue.trim()}`,
                    );
                  }
                }

                complements.push(`style="${styles.join('; ')};"`);
              }
            }

            return `<${$2}${$3}${complements.length ? ` ${complements.join(' ')}` : ''}>`;
          }

          return '';
        });
      }

      const formattedText = removeHtmlDangerousContent(slotContent).trim()?.replace(/\n/g, '<br/>');

      return typeof slotContent === 'string' ? formattedText : '';
    },
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
      return !this.isMedia && !this.isDocument;
    },
    isImage() {
      return this.isMedia && this.mediaType === 'image';
    },
    isVideo() {
      return this.isMedia && this.mediaType === 'video';
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

  & > * {
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
  &__document__text {
    margin: 0;

    padding: $unnnic-spacing-nano 0;

    color: $unnnic-color-neutral-dark;
    line-height: $defaultLineHeight;
    word-break: break-word;
  }

  &__time {
    font-size: $unnnic-font-size-body-md;
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

<template>
  <div
    class="contact"
    :class="{
      selected,
      disabled,
      'unread-messages': unreadMessages,
      waiting: waitingTime,
    }"
    @click="$emit('click')"
    @keypress.enter="$emit('click')"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @mousedown="isActived = true"
    @mouseup="isActived = false"
    :tabindex="0"
  >
    <user-avatar
      :username="username"
      :photo-url="userPhoto"
      :active="(isHovered || selected) && !isActived"
    />

    <div class="contact__infos">
      <h1
        class="contact__infos__username ellipsis"
        :title="username"
        :class="{ bold: unreadMessages }"
      >
        {{ username }}
      </h1>
      <div class="contact__infos__additional-information" :class="{ bold: unreadMessages }">
        <p v-if="waitingTime !== 0" class="ellipsis">
          {{ $tc('chats_contact.waiting_for', waitingTime) }}
        </p>
        <p
          v-else-if="lastMessage"
          class="ellipsis"
          :title="lastMessage"
        >
          {{ lastMessage }}
        </p>
      </div>
    </div>

    <span
      v-if="!selected && unreadMessages"
      class="contact__infos__unread-messages"
      :title="$t('chats_contact.unread_messages', { unreadMessages })"
    >
      {{ unreadMessages }}
    </span>
  </div>
</template>

<script>
import UserAvatar from '../ChatsUserAvatar/ChatsUserAvatar.vue';

export default {
  name: 'ChatsContact',

  components: {
    UserAvatar,
  },

  props: {
    username: {
      type: String,
      default: '',
      required: true,
    },
    lastMessage: {
      type: String,
      default: '',
    },
    userPhoto: {
      type: String,
      default: '',
    },
    waitingTime: {
      type: Number,
      default: 0,
    },
    unreadMessages: {
      type: Number,
      default: 0,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isHovered: false,
      isActived: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.contact {
  display: grid;
  grid-template-columns: max-content 1fr min-content;
  align-items: center;
  gap: 0.5rem;

  background-color: $unnnic-color-background-white;
  border-radius: $unnnic-border-radius-sm;
  font-family: $unnnic-font-family-secondary;

  padding: 0.5rem;

  cursor: pointer;

  &:focus-visible {
    outline-color: $unnnic-color-weni-600;
    outline-style: solid;
    outline-width: 1px;
  }

  * {
    margin: 0;
  }

  &.selected {
    background-color: $unnnic-color-weni-50;
  }

  &.waiting {
    background-color: $unnnic-color-neutral-lightest;

    &:hover {
      background-color: $unnnic-color-neutral-light;
    }

    .contact__infos__unread-messages {
      background: $unnnic-color-background-white;
    }
  }

  &.unread-messages {
    .username {
      color: $unnnic-color-neutral-darkest;
      font-weight: $unnnic-font-weight-bold;
    }

    .additional-information {
      color: $unnnic-color-neutral-cloudy;
      font-weight: $unnnic-font-weight-bold;
    }
  }

  &.disabled {
    .content {
      .username {
        color: $unnnic-color-neutral-cleanest;
      }

      .additional-information {
        color: $unnnic-color-neutral-lightest;
      }
    }

    .unread-messages {
      color: $unnnic-color-neutral-cleanest;
    }
  }

  &:hover,
  &.selected:hover {
    background-color: $unnnic-color-neutral-lightest;

    .contact__infos {
      &__unread-messages {
        background: $unnnic-color-background-white;
      }
    }
  }

  &:active,
  &.selected:active,
  &.waiting:active {
    background-color: $unnnic-color-weni-100;

    .contact__infos {
      &__unread-messages {
        background: $unnnic-color-background-white;
      }
    }
  }

  &__infos {
    margin-right: auto;

    display: flex;
    flex-flow: column wrap;

    width: 100%;
    overflow: hidden;

    &__username,
    &__additional-information {
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
    }

    &__username {
      color: $unnnic-color-neutral-darkest;
    }

    &__additional-information {
      width: 100%; // important to ellipsis work

      color: $unnnic-color-neutral-cloudy;
    }

    &__unread-messages {
      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 50%;
      background: $unnnic-color-background-grass;

      width: 1.25rem;
      min-width: 1.25rem;
      height: 1.25rem;

      font-size: $unnnic-font-size-body-md;
      font-weight: $unnnic-font-weight-bold;
      line-height: $unnnic-line-height-small;
      color: $unnnic-color-weni-800;
    }

    .ellipsis {
      width: 100%;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .bold {
      font-weight: $unnnic-font-weight-bold;
    }
  }
}
</style>

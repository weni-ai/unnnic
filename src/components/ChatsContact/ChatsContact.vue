<template>
  <div
    class="contact"
    ref="transitionContainer"
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
    @mousedown="
      (event) => {
        this.$refs.transitionRipple.addRipple(event);
      }
    "
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
          {{ i18n('waiting_for', waitingTime) }}
        </p>
        <p v-else-if="lastMessage" class="ellipsis" :title="lastMessage">
          {{ lastMessage }}
        </p>
      </div>
    </div>

    <span
      v-if="!selected && unreadMessages"
      class="contact__infos__unread-messages"
      :title="i18n('unread_messages', unreadMessages)"
    >
      {{ unreadMessages }}
    </span>
    <transition-ripple ref="transitionRipple" color="weni-500" />
  </div>
</template>

<script>
import UserAvatar from '../ChatsUserAvatar/ChatsUserAvatar.vue';
import TransitionRipple from '../TransitionRipple/TransitionRipple.vue';
import UnnnicI18n from '../../mixins/i18n';

export default {
  name: 'ChatsContact',

  mixins: [UnnnicI18n],

  components: {
    UserAvatar,
    TransitionRipple,
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

      defaultTranslations: {
        waiting_for: {
          'pt-br': 'Aguardando há 1 minuto | Aguardando há {n} minutos',
          en: '1 minute waiting | {time} minutes waiting',
          es: 'Esperando por un minuto | Esperando por {time} minutos',
        },
        unread_messages: {
          'pt-br': '{unreadMessages} mensagens não lidas',
          en: '{unreadMessages} unread messages',
          es: '{unreadMessages} mensajes no leídos',
        },
      },
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
  gap: $unnnic-spacing-xs;

  background-color: $unnnic-color-background-white;
  border-radius: $unnnic-border-radius-sm;
  font-family: $unnnic-font-family-secondary;

  padding: $unnnic-spacing-xs;

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

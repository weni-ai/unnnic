<template>
  <div
    class="chats-contact"
    ref="transitionContainer"
    :class="{
      selected,
      disabled,
      'unread-messages': unreadMessages,
      waiting: waitingTime && !discussionGoal,
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
    <div
      v-if="discussionGoal"
      class="chats-contact__discussion-icon"
    >
      <UnnnicIcon
        icon="forum"
        scheme="weni-50"
      />
    </div>
    <UserAvatar
      v-else
      :username="title"
      :photoUrl="userPhoto"
      :active="isHovered || selected"
    />

    <div class="chats-contact__infos">
      <h1
        class="chats-contact__infos__title ellipsis"
        :title="title"
        :class="{ bold: unreadMessages }"
      >
        {{ title }}
      </h1>
      <div
        class="chats-contact__infos__additional-information"
        :class="{ bold: unreadMessages || (checkboxWhenSelect && selected) }"
      >
        <p
          v-if="waitingTime !== 0 && !discussionGoal"
          class="ellipsis"
        >
          {{ i18n('waiting_for', waitingTime, { waitingTime }) }}
        </p>
        <p
          v-else-if="subtitle"
          class="ellipsis"
          :title="subtitle"
        >
          {{ subtitle }}
        </p>
      </div>
    </div>

    <span
      v-if="!selected && unreadMessages"
      class="chats-contact__infos__unread-messages"
      :title="i18n('unread_messages', unreadMessages, { unreadMessages })"
    >
      {{ unreadMessages }}
    </span>
    <Checkbox
      v-else-if="selected && checkboxWhenSelect"
      class="chats-contact__infos__checkbox"
      :modelValue="true"
    />
    <TransitionRipple
      ref="transitionRipple"
      color="weni-500"
    />
  </div>
</template>

<script>
import UserAvatar from '../ChatsUserAvatar/ChatsUserAvatar.vue';
import UnnnicIcon from '../Icon.vue';
import TransitionRipple from '../TransitionRipple/TransitionRipple.vue';
import UnnnicI18n from '../../mixins/i18n';
import Checkbox from '../Checkbox/Checkbox.vue';

export default {
  name: 'ChatsContact',

  mixins: [UnnnicI18n],

  components: {
    UserAvatar,
    UnnnicIcon,
    TransitionRipple,
    Checkbox,
  },

  props: {
    title: {
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
    checkboxWhenSelect: {
      type: Boolean,
      default: false,
    },
    discussionGoal: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      isHovered: false,

      defaultTranslations: {
        waiting_for: {
          'pt-br':
            'Aguardando há 1 minuto | Aguardando há {waitingTime} minutos',
          en: '1 minute waiting | {waitingTime} minutes waiting',
          es: 'Esperando por un minuto | Esperando por {waitingTime} minutos',
        },
        unread_messages: {
          'pt-br': '{unreadMessages} mensagens não lidas',
          en: '{unreadMessages} unread messages',
          es: '{unreadMessages} mensajes no leídos',
        },
        discussion_about: {
          'pt-br': 'Discussão sobre {discussionGoal}',
          en: 'Discussion about {discussionGoal}',
          es: 'Discusión sobre {discussionGoal}',
        },
      },
    };
  },

  computed: {
    subtitle() {
      const { discussionGoal, lastMessage } = this;
      return discussionGoal
        ? this.i18n('discussion_about', discussionGoal, { discussionGoal })
        : lastMessage;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.chats-contact {
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

    .chats-contact__infos__unread-messages {
      background: $unnnic-color-background-white;
    }
  }

  &.unread-messages {
    .title {
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
      .title {
        color: $unnnic-color-neutral-cleanest;
        font-weight: $unnnic-font-weight-bold;
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

    .chats-contact__infos {
      &__unread-messages {
        background: $unnnic-color-background-white;
      }
    }
  }

  &__discussion-icon {
    width: $unnnic-icon-size-xl;
    height: $unnnic-icon-size-xl;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $unnnic-border-radius-sm;

    background-color: $unnnic-color-aux-purple-500;
  }

  &__infos {
    margin-right: auto;

    display: flex;
    flex-flow: column wrap;

    width: 100%;
    overflow: hidden;

    &__title,
    &__additional-information {
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
    }

    &__title {
      font-weight: $unnnic-font-weight-bold;
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

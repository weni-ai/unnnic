<template>
  <div
    ref="transitionContainer"
    class="chats-contact"
    :class="{
      selected,
      disabled,
      'unread-messages': unreadMessages,
      waiting: waitingTime && !discussionGoal,
    }"
    :tabindex="0"
    @click.stop="$emit('click', $event)"
    @keypress.enter="$emit('click')"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @mousedown="
      (event) => {
        $refs.transitionRipple.addRipple(event);
      }
    "
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

    <section
      v-if="!checkboxWhenSelect"
      class="chats-contact__infos__unread-messages-container"
    >
      <p
        v-if="lastInteractionTime"
        :class="{
          'chats-contact__infos__message-time': true,
          'chats-contact__infos__message-time--active': unreadMessages,
        }"
      >
        {{ formattedLastInteraction }}
      </p>
      <p
        v-if="unreadMessages && !selected"
        class="chats-contact__infos__unread-messages"
        :title="i18n('unread_messages', unreadMessages, { unreadMessages })"
      >
        {{ unreadMessages }}
      </p>
    </section>

    <Checkbox
      v-else-if="selected && checkboxWhenSelect"
      class="chats-contact__infos__checkbox"
      :modelValue="true"
    />
    <TransitionRipple
      ref="transitionRipple"
      color="neutral-cleanest"
    />
  </div>
</template>

<script>
import UserAvatar from '../ChatsUserAvatar/ChatsUserAvatar.vue';
import UnnnicIcon from '../Icon.vue';
import TransitionRipple from '../TransitionRipple/TransitionRipple.vue';
import UnnnicI18n from '../../mixins/i18n';
import Checkbox from '../Checkbox/Checkbox.vue';

import('moment/dist/locale/es.js');
import('moment/dist/locale/pt-br.js');
import moment from 'moment';

export default {
  name: 'ChatsContact',

  components: {
    UserAvatar,
    UnnnicIcon,
    TransitionRipple,
    Checkbox,
  },

  mixins: [UnnnicI18n],

  props: {
    locale: {
      type: String,
      default: 'en',
    },
    title: {
      type: String,
      default: '',
      required: true,
    },
    lastMessage: {
      type: String,
      default: '',
    },
    lastInteractionTime: {
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

  emits: ['click'],

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
    messageInfoAlign() {
      return this.unreadMessages ? 'center' : 'flex-start';
    },
    messageInfoMarginTop() {
      return this.unreadMessages ? '0px' : '4px';
    },
    formattedLastInteraction() {
      if (!this.lastInteractionTime) return '';

      const yesterdayTranslationsMapper = {
        en: 'Yesterday',
        'pt-br': 'Ontem',
        ayer: 'Ayer',
      };

      moment.locale(this.locale);

      const now = moment();
      const lastInteractionMoment = moment(this.lastInteractionTime);

      if (now.subtract(1, 'day').isSame(lastInteractionMoment, 'day')) {
        return yesterdayTranslationsMapper[this.locale || 'en'];
      }

      if (now.diff(lastInteractionMoment, 'hours') > 0) {
        return lastInteractionMoment.format('L');
      }

      return lastInteractionMoment.format('HH:mm');
    },
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

  border: 1px solid $unnnic-color-neutral-soft;

  font-family: $unnnic-font-family-secondary;

  padding: $unnnic-spacing-xs;

  cursor: pointer;

  &:active {
    border: 1px solid $unnnic-color-neutral-cleanest;
  }

  &:focus-visible {
    outline-color: $unnnic-color-weni-600;
    outline-style: solid;
    outline-width: 1px;
  }

  * {
    margin: 0;
  }

  &.selected {
    background-color: $unnnic-color-neutral-light;
    border: 1px solid $unnnic-color-neutral-soft;
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
    gap: $unnnic-spacing-nano;

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

    &__unread-messages-container {
      height: 100%;
      min-width: max-content;
      display: flex;
      flex-direction: column;
      align-items: end;
      justify-content: v-bind(messageInfoAlign);
      gap: $unnnic-spacing-nano;
      margin-top: v-bind(messageInfoMarginTop);
    }

    &__message-time {
      color: $unnnic-color-neutral-dark;
      font-family: $unnnic-font-family-secondary;
      font-size: 10px;
      line-height: $unnnic-font-size-body-lg;

      &--active {
        color: $unnnic-color-weni-700;
        font-weight: $unnnic-font-weight-bold;
      }
    }

    &__unread-messages {
      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 50%;
      background: $unnnic-color-weni-50;

      width: 1.25rem;
      min-width: 1.25rem;
      height: 1.25rem;

      font-size: $unnnic-font-size-body-md;
      font-weight: $unnnic-font-weight-bold;
      line-height: $unnnic-line-height-small;
      color: $unnnic-color-weni-700;
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

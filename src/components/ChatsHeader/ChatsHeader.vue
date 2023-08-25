<template>
  <header class="unnnic-chats-header" :class="{ large: computed.showTopbar }">
    <div class="unnnic-chats-header__topbar" v-if="computed.showTopbar">
      <unnnic-breadcrumb :crumbs="crumbs" />
      <unnnic-button-close @close="close" size="ant" />
    </div>
    <main class="unnnic-chats-header__main">
      <unnnic-icon
        v-if="computed.showBackIcon"
        class="unnnic-chats-header__main__back"
        icon="keyboard-arrow-left-1"
        size="md"
      />
      <section class="unnnic-chats-header__infos">
        <unnnic-avatar-icon
          scheme="aux-purple"
          v-if="computed.showAvatarIcon"
          :icon="computed.avatarIcon"
          :size="computed.avatarIconSize"
        />
        <unnnic-chats-user-avatar v-else :username="title" />

        <hgroup
          class="unnnic-chats-header__infos__title"
          :class="{ contact: this.type === 'contact' }"
        >
          <h1>
            {{ computed.mainTitle }}
          </h1>
          <h2 v-if="computed.showSubtitle">
            {{ computed.showSubtitle }}
          </h2>
        </hgroup>

        <div></div>
      </section>
    </main>
    <unnnic-button-close v-if="computed.showSmallCloseButton" @close="close" size="sm" />
  </header>
</template>
<script>
import UnnnicI18n from '../../mixins/i18n';

import UnnnicButtonClose from '../ButtonClose/ButtonClose.vue';
import UnnnicAvatarIcon from '../AvatarIcon/AvatarIcon.vue';
import UnnnicChatsUserAvatar from '../ChatsUserAvatar/ChatsUserAvatar.vue';
import UnnnicBreadcrumb from '../Breadcrumb/Breadcrumb.vue';
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'ChatsHeader',

  mixins: [UnnnicI18n],

  components: {
    UnnnicButtonClose,
    UnnnicAvatarIcon,
    UnnnicChatsUserAvatar,
    UnnnicBreadcrumb,
    UnnnicIcon,
  },

  props: {
    type: {
      type: String,
      required: true,
      default: 'contact',
      validator(value) {
        return ['contact', 'dashboard', 'history'].includes(value);
      },
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    back: {
      type: Function,
      default: null,
    },
    close: {
      type: Function,
      default: () => {},
    },
    crumbs: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    size: 'small',

    defaultTranslations: {
      history: {
        'pt-br': 'Histórico',
        en: 'History',
        es: 'Historia',
      },
      history_of_project: {
        'pt-br': 'Histórico do projeto',
        en: 'Project history',
        es: 'Historia del proyecto',
      },
      dashboard_of_project: {
        'pt-br': 'Dashboard do projeto',
        en: 'Dashboard of the project',
        es: 'Dashboard del proyecto',
      },
    },
  }),

  beforeMount() {
    this.updateSize();
    window.addEventListener('resize', this.updateSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateSize);
  },

  methods: {
    updateSize() {
      const PHONE_SIZE = 600;
      if (window.innerWidth < PHONE_SIZE) {
        this.size = 'small';
      } else {
        this.size = 'large';
      }
    },
  },

  computed: {
    computed() {
      const { size, back, title } = this;

      const typeMap = {
        dashboard: {
          showTopbar: size === 'large',
          showBackIcon: back && size === 'small',
          showAvatarIcon: true,
          avatarIcon: 'graph-stats-1',
          avatarIconSize: size === 'small' ? 'sm' : 'lg',
          mainTitle: size === 'small' ? 'Dashboard' : title,
          showSubtitle: size === 'small' ? title : this.i18n('dashboard_of_project'),
          showSmallCloseButton: size === 'small',
        },
        history: {
          showTopbar: size === 'large',
          showBackIcon: back && size === 'small',
          showAvatarIcon: true,
          avatarIcon: 'task-list-clock-1',
          avatarIconSize: size === 'small' ? 'sm' : 'lg',
          mainTitle: size === 'small' ? this.i18n('history') : title,
          showSubtitle: size === 'small' ? title : this.i18n('history_of_project'),
          showSmallCloseButton: size === 'small',
        },
        contact: {
          showTopbar: false,
          showBackIcon: back && size === 'small',
          showAvatarIcon: false,
          mainTitle: title,
          showSubtitle: false,
          showSmallCloseButton: true,
        },
      };

      return typeMap[this.type] || {};
    },
  },
};
</script>
<style lang="scss">
@import '../../assets/scss/unnnic.scss';
.unnnic-chats-header {
  padding: $unnnic-spacing-sm;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-shadow: $unnnic-shadow-level-far;
  background-color: $unnnic-color-background-white;

  font-family: $unnnic-font-family-secondary;

  &.large {
    padding: $unnnic-spacing-md;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: $unnnic-spacing-md;

    box-shadow: none;
    box-shadow: inset 0 -1px 0 $unnnic-color-neutral-soft;

    .unnnic-chats-header__infos__title {
      h1 {
        font-size: $unnnic-font-size-title-md;
        line-height: $unnnic-font-size-body-lg + $unnnic-line-height-medium;
        font-weight: $unnnic-font-weight-regular;
      }

      h2 {
        font-size: $unnnic-font-size-body-gt;
        line-height: $unnnic-font-size-body-lg + $unnnic-line-height-small;
      }
    }
  }

  &__topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__main {
    display: flex;
    align-items: center;

    &__back {
      margin-right: $unnnic-spacing-md;

      cursor: pointer;
    }
  }

  &__infos {
    display: flex;
    gap: $unnnic-spacing-ant;

    color: $unnnic-color-neutral-dark;

    user-select: none;

    * {
      margin: 0;
    }

    .unnnic-avatar-icon {
      height: fit-content;
    }

    &__title {
      display: grid;
      align-items: center;

      &.contact h1 {
        font-weight: $unnnic-font-weight-regular;
      }

      h1,
      h2 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      h1 {
        font-size: $unnnic-font-size-body-lg;
        line-height: $unnnic-font-size-body-lg + $unnnic-line-height-medium;
        font-weight: $unnnic-font-weight-bold;
      }

      h2 {
        font-size: $unnnic-font-size-body-md;
        line-height: $unnnic-font-size-body-lg;
        font-weight: $unnnic-font-weight-regular;
      }
    }
  }
}
</style>

<template>
  <header class="unnnic-chats-header" :class="{ large: size === 'large' && !avatarName }">
    <div class="unnnic-chats-header__topbar" v-if="size === 'large' && !avatarName">
      <unnnic-breadcrumb :crumbs="crumbs" />
      <unnnic-button-close @close="close" size="ant" />
    </div>
    <main class="unnnic-chats-header__main">
      <div v-if="back && size === 'small'" @click="back" @keypress.esc="back">
        <unnnic-icon
          class="unnnic-chats-header__main__back"
          icon="keyboard-arrow-left-1"
          size="md"
        />
      </div>
      <section class="unnnic-chats-header__infos">
        <unnnic-chats-user-avatar v-if="avatarName" :username="avatarName" />
        <unnnic-avatar-icon
          v-else
          scheme="aux-purple"
          :icon="avatarIcon"
          :size="size === 'small' ? 'sm' : 'lg'"
        />

        <hgroup class="unnnic-chats-header__infos__title" :class="{ contact: !!avatarName }">
          <h1>
            {{ title }}
          </h1>
          <h2 v-if="subtitle">
            {{ subtitle }}
          </h2>
        </hgroup>
      </section>
      <slot v-if="size === 'large'"/>
    </main>
    <unnnic-button-close v-if="avatarName || size === 'small'" @close="close" size="sm" />
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
  name: 'UnnnicChatsHeader',

  mixins: [UnnnicI18n],

  components: {
    UnnnicButtonClose,
    UnnnicAvatarIcon,
    UnnnicChatsUserAvatar,
    UnnnicBreadcrumb,
    UnnnicIcon,
  },

  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    avatarIcon: {
      type: String,
      default: '',
    },
    avatarName: {
      type: String,
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

  watch: {
    size(newSize) {
      this.$emit('resize', newSize);
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
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto;
    gap: $unnnic-spacing-xs;

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

<template>
  <div
    class="unnnic-chats-header__container"
    :class="[size]"
  >
    <header
      class="unnnic-chats-header"
      :class="{ contact: !!avatarName }"
    >
      <div
        v-if="!avatarName"
        class="unnnic-chats-header__topbar"
      >
        <UnnnicBreadcrumb
          :crumbs="crumbs"
          @crumb-click="(crumb) => $emit('crumbClick', crumb)"
        />
        <UnnnicButton
          v-if="close"
          type="tertiary"
          iconCenter="close-1"
          size="small"
          @click="close"
        />
      </div>
      <main class="unnnic-chats-header__main">
        <UnnnicButton
          v-if="back"
          class="unnnic-chats-header__main__back"
          type="tertiary"
          size="small"
          iconCenter="keyboard-arrow-left-1"
          @click="back"
        />
        <section class="unnnic-chats-header__infos">
          <UnnnicChatsUserAvatar
            v-if="avatarName"
            :clickable="!!avatarClick"
            :username="avatarName"
            @click="avatarClick ? avatarClick() : () => {}"
          />
          <div
            v-else
            :class="{ clickable: !!avatarClick }"
            @click="avatarClick ? avatarClick() : () => {}"
          >
            <UnnnicAvatarIcon
              :scheme="sectionIconScheme"
              class="unnnic-chats-header__avatar-icon"
              size="sm"
              :icon="avatarIcon"
            />
          </div>

          <hgroup class="unnnic-chats-header__infos__title">
            <h1
              :class="{ clickable: !!titleClick }"
              @click="titleClick ? titleClick() : () => {}"
            >
              {{ title }}
            </h1>
            <h2 v-if="subtitle">
              {{ subtitle }}
            </h2>
          </hgroup>
        </section>
        <div class="unnnic-chats-header__slot">
          <slot />
        </div>
      </main>
      <UnnnicButton
        v-if="close"
        class="unnnic-chats-header__close--sm"
        type="tertiary"
        iconCenter="close-1"
        size="small"
        @click="close"
      />
    </header>
  </div>
</template>
<script>
import UnnnicI18n from '../../mixins/i18n';

import UnnnicButton from '../Button/Button.vue';
import UnnnicAvatarIcon from '../AvatarIcon/AvatarIcon.vue';
import UnnnicChatsUserAvatar from '../ChatsUserAvatar/ChatsUserAvatar.vue';
import UnnnicBreadcrumb from '../Breadcrumb/Breadcrumb.vue';

export default {
  name: 'UnnnicChatsHeader',

  components: {
    UnnnicButton,
    UnnnicAvatarIcon,
    UnnnicChatsUserAvatar,
    UnnnicBreadcrumb,
  },

  mixins: [UnnnicI18n],

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
    sectionIconScheme: {
      type: String,
      default: 'aux-purple',
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
      required: false,
    },
    close: {
      type: Function,
      required: false,
    },
    avatarClick: {
      type: Function,
      required: false,
    },
    titleClick: {
      type: Function,
      required: false,
    },
    crumbs: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: 'auto',
      validator(size) {
        return ['auto', 'small', 'large'].includes(size);
      },
    },
  },
};
</script>
<style lang="scss">
@use '@/assets/scss/unnnic' as *;
.unnnic-chats-header {
  padding: $unnnic-spacing-sm;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-shadow:
    inset 0 -1px 0 $unnnic-color-neutral-light,
    $unnnic-shadow-level-far;
  background-color: $unnnic-color-background-white;

  font-family: $unnnic-font-family-secondary;

  &__topbar {
    display: none;
  }

  &__close--sm {
    display: initial;
  }

  &__slot {
    display: none;
  }

  &.contact {
    gap: $unnnic-spacing-nano;
  }

  &__main {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto;
    gap: $unnnic-spacing-nano;

    &__back {
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
        font-size: $unnnic-font-size-body-gt;
        line-height: $unnnic-font-size-body-lg;
        font-weight: $unnnic-font-weight-regular;
      }
    }
  }

  .clickable {
    cursor: pointer;
  }
}

.unnnic-chats-header__container {
  @mixin header-large-styles {
    .unnnic-chats-header {
      &:not(.contact) {
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

        .unnnic-chats-header__avatar-icon .unnnic-icon {
          width: $unnnic-icon-size-lg;
          height: $unnnic-icon-size-lg;
        }

        .unnnic-chats-header__slot {
          display: initial;
        }
      }

      &__close--sm {
        display: none;
      }

      &.contact {
        box-shadow: $unnnic-shadow-level-far;

        .unnnic-chats-header__close--sm {
          display: initial;
        }
      }

      &__main__back {
        display: none;
      }

      &__topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .unnnic-breadcrumb__container__link {
          font-size: $unnnic-font-size-body-gt;
        }
      }
    }
  }

  &.large {
    @include header-large-styles;
  }

  &.auto {
    container-type: inline-size;

    @container (min-width: 600px) {
      @include header-large-styles;
    }
  }
}
</style>

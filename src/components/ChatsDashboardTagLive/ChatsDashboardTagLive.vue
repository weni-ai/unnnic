<template>
  <div class="unnnic-chats-dashboard-tag-live">
    <UnnnicIcon
      class="unnnic-chats-dashboard-tag-live__indicator"
      icon="indicator"
      scheme="aux-green-300"
    />
    <p class="unnnic-chats-dashboard-tag-live__text">{{ i18n('live') }}</p>
  </div>
</template>

<script>
import UnnnicI18n from '../../mixins/i18n';

import UnnnicIcon from '../Icon.vue';

export default {
  name: 'UnnnicChatsDashboardTagLive',

  components: {
    UnnnicIcon,
  },

  mixins: [UnnnicI18n],

  data() {
    return {
      defaultTranslations: {
        live: {
          'pt-br': 'Ao vivo',
          en: 'Live',
          es: 'En vivo',
        },
      },
    };
  },
};
</script>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;

.unnnic-chats-dashboard-tag-live {
  padding: $unnnic-spacing-ant;

  display: inline-flex;
  align-items: center;
  gap: $unnnic-spacing-ant;

  border-radius: $unnnic-border-radius-sm;
  background-color: $unnnic-color-neutral-lightest;

  color: $unnnic-color-neutral-dark;
  font-family: $unnnic-font-family-secondary;

  &__indicator {
    .primary {
      animation: ease-in-out pulse 2s infinite;
    }

    @keyframes pulse {
      0% {
        fill: $unnnic-color-neutral-soft;
      }

      50% {
        fill: $unnnic-color-aux-green-300;
      }

      100% {
        fill: $unnnic-color-neutral-soft;
      }
    }
  }

  &__text {
    margin: 0;

    font-size: $unnnic-font-size-body-gt;
  }
}
</style>

<template>
  <nav class="unnnic-chats-navbar">
    <ol class="unnnic-chats-navbar__list">
      <li v-for="(link, index) in links" :key="link.icon + index">
        <a
          :class="[
            'unnnic-chats-navbar__link',
            'unnnic--clickable',
            { selected: isSelected(link) },
          ]"
          @click="
            () => {
              selectLink(link);
              link.action();
            }
          "
        >
          <unnnic-icon
            :icon="getLinkIcon(link)"
            size="lg"
            scheme="neutral-snow"
            :filled="isSelected(link)"
          />
        </a>
      </li>
    </ol>
  </nav>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'unnnic-chats-navbar',

  components: {
    UnnnicIcon,
  },

  props: {
    links: {
      type: Array,
      required: true,
      default: () => [
        {
          name: '',
          icon: {
            default: '',
            selected: '',
          },
          action: () => {},
        },
      ],
      validator(value) {
        if (value.length === 0) {
          return false;
        }

        function isValidLink(link) {
          const hasValidName = typeof link.name === 'string';
          const hasValidIcon =
            typeof link.icon === 'string' || typeof link.icon.default === 'string';
          const hasValidAction = typeof link.action === 'function';

          return hasValidName && hasValidIcon && hasValidAction;
        }

        return value.every(isValidLink);
      },
    },

    initialLink: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      selectedLink: null,
    };
  },

  methods: {
    selectLink(link) {
      this.selectedLink = link;
    },

    isSelected(link) {
      return this.selectedLink === link;
    },

    getLinkIcon(link) {
      const { icon } = link;
      return typeof icon === 'string' ? icon : this.isSelected(link) ? icon.selected : icon.default;
    },
  },

  mounted() {
    if (this.initialLink) {
      const initialLinkToSelect = this.links.find((link) => link.name === this.initialLink);

      this.selectLink(initialLinkToSelect);
    }
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnnic.scss';

.unnnic-chats-navbar {
  width: 100vw;
  max-width: 100%;

  padding: $unnnic-spacing-xs $unnnic-spacing-sm;
  box-sizing: border-box;

  background-color: $unnnic-color-weni-600;

  &__list {
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: $unnnic-spacing-sm;

    width: 100%;
    height: 100%;

    padding: 0;
    margin: 0;

    list-style: none;

    li {
      flex: 1;
    }
  }

  &__link {
    display: flex;
    border-radius: $unnnic-border-radius-sm;
    padding: $unnnic-spacing-xs 0;

    place-content: center;

    margin: 0 auto;

    &.selected {
      background-color: $unnnic-color-weni-700;
    }
  }
}
</style>

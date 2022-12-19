<template>
  <div class="unnnic-card-company">
    <div class="content">
      <div class="header">
        <div class="title">
          {{ title }}
        </div>

        <div v-if="tag" class="tag">{{ tag }}</div>
      </div>

      <div class="description">{{ description }}</div>

      <div class="members">
        <div class="avatars">
          <tool-tip
            v-for="(member, index) in membersLimited"
            :key="index"
            class="avatar-container"
            side="top"
            :text="member.name"
            enabled
          >
            <div class="avatar__background">
              <div class="avatar" :style="{ backgroundImage: `url(${member.photo})` }" />
            </div>
          </tool-tip>
        </div>

        <div class="members-description">{{ membersDescription }}</div>
      </div>
    </div>
    <div class="join-button">
      <unnnic-tag @click="join" :text="joinLabel" scheme="aux-blue" clickable></unnnic-tag>
    </div>
    <div class="more-button" v-if="options.length">
      <unnnic-dropdown>
        <unnnic-icon
          slot="trigger"
          icon="navigation-menu-vertical-1"
          scheme="neutral-cleanest"
          size="sm"
          clickable
        />

        <unnnic-dropdown-item
          v-for="(option, index) in options"
          :key="index"
          @click="
            () => {
              if (option.click) {
                option.click();
              }
            }
          "
        >
          <div :class="['menu-item', { [option.scheme]: option.scheme }]">
            <unnnic-icon
              class="icon"
              size="sm"
              :icon="option.icon"
              :scheme="option.scheme ? option.scheme : 'neutral-dark'"
            />

            {{ option.title }}
          </div>
        </unnnic-dropdown-item>
      </unnnic-dropdown>
    </div>
  </div>
</template>

<script>
import UnnnicTag from '../Tag/Tag.vue';
import UnnnicIcon from '../Icon.vue';
import UnnnicDropdown from '../Dropdown/Dropdown.vue';
import UnnnicDropdownItem from '../Dropdown/DropdownItem.vue';
import ToolTip from '../ToolTip/ToolTip.vue';

export default {
  components: {
    UnnnicTag,
    UnnnicIcon,
    UnnnicDropdown,
    UnnnicDropdownItem,
    ToolTip,
  },

  props: {
    title: {
      type: String,
    },

    tag: {
      type: String,
    },

    description: {
      type: String,
    },

    joinLabel: {
      type: String,
    },

    options: {
      type: Array,
      default() {
        return [];
      },
    },

    members: {
      type: Array,
      default() {
        return [];
      },
    },

    membersDescription: {
      type: String,
    },
  },

  data() {
    return {};
  },

  methods: {
    join() {
      this.$emit('join');
    },
  },

  computed: {
    membersLimited() {
      return this.members.slice(0, 3);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.unnnic-card-company {
  background-color: $unnnic-color-background-sky;
  border-radius: $unnnic-border-radius-md;
  padding: $unnnic-spacing-inset-md;
  min-width: 18.5rem;
  border: $unnnic-border-width-thin solid transparent;
  display: flex;
  align-items: center;

  &:hover {
    border: $unnnic-border-width-thin solid $unnnic-color-neutral-soft;
  }

  .content {
    flex: 1;

    .header {
      display: flex;
      align-items: center;
      margin-bottom: $unnnic-spacing-stack-nano;

      .title {
        font-family: $unnnic-font-family-secondary;
        font-size: $unnnic-font-size-title-md;
        font-weight: $unnnic-font-weight-bold;
        line-height: $unnnic-font-size-title-md + $unnnic-line-height-md;
        color: $unnnic-color-neutral-black;

      }

      .tag {
        margin-left: $unnnic-spacing-inline-ant;
        padding: $unnnic-spacing-stack-nano $unnnic-spacing-inline-ant;
        outline-style: solid;
        outline-color: $unnnic-color-neutral-dark;
        outline-width: $unnnic-border-width-thinner;
        outline-offset: -$unnnic-border-width-thinner;
        border-radius: $unnnic-border-radius-sm;
        user-select: none;

        font-family: $unnnic-font-family-secondary;
        font-size: $unnnic-font-size-body-md;
        line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
        font-weight: $unnnic-font-weight-regular;
        color: $unnnic-color-neutral-dark;
      }
    }

    .description {
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-lg;
      font-weight: $unnnic-font-weight-regular;
      line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
      color: $unnnic-color-neutral-dark;
      margin-bottom: $unnnic-spacing-stack-md;
    }

    .members {
      display: flex;
      align-items: center;

      .avatars {
        .avatar-container {
          border-radius: 50%;

          &:not(:first-child) {
            margin-left: -0.875rem;
          }
        }

        .avatar__background {
          border-radius: 50%;
          background: $unnnic-color-neutral-clean;
        }

        .avatar {
          width: $unnnic-avatar-size-sm;
          height: $unnnic-avatar-size-sm;
          border-radius: 50%;
          border: $unnnic-border-width-thin solid $unnnic-color-neutral-black;
          background-size: cover;
          background-position: center center;
        }
      }

      .members-description {
        font-family: $unnnic-font-family-secondary;
        font-size: $unnnic-font-size-body-gt;
        font-weight: $unnnic-font-weight-regular;
        line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
        color: $unnnic-color-neutral-darkest;
        margin-left: $unnnic-spacing-inline-nano;
      }
    }
  }

  .join-button {
    margin-left: $unnnic-spacing-inline-xs;
    padding: $unnnic-spacing-inset-nano;
  }

  .more-button {
    margin-left: $unnnic-spacing-inline-nano;

    .menu-item {
      display: flex;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;

      .icon {
        margin-right: $unnnic-inline-xs;
      }

      &.feedback-red {
        color: $unnnic-color-feedback-red;
      }
    }
  }
}
</style>

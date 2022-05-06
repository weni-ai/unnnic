<template>
  <div class="unnnic-card-project">
    <div class="header">
      <div class="title">
        <span class="name" :title="name.length > 25 ? name : null">
          {{ name }}
        </span>
      </div>

      <div class="buttons">
        <unnnic-tag
          class="action"
          @click.native="$emit('action')"
          clickable
          :text="actionText"
          scheme="aux-blue"
        />

        <unnnic-dropdown v-if="$slots.actions" position="bottom-left">
          <unnnic-icon
            slot="trigger"
            size="sm"
            icon="navigation-menu-vertical-1"
            clickable
            scheme="neutral-cleanest"
          />

          <slot name="actions" />
        </unnnic-dropdown>
      </div>
    </div>

    <div class="separator" />

    <div class="statuses">
      <div class="status" v-for="(status, index) in statuses" :key="index">
        <div class="title">{{ status.title }}</div>

        <div class="content">
          <unnnic-avatar-icon :icon="status.icon" :scheme="status.scheme" size="xs" />

          <div class="number">
            {{ status.count }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import unnnicIcon from '../Icon-svg.vue';
import unnnicDropdown from '../Dropdown/Dropdown.vue';
import unnnicTag from '../Tag/Tag.vue';
import unnnicAvatarIcon from '../AvatarIcon/AvatarIcon.vue';

export default {
  components: {
    unnnicIcon,
    unnnicDropdown,
    unnnicTag,
    unnnicAvatarIcon,
  },

  props: {
    name: {
      type: String,
      default: '',
    },

    statuses: {
      type: Array,
    },

    actionText: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.unnnic-card-project {
  padding: $unnnic-inset-sm;
  border: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
  border-radius: $unnnic-border-radius-md;

  .separator {
    height: $unnnic-border-width-thinner;
    background-color: $unnnic-color-neutral-lightest;
    margin: $unnnic-spacing-stack-xs 0;
  }

  &--highlighted {
    color: $unnnic-color-brand-weni;
    font-weight: $unnnic-font-weight-bold;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: calc(100% - 5rem);
      margin-right: $unnnic-spacing-inline-xs;

      .name {
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-bold;
        font-size: $unnnic-font-size-body-lg;
        line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
        color: $unnnic-color-neutral-darkest;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
      }
    }

    .buttons {
      display: flex;
      align-items: center;

      .action {
        margin: $unnnic-spacing-inset-nano;
      }
    }
  }

  .statuses {
    display: flex;
    justify-content: space-between;
    gap: $unnnic-spacing-inline-xs;

    .status {
      flex: 1;

      .title {
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-regular;
        font-size: $unnnic-font-size-body-gt;
        line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
        color: $unnnic-color-neutral-dark;
      }

      .content {
        margin-top: $unnnic-spacing-stack-nano;
        display: flex;
        align-items: center;

        .number {
          margin-left: $unnnic-spacing-inline-xs;
          font-family: $unnnic-font-family-secondary;
          font-weight: $unnnic-font-weight-black;
          font-size: $unnnic-font-size-body-gt;
          line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
          color: $unnnic-color-neutral-darkest;
        }
      }
    }
  }
}
</style>

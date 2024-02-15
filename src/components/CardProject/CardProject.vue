<template>
  <card-statuses-container class="unnnic-card-project" :name="name" :statuses="statuses">
    <div v-if="actionText" slot="header-buttons" class="buttons">
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
  </card-statuses-container>
</template>

<script>
import CardStatusesContainer from '../Card/CardStatusesContainer.vue';
import unnnicIcon from '../Icon.vue';
import unnnicDropdown from '../Dropdown/Dropdown.vue';
import unnnicTag from '../Tag/Tag.vue';

export default {
  components: {
    CardStatusesContainer,
    unnnicIcon,
    unnnicDropdown,
    unnnicTag,
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
  .header {
    .buttons {
      display: flex;
      align-items: center;

      .action {
        margin: $unnnic-spacing-inset-nano;
      }
    }
  }
}
</style>

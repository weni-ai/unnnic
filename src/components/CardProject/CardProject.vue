<template>
  <CardStatusesContainer
    class="unnnic-card-project"
    :name="name"
    :statuses="statuses"
  >
    <template v-slot:header-buttons>
      <div class="buttons">
        <UnnnicTag
          class="action"
          @click="$emit('action')"
          clickable
          :text="actionText"
          scheme="aux-blue"
        />

        <UnnnicDropdown
          v-if="$slots.actions"
          position="bottom-left"
        >
          <template v-slot:trigger>
            <UnnnicIcon
              size="sm"
              icon="navigation-menu-vertical-1"
              clickable
              scheme="neutral-cleanest"
            />
          </template>

          <slot name="actions" />
        </UnnnicDropdown>
      </div>
    </template>
  </CardStatusesContainer>
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
@import '../../assets/scss/unnnic.scss';

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

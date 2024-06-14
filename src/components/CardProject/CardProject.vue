<template>
  <CardStatusesContainer
    class="unnnic-card-project"
    :name="name"
    :statuses="statuses"
  >
    <template #header-buttons>
      <div class="buttons">
        <UnnnicTag
          class="action"
          clickable
          :text="actionText"
          scheme="aux-blue"
          @click="$emit('action')"
        />

        <UnnnicDropdown
          v-if="$slots.actions"
          position="bottom-left"
        >
          <template #trigger>
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
import UnnnicIcon from '../Icon.vue';
import UnnnicDropdown from '../Dropdown/Dropdown.vue';
import UnnnicTag from '../Tag/Tag.vue';

export default {
  components: {
    CardStatusesContainer,
    UnnnicIcon,
    UnnnicDropdown,
    UnnnicTag,
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

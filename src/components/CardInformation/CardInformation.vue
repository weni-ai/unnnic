<template>
  <card-statuses-container
    class="unnnic-card-information"
    :name="name"
    :subtitle="subtitle"
    :description="description"
    :description-row="descriptionRow"
    :description-row-info="descriptionRowInfo"
    :statuses="statuses"
    min-status-width="8.75rem"
  >
  </card-statuses-container>
</template>

<script>
import CardStatusesContainer from '../Card/CardStatusesContainer.vue';

export default {
  components: {
    CardStatusesContainer,
  },

  props: {
    name: {
      type: String,
      default: '',
    },

    subtitle: {
      type: String,
      default: '',
    },

    description: {
      type: String,
      default: '',
    },

    descriptionRow: {
      type: String,
      default: '',
    },

    descriptionRowInfo: {
      type: String,
      default: '',
    },

    statuses: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";
</style>

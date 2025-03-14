<template>
  <CardStatusesContainer
    class="unnnic-card-information"
    :name="name"
    :subtitle="subtitle"
    :description="description"
    :descriptionRow="descriptionRow"
    :descriptionRowInfo="descriptionRowInfo"
    :statuses="statuses"
    :minStatusWidth="8.75 * unnnicFontSize + 'px'"
  >
  </CardStatusesContainer>
</template>

<script>
import CardStatusesContainer from '../Card/CardStatusesContainer.vue';
import { unnnicFontSize } from '../config';

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

  data() {
    return {
      unnnicFontSize,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
</style>

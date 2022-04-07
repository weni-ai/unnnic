<template>
  <div class="card">
    <div class="header">
      <div class="title">{{ title }}</div>

      <div v-if="checked" class="check">
        <unnnic-icon
          size="md"
          icon="check-circle-1-1-1"
          scheme="feedback-green"
        />
      </div>
    </div>

    <div class="description">{{ description }}</div>

    <div v-if="score || info" class="footer">
      <div class="evaluation">
        <unnnic-icon
          v-if="score"
          size="sm"
          icon="rating-star-1"
          scheme="feedback-yellow"
        />

        {{ score }}

        <span class="info">{{ info }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import unnnicIcon from '../Icon-svg.vue';

export default {
  components: { unnnicIcon },

  props: {
    title: {
      type: String,
    },

    description: {
      type: String,
    },

    score: {
      type: String,
    },

    info: {
      type: String,
    },

    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.card {
  background-color: $unnnic-color-background-snow;
  padding: $unnnic-spacing-inset-sm - $unnnic-border-width-thinner;
  border: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
  border-radius: $unnnic-border-radius-md;

  .header {
    margin-bottom: $unnnic-spacing-stack-nano;
    display: flex;

    .title {
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-bold;
      font-size: $unnnic-font-size-body-lg;
      line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
      color: $unnnic-color-neutral-darkest;
      flex: 1;
    }

    .check {
      margin-left: $unnnic-spacing-inline-xs;
    }
  }

  .description {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-lg;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
    color: $unnnic-color-neutral-cloudy;
  }

  .footer {
    margin-top: $unnnic-spacing-stack-nano;

    .evaluation {
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-bold;
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
      color: $unnnic-color-neutral-darkest;

      .info {
        font-weight: $unnnic-font-weight-regular;
        color: $unnnic-color-neutral-cloudy;
      }
    }
  }

  transition: box-shadow .2s;
  cursor: pointer;
  &:hover{
    box-shadow: $unnnic-shadow-level-near;
  }
}
</style>

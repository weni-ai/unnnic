<template>
    <component
      class="unnic-card-content"
      :is="currentComponent"
      :v-bind="$attrs"
      :title="title"
      :info="info"
      :icon="currentTypeIcon"
      :value="value"
      :percent="percent"
      :status="status"
      :description="description"
      :info-position="infoPosition"
      :enabled="enabled"
      :scheme="scheme"
    />
</template>

<script>
import UICon from '../Icon.vue';
import DashCard from './DashCard.vue';
import TitleCard from './TitleCard.vue';
import StatusCard from './StatusCard.vue';
import AccountCard from './AccountCard.vue';

export default {
  name: 'unnic-card',
  components: { UICon },
  props: {
    type: {
      type: String,
      default: 'title',
      validator(value) {
        return (
          ['title', 'status', 'dash', 'account'].indexOf(value) !== -1
        );
      },
    },
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
    info: {
      type: String,
      default: null,
    },
    value: {
      type: Number,
      default: null,
    },
    percent: {
      type: Number,
      default: 0,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: null,
    },
    infoPosition: {
      type: String,
      default: 'right',
    },
    scheme: {
      type: String,
      default: 'aux-blue',
      validator(value) {
        return ['feedback-red', 'feedback-green', 'feedback-yellow', 'feedback-blue', 'feedback-grey',
          'aux-blue', 'aux-purple', 'aux-orange', 'aux-lemon', 'aux-pink'].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    currentTypeIcon() {
      if (this.icon) return this.icon;
      if (this.type === 'title') return 'graph-stats-1';
      if (this.type === 'dash') return 'messages-bubble-1';
      if (this.type === 'status') return 'science-fiction-robot-2';
      if (this.type === 'account') return 'single-neutral-2';
      return null;
    },
    currentComponent() {
      if (this.type === 'title') return TitleCard;
      if (this.type === 'dash') return DashCard;
      if (this.type === 'status') return StatusCard;
      if (this.type === 'account') return AccountCard;
      return TitleCard;
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnic.scss';

$scheme-colors:
  'feedback-red' $unnic-color-feedback-red,
  'feedback-green' $unnic-color-feedback-green,
  'feedback-yellow' $unnic-color-feedback-yellow,
  'feedback-blue' $unnic-color-feedback-blue,
  'feedback-grey' $unnic-color-feedback-grey,
   'aux-blue' $unnic-color-aux-blue,
   'aux-purple' $unnic-color-aux-purple,
   'aux-orange' $unnic-color-aux-orange,
   'aux-lemon' $unnic-color-aux-lemon,
   'aux-pink' $unnic-color-aux-pink;

@each $name, $color in $scheme-colors {
  .unnic-card-scheme {
    &--#{$name} {
      background-color: rgba($color, $unnic-opacity-level-light);
      color: $color;
      &--icon {
        color: $color;
      }
      &--border {
        border-left: 4px solid $color;
      }
    }
  }
}
</style>

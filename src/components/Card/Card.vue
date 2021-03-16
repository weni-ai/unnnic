<template>
    <component
      class="unnnic-card-content"
      :is="currentComponent"
      :v-bind="$attrs"
      :title="title"
      :text="text"
      :info="info"
      :icon="currentTypeIcon"
      :value="value"
      :percent="percent"
      :status="status"
      :description="description"
      :info-position="infoPosition"
      :enabled="enabled"
      :scheme="scheme"
      :clickable="clickable"
    />
</template>

<script>
import UICon from '../Icon.vue';
import DashCard from './DashCard.vue';
import TitleCard from './TitleCard.vue';
import StatusCard from './StatusCard.vue';
import AccountCard from './AccountCard.vue';
import DefaultCard from './DefaultCard.vue';
import BlankCard from './BlankCard.vue';

export default {
  name: 'unnnic-card',
  components: { UICon },
  props: {
    type: {
      type: String,
      default: 'title',
      validator(value) {
        return (
          ['title', 'status', 'dash', 'account', 'default', 'blank'].indexOf(value) !== -1
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
    text: {
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
    clickable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentTypeIcon() {
      if (this.icon) return this.icon;
      if (this.type === 'title') return 'graph-stats-1';
      if (this.type === 'dash') return 'messages-bubble-1';
      if (this.type === 'status') return 'science-fiction-robot-2';
      if (this.type === 'account') return 'single-neutral-2';
      // if (this.type === 'blank') return 'add-1';
      return null;
    },
    currentComponent() {
      if (this.type === 'title') return TitleCard;
      if (this.type === 'dash') return DashCard;
      if (this.type === 'status') return StatusCard;
      if (this.type === 'account') return AccountCard;
      if (this.type === 'default') return DefaultCard;
      if (this.type === 'blank') return BlankCard;
      return TitleCard;
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnnic.scss';

$scheme-colors:
  'feedback-red' $unnnic-color-feedback-red,
  'feedback-green' $unnnic-color-feedback-green,
  'feedback-yellow' $unnnic-color-feedback-yellow,
  'feedback-blue' $unnnic-color-feedback-blue,
  'feedback-grey' $unnnic-color-feedback-grey,
   'aux-blue' $unnnic-color-aux-blue,
   'aux-purple' $unnnic-color-aux-purple,
   'aux-orange' $unnnic-color-aux-orange,
   'aux-lemon' $unnnic-color-aux-lemon,
   'aux-pink' $unnnic-color-aux-pink;

@each $name, $color in $scheme-colors {
  .unnnic-card-scheme {
    &--#{$name} {
      background-color: rgba($color, $unnnic-opacity-level-lighter);
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

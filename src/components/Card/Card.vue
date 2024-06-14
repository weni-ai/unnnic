<template>
  <component
    :is="currentComponent"
    class="unnnic-card-component"
    v-bind="$attrs"
    :title="title"
    :text="text"
    :info="info"
    :icon="currentTypeIcon"
    :iconSrc="iconSrc"
    :rating="rating"
    :comments="comments"
    :typeAction="typeAction"
    :buttonAction="buttonAction"
    :value="value"
    :percent="percent"
    :invertedPercentage="invertedPercentage || null"
    :status="status"
    :description="description"
    :infoPosition="infoPosition"
    :enabled="enabled"
    :scheme="scheme"
    :clickable="clickable || null"
    :hasInformationIcon="hasInformationIcon || null"
    @open-modal="openModal"
  >
    <template
      v-for="(_, name) in $slots"
      #[name]
    >
      <slot :name="name" />
    </template>
  </component>
</template>

<script>
import DashCard from './DashCard.vue';
import TitleCard from './TitleCard.vue';
import StatusCard from './StatusCard.vue';
import AccountCard from './AccountCard.vue';
import DefaultCard from './DefaultCard.vue';
import BlankCard from './BlankCard.vue';
import ContentCard from './ContentCard.vue';
import MarketplaceCard from './MarketplaceCard.vue';

export default {
  name: 'UnnnicCard',
  props: {
    type: {
      type: String,
      default: 'title',
      validator(value) {
        return (
          [
            'title',
            'status',
            'dash',
            'account',
            'default',
            'blank',
            'content',
            'marketplace',
          ].indexOf(value) !== -1
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
    invertedPercentage: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    comments: {
      type: String,
      default: null,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: null,
    },
    iconSrc: {
      type: String,
      default: null,
    },
    infoPosition: {
      type: String,
      default: 'right',
    },
    hasInformationIcon: {
      type: Boolean,
      default: true,
    },
    scheme: {
      type: String,
      default: 'aux-blue',
      validator(value) {
        return (
          [
            'feedback-red',
            'feedback-green',
            'feedback-yellow',
            'feedback-blue',
            'feedback-grey',
            'aux-blue',
            'aux-purple',
            'aux-orange',
            'aux-lemon',
            'aux-pink',
            'brand-weni-soft',
          ].indexOf(value) !== -1
        );
      },
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    typeAction: {
      type: String,
      default: null,
      validator(value) {
        return ['add', 'config', 'edit'].indexOf(value) !== -1;
      },
    },
    buttonAction: {
      type: Function,
      default: () => {},
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
      if (this.type === 'content') return ContentCard;
      if (this.type === 'marketplace') return MarketplaceCard;
      return TitleCard;
    },
  },
  methods: {
    openModal() {
      this.$emit('openModal');
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
  'aux-pink' $unnnic-color-aux-pink,
  'brand-weni-soft' $unnnic-color-brand-weni-soft;

@each $name, $color in $scheme-colors {
  .unnnic-card-scheme {
    &--#{$name} {
      background-color: rgba($color, $unnnic-opacity-level-extra-light);
      color: $color;
      &--icon {
        color: $color;
      }
      &--border {
        border-left: 0.25 * $unnnic-font-size solid $color;
      }
    }
  }
}
</style>

<template>
  <div
    :class="{
      'unnnic-card-marketplace': true,
      'unnnic-card-marketplace__clickable': clickable,
      'unnnic-card-marketplace__add': typeAction === 'add',
      'unnnic-card-marketplace__config': typeAction === 'config',
      'unnnic-card-marketplace__edit': typeAction === 'edit',
    }"
    @click="cardClick"
  >
    <div :class="['unnnic-card-marketplace__icons']">
      <img class="unnnic-card-marketplace__icons__app" :src="iconSrc" />
      <slot name="actions"></slot>
    </div>
    <div class="unnnic-card-marketplace__content">
      <div class="unnnic-card-marketplace__content__title">{{ title }}</div>
      <div class="unnnic-card-marketplace__content__description" :title="description">
        {{ description }}
      </div>
      <div v-if="typeAction === 'add'" class="unnnic-card-marketplace__content__rating">
        <unnnic-icon-svg
          class="unnnic-card-marketplace__content__rating__star"
          scheme="feedback-yellow"
          icon="rating-star-1"
          size="ant"
        />
        <div class="unnnic-card-marketplace__content__rating__value">{{ rating }}</div>
        <div class="unnnic-card-marketplace__content__rating__comments">({{ comments }})</div>
      </div>
    </div>
  </div>
</template>

<script>
import UnnnicIconSvg from '../Icon-svg.vue';

export default {
  name: 'unnnic-card',
  components: { UnnnicIconSvg },
  props: {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    comments: {
      type: String,
      default: null,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    iconSrc: {
      type: String,
      default: null,
    },
    rating: {
      type: Number,
      default: 0,
    },
    typeAction: {
      type: String,
      default: null,
    },
  },
  methods: {
    cardClick() {
      this.$emit('openModal');
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnnic.scss';

.unnnic-card-marketplace__config {
  opacity: $unnnic-opacity-level-dark;

  &:hover {
    opacity: 1;
    -webkit-transition: opacity 200ms ease-out;
    -moz-transition: opacity 200ms ease-out;
    -o-transition: opacity 200ms ease-out;
    transition: opacity 200ms ease-out;
  }
}

.unnnic-card-marketplace {
  border: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
  background-color: $unnnic-color-background-snow;
  border-radius: $unnnic-border-radius-md;
  padding: $unnnic-inset-sm;

  &__clickable {
    cursor: pointer;
  }

  &__icons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__app {
      width: 56px;
      height: 56px;
    }

    &__button {
      align-self: center;
    }
  }

  &__content {
    &__title {
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-bold;
      font-size: $unnnic-font-size-body-lg;
      line-height: $unnnic-font-size-body-lg + $unnnic-line-height-medium;
      color: $unnnic-color-neutral-darkest;
      padding-top: $unnnic-spacing-stack-sm;
      padding-bottom: $unnnic-spacing-stack-nano;
    }

    &__description {
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-lg;
      line-height: $unnnic-font-size-body-lg + $unnnic-line-height-medium;
      color: $unnnic-color-neutral-cloudy;
      padding-bottom: $unnnic-spacing-stack-nano;

      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__rating {
      display: flex;
      flex-direction: row;

      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;

      &__value {
        font-weight: $unnnic-font-weight-bold;
        color: $unnnic-color-neutral-darkest;
        padding: 0 $unnnic-inline-nano;
      }

      &__comments {
        color: $unnnic-color-neutral-cloudy;
      }
    }
  }
}
</style>

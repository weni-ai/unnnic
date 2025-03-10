<template>
  <section
    :class="{
      'unnnic-simple-card': true,
      'unnnic-simple-card--clickable': clickable,
    }"
    @click.stop="clickable && $emit('click')"
  >
    <section
      v-if="title || $slots.headerSlot"
      class="unnnic-simple-card__header"
    >
      <section class="unnnic-simple-card-header-container">
        <h1 class="unnnic-simple-card-header-container__title">{{ title }}</h1>
        <UnnnicToolTip
          v-if="titleTooltip"
          :text="titleTooltip"
          enabled
          class="unnnic-simple-card-header-container__title-tooltip"
        >
          <UnnnicIcon
            icon="info"
            size="nano"
            scheme="neutral-cloudy"
          />
        </UnnnicToolTip>
      </section>

      <section
        v-if="$slots.headerSlot"
        class="unnnic-simple-card__header-slot"
      >
        <slot name="headerSlot" />
      </section>
    </section>

    <p
      v-if="text"
      class="unnnic-simple-card__text"
      :title="text"
    >
      {{ text }}
    </p>

    <section
      v-if="$slots.footer"
      class="unnnic-simple-card__footer"
    >
      <slot name="footer"></slot>
    </section>
  </section>
</template>

<script>
import UnnnicIcon from '../Icon.vue';
import UnnnicToolTip from '../ToolTip/ToolTip.vue';

export default {
  name: 'UnnnicSimpleCard',
  components: {
    UnnnicToolTip,
    UnnnicIcon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    titleSize: {
      type: String,
      default: '16px',
    },
    titleTooltip: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    clickable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.unnnic-simple-card:hover {
  box-shadow: $unnnic-shadow-level-far;
}

.unnnic-simple-card:active {
  border: 1px solid $unnnic-color-neutral-cleanest;
}

.unnnic-simple-card {
  border: 1px solid $unnnic-color-neutral-soft;
  border-radius: $unnnic-border-radius-md;
  padding: $unnnic-spacing-md;
  display: grid;
  gap: $unnnic-spacing-ant;

  &--clickable {
    cursor: pointer;
  }

  &__header {
    display: flex;
    align-items: center;
  }
  &__header-slot {
    margin-left: auto;
  }

  &-header-container {
    display: flex;
    gap: $unnnic-spacing-nano;
    align-items: center;

    &__title {
      font-family: $unnnic-font-family-secondary;
      font-size: v-bind(titleSize);
      font-weight: $unnnic-font-weight-bold;
      line-height: $unnnic-line-height-large * 1.5;
      &-tooltip {
        display: flex;
      }
    }
  }

  &__text {
    color: $unnnic-color-neutral-dark;
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-md;
    line-height: $unnnic-line-height-large + $unnnic-line-height-small;
    text-align: justify;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__footer {
    border-top: 1px solid $unnnic-color-neutral-light;
    padding-top: $unnnic-spacing-ant;
    font-family: $unnnic-font-family-secondary;
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  }
}
</style>

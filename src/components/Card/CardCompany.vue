<template>
  <div
    :class="[
      'unnnic-connect-card-company',
      { 'unnnic-connect-card-company--old-version': oldVersion },
    ]"
    @click="$emit('enter')"
  >
    <div>
      <h2 class="name">{{ name }}</h2>

      <p class="description">
        {{ description }}
      </p>

      <div
        v-if="plan"
        :class="['tag', plan]"
      >
        {{ i18n(`plans.${plan}`) }}
      </div>
    </div>

    <UnnnicTag
      v-if="actionText"
      class="action"
      @click="$emit('action')"
      clickable
      :text="actionText"
      scheme="aux-blue"
    />

    <div v-if="$slots.options">
      <UnnnicDropdown
        @click.prevent
        v-model:open="isOptionsOpen"
        class="unnnic-dropdown"
      >
        <template v-slot:trigger>
          <UnnnicIcon
            class="menu-icon"
            icon="navigation-menu-vertical-1"
            size="sm"
            :scheme="isOptionsOpen ? 'neutral-cloudy' : 'neutral-clean'"
          ></UnnnicIcon>
        </template>

        <slot name="options"></slot>
      </UnnnicDropdown>
    </div>
  </div>
</template>

<script>
import UnnnicI18n from '../../mixins/i18n';
import UnnnicTag from '../Tag/Tag.vue';

export default {
  components: {
    UnnnicTag,
  },

  mixins: [UnnnicI18n],

  props: {
    oldVersion: Boolean,
    name: String,
    description: String,
    plan: String,
    actionText: String,
  },

  data() {
    return {
      isOptionsOpen: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-connect-card-company {
  cursor: pointer;
  display: flex;
  column-gap: $unnnic-spacing-sm;
  justify-content: space-between;

  outline-style: solid;
  outline-color: $unnnic-color-neutral-cleanest;
  outline-width: $unnnic-border-width-thinner;
  outline-offset: -$unnnic-border-width-thinner;

  background-color: $unnnic-color-background-white;
  padding: $unnnic-spacing-md;
  border-radius: $unnnic-border-radius-md;

  &:hover {
    box-shadow: $unnnic-shadow-level-near;
  }

  .name {
    color: $unnnic-color-neutral-black;

    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-bold;
    font-size: $unnnic-font-size-title-md;
    line-height: $unnnic-font-size-title-md + $unnnic-line-height-md;

    margin: 0;
    margin-bottom: $unnnic-spacing-ant;
  }

  .description {
    color: $unnnic-color-neutral-dark;

    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-lg;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;

    margin: 0;
  }

  .action {
    align-self: center;
  }

  &--old-version {
    outline: none;
    background-color: $unnnic-color-background-sky;
    column-gap: $unnnic-spacing-xs;

    &:hover {
      box-shadow: none;

      outline-style: solid;
      outline-color: $unnnic-color-neutral-soft;
      outline-width: $unnnic-border-width-thin;
      outline-offset: -$unnnic-border-width-thin;
    }

    .name {
      margin-bottom: $unnnic-spacing-nano;
    }
  }

  .tag {
    display: inline-block;
    user-select: none;

    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-md;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;

    margin-top: $unnnic-spacing-sm;
    padding: $unnnic-spacing-nano $unnnic-spacing-ant;
    border-radius: $unnnic-border-radius-pill;

    $plan-colors:
      'trial' $unnnic-color-aux-blue-500,
      'scale' $unnnic-color-aux-orange-500,
      'advanced' $unnnic-color-aux-purple-500,
      'enterprise' $unnnic-color-aux-green-500;

    @each $name, $color in $plan-colors {
      &.#{$name} {
        color: $color;
        background-color: rgba($color, $unnnic-opacity-level-extra-light);
      }
    }
  }

  .menu-icon {
    display: block;
    margin-block: $unnnic-spacing-xs;
    user-select: none;
  }

  .unnnic-dropdown {
    :deep(.unnnic-dropdown__trigger .unnnic-dropdown__content) {
      margin-top: 0;
      padding: 0;
    }
  }
}
</style>

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
      clickable
      :text="actionText"
      scheme="aux-blue"
      @click="$emit('action')"
    />

    <div v-if="$slots.options">
      <UnnnicDropdown
        v-model:open="isOptionsOpen"
        class="unnnic-dropdown"
        @click.prevent
      >
        <template #trigger>
          <UnnnicIcon
            class="menu-icon"
            icon="navigation-menu-vertical-1"
            size="sm"
            scheme="fg-base"
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
@use '@/assets/scss/unnnic' as *;

.unnnic-connect-card-company {
  cursor: pointer;
  display: flex;
  column-gap: $unnnic-spacing-sm;
  justify-content: space-between;

  outline-style: solid;
  outline-color: $unnnic-color-fg-muted;
  outline-width: 1px;
  outline-offset: -1px;

  background-color: $unnnic-color-bg-base;
  padding: $unnnic-spacing-md;
  border-radius: $unnnic-border-radius-md;

  &:hover {
    box-shadow: $unnnic-shadow-1;
  }

  .name {
    color: $unnnic-color-fg-emphasized;

    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-bold;
    font-size: $unnnic-font-size-title-md;
    line-height: $unnnic-font-size-title-md + $unnnic-line-height-md;

    margin: 0;
    margin-bottom: $unnnic-spacing-ant;
  }

  .description {
    color: $unnnic-color-fg-base;

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
    background-color: $unnnic-color-bg-base-soft;
    column-gap: $unnnic-spacing-xs;

    &:hover {
      box-shadow: none;

      outline-style: solid;
      outline-color: $unnnic-color-bg-muted;
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
      'trial' $unnnic-color-blue-10,
      'scale' $unnnic-color-orange-10,
      'advanced' $unnnic-color-purple-10,
      'enterprise' $unnnic-color-green-10;

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

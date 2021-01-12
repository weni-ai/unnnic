<template>
  <div
    :class="{ 'unnic-side-bar-item': true,
              'unnic-side-bar-item--active': active,
              'unnic--clickable': true,
            }"
    @click="onClick">
    <u-icon
      :class="{'unnic-side-bar-item__icon': true,
               'unnic-side-bar-item__icon--active': active,
              }"
      size="sm"
      :icon="icon"/>
    <span class="unnic-side-bar-item__label"> {{ text }} <slot /> </span>
    </div>
</template>

<script>
import UIcon from '../Icon.vue';

export default {
  name: 'SidebarItem',
  components: { UIcon },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" >
@import '../../assets/scss/unnic.scss';

    .unnic-side-bar-item {
        display: flex;
        align-items: center;
        color: $unnic-color-neutral-darkest;
        margin-bottom: $unnic-spacing-stack-xs;
        padding: $unnic-inset-nano;
        font-size: $unnic-font-size-body-md;
        font-family: $unnic-font-family-secondary;
        border-radius: $unnic-border-radius-sm;
        line-height: $unnic-font-size-body-md + $unnic-line-height-medium;

        &--active {
            background-color: rgba($unnic-color-brand-weni, $unnic-opacity-level-light);
            font-weight: $unnic-font-weight-bold;
        }

        &__icon {
           margin-right: $unnic-inline-xs;
           color: $unnic-color-neutral-cloudy;

           &--active {
               color: $unnic-color-brand-weni;
           }
        }
    }
</style>

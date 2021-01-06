<template>
    <div class="unnic-side-bar-menu">
        <p class="unnic-side-bar-menu__title"> {{ text }} </p>
        <slot />
    </div>
</template>

<script>
export default {
  name: 'UnnicSidebarMenu',
  props: {
    text: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" >
@import '../../assets/scss/unnic.scss';
    .unnic-side-bar-menu {
        color: $unnic-color-neutral-cloudy;
        font-family: $unnic-font-family-secondary;
        font-weight: $unnic-font-weight-regular;
        font-size: $unnic-font-size-body-sm;
        margin-bottom: $unnic-spacing-stack-md;

        &__title {
            margin: 0 0 $unnic-spacing-stack-xs 0;
            font-size: $unnic-font-size-body-md;
            line-height: $unnic-font-size-body-md + $unnic-line-height-medium;
        }
    }
</style>

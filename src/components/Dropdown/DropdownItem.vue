<template>
    <a
      @click="$emit('click')"
      class="unnic-dropdown-item unnic--clickable">
      <slot />
    </a>
</template>

<script>
export default {
  name: 'UnnicDropdownItem',
};
</script>

<style lang="scss">
@import '../../assets/scss/unnic.scss';
  .unnic-dropdown-item {
    color: $unnic-color-neutral-dark;
    text-decoration: none;
    font-family: $unnic-font-family-secondary;
    font-size: $unnic-font-size-body-md;

    + .unnic-dropdown-item::before {
        height: 0;
        content: '';
        display: block;
        border: 1px solid $unnic-color-neutral-lightest;
        margin: $unnic-spacing-stack-xs 0;
    }
  }
</style>

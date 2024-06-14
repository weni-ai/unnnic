<template>
  <a class="unnnic-dropdown-item unnnic--clickable">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'UnnnicDropdownItem',
};
</script>

<style lang="scss">
@import '../../assets/scss/unnnic.scss';
.unnnic-dropdown-item {
  color: $unnnic-color-neutral-dark;
  text-decoration: none;
  font-family: $unnnic-font-family-secondary;
  font-size: $unnnic-font-size-body-md;

  + .unnnic-dropdown-item::before {
    height: 0;
    content: '';
    display: block;
    border: 1px solid $unnnic-color-neutral-lightest;
    margin: $unnnic-spacing-stack-xs 0;
  }
}
</style>

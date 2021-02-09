<template>
    <div
      @click="$emit('click')"
      class="unnic-select-item unnic--clickable">
      <span class="unnic-select-item__label">
        <slot/>
        </span>
    </div>
</template>

<script>
export default {
  name: 'UnnicSelectItem',
};
</script>

<style lang="scss">
@import '../../assets/scss/unnic.scss';
  .unnic-select-item {
    background-color: $unnic-color-background-snow;
    padding: $unnic-inset-xs;
    font-size: $unnic-font-size-body-gt;

    &:hover{
      background-color: $unnic-color-neutral-lightest;
    }

    &__label{
      font-family: $unnic-font-family-secondary;
      color: $unnic-color-neutral-dark;
      font-weight: $unnic-font-weight-regular;
      line-height: $unnic-font-size-body-gt + $unnic-line-height-medium;
    }

  }
</style>

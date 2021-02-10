<template>
    <div
      @click="$emit('click')"
      class="unnnic-select-item unnnic--clickable">
      <span class="unnnic-select-item__label">
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
@import '../../assets/scss/unnnic.scss';
  .unnnic-select-item {
    background-color: $unnnic-color-background-snow;
    padding: $unnnic-inset-nano;
    font-size: $unnnic-font-size-body-gt;
    margin: 0 $unnnic-inline-xs;

    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
    -webkit-line-clamp: 1;

    &:hover{
      background-color: $unnnic-color-neutral-lightest;
    }

    &__label{
      font-family: $unnnic-font-family-secondary;
      color: $unnnic-color-neutral-dark;
      font-weight: $unnnic-font-weight-regular;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
    }

  }
</style>

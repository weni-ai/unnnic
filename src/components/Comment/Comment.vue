<template>
  <div class="unnnic-comment">
    <img class="unnnic-comment__avatar" :src="avatar" />
    <div class="unnnic-comment__content">
      <div class="unnnic-comment__content__header">
        <div class="unnnic-comment__content__header__title">{{ title }}</div>
        <div class="unnnic-comment__content__header__time">{{ time }}</div>
        <div class="unnnic-comment__content__header__actions">
          <slot name="actions"></slot>
        </div>
      </div>
      <div class="unnnic-comment__content__text">{{ text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'unnnic-comment',
  components: {},
  props: {
    avatar: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    time: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/scss/unnnic.scss';

.unnnic-comment {
  display: flex;

  &__avatar {
    display: flex;
    align-self: flex-start;
    width: 56px;
    height: 56px;

    border-radius: 100%;
  }

  &__content {
    flex-grow: 1;
    margin-left: $unnnic-inline-xs;

    &__header {
      display: flex;

      &__title {
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-bold;
        font-size: $unnnic-font-size-body-lg;
        line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
        color: $unnnic-color-neutral-darkest;
        margin-right: $unnnic-inline-nano;
      }

      &__time {
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-regular;
        font-size: $unnnic-font-size-body-gt;
        line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
        color: $unnnic-color-neutral-cloudy;
      }

      &__actions {
        margin-left: auto;
        cursor: pointer;
      }
    }

    &__text {
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-lg;
      line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
      color: $unnnic-color-neutral-darkest;
      margin-top: $unnnic-spacing-stack-nano;

      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>

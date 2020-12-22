<template>
    <div :class="{'unnic-side-bar': true, 'unnic-side-bar--contracted': !expanded}">
        <div class="unnic-side-bar__header">
            <slot name="header" />
        </div>
        <slot />
    </div>
</template>

<script>

export default {
  name: 'unnic-sidebar',
  props: {
    expanded: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnic.scss';

.unnic-side-bar {
    background-color: $unnic-color-background-sky;
    padding: $unnic-inset-md;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 250px;

    &--contracted {
        width: 90px;

        .unnic-side-bar {
            &-menu {
                &__title {
                    visibility: hidden;
                }
            }

            &-item {
                display: flex;
                justify-content: center;

                &__label {
                    display: none;
                }
            }
        }
    }

    &__header {
        margin-bottom: $unnic-spacing-stack-md;
    }
}

</style>
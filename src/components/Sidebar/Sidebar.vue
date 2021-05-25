<template>
    <div :class="{'unnnic-side-bar': true, 'unnnic-side-bar--contracted': !expanded}">
        <div class="unnnic-side-bar__header">
            <slot name="header" />
        </div>
        <slot />
        <div class="unnnic-side-bar__footer">
            <slot name="footer"/>
        </div>
    </div>
</template>

<script>

export default {
  name: 'unnnic-sidebar',
  props: {
    expanded: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnnic.scss';

.unnnic-side-bar {
    background-color: $unnnic-color-background-sky;
    padding: $unnnic-inset-sm;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 15.375rem;
    transition: width .1s;
    font-family: $unnnic-font-family-secondary;
    box-sizing: border-box;

    &--contracted {
        width: 5.625rem;
        transition: width .1s;

        .unnnic-side-bar {
            &-menu {
                &__title {
                    display: none;
                    margin: 0;
                }

                + .unnnic-side-bar-menu::before {
                    width: 100%;
                    height: 0px;
                    border: 1px $unnnic-color-neutral-soft solid;
                    content: '';
                    display: block;
                    margin-bottom: $unnnic-spacing-stack-md;
                }
            }

            &-item {
                display: flex;
                justify-content: center;

                &__icon {
                    margin: 0;
                    font-size: $unnnic-icon-size-md !important;
                    width: $unnnic-icon-size-md !important;
                    height: $unnnic-icon-size-md !important;
                }

                &__label {
                    display: none;
                }
            }
        }
    }

    &__header {
        margin-bottom: $unnnic-spacing-stack-md;
    }

    &__footer {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
}

</style>

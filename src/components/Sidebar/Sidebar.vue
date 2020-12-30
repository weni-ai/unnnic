<template>
    <div :class="{'unnic-side-bar': true, 'unnic-side-bar--contracted': !expanded}">
        <div class="unnic-side-bar__header">
            <slot name="header" />
        </div>
        <slot />
        <div class="unnic-side-bar__footer">
            <slot name="footer"/>
        </div>
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
    font-family: $unnic-font-family-secondary;
    box-sizing: border-box;

    &--contracted {
        width: 90px;

        .unnic-side-bar {
            &-menu {
                &__title {
                    visibility: hidden;
                }

                + .unnic-side-bar-menu::before {
                    width: 100%;
                    height: 0px;
                    border: 1px $unnic-color-neutral-soft solid;
                    content: '';
                    display: block;
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

    &__footer {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
}

</style>

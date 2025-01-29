<template>
  <aside
    v-if="modelValue"
    class="unnnic-drawer"
    data-testid="drawer"
  >
    <section
      v-if="!withoutOverlay"
      class="unnnic-drawer__overlay"
      data-testid="overlay"
      @click.stop="close"
    />
    <Transition
      appear
      name="drawer"
    >
      <section
        v-if="showDrawer"
        data-testid="drawer-container"
        :class="[
          'unnnic-drawer__container',
          `unnnic-drawer__container--${size}`,
        ]"
      >
        <header class="unnnic-drawer__header">
          <section class="unnnic-drawer__title-container">
            <slot v-if="$slots.title" name="title"/>

            <template v-else>
              <h1
                class="unnnic-drawer__title"
                data-testid="drawer-title"
              >
                {{ title }}
              </h1>
              <p
                v-if="description"
                class="unnnic-drawer__description"
                data-testid="drawer-description"
              >
                {{ description }}
              </p>
            </template>
          </section>
          <UnnnicIcon
            class="unnnic-drawer__close"
            data-testid="close-icon"
            :icon="closeIcon"
            size="avatar-nano"
            clickable
            @click="back"
          />
        </header>
        <section class="unnnic-drawer__content">
          <slot name="content"></slot>
        </section>
        <footer
          v-if="showFooter"
          class="unnnic-drawer__footer"
          data-testid="footer"
        >
          <UnnnicButton
            v-if="secondaryButtonText"
            data-testid="secondary-button"
            size="large"
            type="tertiary"
            :disabled="disabledSecondaryButton"
            :loading="loadingSecondaryButton"
            :text="secondaryButtonText"
            @click="$emit('secondaryButtonClick')"
          />
          <UnnnicButton
            v-if="primaryButtonText"
            data-testid="primary-button"
            size="large"
            :disabled="disabledPrimaryButton"
            :loading="loadingPrimaryButton"
            :type="primaryButtonType"
            :text="primaryButtonText"
            @click="$emit('primaryButtonClick')"
          />
        </footer>
      </section>
    </Transition>
  </aside>
</template>

<script>
import UnnnicIcon from '../Icon.vue';
import UnnnicButton from '../Button/Button.vue';

export default {
  name: 'UnnnicDrawer',
  components: {
    UnnnicIcon,
    UnnnicButton,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    disabledPrimaryButton: {
      type: Boolean,
      default: false,
    },
    disabledSecondaryButton: {
      type: Boolean,
      default: false,
    },
    loadingPrimaryButton: {
      type: Boolean,
      default: false,
    },
    loadingSecondaryButton: {
      type: Boolean,
      default: false,
    },
    primaryButtonText: {
      type: String,
      default: '',
    },
    primaryButtonType: {
      type: String,
      default: 'primary',
    },
    secondaryButtonText: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'md',
      validator(val) {
        return ['md', 'lg', 'xl', 'gt'].includes(val);
      },
    },
    wide: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
    withoutOverlay: {
      type: Boolean,
      default: false,
    },
    closeIcon: {
      type: String,
      default: 'arrow_back',
    },
    distinctCloseBack: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['primaryButtonClick', 'secondaryButtonClick', 'close', 'back'],
  data() {
    return {
      showDrawer: true,
    };
  },
  computed: {
    showFooter() {
      return !!(this.primaryButtonText || this.secondaryButtonText);
    },
  },
  methods: {
    transitionClose(callback) {
      this.showDrawer = false;
      setTimeout(() => {
        callback?.();
        this.showDrawer = true;
      }, 200);
    },
    close() {
      this.transitionClose(() => this.$emit('close'));
    },
    back() {
      if (this.distinctCloseBack) {
        this.transitionClose(() => this.$emit('back'));
      } else {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@keyframes drawerOpen {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes drawerClose {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

.drawer-enter-active,
.drawer-enter-to {
  animation: drawerOpen 200ms ease-in;
}

.drawer-leave-active,
.drawer-leave-to {
  display: none;
  animation: drawerClose 200ms ease-in;
}

.unnnic-drawer {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 8;
}

.unnnic-drawer__overlay {
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
}

.unnnic-drawer__container {
  z-index: 10;
  top: 0;
  right: 0;
  position: fixed;
  display: flex;
  flex-direction: column;
  font-family: $unnnic-font-family-secondary;
  justify-content: space-between;
  height: 100%;
  background-color: $unnnic-color-neutral-white;

  &--md {
    width: calc(100% / 3);
  }

  &--lg {
    width: 50%;
  }

  &--xl {
    width: 66%;
  }

  &--gt {
    width: 75%;
  }

  .unnnic-drawer__header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $unnnic-color-neutral-soft;
    padding: $unnnic-spacing-md;
    .unnnic-drawer__title-container {
      .unnnic-drawer__title {
        color: $unnnic-color-neutral-darkest;
        font-family: $unnnic-font-family-secondary;
        font-size: $unnnic-font-size-title-sm;
        font-weight: $unnnic-font-weight-black;
        line-height: $unnnic-line-height-large * 1.75;
      }

      .unnnic-drawer__description {
        color: $unnnic-color-neutral-cloudy;
        font-family: $unnnic-font-family-secondary;
        font-size: $unnnic-font-size-body-gt;
        font-weight: $unnnic-font-weight-regular;
        line-height: $unnnic-line-height-large * 1.375;
      }
    }

    .unnnic-drawer__close {
      margin: $unnnic-spacing-nano;
      transform: rotate(180deg);
      display: flex;
    }
  }

  .unnnic-drawer__content {
    overflow-y: auto;
    color: $unnnic-color-neutral-cloudy;
    padding: $unnnic-spacing-md $unnnic-spacing-md 0 $unnnic-spacing-md;
    flex: 1 0 0;
  }

  .unnnic-drawer__footer {
    display: flex;
    padding: $unnnic-spacing-md;
    gap: $unnnic-spacing-ant;
    > * {
      flex-grow: 1;
    }
  }
}
</style>

<template>
  <aside v-if="value" class="unnnic-drawer">
    <section class="unnnic-drawer__overlay"></section>
    <transition appear name="drawer">
      <section
        v-if="showDrawer"
        :class="['unnnic-drawer__container', wide && 'unnnic-drawer__container--wide']"
      >
        <header class="unnnic-drawer__header">
          <section class="unnnic-drawer__title-container">
            <h1 class="unnnic-drawer__title">{{ title }}</h1>
            <p
              v-if="description"
              class="unnnic-drawer__description"
            >
              {{ description }}
            </p>
          </section>
          <unnnic-icon
            class="unnnic-drawer__close"
            icon="arrow_back"
            size="avatar-nano"
            clickable
            @click="close"
          />
        </header>
        <section class="unnnic-drawer__content">
          <slot name="content"></slot>
        </section>
        <footer v-if="showFooter" class="unnnic-drawer__footer">
          <unnnic-button
            v-if="secondaryButtonText"
            size="large"
            type="tertiary"
            :text="secondaryButtonText"
            @click="$emit('secondaryButtonClick')"
          />
          <unnnic-button
            v-if="primaryButtonText"
            size="large"
            :type="primaryButtonType"
            :text="primaryButtonText"
            @click="$emit('primaryButtonClick')"
          />
        </footer>
      </section>
    </transition>
  </aside>
</template>

<script>
import unnnicIcon from '../Icon.vue';
import unnnicButton from '../Button/Button.vue';

export default {
  name: 'unnnic-drawer',
  components: {
    unnnicIcon,
    unnnicButton,
  },
  data() {
    return {
      showDrawer: true,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    primaryButtonText: {
      type: String,
    },
    primaryButtonType: {
      type: String,
      default: 'primary',
    },
    secondaryButtonText: {
      type: String,
    },
    wide: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    showFooter() {
      return !!(this.primaryButtonText || this.secondaryButtonText)
    }
  },
  methods: {
    close() {
      this.showDrawer = false;
      setTimeout(() => {
        this.$emit('close');
        this.showDrawer = true;
      }, 200);
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
  background-color: rgba(0,0,0,0.4);
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
  width: calc(100%/3);

  &--wide {
    width: 50%;
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
    padding: $unnnic-spacing-md $unnnic-spacing-md 0 $unnnic-spacing-md ;
    flex: 1 0 0;
    ::v-deep * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
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

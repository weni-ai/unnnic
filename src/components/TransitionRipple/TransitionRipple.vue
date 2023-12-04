<template>
  <transition-group class="ripples" name="grow" tag="div">
    <div
      class="ripple"
      v-for="ripple in ripples"
      :key="ripple.id"
      :style="getRippleStyle(ripple)"
      :class="getRippleColorClass(color)"
    ></div>
  </transition-group>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'neutral-white',
    },
  },

  data() {
    return {
      ripples: [],
      rippleWidth: 0,
      halfRippleWidth: 0,
    };
  },

  mounted() {
    this.setTransitionContainerStyles();
    window.addEventListener('mouseup', this.purgeRipples);
  },

  beforeDestroy() {
    window.removeEventListener('mouseup', this.purgeRipples);
  },

  methods: {
    setTransitionContainerStyles() {
      const { transitionContainer } = this.$parent.$refs;

      if (transitionContainer) {
        this.$parent.$refs.transitionContainer.style.position = 'relative';
        this.$parent.$refs.transitionContainer.style.overflow = 'hidden';
      }
    },

    addRipple(e) {
      const { transitionContainer } = this.$parent.$refs;

      const width = transitionContainer.offsetWidth;
      const height = transitionContainer.offsetHeight;
      this.rippleWidth = width > height ? width : height;
      this.halfRippleWidth = this.rippleWidth / 2;

      const { left, top } = transitionContainer.getBoundingClientRect();
      const rippleId = Date.now();
      this.ripples.push({
        width: `${this.rippleWidth}px`,
        height: `${this.rippleWidth}px`,
        left: `${e.clientX - left - this.halfRippleWidth}px`,
        top: `${e.clientY - top - this.halfRippleWidth}px`,
        id: rippleId,
      });
    },
    purgeRipples() {
      this.ripples = [];
    },

    getRippleStyle(ripple) {
      return {
        top: ripple.top,
        left: ripple.left,
        width: ripple.width,
        height: ripple.height,
      };
    },
    getRippleColorClass(color) {
      return `ripples-color--${color}`;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/scss/unnnic.scss';

.ripples {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;

  @each $name, $color in $scheme-colors {
    &-color--#{$name} {
      background-color: $color;
    }
  }
}

.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  opacity: 0.05;
  animation: grow 1s ease-out;
}

.grow-enter-active,
.grow-enter-to-active {
  transition: all 1.5s ease-out;
}
.grow-leave-active,
.grow-leave-to-active {
  transition: all 1s ease-out;
}

.grow-enter {
  transform: scale(0);
  opacity: 0.1;
}

.grow-enter-to {
  transform: scale(4);
  opacity: 0.1;
}

.grow-leave {
  transform: scale(4);
  opacity: 0.1;
}
.grow-leave-to {
  transform: scale(4);
  opacity: 0;
}
</style>

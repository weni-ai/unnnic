<template>
  <section class="unnnic-tour__mask">
    <svg
      class="mask__svg"
      width="100%"
      height="100%"
    >
      <defs>
        <mask
          id="svgTourMask"
          x="0"
          y="0"
          width="100%"
          height="100%"
        >
          <rect
            x="0"
            y="0"
            width="100vw"
            height="100vh"
            fill="white"
          />
          <rect
            :x="maskRect.x"
            :y="maskRect.y"
            :width="maskRect.width"
            :height="maskRect.height"
            rx="4"
            fill="black"
            class="unnnic-tour__step"
          />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        mask="url(#svgTourMask)"
        class="unnnic-tour__overlay"
      />
      <rect
        v-for="(rect, index) of clickBlockerRects"
        :key="index"
        :x="rect.x"
        :y="rect.y"
        :width="rect.width"
        :height="rect.height"
        :style="rect.style"
        fill="transparent"
        pointer-events="auto"
      />
    </svg>
  </section>
</template>

<script>
export default {
  name: 'TourMask',

  props: {
    maskRect: {
      type: Object,
      required: true,
    },
  },

  computed: {
    clickBlockerRects() {
      const { maskRect } = this;
      return [
        {
          x: '0',
          y: '0',
          width: '100%',
          height: maskRect.y,
        },
        {
          x: '0',
          y: '0',
          width: maskRect.x,
          height: '100%',
        },
        {
          x: '0',
          y: maskRect.y + maskRect.height,
          style: { height: `calc(100vh - ${maskRect.y}px)` },
          width: '100%',
        },
        {
          x: maskRect.x + maskRect.width,
          y: '0',
          style: { width: `calc(100vw - ${maskRect.x}px)` },
          height: '100%',
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-tour {
  &__mask {
    position: fixed;
    z-index: 1000;

    inset: 0;

    pointer-events: none;

    width: 100%;
    height: 100%;

    &__svg {
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;
    }
  }

  &__step {
    transition: all 0.2s ease;
  }

  &__overlay {
    fill: rgba($unnnic-color-neutral-black, $unnnic-opacity-level-overlay);
  }
}
</style>

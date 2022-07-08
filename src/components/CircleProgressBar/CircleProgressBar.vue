<template>
  <div class="unnnic-circle-progress-bar">
    <svg width="46" height="46" class="semicircle">
      <circle
        cx="23"
        cy="23"
        r="21"
        stroke="black"
        stroke-width="4px"
        :class="['background', progress === totalProgress ? 'filled' : '']"
      />

      <path
        v-show="progress < totalProgress && progress > 0"
        id="path"
        fill="none"
        stroke-linecap="round"
        ref="background"
        class="front"
        stroke-width="4px"
      ></path>
    </svg>

    <div class="content">{{ progress }}/{{ totalProgress }}</div>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    progress: {
      type: Number,
    },

    totalProgress: {
      type: Number,
    },
  },

  watch: {
    progressChange: {
      immediate: true,
      handler() {
        function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
          const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

          return {
            x: centerX + radius * -Math.cos(angleInRadians),
            y: centerY + radius * -Math.sin(angleInRadians),
          };
        }

        function describeArc(
          x,
          y,
          innerRadius,
          outerRadius,
          startAngle,
          endAngle,
        ) {
          const radius = innerRadius;
          const spread = outerRadius - innerRadius;
          const outerStart = polarToCartesian(x, y, radius + spread, endAngle);
          const outerEnd = polarToCartesian(x, y, radius + spread, startAngle);

          const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

          const d = [
            'M',
            outerStart.x,
            outerStart.y,
            'A',
            radius + spread,
            radius + spread,
            0,
            largeArcFlag,
            0,
            outerEnd.x,
            outerEnd.y,
          ].join(' ');

          return d;
        }

        const value = (this.progress / this.totalProgress) * 360;

        const path = describeArc(23, 23, 0, 21, 180 - value.toFixed(), 180);

        this.$nextTick(() => {
          this.$refs.background.setAttribute('d', path);
        });
      },
    },
  },

  computed: {
    progressChange() {
      return `${this.progress}-${this.totalProgress}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.unnnic-circle-progress-bar {
  position: relative;
  width: fit-content;

  .semicircle {
    display: block;
  }

  .background {
    fill: transparent;
    stroke: rgba($unnnic-color-brand-weni, $unnnic-opacity-level-extra-light);

    &.filled {
      stroke: $unnnic-color-brand-weni;
    }
  }

  .front {
    stroke: $unnnic-color-brand-weni;
  }

  .content {
    position: absolute;
    text-align: center;
    width: 100%;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    color: $unnnic-color-neutral-cleanest;
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
  }
}
</style>

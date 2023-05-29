<template>
  <div class="unnnic-chart-rainbow">
    <svg width="332" height="166" class="semicircle">
      <defs xmlns="http://www.w3.org/2000/svg">
        <linearGradient
          id="paint0_linear_10224_36584"
          x1="178"
          y1="45"
          x2="28"
          y2="198"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00DED2" />
          <stop offset="1" stop-color="#00DED2" stop-opacity="0" />
        </linearGradient>
      </defs>

      <path
        id="path"
        fill="none"
        stroke-linecap="round"
        ref="background"
        class="background"
        stroke-width="26.56px"
      ></path>

      <path
        id="path"
        fill="none"
        stroke-linecap="round"
        ref="front"
        class="front"
        stroke-width="26.56px"
      ></path>
    </svg>

    <div class="content">
      <div class="percentage">
        <span class="number">{{ value }} </span>
        <span class="symbol">%</span>
      </div>

      <div v-if="description" class="description">{{ description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    value: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
    },
  },

  watch: {
    value() {
      this.updateChartSvg();
    },
  },

  mounted() {
    this.updateChartSvg();
  },

  methods: {
    updateChartSvg() {
      function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

        return {
          x: centerX + radius * Math.cos(angleInRadians),
          y: centerY + radius * Math.sin(angleInRadians),
        };
      }

      function describeArc(x, y, innerRadius, outerRadius, startAngle, endAngle) {
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

      const path = describeArc(166, 166, 139.44, 152.72, -85, 85);

      this.$refs.background.setAttribute('d', path);

      this.$refs.front.setAttribute(
        'd',
        describeArc(166, 166, 139.44, 152.72, -85, -85 + (this.value / 100) * 170),
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-chart-rainbow {
  position: relative;
  width: fit-content;

  .semicircle {
    display: block;
  }

  .background {
    stroke: $unnnic-color-background-sky;
  }

  .front {
    stroke: url(#paint0_linear_10224_36584);
  }

  .content {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;

    .percentage {
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-black;

      .number {
        color: $unnnic-color-neutral-black;
        font-size: $unnnic-font-size-h3;
        line-height: $unnnic-font-size-h3 + $unnnic-line-height-md;
      }

      .symbol {
        color: $unnnic-color-neutral-soft;
        font-size: $unnnic-font-size-h4;
        line-height: $unnnic-font-size-h4 + $unnnic-line-height-md;
      }
    }

    .description {
      color: $unnnic-color-neutral-cleanest;
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-lg;
      line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
      font-weight: $unnnic-font-weight-regular;
      margin-top: $unnnic-spacing-stack-nano;
    }
  }
}
</style>

<!-- eslint-disable linebreak-style -->
<template>
  <div class="chart" :style="{ backgroundImage: svgChart }" ref="chart">
    <div v-for="({ value }, index) in data" :key="index + Math.random() * 100" class="group">
      <div
        :style="{
          transform: `translateY(-${(value / (maxValue - minValue)) * 122}px)`,
        }"
        class="tooltip"
      >
        {{ value }}
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->
<script>
// import UnnnicToolTip from "../ToolTip/ToolTip.vue";
export default {
  components: {
    // UnnnicToolTip,
  },
  props: {
    fixedMaxValue: Number,
    fixedMinValue: Number,
    data: Array,
    color: String,
  },

  data() {
    return {
      chartContainerWidth: 0,
      chartContainerHeight: 122,
      minValue: 0,
    };
  },

  mounted() {
    this.chartContainerWidth = this.$refs.chart.offsetWidth;
    this.chartContainerHeigth = this.$refs.chart.offsetHeight;
    this.minValue = this.maxValue === this.findMax(this.data) ? 0 : this.findMin(this.data);
  },
  computed: {
    maxValue() {
      return this.fixedMaxValue || Math.max(...this.data.map(({ value }) => value).flat());
    },

    svgChart() {
      const bars = this.data
        .map(
          ({ value }) => 50
            - (122 / 200)
            - ((value / this.maxValue) * (50 - (122 / 100)) + Math.random() * 0.01),
        );

      const barWidth = 100 / bars.length;
      const halfBar = barWidth / 2;

      let path = '';

      path += `L ${barWidth / 2} ${bars[0]}`;

      let x = 0;

      for (let i = 1; i < bars.length; i += 1) {
        if (i === 1) {
          x = barWidth * 1.5;
        } else {
          x += barWidth;
        }

        path += `C ${x - halfBar} ${bars[i - 1]} ${x - halfBar} ${bars[i]} ${x} ${bars[i]}`;
      }

      if (bars.length <= 1) {
        x += barWidth / 2;
      }

      path += `L ${x + halfBar} ${bars[bars.length - 1]}`;

      const svg = `
        <svg xmlns='http://www.w3.org/2000/svg' viewBox="0 0 100 50" width="100%" height="100%">
          <defs>
            <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="${this.color}" stop-opacity="1" />
            </linearGradient>
          </defs>

          <g style="transform: scaleX(${
  this.chartContainerWidth / ((122 / 50) * 100)
}); transform-origin: center;">
            <path fill="url(#linear1)" d="M0 50 L0 ${String(bars[0]) + path} L100 100Z" />
            <path fill="none" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke" stroke="url(#linear)" d="M0 ${
  String(bars[0]) + path
}" />
          </g>
        </svg>
      `;

      return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    },
  },
  methods: {
    findMax(array) {
      return Math.max(...array.map(({ value }) => value));
    },
    findMin(array) {
      return Math.min(...array.map(({ value }) => value));
    },
  },
};
</script>

<style lang="scss">
@import '../../../assets/scss/unnnic.scss';
.chart {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  flex: 1;
  display: flex;
  position: absolute;
  .unnnic-tooltip:hover .bar {
    width: 0;
    height: 100%;
    border-left: 1px dashed $unnnic-color-neutral-dark;
    margin: 0 auto;
    cursor: pointer;
  }

  .group {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .tooltip {
      display: flex;
      height: 5px;
      color: transparent;
      justify-content: center;
      align-items: end;
      position: relative;
      z-index: 99;
      cursor: pointer;
    }

    .tooltip:hover {
      color: $unnnic-color-neutral-dark;
      font-family: $unnnic-font-family-primary;
      justify-content: center;
      align-items: end;
    }
  }
}
</style>

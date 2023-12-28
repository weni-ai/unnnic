<!-- eslint-disable linebreak-style -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="chart" :style="{ backgroundImage: svgChart }" ref="chart">
    <div v-for="({ value }, index) in data" :key="index + Math.random() * 100" class="group">
      <unnnic-tool-tip
        enabled
        :text="String(value)"
        side="top"
        :style="{
          height: `${(value / (maxValue - minValue)) * 100}%`,
          width: '100%',
        }"
      >
        <div class="bar"></div>
      </unnnic-tool-tip>
    </div>
    <div
      v-for="n in 3"
      :key="n + Math.random() * 100"
      class="horizontal-line color-neutral-cleanest"
      :style="{ top: `${(n - 1) * (146 / 3) + 32}px` }"
    >
      <hr class="line" />
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->
<script>
import UnnnicToolTip from '../../ToolTip/ToolTip.vue';

export default {
  components: {
    UnnnicToolTip,
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
      chartContainerHeight: 146,
      minValue: 0,
    };
  },

  mounted() {
    this.chartContainerWidth = this.$refs.chart.offsetWidth;
    this.chartContainerHeigth = this.$refs.chart.offsetHeight;
    this.minValue = this.maxValue === this.findMax(this.data) ? 0 : this.findMin(this.data);

    console.log(this.data);
  },
  computed: {
    maxValue() {
      return this.fixedMaxValue || Math.max(...this.data.map(({ value }) => value).flat());
    },

    svgChart() {
      const points = this.data.map(({ value }, index) => {
        const dx = this.chartContainerWidth / (this.data.length - 1);
        const dy = (this.chartContainerHeight - 48) / (this.maxValue - this.fixedMinValue);

        return [dx * index, this.chartContainerHeight - dy * value - 11];
      });

      console.log(points);

      const lineProperties = (pointA, pointB) => {
        const lengthX = pointB[0] - pointA[0];
        const lengthY = pointB[1] - pointA[1];
        return {
          length: Math.sqrt(lengthX * lengthX + lengthY * lengthY),
          angle: Math.atan2(lengthY, lengthX),
        };
      };

      const controlPointCalc = (current, previous, next, reverse) => {
        const c = current;
        const p = previous || c;
        const n = next || c;
        const smoothing = 0.2;
        const o = lineProperties(p, n);
        const rev = reverse ? Math.PI : 0;

        const x = c[0] + Math.cos(o.angle + rev) * o.length * smoothing;
        const y = c[1] + Math.sin(o.angle + rev) * o.length * smoothing;

        return [x, y];
      };

      const svgPathRender = (points1) => {
        const d = points1.reduce((acc, e, i, a) => {
          if (i > 0) {
            const cs = controlPointCalc(a[i - 1], a[i - 2], e);
            const ce = controlPointCalc(e, a[i - 1], a[i + 1], true);
            return `${acc} C ${cs[0]},${cs[1]} ${ce[0]},${ce[1]} ${e[0]},${e[1]}`;
          }
          return `${acc} M ${e[0]},${e[1]}`;
        }, '');

        return `<path d="${d}" fill="none" stroke="${this.color}" stroke-width="2"/>`;
      };

      const svg = `
        <svg viewBox="0 0 980 146;"  version="1.1" xmlns="http://www.w3.org/2000/svg" class="svg">
          ${svgPathRender(points)}
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
  width: 940px;
  height: 146px;
  background-repeat: no-repeat;
  background-size: contain;
  flex: 1;
  display: flex;
  position: absolute;
  left: auto;
  top: 48px;
  .unnnic-tooltip:hover .bar {
    width: 0;
    height: 100%;
    border-left: 1px dashed $unnnic-color-neutral-dark;
    margin: 0 auto;
  }
  .horizontal-line {
    width: 100%;
    border-top: 1px dashed;
    line-height: 80%;
    display: flex;
    flex-direction: column;
    position: absolute;
    transform: translateY(-8px);
  }
  .group {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: $unnnic-spacing-stack-nano;
    justify-content: flex-end;
  }
}
</style>

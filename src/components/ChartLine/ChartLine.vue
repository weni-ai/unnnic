<template>
  <div :class="['unnnic-chart-line', { condensed }]">
    <div
      v-if="title"
      class="header"
    >
      <div class="title unnnic-font secondary body-lg color-neutral-dark">
        {{ title }}
      </div>
    </div>

    <div class="main">
      <div class="reference">
        <div class="values">
          <div
            v-for="(value, index) in [
              value(maxValue),
              value(maxValue / 2),
              value(0),
            ]"
            :key="index"
            class="value unnnic-font secondary body-md color-neutral-cleanest"
          >
            {{ value }}
          </div>
        </div>

        <div class="unnnic-font secondary body-md color-neutral-cleanest">
          &nbsp;
        </div>
      </div>

      <div class="groups">
        <div
          ref="chart"
          class="chart"
          :style="{ backgroundImage: svgChart }"
        >
          <div
            v-for="({ value }, index) in data"
            :key="index"
            class="group"
          >
            <UnnnicToolTip
              enabled
              :text="String(value)"
              side="top"
              :style="{ height: `${(value / maxValue) * 100}%`, width: '100%' }"
            >
              <div class="bar"></div>
            </UnnnicToolTip>
          </div>
        </div>

        <div class="titles">
          <div
            v-for="({ title }, index) in data"
            :key="index"
            class="title unnnic-font secondary body-md color-neutral-cleanest"
          >
            {{ title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UnnnicToolTip from '../ToolTip/ToolTip.vue';

export default {
  components: {
    UnnnicToolTip,
  },

  props: {
    condensed: Boolean,
    fixedMaxValue: Number,
    data: Array,
    title: String,
  },

  data() {
    return {
      chartContainerWidthInterval: null,
      chartContainerWidth: 0,
    };
  },

  computed: {
    maxValue() {
      return (
        this.fixedMaxValue ||
        Math.max(...this.data.map(({ value }) => value).flat())
      );
    },

    svgChart() {
      const bars = this.data.map(
        ({ value }) =>
          50 -
          122 / 200 -
          ((value / this.maxValue) * (50 - 122 / 100) + Math.random() * 0.01),
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

        path += `C ${x - halfBar} ${bars[i - 1]} ${x - halfBar} ${
          bars[i]
        } ${x} ${bars[i]}`;
      }

      if (bars.length <= 1) {
        x += barWidth / 2;
      }

      path += `L ${x + halfBar} ${bars[bars.length - 1]}`;

      const svg = `
        <svg xmlns='http://www.w3.org/2000/svg' viewBox="0 0 100 50" width="100%" height="100%">
          <defs>
            <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#DE16BA" stop-opacity="1" />
              <stop offset="50%" stop-color="#DE16BA" stop-opacity="0.4" />
              <stop offset="100%" stop-color="#2856FC" stop-opacity="1.0" />
            </linearGradient>

            <linearGradient id="linear1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#DE16BA" stop-opacity="0.16" />
              <stop offset="50%" stop-color="#2856FC" stop-opacity="0.16" />
            </linearGradient>
          </defs>

          <g style="transform: scaleX(${
            this.chartContainerWidth / ((122 / 50) * 100)
          }); transform-origin: center;">
            <path fill="url(#linear1)" d="M0 50 L0 ${
              String(bars[0]) + path
            } L100 50Z" />
            <path fill="none" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke" stroke="url(#linear)" d="M0 ${
              String(bars[0]) + path
            }" />
          </g>
        </svg>
      `;

      return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    },
  },

  mounted() {
    this.chartContainerWidth = this.$refs.chart.offsetWidth;

    this.chartContainerWidthInterval = setInterval(() => {
      this.chartContainerWidth = this.$refs.chart.offsetWidth;
    }, 100);
  },

  beforeUnmount() {
    if (this.chartContainerWidthInterval) {
      clearInterval(this.chartContainerWidthInterval);
    }
  },

  methods: {
    value(value) {
      if (this.maxValue <= 1) {
        return value.toFixed(1);
      }

      return String(Math.ceil(value));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-chart-line {
  background-color: $unnnic-color-background-snow;
  border-radius: $unnnic-border-radius-md;
  padding: $unnnic-spacing-inset-md;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: $unnnic-spacing-stack-nano;
  outline-style: solid;
  outline-color: $unnnic-color-neutral-soft;
  outline-width: $unnnic-border-width-thinner;
  outline-offset: -$unnnic-border-width-thinner;

  &.condensed {
    padding: $unnnic-spacing-inset-sm;

    .main .reference {
      margin-right: $unnnic-spacing-inline-sm;
    }
  }

  .main {
    height: 9.125 * $unnnic-font-size;
    display: flex;
    justify-content: center;

    .reference {
      display: flex;
      flex-direction: column;
      row-gap: $unnnic-spacing-stack-nano;
      margin-right: $unnnic-spacing-inline-md;

      .values {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: right;
      }
    }

    .groups {
      display: flex;
      flex: 1;
      flex-direction: column;
      row-gap: $unnnic-spacing-stack-nano;

      .chart {
        background-size: 100% 100%;
        flex: 1;
        display: flex;

        .group {
          flex: 1;
          display: flex;
          flex-direction: column;
          row-gap: $unnnic-spacing-stack-nano;
          justify-content: flex-end;
        }

        .unnnic-tooltip:hover .bar {
          width: 0;
          height: 100%;
          border-left: 1px dashed $unnnic-color-neutral-dark;
          margin: 0 auto;
        }
      }

      .titles {
        display: flex;

        .title {
          flex: 1;
          text-align: center;
        }
      }
    }
  }
}

@each $name, $color in $scheme-colors {
  .color-#{$name} {
    color: $color;
  }

  .bg-#{$name} {
    background-color: $color;
  }
}

.unnnic-font {
  font-weight: $unnnic-font-weight-regular;
  font-family: $unnnic-font-family-primary;

  $font-sizes:
    'body-sm' $unnnic-font-size-body-sm,
    'body-md' $unnnic-font-size-body-md,
    'body-gt' $unnnic-font-size-body-gt,
    'body-lg' $unnnic-font-size-body-lg,
    'title-sm' $unnnic-font-size-title-sm,
    'title-md' $unnnic-font-size-title-md,
    'title-lg' $unnnic-font-size-title-lg,
    'h4' $unnnic-font-size-h4,
    'h3' $unnnic-font-size-h3,
    'h2' $unnnic-font-size-h2,
    'h1' $unnnic-font-size-h1;

  $font-weights:
    'black' $unnnic-font-weight-black,
    'bold' $unnnic-font-weight-bold,
    'light' $unnnic-font-weight-light;

  &.secondary {
    font-family: $unnnic-font-family-secondary;
  }

  @each $name, $size in $font-sizes {
    &.#{$name} {
      font-size: $size;
      line-height: $size + $unnnic-line-height-md;
    }
  }

  @each $name, $weight in $font-weights {
    &.#{$name} {
      font-weight: $weight;
    }
  }
}
</style>

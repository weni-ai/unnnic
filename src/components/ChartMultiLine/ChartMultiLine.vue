<!-- eslint-disable linebreak-style -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div :class="['unnnic-chart-line', { condensed }]">
    <div v-if="title" class="header">
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
              value((maxValue - minValue) / 2 + minValue),
              value(minValue),
            ]"
            :key="index"
            class="value unnnic-font secondary body-md color-neutral-cleanest"
          >
            {{ value }}
          </div>
        </div>

        <div class="unnnic-font secondary body-md color-neutral-cleanest">&nbsp;</div>
      </div>

      <div class="lines">
        <div class="groups">
          <div v-for="({ data }, index) in data" :key="index">
            <Lines
              :data="data"
              :fixedMaxValue="maxValue"
              :fixedMinValue="minValue"
              :color="colors[index]"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="titles">
      <div
        v-for="(title, index) in labels"
        :key="index"
        class="title unnnic-font secondary body-md color-neutral-cleanest"
      >
        {{ title }}
      </div>
    </div>

    <div class="labels">
      <div
        class="label unnnic-font secondary body-lg color-neutral-dark"
        v-for="({ title }, index) in data"
        :key="index"
      >
        <svg
          width="15"
          height="6"
          viewBox="0 0 15 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="15" height="6" rx="3" :fill="colors[index]" />
        </svg>
        {{ title }}
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->
<script>
import Lines from './Line/Line.vue';

export default {
  components: {
    Lines,
  },

  props: {
    condensed: Boolean,
    fixedMaxValue: Number,
    data: Array,
    title: String,
    labels: Array,
  },

  data() {
    return {
      titles: [],
      colors: [
        '#3182CE',
        '#38A169',
        '#DD6B20',
        '#805AD5',
        '#E53E3E',
        '#00A49F',
        '#D69E2E',
        '#00DED2',
        '#F6AD55',
        '#570074',
      ],
    };
  },
  computed: {
    maxValue() {
      return (
        this.fixedMaxValue || Math.max(...this.data.map(({ data }) => this.findMax(data)).flat())
      );
    },
    minValue() {
      return Math.min(...this.data.map(({ data }) => this.findMin(data)).flat());
    },
  },

  methods: {
    value(value) {
      if (this.maxValue <= 1) {
        return value.toFixed(1);
      }

      return String(Math.ceil(value));
    },
    findMax(array) {
      console.log(Math.max(...array.map(({ value }) => value)));
      return Math.max(...array.map(({ value }) => value));
    },
    findMin(array) {
      return Math.min(...array.map(({ value }) => value));
    },
    getLabel() {},
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
  width: 1024px;
  height: 296px;

  .header {
    display: flex;
    height: 24px;
    width: 100%;
  }

  .labels {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: 80px;
    justify-content: space-between;
    margin: 5px;
  }

  .titles {
    display: flex;
    width: 100%;
    height: 32px;
    .title {
      flex: 1;
      text-align: center;
    }
  }

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
    align-items: center;

    .reference {
      display: flex;
      flex-direction: column;
      row-gap: $unnnic-spacing-stack-nano;
      margin-right: $unnnic-spacing-inline-md;
      height: 146px;
      padding-top: 45px;

      .values {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: right;
        height: 146px;
        width: 12px;
        transform: translateY(-14px);
      }
    }

    .lines {
      width: 100%;
      .groups {
        display: flex;
        flex: 1;
        flex-direction: column;
        row-gap: $unnnic-spacing-stack-nano;
        width: 100%;
        height: 265px;
        position: relative;

        .unnnic-tooltip:hover .bar {
          width: 0;
          height: 100%;
          border-left: 1px dashed $unnnic-color-neutral-dark;
          margin: 0 auto;
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

  $font-sizes: 'body-sm' $unnnic-font-size-body-sm, 'body-md' $unnnic-font-size-body-md,
    'body-gt' $unnnic-font-size-body-gt, 'body-lg' $unnnic-font-size-body-lg,
    'title-sm' $unnnic-font-size-title-sm, 'title-md' $unnnic-font-size-title-md,
    'title-lg' $unnnic-font-size-title-lg, 'h4' $unnnic-font-size-h4, 'h3' $unnnic-font-size-h3,
    'h2' $unnnic-font-size-h2, 'h1' $unnnic-font-size-h1;

  $font-weights: 'black' $unnnic-font-weight-black, 'bold' $unnnic-font-weight-bold,
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
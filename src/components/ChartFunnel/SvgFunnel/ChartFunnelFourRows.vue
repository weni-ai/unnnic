<template>
  <ChartFunnelBaseRow
    class="unnnic-chart-funnel-four-rows"
    :rows="rows"
    viewBox="0 0 365 224"
  />
</template>

<script>
import ChartFunnelBaseRow from './ChartFunnelBaseRow.vue';
export default {
  name: 'UnnnicChartFunnelFourRows',

  components: {
    ChartFunnelBaseRow,
  },

  props: {
    data: {
      type: Array,
      required: true,
    },
  },

  computed: {
    rows() {
      const { data } = this;
      return [
        {
          pathD:
            'M356.374 0H8.57255C2.47804 0 -1.37827 6.54249 1.5734 11.8745L26 56H338.75L363.36 11.8984C366.336 6.56589 362.481 0 356.374 0Z',
          titleX: '50%',
          titleY: '23',
          descriptionX: '50%',
          descriptionY: '43',
          title: data[0].title,
          description: data[0].description,
        },
        {
          pathD: 'M339 56H26L58.4654 112H306.535L339 56Z',
          titleX: '50%',
          titleY: '78',
          descriptionX: '50%',
          descriptionY: '98',
          title: data[1].title,
          description: data[1].description,
        },
        {
          pathD: 'M306.5 112H58.5L90.9564 168H275.708L306.5 112Z',
          titleX: '50%',
          titleY: '136',
          descriptionX: '50%',
          descriptionY: '156',
          title: data[2].title,
          description: data[2].description,
        },
        {
          pathD:
            'M276 168H91L120.697 219.969C122.121 222.462 124.772 224 127.643 224H239.357C242.228 224 244.879 222.462 246.303 219.969L276 168Z',
          titleX: '50%',
          titleY: '190',
          descriptionX: '50%',
          descriptionY: '210',
          title: data[3].title,
          description: data[3].description,
        },
      ];
    },
  },
};
</script>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;
.unnnic-chart-funnel-four-rows {
  [class$='row']:nth-child(1) {
    fill: $unnnic-color-weni-950;
  }
  [class$='row']:nth-child(2) {
    fill: $unnnic-color-weni-800;
  }
  [class$='row']:nth-child(3) {
    fill: $unnnic-color-weni-700;
  }
  [class$='row']:nth-child(4) {
    fill: $unnnic-color-weni-600;
  }
}
</style>

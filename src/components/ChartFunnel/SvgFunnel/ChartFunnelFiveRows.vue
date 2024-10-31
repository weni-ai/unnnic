<template>
  <ChartFunnelBaseRow
    class="unnnic-chart-funnel-five-rows"
    :rows="rows"
    viewBox="0 0 361 220"
  />
</template>

<script>
import ChartFunnelBaseRow from './ChartFunnelBaseRow.vue';
export default {
  name: 'UnnnicChartFunnelFiveRows',

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
            'M352.506 0H8.42251C1.93921 0 -1.85142 7.30766 1.88266 12.6076L24 44H336.75L359.028 12.6324C362.79 7.33528 359.003 0 352.506 0Z',
          titleX: '50%',
          titleY: '20',
          descriptionX: '50%',
          descriptionY: '38',
          title: data[0].title,
          description: data[0].description,
        },
        {
          pathD: 'M337 44H24L56.4654 88H304.535L337 44Z',
          titleX: '50%',
          titleY: '62',
          descriptionX: '50%',
          descriptionY: '80',
          title: data[1].title,
          description: data[1].description,
        },
        {
          pathD: 'M304.5 88H56.5L88.9564 132H273.708L304.5 88Z',
          titleX: '50%',
          titleY: '106',
          descriptionX: '50%',
          descriptionY: '124',
          title: data[2].title,
          description: data[2].description,
        },
        {
          pathD: 'M274 132H89L121 176H242L274 132Z',
          titleX: '50%',
          titleY: '150',
          descriptionX: '50%',
          descriptionY: '168',
          title: data[3].title,
          description: data[3].description,
        },
        {
          pathD:
            'M242 176H120.957L130.481 213.947C131.374 217.505 134.573 220 138.241 220H223.89C227.498 220 230.659 217.585 231.608 214.105L242 176Z',
          titleX: '50%',
          titleY: '194',
          descriptionX: '50%',
          descriptionY: '212',
          title: data[4].title,
          description: data[4].description,
        },
      ];
    },
  },
};
</script>

<style lang="scss">
@import '../../../assets/scss/unnnic.scss';

.unnnic-chart-funnel-five-rows {
  [class$='row']:nth-child(1) {
    fill: $unnnic-color-weni-950;
  }
  [class$='row']:nth-child(2) {
    fill: $unnnic-color-weni-900;
  }
  [class$='row']:nth-child(3) {
    fill: $unnnic-color-weni-800;
  }
  [class$='row']:nth-child(4) {
    fill: $unnnic-color-weni-700;
  }
  [class$='row']:nth-child(5) {
    fill: $unnnic-color-weni-600;
  }
}
</style>

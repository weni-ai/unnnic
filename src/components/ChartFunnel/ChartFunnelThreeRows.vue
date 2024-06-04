<template>
  <ChartFunnelBaseRow
    class="unnnic-chart-funnel-three-rows"
    :rows="rows"
    viewBox="0 0 375 222"
  />
</template>

<script>
import ChartFunnelBaseRow from './ChartFunnelBaseRow.vue';
export default {
  name: 'UnnnicChartFunnelThreeRows',

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
            'M362.938 0H12.025C6.30976 0 2.43799 5.81972 4.64626 11.0911L31 74H343.75L370.307 11.1122C372.535 5.83818 368.663 0 362.938 0Z',
          titleX: '50%',
          titleY: '32',
          descriptionX: '50%',
          descriptionY: '52',
          title: data[0].title,
          description: data[0].description,
        },
        {
          pathD: 'M344 74H31L63.4654 148H311.535L344 74Z',
          titleX: '50%',
          titleY: '106',
          descriptionX: '50%',
          descriptionY: '126',
          title: data[1].title,
          description: data[1].description,
        },
        {
          pathD:
            'M311.5 148H63.5L93.8569 217.213C95.1325 220.122 98.0075 222 101.183 222H275.372C278.603 222 281.517 220.056 282.758 217.073L311.5 148Z',
          titleX: '50%',
          titleY: '180',
          descriptionX: '50%',
          descriptionY: '200',
          title: data[2].title,
          description: data[2].description,
        },
      ];
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnnic.scss';

.unnnic-chart-funnel-three-rows {
  [class$='row']:nth-child(1) {
    fill: $unnnic-color-weni-950;
  }
  [class$='row']:nth-child(2) {
    fill: $unnnic-color-weni-800;
  }
  [class$='row']:nth-child(3) {
    fill: $unnnic-color-weni-600;
  }
}
</style>

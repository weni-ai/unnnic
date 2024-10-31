<template>
  <ChartDefaultFunnelBase :data="rows" />
</template>

<script>
import ChartDefaultFunnelBase from './ChartDefaultFunnelBase.vue';

export default {
  name: 'UnnnicDefaultChartFunnelThreeRows',

  components: {
    ChartDefaultFunnelBase,
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
          ...data[0],
          svgPath:
            'M219.847 0H8C3.58172 0 0 3.58172 0 8V154H201.205C205.209 154 208.597 151.039 209.133 147.071L227.775 9.07095C228.423 4.2707 224.691 0 219.847 0Z',
          svgWidth: 228,
          svgHeight: 153,
        },
        {
          ...data[1],
          svgPath:
            'M186 0H0L1.01123e-05 154H157.515C161.506 154 164.886 151.059 165.438 147.107L186 0Z',
          svgWidth: 186,
          svgHeight: 153,
        },
        {
          ...data[2],
          svgPath:
            'M143 0H2.43903e-05L0 154H115.563C119.574 154 122.966 151.029 123.493 147.052L143 0Z',
          svgWidth: 143,
          svgHeight: 153,
        },
      ];
    },
  },
};
</script>

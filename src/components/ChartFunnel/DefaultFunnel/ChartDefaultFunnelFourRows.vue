<template>
  <ChartDefaultFunnelBase :data="rows" />
</template>

<script>
import ChartDefaultFunnelBase from './ChartDefaultFunnelBase.vue';

export default {
  name: 'UnnnicDefaultChartFunnelFourRows',

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
            'M219.43 0H8C3.58172 0 0 3.58172 0 8V115.5H201.509C205.38 115.5 208.696 112.728 209.382 108.918L227.304 9.41809C228.187 4.51118 224.416 0 219.43 0Z',
          svgWidth: 228,
          svgHeight: 114,
        },
        {
          ...data[1],
          svgPath:
            'M186 0.5H0L1.01123e-05 116H157.828C161.681 116 164.987 113.254 165.693 109.466L186 0.5Z',
          svgWidth: 186,
          svgHeight: 114,
        },
        {
          ...data[2],
          svgPath:
            'M143 0H2.43903e-05L0 115.5H115.862C119.743 115.5 123.064 112.715 123.74 108.893L143 0Z',
          svgWidth: 143,
          svgHeight: 114,
        },
        {
          ...data[3],
          svgPath:
            'M103 0.5H0L1.9471e-05 116H74.8117C78.6643 116 81.9697 113.254 82.6761 109.467L103 0.5Z',
          svgWidth: 103,
          svgHeight: 114,
        },
      ];
    },
  },
};
</script>

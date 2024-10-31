<template>
  <ChartDefaultFunnelBase :data="rows" />
</template>

<script>
import ChartDefaultFunnelBase from './ChartDefaultFunnelBase.vue';

export default {
  name: 'UnnnicDefaultChartFunnelFiveRows',

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
            'M218.999 0H8C3.58172 0 0 3.58173 0 8.00001V92.4H201.798C205.539 92.4 208.781 89.8071 209.602 86.1572L226.803 9.75715C227.929 4.75524 224.126 0 218.999 0Z',
          svgWidth: 228,
          svgHeight: 92,
        },
        {
          ...data[1],
          svgPath:
            'M192 0.399902H0L1.04385e-05 92.7999H163.476C167.174 92.7999 170.39 90.2656 171.254 86.6703L192 0.399902Z',
          svgWidth: 192,
          svgHeight: 92,
        },
        {
          ...data[2],
          svgPath:
            'M152 0.800049H2.59253e-05L0 93.2001H123.948C127.661 93.2001 130.886 90.645 131.736 87.0302L152 0.800049Z',
          svgWidth: 152,
          svgHeight: 92,
        },
        {
          ...data[3],
          svgPath:
            'M117 0.199951H0L2.21175e-05 92.6H86.3723C90.0018 92.6 93.1765 90.1566 94.1057 86.648L117 0.199951Z',
          svgWidth: 117,
          svgHeight: 92,
        },
        {
          ...data[4],
          svgPath:
            'M79 0.600098H0L3.72103e-05 85.0001C3.91582e-05 89.4184 3.58177 93.0001 8.00004 93.0001H46.3116C49.8754 93.0001 53.0095 90.6427 53.9978 87.2187L79 0.600098Z',
          svgWidth: 79,
          svgHeight: 92,
        },
      ];
    },
  },
};
</script>

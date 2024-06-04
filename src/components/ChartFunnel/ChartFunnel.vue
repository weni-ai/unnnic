<template>
  <component
    :is="chartComponent"
    :data="data"
  />
</template>

<script>
import ChartFunnelThreeRows from './ChartFunnelThreeRows.vue';
import ChartFunnelFourRows from './ChartFunnelFourRows.vue';
import ChartFunnelFiveRows from './ChartFunnelFiveRows.vue';

export default {
  name: 'UnnnicChartFunnel',

  components: {
    ChartFunnelThreeRows,
    ChartFunnelFourRows,
    ChartFunnelFiveRows,
  },

  props: {
    data: {
      type: Array,
      required: true,
    },
  },

  computed: {
    chartComponent() {
      const componentMap = {
        3: 'ChartFunnelThreeRows',
        4: 'ChartFunnelFourRows',
        5: 'ChartFunnelFiveRows',
      };
      return componentMap[this.data.length] || null;
    },
  },
};
</script>

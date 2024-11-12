<template>
  <component
    :is="chartComponent"
    :data="chartData"
  />
</template>

<script>
import ChartFunnelThreeRows from './SvgFunnel/ChartFunnelThreeRows.vue';
import ChartFunnelFourRows from './SvgFunnel/ChartFunnelFourRows.vue';
import ChartFunnelFiveRows from './SvgFunnel/ChartFunnelFiveRows.vue';
import ChartDefaultFunnelBase from './DefaultFunnel/ChartDefaultFunnelBase.vue';

export default {
  name: 'UnnnicChartFunnel',

  components: {
    ChartFunnelThreeRows,
    ChartFunnelFourRows,
    ChartFunnelFiveRows,
    ChartDefaultFunnelBase,
  },

  props: {
    data: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      default: 'default',
    },
  },

  computed: {
    chartComponent() {
      const componentMap = {
        default: {
          3: ChartDefaultFunnelBase,
          4: ChartDefaultFunnelBase,
          5: ChartDefaultFunnelBase,
        },
        basic: {
          3: 'ChartFunnelThreeRows',
          4: 'ChartFunnelFourRows',
          5: 'ChartFunnelFiveRows',
        },
      };
      return componentMap[this.type][this.data.length] || null;
    },
    chartData() {
      const classIndex = ['w-60', 'w-50', 'w-40', 'w-30', 'w-20'];
      if (this.type === 'default')
        return this.data.map((e, index) => ({
          percentage: e.title,
          value: e.value,
          description: e.description,
          widthClass: classIndex[index],
          color: e.color,
        }));

      return this.data;
    },
  },
};
</script>

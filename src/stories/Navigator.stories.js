import UnnnicNavigator from '../components/Navigator/index.vue';

export default {
  title: 'example/Navigator',
  component: UnnnicNavigator,

  args: {
    pages: ['page1', 'page2', 'page3'],
    activePage: 'page2',
  },
};

export const Default = {
  render: (args) => ({
    components: { UnnnicNavigator },
    setup() {
      return { args };
    },
    template: `
      <div>
        <UnnnicNavigator v-bind="args"/>
      </div>
    `,
  }),
  args: {},
};

import unnnicBreadcrumb from '../components/Breadcrumb/Breadcrumb.vue';

export default {
  title: 'Example/Breadcrumb',
  component: unnnicBreadcrumb,
  argTypes: {
    'on-crumb-click': { action: '@crumb-click' },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicBreadcrumb,
  },

  template: `
    <unnnic-breadcrumb v-bind="$props"></unnnic-breadcrumb>
  `,
});

export const Default = Template.bind({});

Default.args = {
  crumbs: [
    { name: 'One', path: '/One' },
    { name: 'Two', path: '/Two' },
    { name: 'Active', path: '/Active' },
  ],
};

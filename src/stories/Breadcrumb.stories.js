import unnnicBreadcrumb from '../components/Breadcrumb/Breadcrumb.vue';

export default {
  title: 'Example/Breadcrumb',
  component: unnnicBreadcrumb,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicBreadcrumb,
  },
  methods: {
    handleCrumbClick(crumb) {
      // eslint-disable-next-line no-alert
      alert(`${crumb.path}`);
    },
  },
  template: `
  <unnnic-breadcrumb v-bind="$props" @crumbClick="handleCrumbClick"></unnnic-breadcrumb>
  `,
});

export const Default = Template.bind({});
Default.args = {
  crumbs: [
    { name: 'One', path: 'One' },
    { name: 'Two', path: 'Two' },
    { name: 'Active', path: 'Active' },
  ],
};

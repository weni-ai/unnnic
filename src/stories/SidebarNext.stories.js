import UnnnicSidebarNext from '../components/SidebarNext/index.vue';

export default {
  title: 'Example/SidebarNext',
  component: UnnnicSidebarNext,
  argTypes: {
    expanded: { control: { type: 'boolean' } },
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UnnnicSidebarNext },
    template: `
        <UnnnicSidebarNext  />
      `,
  }),
};

export const Expanded = { args: {} };

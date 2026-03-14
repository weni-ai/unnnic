import UnnnicCollapse from '../components/Collapse/Collapse.vue';

export default {
  title: 'Data Display/Collapse',
  component: UnnnicCollapse,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `<div>Allows for dynamic display and hiding of content. It enables sections of 
        information to be hidden or revealed with a simple click or tap, optimizing space usage 
        on the interface and enhancing the user experience.
        </div>`,
      },
    },
  },
  argTypes: {
    'on-update:model-value': { action: '@update:model-value' },
    size: {
      control: {
        type: 'select',
        options: ['md', 'lg'],
      },
    },
    borderBottom: { control: { type: 'boolean' } },
    unspacedIcon: { control: { type: 'boolean' } },
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: {
      UnnnicCollapse,
    },
    data() {
      return {
        active: true,
      };
    },
    template: `
      <UnnnicCollapse v-bind="args" v-model="active">
        Default slot
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </UnnnicCollapse>
    `,
  }),
};

export const Default = {
  args: {
    title: 'Title prop or header slot',
  },
};

export const CustomHeader = {
  render: (args) => ({
    setup() {
      return { args };
    },
    components: {
      UnnnicCollapse,
    },
    data() {
      return {
        active: true,
      };
    },
    template: `
      <UnnnicCollapse v-bind="args" v-model="active">
        <template #header>
          <p :style="{ backgroundColor: '#C6FFF7', padding: '5px' }">Title Custom</p>
        </template>

        Collapse body
      </UnnnicCollapse>
    `,
  }),
};

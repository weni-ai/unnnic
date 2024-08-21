import UnnnicCardImage from '../components/CardImage/CardImage.vue';
import UnnnicDropdownItem from '../components/Dropdown/DropdownItem.vue';

export default {
  title: 'Data Display/CardImage',
  component: UnnnicCardImage,
  tags: ['autodocs'],
  argTypes: {},
  render: (args) => ({
    components: {
      UnnnicCardImage,
      UnnnicDropdownItem,
    },
    setup() {
      return { args };
    },
    data() {
      return {
        value: true,
      };
    },
    template: `
      <UnnnicCardImage v-bind="args" v-model="value">
      <template #actions>
        <unnnic-dropdown-item>
          Option 1
        </unnnic-dropdown-item>

        <unnnic-dropdown-item>
          Option 2
        </unnnic-dropdown-item>
      </template>
      </UnnnicCardImage>
    `,
  }),
};

export const Default = {
  args: {
    title: 'Title Card',
    description: 'Last edit',
    image: 'https://picsum.photos/300/150',
    data: [
      {
        icon: 'graph-stats-1',
        scheme: 'aux-purple',
        name: 'Data',
        value: '00',
      },
      {
        icon: 'graph-stats-1',
        scheme: 'aux-purple',
        name: 'Data',
        value: '00',
      },
    ],
  },
};

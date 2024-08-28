import UnnnicSidebar from '../components/Sidebar/index.vue';

const items = [
  {
    label: 'Item 1',
    icon: 'tune',
  },
  {
    label: 'Item 2 Grouped',
    icon: 'forum',
    children: [{ label: 'Child 1' }],
  },
  {
    label: 'Item 3 Grouped',
    icon: 'forum',
    children: [{ label: 'Child 1' }, { label: 'Child 2' }],
  },
  {
    label: 'Item 4',
    icon: 'tune',
  },
  {
    label: 'Item 5 Grouped icons',
    icon: 'tune',
    children: [
      { label: 'Child 1', icon: 'abc' },
      { label: 'Child 2', icon: 'abc' },
    ],
  },
];

export default {
  title: 'example/Sidebar',
  component: UnnnicSidebar,
  argTypes: {
    position: {
      control: { type: 'select', options: ['left', 'right'] },
    },
    items: { control: { type: 'object' } },
    width: { control: { type: 'text' } },
    autoNavigateSingleChild: { control: { type: 'boolean' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: { UnnnicSidebar },

  methods: {
    setActiveItem(newActive) {
      const itemIndex = items.findIndex(
        (el) => el.label === newActive.item.label,
      );

      const childIndex = newActive.child
        ? items[itemIndex].children?.findIndex(
          (child) => child.label === newActive.child.label,
        )
        : null;

      const updatedActive = { itemIndex, childIndex };

      // eslint-disable-next-line no-param-reassign
      this.$props.active = updatedActive;

      return updatedActive;
    },
  },

  // eslint-disable-next-line no-multi-str
  template: '<UnnnicSidebar v-bind="$props" :items="items" @navigate="setActiveItem($event)" />',
});

export const Default = Template.bind({});

Default.args = {
  items,
  width: '300px',
  position: 'left',
  active: { itemIndex: 1, childIndex: 0 },
  autoNavigateSingleChild: true,
};

import { action } from '@storybook/addon-actions';
import UnnnicSidebar from '../components/Sidebar/index.vue';

const items = [
  {
    label: 'Item 1',
    icon: 'tune',
  },
  {
    label: 'Item 2 1 child',
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

const setup = (args) => {
  const handleNavigate = action('navigate');
  const setActiveItem = (newActive) => {
    const itemIndex = items.findIndex(
      (el) => el.label === newActive.item.label,
    );

    const childIndex = newActive.child
      ? items[itemIndex].children?.findIndex(
          (child) => child.label === newActive.child.label,
        )
      : null;

    const updatedActive = { itemIndex, childIndex };

    args.active = updatedActive;

    handleNavigate(newActive);

    return updatedActive;
  };

  return { args, items, setActiveItem };
};

export default {
  title: 'Example/Sidebar',
  component: UnnnicSidebar,
  decorators: [
    () => ({
      template:
        '<div ><story style="background: #fcfcfc !important; padding: 16px" /></div>',
    }),
  ],
  args: {
    items,
    width: '300px',
    active: { itemIndex: 1, childIndex: 0 },
  },
  argTypes: {
    position: {
      options: ['left', 'right'],
      control: { type: 'select' },
    },
    items: { control: 'object' },
    width: { control: 'text' },
    autoNavigateSingleChild: { control: 'boolean' },
  },
  render: (args) => ({
    setup() {
      return setup(args);
    },

    components: { UnnnicSidebar },
    template: `
        <UnnnicSidebar v-bind="args" @navigate="setActiveItem($event)" style=""/>
      `,
  }),
};

export const Default = {
  args: {
    items: items,
    width: '200px',
    active: { itemIndex: 1, childIndex: 0 },
    autoNavigateFirstChild: true,
  },
};

export const Overflowed = {
  args: {
    items: Array.from({ length: 50 }).map((_item, index) => ({
      label: `Item ${index}`,
      icon: 'tune',
    })),
    width: '200px',
    active: { itemIndex: 1, childIndex: 0 },
    autoNavigateFirstChild: true,
  },
};

export const WithTopSlot = {
  ...Default,
  render: (args) => ({
    setup() {
      return setup(args);
    },

    components: { UnnnicSidebar },
    template: `
        <UnnnicSidebar v-bind="args" @navigate="setActiveItem($event)">
          <template #top>
            <p>Content top</p>
          </template>
        </UnnnicSidebar>
      `,
  }),
  args: {
    items: items,
    width: '300px',
    active: { itemIndex: 1, childIndex: 0 },
  },
};

export const WithFooterSlot = {
  render: (args) => ({
    setup() {
      return setup(args);
    },

    components: { UnnnicSidebar },
    template: `
        <UnnnicSidebar v-bind="args" @navigate="setActiveItem($event)">
          <template #bottom>
            <p>Content bottom</p>
          </template>
        </UnnnicSidebar>
      `,
  }),
  args: {
    items: items,
    width: '300px',
    active: { itemIndex: 1, childIndex: 0 },
  },
};

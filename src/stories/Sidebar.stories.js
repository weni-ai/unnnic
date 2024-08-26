import { action } from '@storybook/addon-actions';
import UnnnicSidebar from '../components/Sidebar/index.vue';

const items = [
  {
    label: 'Item 1',
    icon: 'tune',
  },
  {
    label: 'Item 2 Grouped',
    icon: 'forum',
    children: [{ label: 'Child 1' }, { label: 'Child 2' }],
  },
  {
    label: 'Item 3',
    icon: 'tune',
  },
  {
    label: 'Item 4 Grouped icons',
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
      template: '<div ><story style="background: #fcfcfc !important;" /></div>',
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
    width: '300px',
    active: { itemIndex: 1, childIndex: 0 },
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

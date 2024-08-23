import { ref, watch } from 'vue';
import UnnnicSidebarNext from '../components/SidebarNext/index.vue';

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

export default {
  title: 'Example/SidebarNext',
  component: UnnnicSidebarNext,
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
      const activeItem = ref(args.active || { itemIndex: 1, childIndex: 0 });

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
        activeItem.value = updatedActive;

        args.active = updatedActive;

        return updatedActive;
      };

      return { args, items, activeItem, setActiveItem };
    },

    components: { UnnnicSidebarNext },
    template: `
        <UnnnicSidebarNext v-bind="args" @navigate="setActiveItem($event)" />
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

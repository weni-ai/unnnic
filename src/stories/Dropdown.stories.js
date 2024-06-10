import UnnnicDropdown from '../components/Dropdown/Dropdown.vue';
import UnnnicDropdownItem from '../components/Dropdown/DropdownItem.vue';
import UnnnicButton from '../components/Button/Button.vue';

export default {
  title: 'example/Dropdown',
  component: UnnnicDropdown,
  argTypes: {
    position: {
      control: {
        type: 'select',
        options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      },
    },
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UnnnicDropdown, UnnnicDropdownItem, UnnnicButton },
    template: `
      <unnnic-dropdown v-bind="args"> 
        <template #trigger>
          <unnnic-button text="click me"/>
        </template>
        <unnnic-dropdown-item> Item1 </unnnic-dropdown-item>
        <unnnic-dropdown-item> Item2 </unnnic-dropdown-item>
      </unnnic-dropdown>
    `,
  }),
};

export const Default = {
  args: {},
};

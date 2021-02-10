import unnnicDropdown from '../components/Dropdown/Dropdown.vue';
import unnnicDropdownItem from '../components/Dropdown/DropdownItem.vue';
import unnnicButton from '../components/Button/Button.vue';

export default {
  title: 'example/Dropdown',
  component: unnnicDropdown,
  argTypes: {
    position: { control: { type: 'select', options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicDropdown, unnnicDropdownItem, unnnicButton },
  template: '<unnnic-dropdown v-bind="$props"> <unnnic-button slot="trigger" /> <unnnic-dropdown-item> Item1 </unnnic-dropdown-item> <unnnic-dropdown-item> Item2 </unnnic-dropdown-item> </unnnic-dropdown>',
});

export const Normal = Template.bind({});

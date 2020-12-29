import unnicDropdown from '../components/Dropdown/Dropdown.vue';
import unnicDropdownItem from '../components/Dropdown/DropdownItem.vue';
import unnicButton from '../components/Button/Button.vue';

export default {
  title: 'example/UnnicDropdown',
  component: unnicDropdown,
  argTypes: {
    position: { control: { type: 'select', options: ['top', 'bottom', 'right', 'left'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnicDropdown, unnicDropdownItem, unnicButton },
  template: '<unnicDropdown v-bind="$props"> <unnicButton slot="trigger" /> <unnicDropdownItem> Item1 </unnicDropdownItem> <unnicDropdownItem> Item2 </unnicDropdownItem> </unnicDropdown>',
});

export const Normal = Template.bind({});

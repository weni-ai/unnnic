import unnnicDropdownSkeleton from '../components/Dropdown/DropdownSkeleton.vue';

export default {
  title: 'Example/DropdownSkeleton',
  component: unnnicDropdownSkeleton,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicDropdownSkeleton },
  template: '<div><unnnic-dropdown-skeleton v-bind="$props">See the message<div slot="inside">Hello World!</div></unnnic-dropdown-skeleton></div>',
});

export const Normal = Template.bind({});

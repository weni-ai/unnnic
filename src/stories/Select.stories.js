import unnnicSelect from '../components/Select/Select.vue';

export default {
  title: 'example/Select',
  component: unnnicSelect,
  argTypes: {
    size: { control: { type: 'select', options: ['md', 'sm'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicSelect },
  template: '<unnnicSelect v-bind="$props"> <option value=""> None </option> <option value="1">option 1</option> <option value="2"> option2 </option> </unnnicSelect>',
});

export const Medium = Template.bind({});

import unnnicSelect from '../components/Select/Select.vue';

export default {
  title: 'example/Select',
  component: unnnicSelect,
  argTypes: {
    size: { control: { type: 'select', options: ['md', 'sm'] } },
    type: { control: { type: 'select', options: ['normal', 'error'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicSelect },
  template: '<unnnicSelect v-bind="$props"> \
    <div slot="header"> header </div>\
    <option value=""> None </option> \
    <option value="1">option 1</option>\
    <option value="2"> option2 </option>\
    <option value="3"> option3 </option>\
    <option value="4"> option4 </option>\
    <option value="5"> option5 </option>\
  </unnnicSelect>',
});

export const Medium = Template.bind({});

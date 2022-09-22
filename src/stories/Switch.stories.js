import unnnicSwitch from '../components/Switch/Switch.vue';

export default {
  title: 'Form/Switch',
  component: unnnicSwitch,
  argTypes: {
    size: { control: { type: 'select', options: ['small', 'medium'] } },
    textLeft: { control: { type: 'text' } },
    textRight: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicSwitch },
  data() {
    return {
      val: true,
    };
  },
  template: '<div><unnnicSwitch v-bind="$props" v-model="val"/> <div>{{val}}</div></div>',
});

export const Default = Template.bind({});
Default.args = {
  size: 'medium',
  textRight: 'Default',
  disabled: false,
  // initialState: true,
};

import unnnicSlider from '../components/Slider/Slider.vue';

export default {
  title: 'Form/Slider',
  component: unnnicSlider,
  argTypes: {
    size: { control: { type: 'select', options: ['small', 'medium'] } },
    textLeft: { control: { type: 'text' } },
    textRight: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicSlider },
  template:
    '<unnnicSlider v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
  initialValue: 1,
  minValue: 1,
  maxValue: 4,
  step: 1,
  minLabel: '1',
  maxLabel: '4',
};

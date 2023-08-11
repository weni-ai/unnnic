import unnnicSlider from '../components/Slider/Slider.vue';

export default {
  title: 'Form/Slider',
  component: unnnicSlider,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicSlider },
  template: '<unnnicSlider v-bind="$props" @valueChange="onChange"/>',
  methods: {
    onChange: (value) => {
      console.log(value);
    },
  },
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

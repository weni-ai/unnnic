import unnnicInputDatePicker from '../components/InputDatePicker/InputDatePicker.vue';

export default {
  title: 'Form/InputDatePicker',
  component: unnnicInputDatePicker,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['day', 'month', 'year'],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicInputDatePicker,
  },

  data() {
    return {
      dates: {
        start: null,
        end: null,
      },
    };
  },

  template: `
    <div>
      <!--<pre>v-model: {{ dates }}</pre>-->
      <unnnic-input-date-picker v-bind="$props" v-model="dates">
      </unnnic-input-date-picker>
    </div>
  `,

  methods: {},
});

export const Default = Template.bind({});

Default.args = {
  size: 'sm',
};

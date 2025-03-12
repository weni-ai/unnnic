import UnnnicInputDatePicker from '../components/InputDatePicker/InputDatePicker.vue';

export default {
  title: 'Form/InputDatePicker',
  component: UnnnicInputDatePicker,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['day', 'month', 'year'],
      },
    },
    position: {
      control: {
        type: 'select',
        options: ['left', 'right'],
      },
    },
  },
  render: (args) => ({
    components: {
      UnnnicInputDatePicker,
    },
    setup() {
      return { args };
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
        <pre>v-model: {{ dates }}</pre>
        <unnnic-input-date-picker v-bind="args" v-model="dates" />
      </div>
    `,
  }),
};

export const Default = {
  args: {
    size: 'sm',
  },
};

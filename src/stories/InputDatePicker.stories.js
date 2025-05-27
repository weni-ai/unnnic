import UnnnicInputDatePicker from '../components/InputDatePicker/InputDatePicker.vue';
import moment from 'moment';
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
      <div style="max-width: 200px">
        <pre>v-model: {{ dates }}</pre>
        <unnnic-input-date-picker v-bind="args" v-model="dates" />
      </div>
    `,
  }),
};

export const Default = {
  args: {
    size: 'sm',
    maxDate: moment().format('YYYY-MM-DD'),
  },
};

const today = moment();

export const WithMinMaxDates = {
  args: {
    size: 'sm',
    next: true,
    iconPosition: 'right',
    fillW: true,
    maxDate: today.format('YYYY-MM-DD'),
    minDate: today.subtract(89, 'days').format('YYYY-MM-DD'),
    options: [
      { name: 'Last 7 days', id: 'last-7-days' },
      { name: 'Last 14 days', id: 'last-14-days' },
      { name: 'Last 30 days', id: 'last-30-days' },
      { name: 'Last 60 days', id: 'last-60-days' },
      { name: 'Last 90 days', id: 'last-90-days' },
    ],
  },
};

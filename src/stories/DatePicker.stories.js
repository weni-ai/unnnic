import moment from 'moment';
import UnnnicDatePicker from '../components/DatePicker/DatePicker.vue';

export default {
  title: 'example/DatePicker',
  component: UnnnicDatePicker,
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['day', 'month', 'year'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'large'],
    },
    months: { control: { type: 'array' } },
    days: { control: { type: 'array' } },
    options: { control: { type: 'array' } },
    clearLabel: { control: { type: 'text' } },
    actionLabel: { control: { type: 'text' } },
  },
};

export const Default = {
  args: {
    size: 'large',
    maxDate: moment().format('YYYY-MM-DD'),
    initialStartDate: '12-01-2021',
    initialEndDate: '12-01-2021',
  },
};

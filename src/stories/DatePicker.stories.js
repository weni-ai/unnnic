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
    periodBaseDate: { control: { type: 'text' } },
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

export const SmallDayPicker = {
  args: {
    size: 'small',
    type: 'day',
    maxDate: moment().format('YYYY-MM-DD'),
  },
};

export const MonthView = {
  args: {
    size: 'large',
    type: 'month',
    maxDate: moment().format('YYYY-MM-DD'),
  },
};

export const YearView = {
  args: {
    size: 'large',
    type: 'year',
    maxDate: moment().format('YYYY-MM-DD'),
  },
};

export const WithMinAndMaxDateRange = {
  args: {
    size: 'large',
    type: 'day',
    minDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
    maxDate: moment().format('YYYY-MM-DD'),
  },
};

export const WithCustomLabelsAndDisableClear = {
  args: {
    size: 'large',
    type: 'day',
    clearLabel: 'Reset',
    actionLabel: 'Apply',
    disableClear: true,
    options: [
      { name: 'Last 7 days', id: 'last-7-days' },
      { name: 'Last 30 days', id: 'last-30-days' },
      { name: 'Current month', id: 'current-month' },
      { name: 'Previous month', id: 'previous-month' },
      { name: 'Custom', id: 'custom' },
    ],
  },
};

export const CustomRelativePeriodsWithBaseDate = {
  args: {
    size: 'large',

    periodBaseDate: moment().subtract(1, 'day').format('YYYY-MM-DD'),

    maxDate: moment().subtract(1, 'day').format('YYYY-MM-DD'),

    options: [
      { name: 'Last 7 days (up to 24h ago)', id: 'last-7-days' },
      { name: 'Last 14 days (up to 24h ago)', id: 'last-14-days' },
      { name: 'Last 30 days (up to 24h ago)', id: 'last-30-days' },
      { name: 'Last 12 months (up to 24h ago)', id: 'last-12-months' },
      { name: 'Current month (up to 24h ago)', id: 'current-month' },
      { name: 'Previous month (up to 24h ago)', id: 'previous-month' },
      { name: 'Custom', id: 'custom' },
    ],
  },
};

export const WithHiddenOptions = {
  args: {
    size: 'large',
    type: 'day',
    hideOptions: true,
  },
};

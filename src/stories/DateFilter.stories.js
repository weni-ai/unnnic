import UnnnicDateFilter from '../components/DateFilter/DateFilter.vue';

export default {
  title: 'Form/DateFilter',
  component: UnnnicDateFilter,
  argTypes: {
    dateFormat: { control: { type: 'text' } },
    startDate: { control: { type: 'date' } },
    endDate: { control: { type: 'date' } },
    useDateFns: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    dateFormat: 'DD/MM/YYYY',
    placeholder: 'DD/MM/YYYY ~ DD/MM/YYYY',
  },
};

import unnnicDateFilter from '../components/DateFilter/DateFilter.vue';

export default {
  title: 'Form/DateFilter',
  component: unnnicDateFilter,
  argTypes: {
    dateFormat: { control: { type: 'text' } },
    startDate: { control: { type: 'date' } },
    endDate: { control: { type: 'date' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicDateFilter },
  template: '<unnnic-date-filter v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
  dateFormat: 'DD/MM/YYYY',
  placeholder: 'DD/MM/YYYY ~ DD/MM/YYYY',
};

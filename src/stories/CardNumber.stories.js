import UnnnicCardNumber from '../components/CardNumber/CardNumber.vue';

export default {
  title: 'Data Display/CardNumber',
  component: UnnnicCardNumber,
  tags: ['autodocs'],
  argTypes: {},
};

export const Default = {
  args: {
    description: 'Description',
    number: '00',
  },
};

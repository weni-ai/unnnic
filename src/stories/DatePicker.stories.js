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
    clearLabel: 'Limpar',
    actionLabel: 'Filtrar',
    months: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    days: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    initialStartDate: '12-01-2021',
    initialEndDate: '12-01-2021',
    options: [
      {
        name: 'Últimos 7 dias',
        id: 'last-7-days',
      },
      {
        name: 'Últimos 14 dias',
        id: 'last-14-days',
      },
      {
        name: 'Últimos 30 dias',
        id: 'last-30-days',
      },
      {
        name: 'Últimos 12 meses',
        id: 'last-12-months',
      },
      {
        name: 'Mês Atual',
        id: 'current-month',
      },
      {
        name: 'Personalizar',
        id: 'custom',
      },
    ],
  },
};

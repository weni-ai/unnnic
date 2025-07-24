const englishMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const englishDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const englishPeriods = [
  { name: 'Last 7 days', id: 'last-7-days' },
  { name: 'Last 14 days', id: 'last-14-days' },
  { name: 'Last 30 days', id: 'last-30-days' },
  { name: 'Last 12 months', id: 'last-12-months' },
  { name: 'Current month', id: 'current-month' },
  { name: 'Previous month', id: 'previous-month' },
  { name: 'Custom', id: 'custom' },
];

export const months = {
  'pt-br': [
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
  en: englishMonths,
  'en-us': englishMonths,
  es: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
};

export const days = {
  'pt-br': ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  en: englishDays,
  'en-us': englishDays,
  es: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
};

export const buttons = {
  'pt-br': {
    clear: 'Limpar',
    filter: 'Filtrar',
  },
  'en-us': {
    clear: 'Clear',
    filter: 'Filter',
  },
  es: {
    clear: 'Limpiar',
    filter: 'Filtrar',
  },
};

buttons.en = buttons['en-us'];

export const periods = {
  'pt-br': [
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
      name: 'Mês Anterior',
      id: 'previous-month',
    },
    {
      name: 'Personalizar',
      id: 'custom',
    },
  ],
  en: englishPeriods,
  'en-us': englishPeriods,
  es: [
    {
      name: 'Últimos 7 días',
      id: 'last-7-days',
    },
    {
      name: 'Últimos 14 días',
      id: 'last-14-days',
    },
    {
      name: 'Últimos 30 días',
      id: 'last-30-days',
    },
    {
      name: 'Últimos 12 meses',
      id: 'last-12-months',
    },
    {
      name: 'Mes actual',
      id: 'current-month',
    },
    {
      name: 'Mes anterior',
      id: 'previous-month',
    },
    {
      name: 'Personalizar',
      id: 'custom',
    },
  ],
};

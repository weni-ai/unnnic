import unnnicLabel from '../components/Label/Label.vue';

export default {
  title: 'Form/Label',
  component: unnnicLabel,
  tags: ['autodocs'],
  argTypes: {
    label: { control: { type: 'text' } },
  },
};

export const Default = {
  args: {
    label: 'Label',
  },
};

export const WithTooltip = {
  args: {
    label: 'Label',
    tooltip: {
      text: 'Tooltip',
      enabled: true,
      forceOpen: false,
      side: 'bottom',
      maxWidth: '200px',
      enableHtml: false,
    },
  },
};

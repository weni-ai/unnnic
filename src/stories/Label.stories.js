import unnnicLabel from '../components/Label/Label.vue';

export default {
  title: 'Example/Label',
  component: unnnicLabel,
  argTypes: {
    label: { control: { type: 'text' } },
  },
};

export const Default = {
  args: {
    label: 'Label',
  }
};

import UnnnicCardData from '../components/Card/CardData.vue';

export default {
  title: 'Data Display/CardData',
  component: UnnnicCardData,
  tags: ['autodocs'],
  argTypes: {
    title: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    score: { control: { type: 'text' } },
    info: { control: { type: 'text' } },
    checked: { control: { type: 'boolean' } },
  },
};

export const Default = {
  args: {
    title: 'Title Card',
    description:
      'Description Description Description Description Description Description Description Description.',
    score: '4.9',
    info: '(3 comments)',
    checked: true,
  },
};

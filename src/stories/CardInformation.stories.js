import unnnicCardInformation from '../components/CardInformation/CardInformation.vue';

export default {
  title: 'Card/CardInformation',
  component: unnnicCardInformation,
  argTypes: {},
};

export const Default = {
  args: {
    name: 'Title Card',
    subtitle: 'Subtitle',
    description: 'Description',
    descriptionRow: 'Description Row',
    descriptionRowInfo: 'Description Row Info',
    statuses: [
      {
        title: 'AI',
        icon: 'science-fiction-robot-2',
        scheme: 'aux-blue',
        count: 1,
      },
      {
        title: 'Flows',
        icon: 'hierarchy-3-2',
        scheme: 'aux-purple',
        count: 2,
      },
      {
        title: 'Contatos',
        icon: 'single-neutral-actions-1',
        scheme: 'aux-lemon',
        count: 3,
      },
      {
        title: 'Contatos',
        icon: 'single-neutral-actions-1',
        scheme: 'aux-lemon',
        count: 3,
      },
    ],
  },
};

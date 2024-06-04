import unnnicCardData from '../components/Card/CardData.vue';

export default {
  title: 'Card/CardData',
  component: unnnicCardData,
  argTypes: {
    title: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    score: { control: { type: 'text' } },
    info: { control: { type: 'text' } },
    checked: { control: { type: 'boolean' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicCardData,
  },

  data() {
    return {};
  },

  template: `
    <div>
      <unnnic-card-data v-bind="$props"/>
    </div>
  `,
});

export const Default = Template.bind({});

Default.args = {
  title: 'Title Card',
  description:
    'Description Description Description Description Description Description Description Description.',
  score: '4.9',
  info: '(3 comments)',
  checked: true,
};

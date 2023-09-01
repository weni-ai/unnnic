import unnnicAccordion from '../components/Accordion/Accordion.vue';
import unnnicButton from '../components/Button/Button.vue';

export default {
  title: 'accordion/Accordion',
  component: unnnicAccordion,
  argTypes: {
    open: { control: { type: 'boolean' } },
    title: { control: { type: 'text' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicAccordion,
    unnnicButton,
  },

  data() {
    return {};
  },

  template: `
    <div>
      <unnnic-accordion v-model="open" v-bind="$props">
        <unnnic-button @click.stop="click" slot="actions" type="secondary" size="small" icon-left="button-play-1">Assista ao vídeo</unnnic-button>

        Quae assumenda aut non nulla quod ratione odio. Suscipit voluptatem natus a. Cumque et delectus ut. Nostrum ratione eos voluptatem voluptatu quia quod qui. Velit in consequatur corrupti similique. Quae assumenda aut non nulla quod ratione odio. Suscipit voluptatem natus a.
      </unnnic-accordion>
    </div>
  `,

  methods: {
    click() {
      console.log('clicked test 2');
    },
  },
});

export const Default = Template.bind({});

Default.args = {
  title: 'Os valores permanecem os mesmos? O que muda no meu plano contratado?',
};

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
    return {
      open: true,
    };
  },

  template: `
    <div>
      <pre>v-model:open {{ open }}</pre>
      <unnnic-accordion v-bind="$props" v-model:open="open">
        <template v-slot:actions>
          <unnnic-button @click.stop="click" type="secondary" size="small" icon-left="button-play-1">Assista ao vídeo</unnnic-button>
        </template>

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

import UnnnicAccordion from '../components/Accordion/Accordion.vue';
import UnnnicButton from '../components/Button/Button.vue';

export default {
  title: 'accordion/Accordion',
  component: UnnnicAccordion,
  argTypes: {
    open: { control: { type: 'boolean' } },
    title: { control: { type: 'text' } },
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: {
      UnnnicAccordion,
      UnnnicButton,
    },
    data() {
      return {
        open: false,
      };
    },
    template: `
      <div>
        <pre>v-model:open {{ open }}</pre>
        <unnnic-accordion v-bind="args" v-model:open="open">
          <template #actions>
            <unnnic-button type="secondary" size="small" icon-left="button-play-1">
              Assista ao vídeo
            </unnnic-button>
          </template>

          Quae assumenda aut non nulla quod ratione odio. Suscipit voluptatem natus a. Cumque et delectus ut. Nostrum ratione eos voluptatem voluptatu quia quod qui. Velit in consequatur corrupti similique. Quae assumenda aut non nulla quod ratione odio. Suscipit voluptatem natus a.
        </unnnic-accordion>
      </div>
    `,
  }),
};

export const Default = {
  args: {
    title:
      'Os valores permanecem os mesmos? O que muda no meu plano contratado?',
  },
};

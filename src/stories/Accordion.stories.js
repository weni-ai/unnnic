import { action } from '@storybook/addon-actions';
import UnnnicAccordion from '../components/Accordion/Accordion.vue';
import UnnnicButton from '../components/Button/Button.vue';

export default {
  title: 'accordion/Accordion',
  component: UnnnicAccordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Allows the user to dynamically expand and collapse sections of content. 
        Ideal for organizing information in a clean and efficient layout, is especially 
        useful in situations where there is a lot of content to be presented, but without 
        overwhelming the user with visual information at the same time.
          `,
      },
    },
  },
  args: { open: false },
  argTypes: {
    open: { control: { type: 'boolean' } },
    title: { control: { type: 'text' } },
  },
  render: (args) => ({
    components: {
      UnnnicAccordion,
      UnnnicButton,
    },
    setup() {
      const updateOpen = (value) => {
        action('update:open')(value);
        args.open = value;
      };
      return { args, updateOpen };
    },
    template: `
      <unnnic-accordion v-bind="args" @update:open="updateOpen">
        <template #actions>
          <unnnic-button type="secondary" size="small" icon-left="button-play-1">
            Sed quis dolor
          </unnnic-button>
        </template>

        Quae assumenda aut non nulla quod ratione odio. Suscipit voluptatem natus a. Cumque et delectus ut. Nostrum ratione eos voluptatem voluptatu quia quod qui. Velit in consequatur corrupti similique. Quae assumenda aut non nulla quod ratione odio. Suscipit voluptatem natus a.
      </unnnic-accordion>
    `,
  }),
};

export const Default = {
  args: {
    title: 'Quisque in hendrerit diam. Quisque?',
  },
};

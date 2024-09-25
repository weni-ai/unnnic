import UnnnicSimpleCard from '../components/Card/SimpleCard.vue';
import UnnnicButton from '../components/Button/Button.vue';

export default {
  title: 'Data Display/SimpleCard',
  component: UnnnicSimpleCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: { type: 'text' } },
    titleTooltip: { control: { type: 'text' } },
    text: { control: { type: 'text' } },
    titleSize: { control: { type: 'text' } },
    clickable: { control: { type: 'boolean' } },
  },
  render: (args) => ({
    components: {
      UnnnicSimpleCard,
    },
    setup() {
      return { args };
    },
    template: `
        <UnnnicSimpleCard v-bind="args">
        </UnnnicSimpleCard>
    `,
  }),
};

export const Default = {
  args: {
    title: 'This is the title',
    titleTooltip: 'Tooltip',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis volutpat enim quis nisi laoreet eleifend. Nulla facilisi. Sed porttitor ut felis ut aliquam. Praesent interdum suscipit malesuada. Morbi rutrum, nunc ut aliquam fringilla, metus augue ultricies dui, vitae cursus risus purus ac nulla. Mauris dignissim bibendum eros sed congue. Praesent nec elit nec justo rhoncus tempus ut sit amet leo. Donec eu efficitur dolor.',
  },
};

const TemplateWithFooter = (args) => ({
  components: { UnnnicSimpleCard },
  setup() {
    return { args };
  },
  template: `
    <UnnnicSimpleCard v-bind="args">
        <template #footer>
            <p style="font-size: 12px; color: #67738B">42 Card Footer</p>
        </template>
    </UnnnicSimpleCard>
  `,
});

const TemplateWithHeaderSlot = (args) => ({
  components: { UnnnicSimpleCard, UnnnicButton },
  setup() {
    return { args };
  },
  template: `
      <UnnnicSimpleCard v-bind="args">
          <template #headerSlot>
              <UnnnicButton iconCenter='add' type="secondary"></UnnnicButton>
          </template>
      </UnnnicSimpleCard>
    `,
});

export const WithFooter = TemplateWithFooter.bind({});
WithFooter.args = {
  title: 'This is the title',
};

export const WithHeaderSlot = TemplateWithHeaderSlot.bind({});
WithHeaderSlot.args = {
  title: 'This is the title',
};

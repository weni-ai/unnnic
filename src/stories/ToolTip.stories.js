import { unnnicFontSize } from '../components/config';
import unnnicToolTip from '../components/ToolTip/ToolTip.vue';

export default {
  title: 'Example/ToolTip',
  component: unnnicToolTip,
  argTypes: {
    text: { control: { type: 'text' } },
    side: {
      control: { type: 'select', options: ['top', 'right', 'bottom', 'left'] },
    },
    maxWidth: { control: { type: 'text' } },
    forceOpen: { control: { type: 'boolean' } },
  },
  render: (args) => ({
    components: {
      unnnicToolTip,
    },
    setup() {
      return { args };
    },
    template: `
    <unnnic-tool-tip v-bind="args"> Hover over text </unnnic-tool-tip>
    `,
  }),
};

export const Normal = {
  args: {
    text: 'Label',
    enabled: true,
    maxWidth: `${15 * unnnicFontSize}px`,
    side: 'bottom',
  },
};

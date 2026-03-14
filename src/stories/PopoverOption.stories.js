import { PopoverOption } from '../components/ui/popover';
import colorsList from '../utils/colorsList';

export default {
  title: 'Misc/PopoverOption',
  component: PopoverOption,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `<div>
          A popover options item component.
          It is used to display options in a popover.
          </div>`,
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'The label of the popover option',
    },
    disabled: {
      control: { type: 'select' },
      options: [true, false],
      description: 'Whether the option is disabled',
    },
    active: {
      control: { type: 'select' },
      options: [true, false],
      description: 'Whether the option is active',
    },
    focused: {
      control: { type: 'select' },
      options: [true, false],
      description:
        'Whether the option is focused (when the popover is open, the focused option is highlighted)',
    },
    scheme: {
      control: { type: 'select' },
      options: colorsList,
      description: 'The scheme of the option',
    },
    icon: {
      control: { type: 'text' },
      description: 'The icon of the option',
    },
  },
  args: {
    label: 'Option',
    disabled: false,
    active: false,
    scheme: 'fg-emphasized',
    icon: '',
  },
};

export const Default = {
  render: (args) => ({
    components: { PopoverOption },
    setup() {
      return { args };
    },
    template: `
    <section style="display: flex; flex-direction: column; gap: 8px;">
      <PopoverOption v-bind="args" />
      <PopoverOption v-bind="args" disabled />
      <PopoverOption v-bind="args" active />
      <PopoverOption v-bind="args" focused />
      <PopoverOption v-bind="args" icon="delete" scheme="fg-critical" />
      <PopoverOption v-bind="args" icon="info" />
    </section>
    `,
  }),
};

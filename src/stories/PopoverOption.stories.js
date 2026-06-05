import { PopoverOption } from '../components/ui/popover';
import UnnnicTag from '../components/Tag/Tag.vue';
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

export const WithTag = {
  parameters: {
    docs: {
      description: {
        story:
          'Uses the default slot to render custom content, such as a label alongside a status tag. The option keeps the `space-between` layout, so the tag stays aligned to the end.',
      },
      source: {
        code: `<UnnnicPopoverOption v-for="option in options" :key="option.value">
  <span class="popover-option__label">{{ option.label }}</span>
  <UnnnicTag
    type="default"
    size="small"
    :scheme="statusConfig[option.status].scheme"
    :text="statusConfig[option.status].text"
  />
</UnnnicPopoverOption>`,
      },
    },
  },
  render: () => ({
    components: { PopoverOption, UnnnicTag },
    data() {
      return {
        options: [
          { label: 'John Doe', value: 'john-doe', status: 'online' },
          { label: 'Jane Doe', value: 'jane-doe', status: 'lunch' },
          { label: 'James Smith', value: 'james-smith', status: 'offline' },
        ],
        statusConfig: {
          online: { scheme: 'green', text: 'Online' },
          lunch: { scheme: 'orange', text: 'Lunch' },
          offline: { scheme: 'gray', text: 'Offline' },
        },
      };
    },
    template: `
    <section style="display: flex; flex-direction: column; gap: 8px; width: 280px;">
      <PopoverOption v-for="option in options" :key="option.value" :label="option.label">
        <span style="flex: 1 1 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ option.label }}</span>
        <unnnic-tag
          type="default"
          size="small"
          :scheme="statusConfig[option.status].scheme"
          :text="statusConfig[option.status].text"
        />
      </PopoverOption>
    </section>
    `,
  }),
};

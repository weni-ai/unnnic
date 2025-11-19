import {
  SegmentedControl,
  SegmentedControlList,
  SegmentedControlTrigger,
  SegmentedControlContent,
} from '@/components/ui/segmented-control';

const segmentedControlTrigger = (
  value,
  disabled = false,
  isUnnnic = false,
) => `<${isUnnnic ? 'Unnnic' : ''}SegmentedControlTrigger value="${value}" ${disabled ? 'disabled' : ''}>
      ${value.charAt(0).toUpperCase() + value.slice(1)}
    </${isUnnnic ? 'Unnnic' : ''}SegmentedControlTrigger>`;

const unnnicSegmentedControlTrigger = (value, disabled = false) =>
  segmentedControlTrigger(value, disabled, true);

const segmentedControlContent = (
  value,
  isUnnnic = false,
) => `<${isUnnnic ? 'Unnnic' : ''}SegmentedControlContent value="${value}">
    <div>Content for ${value} here.</div>
  </${isUnnnic ? 'Unnnic' : ''}SegmentedControlContent>`;

const unnnicSegmentedControlContent = (value) =>
  segmentedControlContent(value, true);

export default {
  title: 'Navigation/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A segmented control component that allows the user to select a single option from a list of options.
          <br/>
          It supports two sizes (small, medium).
          <br/>
          API reference: https://www.reka-ui.com/docs/components/tabs
          `,
      },
      source: {
        code: `
<UnnnicSegmentedControl>
  <UnnnicSegmentedControlList>
    ${unnnicSegmentedControlTrigger('account')}
    ${unnnicSegmentedControlTrigger('password')}
    ${unnnicSegmentedControlTrigger('settings')}
    ${unnnicSegmentedControlTrigger('help')}
    ${unnnicSegmentedControlTrigger('about')}
  </UnnnicSegmentedControlList>
  ${unnnicSegmentedControlContent('account')}
  ${unnnicSegmentedControlContent('password')}
  ${unnnicSegmentedControlContent('settings')}
  ${unnnicSegmentedControlContent('help')}
  ${unnnicSegmentedControlContent('about')}
</UnnnicSegmentedControl>
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
      description: 'The size of the triggers in the segmented control',
    },
  },
  args: {
    defaultValue: 'account',
    size: 'medium',
  },
  render: (args) => ({
    components: {
      SegmentedControl,
      SegmentedControlList,
      SegmentedControlTrigger,
      SegmentedControlContent,
    },
    setup() {
      return { args };
    },
    template: `
<SegmentedControl v-bind="args">
  <SegmentedControlList :size="args.size">
    ${segmentedControlTrigger('account')}
    ${segmentedControlTrigger('password')}
    ${segmentedControlTrigger('settings')}
    ${segmentedControlTrigger('help')}
    ${segmentedControlTrigger('about')}
  </SegmentedControlList>
  ${segmentedControlContent('account')}
  ${segmentedControlContent('password')}
  ${segmentedControlContent('settings')}
  ${segmentedControlContent('help')}
  ${segmentedControlContent('about')}
</SegmentedControl>
    `,
  }),
};

export const Default = {
  args: {
    defaultValue: 'account',
  },
};

export const Disabled = {
  parameters: {
    docs: {
      description: {
        story: 'Segmented control with disabled triggers.',
      },
      source: {
        code: `
<UnnnicSegmentedControl>
  <UnnnicSegmentedControlList>
    ${unnnicSegmentedControlTrigger('account')}
    ${unnnicSegmentedControlTrigger('password', true)}
    ${unnnicSegmentedControlTrigger('settings')}
  </UnnnicSegmentedControlList>
  ${unnnicSegmentedControlContent('account')}
  ${unnnicSegmentedControlContent('settings')}
</UnnnicSegmentedControl>
        `,
      },
    },
  },
  render: (args) => ({
    components: {
      SegmentedControl,
      SegmentedControlList,
      SegmentedControlTrigger,
      SegmentedControlContent,
    },
    setup() {
      return { args };
    },
    template: `
      <SegmentedControl v-bind="args">
        <SegmentedControlList :size="args.size">
          ${segmentedControlTrigger('account')}
          ${segmentedControlTrigger('password', true)}
          ${segmentedControlTrigger('settings')}
        </SegmentedControlList>
        ${segmentedControlContent('account')}
        ${segmentedControlContent('settings')}
      </SegmentedControl>
    `,
  }),
};

export const FitContent = {
  parameters: {
    docs: {
      description: {
        story: 'Segmented control with disabled triggers.',
      },
      source: {
        code: `
<div style="width: fit-content;">
  <UnnnicSegmentedControl>
    <UnnnicSegmentedControlList>
      ${unnnicSegmentedControlTrigger('account')}
      ${unnnicSegmentedControlTrigger('password')}
    </UnnnicSegmentedControlList>
    ${unnnicSegmentedControlContent('account')}
    ${unnnicSegmentedControlContent('password')}
  </UnnnicSegmentedControl>
</div>
        `,
      },
    },
  },
  render: (args) => ({
    components: {
      SegmentedControl,
      SegmentedControlList,
      SegmentedControlTrigger,
      SegmentedControlContent,
    },
    setup() {
      return { args };
    },
    template: `
    <div style="width: fit-content;">
      <SegmentedControl v-bind="args">
        <SegmentedControlList :size="args.size">
          ${segmentedControlTrigger('account')}
          ${segmentedControlTrigger('password')}
        </SegmentedControlList>
        ${segmentedControlContent('account')}
        ${segmentedControlContent('password')}
      </SegmentedControl>
    </div>
    `,
  }),
  args: {
    defaultValue: 'account',
  },
};

export const Small = {
  parameters: {
    docs: {
      description: {
        story: 'Segmented control with small triggers.',
      },
      source: {
        code: `
<UnnnicSegmentedControl>
  <UnnnicSegmentedControlList size="small">
    ${unnnicSegmentedControlTrigger('account')}
    ${unnnicSegmentedControlTrigger('password')}
    ${unnnicSegmentedControlTrigger('settings')}
  </UnnnicSegmentedControlList>
  ${unnnicSegmentedControlContent('account')}
  ${unnnicSegmentedControlContent('password')}
  ${unnnicSegmentedControlContent('settings')}
</UnnnicSegmentedControl>
        `,
      },
    },
  },
  render: (args) => ({
    components: {
      SegmentedControl,
      SegmentedControlList,
      SegmentedControlTrigger,
      SegmentedControlContent,
    },
    setup() {
      return { args };
    },
    template: `
      <SegmentedControl v-bind="args">
        <SegmentedControlList :size="args.size">
          ${segmentedControlTrigger('account')}
          ${segmentedControlTrigger('password')}
          ${segmentedControlTrigger('settings')}
        </SegmentedControlList>
        ${segmentedControlContent('account')}
        ${segmentedControlContent('password')}
        ${segmentedControlContent('settings')}
      </SegmentedControl>
    `,
  }),
  args: {
    size: 'small',
  },
};

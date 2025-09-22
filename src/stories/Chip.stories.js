import UnnnicChip from '../components/Chip/Chip.vue';

export default {
  title: 'Data Display/Chip',
  component: UnnnicChip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A simplified compact element used for selection and filtering. 
        Chips are commonly used to display tags, filters, or selectable options 
        with automatic styling based on selection state. They provide a clean 
        and organized way to show multiple related items with clear visual feedback.`,
      },
    },
  },
  args: {
    text: 'Chip Text',
    type: 'single',
    isSelected: false,
    count: null,
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
      description: 'The type of chip - single for basic display, multiple for selection with icons',
    },
    text: {
      control: { type: 'text' },
      description: 'The text content displayed in the chip',
    },
    isSelected: {
      control: { type: 'boolean' },
      description: 'Whether the chip is in selected state (affects styling and icons)',
    },
    count: {
      control: { type: 'number' },
      description: 'Optional count number displayed in the chip',
    },
  },
};

export const Default = {
  args: {
    text: 'Default Chip',
    type: 'single',
  },
};

export const Selected = {
  args: {
    text: 'Selected Chip',
    type: 'single',
    isSelected: true,
  },
};

export const WithCount = {
  args: {
    text: 'Messages',
    type: 'single',
    count: 5,
  },
};

export const WithCountSelected = {
  args: {
    text: 'Selected Messages',
    type: 'single',
    count: 12,
    isSelected: true,
  },
};

export const MultipleType = {
  args: {
    text: 'Multiple Chip',
    type: 'multiple',
    isSelected: false,
  },
};

export const MultipleSelected = {
  args: {
    text: 'Selected Multiple',
    type: 'multiple',
    isSelected: true,
  },
};

export const MultipleWithCount = {
  args: {
    text: 'Items',
    type: 'multiple',
    count: 8,
    isSelected: false,
  },
};

export const MultipleWithCountSelected = {
  args: {
    text: 'Selected Items',
    type: 'multiple',
    count: 15,
    isSelected: true,
  },
};

export const LongText = {
  args: {
    text: 'This is a chip with longer text content',
    type: 'single',
  },
};

export const LongTextSelected = {
  args: {
    text: 'This is a selected chip with longer text',
    type: 'single',
    isSelected: true,
  },
};

// Interactive example showing state changes
export const Interactive = {
  args: {
    text: 'Click to toggle',
    type: 'multiple',
    count: 3,
  },
  render: (args) => ({
    components: { UnnnicChip },
    data() {
      return {
        selected: args.isSelected || false,
      };
    },
    template: `
      <UnnnicChip 
        :text="'${args.text}'"
        :type="'${args.type}'"
        :count="${args.count}"
        :isSelected="selected"
        @click="selected = !selected"
        style="cursor: pointer"
      />
    `,
  }),
};
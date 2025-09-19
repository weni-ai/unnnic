import UnnnicChip from '../components/Chip/Chip.vue';
import iconList from '../utils/iconList';
import colorsList from '../utils/colorsList';

const tealVariations = [
  'teal-50', 'teal-100', 'teal-200', 'teal-300', 'teal-400', 
  'teal-500', 'teal-600', 'teal-700', 'teal-800', 'teal-900', 'teal-950'
];

export default {
  title: 'Data Display/Chip',
  component: UnnnicChip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A compact element used to represent information, attributes, or actions. 
        Chips are commonly used to display tags, filters, or small pieces of information 
        that can be selected or dismissed. They provide a clean and organized way to show 
        multiple related items in a limited space.`,
      },
    },
  },
  args: {
    scheme: 'bg-base',
    text: 'Chip Text',
    count: null,
    icon: null,
  },
  argTypes: {
    scheme: {
      control: { type: 'select' },
      options: ['bg-base', 'bg-soft', ...tealVariations, ...colorsList],
      description: 'The visual scheme of the chip',
    },
    text: {
      control: { type: 'text' },
      description: 'The text content displayed in the chip',
    },
    count: {
      control: { type: 'number' },
      description: 'Optional count number displayed in the chip',
    },
    icon: {
      control: { type: 'select' },
      options: [null, ...iconList],
      description: 'Optional icon displayed in the chip',
    },
  },
};

export const Default = {
  args: {
    text: 'Chip Text',
  },
};

export const WithCount = {
  args: {
    text: 'Messages',
    count: 5,
  },
};

export const WithIcon = {
  args: {
    text: 'Settings',
    icon: 'cog-1',
  },
};

export const WithCountAndIcon = {
  args: {
    text: 'Notifications',
    count: 12,
    icon: 'alarm-bell-2',
  },
};

export const LongText = {
  args: {
    text: 'This is a chip with longer text content',
  },
};

export const OnlyCount = {
  args: {
    text: 'Items',
    count: 999,
  },
};

export const OnlyIcon = {
  args: {
    text: 'Status',
    icon: 'check-circle-1-1',
  },
};

export const BgSoftScheme = {
  args: {
    text: 'Soft Background',
    scheme: 'bg-soft',
    count: 8,
  },
};

export const TealLight = {
  args: {
    text: 'Teal Light',
    scheme: 'teal-100',
    icon: 'information-circle-4',
    count: 2,
  },
};

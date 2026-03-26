import UnnnicIconLoading from '../components/IconLoading/IconLoading.vue';

export default {
  title: 'Progress/IconLoading',
  component: UnnnicIconLoading,
  args: {
    scheme: 'fg-muted',
    size: 'lg',
  },
  argTypes: {
    scheme: {
      control: { type: 'select' },
      options: [
        'fg-base',
        'fg-muted',
        'fg-emphasized',
        'fg-inverted',
        'fg-active',
        'fg-info',
        'fg-success',
        'fg-warning',
        'fg-critical',
      ],
    },
    size: {
      control: { type: 'select' },
      options: [
        'xs',
        'sm',
        'ant',
        'md',
        'lg',
        'xl',
        'avatar-nano',
        'avatar-xs',
        'avatar-sm',
        'avatar-md',
        'avatar-lg',
      ],
    },
  },
};

export const Default = {};

export const CustomScheme = {
  args: {
    scheme: 'fg-accent',
  },
};

export const CustomSize = {
  args: {
    size: '64px',
  },
};

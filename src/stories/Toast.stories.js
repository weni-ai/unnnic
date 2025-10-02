import Toast from '../components/Toast/Toast.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Feedback/Toast',
  component: Toast,
  argTypes: {
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    type: {
      control: 'select',
      options: ['informational', 'attention', 'success', 'error'],
    },
    timeout: {
      control: 'number',
    },
    button: {
      control: 'object',
    },
  },
  render: (args) => ({
    components: { Toast },
    setup() {
      return { args };
    },
    methods: {
      onClose() {
        action('@close')('');
      },
      onDestroy() {
        action('@destroy')('');
      },
    },
    template: `
      <div style="position: relative; height: 50px;">
        <Toast
          v-bind="args"
          @close="onClose"
          @destroy="onDestroy"
        />
      </div>
    `,
  }),
};

export const Informational = {
  args: {
    title: 'Information',
    description: 'This is an informative message for the user.',
    type: 'informational',
    timeout: 5000,
  },
};

export const Attention = {
  args: {
    title: 'Attention',
    description: 'Please verify the data before continuing.',
    type: 'attention',
    timeout: 5000,
  },
};

export const Success = {
  args: {
    title: 'Success!',
    description: 'Your action was completed successfully.',
    type: 'success',
    timeout: 5000,
  },
};

export const Error = {
  args: {
    title: 'Error',
    description: 'An error occurred while processing your request.',
    type: 'error',
    timeout: 5000,
  },
};

export const WithActionButton = {
  args: {
    title: 'New version available',
    description: 'A new version of the system is available for download.',
    type: 'informational',
    timeout: 0,
    button: {
      text: 'Update',
      action: () => {
        alert('Updating...');
      },
    },
  },
};

export const Persistent = {
  args: {
    title: 'Important message',
    description: 'This message will remain visible until manually closed.',
    type: 'attention',
    timeout: 0,
  },
};

export const TitleOnly = {
  args: {
    title: 'Simple message',
    type: 'success',
    timeout: 5000,
  },
};

export const LongText = {
  args: {
    title: 'Document processed',
    description:
      'The document "Annual_Report_2024_Final_Definitive_Complete_Version.pdf" was processed successfully and is available for download in your workspace.',
    type: 'success',
    timeout: 8000,
  },
};

import UnnnicModalDialog from '../components/ModalDialog/ModalDialog.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/ModalDialog',
  component: UnnnicModalDialog,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['success', 'warning', 'attention', ''],
      },
    },
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
    },
    icon: { control: 'text' },
    iconScheme: { control: 'text' },
    title: { control: 'text' },
    showCloseIcon: { control: 'boolean' },
    primaryButtonText: { control: 'text' },
    secondaryButtonText: { control: 'text' },
    primaryButtonType: { control: 'text' },
    showActionsDivider: { control: 'boolean' },
    persistent: { control: 'boolean' },
  },
  args: {
    modelValue: true,
    title: 'Default Modal',
    type: '',
    size: 'md',
    showCloseIcon: true,
    primaryButtonText: 'OK',
  },
};

const Template = (args) => ({
  components: { UnnnicModalDialog },
  setup() {
    return { args };
  },
  template: `
    <unnnic-modal-dialog v-bind="args" @primaryButtonClick="primaryButtonClick" @update:modelValue="updateModelValue">
      <template v-slot>Slot content here</template>
    </unnnic-modal-dialog>
  `,
  methods: {
    primaryButtonClick: action('primaryButtonClick'),
    secondaryButtonClick: action('secondaryButtonClick'),
    updateModelValue: action('update:modelValue'),
  },
});

export const Default = Template.bind({});
Default.args = {
  title: 'Default Modal',
  type: '',
};

export const Warning = Template.bind({});
Warning.args = {
  title: 'Warning Modal',
  type: 'warning',
};

export const Success = Template.bind({});
Success.args = {
  title: 'Success Modal',
  type: 'success',
};

export const Attention = Template.bind({});
Attention.args = {
  title: 'Attention Modal',
  type: 'attention',
};

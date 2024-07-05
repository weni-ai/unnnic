import UnnnicModalDialog from '../components/ModalDialog/ModalDialog.vue';
import { action } from '@storybook/addon-actions';
import iconsList from '../utils/iconList';
import colorsList from '../utils/colorsList';

export default {
  title: 'Example/ModalDialog',
  component: UnnnicModalDialog,
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['', 'success', 'warning', 'attention'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    icon: { options: ['', ...iconsList], control: { type: 'select' } },
    iconScheme: { control: { type: 'select' }, options: ['', ...colorsList] },
    title: { control: 'text' },
    showCloseIcon: { control: 'boolean' },
    primaryButtonText: { control: 'text' },
    secondaryButtonText: { control: 'text' },
    primaryButtonType: {
      control: { type: 'select' },
      options: [
        '',
        'primary',
        'secondary',
        'tertiary',
        'alternative',
        'warning',
        'attention',
      ],
    },
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
    const updateModelValue = (value) => {
      action('update:modelValue')(value);
      args.modelValue = value;
    };
    return { args, updateModelValue };
  },
  template: `
  <div>
    <button @click="updateModelValue(true)">open modal</button>
    <unnnic-modal-dialog v-bind="args" @primaryButtonClick="primaryButtonClick" @secondaryButtonClick="secondaryButtonClick" @update:modelValue="updateModelValue">
      <template v-slot>Slot content here</template>
    </unnnic-modal-dialog>
  </div>
  `,
  methods: {
    primaryButtonClick: action('primaryButtonClick'),
    secondaryButtonClick: action('secondaryButtonClick'),
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

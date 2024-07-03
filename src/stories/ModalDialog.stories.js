import UnnnicModalDialog from '../components/ModalDialog/ModalDialog.vue';
// import UnnnicCallModal from '../components/Modal/CallModal.vue';
import UnnnicButton from '../components/Button/Button.vue';

export default {
  title: 'Example/ModalDialog',
  component: UnnnicModalDialog,
  argTypes: {
    type: {
      options: ['', 'success', 'warning', 'attention'],
      control: {
        type: 'select',
      },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    },
  },
};

export const Normal = {
  render: (args) => ({
    components: { UnnnicModalDialog, UnnnicButton },
    setup() {
      return { args };
    },
    template: `
      <unnnic-modal-dialog v-bind="args">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </unnnic-modal-dialog>
    `,
  }),
  args: {
    title: 'Title',
    primaryButtonText: 'Primary',
    showCloseIcon: true,
    type: 'attention',
  },
};

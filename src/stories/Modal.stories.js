import UnnnicModal from '../components/Modal/Modal.vue';
import UnnnicCallModal from '../components/Modal/CallModal.vue';
import UnnnicButton from '../components/Button/Button.vue';

export default {
  title: 'Example/Modal',
  component: UnnnicModal,
  argTypes: {
    modalIcon: {
      control: {
        type: 'select',
        options: ['check-circle-1-1', 'alert-circle-1', 'delete-1'],
      },
    },
    text: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    scheme: {
      control: {
        type: 'select',
        options: [
          'feedback-red',
          'feedback-green',
          'feedback-yellow',
          'feedback-blue',
          'feedback-grey',
          'aux-blue',
          'aux-purple',
          'aux-orange',
          'aux-lemon',
          'aux-pink',
        ],
      },
    },
  },
};

export const Normal = {
  render: (args) => ({
    components: { UnnnicModal, UnnnicButton },
    setup() {
      return { args };
    },
    template: `
      <unnnic-modal v-bind="args">
        Conteúdo do modal<br>
        Conteúdo do modal<br>
        Conteúdo do modal<br>
        Conteúdo do modal<br>
        Conteúdo do modal<br>
        Conteúdo do modal<br>
        Conteúdo do modal<br>
      </unnnic-modal>
    `,
  }),
  args: {
    text: 'Title text',
    description: 'Message body',
    alertMessage: 'Message alert',
    closeIcon: true,
    showModal: true,
  },
};
export const Buttons = {
  render: (args) => ({
    components: { UnnnicModal, UnnnicButton },
    setup() {
      return { args };
    },
    template: `
      <unnnic-modal v-bind="args">
        <template #message>
          <span>Modal with Buttons</span>
        </template>
        <template #options>
          <unnnic-button> Button 1 </unnnic-button> 
          <unnnic-button > Button 2 </unnnic-button>
        </template>
      </unnnic-modal>
    `,
  }),
  args: {
    text: 'Title text',
    description: 'Message body',
    alertMessage: 'Message alert',
    closeIcon: true,
    showModal: true,
  },
};

export const Call = {
  render: (args) => ({
    components: { UnnnicCallModal },
    setup() {
      return { args };
    },
    template: `
      <unnnic-call-modal />
    `,
  }),
  args: {},
};

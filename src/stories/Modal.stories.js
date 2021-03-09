import unnnicModal from '../components/Modal/Modal.vue';
import unnnicCallModal from '../components/Modal/CallModal.vue';
import unnnicButton from '../components/Button/Button.vue';

export default {
  title: 'Example/Modal',
  component: unnnicModal,
  argTypes: {
    modalIcon: { control: { type: 'select', options: ['check-circle-1-1', 'alert-circle-1', 'delete-1'] } },
    text: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    scheme: {
      control: {
        type: 'select',
        options: ['feedback-red', 'feedback-green', 'feedback-yellow', 'feedback-blue', 'feedback-grey',
          'aux-blue', 'aux-purple', 'aux-orange', 'aux-lemon', 'aux-pink'],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicModal, unnnicButton },
  template: '<unnnicModal v-bind="$props" />',
});

const ModalTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicModal, unnnicButton },
  template: '<unnnicModal v-bind="$props"><unnnic-button slot="options"> Button 1 </unnnic-button> <unnnic-button slot="options"> Button 2 </unnnic-button> </div> </unnnic-modal>',
});

export const Normal = Template.bind({});
Normal.args = {
  text: 'Title text',
  description: 'Message body',
  alertMessage: 'Message alert',
  closeIcon: true,
  showModal: true,
};

export const Buttons = ModalTemplate.bind({});
Buttons.args = {
  text: 'Title text',
  description: 'Message body',
  alertMessage: 'Message alert',
  closeIcon: true,
  showModal: true,
};

const CallTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicCallModal },
  template: '<unnnic-call-modal />',
});

export const Call = CallTemplate.bind({});

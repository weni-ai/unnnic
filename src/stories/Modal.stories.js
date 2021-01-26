import unnicModal from '../components/Modal/Modal.vue';
import unnicButton from '../components/Button/Button.vue';

export default {
  title: 'Example/Modal',
  component: unnicModal,
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
  components: { unnicModal, unnicButton },
  template: '<unnicModal v-bind="$props" />',
});

const ButtonTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnicModal, unnicButton },
  template: '<unnicModal v-bind="$props"><unnic-button slot="options"> Button 1 </unnic-button> <unnic-button slot="options"> Button 2 </unnic-button> </div> </unnic-modal>',
});

export const Normal = Template.bind({});
Normal.args = {
  text: 'Title text',
  description: 'Message body',
  alertMessage: 'Message alert',
  closeIcon: true,
  hasAlertMessage: true,
  hasButton: false,
  showModal: true,
};

export const Buttons = ButtonTemplate.bind({});
Buttons.args = {
  text: 'Title text',
  description: 'Message body',
  alertMessage: 'Message alert',
  closeIcon: true,
  hasAlertMessage: true,
  hasButton: false,
  showModal: true,
};

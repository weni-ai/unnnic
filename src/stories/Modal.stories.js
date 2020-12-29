import unnicModal from '../components/Modal/Modal.vue';
import unnicButton from '../components/Button/Button.vue';

export default {
  title: 'Example/Modal',
  component: unnicModal,
  argTypes: {
    modalIcon: { control: { type: 'select', options: ['check-circle-1-1', 'alert-circle-1', 'delete-1'] } },
    text: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnicModal, unnicButton },
  template: '<unnicModal v-bind="$props" />',
});

export const Normal = Template.bind({});
Normal.args = {
  text: 'Title text',
  description: 'Message body',
  alertMessage: 'Message alert',
  closeIcon: true,
  hasAlertMessage: true,
  hasButton: false,
};

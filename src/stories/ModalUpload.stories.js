import unnnicModalUpload from '../components/ModalUpload/ModalUpload.vue';

export default {
  title: 'example/ModalUpload',
  component: unnnicModalUpload,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicModalUpload,
  },

  data() {
    return {};
  },

  template: `
    <div>
      <unnnic-modal-upload v-bind="$props" />
    </div>
  `,
});

export const Default = Template.bind({});

Default.args = {};

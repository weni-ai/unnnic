import unnnicTextEditor from '../components/TextEditor/TextEditor.vue';

export default {
  title: 'Form/TextEditor',
  component: unnnicTextEditor,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicTextEditor,
  },

  data() {
    return {
      content: '',
    };
  },

  template: `
    <div>
      <unnnic-text-editor v-bind="$props" v-model="content">
        <template slot="attachment-options">
          Attach
        </template>

        <template slot="footer-input">
          Audio Component
        </template>
      </unnnic-text-editor>
    </div>
  `,

  methods: {},
});

export const Default = Template.bind({});

Default.args = {
  texts: {
    Undo: 'Undo',
    Redo: 'Redo',
    RecordAudio: 'Record Audio',
    Bold: 'Bold',
    Italic: 'Italic',
    Underline: 'Underline',
    List: 'List',
    Left: 'Left',
    Center: 'Center',
    Right: 'Right',
    Justify: 'Justify',
    Attach: 'Attach',
    action: 'Mensagens rápidas',
  },
};

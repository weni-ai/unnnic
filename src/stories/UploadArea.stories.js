import i18n from '../utils/plugins/i18n';
import unnnicUploadArea from '../components/UploadArea/UploadArea.vue';

export default {
  title: 'Example/UploadArea',
  component: unnnicUploadArea,
  argTypes: {
    acceptMultiple: { control: { type: 'boolean' } },
    supportedFormats: { control: { type: 'text' } },
    maximumUploads: { control: { type: 'number' } },
    filesProgress: { control: { type: 'array' } },
    isUploading: { control: { type: 'boolean' } },
    canImport: { control: { type: 'boolean' } },
    canDelete: { control: { type: 'boolean' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicUploadArea },
  data() {
    return {
      files: [],
    };
  },
  methods: {
    addFile(event) {
      this.files = Array.from(event.target.files);
      console.log('files:', this.files);
    },
    handleFileChange(files) {
      this.files = files;
      console.log('handle', files);
    },
  },
  template:
    '<div><unnnic-upload-area v-model="files" @fileChange="handleFileChange" v-bind="$props" /> <input type="file" @change="addFile"/></div>',
  i18n,
});

export const Default = Template.bind({});
Default.args = {
  acceptMultiple: true,
  supportedFormats: '.png,.jpeg',
  maximumUploads: 2,
  filesProgress: [20, 30, 40],
  isUploading: false,
  canImport: true,
  canDelete: true,
  maxFileSize: 10,
};

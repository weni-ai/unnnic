import UnnnicTemplatePreview from '../components/TemplatePreview/TemplatePreview.vue';

export default {
  title: 'example/TemplatePreview',
  tags: ['autodocs'],
  component: UnnnicTemplatePreview,
};

const Template = (args) => ({
  components: { UnnnicTemplatePreview },
  setup() {
    return { args };
  },
  template: `
      <unnnic-template-preview v-bind="args" />
    `,
});

const bodyText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sem orci, ultrices id lectus non, vehicula suscipit libero. Ut vehicula libero a tempus fringilla. Nam tincidunt vestibulum maximus. Morbi vel pretium risus. Curabitur id quam lectus. Quisque dolor elit, auctor a lacus non, rutrum ullamcorper mi. Nulla et turpis sed eros pharetra ullamcorper fermentum ac nisl. Donec lacinia hendrerit tellus, sit amet suscipit velit vestibulum sed. Praesent gravida posuere metus, ut fringilla dolor euismod vel. Aenean vel ipsum magna. Integer metus mi, fermentum ut nulla at, facilisis lobortis metus. Ut vitae tortor posuere, dapibus leo quis, finibus neque.';

export const Default = Template.bind({});
Default.args = {
  template: {
    header: {
      type: 'TEXT',
      text: 'Hello, world!',
    },
    footer: 'Weni by VTEX',
    buttons: [
      {
        text: 'Button 1',
        type: 'PHONE_NUMBER',
      },
      {
        text: 'Button 2',
        type: 'URL',
      },
      {
        text: 'Button 3',
        type: 'QUICK_REPLY',
      },
    ],
    body: bodyText,
  },
};

export const Image = Template.bind({});
Image.args = {
  template: {
    header: {
      type: 'MEDIA',
      mediaType: 'IMAGE',
    },
    footer: 'Weni by VTEX',
    body: bodyText,
  },
};

export const Video = Template.bind({});
Video.args = {
  template: {
    header: {
      type: 'MEDIA',
      mediaType: 'VIDEO',
    },
    buttons: [
      {
        text: 'Button 1',
        type: 'PHONE_NUMBER',
      },
      {
        text: 'Button 2',
        type: 'URL',
      },
      {
        text: 'Button 3',
        type: 'QUICK_REPLY',
      },
    ],
  },
};

export const Document = Template.bind({});
Document.args = {
  template: {
    header: {
      type: 'MEDIA',
      mediaType: 'DOCUMENT',
    },
    footer: 'Weni by VTEX',
    body: bodyText,
  },
};

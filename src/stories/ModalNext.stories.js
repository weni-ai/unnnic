import unnnicModalNext from '../components/ModalNext/ModalNext.vue';
import icons from '../utils/icons';

const iconsOptions = Object.keys(icons);

const schemesOptions = [
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
  'brand-weni',
  'brand-weni-soft',
  'neutral-clean',
  'neutral-cleanest',
  'neutral-dark',
  'neutral-soft',
  'neutral-darkest',
];

export default {
  title: 'Example/ModalNext',
  component: unnnicModalNext,
  argTypes: {
    type: { control: { type: 'select', options: ['default', 'video', 'alert'] } },
    icon: { control: { type: 'select', options: iconsOptions } },
    scheme: { control: { type: 'select', options: schemesOptions } },
    text: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    actionPrimaryButtonType: { control: { type: 'select', options: ['primary', 'secondary'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicModalNext },
  data() {
    return {
      open: false,
    };
  },
  template: `<div>
  <button @click="open = true">Open</button>
  <unnnic-modal-next v-show="open" v-bind="$props" @close="open = false" />
</div>`,
});

export const Video = Template.bind({});
Video.args = {
  type: 'video',
  url: 'https://www.youtube.com/embed/J9QJBPrmoHs',
  confirmButtonType: undefined,
};

const TemplateDefault = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicModalNext },
  data() {
    return {
      open: false,
    };
  },
  template: `<div>
  <button @click="open = true">Open</button>
  <unnnic-modal-next v-show="open" v-bind="$props" @close="open = false">
    <template>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
      This is the info content<br>
    </template>
  </unnnic-modal-next>
</div>`,
});

export const Default = TemplateDefault.bind({});
Default.args = {
  type: undefined,
  confirmButtonType: undefined,
};

export const Alert = TemplateDefault.bind({});
Alert.args = {
  type: 'alert',
  icon: 'add-1',
  scheme: 'feedback-green',
  title: 'Title',
  description: 'Description',
  confirmButtonType: undefined,
};

const TemplateAlertWithSlots = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicModalNext },
  data() {
    return {
      open: false,
    };
  },
  template: `<div>
  <button @click="open = true">Open</button>
  <unnnic-modal-next v-show="open" v-bind="$props" @close="open = false">
    <template slot="title">
      Title Slot
    </template>

    <template slot="description">
      Description Slot
    </template>
  </unnnic-modal-next>
</div>`,
});

export const AlertWithSlots = TemplateAlertWithSlots.bind({});
AlertWithSlots.args = {
  type: 'alert',
  icon: 'add-1',
  scheme: 'feedback-green',
  confirmButtonType: undefined,
};

export const AlertWithValidate = TemplateDefault.bind({});
AlertWithValidate.args = {
  type: 'alert',
  icon: 'add-1',
  scheme: 'feedback-red',
  title: 'Title',
  description: 'Description',
  confirmButtonType: undefined,
  validate: 'Hello World!',
  validatePlaceholder: 'Validate Placeholder',
  validateLabel: 'Validate <b>Label</b>',
  actionPrimaryLabel: 'Confirm',
  actionSecondaryLabel: 'Cancel',
};

export const AlertWithActionButtons = TemplateDefault.bind({});
AlertWithActionButtons.args = {
  type: 'alert',
  icon: 'add-1',
  scheme: 'feedback-red',
  title: 'Title',
  description: 'Description',
  confirmButtonType: undefined,
  actionPrimaryLabel: 'Confirm',
  actionSecondaryLabel: 'Cancel',
  actionPrimaryButtonType: undefined,
  showCloseButton: true,
};

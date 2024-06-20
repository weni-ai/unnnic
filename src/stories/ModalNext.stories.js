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
    type: {
      control: { type: 'select', options: ['default', 'video', 'alert'] },
    },
    icon: { control: { type: 'select', options: iconsOptions } },
    scheme: { control: { type: 'select', options: schemesOptions } },
    text: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    actionPrimaryButtonType: {
      control: { type: 'select', options: ['primary', 'secondary'] },
    },
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    data() {
      return {
        open: false,
      };
    },
    components: { unnnicModalNext },
    template: `
      <div>
        <button @click="open = true">Open</button>
        <unnnic-modal-next v-show="open" v-bind="args" @close="open = false">

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
        </unnnic-modal-next>
      </div>
    `,
  }),
};

export const Video = {
  render: (args) => ({
    setup() {
      return { args };
    },
    data() {
      return {
        open: false,
      };
    },
    components: { unnnicModalNext },
    template: `
      <div>
        <button @click="open = true">Open</button>
        <unnnic-modal-next v-show="open" v-bind="args" @close="open = false" />
      </div>
    `,
  }),
  args: {
    type: 'video',
    url: 'https://www.youtube.com/embed/J9QJBPrmoHs',
    confirmButtonType: undefined,
  },
};

export const Default = {
  args: {
    type: undefined,
    confirmButtonType: undefined,
  },
};

export const Alert = {
  args: {
    type: 'alert',
    icon: 'add-1',
    scheme: 'feedback-green',
    title: 'Title',
    description: 'Description',
    confirmButtonType: undefined,
  },
};

export const AlertWithSlots = {
  render: (args) => ({
    setup() {
      return { args };
    },
    data() {
      return {
        open: false,
      };
    },
    components: { unnnicModalNext },
    template: `
      <div>
        <button @click="open = true">Open</button>
        <unnnic-modal-next v-show="open" v-bind="args" @close="open = false">
          <template #title>
            Title Slot
          </template>

          <template #description>
            Description Slot
          </template>
        </unnnic-modal-next>
      </div>
    `,
  }),
  args: {
    type: 'alert',
    icon: 'add-1',
    scheme: 'feedback-green',
    confirmButtonType: undefined,
  },
};

export const AlertWithValidate = {
  args: {
    type: 'alert',
    icon: 'add-1',
    scheme: 'feedback-red',
    title: 'Title',
    description: 'Description',
    confirmButtonType: undefined,
    validate: 'Hello World!',
    validatePlaceholder: 'Validate Placeholder',
    validateLabel: 'Validate <b>Hello World!</b>',
    actionPrimaryLabel: 'Confirm',
    actionSecondaryLabel: 'Cancel',
  },
};

export const AlertWithActionButtons = {
  args: {
    type: 'alert',
    icon: 'add-1',
    scheme: 'feedback-red',
    title: 'Title',
    description: 'Description',
    confirmButtonType: undefined,
    actionPrimaryLabel: 'Confirm',
    actionSecondaryLabel: 'Cancel',
    showCloseButton: true,
    onClickActionSecondary: () => console.log('secondary click'),
    onClickActionPrimary: () => console.log('primary click'),
  },
};

import UnnnicModalDialog from '../components/ModalDialog/ModalDialog.vue';
import UnnnicInput from '../components/Input/Input.vue';
import UnnnicLabel from '../components/Label/Label.vue';

import { action } from '@storybook/addon-actions';
import iconsList from '../utils/iconList';
import colorsList from '../utils/colorsList';

export default {
  title: 'Example/ModalDialog',
  component: UnnnicModalDialog,
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['', 'success', 'warning', 'attention'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    icon: { options: ['', ...iconsList], control: { type: 'select' } },
    iconScheme: { control: { type: 'select' }, options: ['', ...colorsList] },
    title: { control: 'text' },
    showCloseIcon: { control: 'boolean' },
    primaryButtonText: { control: 'text' },
    hideButtonText: { control: 'boolean' },
    secondaryButtonText: { control: 'text' },
    primaryButtonType: {
      control: { type: 'select' },
      options: [
        '',
        'primary',
        'secondary',
        'tertiary',
        'alternative',
        'warning',
        'attention',
      ],
    },
    showActionsDivider: { control: 'boolean' },
    persistent: { control: 'boolean' },
    primaryButtonProps: { control: 'object' },
    secondaryButtonProps: { control: 'object' },
  },
  args: {
    modelValue: false,
    title: 'Default Modal',
    type: '',
    size: 'md',
    showCloseIcon: true,
    primaryButtonText: 'OK',
  },
};

const Template = (args) => ({
  components: { UnnnicModalDialog },
  setup() {
    const updateModelValue = (value) => {
      action('update:modelValue')(value);
      args.modelValue = value;
    };
    return { args, updateModelValue };
  },
  template: `
  <div>
    <button @click="updateModelValue(true)">Open Modal</button>
    <unnnic-modal-dialog v-bind="args" @primaryButtonClick="primaryButtonClick" @secondaryButtonClick="secondaryButtonClick" @update:modelValue="updateModelValue">
      <template v-slot>Slot content here</template>
    </unnnic-modal-dialog>
  </div>
  `,
  methods: {
    primaryButtonClick: action('primaryButtonClick'),
    secondaryButtonClick: action('secondaryButtonClick'),
  },
});

const TemplateOverflowed = (args) => ({
  components: { UnnnicModalDialog },
  setup() {
    const updateModelValue = (value) => {
      action('update:modelValue')(value);
      args.modelValue = value;
    };
    return { args, updateModelValue };
  },
  template: `
  <div>
    <button @click="updateModelValue(true)">Open Modal</button>
    <unnnic-modal-dialog v-bind="args" @primaryButtonClick="primaryButtonClick" @secondaryButtonClick="secondaryButtonClick" @update:modelValue="updateModelValue">
      <p style="margin: 0;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non gravida velit. Mauris feugiat bibendum elit, ac semper tortor tempor quis. Maecenas ullamcorper condimentum ligula. Proin a rutrum enim. Nulla egestas porttitor congue. Suspendisse maximus, ante finibus aliquet hendrerit, metus nulla eleifend justo, et venenatis augue justo id ligula. Aenean convallis massa ligula, at scelerisque metus elementum at. Nulla facilisi. Integer imperdiet bibendum hendrerit. Etiam lobortis congue commodo. In dapibus odio sapien, ac volutpat lorem porta at.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non gravida velit. Mauris feugiat bibendum elit, ac semper tortor tempor quis. Maecenas ullamcorper condimentum ligula. Proin a rutrum enim. Nulla egestas porttitor congue. Suspendisse maximus, ante finibus aliquet hendrerit, metus nulla eleifend justo, et venenatis augue justo id ligula. Aenean convallis massa ligula, at scelerisque metus elementum at. Nulla facilisi. Integer imperdiet bibendum hendrerit. Etiam lobortis congue commodo. In dapibus odio sapien, ac volutpat lorem porta at.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non gravida velit. Mauris feugiat bibendum elit, ac semper tortor tempor quis. Maecenas ullamcorper condimentum ligula. Proin a rutrum enim. Nulla egestas porttitor congue. Suspendisse maximus, ante finibus aliquet hendrerit, metus nulla eleifend justo, et venenatis augue justo id ligula. Aenean convallis massa ligula, at scelerisque metus elementum at. Nulla facilisi. Integer imperdiet bibendum hendrerit. Etiam lobortis congue commodo. In dapibus odio sapien, ac volutpat lorem porta at.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non gravida velit. Mauris feugiat bibendum elit, ac semper tortor tempor quis. Maecenas ullamcorper condimentum ligula. Proin a rutrum enim. Nulla egestas porttitor congue. Suspendisse maximus, ante finibus aliquet hendrerit, metus nulla eleifend justo, et venenatis augue justo id ligula. Aenean convallis massa ligula, at scelerisque metus elementum at. Nulla facilisi. Integer imperdiet bibendum hendrerit. Etiam lobortis congue commodo. In dapibus odio sapien, ac volutpat lorem porta at.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non gravida velit. Mauris feugiat bibendum elit, ac semper tortor tempor quis. Maecenas ullamcorper condimentum ligula. Proin a rutrum enim. Nulla egestas porttitor congue. Suspendisse maximus, ante finibus aliquet hendrerit, metus nulla eleifend justo, et venenatis augue justo id ligula. Aenean convallis massa ligula, at scelerisque metus elementum at. Nulla facilisi. Integer imperdiet bibendum hendrerit. Etiam lobortis congue commodo. In dapibus odio sapien, ac volutpat lorem porta at.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non gravida velit. Mauris feugiat bibendum elit, ac semper tortor tempor quis. Maecenas ullamcorper condimentum ligula. Proin a rutrum enim. Nulla egestas porttitor congue. Suspendisse maximus, ante finibus aliquet hendrerit, metus nulla eleifend justo, et venenatis augue justo id ligula. Aenean convallis massa ligula, at scelerisque metus elementum at. Nulla facilisi. Integer imperdiet bibendum hendrerit. Etiam lobortis congue commodo. In dapibus odio sapien, ac volutpat lorem porta at.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non gravida velit. Mauris feugiat bibendum elit, ac semper tortor tempor quis. Maecenas ullamcorper condimentum ligula. Proin a rutrum enim. Nulla egestas porttitor congue. Suspendisse maximus, ante finibus aliquet hendrerit, metus nulla eleifend justo, et venenatis augue justo id ligula. Aenean convallis massa ligula, at scelerisque metus elementum at. Nulla facilisi. Integer imperdiet bibendum hendrerit. Etiam lobortis congue commodo. In dapibus odio sapien, ac volutpat lorem porta at.</p>
    </unnnic-modal-dialog>
  </div>
  `,
  methods: {
    primaryButtonClick: action('primaryButtonClick'),
    secondaryButtonClick: action('secondaryButtonClick'),
  },
});

const TemplateForm = (args) => ({
  components: { UnnnicModalDialog, UnnnicLabel, UnnnicInput },
  setup() {
    const updateModelValue = (value) => {
      action('update:modelValue')(value);
      args.modelValue = value;
    };
    return { args, updateModelValue };
  },
  template: `
  <div>
    <button @click="updateModelValue(true)">Open Modal</button>
    <unnnic-modal-dialog v-bind="args" @primaryButtonClick="primaryButtonClick" @secondaryButtonClick="secondaryButtonClick" @update:modelValue="updateModelValue">
      <p style="margin-top: 0;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non gravida velit. Mauris feugiat bibendum elit, ac semper tortor tempor quis.</p>
      <form>
        <UnnnicLabel label="Label"></UnnnicLabel>
        <UnnnicInput placeholder="Placeholder"></UnnnicInput>
        <UnnnicLabel label="Label"></UnnnicLabel>
        <UnnnicInput placeholder="Placeholder"></UnnnicInput>
        <UnnnicLabel label="Label"></UnnnicLabel>
        <UnnnicInput placeholder="Placeholder"></UnnnicInput>
      </form>
    </unnnic-modal-dialog>
  </div>
  `,
  methods: {
    primaryButtonClick: action('primaryButtonClick'),
    secondaryButtonClick: action('secondaryButtonClick'),
  },
});

const TemplateImage = (args) => ({
  components: { UnnnicModalDialog },
  setup() {
    const updateModelValue = (value) => {
      action('update:modelValue')(value);
      args.modelValue = value;
    };
    return { args, updateModelValue };
  },
  template: `
  <div>
    <button @click="updateModelValue(true)">Open Modal</button>
    <unnnic-modal-dialog v-bind="args" @primaryButtonClick="primaryButtonClick" @secondaryButtonClick="secondaryButtonClick" @update:modelValue="updateModelValue">
      <section style="display: flex; flex-direction: column; align-items: center; gap: 24px">
        <img height='120' width='120' src="./doris.png"/>
        <section style="display: flex; flex-direction: column; justify-content: center; align-items: center">
          <h1 style="font-family: 'Lato'; font-size: 20px; font-weight: 900; line-height: 28px; padding: 0; margin: 0; color:#3B414D">Title</h1>
          <p style="text-align: center;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
        </section>
      </section>
    </unnnic-modal-dialog>
  </div>
  `,
  methods: {
    primaryButtonClick: action('primaryButtonClick'),
    secondaryButtonClick: action('secondaryButtonClick'),
  },
});

const TemplateLeftSidebar = (args) => ({
  components: { UnnnicModalDialog },
  setup() {
    const updateModelValue = (value) => {
      action('update:modelValue')(value);
      args.modelValue = value;
    };
    return { args, updateModelValue };
  },
  template: `
  <div>
    <button @click="updateModelValue(true)">Open Modal</button>
    <unnnic-modal-dialog v-bind="args" @primaryButtonClick="primaryButtonClick" @secondaryButtonClick="secondaryButtonClick" @update:modelValue="updateModelValue">
      <template #leftSidebar>
        <section style="width: 250px">
          Hi from Left Sidebar
        </section>
      </template>

      <template v-slot>Slot content here</template>
    </unnnic-modal-dialog>
  </div>
  `,
  methods: {
    primaryButtonClick: action('primaryButtonClick'),
    secondaryButtonClick: action('secondaryButtonClick'),
  },
});

export const Default = Template.bind({});
Default.args = {
  title: 'Default Modal',
  type: '',
  primaryButtonProps: {
    text: 'Confirm',
  },
};

export const WithLeftSidebar = TemplateLeftSidebar.bind({});
WithLeftSidebar.args = {
  title: 'With Left Sidebar Modal',
  type: '',
  primaryButtonProps: {
    text: 'Confirm',
  },
  hideSecondaryButton: true,
};

export const Warning = Template.bind({});
Warning.args = {
  title: 'Warning Modal',
  type: 'warning',
  primaryButtonProps: {
    text: 'Confirm',
  },
};

export const Success = Template.bind({});
Success.args = {
  title: 'Success Modal',
  type: 'success',
  primaryButtonProps: {
    text: 'Confirm',
  },
};

export const Attention = Template.bind({});
Attention.args = {
  title: 'Attention Modal',
  type: 'attention',
  primaryButtonProps: {
    text: 'Confirm',
  },
};

export const Overflowed = TemplateOverflowed.bind({});
Overflowed.args = {
  title: 'Overflowed Modal',
  type: '',
  primaryButtonProps: {
    text: 'Confirm',
  },
};

export const Form = TemplateForm.bind({});
Form.args = {
  title: 'Form Modal',
  type: '',
  showActionsDivider: true,
  persistent: true,
  primaryButtonProps: {
    text: 'Confirm',
  },
  secondaryButtonProps: {
    text: 'Disabled Button',
    disabled: true,
  },
};

export const Image = TemplateImage.bind({});
Image.args = {
  title: '',
  type: '',
  primaryButtonProps: {
    text: 'Confirm',
  },
  showActionsDivider: true,
};

import UnnnicModalDialog from '../components/ModalDialog/ModalDialog.vue';
import UnnnicInput from '../components/Input/Input.vue';
import UnnnicLabel from '../components/Label/Label.vue';
import UnnnicInputDatePicker from '../components/InputDatePicker/InputDatePicker.vue';
import UnnnicSwitch from '../components/Switch/Switch.vue';
import UnnnicButton from '../components/Button/Button.vue';
import UnnnicTag from '../components/Tag/Tag.vue';

import { action } from '@storybook/addon-actions';
import iconsList from '../utils/iconList';
import colorsList from '../utils/colorsList';

export default {
  title: 'Feedback/ModalDialog',
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

    hideButtonText: { control: 'boolean' },

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

const TemplateWithDatePicker = (args) => ({
  components: {
    UnnnicModalDialog,
    UnnnicInputDatePicker,
    UnnnicSwitch,
    UnnnicButton,
  },
  setup() {
    const updateModelValue = (value) => {
      action('update:modelValue')(value);
      args.modelValue = value;
    };
    return { args, updateModelValue };
  },
  data() {
    return {
      forms: [{ date: { start: null, end: null }, repeat: false }],
      isLoading: false,
    };
  },
  template: `
  <div>
    <button @click="updateModelValue(true)">Open Modal with DatePicker</button>
    <unnnic-modal-dialog 
      v-bind="args" 
      @primaryButtonClick="handleSave" 
      @secondaryButtonClick="secondaryButtonClick" 
      @update:modelValue="updateModelValue"
    >
      <section style="display: flex; flex-direction: column; gap: 16px;">
        <section 
          v-for="(form, index) in forms"
          :key="index"
          style="display: flex; flex-direction: column; gap: 12px; padding: 16px; border: 1px solid #E2E6ED; border-radius: 8px;"
        >
          <section style="display: flex; flex-direction: column; gap: 8px;">
            <p style="font-family: 'Lato'; font-size: 14px; font-weight: 600; margin: 0; color: #3B414D;">
              Select date or period
            </p>
            <UnnnicInputDatePicker
              v-model="form.date"
              :options="[{ id: 'custom', name: 'Custom' }]"
              next
              fillW
              actionText="Confirm"
              disableClear
            />
          </section>
          <UnnnicSwitch
            v-model="form.repeat"
            textRight="Repeat annually"
            size="small"
          />
        </section>
        <UnnnicButton
          iconCenter="add-1"
          type="tertiary"
          text="Add"
          @click="addForm"
        />
      </section>
    </unnnic-modal-dialog>
  </div>
  `,
  methods: {
    primaryButtonClick: action('primaryButtonClick'),
    secondaryButtonClick: action('secondaryButtonClick'),
    handleSave() {
      action('primaryButtonClick')();
      action('save')(this.forms);
      console.log('Forms data:', this.forms);
    },
    addForm() {
      this.forms.push({ date: { start: null, end: null }, repeat: false });
      action('addForm')();
    },
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

export const WithDatePicker = TemplateWithDatePicker.bind({});
WithDatePicker.args = {
  title: 'Add Non-Working Dates',
  type: '',
  primaryButtonProps: {
    text: 'Save',
    loading: false,
  },
  secondaryButtonProps: {
    text: 'Cancel',
  },
};

const TemplateCustomTitleSlot = (args) => ({
  components: { UnnnicModalDialog, UnnnicTag, UnnnicButton },
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
    <unnnic-modal-dialog
      v-bind="args"
      @primaryButtonClick="primaryButtonClick"
      @secondaryButtonClick="secondaryButtonClick"
      @update:modelValue="updateModelValue"
    >
      <template #title>
        <span style="display: flex; align-items: center; gap: 8px;">
          Custom Title
          <UnnnicTag text="New" scheme="feedback-green" />
        </span>
      </template>
      <p style="margin: 0;">This modal uses the <strong>title slot</strong> instead of the title prop, allowing you to add custom components like tags, buttons, or icons inside the title area.</p>
    </unnnic-modal-dialog>
  </div>
  `,
  methods: {
    primaryButtonClick: action('primaryButtonClick'),
    secondaryButtonClick: action('secondaryButtonClick'),
  },
});

export const CustomTitleSlot = TemplateCustomTitleSlot.bind({});
CustomTitleSlot.args = {
  type: '',
  showCloseIcon: true,
  primaryButtonProps: {
    text: 'Confirm',
  },
};

const TemplateCustomTitleWithButtons = (args) => ({
  components: { UnnnicModalDialog, UnnnicButton },
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
    <unnnic-modal-dialog
      v-bind="args"
      @primaryButtonClick="primaryButtonClick"
      @secondaryButtonClick="secondaryButtonClick"
      @update:modelValue="updateModelValue"
    >
      <template #title>
        <span style="display: flex; align-items: center; gap: 8px;">
          Settings
          <UnnnicButton type="tertiary" iconCenter="help" size="small" />
        </span>
      </template>
      <p style="margin: 0;">This modal demonstrates a title with an inline help button using the <strong>title slot</strong>.</p>
    </unnnic-modal-dialog>
  </div>
  `,
  methods: {
    primaryButtonClick: action('primaryButtonClick'),
    secondaryButtonClick: action('secondaryButtonClick'),
  },
});

export const CustomTitleWithButton = TemplateCustomTitleWithButtons.bind({});
CustomTitleWithButton.args = {
  type: '',
  showCloseIcon: true,
  primaryButtonProps: {
    text: 'Save',
  },
  secondaryButtonProps: {
    text: 'Cancel',
  },
};

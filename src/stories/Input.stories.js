import unnnicFormElement from '../components/FormElement/FormElement.vue';
import unnnicInput from '../components/Input/Input.vue';
import iconList from '../utils/iconList';

export default {
  title: 'Form/Input',
  component: unnnicInput,
  argTypes: {
    label: { control: { type: 'text' } },
    size: { control: { type: 'select' }, options: ['md', 'sm'] },
    type: { control: { type: 'select' }, options: ['normal', 'error'] },
    nativeType: { control: { type: 'select' }, options: ['text', 'password'] },
    placeholder: { control: { type: 'text' } },
    iconLeft: { control: { type: 'select' }, options: iconList },
    iconRight: { control: { type: 'select' }, options: iconList },
    allowTogglePassword: { control: { type: 'boolean' } },
    hasCloudyColor: { control: { type: 'select' }, options: [true, false] },
  },
  render: (args) => ({
    components: {
      unnnicInput,
      unnnicFormElement,
    },
    setup() {
      return { args };
    },
    data() {
      return {
        value: '',
      };
    },
    methods: {
      click() {
        alert('click');
      },
    },
    template: `
        <unnnic-input v-model="value" @icon-right-click="click" v-bind="args" label="Label" />
    `,
  }),
};

const TemplateError = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicFormElement,
    unnnicInput,
  },

  setup() {
    return { args };
  },

  data() {
    return {
      value: '',
    };
  },

  template: `
    <unnnic-form-element label="Label" error="Error text">
      <unnnic-input v-model="value" v-bind="args"/>
    </unnnic-form-element>
  `,
});

const TemplateDisabled = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicFormElement,
    unnnicInput,
  },

  setup() {
    return { args };
  },

  data() {
    return {
      value: '',
    };
  },

  template: `
    <unnnic-form-element label="Label" message="Helper text" disabled>
      <unnnic-input v-model="value" v-bind="args"/>
    </unnnic-form-element>
  `,
});

export const Normal = {
  args: {
    type: 'normal',
    placeholder: 'Placeholder',
  },
};

export const NormalSm = {
  args: {
    size: 'sm',
    type: 'normal',
    placeholder: 'Placeholder',
  },
};

export const Error = TemplateError.bind({});
Error.args = {
  type: 'error',
  placeholder: 'Placeholder',
};

export const ErrorSm = TemplateError.bind({});
ErrorSm.args = {
  size: 'sm',
  type: 'error',
  placeholder: 'Placeholder',
};

export const Disabled = TemplateDisabled.bind({});
Disabled.args = {
  disabled: true,
  placeholder: 'Placeholder',
};

export const DisabledSm = TemplateDisabled.bind({});
DisabledSm.args = {
  size: 'sm',
  disabled: true,
  placeholder: 'Placeholder',
};

export const Password = {
  args: {
    placeholder: 'Password',
    nativeType: 'password',
    allowTogglePassword: true,
  },
};

export const IconLeftAndRight = {
  args: {
    placeholder: 'Text',
    iconLeft: 'email',
    iconRight: 'search',
    iconRightClickable: true,
  },
};

export const Mask = {
  args: {
    label: 'CPF or CNPJ',
    placeholder: 'Text',
    mask: ['###.###.###-##', '##.###.###/####-##'],
  },

};

export const LimitMaxLength = {
  args: {
    placeholder: 'Text',
    maxlength: 10,
    showMaxlengthCounter: true,
  },
};

export const WithTooltip = {
  args: {
    placeholder: 'Text',
    tooltip: 'Tooltip',
  },
};
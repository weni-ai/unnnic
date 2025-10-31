import unnnicFormElement from '../components/FormElement/FormElement.vue';
import unnnicInput from '../components/Input/Input.vue';
import iconList from '../utils/iconList';

export default {
  title: 'Form/Input',
  component: unnnicInput,
  argTypes: {
    label: { control: { type: 'text' } },
    size: {
      control: { type: 'select' },
      options: ['md', 'sm'],
      defaultValue: {
        summary: 'md',
      },
    },
    type: {
      control: { type: 'select' },
      options: ['normal', 'error'],
      defaultValue: {
        summary: 'normal',
      },
    },
    nativeType: { control: { type: 'select' }, options: ['text', 'password'] },
    placeholder: { control: { type: 'text' } },
    iconLeft: { control: { type: 'select' }, options: iconList },
    iconRight: { control: { type: 'select' }, options: iconList },
    allowTogglePassword: { control: { type: 'boolean' } },
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
      <unnnic-input v-model="value" @icon-right-click="click" v-bind="args" />
    `,
  }),
};

export const Normal = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
};

export const NormalSm = {
  args: {
    label: 'Label',
    size: 'sm',
    placeholder: 'Placeholder',
  },
};

export const Error = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    errors: 'Error text',
  },
};

export const ErrorSm = {
  args: {
    label: 'Label',
    size: 'sm',
    errors: 'Error text',
    placeholder: 'Placeholder',
  },
};

export const Disabled = {
  args: {
    label: 'Label',
    disabled: true,
    placeholder: 'Placeholder',
  },
};

export const DisabledSm = {
  args: {
    label: 'Label',
    size: 'sm',
    disabled: true,
    placeholder: 'Placeholder',
  },
};

export const DisabledError = {
  args: {
    label: 'Label',
    disabled: true,
    errors: 'Error text',
    placeholder: 'Placeholder',
  },
};

export const Password = {
  args: {
    label: 'Label',
    placeholder: 'Password',
    nativeType: 'password',
    allowTogglePassword: true,
  },
};

export const IconLeftAndRight = {
  args: {
    label: 'Label',
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
    label: 'Label',
    placeholder: 'Text',
    maxlength: 10,
    showMaxlengthCounter: true,
  },
};

export const WithTooltip = {
  args: {
    label: 'Label',
    placeholder: 'Text',
    tooltip: 'Tooltip',
  },
};

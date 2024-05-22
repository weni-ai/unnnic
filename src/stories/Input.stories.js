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
      <div><pre>v-model: {{ value }}</pre><unnnic-input v-model="value" @icon-right-click="click" v-bind="args" /></div>
    `,
  }),
};

export const Normal = {
  args: {
    type: 'normal',
    placeholder: 'Placeholder',
  },
};

export const Error = {
  args: {
    type: 'error',
    placeholder: 'Placeholder',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    placeholder: 'Placeholder',
  },
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

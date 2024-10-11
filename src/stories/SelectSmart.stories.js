import unnnicFormElement from '../components/FormElement/FormElement.vue';
import unnnicSelectSmart from '../components/SelectSmart/SelectSmart.vue';

export default {
  title: 'Select/SelectSmart',
  component: unnnicSelectSmart,
  argTypes: {},
  render: (args) => ({
    components: {
      unnnicFormElement,
      unnnicSelectSmart,
    },
    setup() {
      return { args };
    },
    data() {
      return {
        exampleValue: [],
      };
    },
    template: `
      <unnnicFormElement label="Label" message="Helper text">
        <unnnicSelectSmart v-bind="args" v-model="exampleValue"/>
      </unnnicFormElement>
    `,
  }),
};

const TemplateError = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicFormElement,
    unnnicSelectSmart,
  },

  setup() {
    return { args };
  },
  data() {
    return {
      exampleValue: [],
    };
  },

  template: `
    <unnnicFormElement label="Label" error="Error text">
      <unnnicSelectSmart v-bind="args" v-model="exampleValue"/>
    </unnnicFormElement>
  `,
});

const TemplateDisabled = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicFormElement,
    unnnicSelectSmart,
  },

  setup() {
    return { args };
  },
  data() {
    return {
      exampleValue: [],
    };
  },

  template: `
    <unnnicFormElement label="Label" message="Helper text" disabled>
      <unnnicSelectSmart v-bind="args" v-model="exampleValue"/>
    </unnnicFormElement>
  `,
});

export const Default = {
  args: {
    options: [
      { value: '', label: 'Select some option' },
      { value: '5', label: 'Option 5' },
      { value: '3', label: 'Option 3' },
      { value: '1', label: 'Option 1' },
      { value: '4', label: 'Option 4' },
      { value: '2', label: 'Option 2' },
      { value: '6', label: 'Option 6' },
      { value: '7', label: 'Option 7' },
    ],
  },
};

export const FirstSelected = {
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' },
      { value: '5', label: 'Option 5' },
    ],
  },
};

export const OrderedByIndex = {
  args: {
    options: [
      { value: '5', label: 'Option 5' },
      { value: '3', label: 'Option 3' },
      { value: '1', label: 'Option 1' },
      { value: '4', label: 'Option 4' },
      { value: '2', label: 'Option 2' },
    ],
    orderedByIndex: true,
  },
};

export const Error = TemplateError.bind({});
Error.args = {
  type: 'error',
  options: [
    { value: '', label: 'Select some option' },
    { value: '5', label: 'Option 5' },
    { value: '3', label: 'Option 3' },
    { value: '1', label: 'Option 1' },
    { value: '4', label: 'Option 4' },
    { value: '2', label: 'Option 2' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
  ],
};

export const Disabled = TemplateDisabled.bind({});
Disabled.args = {
  options: [{ value: '', label: 'Select some option' }],
  disabled: true,
};

export const WithDescriptions = {
  args: {
    options: [
      { value: '', label: 'Select some option' },
      {
        value: '1',
        label: 'Option 1',
        description: 'This is the first option',
      },
      {
        value: '2',
        label: 'Option 2',
        description: 'Another alternative you can consider',
      },
      {
        value: '3',
        label: 'Option 3',
        description: 'A third option for your consideration',
      },
      {
        value: '4',
        label: 'Option 4',
        description: 'Yet another choice among the options',
      },
      {
        value: '5',
        label: 'Option 5',
        description: 'The last option available for selection',
      },
    ],
  },
};

export const Autocomplete = {
  args: {
    options: [
      { value: '', label: 'Select some option' },
      { value: 'united_states', label: 'Estados Unidos' },
      { value: 'brazil', label: 'Brasil' },
      { value: 'china', label: 'China' },
      { value: 'india', label: 'Índia' },
      { value: 'russia', label: 'Rússia' },
      { value: 'japan', label: 'Japão' },
      { value: 'germany', label: 'Alemanha' },
      { value: 'france', label: 'França' },
      { value: 'canada', label: 'Canadá' },
      { value: 'australia', label: 'Austrália' },
      { value: 'south_korea', label: 'Coreia do Sul' },
      { value: 'mexico', label: 'México' },
      { value: 'egypt', label: 'Egito' },
      { value: 'south_africa', label: 'África do Sul' },
      { value: 'turkey', label: 'Turquia' },
      { value: 'nigeria', label: 'Nigéria' },
      { value: 'argentina', label: 'Argentina' },
      { value: 'italy', label: 'Itália' },
      { value: 'spain', label: 'Espanha' },
      { value: 'saudi_arabia', label: 'Arábia Saudita' },
    ],
    autocomplete: true,
    autocompleteClearOnFocus: true,
    autocompleteIconLeft: true,
  },
};

export const Multiple = {
  args: {
    options: [
      { value: '', label: 'Select some countries' },
      { value: 'united_states', label: 'Estados Unidos' },
      { value: 'brazil', label: 'Brasil' },
      { value: 'china', label: 'China' },
      { value: 'india', label: 'Índia' },
      { value: 'russia', label: 'Rússia' },
      { value: 'japan', label: 'Japão' },
      { value: 'germany', label: 'Alemanha' },
      { value: 'france', label: 'França' },
      { value: 'canada', label: 'Canadá' },
      { value: 'australia', label: 'Austrália' },
      { value: 'south_korea', label: 'Coreia do Sul' },
      { value: 'mexico', label: 'México' },
      { value: 'egypt', label: 'Egito' },
      { value: 'south_africa', label: 'África do Sul' },
      { value: 'turkey', label: 'Turquia' },
      { value: 'nigeria', label: 'Nigéria' },
      { value: 'argentina', label: 'Argentina' },
      { value: 'italy', label: 'Itália' },
      { value: 'spain', label: 'Espanha' },
      { value: 'saudi_arabia', label: 'Arábia Saudita' },
    ],
    multiple: true,
    multipleWithoutSelectsMessage: 'No country selected yet :(',
  },
};

import unnnicButton from '../components/Button/Button.vue';
import iconList from '../utils/iconList';

export default {
  title: 'Form/Button',
  component: unnnicButton,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'tertiary',
        'alternative',
        'warning',
        'attention',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['large', 'small'],
      defaultValue: 'large',
    },
    text: { control: { type: 'text' } },
    iconLeft: {
      control: { type: 'select' },
      options: [null, ...iconList],
    },
    iconCenter: {
      control: { type: 'select' },
      options: [null, ...iconList],
    },
    iconRight: {
      control: { type: 'select' },
      options: [null, ...iconList],
    },
    disabled: { control: { type: 'boolean' } },
    loading: { control: { type: 'boolean' } },
    float: { control: { type: 'boolean' } },
  },
};

export const Primary = {
  args: {
    text: 'Button Text',
    disabled: false,
  },
};

export const Secondary = {
  args: {
    type: 'secondary',
    text: 'Button Text',
    disabled: false,
  },
};

export const Tertiary = {
  args: {
    type: 'tertiary',
    text: 'Button Text',
    disabled: false,
  },
};

export const WithIcon = {
  args: {
    text: 'Button Text',
    iconLeft: 'developer-community-github-1-1',
  },
};

export const OnlyIcon = {
  args: {
    iconCenter: 'add-1',
  },
};

export const Alternative = {
  args: {
    type: 'alternative',
    iconLeft: 'add',
    text: 'Text',
  },
};

export const Warning = {
  args: {
    type: 'warning',
    iconLeft: 'add-1',
    text: 'Text',
  },
};

export const Attention = {
  args: {
    type: 'attention',
    iconLeft: 'add-1',
    text: 'Text',
  },
};

export const Float = {
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['extra-large', 'large'],
      defaultValue: 'large',
    },
  },
  render: (args) => ({
    components: { unnnicButton },
    setup() {
      return { args };
    },
    template: `<div style="height: 80vh; display: grid; position: relative;">
      <unnnic-button v-bind="args" />

      When to use this variation: <br/>
      When there is a need to present a main action above a list of contents. <br/>
      It is important that the component is always floating over the content and fixed to the bottom right side. <br/>
      (Remember to add position relative style to your container)

      <br/>
      <br/>

      <div style="overflow: scroll;">
        <p v-for="item in 50" :key="item">Scroll <br/></p>
      </div>
    </div>`,
  }),
  args: {
    type: 'primary',
    iconCenter: 'add',
    float: true,
  },
};

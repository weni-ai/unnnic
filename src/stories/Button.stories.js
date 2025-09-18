import unnnicButton from '../components/Button/Button.vue';
import iconList from '../utils/iconList';

export default {
  title: 'Form/Button',
  parameters: {
    docs: {
      description: {
        component: `Allows users to perform an action or navigate to another page. 
          It has styles for various needs and are ideal for directing the user's attention. 
          It is divided into 5 types: Primary, Secondary, Tertiary, Warning, Attention.
          Each of these types has its states.
          <br/>
          <br/>
          This component has 5 variations: without icon, with icon on the left, with icon on the right, just the icon and float. 
          Each of this variation has 4 states: default, hover, active and disabled. 
          The component has a fixed height of 46px and variable width. However, the icon-only variation has a fixed height and width of 46px.
          `,
      },
    },
  },
  component: unnnicButton,
  tags: ['autodocs'],
  args: {
    text: '',
    type: 'primary',
    size: 'large',
    iconLeft: '',
    iconCenter: '',
    iconRight: '',
    disabled: false,
    loading: false,
    float: false,
    next: false,
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'tertiary',
        'warning',
        'attention',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['large', 'small'],
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
    next: {
      control: { type: 'boolean' },
      description:
        'Used to indicate whether the button icon should be converted to the new icon library',
    },
  },
};

export const Primary = {
  args: {
    text: 'Button Text',
  },
};

export const Secondary = {
  args: {
    type: 'secondary',
    text: 'Button Text',
  },
};

export const Tertiary = {
  args: {
    type: 'tertiary',
    text: 'Button Text',
  },
};

export const WithIcon = {
  args: {
    text: 'Button Text',
    iconLeft: 'add',
  },
};

export const FilledIcon = {
  args: {
    text: 'Button Text',
    iconLeft: 'play_arrow',
    iconsFilled: true, 
  },
};

export const OnlyIcon = {
  args: {
    iconCenter: 'add',
  },
};

export const Warning = {
  parameters: {
    docs: {
      description: {
        story: `This variation aims to highlight actions that could be destructive or have negative consequences if taken. 
        For example: Deleting an element.`,
      },
    },
  },
  args: {
    type: 'warning',
    iconLeft: 'add',
    text: 'Text',
  },
};

export const Attention = {
  args: {
    type: 'attention',
    iconLeft: 'add',
    text: 'Text',
  },
};

export const Float = {
  parameters: {
    docs: {
      description: {
        story: `When there is a need to present a main action above a list of contents. <br/>
          It is important that the component is always floating over the content and fixed to the bottom right side. <br/>
          (Remember to add ${'`position relative`'} style to your container)`,
      },
    },
  },
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

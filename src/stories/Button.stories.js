import unnnicButton from '../components/Button/Button.vue'
import icons from '../utils/icons'

export default {
  title: 'Form/Button',
  component: unnnicButton,
  argTypes: {
    type: { control: 'select', options: ['primary', 'secondary', 'terciary'] },
    size: { control: 'select', options: ['large', 'small'] },
    text: { control: { type: 'text' } },
    iconLeft: { control: 'select', options: [undefined, ...Object.keys(icons)] },
    iconRight: { control: 'select', options: [undefined, ...Object.keys(icons)] },
    iconCenter: { control: 'select', options: [undefined, ...Object.keys(icons)] },
    disabled: { control: { type: 'boolean' } },
    loading: { control: { type: 'boolean' } },
    scheme: {
      control: 'select',
      options: ['feedback-red', 'feedback-green', 'feedback-yellow']
    }
  }
}

export const Normal = {
  args: {
    text: 'Button text',
    disabled: false,
  }
}

export const Secondary = {
  args: {
    type: 'secondary',
    text: 'Button Text',
    disabled: false
  }
}

export const Terciary = {
  args: {
    type: 'terciary',
    text: 'Button Text',
    disabled: false
  }
}

export const WithIcon = {
  args: {
    text: 'Button Text',
    iconLeft: 'developer-community-github-1-1'
  }
}

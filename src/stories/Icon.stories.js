import unnnicIcon from '../components/Icon.vue'
import icons from '../utils/icons'

const iconsOptions = Object.keys(icons)

const schemes = [
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
  'neutral-darkest'
]

export default {
  title: 'example/Icon',
  component: unnnicIcon,
  argTypes: {
    clickable: { control: 'boolean' },
    icon: { control: 'select', options: iconsOptions },
    scheme: { control: 'select', options: schemes },
    size: { control: 'select', options: ['nano', 'xs', 'sm', 'md', 'lg'] }
  }
}

export const Normal = {
  args: {
    icon: iconsOptions[0]
  }
}

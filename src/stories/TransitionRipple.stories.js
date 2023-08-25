import unnnicTransitionRipple from '../components/TransitionRipple/TransitionRipple.vue';
import colorsList from '../utils/colorsList';

export default {
  title: 'Transitions/Ripple',
  component: unnnicTransitionRipple,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: colorsList,
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicTransitionRipple,
  },
  template: `
    <div ref="transitionContainer" @mousedown="(event) => this.$refs.transitionRipple.addRipple(event)" style="width: 100%; height: 100px;">
      Click to activate transition

      <unnnic-transition-ripple ref="transitionRipple" v-bind="$props" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  color: 'weni-600',
};

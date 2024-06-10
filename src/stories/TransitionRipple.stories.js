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
  render: (args) => ({
    setup() {
      return { args };
    },
    components: {
      unnnicTransitionRipple,
    },
    template: `
      <div ref="transitionContainer" @mousedown="(event) => this.$refs.transitionRipple.addRipple(event)" style="width: 100%; height: 100px;">
        Click to activate transition
  
        <unnnic-transition-ripple ref="transitionRipple" v-bind="args" />
      </div>
    `,
  }),
  args: {
    color: 'weni-600',
  },
};

export const Default = {};

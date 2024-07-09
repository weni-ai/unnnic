import UnnnicTour from '../components/Tour/Tour.vue';
import UnnnicCard from '../components/Card/Card.vue';

export default {
  title: 'Example/Tour',
  component: UnnnicTour,
  argTypes: {},
  render: (args) => ({
    components: {
      UnnnicTour,
      UnnnicCard,
    },
    setup() {
      return { args };
    },
    methods: {
      startTour() {
        this.$refs.tour.start();
      },
      handleTourStep(step) {
        this.$refs.tour.start();
        this.$refs.tour.handleStep(step);
      },
    },
    mounted() {
      this.$nextTick(() => {
        args.steps[0].attachedElement = this.$refs.step1.$el;
        args.steps[1].attachedElement = this.$refs.step2.$el;
        args.steps[2].attachedElement = this.$refs.step3.$el;
        args.steps[3].attachedElement = this.$refs.step4.$el;
      });
    },
    template: `
    <div style="height: 50%; width: 30%; border: 1px solid #ccc; padding: 16px; margin: auto">
      <button @click="startTour">Start tour</button>
      <button @click="handleTourStep(2)">Go to step 3</button>
      <UnnnicCard 
        type="default"
        title="This is the title"
        description="This is the description"
        ref="step1"
      />
      <UnnnicCard 
        type="default"
        title="This is the title"
        description="This is the description"
        ref="step2"
      />
      <UnnnicCard 
        type="default"
        title="This is the title"
        description="This is the description"
        ref="step3"
      />
      <UnnnicCard 
        type="default"
        title="This is the title"
        description="This is the description"
        ref="step4"
      />
      <unnnic-tour v-bind="args" ref="tour" />
    </div>
    `,
  }),
};

export const Default = {
  args: {
    steps: [
      {
        title: 'Step 1',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus euismod nibh vel elementum. Integer nisi lectus, hendrerit aliquet tellus nec, volutpat porttitor erat. Vivamus tincidunt sit amet ex non. ',
        attachedElement: null,
        popoverPosition: 'right',
      },
      {
        title: 'Step 2',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dui orci. ',
        attachedElement: null,
        popoverPosition: 'bottom',
      },
      {
        title: 'Step 3',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum accumsan erat, at bibendum nisi mollis et. Aliquam venenatis tristique.',
        attachedElement: null,
        popoverPosition: 'left',
      },
      {
        title: 'Step 4',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ex purus, ullamcorper sed nunc eu. ',
        attachedElement: null,
        popoverPosition: 'top',
      },
    ],
  },
};

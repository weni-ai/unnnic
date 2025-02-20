<template>
  <TourMask
    v-if="isTourActive"
    :maskRect="maskRect"
  />

  <TourPopover
    v-if="isTourActive"
    :step="currentStepOptions"
    :stepsLength="steps.length"
    :currentStep="currentStep"
    :attachedElement="currentStepOptions.attachedElement"
    @end="end"
    @close="close"
    @next-step="nextStep"
  />
</template>

<script>
import TourMask from './TourMask.vue';
import TourPopover from './TourPopover.vue';

import { validateSteps } from './propsValidation';

export default {
  name: 'UnnnicTour',

  components: {
    TourMask,
    TourPopover,
  },

  props: {
    steps: {
      required: true,
      type: Array,
      validator: validateSteps,
    },
  },
  emits: ['endTour', 'nextStep', 'close'],

  data() {
    return {
      isTourActive: false,
      currentStep: 1,
      maskRect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
    };
  },

  computed: {
    currentStepOptions() {
      return this.steps[this.currentStep - 1];
    },
    stepStyle() {
      const attachedElement = this.currentStepOptions.attachedElement;

      if (!this.isTourActive || !attachedElement) {
        return {};
      }

      const { top, left, width, height } =
        attachedElement.getBoundingClientRect();
      return {
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
      };
    },
  },

  watch: {
    currentStep() {
      this.updateMaskRect();
    },
    isTourActive(isTourActive) {
      if (isTourActive) {
        this.updateMaskRect();
      }
    },
  },

  methods: {
    start() {
      this.isTourActive = true;
      this.currentStep = 1;
    },
    end() {
      this.isTourActive = false;
      this.currentStep = 1;
      this.$emit('endTour');
    },
    close() {
      this.$emit('close');
    },
    async handleStep(step) {
      if (this.currentStep <= this.steps.length) {
        const { beforeRender } = this.steps[step - 1];

        if (beforeRender) await beforeRender();

        this.currentStep = step;
      }
    },
    nextStep() {
      const { handleStep, steps, currentStep, end } = this;

      if (currentStep === steps.length) {
        end();
        return;
      }
      handleStep(currentStep + 1);
    },
    updateMaskRect() {
      const attachedElement = this.currentStepOptions?.attachedElement;
      const { padding } = this.currentStepOptions;

      if (!attachedElement) {
        return;
      }

      const { top, left, width, height } =
        attachedElement.getBoundingClientRect();
      this.maskRect = {
        x: left - (padding?.horizontal || 0) / 2,
        y: top - (padding?.vertical || 0) / 2,
        width: width + (padding?.horizontal || 0),
        height: height + (padding?.vertical || 0),
      };
    },
  },
};
</script>

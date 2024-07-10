<template>
  <section
    v-if="isTourActive"
    class="unnnic-tour"
  >
    <section
      class="unnnic-tour__step"
      :style="stepStyle"
    >
      <TourPopover
        :step="currentStepOptions"
        :stepsLength="steps.length"
        :currentStep="currentStep"
        @end="end"
        @next-step="nextStep"
      />
    </section>
  </section>
</template>

<script>
import TourPopover from './TourPopover.vue';
export default {
  name: 'UnnnicTour',

  components: {
    TourPopover,
  },

  props: {
    steps: {
      required: true,
      type: Array,
    },
  },

  data() {
    return {
      isTourActive: false,
      currentStep: 1,
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

      Object.assign(attachedElement.style, {
        position: 'relative',
        zIndex: 1000,
      });

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
    currentStep(_newStep, oldStep) {
      this.resetOldStepElement(oldStep);
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
    },
    handleStep(step) {
      if (this.currentStep < this.steps.length) {
        this.currentStep = step;
      }
    },
    nextStep() {
      const { handleStep, steps, currentStep, end } = this;

      if (currentStep === steps.length) {
        end();
      }

      handleStep(currentStep + 1);
    },
    resetOldStepElement(oldStep) {
      const oldElement = this.steps[oldStep - 1]?.attachedElement;
      if (!oldElement) {
        return;
      }

      Object.assign(oldElement.style, {
        position: 'initial',
        zIndex: 0,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.unnnic-tour {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(
    $unnnic-color-neutral-black,
    $unnnic-opacity-level-overlay
  );

  &__step {
    position: absolute;

    border-radius: $unnnic-border-radius-sm;
    background-color: $unnnic-color-neutral-white;
  }
}
</style>

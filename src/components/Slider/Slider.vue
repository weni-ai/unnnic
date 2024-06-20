<template>
  <article>
    <section class="unnnic-label">
      <p v-if="label" class="unnnic-slider__label">{{ label }}</p>
      <unnnicTooltip
        v-if="labelInfo"
        class="unnnic-label__tooltip"
        :text="labelInfo"
        enabled
        side="top"
      >
      <unnnic-icon
        class="unnnic-label__tooltip__icon"
        icon="info"
        size="sm"
        scheme="neutral-clean"
       :filled="true"
      />
      </unnnicTooltip>
    </section>

    <section class="unnnic-slider" :style="cssVars">
        <section class="unnnic-slider__content">
        <section class="unnnic-slider__content__labels">
          <span class="unnnic-slider__content__labels__min">{{ minLabel }}</span>
          <unnnicTooltip
            ref="tooltip"
            class="unnnic-slider__content__tooltip"
            :text="sliderVal.toString()"
            :force-open="true"
            :enabled="showTooltip"
            side="top"
          >
            <input
              ref="input"
              class="unnnic-slider__content__range-input"
              v-model="sliderVal"
              type="range"
              :min="minValue"
              :max="maxValue"
              :step="step"
              @change="handleValueChange"
              @mouseover="showTooltip = true"
              @mouseleave="showTooltip = false"
            />
          </unnnicTooltip>
          <span class="unnnic-slider__content__labels__max">{{ maxLabel }}</span>
        </section>
      </section>
      <template v-if="showInputValue">
        <input
          ref="value-input"
          class="value-input"
          @input="handleInput"
          :value="sliderVal"
        />
      </template>
    </section>
  </article>
</template>

<script>
import unnnicTooltip from '../ToolTip/ToolTip.vue';
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'unnnic-slider',
  components: {
    unnnicTooltip,
    UnnnicIcon,
  },
  props: {
    initialValue: {
      type: Number,
      default: 0,
    },
    showInputValue: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: '',
    },
    labelInfo: {
      type: String,
      default: '',
    },
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 5,
    },
    step: {
      type: Number,
      default: 1,
    },
    minLabel: {
      type: String,
      default: '',
    },
    maxLabel: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showTooltip: false,
      sliderVal: this.initialValue,
      tooltipOffset: 0,
      sliderWidth: 0,
      labelWidth: 0,
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  mounted() {
    this.checkInputWidth();
    this.checkTooltipLabelWidth();
  },
  watch: {
    sliderVal: {
      handler() {
        this.$nextTick(() => {
          this.configureTooltip();
          const ValueInput = this.$refs['value-input'];

          if (ValueInput && ValueInput.textContent !== this.sliderVal) {
            this.$refs['value-input'].textContent = this.sliderVal;
          }
        });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    configureTooltip() {
      if (this.$refs.input) {
        this.sliderWidth = this.$refs.input.clientWidth;
      }
      const tooltipLabel = this.$refs.tooltip?.$refs.label
      if (tooltipLabel) {
        this.labelWidth = tooltipLabel.clientWidth || 32;
      }
      this.tooltipOffset = this.getNewTooltipPosition();
    },
    handleResize() {
      this.configureTooltip();
    },
    handleValueChange() {
      this.configureTooltip();
      this.$emit('valueChange', this.sliderVal);
    },
    handleInput(event) {
      this.sliderVal = event.target.value;

      this.handleValueChange();
    },
    checkInputWidth() {
      const intervalId = setInterval(() => {
        const inputElement = this.$refs.input;
        if (inputElement) {
          const { offsetWidth } = inputElement;
          if (offsetWidth > 0) {
            this.sliderWidth = offsetWidth;
            this.configureTooltip();
            clearInterval(intervalId);
          }
        }
      }, 100);
    },
    checkTooltipLabelWidth() {
      const intervalId = setInterval(() => {
        const tooltipLabel = this.$refs.tooltip?.$refs.label
        if (!tooltipLabel) {
          return;
        }
        
        const { clientWidth } = tooltipLabel;
        if (clientWidth > 0) {
          this.labelWidth = clientWidth;
          this.configureTooltip();
          clearInterval(intervalId);
        }
      }, 100);
    },
    getNewTooltipPosition() {
      if (this.sliderWidth === 0 || this.labelWidth === 0) {
        return 0;
      }
      const halfThumbWidth = 12 / 2;
      const halfLabelWidth = this.labelWidth / 2 || 16;
      const centerPosition = this.sliderWidth / 2;

      let percentOfRange = (this.sliderVal - this.minValue) / (this.maxValue - this.minValue);
      if (Number.isNaN(percentOfRange)) {
        percentOfRange = 0;
      }

      const valuePXPosition = percentOfRange * this.sliderWidth;
      const distFromCenter = valuePXPosition - centerPosition;
      const percentDistFromCenter = distFromCenter / centerPosition;
      const offset = percentDistFromCenter * halfThumbWidth;

      const finalLabelPosition = valuePXPosition - halfLabelWidth - offset;
      return finalLabelPosition;
    },
  },
  computed: {
    cssVars() {
      return {
        '--val': this.sliderVal,
        '--tooltip-offset': this.tooltipOffset,
        '--min': this.minValue,
        '--max': this.maxValue,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.value-input {
  display: flex;
  margin-left: $unnnic-spacing-inline-sm;
  background: $unnnic-color-neutral-snow;
  border-radius: $unnnic-border-radius-sm;
  color: $unnnic-color-neutral-dark;
  font-weight: $unnnic-font-weight-regular;
  font-family: $unnnic-font-family-secondary;
  box-sizing: border-box;
  font-size: $unnnic-font-size-body-md;
  line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
  min-width: 70px;
  max-width: 70px;
  padding: $unnnic-spacing-xs $unnnic-spacing-sm $unnnic-spacing-xs $unnnic-spacing-sm;
  gap: $unnnic-spacing-xs;
  height: $unnnic-font-size-body-md + $unnnic-line-height-medium + 0.5 * $unnnic-font-size * 2;
  position: relative;
  border: $unnnic-border-width-thinner solid $unnnic-color-neutral-cleanest;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:before {
    content: ' ';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: inherit;
    pointer-events: none;
  }

  &:focus:before {
    border-color: $unnnic-color-neutral-clean;
  }

  &:focus {
    outline: none;
  }
}
</style>

<style lang="scss">
@import '../../assets/scss/unnnic.scss';

.unnnic-label {
      display: flex;
      gap: $unnnic-spacing-xs;

    &__tooltip {
        display: flex;
        align-self: center;

        &__icon {
          cursor: default;
        }
      }
}

.unnnic-slider {
  display: flex;
  width: 100%;

  &__label {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
    font-size: $unnnic-font-size-body-gt;
    color: $unnnic-color-neutral-cloudy;
    margin: $unnnic-spacing-stack-xs 0;
  }
  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: $unnnic-spacing-stack-xs;

    &__tooltip {
      display: flex;
      width: 100%;
      align-self: center;
    }

    &__labels {
      display: flex;
      gap: $unnnic-spacing-ant;

      &__min {
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-regular;
        font-size: $unnnic-font-size-body-md;
        line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
        color: $unnnic-color-neutral-cloudy;
      }

      &__max {
        margin-left: auto;
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-regular;
        font-size: $unnnic-font-size-body-md;
        line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
        color: $unnnic-color-neutral-cloudy;
      }
    }

    &__range-input {
      appearance: none;
      -webkit-appearance: none;
      width: 100%;
      margin: 0;
      @mixin thumb() {
        box-sizing: border-box;
        width: $unnnic-icon-size-xs;
        height: $unnnic-icon-size-xs;
        background: $unnnic-color-weni-600;
        border: $unnnic-border-width-thin solid $unnnic-color-weni-600;
        border-radius: 50%;

        &:active {
          box-shadow: $unnnic-shadow-level-near;
        }
      }

      /* Chrome */
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        @include thumb;
        margin-top: -$unnnic-spacing-stack-nano;
      }
      /* Firefox */
      &::-moz-range-thumb {
        @include thumb;
      }
      /* IE */
      &::-ms-thumb {
        @include thumb;
      }

      @mixin track($fill: 0) {
        width: 100%;
        height: 4px;
        box-sizing: border-box;
        border: none;
        background: $unnnic-color-neutral-soft;
        border-radius: $unnnic-border-radius-pill;
      }

      /* Chrome */
      &::-webkit-slider-runnable-track {
        @include track(1);
        margin: $unnnic-spacing-inline-xs 0;
        --progress: calc((var(--val) - var(--min)) / ((var(--max) - var(--min))) * 100%);
        background: linear-gradient(
          to right,
          $unnnic-color-weni-600 0%,
          $unnnic-color-weni-600 calc(var(--progress)),
          $unnnic-color-neutral-soft calc(var(--progress)),
          $unnnic-color-neutral-soft 100%
        );
      }
      /* Firefox */
      &::-moz-range-track {
        @include track;
      }
      /* IE */
      &::-ms-track {
        @include track;
      }

      @mixin fill() {
        height: 4px;
        background: $unnnic-color-weni-600;
      }

      /* Firefox */
      &::-moz-range-progress {
        @include fill;
      }
      /* IE */
      &::-ms-fill-lower {
        @include fill;
      }
    }
  }

  .unnnic-tooltip-label {
    position: absolute;
    left: calc(var(--tooltip-offset) * 1px) !important;
    top: -45px !important;
  }
}
</style>

<template>
  <div class="unnnic-slider" :style="cssVars">
    <div class="unnnic-slider__content">
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

      <div class="unnnic-slider__content__labels">
        <div class="unnnic-slider__content__labels__min">{{ minLabel }}</div>
        <div class="unnnic-slider__content__labels__max">{{ maxLabel }}</div>
      </div>
    </div>

    <unnnicInput
      class="unnnic-slider__value-input"
      type="normal"
      size="sm "
      :value="sliderVal.toString()"
      @input="handleInput"
    ></unnnicInput>
  </div>
</template>

<script>
import unnnicTooltip from '../ToolTip/ToolTip.vue';
import unnnicInput from '../Input/TextInput.vue';

export default {
  name: 'unnnic-slider',
  components: {
    unnnicTooltip,
    unnnicInput,
  },
  props: {
    initialValue: {
      type: Number,
      default: 0,
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
    const fallbackLabelWidth = 32 + this.sliderVal.toString().length * 4.5;
    this.sliderWidth = this.$refs.input.clientWidth;
    this.labelWidth = this.$refs.tooltip.$refs.label.clientWidth || fallbackLabelWidth;
    this.tooltipOffset = this.getNewTooltipPosition();
  },
  watch: {
    sliderVal: {
      handler() {
        this.$nextTick(() => {
          this.configureTooltip();
        });
      },
      deep: true,
    },
  },
  methods: {
    configureTooltip() {
      this.sliderWidth = this.$refs.input.clientWidth;
      this.labelWidth = this.$refs.tooltip.$refs.label.clientWidth;
      this.tooltipOffset = this.getNewTooltipPosition();
    },
    handleResize() {
      this.configureTooltip();
    },
    handleValueChange() {
      this.configureTooltip();
      this.$emit('valueChange', this.sliderVal);
    },
    handleInput(newValue) {
      this.sliderVal = newValue;
      this.handleValueChange();
    },
    getNewTooltipPosition() {
      const haldThumbWidth = 12 / 2;
      const halfLabelWidth = this.labelWidth / 2;
      const centerPosition = this.sliderWidth / 2;

      let percentOfRange = (this.sliderVal - this.minValue) / (this.maxValue - this.minValue);
      if (Number.isNaN(percentOfRange)) {
        percentOfRange = 0;
      }

      const valuePXPosition = percentOfRange * this.sliderWidth;
      const distFromCenter = valuePXPosition - centerPosition;
      const percentDistFromCenter = distFromCenter / centerPosition;
      const offset = percentDistFromCenter * haldThumbWidth;

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

<style lang="scss">
@import '../../assets/scss/unnnic.scss';

.unnnic-slider {
  display: flex;
  margin-top: 50px;
  width: 100%;
  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: $unnnic-spacing-stack-xs;

    &__tooltip {
      display: flex !important;
      width: 100%;
      align-self: center;
    }

    &__labels {
      display: flex;

      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
      color: $unnnic-color-neutral-cloudy;

      &__max {
        margin-left: auto;
      }
    }

    &__range-input {
      -webkit-appearance: none;
      width: 100%;
      margin: 0;
      @mixin thumb() {
        box-sizing: border-box;
        width: $unnnic-icon-size-xs;
        height: $unnnic-icon-size-xs;
        background: $unnnic-color-neutral-snow;
        border: $unnnic-border-width-thin solid $unnnic-color-aux-baby-blue;
        border-radius: 50%;

        &:hover {
          border: $unnnic-border-width-thin solid $unnnic-color-aux-blue;
        }

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
          $unnnic-color-aux-baby-blue 0%,
          $unnnic-color-aux-baby-blue calc(var(--progress)),
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
        background: $unnnic-color-aux-baby-blue;
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

  &__value-input {
    margin-left: $unnnic-spacing-inline-sm;

    .unnnic-form__input {
      text-align: center;
      padding: $unnnic-spacing-inset-nano;
    }
  }

  .unnnic-tooltip-label {
    position: absolute;
    left: calc(var(--tooltip-offset) * 1px) !important;
    top: -45px !important;
  }
}
</style>

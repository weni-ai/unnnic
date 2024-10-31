<template>
  <section class="unnnic-chart-funnel-base-container">
    <section
      v-for="(step, index) in data"
      :key="index"
      :class="[
        'unnnic-chart-funnel-base-item',
        { 'first-item': index === 0, 'last-item': index === data.length - 1 },
      ]"
    >
      <section class="unnnic-chart-funnel-base-item__card">
        <svg
          :width="step.svgWidth"
          :height="step.svgHeight"
          :viewBox="`0 0 ${step.svgWidth} ${step.svgHeight}`"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="funnel-svg"
        >
          <path
            :d="step.svgPath"
            :fill="step.color"
          />
        </svg>
      </section>
      <section class="unnnic-chart-funnel-base-item__text">
        <section class="unnnic-chart-funnel-base-item__text__values">
          <p class="unnnic-chart-funnel-base-item__text__values-title">
            {{ step.percentage }}
          </p>
          <p class="unnnic-chart-funnel-base-item__text__values-sub-title">
            &nbsp; | {{ step.value }}
          </p>
        </section>
        <p class="unnnic-chart-funnel-base-item__text-description">
          {{ step.description }}
        </p>
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
interface FunnelStep {
  percentage: number | string;
  value: number | string;
  description: string;
  color: string;
  svgPath: string;
  svgWidth: number;
  svgHeight: number;
}

defineProps<{
  data: FunnelStep[];
}>();
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/unnnic.scss';

.unnnic-chart-funnel-base-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.unnnic-chart-funnel-base-item {
  display: flex;
  justify-content: flex-start;

  &__card {
    position: relative;
    display: flex;
    align-items: center;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 100%;
      height: 1px;
      background-color: $unnnic-color-neutral-soft;
      z-index: -1;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding-left: 1rem;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 100%;
      height: 1px;
      background-color: $unnnic-color-neutral-soft;
      z-index: -1;
    }

    &-description {
      margin: 0;
      color: $unnnic-color-neutral-dark;
      text-align: center;

      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-md;
      font-style: normal;
      font-weight: $unnnic-font-weight-regular;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
    }
    &__values {
      display: flex;
      &-title {
        margin: 0;
        color: $unnnic-color-neutral-dark;

        font-family: $unnnic-font-family-secondary;
        font-size: $unnnic-font-size-body-lg;
        font-style: normal;
        font-weight: $unnnic-font-weight-bold;
        line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
      }

      &-sub-title {
        display: flex;
        align-items: end;
        margin: 0;
        color: $unnnic-color-neutral-cloudy;

        font-family: $unnnic-font-family-secondary;
        font-size: $unnnic-font-size-body-md;
        font-style: normal;
        font-weight: $unnnic-font-weight-regular;
        line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
      }
    }
  }
  &:last-child .unnnic-chart-funnel-base-item__card::after,
  &:last-child .unnnic-chart-funnel-base-item__text::after {
    content: none;
  }
}
</style>

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
          :width="getSvgWidth(index)"
          height="92.4"
          :viewBox="`0 0 ${getSvgWidth(index)} 92.4`"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="funnel-svg"
        >
          <path
            :d="getSvgPath(index)"
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
}

defineProps<{
  data: FunnelStep[];
}>();

const svgPaths = [
  'M218.999 0H8C3.58172 0 0 3.58173 0 8.00001V92.4H201.798C205.539 92.4 208.781 89.8071 209.602 86.1572L226.803 9.75715C227.929 4.75524 224.126 0 218.999 0Z',
  'M192 0.399902H0L1.04385e-05 92.7999H163.476C167.174 92.7999 170.39 90.2656 171.254 86.6703L192 0.399902Z',
  'M152 0.800049H2.59253e-05L0 93.2001H123.948C127.661 93.2001 130.886 90.645 131.736 87.0302L152 0.800049Z',
  'M117 0.199951H0L2.21175e-05 92.6H86.3723C90.0018 92.6 93.1765 90.1566 94.1057 86.648L117 0.199951Z',
  'M79 0.600098H0L3.72103e-05 85.0001C3.91582e-05 89.4184 3.58177 93.0001 8.00004 93.0001H46.3116C49.8754 93.0001 53.0095 90.6427 53.9978 87.2187L79 0.600098Z',
];

const svgWidths = [227, 192, 152, 117, 79];

const getSvgPath = (index: number) => svgPaths[index] || svgPaths[0];
const getSvgWidth = (index: number) => svgWidths[index] || svgWidths[0];
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
    max-height: 91px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 100%;
      height: 1px;
      background-color: #cccccc;
      z-index: -1;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding-left: 1rem;
    max-height: 91px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 100%;
      height: 1px;
      background-color: #cccccc;
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

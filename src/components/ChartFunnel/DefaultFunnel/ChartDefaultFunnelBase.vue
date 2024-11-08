<template>
  <section class="unnnic-chart-funnel-base-container">
    <section
      v-for="(step, index) in data"
      :key="index"
      class="unnnic-chart-funnel-base-item"
    >
    <section 
      :class="[
        'overflow-hidden', 
         step.widthClass,
        { 'first-item': index === 0, 'last-item': index === data.length - 1 }
      ]">
      <section
        :class="['unnnic-chart-funnel-base-item__card',  { 'first-item': index === 0}]"
        :style="{ backgroundColor: step.color }"
      ></section>
    </section>

    <section :class="['unnnic-chart-funnel-base-item__text', { 'last-item': index === data.length - 1 }]">
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
  widthClass: string;
  color: string;
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
    height: 100%;
    transition: background-color 0.3s ease;
    transform: skew(-12deg, 0deg) translateX(-20px);
    border-radius: 0 0 $unnnic-spacing-xs 0;

    &.first-item {
    border-radius: $unnnic-spacing-xs $unnnic-spacing-xs $unnnic-spacing-xs 0;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding-left: $unnnic-spacing-sm;
    padding-right: $unnnic-spacing-sm;
    height: 100%;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0px;
      width: 100%;
      height: 1px;
      background-color: $unnnic-color-neutral-soft;
      z-index: -1;
    }

    &.last-item::after {
      display: none;
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
.overflow-hidden {
  height: 100%;
  overflow: hidden;
  position: relative;

  &.first-item {
    border-radius: $unnnic-spacing-xs $unnnic-spacing-xs 0px 0;
    }

  &.last-item {
    border-radius: 0 0 $unnnic-spacing-xs $unnnic-spacing-xs;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 2px;
    background-color: $unnnic-color-neutral-soft;
    z-index: -1;
  }

  &.last-item::after {
    display: none;
  }
}
</style>

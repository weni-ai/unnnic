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
          { 'first-item': index === 0, 'last-item': index === data.length - 1 },
        ]"
      >
        <section
          :class="[
            'unnnic-chart-funnel-base-item__card',
            { 'first-item': index === 0 },
          ]"
          :style="{ backgroundColor: step.color }"
        ></section>
      </section>

      <section
        :class="[
          'unnnic-chart-funnel-base-item__text',
          { 'last-item': index === data.length - 1 },
        ]"
      >
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
import { computed } from 'vue';

export interface FunnelStep {
  percentage: number | string;
  value: number | string;
  description: string;
  widthClass: string;
  color: string;
}

const props = defineProps<{
  data: FunnelStep[];
}>();

const calculatedTransform = computed(() => {
  return `skew(${props.data.length === 2 ? '-8deg': '-12deg'}, 0deg) translateX(-20px)`;
});

</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
.unnnic-chart-funnel-base-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.unnnic-chart-funnel-base-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;

  &__card {
    height: 100%;
    transition: background-color 0.3s ease;
    transform: v-bind(calculatedTransform);
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
}

.w-60 {
  width: 60%;
}
.w-50 {
  width: 50%;
}
.w-40 {
  width: 40%;
}
.w-30 {
  width: 30%;
}
.w-20 {
  width: 20%;
}
.overflow-hidden {
  height: 100%;
  overflow: hidden;
  position: relative;

  &.first-item {
    border-radius: $unnnic-spacing-xs $unnnic-spacing-xs 0 0;
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

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
      <section
        :class="['unnnic-chart-funnel-base-item__card', step.widthClass]"
        :style="{ backgroundColor: step.color }"
      ></section>
      <section class="unnnic-chart-funnel-base-item__text">
        <section class="unnnic-chart-funnel-base-item__text__values">
          <p class="unnnic-chart-funnel-base-item__text__values-title">
            {{ step.percentage }}%
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
  data: FunnelStep[]
}>();
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/unnnic.scss';

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
    margin-right: 1rem;
    transition: background-color 0.3s ease;
    clip-path: polygon(0 0, 100% 0, 88% 100%, 0 100%);
  }

  &.first-item &__card {
    border-radius: 8px 8px 0 0;
  }

  &.last-item &__card {
    border-radius: 0 0 0 8px;
  }

  &__text {
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
</style>

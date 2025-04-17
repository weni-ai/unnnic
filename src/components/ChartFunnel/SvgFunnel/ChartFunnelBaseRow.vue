<template>
  <svg
    class="unnnic-chart-funnel-base-rows"
    :viewBox="viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      v-for="(row, index) of rows"
      :key="row.title + index"
      class="unnnic-chart-funnel-base-rows__row"
    >
      <path
        class="row__path"
        :d="row.pathD"
      />
      <text
        x="50%"
        :y="row.titleY"
        class="row__title"
      >
        {{ row.title }}
      </text>
      <text
        x="50%"
        :y="row.descriptionY"
        class="row__description"
      >
        {{ row.description }}
      </text>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'UnnnicChartFunnelThreeRows',

  props: {
    rows: {
      type: Array,
      required: true,
    },

    viewBox: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
.unnnic-chart-funnel-base-rows {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  &__row {
    .row__title,
    .row__description {
      fill: $unnnic-color-neutral-white;
      font-family: $unnnic-font-family-secondary;
      text-anchor: middle;
    }

    .row__title {
      font-size: $unnnic-font-size-body-lg;
      font-weight: $unnnic-font-weight-bold;
    }

    .row__description {
      font-size: $unnnic-font-size-body-md;
    }
  }
}
</style>

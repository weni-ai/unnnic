<template>
  <div class="table-row">
    <template
      v-for="(header, index) in headers"
      :key="header.id"
    >
      <div
        class="col"
        :style="{
          width: header.width,
          flex: header.flex,
          minWidth: 0,
        }"
      >
        <slot :name="header.id">
          <div class="break-text">{{ header.text }}</div>
        </slot>
      </div>

      <div
        v-show="index + 1 !== headers.length"
        :class="['divider', { condensed: header.condensed }]"
      ></div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'UnnnicTableRow',

  props: {
    headers: {
      type: Array,
    },
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss">
.break-text {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.table-row {
  display: flex;
  align-items: center;

  .col {
    font-family: $unnnic-font-family-secondary;
    color: $unnnic-color-neutral-dark;
    font-size: $unnnic-font-size-body-gt;
    font-weight: $unnnic-font-weight-regular;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
  }

  .divider {
    width: $unnnic-inline-lg;
    align-self: stretch;

    &.condensed {
      width: $unnnic-spacing-inline-sm;
    }
  }
}
</style>

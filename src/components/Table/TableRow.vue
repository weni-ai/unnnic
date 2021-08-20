<template>
  <div class="table-row">
    <template class="col" v-for="(header, index) in headers">
      <div
        class="col"
        :key="header.id"
        :style="{
          width: header.width,
          flex: header.flex,
        }"
      >
        <slot :name="header.id">{{ header.text }}</slot>
      </div>

      <div
        v-show="index + 1 !== headers.length"
        :class="['divider', { condensed: header.condensed }]"
        :key="`divider-${index}`"
      ></div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'unnnicTableRow',

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

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.table-row {
  display: flex;
  align-items: center;

  .col {
    font-family: $unnnic-font-family-secondary;
    color: $unnnic-color-neutral-dark;
    font-size: $unnnic-font-size-body-gt;
    font-weight: $unnnic-font-weight-regular;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>

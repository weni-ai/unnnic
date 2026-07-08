<template>
  <UiTableRow
    v-if="isVersion2"
    v-bind="$attrs"
  >
    <slot />
  </UiTableRow>

  <div
    v-else
    class="table-row"
    v-bind="$attrs"
  >
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
import { computed, inject, unref } from 'vue';
import UiTableRow from '@/components/ui/table/TableRow.vue';

export default {
  name: 'UnnnicTableRow',

  components: {
    UiTableRow,
  },

  inheritAttrs: false,

  props: {
    headers: {
      type: Array,
    },
  },

  setup() {
    const tableVersion = inject('unnnicTableVersion', '1');
    const isVersion2 = computed(() => unref(tableVersion) === '2');

    return {
      isVersion2,
    };
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
    color: $unnnic-color-fg-base;
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

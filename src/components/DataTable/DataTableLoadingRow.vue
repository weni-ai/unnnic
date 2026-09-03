<script setup lang="ts">
import IconLoading from '../IconLoading/IconLoading.vue';
import DataTableCell from './DataTableCell.vue';
import type { DataTableSize } from './types';

defineOptions({
  name: 'DataTableLoadingRow',
});

const props = withDefaults(
  defineProps<{
    loadingMore?: boolean;
    size?: DataTableSize;
  }>(),
  {
    loadingMore: false,
    size: 'md',
  },
);
</script>

<template>
  <tr
    :class="[
      'unnnic-data-table__body-row',
      props.loadingMore
        ? 'unnnic-data-table__body-row--loading-more'
        : 'unnnic-data-table__body-row--loading',
    ]"
  >
    <DataTableCell
      type="body"
      :size="props.size"
      align="center"
    >
      <IconLoading
        class="unnnic-data-table__body-cell--loading"
        :data-testid="
          props.loadingMore ? 'body-row-loading-more' : 'body-row-loading'
        "
        size="xl"
      />
    </DataTableCell>
  </tr>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-data-table__body-row {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
}

.unnnic-data-table__body-cell--loading {
  margin: $unnnic-space-10 0;
  padding: 0;
  pointer-events: none;
}
</style>

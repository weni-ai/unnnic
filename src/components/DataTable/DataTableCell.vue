<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { computed } from 'vue';
import { cn } from '@/lib/utils';
import { useHasComponentContent } from '@/composables/useSlotUtils';
import Icon from '../Icon.vue';
import IconArrowsDefault from '../icons/iconArrowsDefault.vue';
import {
  SORT_ORDER,
  type CellAlign,
  type CellType,
  type DataTableSize,
  type SortOrder,
} from './types';

defineOptions({
  name: 'DataTableCell',
});

const props = withDefaults(
  defineProps<{
    align?: CellAlign;
    class?: HTMLAttributes['class'];
    size?: DataTableSize;
    sortOrder?: SortOrder;
    sortable?: boolean;
    type?: CellType;
    width?: string;
  }>(),
  {
    align: 'left',
    class: undefined,
    size: 'md',
    sortOrder: SORT_ORDER.NONE,
    sortable: false,
    type: 'body',
    width: undefined,
  },
);

const hasComponentContent = useHasComponentContent();

const isSorting = computed(
  () =>
    props.sortable &&
    props.type === 'header' &&
    props.sortOrder !== SORT_ORDER.NONE,
);

const cellClasses = computed(() =>
  cn(
    'unnnic-data-table-cell',
    `unnnic-data-table-cell--${props.type}`,
    `unnnic-data-table-cell--${props.size}`,
    `unnnic-data-table-cell--align-${props.align}`,
    {
      'unnnic-data-table-cell--sortable': props.sortable,
      'unnnic-data-table-cell--sorting': isSorting.value,
      'unnnic-data-table-cell--has-slot': hasComponentContent.value,
      'unnnic-data-table__header-cell': props.type === 'header',
      'unnnic-data-table__header-cell--clickable':
        props.type === 'header' && props.sortable,
      'unnnic-data-table__header-cell--sorting':
        props.type === 'header' && isSorting.value,
      'unnnic-data-table__body-cell': props.type === 'body',
    },
    props.class,
  ),
);
</script>

<template>
  <component
    :is="props.type === 'header' ? 'th' : 'td'"
    :class="cellClasses"
    :scope="props.type === 'header' ? 'col' : undefined"
    :style="{ width: props.width }"
  >
    <span class="unnnic-data-table-cell__content">
      <slot />
    </span>
    <template v-if="props.type === 'header' && props.sortable">
      <IconArrowsDefault
        v-if="props.sortOrder === SORT_ORDER.NONE"
        class="unnnic-data-table-cell__sort-icon order-default-icon"
        data-testid="arrow-default-icon"
      />
      <Icon
        v-else-if="props.sortOrder === SORT_ORDER.ASC"
        class="unnnic-data-table-cell__sort-icon unnnic-data-table-cell__sort-icon--asc"
        clickable
        size="ant"
        icon="switch_left"
        data-testid="arrow-asc-icon"
      />
      <Icon
        v-else-if="props.sortOrder === SORT_ORDER.DESC"
        class="unnnic-data-table-cell__sort-icon unnnic-data-table-cell__sort-icon--desc"
        clickable
        size="ant"
        icon="switch_left"
        data-testid="arrow-desc-icon"
      />
    </template>
  </component>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

$cell-min-height-md: 53px;
$cell-min-height-sm: 46px;

.unnnic-data-table-cell {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: $cell-min-height-md;
  padding: $unnnic-space-3 $unnnic-space-4;
  color: $unnnic-color-fg-emphasized;
  overflow: hidden;
  border-color: $unnnic-color-border-base;
  border-style: solid;
  border-width: 0 1px 1px 0;

  &:first-of-type {
    border-left-width: 1px;
  }

  &__content {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :deep(.unnnic-data-table-cell__sort-icon) {
    flex-shrink: 0;
  }

  :deep(.unnnic-data-table-cell__sort-icon--asc) {
    transform: rotate(-90deg);
  }

  :deep(.unnnic-data-table-cell__sort-icon--desc) {
    transform: rotate(90deg);
  }

  &--header {
    @include unnnic-font-emphasis;
    gap: $unnnic-space-1;
    background-color: $unnnic-color-bg-base-soft;
    border-top-width: 1px;

    &:first-of-type {
      border-top-left-radius: $unnnic-radius-2;
    }

    &:last-of-type {
      border-top-right-radius: $unnnic-radius-2;
    }
  }

  &--body {
    @include unnnic-font-body;
    background-color: $unnnic-color-bg-base;
  }

  &--align-left {
    justify-content: flex-start;
    text-align: left;

    .unnnic-data-table-cell__content {
      justify-content: flex-start;
    }
  }

  &--align-center {
    justify-content: center;
    text-align: center;

    .unnnic-data-table-cell__content {
      justify-content: center;
      text-align: center;
    }
  }

  &--align-right {
    justify-content: flex-end;
    text-align: right;

    .unnnic-data-table-cell__content {
      justify-content: flex-end;
      text-align: right;
    }
  }

  &--sortable {
    cursor: pointer;

    &:hover {
      background-color: $unnnic-color-bg-muted;
    }
  }

  &--sorting {
    background-color: $unnnic-color-bg-muted;
  }

  &--sm {
    min-height: $cell-min-height-sm;
    padding: $unnnic-space-2 $unnnic-space-4;
  }

  &--has-slot {
    padding-block: $unnnic-space-1;

    .unnnic-data-table-cell__content {
      display: flex;
      align-items: center;
      overflow: visible;
      text-overflow: unset;
      white-space: normal;
    }
  }
}

.unnnic-data-table__body--hide-headers tr:first-of-type {
  .unnnic-data-table-cell--body {
    border-top-width: 1px;

    &:first-of-type {
      border-top-left-radius: $unnnic-radius-2;
    }

    &:last-of-type {
      border-top-right-radius: $unnnic-radius-2;
    }
  }
}

tr:last-of-type .unnnic-data-table-cell--body {
  &:first-of-type {
    border-bottom-left-radius: $unnnic-radius-2;
  }

  &:last-of-type {
    border-bottom-right-radius: $unnnic-radius-2;
  }
}

tr:hover:not(.unnnic-data-table__body-row--loading):not(
    .unnnic-data-table__body-row--loading-more
  ) {
  .unnnic-data-table-cell--body {
    background-color: $unnnic-color-bg-base-soft;
  }
}
</style>

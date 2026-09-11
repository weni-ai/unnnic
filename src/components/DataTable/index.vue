<template>
  <table
    class="unnnic-data-table"
    :class="[
      `unnnic-data-table--${size}`,
      { 'unnnic-data-table--has-scrollbar': scrollbarWidth },
    ]"
    :style="props.fixedHeaders ? {} : heightStyles"
  >
    <thead
      v-if="!shouldHideHeaders"
      class="unnnic-data-table__header"
      :style="headerGutterStyle"
    >
      <tr class="unnnic-data-table__header-row">
        <DataTableCell
          v-for="header in headers"
          :key="header.itemKey"
          type="header"
          :align="getHeaderAlign(header.align)"
          :sortable="header.isSortable"
          :sortOrder="getSortOrder(header)"
          data-testid="header-cell"
          @click.stop="handleClickHeader(header)"
        >
          <slot
            v-if="slots[`header-${header.itemKey}`]"
            :name="`header-${header.itemKey}`"
            :header="header"
          />
          <template v-else>
            {{ header.title }}
          </template>
        </DataTableCell>
      </tr>
    </thead>
    <tbody
      ref="tbodyRef"
      :class="[
        'unnnic-data-table__body',
        { 'unnnic-data-table__body--hide-headers': shouldHideHeaders },
      ]"
      :style="props.fixedHeaders ? heightStyles : {}"
    >
      <DataTableLoadingRow
        v-if="isLoading"
        :size="size"
      />
      <template v-else-if="props.items.length">
        <tr
          v-for="(item, index) in props.items"
          :key="index"
          :tabindex="props.clickable ? 0 : undefined"
          :class="[
            'unnnic-data-table__body-row',
            { 'unnnic-data-table__body-row--clickable': props.clickable },
          ]"
          @click="handleClickRow(item)"
          @click.middle.exact="handleClickRow(item, 'middle')"
          @keydown.enter="handleClickRow(item)"
          @keydown.space.prevent="handleClickRow(item)"
        >
          <DataTableCell
            v-for="header in headers"
            :key="header.itemKey"
            type="body"
            :size="size"
            :align="getHeaderAlign(header.align)"
            data-testid="body-cell"
          >
            <slot
              v-if="slots[`body-${header.itemKey}`]"
              :name="`body-${header.itemKey}`"
              :item="item"
            />
            <template v-else>
              {{ item[header.itemKey] }}
            </template>
          </DataTableCell>
        </tr>
        <DataTableLoadingRow
          v-if="props.infiniteScroll && props.isLoadingMore"
          :size="size"
          loadingMore
        />
      </template>
      <tr
        v-else
        :class="[
          'unnnic-data-table__body-row',
          'unnnic-data-table__body-row--without-results',
        ]"
      >
        <DataTableCell
          type="body"
          :size="size"
          data-testid="body-cell"
        >
          <slot
            v-if="slots['without-results']"
            name="without-results"
          />
          <p
            v-else
            class="unnnic-data-table__body-cell-text"
            data-testid="body-cell-text"
          >
            {{ withoutResultsText }}
          </p>
        </DataTableCell>
      </tr>
    </tbody>
    <TablePagination
      v-if="!props.hidePagination"
      :modelValue="props.page"
      :total="props.pageTotal"
      :interval="props.pageInterval"
      @update:model-value="$emit('update:page', $event)"
    />
  </table>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useSlots, watch } from 'vue';
import { useInfiniteScroll, useResizeObserver } from '@vueuse/core';
import { get } from '@/utils/objectPath';

import i18n from '@/utils/plugins/i18n';
import DataTableCell from './DataTableCell.vue';
import DataTableLoadingRow from './DataTableLoadingRow.vue';
import TablePagination from '../TableNext/TablePagination.vue';
import {
  NEXT_SORT_ORDER,
  SORT_ORDER,
  type CellAlign,
  type DataTableHeader,
  type DataTableItem,
  type DataTableProps,
  type SortOrder,
  type SortState,
} from './types';

defineOptions({
  name: 'UnnnicDataTable',
});

const slots = useSlots();

const emit = defineEmits<{
  'update:sort': [sort: SortState];
  itemClick: [item: DataTableItem];
  'itemClick:middle': [item: DataTableItem];
  'update:page': [page: number];
  loadMore: [];
}>();

const props = withDefaults(defineProps<DataTableProps>(), {
  isLoading: false,
  size: 'md',
  height: '',
  maxHeight: '',
  clickable: false,
  fixedHeaders: false,
  hideHeaders: false,
  hidePagination: false,
  page: 1,
  pageTotal: 0,
  pageInterval: 5,
  locale: 'en',
  sort: undefined,
  infiniteScroll: false,
  infiniteScrollDistance: 100,
  infiniteScrollDisabled: false,
  isLoadingMore: false,
});

const withoutResultsText = computed(() => {
  const locale = String(
    props.locale || i18n.global.locale || 'en',
  ).toLowerCase();
  const normalizedLocale = locale === 'en-us' ? 'en' : locale;

  return (
    get(
      i18n.global.messages,
      `${normalizedLocale}.data_table.without_results`,
    ) || get(i18n.global.messages, 'en.data_table.without_results')
  );
});

const heightStyles = computed(() => {
  return {
    height: props.height || 'unset',
    'max-height': props.maxHeight || 'unset',
    overflow: props.height || props.maxHeight ? 'auto' : 'unset',
  };
});

const shouldHideHeaders = computed(() => {
  return props.hideHeaders || !props.headers.length;
});

const getHeaderAlign = (align?: DataTableHeader['align']): CellAlign =>
  align ?? 'left';

const getHeaderColumnSize = (header: DataTableHeader): string => {
  return typeof header.size === 'number'
    ? `${header.size || 1}fr`
    : header.size || '1fr';
};

const gridTemplateColumns = computed(() => {
  if (!props.headers.length) {
    return '1fr';
  }

  return props.headers.map(getHeaderColumnSize).join(' ');
});

const internalSort = ref<SortState>({
  header: '',
  itemKey: '',
  order: SORT_ORDER.NONE,
});

const sortState = computed(() => {
  return props.sort !== undefined ? props.sort : internalSort.value;
});

const getSortOrder = (header: DataTableHeader): SortOrder => {
  if (sortState.value.header !== header.title) return SORT_ORDER.NONE;
  if (
    sortState.value.order === SORT_ORDER.ASC ||
    sortState.value.order === SORT_ORDER.DESC
  ) {
    return sortState.value.order;
  }
  return SORT_ORDER.NONE;
};

const handleSort = (header: SortState, order: SortOrder) => {
  if (props.sort === undefined) {
    internalSort.value = { ...header, order };
  }

  emit('update:sort', { ...header, order });
};

const handleClickHeader = (header: DataTableHeader) => {
  if (!header.isSortable) return;

  const nextSort =
    header.title !== sortState.value.header
      ? SORT_ORDER.ASC
      : (NEXT_SORT_ORDER[sortState.value.order] ?? SORT_ORDER.ASC);

  handleSort(
    {
      header: header.title,
      itemKey: header.itemKey,
      order: nextSort,
    },
    nextSort,
  );
};

const handleClickRow = (
  item: DataTableItem,
  button: 'left' | 'middle' = 'left',
) => {
  if (!props.clickable) return;

  if (button === 'middle') {
    emit('itemClick:middle', item);
    return;
  }

  emit('itemClick', item);
};

const tbodyRef = ref<HTMLElement | null>(null);
const scrollbarWidth = ref(0);

const headerGutterStyle = computed(() => {
  if (!scrollbarWidth.value) return {};

  return { paddingRight: `${scrollbarWidth.value}px` };
});

const updateScrollbarWidth = () => {
  const el = tbodyRef.value;
  if (!el || !props.fixedHeaders) {
    scrollbarWidth.value = 0;
    return;
  }

  scrollbarWidth.value = Math.max(0, el.offsetWidth - el.clientWidth);
};

useResizeObserver(tbodyRef, updateScrollbarWidth);

watch(
  () => [
    props.fixedHeaders,
    props.items.length,
    props.height,
    props.maxHeight,
    props.isLoading,
    props.isLoadingMore,
  ],
  () => {
    nextTick(updateScrollbarWidth);
  },
  { immediate: true },
);

const handleLoadMore = () => {
  emit('loadMore');
};

useInfiniteScroll(
  () => (props.infiniteScroll ? tbodyRef.value : null),
  handleLoadMore,
  {
    distance: props.infiniteScrollDistance,
    canLoadMore: () =>
      props.infiniteScroll &&
      !props.infiniteScrollDisabled &&
      !props.isLoading &&
      !props.isLoadingMore,
  },
);
</script>

<style scoped lang="scss">
@use '@/assets/scss/unnnic' as *;

@mixin data-table-scrollbar {
  &::-webkit-scrollbar {
    width: $unnnic-space-1;
  }

  &::-webkit-scrollbar-thumb {
    background: $unnnic-color-border-emphasized;
    border-radius: $unnnic-radius-full;
  }

  &::-webkit-scrollbar-track {
    background: $unnnic-color-bg-muted;
    border-radius: $unnnic-radius-full;
  }
}

.unnnic-data-table {
  @include data-table-scrollbar;

  border-spacing: 0;

  overflow: hidden;

  width: 100%;

  display: flex;
  flex-direction: column;

  &__header {
    display: block;
    box-sizing: border-box;
    flex-shrink: 0;
    min-width: 0;

    &-row {
      @extend %base-row;

      width: 100%;
      grid-template-columns: v-bind(gridTemplateColumns);
    }
  }

  &__body {
    @include data-table-scrollbar;

    display: block;
    min-width: 0;

    &-row {
      @extend %base-row;

      grid-template-columns: v-bind(gridTemplateColumns);

      &--loading,
      &--loading-more,
      &--without-results {
        grid-template-columns: 1fr;
      }

      &--clickable {
        cursor: pointer;
      }
    }

    &-cell-text {
      margin: 0;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  %base-row {
    display: grid;
    align-items: center;
  }
}
</style>

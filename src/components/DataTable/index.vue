<template>
  <table
    class="unnnic-data-table"
    :style="props.fixedHeaders ? {} : heightStyles"
  >
    <thead
      v-if="!shouldHideHeaders"
      class="unnnic-data-table__header"
    >
      <tr class="unnnic-data-table__header-row">
        <th
          v-for="header in headers"
          :key="header.itemKey"
          :class="[
            'unnnic-data-table__header-cell',
            {
              'unnnic-data-table__header-cell--clickable': header.isSortable,
              'unnnic-data-table__header-cell--sorting':
                sortState.header === header.title && sortState.order !== '',
            },
          ]"
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
          <template v-if="header.isSortable">
            <IconArrowsDefault
              v-if="sortState.header !== header.title"
              class="order-default-icon"
              data-testid="arrow-default-icon"
            />
            <Icon
              v-else-if="sortState.order === 'asc'"
              clickable
              size="ant"
              :icon="'switch_left'"
              style="transform: rotate(-90deg)"
              data-testid="arrow-asc-icon"
            />
            <Icon
              v-else-if="sortState.order === 'desc'"
              clickable
              size="ant"
              :icon="'switch_left'"
              style="transform: rotate(90deg)"
              data-testid="arrow-desc-icon"
            />
          </template>
        </th>
      </tr>
    </thead>
    <tbody
      ref="tbodyRef"
      :class="[
        'unnnic-data-table__body',
        { 'unnnic-data-table__body--hide-headers': props.hideHeaders },
      ]"
      :style="props.fixedHeaders ? heightStyles : {}"
    >
      <tr
        v-if="isLoading"
        :class="[
          'unnnic-data-table__body-row',
          'unnnic-data-table__body-row--loading',
        ]"
      >
        <td
          :class="[
            'unnnic-data-table__body-cell',
            `unnnic-data-table__body-cell--${size}`,
          ]"
        >
          <img
            class="unnnic-data-table__body-cell--loading"
            data-testid="body-row-loading"
            src="../../assets/icons/weni-loading.svg"
            height="40"
          />
        </td>
      </tr>
      <template v-else-if="props.items.length">
        <tr
          v-for="(item, index) in props.items"
          :key="index"
          :class="[
            'unnnic-data-table__body-row',
            { 'unnnic-data-table__body-row--clickable': props.clickable },
          ]"
          @click="handleClickRow(item)"
        >
          <template
            v-for="key in headersItemsKeys"
            :key="key"
          >
            <td
              v-if="slots[`body-${key}`]"
              :class="[
                'unnnic-data-table__body-cell',
                `unnnic-data-table__body-cell--${size}`,
              ]"
            >
              <slot
                :name="`body-${key}`"
                :item="item"
              />
            </td>
            <td
              v-else
              :class="[
                'unnnic-data-table__body-cell',
                `unnnic-data-table__body-cell--${size}`,
              ]"
            >
              {{ item[key] }}
            </td>
          </template>
        </tr>
        <tr
          v-if="props.infiniteScroll && props.isLoadingMore"
          :class="[
            'unnnic-data-table__body-row',
            'unnnic-data-table__body-row--loading-more',
          ]"
        >
          <td
            :class="[
              'unnnic-data-table__body-cell',
              `unnnic-data-table__body-cell--${size}`,
            ]"
          >
            <img
              class="unnnic-data-table__body-cell--loading"
              data-testid="body-row-loading-more"
              src="../../assets/icons/weni-loading.svg"
              height="40"
            />
          </td>
        </tr>
      </template>
      <tr
        v-else
        :class="[
          'unnnic-data-table__body-row',
          'unnnic-data-table__body-row--without-results',
        ]"
      >
        <td
          v-if="slots['without-results']"
          :class="[
            'unnnic-data-table__body-cell',
            `unnnic-data-table__body-cell--${size}`,
          ]"
        >
          <slot name="without-results" />
        </td>
        <td
          v-else
          :class="[
            'unnnic-data-table__body-cell',
            `unnnic-data-table__body-cell--${size}`,
          ]"
          data-testid="body-cell"
        >
          <p
            class="unnnic-data-table__body-cell-text"
            data-testid="body-cell-text"
          >
            {{ defaultTranslations.without_results[props.locale || 'en'] }}
          </p>
        </td>
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
import { computed, ComputedRef, ref, useSlots } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';

import Icon from '../Icon.vue';
import IconArrowsDefault from '../icons/iconArrowsDefault.vue';
import TablePagination from '../TableNext/TablePagination.vue';

type DataTableHeader = {
  title: string;
  isSortable?: boolean;
  itemKey: string;
  align?: 'start' | 'center' | 'end';
  size?: number | string;
};

type DataTableItem = {
  [key: string]: any;
};

type SortState = {
  header: string;
  itemKey: string;
  order: string;
};

interface Props {
  headers: DataTableHeader[];
  items: DataTableItem[];
  isLoading?: boolean;
  size?: 'sm' | 'md';
  height?: string;
  maxHeight?: string;
  clickable?: boolean;
  fixedHeaders?: boolean;
  hideHeaders?: boolean;
  hidePagination?: boolean;
  page?: number;
  pageTotal?: number;
  pageInterval?: number;
  locale?: string;
  sort?: SortState;
  infiniteScroll?: boolean;
  infiniteScrollDistance?: number;
  infiniteScrollDisabled?: boolean;
  isLoadingMore?: boolean;
}

defineOptions({
  name: 'UnnnicDataTable',
});

const slots = useSlots();

const emit = defineEmits<{
  'update:sort': [sort: { header: string; itemKey: string; order: string }];
  itemClick: [item: DataTableItem];
  'update:page': [page: number];
  loadMore: [];
}>();

const props = withDefaults(defineProps<Props>(), {
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

const defaultTranslations = {
  without_results: {
    'pt-br': 'Nenhum resultado correspondente',
    en: 'No matching results',
    es: 'No hay resultados coincidentes',
  },
};

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

const headersItemsKeys: ComputedRef<string[]> = computed(() => {
  return props.headers.map((header) => header.itemKey);
});

const internalSort = ref({
  header: '',
  itemKey: '',
  order: '',
});

const sortState = computed(() => {
  return props.sort !== undefined ? props.sort : internalSort.value;
});

const getHeaderColumnSize = (header: DataTableHeader): string => {
  return typeof header.size === 'number'
    ? `${header.size || 1}fr`
    : header.size || '1fr';
};

const gridTemplateColumns: ComputedRef<string> = computed(() => {
  const columnSizes = props.headers.length
    ? props.headers.map(getHeaderColumnSize)
    : props.items[0].content.map(() => '1fr');

  return columnSizes.join(' ');
});

const handleSort = (header: SortState, order: string) => {
  if (props.sort === undefined) {
    internalSort.value = { ...header, order };
  }

  emit('update:sort', { ...header, order });
};

const handleClickHeader = (header: DataTableHeader) => {
  if (!header.isSortable) return;

  const nextSortOrderMapper = {
    asc: 'desc',
    desc: 'asc',
    '': 'asc',
  };

  const nextSort =
    header.title !== sortState.value.header
      ? 'asc'
      : nextSortOrderMapper[sortState.value.order];

  handleSort(
    nextSort === ''
      ? { header: '', itemKey: '', order: '' }
      : { header: header.title, itemKey: header.itemKey, order: nextSort },
    nextSort,
  );
};

const handleClickRow = (item: DataTableItem) => {
  if (!props.clickable) return;

  emit('itemClick', item);
};

const tbodyRef = ref<HTMLElement | null>(null);

const handleLoadMore = () => {
  if (props.infiniteScrollDisabled || props.isLoading || props.isLoadingMore) {
    return;
  }
  emit('loadMore');
};

if (props.infiniteScroll) {
  useInfiniteScroll(tbodyRef, handleLoadMore, {
    distance: props.infiniteScrollDistance,
  });
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/unnnic' as *;

$tableBorder: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;

.unnnic-data-table {
  border-spacing: 0;

  overflow: hidden;

  width: 100%;

  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: $unnnic-spacing-inline-nano;
  }

  &::-webkit-scrollbar-thumb {
    background: $unnnic-color-neutral-cleanest;
    border-radius: $unnnic-border-radius-pill;
  }

  &::-webkit-scrollbar-track {
    background: $unnnic-color-neutral-soft;
    border-radius: $unnnic-border-radius-pill;
  }

  &__header {
    &-row {
      @extend %base-row;

      grid-template-columns: v-bind(gridTemplateColumns);
    }

    &-cell {
      @extend %base-cell;

      height: 100%;

      box-sizing: border-box;
      border: $tableBorder;
      background-color: $unnnic-color-neutral-light;

      font-weight: $unnnic-font-weight-bold;

      display: flex;

      &:first-of-type {
        border-radius: $unnnic-border-radius-sm 0 0 0;
      }

      &:not(:first-of-type) {
        border-left: none;
      }

      &:last-of-type {
        border-radius: 0 $unnnic-border-radius-sm 0 0;
      }

      &--sorting {
        background-color: $unnnic-color-neutral-soft;
      }

      &--clickable {
        &:hover {
          cursor: pointer;
          background-color: $unnnic-color-neutral-soft;
        }
      }
    }
  }

  &__body {
    &::-webkit-scrollbar {
      width: $unnnic-spacing-inline-nano;
    }

    &::-webkit-scrollbar-thumb {
      background: $unnnic-color-neutral-cleanest;
      border-radius: $unnnic-border-radius-pill;
    }

    &::-webkit-scrollbar-track {
      background: $unnnic-color-neutral-soft;
      border-radius: $unnnic-border-radius-pill;
    }

    &--hide-headers {
      .unnnic-data-table__body-row:first-of-type {
        border-radius: $unnnic-border-radius-sm $unnnic-border-radius-sm 0 0;
        border-top: $tableBorder;
      }
    }

    &-row {
      @extend %base-row;

      overflow: hidden;

      border: $tableBorder;
      border-collapse: collapse;
      border-top: none;

      grid-template-columns: v-bind(gridTemplateColumns);

      &--loading,
      &--loading-more,
      &--without-results {
        grid-template-columns: 1fr;
      }

      &--clickable {
        text-decoration: none;

        &:hover {
          cursor: pointer;
          background-color: $unnnic-color-neutral-lightest;
        }
      }

      &:last-of-type {
        border-radius: 0 0 $unnnic-border-radius-sm $unnnic-border-radius-sm;
      }
    }

    &-cell {
      @extend %base-cell;

      &-text {
        margin: 0;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    td.unnnic-data-table__body-cell--sm {
      padding: $unnnic-spacing-ant $unnnic-spacing-sm;
    }

    &-cell--loading {
      margin: $unnnic-space-10 0;
      padding: 0;

      width: 100%;

      pointer-events: none;
    }
  }

  %base-cell {
    border-collapse: collapse;

    padding: $unnnic-spacing-sm $unnnic-spacing-sm;

    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-line-height-small * 5.5;
    text-align: left;
    color: $unnnic-color-neutral-dark;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  %base-row {
    display: grid;
    align-items: center;
  }
}
</style>

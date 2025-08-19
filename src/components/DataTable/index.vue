<template>
  <table class="unnnic-data-table">
    <thead
      v-if="!props.hideHeaders"
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
                sort.header === header.title && sort.order !== '',
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
              v-if="sort.header !== header.title"
              class="order-default-icon"
              data-testid="arrow-default-icon"
            />
            <Icon
              v-else-if="sort.order === 'asc'"
              clickable
              size="ant"
              :icon="'switch_left'"
              style="transform: rotate(-90deg)"
              data-testid="arrow-asc-icon"
            />
            <Icon
              v-else-if="sort.order === 'desc'"
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
      :class="[
        'unnnic-data-table__body',
        { 'unnnic-data-table__body--hide-headers': props.hideHeaders },
      ]"
    >
      <tr
        v-if="isLoading"
        :class="[
          'unnnic-data-table__body-row',
          'unnnic-data-table__body-row--loading',
        ]"
      >
        <img
          class="unnnic-data-table__body-cell--loading"
          data-testid="body-row-loading"
          src="../../assets/icons/weni-loading.svg"
          height="40"
        />
      </tr>
      <template v-else-if="props.items.length">
        <tr
          v-for="(item, index) in props.items"
          :key="index"
          class="unnnic-data-table__body-row"
        >
          <template
            v-for="key in headersItemsKeys"
            :key="key"
          >
            <slot
              v-if="slots[`body-${key}`]"
              :name="`body-${key}`"
              :class="[
                'unnnic-data-table__body-cell',
                `unnnic-data-table__body-cell--${size}`,
              ]"
              :item="item"
            />
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
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
export default {
  name: 'UnnnicDataTable',
};
</script>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';

import Icon from '../Icon.vue';
import IconArrowsDefault from '../icons/iconArrowsDefault.vue';

const slots = useSlots();

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

const emit = defineEmits<{
  sort: [sort: { header: string; order: string }];
}>();

const props = defineProps<{
  headers: {
    type: DataTableHeader[];
    required: true;
  };
  items: {
    type: DataTableItem[];
    required: true;
  };
  isLoading: {
    type: Boolean;
    default: false;
  };
  size: {
    type: 'sm' | 'md';
    default: 'md';
  };
  height: {
    type: String | Number;
    default: '';
  };
  clickable: {
    type: Boolean;
    default: false;
  };
  hideHeaders: {
    type: Boolean;
    default: false;
  };
  pagination: {
    type: Number;
    default: 1;
  };
  paginationTotal: {
    type: Number;
    default: 1;
  };
  paginationInterval: {
    type: Number;
    default: 1;
  };
  fixedHeader: {
    type: Boolean;
    default: false;
  };
}>();

const headersItemsKeys: string[] = computed(() => {
  return props.headers.map((header) => header.itemKey);
});

const sort = ref({
  header: '',
  order: '',
});

const getHeaderColumnSize = (header: DataTableHeader): string => {
  return typeof header.size === 'number'
    ? `${header.size || 1}fr`
    : header.size || '1fr';
};

const gridTemplateColumns: string = computed(() => {
  const columnSizes = props.headers.length
    ? props.headers.map(getHeaderColumnSize)
    : props.items[0].content.map(() => '1fr');

  return columnSizes.join(' ');
});

const handleSort = (key: string, order: string) => {
  sort.value = { header: key, order };
  emit('sort', sort.value);
};

const handleClickHeader = (header: DataTableHeader) => {
  if (!header.isSortable) return;

  const nextSortOrderMapper = {
    asc: 'desc',
    desc: 'asc',
    '': 'asc',
  };

  const nextSort =
    header.title !== sort.value.header
      ? 'asc'
      : nextSortOrderMapper[sort.value.order];

  handleSort(nextSort === '' ? '' : header.title, nextSort);
};
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

      &--loading {
        grid-template-columns: 1fr;
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
      margin: $unnnic-spacing-xl 0;
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

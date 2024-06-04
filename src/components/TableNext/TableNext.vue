<template>
  <table class="unnnic-table-next">
    <thead class="unnnic-table-next__header">
      <tr class="unnnic-table-next__header-row">
        <th
          v-for="(cell, index) of headers"
          :key="cell.content + index"
          class="unnnic-table-next__header-cell"
        >
          {{ cell.content }}
        </th>
      </tr>
    </thead>

    <tbody class="unnnic-table-next__body">
      <tr
        v-for="(row, index) of rows"
        :key="row.content + index"
        class="unnnic-table-next__body-row"
      >
        <a
          v-if="row.link"
          class="unnnic-table-next__body-row--redirect"
          :href="row.link.url"
          :target="row.link.target || '_blank'"
        >
          <TableBodyCell
            v-for="(cell, index) of row.content"
            :key="cell + index"
            class="unnnic-table-next__body-cell"
            :cell="cell"
          />
        </a>
        <template v-else>
          <TableBodyCell
            v-for="(cell, index) of row.content"
            :key="cell + index"
            class="unnnic-table-next__body-cell"
            :cell="cell"
          />
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { validateHeaders, validateRows } from './validation';
import TableBodyCell from './TableBodyCell.vue';

export default {
  name: 'UnnnicTableNext',

  props: {
    /**
     * @typedef {Array} HeaderItem
     * @property {string} content - The content of the header cell.
     * @property {boolean|undefined} isSortable - Indicates if the cell is enabled for sorting.
     */

    /**
     * Array of header items.
     * @type {HeaderItem[]}
     */
    headers: {
      type: Array,
      default: () => [],
      validator: validateHeaders,
    },

    /**
     * @typedef {Array} RowItem
     * @property {Array} content - The content of the row cell.
     * @property {object|undefined} link - Link object to redirect the row cell.
     */

    /**
     * Array of row items.
     * @type {RowItem[]}
     */
    rows: {
      type: Array,
      default: () => [],
      validator: validateRows,
    },
  },

  components: {
    TableBodyCell,
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

$tableBorder: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;

.unnnic-table-next {
  border-spacing: 0;

  overflow: hidden;

  width: 100%;

  &__header {
    &-row {
      @extend %base-row;
    }

    &-cell {
      @extend %base-cell;

      height: 100%;

      box-sizing: border-box;
      border: $tableBorder;
      background-color: $unnnic-color-neutral-light;

      font-weight: $unnnic-font-weight-bold;

      &:first-of-type {
        border-radius: $unnnic-border-radius-sm 0 0 0;
      }

      &:not(:first-of-type) {
        border-left: none;
      }

      &:last-of-type {
        border-radius: 0 $unnnic-border-radius-sm 0 0;
      }
    }
  }

  &__body {
    &-row {
      @extend %base-row;

      border: $tableBorder;
      border-collapse: collapse;
      border-top: none;

      &--redirect {
        @extend %base-row;
        text-decoration: none;

        &:hover {
          background-color: $unnnic-color-neutral-lightest;
        }

        :visited {
          color: $unnnic-color-neutral-dark;
        }
      }

      &:last-of-type {
        border-radius: 0 0 $unnnic-border-radius-sm $unnnic-border-radius-sm;
      }
    }

    &-cell {
      @extend %base-cell;
    }
  }

  %base-cell {
    border-collapse: collapse;

    padding: $unnnic-spacing-ant $unnnic-spacing-sm;

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
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    align-items: center;
  }
}
</style>

<template>
  <table class="unnnic-table-next">
    <thead
      v-if="!shouldHideHeaders"
      class="unnnic-table-next__header"
      data-testid="header"
    >
      <tr
        class="unnnic-table-next__header-row"
        data-testid="header-row"
        :style="{ gridTemplateColumns }"
      >
        <th
          v-for="(cell, index) of headers"
          :key="cell.content + index"
          class="unnnic-table-next__header-cell"
          data-testid="header-cell"
        >
          {{ cell.content }}
        </th>
      </tr>
    </thead>

    <tbody
      :class="{
        'unnnic-table-next__body': true,
        'unnnic-table-next__body--hide-headers': shouldHideHeaders,
      }"
      data-testid="body"
    >
      <tr
        v-if="isLoading"
        class="unnnic-table-next__body-row"
      >
        <img
          class="unnnic-table-next__body-cell--loading"
          data-testid="body-row-loading"
          src="../../assets/icons/weni-loading.svg"
          height="40"
        />
      </tr>
      <template v-else-if="rows.length">
        <tr
          v-for="(row, index) of rows"
          :key="row.content + index"
          class="unnnic-table-next__body-row"
          data-testid="body-row"
          :style="{
            gridTemplateColumns: row.link ? 'auto' : gridTemplateColumns,
          }"
          @click="$emit('row-click', row)"
        >
          <a
            v-if="row.link"
            class="unnnic-table-next__body-row--redirect"
            data-testid="body-row-redirect"
            :style="{ gridTemplateColumns }"
            :href="row.link.url"
            :target="row.link.target || '_blank'"
          >
            <TableBodyCell
              v-for="cell of row.content"
              :key="cell + index"
              :class="[
                'unnnic-table-next__body-cell',
                `unnnic-table-next__body-cell--${size}`,
              ]"
              data-testid="body-cell"
              :cell="cell"
            />
          </a>
          <template v-else>
            <TableBodyCell
              v-for="cell of row.content"
              :key="cell + index"
              :class="[
                'unnnic-table-next__body-cell',
                `unnnic-table-next__body-cell--${size}`,
              ]"
              data-testid="body-cell"
              :cell="cell"
            />
          </template>
        </tr>
      </template>
      <tr
        v-else
        class="unnnic-table-next__body-row"
      >
        <td
          :class="[
            'unnnic-table-next__body-cell',
            `unnnic-table-next__body-cell--${size}`,
          ]"
          data-testid="body-cell"
        >
          <p
            class="unnnic-table-next__body-cell-text"
            data-testid="body-cell-text"
          >
            {{ i18n('without_results') }}
          </p>
        </td>
      </tr>
    </tbody>
    <TablePagination
      :modelValue="pagination"
      :total="treatedPaginationTotal"
      :interval="paginationInterval"
      @update:model-value="$emit('update:pagination', $event)"
    />
  </table>
</template>

<script>
import { validateHeaders, validateRows } from './validation';
import TableBodyCell from './TableBodyCell.vue';
import TablePagination from './TablePagination.vue';
import UnnnicI18n from '../../mixins/i18n';

export default {
  name: 'UnnnicTableNext',

  components: {
    TableBodyCell,
    TablePagination,
  },

  mixins: [UnnnicI18n],

  props: {
    /**
     * @typedef {Array} HeaderItem
     * @property {string} content - The content of the header cell.
     * @property {number|string} size - The size of the header cell, either as a fraction (number) or 'auto'.
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

    size: {
      type: String,
      default: 'sm',
      validator: (value) => ['md', 'sm'].includes(value),
    },

    hideHeaders: {
      type: Boolean,
      default: false,
    },

    pagination: {
      type: Number,
      default: 1,
    },
    paginationTotal: {
      type: Number,
      default: 1,
    },
    paginationInterval: {
      type: Number,
      default: 1,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:pagination', 'row-click'],

  data() {
    return {
      defaultTranslations: {
        without_results: {
          'pt-br': 'Nenhum resultado correspondente',
          en: 'No matching results',
          es: 'No hay resultados coincidentes',
        },
      },
    };
  },

  computed: {
    treatedPaginationTotal() {
      return this.rows.length === 0 ? 0 : this.paginationTotal;
    },
    gridTemplateColumns() {
      const defaultSize = '1fr';
      const getHeaderColumnSize = (header) =>
        typeof header.size === 'number'
          ? `${header.size || 1}fr`
          : header.size || defaultSize;

      const columnSizes = this.headers.length
        ? this.headers.map(getHeaderColumnSize)
        : this.rows[0].content.map(() => defaultSize);

      return columnSizes.join(' ');
    },
    shouldHideHeaders() {
      return this.hideHeaders || !this.headers.length;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

$tableBorder: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;

.unnnic-table-next {
  border-spacing: 0;

  overflow: hidden;

  width: 100%;

  display: flex;
  flex-direction: column;

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
    &--hide-headers {
      .unnnic-table-next__body-row:first-of-type {
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

      &-text {
        margin: 0;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    td.unnnic-table-next__body-cell--sm {
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

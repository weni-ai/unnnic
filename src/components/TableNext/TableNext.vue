<template>
  <table
    class="unnnic-table-next"
  >
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
        <td
          v-for="(cell, index) of row.content"
          :key="cell + index"
          class="unnnic-table-next__body-cell"
        >
         {{cell}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'UnnnicTableNext',

  components: {},

  props: {
    /**
     * @typedef {Array} Headers
     * @property {string} content - Content of head cell.
     * @property {boolean|undefined} [isSortable] - Indicates if the cell is enabled for sorting.
     */
    headers: {
      type: Array,
      default: () => [],
      validator(value) {
        if (!Array.isArray(value)) {
          throw new Error('Prop headers needs to be an array.');
        }

        if (value.length === 0) {
          throw new Error('Prop headers must not to be an empty array.');
        }

        value.forEach((cell) => {
          if (!cell.content || typeof cell.content !== 'string') {
            throw new Error('Prop headers needs to be all the objects with content being a string.');
          }

          if (Object.keys(cell).includes('isSortable') && typeof cell.isSortable !== 'boolean' && typeof cell.isSortable !== 'undefined') {
            throw new Error('Prop headers needs to be all the objects with isSortable being a boolean or undefined.');
          }

          return true;
        });

        return true;
      },
    },

    /**
     * @typedef {Array} Rows
     * @property {string|array|} content - Content of row cell.
     * @property {string|undefined} link - Link to redirect row cell.
     */
    rows: {
      type: Array,
      default: () => [],
      validator(value) {
        if (!Array.isArray(value)) {
          throw new Error('Prop rows needs to be an array.');
        }

        if (value.length === 0) {
          throw new Error('Prop rows must not to be an empty array.');
        }

        value.forEach((cell) => {
          if (!cell.content || !Array.isArray(cell.content)) {
            throw new Error('Prop rows needs to be all the objects with content being a array.');
          }

          if (Object.keys(cell).includes('link') && typeof cell.link !== 'string' && typeof cell.link !== 'undefined') {
            throw new Error('Prop headers needs to be all the objects with link being a boolean or undefined.');
          }

          return true;
        });

        return true;
      },
    },
  },

  computed: {},
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
  }
}
</style>

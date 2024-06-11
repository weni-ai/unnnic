<template>
  <td class="unnnic-table-next__body-cell">
    <template v-if="getIsComponent(cell)">
      <component
        :is="cell.component"
        v-bind="cell.props"
        v-on="cell.events"
      />
    </template>
    <template v-else>
      <p class="unnnic-table-next__body-cell-text">{{ cell }}</p>
    </template>
  </td>
</template>

<script>
export default {
  name: 'TableBodyCell',

  props: {
    cell: {
      type: [String, Object],
      default: '',
    },
  },
  methods: {
    getIsComponent(cell) {
      return typeof cell === 'object';
    },
  },
};
</script>

<style lang="scss" scoped>
.unnnic-table-next__body-cell-text {
  margin: 0;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

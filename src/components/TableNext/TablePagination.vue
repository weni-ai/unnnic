<template>
  <section
    class="table-pagination"
  >
    <p
      class="table-pagination__count"
    >
      {{ tablePagination }}
    </p>

    <Pagination
      :value="value"
      @input="$emit('input', $event)"
      :max="pages"
      :show="5"
    />
  </section>
</template>

<script>
import Pagination from '../Pagination/Pagination.vue';
import UnnnicI18n from '../../mixins/i18n';

export default {
  name: 'TablePagination',

  mixins: [UnnnicI18n],

  components: {
    Pagination,
  },

  props: {
    value: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: false,
    },
    interval: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      defaultTranslations: {
        pagination: {
          'pt-br': '{from} - {to} de {total}',
          en: '{from} - {to} of {total}',
          es: '{from} - {to} de {total}',
        },
      },
    };
  },

  computed: {
    tablePagination() {
      const { value, interval, total } = this;

      return this.i18n('pagination', {
        from: total === 0 ? 0 : (value - 1) * interval + 1,
        to: Math.min(value * interval, total),
        total,
      });
    },

    pages() {
      return Math.ceil(this.total / this.interval);
    },
    showTotal() {
      return typeof this.total === 'number';
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.table-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: $unnnic-spacing-sm $unnnic-spacing-nano;

  height: min-content;

  &__count {
    color: $unnnic-color-neutral-dark;
    font-size: $unnnic-font-size-body-gt;
    font-family: $unnnic-font-family-secondary;
  }
}
</style>

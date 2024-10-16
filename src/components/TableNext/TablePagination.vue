<template>
  <section class="table-pagination">
    <p
      class="table-pagination__count"
      data-testid="count"
    >
      {{ tablePagination }}
    </p>

    <Pagination
      :modelValue="modelValue"
      :max="pages"
      :show="5"
      @update:model-value="$emit('update:model-value', $event)"
    />
  </section>
</template>

<script>
import Pagination from '../Pagination/Pagination.vue';
import UnnnicI18n from '../../mixins/i18n';

export default {
  name: 'TablePagination',

  components: {
    Pagination,
  },

  mixins: [UnnnicI18n],

  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: false,
      default: 0,
    },
    interval: {
      type: Number,
      required: true,
    },
  },

  emits: ['update:model-value'],

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
      const { modelValue, interval, total } = this;

      return this.i18n('pagination', {
        from: total === 0 ? 0 : (modelValue - 1) * interval + 1,
        to: Math.min(modelValue * interval, total),
        total,
      });
    },

    pages() {
      return Math.ceil(this.total / this.interval);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

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

<template>
  <div class="unnnic-date-filter">
    <UnnnicInput
      class="unnnic-date-filter__input"
      :size="size"
      iconLeft="notes-1"
      readonly
      :mask="fullMask"
      :value="dateRange"
      :placeholder="placeholder"
      @focus.stop="emitFilter"
    ></UnnnicInput>
  </div>
</template>

<script>
import { formatDate } from '@/utils/formatDate';
import UnnnicInput from '../Input/Input.vue';

export default {
  name: 'UnnnicDateFilter',
  components: { UnnnicInput },
  props: {
    size: {
      type: String,
      default: 'sm',
    },
    dateFormat: {
      type: String,
      default: 'DD/MM/YYYY',
    },
    dateSeparator: {
      type: String,
      default: '~',
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    useDateFns: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dateRange() {
      let range = '';
      const outputFormat = this.dateFormat.replaceAll('/', '');

      if (this.startDate) {
        range += formatDate(this.startDate, outputFormat, {
          useDateFns: this.useDateFns,
        });
      }

      if (this.endDate) {
        range += formatDate(this.endDate, outputFormat, {
          useDateFns: this.useDateFns,
        });
      }

      return range;
    },
    fullMask() {
      return `${this.maskedDateFormat} !${this.dateSeparator} ${this.maskedDateFormat}`;
    },
    maskedDateFormat() {
      return this.dateFormat.replace(/D|M|Y/gi, '#');
    },
  },
  methods: {
    emitFilter() {
      this.$emit('filter');
    },
  },
};
</script>

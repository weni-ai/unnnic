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
import moment from 'moment';
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
  },
  computed: {
    dateRange() {
      let range = '';

      if (this.startDate) {
        const formattedDate = moment(this.startDate).format(
          this.dateFormat.replaceAll('/', ''),
        );
        range += formattedDate.toString();
      }

      if (this.endDate) {
        const formattedDate = moment(this.endDate).format(
          this.dateFormat.replaceAll('/', ''),
        );
        range += formattedDate.toString();
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

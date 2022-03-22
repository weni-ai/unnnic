<template>
  <div class="unnnic-date-filter">
    <unnnic-input
      class="unnnic-date-filter__input"
      :size="size"
      icon-left="notes-1"
      @focus.stop="emitFilter"
      readonly
      :mask="fullMask"
      :value="dateRange"
      :placeholder="placeholder"
    ></unnnic-input>
  </div>
</template>

<script>
import moment from 'moment';
import unnnicInput from '../Input/Input.vue';

export default {
  name: 'unnnic-date-filter',
  components: { unnnicInput },
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
  methods: {
    emitFilter() {
      this.$emit('filter');
    },
  },
  computed: {
    dateRange() {
      let range = '';

      if (this.startDate) {
        const formattedDate = moment(this.startDate).format(this.dateFormat.replaceAll('/', ''));
        range += formattedDate.toString();
      }

      if (this.endDate) {
        const formattedDate = moment(this.endDate).format(this.dateFormat.replaceAll('/', ''));
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
};
</script>

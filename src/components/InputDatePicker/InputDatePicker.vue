<template>
  <div ref="dropdown" :class="['dropdown', { active: showCalendarFilter }]">
    <unnnic-input
      class="input"
      :size="size"
      icon-left="notes-1"
      @focus="showCalendarFilter = true"
      readonly
      :value="filterText"
    ></unnnic-input>

    <div class="dropdown-data" :style="{ [position]: '0' }">
      <unnnic-date-picker
        v-if="showCalendarFilter"
        :type="type"
        :clearLabel="clearText"
        :actionLabel="actionText"
        :months="months"
        :days="days"
        :options="options"
        @submit="changeDate"
        :initial-start-date="initialStartDate"
        :initial-end-date="initialEndDate"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import UnnnicInput from '../Input/Input.vue';
import UnnnicDatePicker from '../DatePicker/DatePicker.vue';

export default {
  model: {
    event: 'changed',
  },

  components: {
    UnnnicInput,
    UnnnicDatePicker,
  },

  props: {
    value: {
      type: Object,
    },

    type: {
      type: String,
      default: 'day',
    },

    size: {
      type: String,
      default: 'md',
    },

    clearText: {
      type: String,
      default: 'Clear',
    },

    actionText: {
      type: String,
      default: 'Filter',
    },

    months: {
      type: Array,
    },

    days: {
      type: Array,
    },

    options: {
      type: Array,
    },

    format: {
      type: String,
      default: 'YYYY-MM-DD',
    },

    inputFormat: {
      type: String,
      default: 'MM-DD-YYYY',
    },

    position: {
      type: String,
      default: 'left',
    },
  },

  data() {
    return {
      showCalendarFilter: false,
    };
  },

  computed: {
    filterText() {
      const dates = [];

      if (this.value.start) {
        dates.push(moment(this.value.start, this.format).format(this.inputFormat));
      }

      if (this.value.end) {
        dates.push(moment(this.value.end, this.format).format(this.inputFormat));
      }

      if (!dates.length) {
        return '—';
      }

      return dates.join(' ~ ');
    },

    initialStartDate() {
      return this.value.start ? moment(this.value.start, this.format).format('MM DD YYYY') : null;
    },

    initialEndDate() {
      return this.value.end ? moment(this.value.end, this.format).format('MM DD YYYY') : null;
    },
  },

  mounted() {
    window.document.body.addEventListener('click', this.mouseout);
  },

  beforeDestroy() {
    window.document.body.removeEventListener('click', this.mouseout);
  },

  methods: {
    mouseout(event) {
      if (event && event.path && event.path.includes && event.path.includes(this.$refs.dropdown)) {
        return;
      }

      this.showCalendarFilter = false;
    },

    changeDate(value) {
      const startDate = value.startDate.replace(
        /(\d+)-(\d+)-(\d+)/,
        '$3-$1-$2',
      );

      const endDate = value.endDate.replace(/(\d+)-(\d+)-(\d+)/, '$3-$1-$2');

      this.showCalendarFilter = false;

      this.$emit('changed', {
        start: startDate ? moment(startDate, 'YYYY-MM-DD').format(this.format) : null,
        end: endDate ? moment(endDate, 'YYYY-MM-DD').format(this.format) : null,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.dropdown {
  position: relative;
  display: inline-block;

  .dropdown-data {
    position: absolute;
    pointer-events: none;
    display: none;
    top: 100%;
    z-index: 2;
    margin-top: $unnnic-spacing-stack-nano;
    width: max-content;
  }

  &.active .dropdown-data {
    pointer-events: auto;
    display: block;
  }

  .input {
    display: inline-block;
  }
}
</style>

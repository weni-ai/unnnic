<template>
  <div
    ref="dropdown"
    :class="['dropdown', { active: showCalendarFilter }]"
  >
    <UnnnicInput
      class="input"
      :size="size"
      iconLeft="notes-1"
      readonly
      :modelValue="filterText"
      @focus="showCalendarFilter = true"
    ></UnnnicInput>

    <div
      class="dropdown-data"
      :style="{ [position]: '0' }"
    >
      <UnnnicDatePicker
        v-if="showCalendarFilter"
        :type="type"
        :clearLabel="clearText"
        :actionLabel="actionText"
        :months="months"
        :days="days"
        :options="options"
        :initialStartDate="initialStartDate"
        :initialEndDate="initialEndDate"
        @submit="changeDate"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import UnnnicInput from '../Input/Input.vue';
import UnnnicDatePicker from '../DatePicker/DatePicker.vue';

export default {
  components: {
    UnnnicInput,
    UnnnicDatePicker,
  },
  model: {
    event: 'changed',
  },

  props: {
    modelValue: {
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

      if (this.modelValue?.start) {
        dates.push(
          moment(this.modelValue?.start, this.format).format(this.inputFormat),
        );
      }

      if (this.modelValue?.end) {
        dates.push(
          moment(this.modelValue?.end, this.format).format(this.inputFormat),
        );
      }

      if (!dates.length) {
        return '—';
      }

      return dates.join(' ~ ');
    },

    initialStartDate() {
      return this.modelValue.start
        ? moment(this.modelValue.start, this.format).format('MM DD YYYY')
        : null;
    },

    initialEndDate() {
      return this.modelValue.end
        ? moment(this.modelValue.end, this.format).format('MM DD YYYY')
        : null;
    },
  },

  mounted() {
    window.document.body.addEventListener('click', this.mouseout);
  },

  beforeUnmount() {
    window.document.body.removeEventListener('click', this.mouseout);
  },

  methods: {
    mouseout(event) {
      if (this.$refs.dropdown?.contains(event.target)) {
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

      this.$emit('update:model-value', {
        start: startDate
          ? moment(startDate, 'YYYY-MM-DD').format(this.format)
          : null,
        end: endDate ? moment(endDate, 'YYYY-MM-DD').format(this.format) : null,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

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

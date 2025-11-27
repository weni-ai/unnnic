<template>
  <div
    ref="dropdown"
    :class="['dropdown', { active: showCalendarFilter, 'fill-w': fillW }]"
  >
    <UnnnicInput
      :class="['input', { 'date-picker-input-next': next }]"
      :size="size"
      :iconLeft="iconPosition === 'left' && 'calendar_month'"
      :iconRight="iconPosition === 'right' && 'calendar_month'"
      hasCloudyColor
      readonly
      :modelValue="overwrittenValue || filterText"
      @focus="showCalendarFilter = true"
    />

    <div
      class="dropdown-data"
      :style="{ [position]: '0' }"
    >
      <UnnnicDatePicker
        v-if="showCalendarFilter"
        v-model:equivalentOption="overwrittenValue"
        :type="type"
        :clearLabel="clearText"
        :actionLabel="actionText"
        :months="months"
        :days="days"
        :options="options"
        :periodBaseDate="periodBaseDate"
        :initialStartDate="initialStartDate"
        :initialEndDate="initialEndDate"
        :minDate="minDate"
        :maxDate="maxDate"
        :disableClear="disableClear"
        @change="emitSelectDate"
        @submit="changeDate"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import UnnnicInput from '../Input/Input.vue';
// @ts-expect-error: avoid leaking internal DatePickerProps type to this JS SFC declaration emit
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
      required: true,
    },

    iconPosition: {
      type: String,
      default: 'left',
      validator(position) {
        return ['left', 'right'].includes(position);
      },
    },

    minDate: { type: String, default: '' },
    maxDate: { type: String, default: '' },

    fillW: {
      type: Boolean,
      default: false,
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
      default: () => [],
    },

    days: {
      type: Array,
      default: () => [],
    },

    options: {
      type: Array,
      default: () => [],
    },

    next: {
      type: Boolean,
      default: false,
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
    disableClear: {
      type: Boolean,
      default: false,
    },

    periodBaseDate: {
      type: String,
      default: '',
    },
  },

  emits: ['update:model-value', 'selectDate'],

  data() {
    return {
      showCalendarFilter: false,
      overwrittenValue: '',
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
        return String(this.inputFormat).replaceAll('-', '/').toLowerCase();
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
    emitSelectDate(date) {
      const { startDate, endDate } = date;
      const formattedDates = {
        start: moment(startDate, 'MM-DD-YYYY').format(this.format),
        end: moment(endDate, 'MM-DD-YYYY').format(this.format),
      };
      this.$emit('selectDate', formattedDates);
    },
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
.fill-w {
  width: 100%;
}
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

  :deep(.date-picker-input-next) {
    width: 100%;
    & input {
      cursor: pointer;
      border: 1px solid $unnnic-color-neutral-soft;
      color: $unnnic-color-neutral-cloudy;
    }
  }
}
</style>

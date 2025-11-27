<template>
  <div
    ref="dropdown"
    :class="['dropdown', { active: showCalendarFilter, 'fill-w': fillW }]"
  >
    <UnnnicInput
      :class="['input', { 'date-picker-input-next': next }]"
      :size="size"
      :iconLeft="iconPosition === 'left' ? 'calendar_month' : undefined"
      :iconRight="iconPosition === 'right' ? 'calendar_month' : undefined"
      hasCloudyColor
      readonly
      :modelValue="overwrittenValue || filterText || ''"
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

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import moment from 'moment';

import UnnnicInput from '../Input/Input.vue';
import UnnnicDatePicker from '../DatePicker/DatePicker.vue';

defineOptions({
  name: 'UnnnicInputDatePicker',
});

type DateRangeValue = {
  start: string | null;
  end: string | null;
};

interface InputDatePickerProps {
  modelValue: DateRangeValue;

  iconPosition?: 'left' | 'right';

  minDate?: string;
  maxDate?: string;

  fillW?: boolean;

  type?: 'day' | 'month' | 'year';
  size?: string;

  clearText?: string;
  actionText?: string;

  months?: string[];
  days?: string[];
  options?: Array<{ name: string; id: string }>;

  next?: boolean;

  format?: string;
  inputFormat?: string | null;

  position?: 'left' | 'right';
  disableClear?: boolean;

  periodBaseDate?: string;
}

const props = withDefaults(defineProps<InputDatePickerProps>(), {
  iconPosition: 'left',
  minDate: '',
  maxDate: '',
  fillW: false,
  type: 'day',
  size: 'md',
  clearText: 'Clear',
  actionText: 'Filter',
  months: () => [],
  days: () => [],
  options: () => [],
  next: false,
  format: 'YYYY-MM-DD',
  inputFormat: 'MM-DD-YYYY',
  position: 'left',
  disableClear: false,
  periodBaseDate: '',
});

const emit = defineEmits<{
  (e: 'update:model-value', value: DateRangeValue): void;
  (e: 'selectDate', value: DateRangeValue): void;
}>();

const dropdown = ref<HTMLElement | null>(null);
const showCalendarFilter = ref(false);
const overwrittenValue = ref('');

const filterText = computed(() => {
  const dates: string[] = [];

  const { start, end } = props.modelValue || {};

  if (start) {
    dates.push(moment(start, props.format).format(props.inputFormat || ''));
  }

  if (end) {
    dates.push(moment(end, props.format).format(props.inputFormat || ''));
  }

  if (!dates.length) {
    return String(props.inputFormat || '')
      .replaceAll('-', '/')
      .toLowerCase();
  }

  return dates.join(' ~ ');
});

const initialStartDate = computed<string | undefined>(() => {
  return props.modelValue.start
    ? moment(props.modelValue.start, props.format).format('MM DD YYYY')
    : undefined;
});

const initialEndDate = computed<string | undefined>(() => {
  return props.modelValue.end
    ? moment(props.modelValue.end, props.format).format('MM DD YYYY')
    : undefined;
});

function emitSelectDate(date: { startDate: string; endDate: string }) {
  const { startDate, endDate } = date;
  const formattedDates: DateRangeValue = {
    start: moment(startDate, 'MM-DD-YYYY').format(props.format),
    end: moment(endDate, 'MM-DD-YYYY').format(props.format),
  };

  emit('selectDate', formattedDates);
}

function mouseout(event: MouseEvent | { target: EventTarget | null }) {
  if (dropdown.value?.contains(event.target as Node)) {
    return;
  }

  showCalendarFilter.value = false;
}

function changeDate(value: { startDate: string; endDate: string }) {
  const startDate = value.startDate.replace(/(\d+)-(\d+)-(\d+)/, '$3-$1-$2');

  const endDate = value.endDate.replace(/(\d+)-(\d+)-(\d+)/, '$3-$1-$2');

  showCalendarFilter.value = false;

  emit('update:model-value', {
    start: startDate
      ? moment(startDate, 'YYYY-MM-DD').format(props.format)
      : null,
    end: endDate ? moment(endDate, 'YYYY-MM-DD').format(props.format) : null,
  });
}

onMounted(() => {
  window.document.body.addEventListener('click', mouseout as any);
});

onBeforeUnmount(() => {
  window.document.body.removeEventListener('click', mouseout as any);
});
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

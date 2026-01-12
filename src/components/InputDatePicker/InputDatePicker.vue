<template>
  <div :class="['dropdown', { 'fill-w': fillW }]">
    <UnnnicPopover v-model:open="isPopoverOpen">
      <UnnnicPopoverTrigger :asChild="true">
        <UnnnicInput
          data-testid="input"
          :class="['input', { 'date-picker-input-next': next }]"
          :size="size"
          :iconLeft="iconPosition === 'left' ? 'calendar_month' : undefined"
          :iconRight="iconPosition === 'right' ? 'calendar_month' : undefined"
          readonly
          :modelValue="overwrittenValue || filterText || ''"
          @click="openPopover"
          @focus="openPopover"
        />
      </UnnnicPopoverTrigger>

      <UnnnicPopoverContent
        width="auto"
        side="bottom"
        :align="popoverAlign"
        class="date-picker-popover-content"
      >
        <UnnnicDatePicker
          v-model:equivalentOption="overwrittenValue"
          data-testid="date-picker"
          variant="popover"
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
      </UnnnicPopoverContent>
    </UnnnicPopover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import moment from 'moment';

import UnnnicInput from '../Input/Input.vue';
import UnnnicDatePicker from '../DatePicker/DatePicker.vue';
import {
  Popover as UnnnicPopover,
  PopoverContent as UnnnicPopoverContent,
  PopoverTrigger as UnnnicPopoverTrigger,
} from '../ui/popover';

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

const isPopoverOpen = ref(false);
const overwrittenValue = ref('');
const popoverAlign = computed<'start' | 'end'>(() =>
  props.position === 'right' ? 'end' : 'start',
);

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

function changeDate(value: { startDate: string; endDate: string }) {
  const startDate = value.startDate.replace(/(\d+)-(\d+)-(\d+)/, '$3-$1-$2');

  const endDate = value.endDate.replace(/(\d+)-(\d+)-(\d+)/, '$3-$1-$2');

  isPopoverOpen.value = false;

  emit('update:model-value', {
    start: startDate
      ? moment(startDate, 'YYYY-MM-DD').format(props.format)
      : null,
    end: endDate ? moment(endDate, 'YYYY-MM-DD').format(props.format) : null,
  });
}

function openPopover() {
  isPopoverOpen.value = true;
}
</script>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;

.date-picker-popover-content {
  overflow: hidden;
  border-radius: $unnnic-radius-2;
  padding: 0;
}
</style>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
.fill-w {
  width: 100%;
}

.dropdown {
  display: inline-block;

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

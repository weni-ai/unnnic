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
      @click="showCalendarFilter = true"
      @focus="showCalendarFilter = true"
    />

    <Teleport to="body">
      <div
        v-if="showCalendarFilter"
        ref="dropdownData"
        class="dropdown-data"
        data-datepicker-dropdown="true"
        :style="dropdownStyles"
        @mousedown.stop
        @click.stop
      >
        <UnnnicDatePicker
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
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  nextTick,
} from 'vue';
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
const dropdownData = ref<HTMLElement | null>(null);
const showCalendarFilter = ref(false);
const overwrittenValue = ref('');
const dropdownStyles = ref<Record<string, string>>({
  position: 'absolute',
  top: '0px',
  left: '0px',
  zIndex: '9999',
});

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

function updateDropdownPosition() {
  if (!dropdown.value || !showCalendarFilter.value) {
    return;
  }

  const rect = dropdown.value.getBoundingClientRect();
  const top = rect.bottom + window.scrollY + 4; // 4px margin

  let left = rect.left + window.scrollX;
  if (props.position === 'right') {
    left = rect.right + window.scrollX;
  }

  dropdownStyles.value = {
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
    zIndex: '9999',
  };
}

function mouseout(event: Event) {
  const target = event.target as Node | null;
  if (
    target &&
    (dropdown.value?.contains(target) || dropdownData.value?.contains(target))
  ) {
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

watch(showCalendarFilter, async (newValue) => {
  if (newValue) {
    await nextTick();
    updateDropdownPosition();
  }
});

onMounted(() => {
  window.document.body.addEventListener('click', mouseout);
  window.addEventListener('scroll', updateDropdownPosition, true);
  window.addEventListener('resize', updateDropdownPosition);
});

onBeforeUnmount(() => {
  window.document.body.removeEventListener('click', mouseout);
  window.removeEventListener('scroll', updateDropdownPosition, true);
  window.removeEventListener('resize', updateDropdownPosition);
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

.dropdown-data {
  pointer-events: auto;
  width: max-content;
}
</style>

<template>
  <div
    class="unnnic-date-picker"
    data-testid="date-picker-root"
  >
    <template v-if="type === 'day'">
      <template
        v-for="(openMonth, index) in openMonths"
        :key="openMonth"
      >
        <div
          class="month-container"
          data-testid="date-picker-month-container"
        >
          <div :class="['header', `header--${size}`]">
            <UnnnicButton
              size="small"
              :iconCenter="`keyboard_arrow_${index === 0 ? 'left' : 'right'}`"
              :type="size === 'large' ? 'secondary' : 'tertiary'"
              class="button-space"
              :style="{ gridArea: `${index === 0 ? 'left' : 'right'}-button` }"
              :data-testid="`date-picker-nav-${index === 0 ? 'left' : 'right'}`"
              @click.stop="
                referenceDate = addMonth(referenceDate, index === 0 ? -1 : 1)
              "
            />

            <div :class="['label', `label--${size}`]">
              {{ monthsLocale[Number(getMonth(openMonth)) - 1] }}
              {{ getFullYear(openMonth) }}
            </div>
          </div>

          <div :class="['days', `days--${size}`]">
            <div
              v-for="(day, dayIndex) in daysLocale"
              :key="dayIndex"
              class="name"
            >
              {{ day }}
            </div>
            <div
              v-for="(date, dateIndex) in getDatesOfTheMonth(openMonth)"
              :key="`${openMonth}-${dateIndex}`"
              :class="{
                disabled:
                  !date.properties.includes('inside month') ||
                  date.properties.includes('out of range'),
                selectable:
                  date.properties.includes('inside month') &&
                  !date.properties.includes('out of range'),
                today: date.properties.includes('today'),
                selected: date.properties.includes('selected'),
                highlighted: date.properties.includes('highlighted'),
                left: date.properties.includes('left-highlighted'),
                right: date.properties.includes('right-highlighted'),
              }"
              data-testid="date-picker-day"
              @click="
                date.properties.includes('inside month') &&
                !date.properties.includes('out of range') &&
                selectDate(date)
              "
            >
              {{ getDate(date) }}
            </div>
          </div>
        </div>

        <div class="divider"></div>
      </template>
    </template>

    <template v-else-if="type === 'month'">
      <template
        v-for="openMonth in [referenceDate]"
        :key="openMonth"
      >
        <div
          class="month-container"
          data-testid="date-picker-month-container"
        >
          <div :class="['header', `header--${size}`]">
            <UnnnicButton
              size="small"
              iconCenter="keyboard_arrow_left"
              :type="size === 'large' ? 'secondary' : 'tertiary'"
              class="button-space"
              :style="{ gridArea: 'left-button' }"
              data-testid="date-picker-month-nav-left"
              @click="referenceDate = addMonth(referenceDate, -12)"
            />

            <div :class="['label', `label--${size}`]">
              {{ getFullYear(openMonth) }}
            </div>

            <UnnnicButton
              size="small"
              iconCenter="keyboard_arrow_right"
              :type="size === 'large' ? 'secondary' : 'tertiary'"
              class="button-space"
              :style="{ gridArea: 'right-button' }"
              data-testid="date-picker-month-nav-right"
              @click="referenceDate = addMonth(referenceDate, 12)"
            />
          </div>

          <div :class="['days', `months--${size}`]">
            <div
              v-for="(date, index) in getMonthsOfTheYear(openMonth)"
              :key="`${openMonth}-${index}`"
              :class="{
                disabled: !date.properties.includes('inside month'),
                selectable: date.properties.includes('inside month'),
                today: date.properties.includes('today'),
                selected: date.properties.includes('selected'),
                highlighted: date.properties.includes('highlighted'),
                left: date.properties.includes('left-highlighted'),
                right: date.properties.includes('right-highlighted'),
              }"
              data-testid="date-picker-month-cell"
              @click="
                date.properties.includes('inside month') && selectDate(date)
              "
            >
              {{ monthsLocale[getMonth(date)].substr(0, 3) }}
            </div>
          </div>
        </div>

        <div class="divider"></div>
      </template>
    </template>

    <template v-else-if="type === 'year'">
      <template
        v-for="openMonth in [referenceDate]"
        :key="openMonth"
      >
        <div
          class="month-container"
          data-testid="date-picker-month-container"
        >
          <div :class="['header', `header--${size}`]">
            <UnnnicButton
              size="small"
              iconCenter="arrow-left-1-1"
              :type="size === 'large' ? 'secondary' : 'tertiary'"
              class="button-space"
              :style="{ gridArea: 'left-button' }"
              data-testid="date-picker-year-nav-left"
              @click="referenceDate = addMonth(referenceDate, -12 * 12)"
            />

            <div :class="['label', `label--${size}`]">
              {{ getFullYear(openMonth) }}
            </div>

            <UnnnicButton
              size="small"
              iconCenter="arrow-right-1-1"
              :type="size === 'large' ? 'secondary' : 'tertiary'"
              class="button-space"
              :style="{ gridArea: 'right-button' }"
              data-testid="date-picker-year-nav-right"
              @click="referenceDate = addMonth(referenceDate, 12 * 12)"
            />
          </div>

          <div :class="['days', `months--${size}`]">
            <div
              v-for="(date, index) in getYears(openMonth)"
              :key="`${openMonth}-${index}`"
              :class="{
                disabled: !date.properties.includes('inside month'),
                selectable: date.properties.includes('inside month'),
                today: date.properties.includes('today'),
                selected: date.properties.includes('selected'),
                highlighted: date.properties.includes('highlighted'),
                left: date.properties.includes('left-highlighted'),
                right: date.properties.includes('right-highlighted'),
              }"
              data-testid="date-picker-year-cell"
              @click="
                date.properties.includes('inside month') && selectDate(date)
              "
            >
              {{ date.date }}
            </div>
          </div>
        </div>

        <div class="divider"></div>
      </template>
    </template>

    <div
      v-if="size !== 'small'"
      class="options-container"
      data-testid="date-picker-options"
    >
      <div class="options">
        <div
          v-for="(option, index) in periodsLocale"
          :key="index"
          :class="[
            'option',
            {
              selectable: option.id !== 'custom',
              selected: optionSelected === option.id,
            },
          ]"
          data-testid="date-picker-option"
          @click="option.id === 'custom' ? null : autoSelect(option.id)"
        >
          {{ option.name }}
        </div>
      </div>

      <div class="actions">
        <UnnnicButton
          v-if="!disableClear"
          size="small"
          :text="clearText"
          type="tertiary"
          data-testid="date-picker-clear"
          @click="clear"
        />

        <UnnnicButton
          size="small"
          :text="filterText"
          type="secondary"
          data-testid="date-picker-submit"
          @click="submit"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue';
import { get } from 'lodash';

import {
  months as translationMonths,
  days as translationDays,
  periods as translationPeriods,
  buttons as translationButtons,
} from './translations.js';

import i18n from '@/utils/plugins/i18n';

import UnnnicButton from '../Button/Button.vue';

defineOptions({
  name: 'UnnnicDatePicker',
});

type PeriodOption = {
  id: string;
  name: string;
};

interface DatePickerProps {
  initialStartDate?: string;
  initialEndDate?: string;

  minDate?: string;
  maxDate?: string;

  periodBaseDate?: string;

  equivalentOption?: string;

  type?: 'day' | 'month' | 'year';
  size?: 'small' | 'large';

  clearLabel?: string;
  actionLabel?: string;

  months?: string[];
  days?: string[];
  options?: PeriodOption[];

  disableClear?: boolean;

  locale?: string;
  translations?: Record<string, unknown>;
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  initialStartDate: '',
  initialEndDate: '',
  minDate: '',
  maxDate: '',
  periodBaseDate: '',
  equivalentOption: '',
  type: 'day',
  size: 'large',
  clearLabel: '',
  actionLabel: '',
  months: () => [],
  days: () => [],
  options: () => [],
  disableClear: false,
  locale: undefined,
  translations: undefined,
});

const emit = defineEmits<{
  (e: 'change', value: { startDate: string; endDate: string }): void;
  (e: 'submit', value: { startDate: string; endDate: string }): void;
  (e: 'update:equivalentOption', equivalentOption: string): void;
}>();

const today = new Date();
const referenceDate = ref<string>(
  `${today.getMonth() + 1} 1 ${today.getFullYear()}`,
);
const startDate = ref<string>(
  (props.initialStartDate || '').replace(/-/g, ' '),
);
const endDate = ref<string>((props.initialEndDate || '').replace(/-/g, ' '));
const optionSelected = ref<string>('');

const defaultTranslations = {
  clean: {
    'pt-br': 'Limpar',
    en: 'Clean',
    es: 'Limpiar',
  },
  filter: {
    'pt-br': 'Filtrar',
    en: 'Filter',
    es: 'Filtrar',
  },
} as const;

const instance = getCurrentInstance();

type I18nProxy = {
  $i18n?: {
    locale?: string;
  };
};

const i18nLocale = computed(() => {
  const localeFromInstance = (instance?.proxy as I18nProxy | null)?.$i18n
    ?.locale;
  const finalLocale = localeFromInstance || 'en-us';

  return String(finalLocale).toLowerCase();
});

const monthsLocale = computed(() => {
  const months = props.months || [];
  return months.length ? months : translationMonths[i18nLocale.value];
});

const daysLocale = computed(() => {
  const days = props.days || [];
  return days.length ? days : translationDays[i18nLocale.value];
});

const periodsLocale = computed<PeriodOption[]>(() => {
  const options = props.options || [];
  return options.length ? options : translationPeriods[i18nLocale.value];
});

const clearText = computed(() => {
  return props.clearLabel || translationButtons[i18nLocale.value].clear;
});

const filterText = computed(() => {
  return props.actionLabel || translationButtons[i18nLocale.value].filter;
});

const value = computed(() => ({
  startDate: startDate.value.replaceAll(' ', '-'),
  endDate: endDate.value.replaceAll(' ', '-'),
}));

const i18nFn = (...args: any[]): string | undefined => {
  const [key, defaults] = args;

  const validLocaleValues = Object.keys(
    ((i18n as any).global.messages as Record<string, unknown>) || {},
  );

  let locale = props.locale as string | undefined;

  const treatedSelectedLocale =
    get(i18n, 'global.locale') === 'en-us'
      ? 'en'
      : (get(i18n, 'global.locale') as string | undefined);

  locale =
    locale && validLocaleValues.includes(locale)
      ? locale
      : treatedSelectedLocale;

  locale = locale?.toLowerCase();

  let text = get(
    props.translations,
    `${key}.${locale}`,
    get(props.translations, key),
  ) as string | undefined;

  if (!text) {
    text = get(
      defaultTranslations as Record<string, unknown>,
      `${key}.${locale}`,
      get(defaultTranslations as Record<string, unknown>, key, defaults),
    ) as string | undefined;
  }

  if (text?.includes('|') && typeof args[1] === 'number') {
    const count: number = args[1];
    const pluralization = text.split('|');

    if (pluralization.length === 3) {
      text = pluralization[count] || pluralization[2];
    } else if (pluralization.length === 2) {
      text = count === 1 ? pluralization[0] : pluralization[1];
    }
  }

  let vars: Record<string, string> = {};

  Object.values(args)
    .slice(1)
    .forEach((argument) => {
      if (!(argument instanceof Array) && argument instanceof Object) {
        vars = argument as Record<string, string>;
      }
    });

  Object.keys(vars).forEach((varName) => {
    text = text?.replaceAll(new RegExp(`{ *${varName} *}`, 'g'), vars[varName]);
  });

  return text;
};

defineExpose({
  i18n: i18nFn,
});

function dateToString(date: Date): string {
  return `${date.getMonth() + 1} ${date.getDate()} ${date.getFullYear()}`;
}

function dateToStringMonth(date: Date): string {
  return `${date.getMonth() + 1} ${date.getFullYear()}`;
}

function dateToStringYear(date: Date): number {
  return date.getFullYear();
}

function stringToTime(date: string): number {
  const [month, day, year] = date.split(' ');
  return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
}

function getDate(date: { toString: () => string }): string {
  return date.toString().split(' ')[1];
}

function getMonth(date: { toString: () => string }): number {
  return Number(date.toString().split(' ')[0]);
}

function getFullYear(date: string): number {
  const [month, day, year] = date.split(' ');
  return new Date(Number(year), Number(month) - 1, Number(day)).getFullYear();
}

function addMonth(reference: string, quantity: number): string {
  const [month, day, year] = reference.split(' ');

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  date.setMonth(date.getMonth() + quantity);

  return dateToString(date);
}

function isDateBetween(internalDate: number): boolean {
  if (startDate.value && endDate.value) {
    if (
      internalDate >= stringToTime(startDate.value) &&
      internalDate <= stringToTime(endDate.value)
    ) {
      return true;
    }
  } else if (startDate.value && internalDate >= stringToTime(startDate.value)) {
    return true;
  } else if (endDate.value && internalDate <= stringToTime(endDate.value)) {
    return true;
  }

  return false;
}

function isDateBetweenMonth(internalDate: number): boolean {
  if (startDate.value && endDate.value) {
    const startTime = stringToTime(startDate.value);
    const endTime = stringToTime(endDate.value);

    return internalDate >= startTime && internalDate <= endTime;
  }

  if (startDate.value) {
    const startTime = stringToTime(startDate.value);
    return internalDate >= startTime;
  }

  if (endDate.value) {
    const endTime = stringToTime(endDate.value);
    return internalDate <= endTime;
  }

  return false;
}

function isDateBetweenYear(internalDate: number): boolean {
  if (startDate.value && endDate.value) {
    const startTime = stringToTime(startDate.value);
    const endTime = stringToTime(endDate.value);

    return internalDate >= startTime && internalDate <= endTime;
  }

  if (startDate.value) {
    const startTime = stringToTime(startDate.value);
    return internalDate >= startTime;
  }

  if (endDate.value) {
    const endTime = stringToTime(endDate.value);
    return internalDate <= endTime;
  }

  return false;
}

function getDatesOfTheMonth(reference: string) {
  const [month, day, year] = reference.split(' ');

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  const currentMonth = date.getMonth();
  const oneDayInSeconds = 86400;

  date.setDate(1 - date.getDay());

  const dates: { properties: string[]; toString: () => string }[] = [];

  for (let i = 0; i < 6 * 7; i += 1) {
    const dateString = dateToString(date);
    const properties: string[] = [];

    if (props.minDate) {
      const [minDateYear, minDateMonth, minDateDay] = props.minDate.split('-');

      const formatedMinDate = new Date(
        Number(minDateYear),
        Number(minDateMonth) - 1,
        Number(minDateDay),
      );

      if (date < formatedMinDate) properties.push('out of range');
    }

    if (props.maxDate) {
      const [maxDateYear, maxDateMonth, maxDateDay] = props.maxDate.split('-');

      const formatedMaxDate = new Date(
        Number(maxDateYear),
        Number(maxDateMonth) - 1,
        Number(maxDateDay),
      );

      if (date > formatedMaxDate) properties.push('out of range');
    }

    if (currentMonth === date.getMonth()) {
      properties.push('inside month');

      const dateInTime = stringToTime(dateToString(date));
      const dayBefore = dateInTime - oneDayInSeconds;
      const dayAfter = dateInTime + oneDayInSeconds;

      if (isDateBetween(dateInTime)) {
        properties.push('selected');

        if (!isDateBetween(dayBefore)) {
          properties.push('left-highlighted');
        }

        if (!isDateBetween(dayAfter)) {
          properties.push('right-highlighted');
        }

        if (
          properties.includes('left-highlighted') ||
          properties.includes('right-highlighted')
        ) {
          properties.push('highlighted');
        }
      }
    }

    if (dateToString(date) === dateToString(new Date())) {
      properties.push('today');
    }

    dates.push({
      properties,
      toString: () => dateString,
    });

    date.setDate(date.getDate() + 1);
  }

  return dates;
}

function getMonthsOfTheYear(reference: string) {
  const [month, day, year] = reference.split(' ');

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  date.setMonth(0);

  const dates: {
    properties: string[];
    date: string;
    toString: () => string;
  }[] = [];

  for (let i = 0; i < 3 * 4; i += 1) {
    const dateString = dateToString(date);
    const properties: string[] = [];

    properties.push('inside month');

    const dateInTime = stringToTime(dateToString(date));
    const monthBefore = new Date(dateInTime);
    const monthAfter = new Date(dateInTime);

    monthBefore.setMonth(monthBefore.getMonth() - 1);
    monthAfter.setMonth(monthAfter.getMonth() + 1);

    const monthBeforeTime = monthBefore.getTime();
    const monthAfterTime = monthAfter.getTime();

    if (isDateBetweenMonth(dateInTime)) {
      properties.push('selected');

      if (!isDateBetweenMonth(monthBeforeTime)) {
        properties.push('left-highlighted');
      }

      if (!isDateBetweenMonth(monthAfterTime)) {
        properties.push('right-highlighted');
      }

      if (
        properties.includes('left-highlighted') ||
        properties.includes('right-highlighted')
      ) {
        properties.push('highlighted');
      }
    }

    if (dateToStringMonth(date) === dateToStringMonth(new Date())) {
      properties.push('today');
    }

    dates.push({
      properties,
      date: dateString,
      toString: () => dateString,
    });

    date.setMonth(date.getMonth() + 1);
  }

  return dates;
}

function getYears(reference: string) {
  const [month, day, year] = reference.split(' ');

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  date.setMonth(0);

  const dates: {
    properties: string[];
    date: number;
    toString: () => string;
  }[] = [];

  for (let i = 0; i < 3 * 4; i += 1) {
    const dateString = dateToString(date);
    const properties: string[] = [];

    properties.push('inside month');

    const dateInTime = stringToTime(dateToString(date));

    const [dateInTimeMonth, dateInTimeDay, dateInTimeYear] =
      reference.split(' ');

    const yearBefore = new Date(
      Number(dateInTimeYear),
      Number(dateInTimeMonth) - 1,
      Number(dateInTimeDay),
    );
    const yearAfter = new Date(
      Number(dateInTimeYear),
      Number(dateInTimeMonth) - 1,
      Number(dateInTimeDay),
    );

    yearBefore.setMonth(yearBefore.getMonth() - 12);
    yearAfter.setMonth(yearAfter.getMonth() + 12);

    const yearBeforeTime = yearBefore.getTime();
    const yearAfterTime = yearAfter.getTime();

    if (isDateBetweenYear(dateInTime)) {
      properties.push('selected');

      if (!isDateBetweenYear(yearBeforeTime)) {
        properties.push('left-highlighted');
      }

      if (!isDateBetweenYear(yearAfterTime)) {
        properties.push('right-highlighted');
      }

      if (
        properties.includes('left-highlighted') ||
        properties.includes('right-highlighted')
      ) {
        properties.push('highlighted');
      }
    }

    if (dateToStringYear(date) === dateToStringYear(new Date())) {
      properties.push('today');
    }

    dates.push({
      properties,
      date: date.getFullYear(),
      toString: () => dateString,
    });

    date.setFullYear(date.getFullYear() + 1);
  }

  return dates;
}

function selectDate(date: { toString: () => string }) {
  if (!startDate.value || !endDate.value) {
    startDate.value = date.toString();
    endDate.value = startDate.value;
  } else {
    const self = stringToTime(date.toString());

    const startTime = stringToTime(startDate.value);
    const endTime = stringToTime(endDate.value);

    if (startTime !== endTime) {
      startDate.value = date.toString();
      endDate.value = startDate.value;
    } else if (self > endTime) {
      endDate.value = date.toString();
    } else if (self < startTime) {
      startDate.value = date.toString();
    } else if (self === startTime || self === endTime) {
      startDate.value = date.toString();
      endDate.value = startDate.value;
    } else if (self - startTime < endTime - self) {
      startDate.value = date.toString();
    } else {
      endDate.value = date.toString();
    }
  }
}

function clear() {
  startDate.value = '';
  endDate.value = '';
  optionSelected.value = '';
}

function getStartAndEndDateByPeriod(period: string) {
  let periodStartDate: string | undefined;
  let periodEndDate: string | undefined;

  let baseDate: Date;

  if (props.periodBaseDate) {
    const parts = props.periodBaseDate.split('-');

    if (parts.length === 3) {
      const [year, month, day] = parts;

      baseDate = new Date(Number(year), Number(month) - 1, Number(day));
    } else {
      const parsed = new Date(props.periodBaseDate);
      baseDate = Number.isNaN(parsed.getTime()) ? new Date() : parsed;
    }
  } else {
    baseDate = new Date();
  }

  const todayClone = new Date(baseDate.getTime());

  const daysMatch = period.match(/^last-(\d+)-days$/);
  const monthsMatch = period.match(/^last-(\d+)-months$/);

  if (daysMatch) {
    const howMuch = Number(daysMatch[1]);

    periodEndDate = dateToString(todayClone);
    todayClone.setDate(todayClone.getDate() - howMuch + 1);
    periodStartDate = dateToString(todayClone);
  } else if (monthsMatch) {
    const howMuch = Number(monthsMatch[1]);

    periodEndDate = dateToString(todayClone);
    todayClone.setDate(todayClone.getDate() + 1);
    todayClone.setMonth(todayClone.getMonth() - howMuch);
    periodStartDate = dateToString(todayClone);
  } else if (period === 'current-month') {
    const referenceDay = baseDate.getDate();

    todayClone.setDate(1);
    periodStartDate = dateToString(todayClone);
    todayClone.setDate(referenceDay);
    periodEndDate = dateToString(todayClone);
  } else if (period === 'previous-month') {
    todayClone.setDate(1);
    todayClone.setMonth(todayClone.getMonth() - 1);
    periodStartDate = dateToString(todayClone);
    todayClone.setMonth(todayClone.getMonth() + 1);
    todayClone.setDate(0);
    periodEndDate = dateToString(todayClone);
  }

  return { startDate: periodStartDate, endDate: periodEndDate };
}

function autoSelect(method: string) {
  const { startDate: periodStartDate, endDate: periodEndDate } =
    getStartAndEndDateByPeriod(method);

  startDate.value = periodStartDate || '';
  endDate.value = periodEndDate || '';

  if (endDate.value) {
    const secondMonth = addMonth(referenceDate.value, 1);

    const firstDateOfEndDate = `${Number(
      getMonth({
        toString: () => endDate.value,
      }),
    )} 1 ${getFullYear(endDate.value)}`;

    if (![referenceDate.value, secondMonth].includes(firstDateOfEndDate)) {
      referenceDate.value = firstDateOfEndDate;
    }
  }

  nextTick(() => {
    optionSelected.value = method;
  });
}

function submit() {
  emit('submit', value.value);

  if (optionSelected.value === 'custom') {
    emit('update:equivalentOption', '');
  } else {
    const period = periodsLocale.value.find(
      ({ id }) => id === optionSelected.value,
    );

    emit('update:equivalentOption', period?.name || '');
  }
}

function updateOptionSelected() {
  const { startDate: start, endDate: end } = value.value;

  const isSameTime = (date1?: string, date2?: string) => {
    if (!date1 || !date2) return false;
    return new Date(date1).getTime() === new Date(date2).getTime();
  };

  const period = periodsLocale.value.find(({ id }) => {
    const { startDate: periodStartDate, endDate: periodEndDate } =
      getStartAndEndDateByPeriod(id);

    return isSameTime(start, periodStartDate) && isSameTime(end, periodEndDate);
  });

  optionSelected.value = start || end ? (period ? period.id : 'custom') : '';
}

const openMonths = computed(() => [
  addMonth(referenceDate.value, -1),
  referenceDate.value,
]);

watch(value, (newValue) => {
  updateOptionSelected();
  emit('change', newValue);
});

onMounted(() => {
  updateOptionSelected();
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-date-picker {
  display: inline-flex;
  background-color: $unnnic-color-background-snow;
  border-radius: $unnnic-border-radius-sm;
  box-shadow: $unnnic-shadow-level-separated;
  overflow: hidden;

  .month-container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: $unnnic-spacing-inset-sm;

    .header {
      display: grid;
      align-items: center;
      grid-template-areas: 'left-button label right-button';

      &--small {
        grid-template-columns: 32px auto 32px;
      }

      &--large {
        grid-template-columns: 36px auto 36px;
        margin-bottom: $unnnic-spacing-stack-xs;
      }

      .label {
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-black;
        color: $unnnic-color-neutral-darkest;
        text-align: center;
        grid-area: label;

        &--small {
          font-size: $unnnic-font-size-body-gt;
        }

        &--large {
          font-size: $unnnic-font-size-body-gt;
          line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
        }
      }
    }

    .days {
      display: grid;
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-neutral-darkest;
      text-align: center;

      user-select: none;

      &--small {
        grid-template-columns: repeat(7, 28px);
        grid-template-rows: repeat(7, 28px);
        font-size: $unnnic-font-size-body-md;
        line-height: 28px;
      }

      &--large {
        grid-template-columns: repeat(7, 32px);
        grid-template-rows: repeat(7, 32px);
        font-size: $unnnic-font-size-body-gt;
        line-height: 32px;
      }

      &.months--small,
      &.months--large {
        grid-template-columns: repeat(3, 4.75 * $unnnic-font-size);
        grid-template-rows: repeat(4, 3.3125 * $unnnic-font-size);
        font-size: $unnnic-font-size-body-md;
        line-height: 3.3125 * $unnnic-font-size;
      }

      .selectable {
        cursor: pointer;
      }

      .name {
        font-weight: $unnnic-font-weight-black;
      }

      .today {
        font-weight: $unnnic-font-weight-black;
        background-color: $unnnic-color-background-sky;
        border-radius: $unnnic-border-radius-sm;
      }

      .selected {
        font-weight: $unnnic-font-weight-black;
        background-color: $unnnic-color-background-sky;
        color: $unnnic-color-brand-weni-soft;
        border-radius: 0;

        &.highlighted {
          background-color: $unnnic-color-brand-weni-soft;
          color: $unnnic-color-neutral-snow;

          &.left {
            border-top-left-radius: $unnnic-border-radius-sm;
            border-bottom-left-radius: $unnnic-border-radius-sm;
          }

          &.right {
            border-top-right-radius: $unnnic-border-radius-sm;
            border-bottom-right-radius: $unnnic-border-radius-sm;
          }
        }
      }

      .disabled {
        opacity: $unnnic-opacity-level-overlay;
      }
    }
  }

  .divider {
    width: 1px;
    background-color: $unnnic-color-neutral-soft;
  }

  .options-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .options {
      .option {
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-regular;
        font-size: $unnnic-font-size-body-gt;
        line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
        color: $unnnic-color-neutral-darkest;

        padding: $unnnic-spacing-stack-xs $unnnic-spacing-inline-sm;
        user-select: none;

        &.selectable {
          cursor: pointer;

          &:hover {
            background-color: $unnnic-color-background-sky;
          }
        }

        &.selected {
          background-color: $unnnic-color-background-sky;
        }

        &.selected {
          font-weight: $unnnic-font-weight-bold;
          color: $unnnic-color-brand-weni-soft;
        }
      }
    }

    .actions {
      display: grid;
      grid-template-columns: 1fr;
      &:has(:nth-child(2)) {
        grid-template-columns: 1fr 1fr;
      }
      gap: $unnnic-spacing-inline-xs;
      padding: $unnnic-spacing-stack-xs $unnnic-spacing-inline-sm;
    }
  }
}
</style>

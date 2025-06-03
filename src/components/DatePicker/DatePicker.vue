<template>
  <div class="unnnic-date-picker">
    <template v-if="type === 'day'">
      <template
        v-for="(openMonth, index) in openMonths"
        :key="openMonth"
      >
        <div class="month-container">
          <div :class="['header', `header--${size}`]">
            <UnnnicButton
              size="small"
              :iconCenter="`arrow-${index === 0 ? 'left' : 'right'}-1-1`"
              :type="size === 'large' ? 'secondary' : 'tertiary'"
              class="button-space"
              :style="{ gridArea: `${index === 0 ? 'left' : 'right'}-button` }"
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
        <div class="month-container">
          <div :class="['header', `header--${size}`]">
            <UnnnicButton
              size="small"
              iconCenter="arrow-left-1-1"
              :type="size === 'large' ? 'secondary' : 'tertiary'"
              class="button-space"
              :style="{ gridArea: 'left-button' }"
              @click="referenceDate = addMonth(referenceDate, -12)"
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
        <div class="month-container">
          <div :class="['header', `header--${size}`]">
            <UnnnicButton
              size="small"
              iconCenter="arrow-left-1-1"
              :type="size === 'large' ? 'secondary' : 'tertiary'"
              class="button-space"
              :style="{ gridArea: 'left-button' }"
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
    >
      <div class="options">
        <div
          v-for="(option, index) in periodsLocale"
          :key="index"
          :class="['option', { selected: optionSelected === option.id }]"
          @click="autoSelect(option.id)"
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
          @click="clear"
        />

        <UnnnicButton
          size="small"
          :text="filterText"
          type="secondary"
          @click="$emit('submit', value)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  months as translationMonths,
  days as translationDays,
  periods as translationPeriods,
} from './translations.js';

import UnnnicI18n from '../../mixins/i18n';

import UnnnicButton from '../Button/Button.vue';

export default {
  components: {
    UnnnicButton,
  },
  mixins: [UnnnicI18n],

  props: {
    initialStartDate: { type: String, default: '' },
    initialEndDate: { type: String, default: '' },

    minDate: { type: String, default: '' },
    maxDate: { type: String, default: '' },

    type: {
      type: String,
      default: 'day',
      validator(type) {
        return ['day', 'month', 'year'].includes(type);
      },
    },

    size: {
      type: String,
      default: 'large',
      validator(size) {
        return ['small', 'large'].includes(size);
      },
    },

    clearLabel: {
      type: String,
      default: '',
    },

    actionLabel: {
      type: String,
      default: '',
    },

    months: {
      type: Array,
      default: () => [],
      validator(months) {
        return [0, 12].includes(months.length);
      },
    },

    days: {
      type: Array,
      default: () => [],
      validator(days) {
        return [0, 7].includes(days.length);
      },
    },

    options: {
      type: Array,
      default: () => [],
    },

    disableClear: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['change', 'submit'],

  data() {
    const today = new Date();
    const referenceDate = `${today.getMonth() + 1} 1 ${today.getFullYear()}`;

    return {
      referenceDate,
      startDate: (this.initialStartDate || '').replace(/-/g, ' '),
      endDate: (this.initialEndDate || '').replace(/-/g, ' '),
      optionSelected: '',
      defaultTranslations: {
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
      },
    };
  },

  computed: {
    openMonths() {
      return [this.addMonth(this.referenceDate, -1), this.referenceDate];
    },

    value() {
      return {
        startDate: this.startDate.replaceAll(' ', '-'),
        endDate: this.endDate.replaceAll(' ', '-'),
      };
    },

    i18nLocale() {
      return this.$i18n.locale.toLowerCase();
    },

    monthsLocale() {
      const { months } = this;
      return months.length ? months : translationMonths[this.i18nLocale];
    },
    daysLocale() {
      const { days } = this;
      return days.length ? days : translationDays[this.i18nLocale];
    },
    periodsLocale() {
      const { options } = this;
      return options.length ? options : translationPeriods[this.i18nLocale];
    },

    clearText() {
      return this.clearLabel || this.i18n('clean');
    },
    filterText() {
      return this.actionLabel || this.i18n('filter');
    },
  },

  watch: {
    value({ startDate, endDate }) {
      this.optionSelected = startDate || endDate ? 'custom' : '';

      this.$emit('change', this.value);
    },
  },

  methods: {
    dateToString(date) {
      return `${date.getMonth() + 1} ${date.getDate()} ${date.getFullYear()}`;
    },

    dateToStringMonth(date) {
      return `${date.getMonth() + 1} ${date.getFullYear()}`;
    },

    dateToStringYear(date) {
      return date.getFullYear();
    },

    stringToTime(date) {
      const [month, day, year] = date.split(' ');
      return new Date(year, Number(month) - 1, day).getTime();
    },

    getDate(date) {
      return date.toString().split(' ')[1];
    },

    getMonth(date) {
      return date.toString().split(' ')[0];
    },

    getFullYear(date) {
      const [month, day, year] = date.split(' ');
      return new Date(year, Number(month) - 1, day).getFullYear();
    },

    addMonth(referenceDate, quantity) {
      const [month, day, year] = referenceDate.split(' ');

      const date = new Date(year, Number(month) - 1, day);

      date.setMonth(date.getMonth() + quantity);

      return this.dateToString(date);
    },

    isDateBetween(internalDate) {
      if (this.startDate && this.endDate) {
        if (
          internalDate >= this.stringToTime(this.startDate) &&
          internalDate <= this.stringToTime(this.endDate)
        ) {
          return true;
        }
      } else if (
        this.startDate &&
        internalDate >= this.stringToTime(this.startDate)
      ) {
        return true;
      } else if (
        this.endDate &&
        internalDate <= this.stringToTime(this.endDate)
      ) {
        return true;
      }

      return false;
    },

    isDateBetweenMonth(internalDate) {
      const [month, day, year] = internalDate.split(' ');
      const startDate = new Date(year, Number(month) - 1, day);
      startDate.setDate(1);
      const startDateTime = startDate.getTime();

      if (this.startDate && this.endDate) {
        if (
          internalDate >= startDateTime &&
          internalDate <= this.stringToTime(this.endDate)
        ) {
          return true;
        }
      } else if (this.startDate && internalDate >= startDateTime) {
        return true;
      } else if (
        this.endDate &&
        internalDate <= this.stringToTime(this.endDate)
      ) {
        return true;
      }

      return false;
    },

    isDateBetweenYear(internalDate) {
      const [month, day, year] = internalDate.split(' ');
      const startDate = new Date(year, Number(month) - 1, day);
      startDate.setDate(1);
      startDate.setMonth(0);
      const startDateTime = startDate.getTime();

      if (this.startDate && this.endDate) {
        if (
          internalDate >= startDateTime &&
          internalDate <= this.stringToTime(this.endDate)
        ) {
          return true;
        }
      } else if (this.startDate && internalDate >= startDateTime) {
        return true;
      } else if (
        this.endDate &&
        internalDate <= this.stringToTime(this.endDate)
      ) {
        return true;
      }

      return false;
    },

    getDatesOfTheMonth(referenceDate) {
      const [month, day, year] = referenceDate.split(' ');

      const date = new Date(year, Number(month) - 1, day);

      const currentMonth = date.getMonth();
      const oneDayInSeconds = 86400;

      date.setDate(1 - date.getDay());

      const dates = [];

      for (let i = 0; i < 6 * 7; i += 1) {
        const dateString = this.dateToString(date);
        const properties = [];

        if (this.minDate) {
          const [minDateYear, minDateMonth, minDateDay] =
            this.minDate.split('-');

          const formatedMinDate = new Date(
            minDateYear,
            Number(minDateMonth) - 1,
            minDateDay,
          );

          if (date < formatedMinDate) properties.push('out of range');
        }

        if (this.maxDate) {
          const [maxDateYear, maxDateMonth, maxDateDay] =
            this.maxDate.split('-');

          const formatedMaxDate = new Date(
            maxDateYear,
            Number(maxDateMonth) - 1,
            maxDateDay,
          );

          if (date > formatedMaxDate) properties.push('out of range');
        }

        if (currentMonth === date.getMonth()) {
          properties.push('inside month');

          const dateInTime = this.stringToTime(this.dateToString(date));
          const dayBefore = dateInTime - oneDayInSeconds;
          const dayAfter = dateInTime + oneDayInSeconds;

          if (this.isDateBetween(dateInTime)) {
            properties.push('selected');

            if (!this.isDateBetween(dayBefore)) {
              properties.push('left-highlighted');
            }

            if (!this.isDateBetween(dayAfter)) {
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

        if (this.dateToString(date) === this.dateToString(new Date())) {
          properties.push('today');
        }

        dates.push({
          properties,
          toString: () => dateString,
        });

        date.setDate(date.getDate() + 1);
      }

      return dates;
    },

    getMonthsOfTheYear(referenceDate) {
      const [month, day, year] = referenceDate.split(' ');

      const date = new Date(year, Number(month) - 1, day);

      date.setMonth(0);

      const dates = [];

      for (let i = 0; i < 3 * 4; i += 1) {
        const dateString = this.dateToString(date);
        const properties = [];

        properties.push('inside month');

        const dateInTime = this.stringToTime(this.dateToString(date));
        let monthBefore = new Date(dateInTime);
        let monthAfter = new Date(dateInTime);

        monthBefore.setMonth(monthBefore.getMonth() - 1);
        monthAfter.setMonth(monthAfter.getMonth() + 1);

        monthBefore = monthBefore.getTime();
        monthAfter = monthAfter.getTime();

        if (this.isDateBetweenMonth(dateInTime)) {
          properties.push('selected');

          if (!this.isDateBetweenMonth(monthBefore)) {
            properties.push('left-highlighted');
          }

          if (!this.isDateBetweenMonth(monthAfter)) {
            properties.push('right-highlighted');
          }

          if (
            properties.includes('left-highlighted') ||
            properties.includes('right-highlighted')
          ) {
            properties.push('highlighted');
          }
        }

        if (
          this.dateToStringMonth(date) === this.dateToStringMonth(new Date())
        ) {
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
    },

    getYears(referenceDate) {
      const [month, day, year] = referenceDate.split(' ');

      const date = new Date(year, Number(month) - 1, day);

      date.setMonth(0);

      const dates = [];

      for (let i = 0; i < 3 * 4; i += 1) {
        const dateString = this.dateToString(date);
        const properties = [];

        properties.push('inside month');

        const dateInTime = this.stringToTime(this.dateToString(date));

        const [dateInTimeMonth, dateInTimeDay, dateInTimeYear] =
          referenceDate.split(' ');

        let yearBefore = new Date(
          dateInTimeYear,
          Number(dateInTimeMonth) - 1,
          dateInTimeDay,
        );
        let yearAfter = new Date(
          dateInTimeYear,
          Number(dateInTimeMonth) - 1,
          dateInTimeDay,
        );

        yearBefore.setMonth(yearBefore.getMonth() - 12);
        yearAfter.setMonth(yearAfter.getMonth() + 12);

        yearBefore = yearBefore.getTime();
        yearAfter = yearAfter.getTime();

        if (this.isDateBetweenYear(dateInTime)) {
          properties.push('selected');

          if (!this.isDateBetweenYear(yearBefore)) {
            properties.push('left-highlighted');
          }

          if (!this.isDateBetweenYear(yearAfter)) {
            properties.push('right-highlighted');
          }

          if (
            properties.includes('left-highlighted') ||
            properties.includes('right-highlighted')
          ) {
            properties.push('highlighted');
          }
        }

        if (this.dateToStringYear(date) === this.dateToStringYear(new Date())) {
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
    },

    selectDate(date) {
      if (!this.startDate || !this.endDate) {
        this.startDate = date.toString();
        this.endDate = this.startDate;
      } else {
        const self = this.stringToTime(date.toString());

        const startDate = this.stringToTime(this.startDate);
        const endDate = this.stringToTime(this.endDate);

        if (startDate !== endDate) {
          this.startDate = date.toString();
          this.endDate = this.startDate;
        } else if (self > endDate) {
          this.endDate = date.toString();
        } else if (self < startDate) {
          this.startDate = date.toString();
        } else if (self === startDate || self === endDate) {
          this.startDate = date.toString();
          this.endDate = this.startDate;
        } else if (self - startDate < endDate - self) {
          this.startDate = date.toString();
        } else {
          this.endDate = date.toString();
        }
      }
    },

    clear() {
      this.startDate = '';
      this.endDate = '';
      this.optionSelected = '';
    },

    autoSelect(method) {
      const today = new Date();

      const days = method.match(/^last-(\d+)-days$/);
      const months = method.match(/^last-(\d+)-months$/);

      if (days) {
        const howMuch = Number(days[1]);

        this.endDate = this.dateToString(today);
        today.setDate(today.getDate() - howMuch + 1);
        this.startDate = this.dateToString(today);
      } else if (months) {
        const howMuch = Number(months[1]);

        this.endDate = this.dateToString(today);
        today.setDate(today.getDate() + 1);
        today.setMonth(today.getMonth() - howMuch);
        this.startDate = this.dateToString(today);
      } else if (method === 'current-month') {
        const referenceDate = new Date();
        today.setDate(1);
        this.startDate = this.dateToString(today);
        const referenceDay = referenceDate.getDate();
        today.setDate(referenceDay);
        this.endDate = this.dateToString(today);
      } else if (method === 'previous-month') {
        today.setDate(1);
        today.setMonth(today.getMonth() - 1);
        this.startDate = this.dateToString(today);
        today.setMonth(today.getMonth() + 1);
        today.setDate(0);
        this.endDate = this.dateToString(today);
      }

      if (this.endDate) {
        const secondMonth = this.addMonth(this.referenceDate, 1);

        const firstDateOfEndDate = `${Number(
          this.getMonth(this.endDate),
        )} 1 ${this.getFullYear(this.endDate)}`;

        if (![this.referenceDate, secondMonth].includes(firstDateOfEndDate)) {
          this.referenceDate = firstDateOfEndDate;
        }
      }

      this.$nextTick(() => {
        this.optionSelected = method;
      });
    },
  },
};
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
        cursor: pointer;

        &:hover,
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

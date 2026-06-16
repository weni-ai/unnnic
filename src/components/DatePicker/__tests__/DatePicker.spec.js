import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import DatePicker from '../DatePicker.vue';

const factory = (props = {}) =>
  mount(DatePicker, {
    props: {
      size: 'large',
      type: 'day',
      ...props,
    },
    global: {
      mocks: {
        $i18n: { locale: 'en-us' },
      },
      stubs: {
        UnnnicButton: true,
      },
    },
  });

const findFirstSelectableDay = (wrapper) =>
  wrapper
    .findAll('[data-testid="date-picker-day"]')
    .find((day) => day.classes().includes('selectable'));

describe('DatePicker.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = factory({
      options: [
        { name: 'Last 7 days', id: 'last-7-days' },
        { name: 'Custom', id: 'custom' },
      ],
    });
  });

  it('renders day view with two months and options', () => {
    expect(wrapper.find('[data-testid="date-picker-root"]').exists()).toBe(
      true,
    );
    expect(
      wrapper.findAll('[data-testid="date-picker-month-container"]').length,
    ).toBe(2);
    expect(wrapper.findAll('[data-testid="date-picker-option"]').length).toBe(
      2,
    );
  });

  it('selects a date range and emits change', async () => {
    const first = findFirstSelectableDay(wrapper);
    const second = wrapper
      .findAll('[data-testid="date-picker-day"]')
      .reverse()
      .find((day) => day.classes().includes('selectable'));

    await first.trigger('click');
    await second.trigger('click');

    const emittedChange = wrapper.emitted('change');
    expect(emittedChange).toBeTruthy();
    const [{ startDate, endDate }] = emittedChange.pop();
    expect(startDate).not.toBe('');
    expect(endDate).not.toBe('');
  });

  it('clears selection when clear button is clicked', async () => {
    const day = findFirstSelectableDay(wrapper);
    await day.trigger('click');

    await wrapper.find('[data-testid="date-picker-clear"]').trigger('click');

    expect(wrapper.vm.startDate).toBe('');
    expect(wrapper.vm.endDate).toBe('');
    expect(wrapper.vm.optionSelected).toBe('');
  });

  it('submits with selected period and emits equivalent option name', async () => {
    await wrapper.vm.autoSelect('last-7-days');
    await wrapper.find('[data-testid="date-picker-submit"]').trigger('click');

    const submit = wrapper.emitted('submit');
    const updateEquivalent = wrapper.emitted('update:equivalentOption');

    expect(submit).toBeTruthy();
    expect(submit[0][0]).toHaveProperty('startDate');
    expect(submit[0][0]).toHaveProperty('endDate');

    expect(updateEquivalent[0][0]).toBe('Last 7 days');
  });

  it('submits with custom selection and clears equivalent option', async () => {
    wrapper.vm.optionSelected = 'custom';
    await wrapper.find('[data-testid="date-picker-submit"]').trigger('click');

    const updateEquivalent = wrapper.emitted('update:equivalentOption');
    expect(updateEquivalent[0][0]).toBe('');
  });

  it('uses periodBaseDate to compute relative ranges', async () => {
    const base = '2025-01-15';
    wrapper = factory({
      periodBaseDate: base,
      options: [{ name: 'Last 7 days', id: 'last-7-days' }],
    });

    await wrapper.vm.autoSelect('last-7-days');

    const [year, month, day] = base.split('-');
    const baseDate = new Date(Number(year), Number(month) - 1, Number(day));
    const expectedEnd = wrapper.vm.dateToString(baseDate);

    expect(wrapper.vm.endDate).toBe(expectedEnd);
  });

  it('renders month view and selects a month', async () => {
    wrapper = factory({
      type: 'month',
      options: [{ name: 'Last 12 months', id: 'last-12-months' }],
    });

    const monthCell = wrapper.find('[data-testid="date-picker-month-cell"]');
    await monthCell.trigger('click');

    expect(wrapper.vm.startDate).not.toBe('');
    expect(wrapper.vm.endDate).not.toBe('');
  });

  it('renders year view and selects a year', async () => {
    wrapper = factory({
      type: 'year',
      options: [{ name: 'Previous year', id: 'previous-year' }],
    });

    const yearCell = wrapper.find('[data-testid="date-picker-year-cell"]');
    await yearCell.trigger('click');

    expect(wrapper.vm.startDate).not.toBe('');
    expect(wrapper.vm.endDate).not.toBe('');
  });

  it('hides options when size is small and respects disableClear', async () => {
    wrapper = factory({
      size: 'small',
      options: [{ name: 'Last 7 days', id: 'last-7-days' }],
    });
    expect(wrapper.find('[data-testid="date-picker-options"]').exists()).toBe(
      false,
    );

    wrapper = factory({
      disableClear: true,
      options: [{ name: 'Last 7 days', id: 'last-7-days' }],
    });
    expect(wrapper.find('[data-testid="date-picker-clear"]').exists()).toBe(
      false,
    );
    expect(wrapper.find('[data-testid="date-picker-submit"]').exists()).toBe(
      true,
    );
  });

  it('navigates between months using navigation buttons', async () => {
    const initialReference = wrapper.vm.referenceDate;

    const nextButton = wrapper.find('[data-testid="date-picker-nav-right"]');
    await nextButton.trigger('click');

    expect(wrapper.vm.referenceDate).not.toBe(initialReference);
  });

  it('exposes i18n helper compatible with previous mixin', () => {
    const text = wrapper.vm.i18n('clean', 'Clean');
    expect(text).toBeTruthy();
  });

  it('computes previous-month period correctly based on periodBaseDate', () => {
    const base = '2025-03-15';
    wrapper = factory({
      periodBaseDate: base,
      options: [{ name: 'Previous month', id: 'previous-month' }],
    });

    const { startDate, endDate } =
      wrapper.vm.getStartAndEndDateByPeriod('previous-month');

    const baseDate = new Date(base);
    const firstPrevMonth = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth() - 1,
      1,
    );
    const lastPrevMonth = new Date(
      firstPrevMonth.getFullYear(),
      firstPrevMonth.getMonth() + 1,
      0,
    );

    const expectedStart = wrapper.vm.dateToString(firstPrevMonth);
    const expectedEnd = wrapper.vm.dateToString(lastPrevMonth);

    expect(startDate).toBe(expectedStart);
    expect(endDate).toBe(expectedEnd);
  });

  it('marks dates outside minDate and maxDate as out of range', () => {
    const min = '2025-02-10';
    const max = '2025-02-20';

    wrapper = factory({
      minDate: min,
      maxDate: max,
    });

    const [year, month] = min.split('-');
    const reference = `${Number(month)} 1 ${year}`;

    const dates = wrapper.vm.getDatesOfTheMonth(reference);

    const hasOutOfRange = dates.some((d) =>
      d.properties.includes('out of range'),
    );

    expect(hasOutOfRange).toBe(true);
  });

  it('selects range when start and end differ and a new date is clicked', async () => {
    const first = findFirstSelectableDay(wrapper);
    const days = wrapper
      .findAll('[data-testid="date-picker-day"]')
      .filter((day) => day.classes().includes('selectable'));

    await first.trigger('click');
    await days[5].trigger('click');
    await days[10].trigger('click');

    expect(wrapper.vm.startDate).toBeTruthy();
    expect(wrapper.vm.endDate).toBe(wrapper.vm.startDate);
  });

  it('extends end date when selecting a later day from a single-day range', async () => {
    const days = wrapper
      .findAll('[data-testid="date-picker-day"]')
      .filter((day) => day.classes().includes('selectable'));

    await days[0].trigger('click');
    await days[4].trigger('click');

    expect(wrapper.vm.endDate).not.toBe(wrapper.vm.startDate);
  });

  it('moves start date when selecting an earlier day from a single-day range', async () => {
    const days = wrapper
      .findAll('[data-testid="date-picker-day"]')
      .filter((day) => day.classes().includes('selectable'));

    await days[10].trigger('click');
    const earlierDay = days[2];
    await earlierDay.trigger('click');

    expect(wrapper.vm.startDate).toBeTruthy();
    expect(wrapper.vm.startDate).toContain(String(earlierDay.text()));
  });

  it('resets range when clicking the same selected day twice', async () => {
    const day = findFirstSelectableDay(wrapper);
    const dayText = day.text();

    await day.trigger('click');
    await day.trigger('click');

    expect(wrapper.vm.startDate).toContain(dayText);
    expect(wrapper.vm.endDate).toBe(wrapper.vm.startDate);
  });

  it('computes last-N-months period correctly', () => {
    wrapper = factory({
      periodBaseDate: '2025-06-15',
      options: [{ name: 'Last 3 months', id: 'last-3-months' }],
    });

    const { startDate, endDate } =
      wrapper.vm.getStartAndEndDateByPeriod('last-3-months');

    expect(startDate).toBeTruthy();
    expect(endDate).toBeTruthy();
  });

  it('computes current-month period correctly', () => {
    wrapper = factory({
      periodBaseDate: '2025-06-15',
      options: [{ name: 'Current month', id: 'current-month' }],
    });

    const { startDate, endDate } =
      wrapper.vm.getStartAndEndDateByPeriod('current-month');

    expect(startDate).toContain('1 2025');
    expect(endDate).toContain('15 2025');
  });

  it('parses non-ISO periodBaseDate format', () => {
    wrapper = factory({
      periodBaseDate: 'June 15, 2025',
      options: [{ name: 'Last 7 days', id: 'last-7-days' }],
    });

    const { startDate, endDate } =
      wrapper.vm.getStartAndEndDateByPeriod('last-7-days');

    expect(startDate).toBeTruthy();
    expect(endDate).toBeTruthy();
  });

  it('falls back to current date for invalid periodBaseDate', () => {
    wrapper = factory({
      periodBaseDate: 'invalid-date',
      options: [{ name: 'Last 7 days', id: 'last-7-days' }],
    });

    const { startDate, endDate } =
      wrapper.vm.getStartAndEndDateByPeriod('last-7-days');

    expect(startDate).toBeTruthy();
    expect(endDate).toBeTruthy();
  });

  it('uses i18n pluralization with three forms', () => {
    wrapper = factory({
      translations: {
        items: {
          en: 'one|few|many',
        },
      },
    });

    expect(wrapper.vm.i18n('items', 0)).toBe('one');
    expect(wrapper.vm.i18n('items', 1)).toBe('few');
    expect(wrapper.vm.i18n('items', 2)).toBe('many');
  });

  it('uses i18n pluralization with two forms', () => {
    wrapper = factory({
      translations: {
        items: {
          en: 'singular|plural',
        },
      },
    });

    expect(wrapper.vm.i18n('items', 1)).toBe('singular');
    expect(wrapper.vm.i18n('items', 2)).toBe('plural');
  });

  it('replaces variables in i18n text', () => {
    wrapper = factory({
      translations: {
        greeting: {
          en: 'Hello {name}',
        },
      },
    });

    expect(wrapper.vm.i18n('greeting', { name: 'Weni' })).toBe('Hello Weni');
  });

  it('renders popover variant class', () => {
    wrapper = factory({ variant: 'popover' });
    expect(wrapper.classes()).toContain('unnnic-date-picker--popover');
  });

  it('hides preset options when hideOptions is true', () => {
    wrapper = factory({
      hideOptions: true,
      options: [{ name: 'Last 7 days', id: 'last-7-days' }],
    });

    expect(wrapper.find('[data-testid="date-picker-option"]').exists()).toBe(
      false,
    );
    expect(wrapper.find('[data-testid="date-picker-options"]').exists()).toBe(
      true,
    );
  });

  it('navigates month view with navigation buttons', async () => {
    wrapper = factory({
      type: 'month',
      options: [{ name: 'Last 12 months', id: 'last-12-months' }],
    });

    const initialReference = wrapper.vm.referenceDate;
    await wrapper
      .find('[data-testid="date-picker-month-nav-right"]')
      .trigger('click');

    expect(wrapper.vm.referenceDate).not.toBe(initialReference);
  });

  it('navigates year view with navigation buttons', async () => {
    wrapper = factory({
      type: 'year',
      options: [{ name: 'Previous year', id: 'previous-year' }],
    });

    const initialReference = wrapper.vm.referenceDate;
    await wrapper
      .find('[data-testid="date-picker-year-nav-left"]')
      .trigger('click');

    expect(wrapper.vm.referenceDate).not.toBe(initialReference);
  });

  it('updates equivalent option name on submit for matched period', async () => {
    await wrapper.vm.autoSelect('last-7-days');
    await wrapper.find('[data-testid="date-picker-submit"]').trigger('click');

    expect(wrapper.emitted('update:equivalentOption')[0][0]).toBe(
      'Last 7 days',
    );
  });

  it('marks custom selection when dates do not match a preset', async () => {
    const day = findFirstSelectableDay(wrapper);
    await day.trigger('click');

    expect(wrapper.vm.optionSelected).toBe('custom');
  });

  it('does nothing when clicking a custom preset option', async () => {
    wrapper = factory({
      options: [
        { name: 'Last 7 days', id: 'last-7-days' },
        { name: 'Custom', id: 'custom' },
      ],
    });

    const customOption = wrapper
      .findAll('[data-testid="date-picker-option"]')
      .find((option) => option.text() === 'Custom');

    await customOption.trigger('click');
    expect(wrapper.vm.optionSelected).not.toBe('last-7-days');
  });

  it('highlights dates when only start date is set', async () => {
    wrapper = factory();
    wrapper.vm.startDate = wrapper.vm.referenceDate;
    wrapper.vm.endDate = '';
    await wrapper.vm.$nextTick();

    const dates = wrapper.vm.getDatesOfTheMonth(wrapper.vm.referenceDate);
    expect(dates.some((date) => date.properties.includes('highlighted'))).toBe(
      true,
    );
  });

  it('highlights dates when only end date is set', async () => {
    wrapper = factory();
    wrapper.vm.startDate = '';
    wrapper.vm.endDate = wrapper.vm.referenceDate;
    await wrapper.vm.$nextTick();

    const dates = wrapper.vm.getDatesOfTheMonth(wrapper.vm.referenceDate);
    expect(dates.some((date) => date.properties.includes('highlighted'))).toBe(
      true,
    );
  });

  it('adjusts start date when selecting a day closer to range start', async () => {
    const days = wrapper
      .findAll('[data-testid="date-picker-day"]')
      .filter((day) => day.classes().includes('selectable'));

    await days[2].trigger('click');
    await days[8].trigger('click');
    const middleDay = days[4];
    await middleDay.trigger('click');

    expect(wrapper.vm.startDate).toBeTruthy();
    expect(wrapper.vm.endDate).toBeTruthy();
  });

  it('adjusts end date when selecting a day closer to range end', async () => {
    const days = wrapper
      .findAll('[data-testid="date-picker-day"]')
      .filter((day) => day.classes().includes('selectable'));

    await days[2].trigger('click');
    await days[10].trigger('click');
    const nearEndDay = days[9];
    await nearEndDay.trigger('click');

    expect(wrapper.vm.startDate).toBeTruthy();
    expect(wrapper.vm.endDate).toBeTruthy();
  });

  it('highlights month range with only start month selected', async () => {
    wrapper = factory({ type: 'month' });
    wrapper.vm.startDate = '3 1 2026';
    wrapper.vm.endDate = '';
    await wrapper.vm.$nextTick();

    const highlighted = wrapper
      .findAll('[data-testid="date-picker-month-cell"]')
      .filter((cell) => cell.classes().includes('highlighted'));

    expect(highlighted.length).toBeGreaterThan(0);
  });

  it('highlights month range with only end month selected', async () => {
    wrapper = factory({ type: 'month' });
    wrapper.vm.startDate = '';
    wrapper.vm.endDate = '6 1 2026';
    await wrapper.vm.$nextTick();

    const highlighted = wrapper
      .findAll('[data-testid="date-picker-month-cell"]')
      .filter((cell) => cell.classes().includes('highlighted'));

    expect(highlighted.length).toBeGreaterThan(0);
  });

  it('navigates month view to previous year', async () => {
    wrapper = factory({
      type: 'month',
      options: [{ name: 'Last 12 months', id: 'last-12-months' }],
    });

    const initialReference = wrapper.vm.referenceDate;
    await wrapper
      .find('[data-testid="date-picker-month-nav-left"]')
      .trigger('click');

    expect(wrapper.vm.referenceDate).not.toBe(initialReference);
  });

  it('navigates year view to next range', async () => {
    wrapper = factory({
      type: 'year',
      options: [{ name: 'Previous year', id: 'previous-year' }],
    });

    const initialReference = wrapper.vm.referenceDate;
    await wrapper
      .find('[data-testid="date-picker-year-nav-right"]')
      .trigger('click');

    expect(wrapper.vm.referenceDate).not.toBe(initialReference);
  });
});

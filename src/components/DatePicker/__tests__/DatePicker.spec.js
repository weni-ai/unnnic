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

    const baseDate = new Date(base);
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
});

import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import InputDatePicker from '../InputDatePicker.vue';

const factory = (props = {}) =>
  mount(InputDatePicker, {
    props: {
      modelValue: {
        start: null,
        end: null,
      },
      ...props,
    },
    attachTo: document.body,
  });

describe('InputDatePicker.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = factory();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('renders input and does not show datepicker by default', () => {
    expect(wrapper.find('[data-testid="input"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="datepicker"]').exists()).toBe(false);
  });

  it('opens datepicker when input receives focus', async () => {
    const input = wrapper.find('[data-testid="input"]');
    await input.trigger('focus');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'UnnnicDatePicker' }).exists()).toBe(
      true,
    );
    expect(wrapper.vm.isPopoverOpen).toBe(true);
  });

  it('opens datepicker when input receives click', async () => {
    const input = wrapper.find('[data-testid="input"]');
    await input.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'UnnnicDatePicker' }).exists()).toBe(
      true,
    );
    expect(wrapper.vm.isPopoverOpen).toBe(true);
  });

  it('computes filterText placeholder when there is no date selected', () => {
    expect(wrapper.vm.filterText).toBe('mm/dd/yyyy');
  });

  it('computes filterText from start and end dates', async () => {
    const withDates = factory({
      modelValue: {
        start: '2025-01-10',
        end: '2025-01-20',
      },
      format: 'YYYY-MM-DD',
      inputFormat: 'MM-DD-YYYY',
    });

    expect(withDates.vm.filterText).toBe('01-10-2025 ~ 01-20-2025');
    withDates.unmount();
  });

  it('computes initialStartDate and initialEndDate for DatePicker', () => {
    const withDates = factory({
      modelValue: {
        start: '2025-01-10',
        end: '2025-01-20',
      },
    });

    expect(withDates.vm.initialStartDate).toBe('01 10 2025');
    expect(withDates.vm.initialEndDate).toBe('01 20 2025');
    withDates.unmount();
  });

  it('emits selectDate with formatted dates when DatePicker emits change', async () => {
    wrapper.vm.isPopoverOpen = true;
    await wrapper.vm.$nextTick();

    const datePicker = wrapper.findComponent({ name: 'UnnnicDatePicker' });

    const payload = {
      startDate: '01-10-2025',
      endDate: '01-20-2025',
    };

    await datePicker.vm.$emit('change', payload);

    const emitted = wrapper.emitted('selectDate');
    expect(emitted).toBeTruthy();

    const [formatted] = emitted[0];
    expect(formatted).toEqual({
      start: '2025-01-10',
      end: '2025-01-20',
    });
  });

  it('emits update:model-value and closes dropdown when DatePicker emits submit', async () => {
    wrapper.vm.isPopoverOpen = true;
    await wrapper.vm.$nextTick();

    const datePicker = wrapper.findComponent({ name: 'UnnnicDatePicker' });

    const payload = {
      startDate: '01-10-2025',
      endDate: '01-20-2025',
    };

    await datePicker.vm.$emit('submit', payload);

    const emitted = wrapper.emitted('update:model-value');
    expect(emitted).toBeTruthy();

    const [newValue] = emitted[0];
    expect(newValue).toEqual({
      start: '2025-01-10',
      end: '2025-01-20',
    });

    expect(wrapper.vm.isPopoverOpen).toBe(false);
  });

  it('passes minDate, maxDate, options and periodBaseDate down to DatePicker', async () => {
    const props = {
      minDate: '2025-01-01',
      maxDate: '2025-01-31',
      periodBaseDate: '2025-01-15',
      options: [{ name: 'Last 7 days', id: 'last-7-days' }],
    };

    wrapper = factory(props);
    wrapper.vm.isPopoverOpen = true;
    await wrapper.vm.$nextTick();

    const datePicker = wrapper.findComponent({ name: 'UnnnicDatePicker' });
    const dpProps = datePicker.props();

    expect(dpProps.minDate).toBe(props.minDate);
    expect(dpProps.maxDate).toBe(props.maxDate);
    expect(dpProps.periodBaseDate).toBe(props.periodBaseDate);
    expect(dpProps.options).toEqual(props.options);
    expect(dpProps.variant).toBe('popover');
  });

  it('aligns the popover to the end when position is right', () => {
    const rightWrapper = factory({ position: 'right' });

    expect(rightWrapper.vm.popoverAlign).toBe('end');

    rightWrapper.unmount();
  });
});

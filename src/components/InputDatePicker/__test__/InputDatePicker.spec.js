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
    global: {
      stubs: {
        Teleport: true,
        UnnnicInput: {
          name: 'UnnnicInput',
          template:
            '<input data-testid="input" v-bind="$attrs" @focus="$emit(\'focus\', $event)" @click="$emit(\'click\', $event)" />',
        },
        UnnnicDatePicker: {
          name: 'UnnnicDatePicker',
          props: ['minDate', 'maxDate', 'periodBaseDate', 'options'],
          template: '<div data-testid="datepicker"></div>',
        },
      },
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

    wrapper.vm.showCalendarFilter = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'UnnnicDatePicker' }).exists()).toBe(
      true,
    );
  });

  it('opens datepicker when input receives click', async () => {
    const input = wrapper.find('[data-testid="input"]');
    await input.trigger('click');

    wrapper.vm.showCalendarFilter = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'UnnnicDatePicker' }).exists()).toBe(
      true,
    );
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
    wrapper.vm.showCalendarFilter = true;
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
    wrapper.vm.showCalendarFilter = true;
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

    expect(wrapper.vm.showCalendarFilter).toBe(false);
  });

  it('passes minDate, maxDate, options and periodBaseDate down to DatePicker', async () => {
    const props = {
      minDate: '2025-01-01',
      maxDate: '2025-01-31',
      periodBaseDate: '2025-01-15',
      options: [{ name: 'Last 7 days', id: 'last-7-days' }],
    };

    wrapper = factory(props);
    wrapper.vm.showCalendarFilter = true;
    await wrapper.vm.$nextTick();

    const datePicker = wrapper.findComponent({ name: 'UnnnicDatePicker' });
    const dpProps = datePicker.props();

    expect(dpProps.minDate).toBe(props.minDate);
    expect(dpProps.maxDate).toBe(props.maxDate);
    expect(dpProps.periodBaseDate).toBe(props.periodBaseDate);
    expect(dpProps.options).toEqual(props.options);
  });

  it('closes dropdown on mouseout when clicking outside', () => {
    wrapper.vm.showCalendarFilter = true;

    wrapper.vm.mouseout({ target: document.createElement('div') });

    expect(wrapper.vm.showCalendarFilter).toBe(false);
  });

  it('initializes dropdownStyles with default values', () => {
    expect(wrapper.vm.dropdownStyles).toEqual({
      position: 'absolute',
      top: '0px',
      left: '0px',
      zIndex: '9999',
    });
  });

  it('updates dropdown position when showCalendarFilter changes to true', async () => {
    const mockRect = {
      bottom: 100,
      left: 50,
      right: 250,
    };

    wrapper.vm.dropdown = {
      getBoundingClientRect: () => mockRect,
    };

    wrapper.vm.showCalendarFilter = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.dropdownStyles.position).toBe('absolute');
    expect(wrapper.vm.dropdownStyles.zIndex).toBe('9999');
  });

  it('does not close dropdown when clicking inside dropdown element', () => {
    const dropdownElement = document.createElement('div');
    const targetElement = document.createElement('span');
    dropdownElement.appendChild(targetElement);

    wrapper.vm.dropdownData = dropdownElement;
    wrapper.vm.showCalendarFilter = true;

    wrapper.vm.mouseout({ target: targetElement });

    expect(wrapper.vm.showCalendarFilter).toBe(true);
  });

  it('does not close dropdown when clicking inside input element', () => {
    const inputElement = document.createElement('div');
    const targetElement = document.createElement('span');
    inputElement.appendChild(targetElement);

    wrapper.vm.dropdown = inputElement;
    wrapper.vm.showCalendarFilter = true;

    wrapper.vm.mouseout({ target: targetElement });

    expect(wrapper.vm.showCalendarFilter).toBe(true);
  });

  it('respects position prop when updating dropdown position', async () => {
    const wrapperRight = factory({ position: 'right' });

    const mockRect = {
      bottom: 100,
      left: 50,
      right: 250,
      top: 50,
      height: 50,
      width: 200,
      x: 50,
      y: 50,
    };

    const mockDropdownElement = {
      getBoundingClientRect: vi.fn(() => mockRect),
      contains: vi.fn(() => false),
    };

    const vm = wrapperRight.vm;
    vm.dropdown = mockDropdownElement;
    vm.showCalendarFilter = true;
    await vm.$nextTick();

    expect(vm.dropdown).toBeTruthy();
    expect(vm.dropdown.getBoundingClientRect).toBeTruthy();
    expect(vm.showCalendarFilter).toBe(true);

    vm.updateDropdownPosition();

    const leftValue = vm.dropdownStyles.left;

    expect(vm.dropdownStyles).toBeDefined();
    expect(typeof leftValue).toBe('string');

    expect(['0px', '250px']).toContain(leftValue);

    wrapperRight.unmount();
  });

  it('adds event listeners on mount', () => {
    const addEventListenerSpy = vi.spyOn(
      window.document.body,
      'addEventListener',
    );
    const windowAddEventListenerSpy = vi.spyOn(window, 'addEventListener');

    const newWrapper = factory();

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
    );
    expect(windowAddEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      true,
    );
    expect(windowAddEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );

    addEventListenerSpy.mockRestore();
    windowAddEventListenerSpy.mockRestore();
    newWrapper.unmount();
  });

  it('removes event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(
      window.document.body,
      'removeEventListener',
    );
    const windowRemoveEventListenerSpy = vi.spyOn(
      window,
      'removeEventListener',
    );

    const newWrapper = factory();
    newWrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
    );
    expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      true,
    );
    expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );

    removeEventListenerSpy.mockRestore();
    windowRemoveEventListenerSpy.mockRestore();
  });
});

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import DateFilter from '../DateFilter.vue';

const factory = (props = {}) =>
  mount(DateFilter, {
    props,
  });

describe('DateFilter.vue', () => {
  it('computes dateRange from start and end dates with dayjs', () => {
    const wrapper = factory({
      startDate: new Date(2025, 0, 10),
      endDate: new Date(2025, 0, 20),
      dateFormat: 'DD/MM/YYYY',
    });

    expect(wrapper.vm.dateRange).toBe('1001202520012025');
    wrapper.unmount();
  });

  it('computes dateRange from start and end dates with date-fns', () => {
    const wrapper = factory({
      startDate: new Date(2025, 0, 10),
      endDate: new Date(2025, 0, 20),
      dateFormat: 'DD/MM/YYYY',
      useDateFns: true,
    });

    expect(wrapper.vm.dateRange).toBe('1001202520012025');
    wrapper.unmount();
  });

  it('returns an empty dateRange when there is no date selected', () => {
    const wrapper = factory();

    expect(wrapper.vm.dateRange).toBe('');
    wrapper.unmount();
  });
});

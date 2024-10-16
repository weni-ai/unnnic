import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import TablePagination from '../TablePagination.vue';
import Pagination from '@/components/Pagination/Pagination.vue';

describe('TablePagination.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TablePagination, {
      props: {
        modelValue: 1,
        interval: 10,
        total: 100,
      },
    });
  });

  const findCountElement = () => wrapper.find('[data-testid="count"]');

  it.each([
    { modelValue: 2, total: 100, expectedText: '11 - 20 of 100' },
    { modelValue: 10, total: 95, expectedText: '91 - 95 of 95' },
    { modelValue: 1, total: 95, expectedText: '1 - 10 of 95' },
    { modelValue: 1, total: 0, expectedText: '0 - 0 of 0' },
  ])(
    'renders correct pagination text for modelValue: $modelValue and total: $total',
    async ({ modelValue, total, expectedText }) => {
      await wrapper.setProps({ modelValue, total });
      expect(findCountElement().text()).toContain(expectedText);
    },
  );

  it('calculates pages correctly', async () => {
    await wrapper.setProps({ total: 55, interval: 10 });
    const pagination = wrapper.vm.pages;
    expect(pagination).toBe(6); // 55 items / 10 per page = 6 pages
  });

  it('renders correct pagination text for the last page', async () => {
    await wrapper.setProps({ modelValue: 10, total: 95, interval: 10 });
    expect(findCountElement().text()).toContain('91 - 95 of 95');
  });

  it('renders correct pagination text for the first page', async () => {
    await wrapper.setProps({ modelValue: 1, total: 95, interval: 10 });
    expect(findCountElement().text()).toContain('1 - 10 of 95');
  });

  it('renders correct 5 pagination buttons', async () => {
    const pageButtons = wrapper.findAll('[data-test="page-button"]');
    expect(pageButtons.length).toBe(5);
  });

  it('emits update:model-value event when pagination changes', async () => {
    await wrapper.findComponent(Pagination).vm.$emit('update:model-value', 2);

    expect(wrapper.emitted()['update:model-value']).toBeTruthy();
    expect(wrapper.emitted()['update:model-value'][0]).toEqual([2]);
  });

  it('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

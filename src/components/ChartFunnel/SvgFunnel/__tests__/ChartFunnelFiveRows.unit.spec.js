import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, afterEach, test, vi } from 'vitest';
import ChartFunnelFiveRows from '@/components/ChartFunnel/SvgFunnel/ChartFunnelFiveRows.vue';

describe('ChartFunnelFiveRows.vue', () => {
  let wrapper;
  const mockData = [
    { title: 'Row 1', description: 'Description 1' },
    { title: 'Row 2', description: 'Description 2' },
    { title: 'Row 3', description: 'Description 3' },
    { title: 'Row 4', description: 'Description 4' },
    { title: 'Row 5', description: 'Description 5' },
  ];

  beforeEach(() => {
    wrapper = mount(ChartFunnelFiveRows, {
      props: {
        data: mockData,
      },
      global: {
        stubs: {
          ChartFunnelBaseRow: {
            template: '<div class="chart-funnel-base-row" />',
            props: ['rows', 'viewBox'],
          },
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain('unnnic-chart-funnel-five-rows');
  });

  test('renders ChartFunnelBaseRow component with correct props', () => {
    const baseRow = wrapper.findComponent('.unnnic-chart-funnel-five-rows');

    expect(baseRow.exists()).toBe(true);
    expect(baseRow.props('viewBox')).toBe('0 0 361 220');
  });

  test('computes rows correctly with provided data', () => {
    const computedRows = wrapper.vm.rows;

    expect(computedRows).toHaveLength(5);

    expect(computedRows[0]).toEqual({
      pathD:
        'M352.506 0H8.42251C1.93921 0 -1.85142 7.30766 1.88266 12.6076L24 44H336.75L359.028 12.6324C362.79 7.33528 359.003 0 352.506 0Z',
      titleX: '50%',
      titleY: '20',
      descriptionX: '50%',
      descriptionY: '38',
      title: mockData[0].title,
      description: mockData[0].description,
    });

    expect(computedRows[2]).toEqual({
      pathD: 'M304.5 88H56.5L88.9564 132H273.708L304.5 88Z',
      titleX: '50%',
      titleY: '106',
      descriptionX: '50%',
      descriptionY: '124',
      title: mockData[2].title,
      description: mockData[2].description,
    });

    expect(computedRows[4]).toEqual({
      pathD:
        'M242 176H120.957L130.481 213.947C131.374 217.505 134.573 220 138.241 220H223.89C227.498 220 230.659 217.585 231.608 214.105L242 176Z',
      titleX: '50%',
      titleY: '194',
      descriptionX: '50%',
      descriptionY: '212',
      title: mockData[4].title,
      description: mockData[4].description,
    });
  });

  test('updates rows when data prop changes', async () => {
    const newData = [
      { title: 'New 1', description: 'New Desc 1' },
      { title: 'New 2', description: 'New Desc 2' },
      { title: 'New 3', description: 'New Desc 3' },
      { title: 'New 4', description: 'New Desc 4' },
      { title: 'New 5', description: 'New Desc 5' },
    ];

    await wrapper.setProps({ data: newData });
    const computedRows = wrapper.vm.rows;

    expect(computedRows[0].title).toBe('New 1');
    expect(computedRows[0].description).toBe('New Desc 1');
    expect(computedRows[4].title).toBe('New 5');
    expect(computedRows[4].description).toBe('New Desc 5');
  });

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('passes correct viewBox to ChartFunnelBaseRow', () => {
    const baseRow = wrapper.findComponent('.unnnic-chart-funnel-five-rows');
    expect(baseRow.props('viewBox')).toBe('0 0 361 220');
  });

  test('correctly formats all row paths', () => {
    const computedRows = wrapper.vm.rows;
    const expectedPaths = [
      'M352.506 0H8.42251C1.93921 0 -1.85142 7.30766 1.88266 12.6076L24 44H336.75L359.028 12.6324C362.79 7.33528 359.003 0 352.506 0Z',
      'M337 44H24L56.4654 88H304.535L337 44Z',
      'M304.5 88H56.5L88.9564 132H273.708L304.5 88Z',
      'M274 132H89L121 176H242L274 132Z',
      'M242 176H120.957L130.481 213.947C131.374 217.505 134.573 220 138.241 220H223.89C227.498 220 230.659 217.585 231.608 214.105L242 176Z',
    ];

    computedRows.forEach((row, index) => {
      expect(row.pathD).toBe(expectedPaths[index]);
    });
  });
});

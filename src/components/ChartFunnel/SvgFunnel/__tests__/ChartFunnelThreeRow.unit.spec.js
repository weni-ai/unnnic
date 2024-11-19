import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, afterEach, test } from 'vitest';
import ChartFunnelFiveRows from '@/components/ChartFunnel/SvgFunnel/ChartFunnelThreeRows.vue';

describe('ChartFunnelThreeRows.vue', () => {
  let wrapper;
  const mockData = [
    { title: 'Row 1', description: 'Description 1' },
    { title: 'Row 2', description: 'Description 2' },
    { title: 'Row 3', description: 'Description 3' },
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
    expect(wrapper.classes()).toContain('unnnic-chart-funnel-three-rows');
  });

  test('renders ChartFunnelBaseRow component with correct props', () => {
    const baseRow = wrapper.findComponent('.unnnic-chart-funnel-three-rows');

    expect(baseRow.exists()).toBe(true);
    expect(baseRow.props('viewBox')).toBe('0 0 375 222');
  });

  test('computes rows correctly with provided data', () => {
    const computedRows = wrapper.vm.rows;

    expect(computedRows).toHaveLength(3);

    expect(computedRows[0]).toEqual({
      pathD:
        'M362.938 0H12.025C6.30976 0 2.43799 5.81972 4.64626 11.0911L31 74H343.75L370.307 11.1122C372.535 5.83818 368.663 0 362.938 0Z',
      titleX: '50%',
      titleY: '32',
      descriptionX: '50%',
      descriptionY: '52',
      title: mockData[0].title,
      description: mockData[0].description,
    });

    expect(computedRows[1]).toEqual({
      pathD: 'M344 74H31L63.4654 148H311.535L344 74Z',
      titleX: '50%',
      titleY: '106',
      descriptionX: '50%',
      descriptionY: '126',
      title: mockData[1].title,
      description: mockData[1].description,
    });

    expect(computedRows[2]).toEqual({
      pathD:
        'M311.5 148H63.5L93.8569 217.213C95.1325 220.122 98.0075 222 101.183 222H275.372C278.603 222 281.517 220.056 282.758 217.073L311.5 148Z',
      titleX: '50%',
      titleY: '180',
      descriptionX: '50%',
      descriptionY: '200',
      title: mockData[2].title,
      description: mockData[2].description,
    });
  });

  test('updates rows when data prop changes', async () => {
    const newData = [
      { title: 'New 1', description: 'New Desc 1' },
      { title: 'New 2', description: 'New Desc 2' },
      { title: 'New 3', description: 'New Desc 3' },
    ];

    await wrapper.setProps({ data: newData });
    const computedRows = wrapper.vm.rows;

    expect(computedRows[0].title).toBe('New 1');
    expect(computedRows[0].description).toBe('New Desc 1');
    expect(computedRows[2].title).toBe('New 3');
    expect(computedRows[2].description).toBe('New Desc 3');
  });

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('passes correct viewBox to ChartFunnelBaseRow', () => {
    const baseRow = wrapper.findComponent('.unnnic-chart-funnel-three-rows');
    expect(baseRow.props('viewBox')).toBe('0 0 375 222');
  });

  test('correctly formats all row paths', () => {
    const computedRows = wrapper.vm.rows;
    const expectedPaths = [
      'M362.938 0H12.025C6.30976 0 2.43799 5.81972 4.64626 11.0911L31 74H343.75L370.307 11.1122C372.535 5.83818 368.663 0 362.938 0Z',
      'M344 74H31L63.4654 148H311.535L344 74Z',
      'M311.5 148H63.5L93.8569 217.213C95.1325 220.122 98.0075 222 101.183 222H275.372C278.603 222 281.517 220.056 282.758 217.073L311.5 148Z',
    ];

    computedRows.forEach((row, index) => {
      expect(row.pathD).toBe(expectedPaths[index]);
    });
  });
});

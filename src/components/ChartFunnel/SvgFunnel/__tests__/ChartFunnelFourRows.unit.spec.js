import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, afterEach, test } from 'vitest';
import ChartFunnelFiveRows from '@/components/ChartFunnel/SvgFunnel/ChartFunnelFourRows.vue';

describe('ChartFunnelFourRows.vue', () => {
  let wrapper;
  const mockData = [
    { title: 'Row 1', description: 'Description 1' },
    { title: 'Row 2', description: 'Description 2' },
    { title: 'Row 3', description: 'Description 3' },
    { title: 'Row 4', description: 'Description 4' },
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
    expect(wrapper.classes()).toContain('unnnic-chart-funnel-four-rows');
  });

  test('renders ChartFunnelBaseRow component with correct props', () => {
    const baseRow = wrapper.findComponent('.unnnic-chart-funnel-four-rows');

    expect(baseRow.exists()).toBe(true);
    expect(baseRow.props('viewBox')).toBe('0 0 365 224');
  });

  test('computes rows correctly with provided data', () => {
    const computedRows = wrapper.vm.rows;

    expect(computedRows).toHaveLength(4);

    expect(computedRows[0]).toEqual({
      pathD:
        'M356.374 0H8.57255C2.47804 0 -1.37827 6.54249 1.5734 11.8745L26 56H338.75L363.36 11.8984C366.336 6.56589 362.481 0 356.374 0Z',
      titleX: '50%',
      titleY: '23',
      descriptionX: '50%',
      descriptionY: '43',
      title: mockData[0].title,
      description: mockData[0].description,
    });

    expect(computedRows[1]).toEqual({
      pathD: 'M339 56H26L58.4654 112H306.535L339 56Z',
      titleX: '50%',
      titleY: '78',
      descriptionX: '50%',
      descriptionY: '98',
      title: mockData[1].title,
      description: mockData[1].description,
    });

    expect(computedRows[2]).toEqual({
      pathD: 'M306.5 112H58.5L90.9564 168H275.708L306.5 112Z',
      titleX: '50%',
      titleY: '136',
      descriptionX: '50%',
      descriptionY: '156',
      title: mockData[2].title,
      description: mockData[2].description,
    });
  });

  test('updates rows when data prop changes', async () => {
    const newData = [
      { title: 'New 1', description: 'New Desc 1' },
      { title: 'New 2', description: 'New Desc 2' },
      { title: 'New 3', description: 'New Desc 3' },
      { title: 'New 4', description: 'New Desc 4' },
    ];

    await wrapper.setProps({ data: newData });
    const computedRows = wrapper.vm.rows;

    expect(computedRows[0].title).toBe('New 1');
    expect(computedRows[0].description).toBe('New Desc 1');
    expect(computedRows[3].title).toBe('New 4');
    expect(computedRows[3].description).toBe('New Desc 4');
  });

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('passes correct viewBox to ChartFunnelBaseRow', () => {
    const baseRow = wrapper.findComponent('.unnnic-chart-funnel-four-rows');
    expect(baseRow.props('viewBox')).toBe('0 0 365 224');
  });

  test('correctly formats all row paths', () => {
    const computedRows = wrapper.vm.rows;
    const expectedPaths = [
      'M356.374 0H8.57255C2.47804 0 -1.37827 6.54249 1.5734 11.8745L26 56H338.75L363.36 11.8984C366.336 6.56589 362.481 0 356.374 0Z',
      'M339 56H26L58.4654 112H306.535L339 56Z',
      'M306.5 112H58.5L90.9564 168H275.708L306.5 112Z',
      'M276 168H91L120.697 219.969C122.121 222.462 124.772 224 127.643 224H239.357C242.228 224 244.879 222.462 246.303 219.969L276 168Z',
    ];

    computedRows.forEach((row, index) => {
      expect(row.pathD).toBe(expectedPaths[index]);
    });
  });
});

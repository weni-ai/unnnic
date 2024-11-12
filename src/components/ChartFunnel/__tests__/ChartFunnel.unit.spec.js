import { mount } from '@vue/test-utils';
import { describe, expect, test, beforeEach } from 'vitest';
import ChartFunnel from '@/components/ChartFunnel/ChartFunnel.vue';

describe('ChartFunnel.vue', () => {
  const mockThreeRowsData = [
    { title: '100%', value: 1000, description: 'First', color: '#123456' },
    { title: '66%', value: 660, description: 'Second', color: '#234567' },
    { title: '33%', value: 330, description: 'Third', color: '#345678' },
  ];

  const mockFourRowsData = [
    ...mockThreeRowsData,
    { title: '10%', value: 100, description: 'Fourth', color: '#456789' },
  ];

  const mockFiveRowsData = [
    ...mockFourRowsData,
    { title: '5%', value: 50, description: 'Fifth', color: '#567890' },
  ];

  let wrapper;

  beforeEach(() => {
    wrapper = mount(ChartFunnel, {
      props: {
        data: mockThreeRowsData,
        type: 'default',
      },
      global: {
        stubs: {
          ChartDefaultFunnelBase: true,
          ChartFunnelThreeRows: true,
          ChartFunnelFourRows: true,
          ChartFunnelFiveRows: true,
        },
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('validates required props', () => {
    const { data } = wrapper.vm.$options.props;
    expect(data.required).toBe(true);
    expect(data.type).toBe(Array);
  });

  test('validates default props', () => {
    const { type } = wrapper.vm.$options.props;
    expect(type.default).toBe('default');
    expect(type.type).toBe(String);
  });

  describe('chartComponent computed property', () => {
    test('returns correct component for default type with 3 rows', () => {
      expect(wrapper.vm.chartComponent.__name).toBe('ChartDefaultFunnelBase');
    });

    test('returns correct component for default type with 4 rows', async () => {
      await wrapper.setProps({ data: mockFourRowsData });
      expect(wrapper.vm.chartComponent.__name).toBe('ChartDefaultFunnelBase');
    });

    test('returns correct component for default type with 5 rows', async () => {
      await wrapper.setProps({ data: mockFiveRowsData });
      expect(wrapper.vm.chartComponent.__name).toBe('ChartDefaultFunnelBase');
    });

    test('returns correct component for basic type with 3 rows', async () => {
      await wrapper.setProps({ type: 'basic', data: mockThreeRowsData });
      expect(wrapper.vm.chartComponent).toBe('ChartFunnelThreeRows');
    });

    test('returns correct component for basic type with 4 rows', async () => {
      await wrapper.setProps({ type: 'basic', data: mockFourRowsData });
      expect(wrapper.vm.chartComponent).toBe('ChartFunnelFourRows');
    });

    test('returns correct component for basic type with 5 rows', async () => {
      await wrapper.setProps({ type: 'basic', data: mockFiveRowsData });
      expect(wrapper.vm.chartComponent).toBe('ChartFunnelFiveRows');
    });

    test('returns null for invalid row count', async () => {
      const invalidData = [
        { title: '100%', value: 100, description: 'Single' },
      ];
      await wrapper.setProps({ data: invalidData });
      expect(wrapper.vm.chartComponent).toBe(null);
    });
  });

  describe('chartData computed property', () => {
    test('transforms data correctly for default type', () => {
      const expectedData = [
        {
          percentage: '100%',
          value: 1000,
          description: 'First',
          widthClass: 'w-60',
          color: '#123456',
        },
        {
          percentage: '66%',
          value: 660,
          description: 'Second',
          widthClass: 'w-50',
          color: '#234567',
        },
        {
          percentage: '33%',
          value: 330,
          description: 'Third',
          widthClass: 'w-40',
          color: '#345678',
        },
      ];
      expect(wrapper.vm.chartData).toEqual(expectedData);
    });

    test('returns original data for basic type', async () => {
      await wrapper.setProps({ type: 'basic' });
      expect(wrapper.vm.chartData).toEqual(mockThreeRowsData);
    });

    test('applies correct width classes for different row counts in default type', async () => {
      await wrapper.setProps({ data: mockFiveRowsData });
      const widthClasses = wrapper.vm.chartData.map((item) => item.widthClass);
      expect(widthClasses).toEqual(['w-60', 'w-50', 'w-40', 'w-30', 'w-20']);
    });
  });

  test('renders the correct dynamic component based on computed chartComponent', async () => {
    let component = wrapper.findComponent({ name: 'ChartDefaultFunnelBase' });
    expect(component.exists()).toBe(true);

    await wrapper.setProps({ type: 'basic', data: mockThreeRowsData });
    component = wrapper.findComponent({ name: 'ChartFunnelThreeRows' });
    expect(component.exists()).toBe(true);

    await wrapper.setProps({ data: mockFourRowsData });
    component = wrapper.findComponent({ name: 'ChartFunnelFourRows' });
    expect(component.exists()).toBe(true);

    await wrapper.setProps({ data: mockFiveRowsData });
    component = wrapper.findComponent({ name: 'ChartFunnelFiveRows' });
    expect(component.exists()).toBe(true);
  });

  test('passes correct props to dynamic component', async () => {
    const component = wrapper.findComponent({ name: 'ChartDefaultFunnelBase' });
    expect(component.props('data')).toEqual(wrapper.vm.chartData);
  });

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

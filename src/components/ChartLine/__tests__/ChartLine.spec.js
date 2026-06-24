import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import ChartLine from '../ChartLine.vue';

const sampleData = [
  { title: 'Jan', value: 10 },
  { title: 'Feb', value: 20 },
  { title: 'Mar', value: 15 },
];

const setChartWidth = (wrapper, width) => {
  Object.defineProperty(wrapper.vm.$refs.chart, 'offsetWidth', {
    configurable: true,
    value: width,
  });
};

const mountChart = (props = {}) => {
  const wrapper = mount(ChartLine, {
    props: {
      data: sampleData,
      ...props,
    },
    attachTo: document.body,
    global: {
      stubs: {
        UnnnicToolTip: {
          name: 'UnnnicToolTip',
          template:
            '<div class="tooltip-stub" :style="$attrs.style"><slot /></div>',
          inheritAttrs: false,
        },
      },
    },
  });

  setChartWidth(wrapper, 300);
  wrapper.vm.chartContainerWidth = 300;

  return wrapper;
};

describe('ChartLine', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  it('renders title and data labels', () => {
    const wrapper = mountChart({ title: 'Monthly trend' });

    expect(wrapper.find('.header .title').text()).toBe('Monthly trend');
    expect(
      wrapper.findAll('.groups .title').map((node) => node.text()),
    ).toEqual(['Jan', 'Feb', 'Mar']);
  });

  it('omits header when title is not provided', () => {
    const wrapper = mountChart();

    expect(wrapper.find('.header').exists()).toBe(false);
  });

  it('applies condensed class when prop is true', () => {
    const wrapper = mountChart({ condensed: true });

    expect(wrapper.classes()).toContain('condensed');
  });

  it('uses fixedMaxValue when provided', () => {
    const wrapper = mountChart({ fixedMaxValue: 50 });

    expect(wrapper.vm.maxValue).toBe(50);
  });

  it('computes maxValue from data when fixedMaxValue is absent', () => {
    const wrapper = mountChart();

    expect(wrapper.vm.maxValue).toBe(20);
  });

  it('formats reference values with one decimal when maxValue is 1 or less', () => {
    const wrapper = mountChart({
      fixedMaxValue: 1,
      data: [{ title: 'A', value: 0.5 }],
    });

    expect(wrapper.vm.value(0.5)).toBe('0.5');
    expect(wrapper.text()).toContain('0.5');
  });

  it('formats reference values as integers when maxValue is greater than 1', () => {
    const wrapper = mountChart();

    expect(wrapper.vm.value(10.2)).toBe('11');
  });

  it('generates svg background image for multiple data points', () => {
    const wrapper = mountChart();

    expect(wrapper.vm.svgChart).toContain('data:image/svg+xml');
    expect(wrapper.vm.svgChart).toContain('linearGradient');
  });

  it('generates svg background image for a single data point', () => {
    const wrapper = mountChart({
      data: [{ title: 'Only', value: 8 }],
    });

    expect(wrapper.vm.svgChart).toContain('data:image/svg+xml');
  });

  it('updates chart container width on interval', async () => {
    const wrapper = mountChart();

    setChartWidth(wrapper, 320);
    vi.advanceTimersByTime(100);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.chartContainerWidth).toBe(320);
  });

  it('clears width interval on unmount', () => {
    const wrapper = mountChart();
    const intervalId = wrapper.vm.chartContainerWidthInterval;
    const clearSpy = vi.spyOn(globalThis, 'clearInterval');

    wrapper.unmount();

    expect(clearSpy).toHaveBeenCalledWith(intervalId);
  });

  it('clears width interval on unmount even when interval is unset', () => {
    const wrapper = mountChart();
    wrapper.vm.chartContainerWidthInterval = null;
    const clearSpy = vi.spyOn(globalThis, 'clearInterval');

    wrapper.unmount();

    expect(clearSpy).not.toHaveBeenCalled();
  });

  it('covers svg path generation for more than two bars', () => {
    const wrapper = mountChart({
      data: [
        { title: 'A', value: 4 },
        { title: 'B', value: 8 },
        { title: 'C', value: 6 },
        { title: 'D', value: 2 },
      ],
    });

    expect(wrapper.vm.svgChart).toContain('linearGradient');
    expect(wrapper.findAll('.tooltip-stub')).toHaveLength(4);
  });

  it('renders tooltip bars with proportional heights', () => {
    const wrapper = mountChart();
    const tooltips = wrapper.findAll('.tooltip-stub');

    expect(tooltips).toHaveLength(3);
    expect(tooltips[1].attributes('style')).toContain('height: 100%');
    expect(tooltips[0].attributes('style')).toContain('height: 50%');
  });
});

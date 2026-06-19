import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import Slider from '../Slider.vue';

const tooltipStub = {
  name: 'UnnnicTooltip',
  template: '<div><div ref="label" class="tooltip-label"><slot /></div></div>',
  mounted() {
    Object.defineProperty(this.$refs.label, 'clientWidth', {
      configurable: true,
      value: 32,
    });
  },
};

const noLabelTooltipStub = {
  name: 'UnnnicTooltip',
  template: '<div><slot /></div>',
};

const mockInputDimensions = (wrapper, width = 200) => {
  const input = wrapper.find('input[type="range"]').element;

  Object.defineProperty(input, 'clientWidth', {
    configurable: true,
    value: width,
  });
  Object.defineProperty(input, 'offsetWidth', {
    configurable: true,
    value: width,
  });
};

const createWrapper = async (props = {}, options = {}) => {
  const wrapper = mount(Slider, {
    props: {
      initialValue: 2,
      minValue: 0,
      maxValue: 10,
      ...props,
    },
    attachTo: document.body,
    global: {
      stubs: {
        UnnnicTooltip: tooltipStub,
        UnnnicIcon: true,
        ...options.stubs,
      },
    },
  });

  mockInputDimensions(wrapper);
  await wrapper.vm.$nextTick();

  return wrapper;
};

describe('Slider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  it('renders label, info tooltip, and min/max labels', async () => {
    const wrapper = await createWrapper({
      label: 'Volume',
      labelInfo: 'Adjust volume',
      minLabel: 'Low',
      maxLabel: 'High',
    });

    expect(wrapper.find('.unnnic-slider__label').text()).toBe('Volume');
    expect(wrapper.find('.unnnic-label__tooltip').exists()).toBe(true);
    expect(wrapper.find('.unnnic-slider__content__labels__min').text()).toBe(
      'Low',
    );
    expect(wrapper.find('.unnnic-slider__content__labels__max').text()).toBe(
      'High',
    );
  });

  it('hides value input when showInputValue is false', async () => {
    const wrapper = await createWrapper({ showInputValue: false });

    expect(wrapper.find('.value-input').exists()).toBe(false);
  });

  it('emits valueChange when range input changes', async () => {
    const wrapper = await createWrapper();

    const rangeInput = wrapper.find('input[type="range"]');
    await rangeInput.setValue(5);
    await rangeInput.trigger('change');

    expect(wrapper.emitted('valueChange')).toBeTruthy();
    expect(wrapper.emitted('valueChange').at(-1)).toEqual(['5']);
  });

  it('updates value from the text input', async () => {
    const wrapper = await createWrapper();

    const valueInput = wrapper.find('.value-input');
    await valueInput.setValue('7');

    expect(wrapper.vm.sliderVal).toBe('7');
    expect(wrapper.emitted('valueChange')).toBeTruthy();
  });

  it('shows tooltip on mouseover and hides on mouseleave', async () => {
    const wrapper = await createWrapper();

    const rangeInput = wrapper.find('input[type="range"]');
    await rangeInput.trigger('mouseover');
    expect(wrapper.vm.showTooltip).toBe(true);

    await rangeInput.trigger('mouseleave');
    expect(wrapper.vm.showTooltip).toBe(false);
  });

  it('computes css variables from current state', async () => {
    const wrapper = await createWrapper({
      initialValue: 4,
      minValue: 0,
      maxValue: 8,
    });

    expect(wrapper.vm.cssVars).toEqual({
      '--val': 4,
      '--tooltip-offset': expect.any(Number),
      '--min': 0,
      '--max': 8,
    });
  });

  it('returns zero tooltip offset when dimensions are unavailable', async () => {
    const wrapper = await createWrapper();
    wrapper.vm.sliderWidth = 0;
    wrapper.vm.labelWidth = 0;

    expect(wrapper.vm.getNewTooltipPosition()).toBe(0);
  });

  it('handles NaN range when min and max are equal', async () => {
    const wrapper = await createWrapper({
      initialValue: 5,
      minValue: 5,
      maxValue: 5,
    });
    wrapper.vm.sliderWidth = 200;
    wrapper.vm.labelWidth = 32;

    expect(wrapper.vm.getNewTooltipPosition()).toBeTypeOf('number');
  });

  it('uses fallback label width when label width is zero', async () => {
    const wrapper = await createWrapper();
    wrapper.vm.sliderWidth = 200;
    wrapper.vm.labelWidth = 0;

    expect(wrapper.vm.getNewTooltipPosition()).toBe(0);
  });

  it('reconfigures tooltip on window resize', async () => {
    const wrapper = await createWrapper();
    const configureSpy = vi.spyOn(wrapper.vm, 'configureTooltip');

    window.dispatchEvent(new Event('resize'));

    expect(configureSpy).toHaveBeenCalled();
  });

  it('removes resize listener on unmount', async () => {
    const wrapper = await createWrapper();
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    wrapper.unmount();

    expect(removeSpy).toHaveBeenCalledWith('resize', wrapper.vm.handleResize);
  });

  it('initializes dimensions from polling intervals', async () => {
    const wrapper = await createWrapper();
    mockInputDimensions(wrapper, 0);

    vi.advanceTimersByTime(100);
    await wrapper.vm.$nextTick();

    mockInputDimensions(wrapper, 200);
    vi.advanceTimersByTime(100);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.sliderWidth).toBe(200);
    expect(wrapper.vm.labelWidth).toBe(32);
  });

  it('skips tooltip label polling when label ref is missing', async () => {
    vi.spyOn(Slider.methods, 'configureTooltip').mockImplementation(() => {});

    const wrapper = await createWrapper(
      {},
      { stubs: { UnnnicTooltip: noLabelTooltipStub } },
    );
    mockInputDimensions(wrapper);

    vi.advanceTimersByTime(100);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.labelWidth).toBe(0);

    Slider.methods.configureTooltip.mockRestore();
  });

  it('syncs value input text when slider value changes', async () => {
    const wrapper = await createWrapper({ initialValue: 1 });

    const valueInput = wrapper.find('.value-input').element;
    valueInput.textContent = 'old';

    wrapper.vm.sliderVal = 9;
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(valueInput.textContent).toBe('9');
  });

  it('skips value input sync when text already matches slider value', async () => {
    const wrapper = await createWrapper({ initialValue: 4 });
    const valueInput = wrapper.find('.value-input').element;
    valueInput.textContent = '4';

    wrapper.vm.sliderVal = 4;
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(valueInput.textContent).toBe('4');
  });

  it('computes tooltip position with non-zero dimensions', async () => {
    const wrapper = await createWrapper({
      initialValue: 5,
      minValue: 0,
      maxValue: 10,
    });
    wrapper.vm.sliderWidth = 200;
    wrapper.vm.labelWidth = 32;

    expect(wrapper.vm.getNewTooltipPosition()).toBeGreaterThan(0);
  });

  it('uses fallback label width when label width is NaN', async () => {
    const wrapper = await createWrapper();
    wrapper.vm.sliderWidth = 200;
    wrapper.vm.labelWidth = Number.NaN;

    expect(wrapper.vm.getNewTooltipPosition()).toBeTypeOf('number');
  });

  it('ignores input polling after unmount', async () => {
    const wrapper = await createWrapper();
    mockInputDimensions(wrapper, 0);

    wrapper.unmount();
    vi.advanceTimersByTime(200);

    expect(true).toBe(true);
  });

  it('waits until tooltip label width is greater than zero', async () => {
    const delayedLabelTooltipStub = {
      name: 'UnnnicTooltip',
      template:
        '<div><div ref="label" class="tooltip-label"><slot /></div></div>',
      mounted() {
        Object.defineProperty(this.$refs.label, 'clientWidth', {
          configurable: true,
          value: 0,
        });
      },
    };

    vi.spyOn(Slider.methods, 'configureTooltip').mockImplementation(
      function mockConfigure() {
        if (!this.$refs.input || !this.$refs.tooltip?.$refs?.label) {
          return;
        }

        this.sliderWidth = this.$refs.input.clientWidth;
        this.labelWidth = this.$refs.tooltip.$refs.label.clientWidth;
        this.tooltipOffset = this.getNewTooltipPosition();
      },
    );

    const wrapper = await createWrapper(
      {},
      {
        stubs: { UnnnicTooltip: delayedLabelTooltipStub },
      },
    );
    mockInputDimensions(wrapper);

    vi.advanceTimersByTime(100);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.labelWidth).toBe(0);

    Object.defineProperty(wrapper.vm.$refs.tooltip.$refs.label, 'clientWidth', {
      configurable: true,
      value: 32,
    });
    vi.advanceTimersByTime(100);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.labelWidth).toBe(32);

    Slider.methods.configureTooltip.mockRestore();
  });
});

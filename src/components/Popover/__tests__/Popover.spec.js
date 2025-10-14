import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, afterEach, test, vi } from 'vitest';
import UnnnicPopover from '@/components/Popover/index.vue';

vi.mock('@vueuse/core', () => ({
  onClickOutside: vi.fn(),
  useResizeObserver: vi.fn(),
}));

describe('UnnnicPopover.vue', () => {
  let wrapper;

  const defaultSlots = {
    trigger: '<button data-testid="trigger-button">Click me</button>',
    content: '<div data-testid="popover-content">Popover content</div>',
  };

  const mountWrapper = (props) => {
    return mount(UnnnicPopover, {
      slots: defaultSlots,
      props: {
        ...props,
      },
    });
  };

  beforeEach(() => {
    wrapper = mountWrapper();
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.unnnic-popover').exists()).toBe(true);
  });

  test('renders trigger slot', () => {
    const trigger = wrapper.find('[data-testid="popover-trigger"]');
    const triggerButton = wrapper.find('[data-testid="trigger-button"]');

    expect(trigger.exists()).toBe(true);
    expect(triggerButton.exists()).toBe(true);
    expect(triggerButton.text()).toBe('Click me');
  });

  test('renders content slot inside balloon', async () => {
    wrapper.vm.open = true;
    await wrapper.vm.$nextTick();
    const balloon = wrapper.find('[data-testid="popover-balloon"]');
    const content = wrapper.find('[data-testid="popover-content"]');

    expect(balloon.exists()).toBe(true);
    expect(content.exists()).toBe(true);
    expect(content.text()).toBe('Popover content');
  });

  test('balloon is hidden by default', () => {
    const balloon = wrapper.find('[data-testid="popover-balloon"]');
    expect(balloon.exists()).toBe(false);
  });

  test('toggles balloon visibility when trigger is clicked', async () => {
    const trigger = wrapper.find('[data-testid="popover-trigger"]');

    let balloon = wrapper.find('[data-testid="popover-balloon"]');

    expect(balloon.exists()).toBe(false);

    await trigger.trigger('click');
    await wrapper.vm.$nextTick();

    balloon = wrapper.find('[data-testid="popover-balloon"]');

    expect(balloon.exists()).toBe(true);
  });

  test('uses modelValue when provided', async () => {
    const wrapper = mountWrapper({ modelValue: true });
    const balloon = wrapper.find('[data-testid="popover-balloon"]');
    expect(balloon.isVisible()).toBe(true);
  });

  test('emits update:modelValue when open state changes', async () => {
    await wrapper.setProps({ modelValue: false });

    const trigger = wrapper.find('[data-testid="popover-trigger"]');
    await trigger.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([true]);
  });

  test('does not emit update:modelValue when modelValue is undefined', async () => {
    const trigger = wrapper.find('[data-testid="popover-trigger"]');
    await trigger.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  test('exposes open ref', () => {
    expect(wrapper.vm.open).toBeDefined();
    expect(typeof wrapper.vm.open).toBe('boolean');
  });

  test('open ref can be controlled programmatically', async () => {
    wrapper.vm.open = true;
    await wrapper.vm.$nextTick();

    const balloon = wrapper.find('[data-testid="popover-balloon"]');
    expect(balloon.isVisible()).toBe(true);
  });

  test('persistent prop prevents closing on outside click', async () => {
    await wrapper.setProps({ persistent: true });

    const { onClickOutside } = await import('@vueuse/core');
    const mockOnClickOutside = vi.mocked(onClickOutside);

    const callback = mockOnClickOutside.mock.calls[0][1];

    wrapper.vm.open = true;
    await wrapper.vm.$nextTick();

    callback();

    const balloon = wrapper.find('[data-testid="popover-balloon"]');
    expect(balloon.isVisible()).toBe(true);
  });

  test('applies correct CSS classes', async () => {
    wrapper.vm.open = true;
    await wrapper.vm.$nextTick();

    const popover = wrapper.find('.unnnic-popover');
    const balloon = wrapper.find('.unnnic-popover__balloon');

    expect(popover.exists()).toBe(true);
    expect(balloon.exists()).toBe(true);
  });

  test('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

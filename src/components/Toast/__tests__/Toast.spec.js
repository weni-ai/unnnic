import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, afterEach, test, vi } from 'vitest';
import Toast from '../Toast.vue';

describe('UnnnicToast', () => {
  let wrapper;
  let mockAction;

  beforeEach(() => {
    mockAction = vi.fn();
    vi.useFakeTimers();

    wrapper = shallowMount(Toast, {
      props: {
        title: 'Test Toast',
      },
      global: {
        stubs: {
          Transition: {
            template: '<div data-testid="toast-transition"><slot /></div>',
          },
        },
      },
    });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  const transition = () =>
    wrapper.findComponent('[data-testid="toast-transition"]');
  const toast = () => wrapper.find('[data-testid="toast"]');
  const content = () => wrapper.find('[data-testid="toast-content"]');
  const header = () => wrapper.find('[data-testid="toast-header"]');
  const title = () => wrapper.find('[data-testid="toast-title"]');
  const text = () => wrapper.find('[data-testid="toast-text"]');
  const actionButton = () =>
    wrapper.findComponent('[data-testid="toast-action-button"]');
  const closeIcon = () =>
    wrapper.findComponent('[data-testid="toast-close-icon"]');
  const typeIcon = () =>
    wrapper.findComponent('[data-testid="toast-type-icon"]');

  describe('Rendering', () => {
    test('renders correctly with required props', () => {
      expect(transition().exists()).toBe(true);
      expect(header().exists()).toBe(true);

      expect(typeIcon().exists()).toBe(true);
      expect(typeIcon().props('icon')).toBe('info');
      expect(typeIcon().props('scheme')).toBe('blue-500');
      expect(typeIcon().props('size')).toBe('ant');

      expect(title().exists()).toBe(true);
      expect(title().text()).toBe('Test Toast');

      expect(text().exists()).toBe(false);

      expect(toast().exists()).toBe(true);
      expect(content().exists()).toBe(true);
      expect(actionButton().exists()).toBe(false);

      expect(closeIcon().exists()).toBe(true);
      expect(closeIcon().props('icon')).toBe('close');
      expect(closeIcon().props('scheme')).toBe('neutral-dark');
      expect(closeIcon().props('size')).toBe('ant');
      expect(closeIcon().props('clickable')).toBe(true);
    });

    test('renders description when provided', async () => {
      await wrapper.setProps({ description: 'Test description' });

      expect(text().exists()).toBe(true);
      expect(text().text()).toBe('Test description');
    });

    test('applies correct CSS class based on type', async () => {
      const types = ['informational', 'attention', 'success', 'error'];

      for (const type of types) {
        await wrapper.setProps({ type });

        expect(toast().classes()).toContain(`unnnic-toast--${type}`);
      }
    });

    test('sets correct ARIA attributes for different types', async () => {
      // Error type
      await wrapper.setProps({ type: 'error' });
      expect(toast().attributes('role')).toBe('alert');
      expect(toast().attributes('aria-live')).toBe('assertive');

      // Other types
      await wrapper.setProps({ type: 'informational' });
      expect(toast().attributes('role')).toBe('status');
      expect(toast().attributes('aria-live')).toBe('polite');
    });
  });

  describe('Icon Configuration', () => {
    test('displays correct icon for each type', async () => {
      const typeConfigs = [
        { type: 'informational', expectedIcon: 'info' },
        { type: 'attention', expectedIcon: 'error' },
        { type: 'success', expectedIcon: 'check_circle' },
        { type: 'error', expectedIcon: 'cancel' },
      ];

      for (const { type, expectedIcon } of typeConfigs) {
        await wrapper.setProps({ type });
        const icon = typeIcon();
        expect(icon.props('icon')).toBe(expectedIcon);
      }
    });

    test('displays correct scheme color for each type', async () => {
      const typeConfigs = [
        { type: 'informational', expectedScheme: 'blue-500' },
        { type: 'attention', expectedScheme: 'yellow-500' },
        { type: 'success', expectedScheme: 'green-500' },
        { type: 'error', expectedScheme: 'red-500' },
      ];

      for (const { type, expectedScheme } of typeConfigs) {
        await wrapper.setProps({ type });
        const icon = typeIcon();
        expect(icon.props('scheme')).toBe(expectedScheme);
      }
    });
  });

  describe('Close Functionality', () => {
    test('emits close event when close button is clicked', async () => {
      const closeButton = closeIcon();
      await closeButton.trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
      expect(wrapper.emitted('close')).toHaveLength(1);

      expect(wrapper.vm.isVisible).toBe(false);
    });

    test('emits close event when close button is activated with Enter key', async () => {
      const closeButton = closeIcon();
      await closeButton.trigger('keydown.enter');

      expect(wrapper.emitted('close')).toBeTruthy();
      expect(wrapper.emitted('close')).toHaveLength(1);

      expect(wrapper.vm.isVisible).toBe(false);
    });

    test('hides toast when close is triggered', async () => {
      expect(toast().exists()).toBe(true);

      await wrapper.vm.handleClose();
      await wrapper.vm.$nextTick();

      expect(toast().exists()).toBe(false);
    });
  });

  describe('Action Button', () => {
    test('renders action button when provided', async () => {
      await wrapper.setProps({
        button: {
          text: 'Action',
          action: mockAction,
        },
      });

      expect(actionButton().exists()).toBe(true);
      expect(actionButton().props('text')).toBe('Action');
    });

    test('does not render action button when not provided', async () => {
      expect(actionButton().exists()).toBe(false);
    });

    test('calls action function when action button is clicked', async () => {
      await wrapper.setProps({
        button: {
          text: 'Action',
          action: mockAction,
        },
      });

      await actionButton().trigger('click');

      expect(mockAction).toHaveBeenCalledTimes(1);
    });

    test('calls action function when action button is activated with Enter key', async () => {
      await wrapper.setProps({
        button: {
          text: 'Action',
          action: mockAction,
        },
      });

      await actionButton().trigger('keydown.enter');

      expect(mockAction).toHaveBeenCalledTimes(1);
    });

    test('does not throw error when action button has no action function', async () => {
      await wrapper.setProps({
        button: {
          text: 'Action',
          action: undefined,
        },
      });

      expect(async () => {
        await actionButton().trigger('click');
      }).not.toThrow();
    });
  });

  describe('Timeout Functionality', () => {
    const createTimeoutWrapper = (timeout = 1000) => {
      return shallowMount(Toast, {
        props: { title: 'Test Toast', timeout },
      });
    };

    test('auto-closes after timeout period', async () => {
      wrapper = createTimeoutWrapper();
      vi.advanceTimersByTime(1000);

      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('close')).toBeTruthy();
    });

    test('does not auto-close when timeout is 0', async () => {
      wrapper = createTimeoutWrapper(0);
      vi.advanceTimersByTime(5000);

      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('close')).toBeFalsy();
    });

    test('does not auto-close when timeout is negative', async () => {
      wrapper = createTimeoutWrapper(-1);
      vi.advanceTimersByTime(5000);

      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('close')).toBeFalsy();
    });

    test('clears timeout when component is unmounted', () => {
      vi.useRealTimers();
      const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

      const localWrapper = shallowMount(Toast, {
        props: { title: 'Test Toast', timeout: 1000 },
      });

      localWrapper.unmount();
      expect(clearTimeoutSpy).toHaveBeenCalled();

      clearTimeoutSpy.mockRestore();
      vi.useFakeTimers();
    });
  });

  describe('Transitions', () => {
    test('emits destroy event after leave transition', async () => {
      await wrapper.vm.handleClose();
      await wrapper.vm.$nextTick();

      await transition().vm.$emit('after-leave');

      expect(wrapper.emitted('destroy')).toBeTruthy();
    });
  });

  describe('Default Props', () => {
    test('uses correct default values', () => {
      expect(wrapper.props('description')).toBe('');
      expect(wrapper.props('button')).toBeUndefined();
      expect(wrapper.props('timeout')).toBe(5000);
      expect(wrapper.props('type')).toBe('informational');
    });
  });
});

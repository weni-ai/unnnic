import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import DropdownSkeleton from '../DropdownSkeleton.vue';

describe('DropdownSkeleton.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(DropdownSkeleton, {
      props: {
        type: 'automatic',
        modelValue: false,
        position: 'bottom-left',
      },
      slots: {
        default: '<div data-testid="default-slot">Default Slot Content</div>',
        inside: '<div data-testid="inside-slot">Inside Slot Content</div>',
      },
    });
  });

  const dropdown = () => wrapper.find('[data-testid="dropdown-skeleton"]');
  const dropdownData = () => wrapper.find('[data-testid="dropdown-data"]');

  describe('Rendering', () => {
    it('should render the dropdown with the correct default classes', () => {
      expect(dropdown().exists()).toBe(true);
      expect(dropdown().classes()).toContain('dropdown');
      expect(dropdown().classes()).not.toContain('active');
    });

    it('should render the default slot content inside the dropdown', () => {
      const defaultSlot = wrapper.find('[data-testid="default-slot"]');
      expect(defaultSlot.exists()).toBe(true);
      expect(defaultSlot.text()).toBe('Default Slot Content');
    });

    it('should apply active class when modelValue is true and type is "manual"', async () => {
      await wrapper.setProps({ modelValue: true, type: 'manual' });
      expect(dropdown().classes()).toContain('active');
    });
  });

  describe('Active State Management', () => {
    it('should set active class to false when type is "automatic"', () => {
      expect(dropdown().classes()).not.toContain('active');
    });

    it('should set active class to true when type is "manual" and modelValue is true', async () => {
      await wrapper.setProps({ type: 'manual', modelValue: true });
      expect(dropdown().classes()).toContain('active');
    });

    it('should set active class to false when type is "manual" and modelValue is false', async () => {
      await wrapper.setProps({ type: 'manual', modelValue: false });
      expect(dropdown().classes()).not.toContain('active');
    });

    it('should not change active class when type is "manual" and modelValue is not changed', () => {
      expect(dropdown().classes()).not.toContain('active');
    });
  });

  describe('Position Calculation', () => {
    it('should calculate position as bottom-left by default', () => {
      const positions = wrapper.vm.positions;

      expect(dropdownData().attributes('style')).toContain(
        `left: ${positions.left}`,
      );
      expect(dropdownData().attributes('style')).toContain(
        `top: ${positions.top}`,
      );
    });

    it('should adjust position to avoid overflow on bottom-right', async () => {
      await wrapper.setProps({ position: 'bottom-right' });

      Object.defineProperty(wrapper.vm, 'clientHeight', { value: 500 });
      Object.defineProperty(wrapper.vm, 'clientWidth', { value: 500 });

      wrapper.vm.data.width = 600;
      wrapper.vm.data.height = 600;

      wrapper.vm.calculatePosition();

      const positions = wrapper.vm.positions;

      expect(dropdownData().attributes('style')).toContain(
        `left: ${positions.left}`,
      );
      expect(dropdownData().attributes('style')).toContain(
        `top: ${positions.top}`,
      );
      expect(parseInt(positions.left, 10)).toBeLessThanOrEqual(
        wrapper.vm.clientWidth,
      );
      expect(parseInt(positions.top, 10)).toBeLessThanOrEqual(
        wrapper.vm.clientHeight,
      );
    });

    it('should correctly position on top-left when specified', async () => {
      await wrapper.setProps({ position: 'top-left' });

      wrapper.vm.data.width = 100;
      wrapper.vm.data.height = 100;

      wrapper.vm.calculatePosition();

      const positions = wrapper.vm.positions;

      expect(dropdownData().attributes('style')).toContain(
        `left: ${positions.left}`,
      );
      expect(dropdownData().attributes('style')).toContain(
        `top: ${positions.top}`,
      );
    });
  });

  describe('Lifecycle', () => {
    it('should clean up event listeners on beforeUnmount', async () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      await wrapper.unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        wrapper.vm.calculatePosition,
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'resize',
        wrapper.vm.calculatePosition,
      );
    });

    it('should set initial data properties on mount', () => {
      expect(wrapper.vm.clientHeight).toBe(0);
      expect(wrapper.vm.clientWidth).toBe(0);
      expect(wrapper.vm.x).toBe(0);
      expect(wrapper.vm.y).toBe(0);
      expect(wrapper.vm.width).toBe(0);
      expect(wrapper.vm.height).toBe(0);
    });
  });
});

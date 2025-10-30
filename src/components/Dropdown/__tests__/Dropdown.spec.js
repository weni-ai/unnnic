import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import Dropdown from '../Dropdown.vue';

describe('Dropdown.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Dropdown, {
      props: {
        open: false,
        position: 'bottom-left',
      },
      slots: {
        trigger: '<button data-testid="dropdown-trigger">Trigger</button>',
        default: '<div data-testid="dropdown-slot">Dropdown Content</div>',
      },
    });
  });

  describe('Render elements', () => {
    it('should render the trigger slot', () => {
      const trigger = wrapper.find('[data-testid="dropdown-trigger"]');
      expect(trigger.exists()).toBe(true);
    });

    it('should not display the dropdown content initially when `open` is false', () => {
      const slot = wrapper.find('[data-testid="dropdown-slot"]');
      expect(slot.exists()).toBe(false);
    });

    it('should display the dropdown content initially when `open` is true', async () => {
      await wrapper.setProps({ open: true });
      const slot = wrapper.find('[data-testid="dropdown-slot"]');
      expect(slot.exists()).toBe(true);
    });
  });

  describe('Props and Positioning', () => {
    it('should set the dropdown position based on the `position` prop', async () => {
      await wrapper.setProps({ open: true, position: 'top-left' });
      const content = wrapper.find('[data-testid="dropdown-content"]');
      expect(content.classes()).toContain(
        'unnnic-dropdown__content__position-top-left',
      );
    });

    it('should validate the `position` prop with allowed values', () => {
      const { validator } = Dropdown.props.position;

      expect(validator('top-left')).toBe(true);
      expect(validator('none')).toBe(true);
      expect(validator('bottom-left')).toBe(true);
      expect(validator('bottom-right')).toBe(true);
      expect(validator('invalid-position')).toBe(false);
    });
  });

  describe('Trigger Functionality', () => {
    it('should toggle `active` state on trigger click', async () => {
      const trigger = wrapper.find('[data-testid="dropdown-trigger"]');
      await trigger.trigger('click');
      expect(wrapper.vm.active).toBe(true);

      await trigger.trigger('click');
      expect(wrapper.vm.active).toBe(false);
    });

    it('should emit "update:open" event when `active` state changes', async () => {
      await wrapper.setProps({ open: false });
      const trigger = wrapper.find('[data-testid="dropdown-trigger"]');
      await trigger.trigger('click');

      expect(wrapper.emitted('update:open')).toBeTruthy();
      expect(wrapper.emitted('update:open')[0]).toEqual([true]);

      await trigger.trigger('click');
      expect(wrapper.emitted('update:open')[1]).toEqual([false]);
    });
  });

  describe('Click Outside Behavior', () => {
    it('should close the dropdown when clicking outside', async () => {
      await wrapper.setProps({ open: true });
      expect(wrapper.vm.active).toBe(true);

      await wrapper.vm.onClickOutside();
      expect(wrapper.vm.active).toBe(false);
    });

    it('should not close the dropdown if `active` is already false on outside click', async () => {
      await wrapper.setProps({ open: false });
      await wrapper.vm.onClickOutside();

      expect(wrapper.vm.active).toBe(false);
    });
  });

  describe('ForceOpen Functionality', () => {
    it('should not toggle dropdown on trigger click when forceOpen is true', async () => {
      await wrapper.setProps({ forceOpen: true, open: false });
      const initialActiveState = wrapper.vm.active;

      const trigger = wrapper.find('[data-testid="dropdown-trigger"]');
      await trigger.trigger('click');

      expect(wrapper.vm.active).toBe(initialActiveState);
      expect(wrapper.emitted('update:open')).toBeFalsy();
    });

    it('should not close dropdown on outside click when forceOpen is true', async () => {
      await wrapper.setProps({ forceOpen: true, open: true });
      expect(wrapper.vm.active).toBe(true);

      await wrapper.vm.onClickOutside();

      expect(wrapper.vm.active).toBe(true);
    });

    it('should not emit update:open when forceOpen is true and useOpenProp is true', async () => {
      await wrapper.setProps({
        forceOpen: true,
        useOpenProp: true,
        open: false,
      });

      const trigger = wrapper.find('[data-testid="dropdown-trigger"]');
      await trigger.trigger('click');

      expect(wrapper.emitted('update:open')).toBeFalsy();
    });

    it('should not close dropdown via onClickOutside when forceOpen is true and useOpenProp is true', async () => {
      await wrapper.setProps({
        forceOpen: true,
        useOpenProp: true,
        open: true,
      });

      await wrapper.vm.onClickOutside();

      expect(wrapper.emitted('update:open')).toBeFalsy();
    });

    it('should allow normal behavior when forceOpen is false', async () => {
      await wrapper.setProps({ forceOpen: false, open: false });

      const trigger = wrapper.find('[data-testid="dropdown-trigger"]');
      await trigger.trigger('click');

      expect(wrapper.vm.active).toBe(true);
      expect(wrapper.emitted('update:open')).toBeTruthy();
    });
  });
});

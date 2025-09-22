import { beforeEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import Chip from '../Chip.vue';

const createWrapper = (props) => {
  return mount(Chip, {
    props,
    global: {
      stubs: {
        UnnnicIcon: true,
      },
    },
  });
};

describe('Chip', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper({ text: 'Test Chip', type: 'single' });
  });

  describe('Basic rendering', () => {
    it('should render the chip with text', () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.text()).toContain('Test Chip');
      expect(wrapper.classes()).toContain('chip');
    });

    it('should render with default unselected state', () => {
      expect(wrapper.classes()).toContain('chip--border');
      expect(wrapper.classes()).not.toContain('chip--is-selected');
    });
  });

  describe('Selection state', () => {
    it('should apply selected styling when isSelected is true', async () => {
      await wrapper.setProps({ isSelected: true });
      
      expect(wrapper.classes()).toContain('chip--is-selected');
      expect(wrapper.classes()).not.toContain('chip--border');
      
      const textElement = wrapper.find('.chip__text');
      expect(textElement.classes()).toContain('chip__text--is-selected');
    });
  });

  describe('Count functionality', () => {
    it('should render count when provided', async () => {
      await wrapper.setProps({ count: 5 });
      
      const countElement = wrapper.find('.chip__count');
      expect(countElement.exists()).toBe(true);
      expect(countElement.text()).toBe('5');
    });

    it('should not render count when not provided or zero', async () => {
      expect(wrapper.find('.chip__count').exists()).toBe(false);
      
      await wrapper.setProps({ count: 0 });
      expect(wrapper.find('.chip__count').exists()).toBe(false);
    });

    it('should apply selected styling to count when chip is selected', async () => {
      await wrapper.setProps({ count: 3, isSelected: true });
      
      const countElement = wrapper.find('.chip__count');
      expect(countElement.classes()).toContain('chip__count--is-selected');
    });
  });

  describe('Type functionality', () => {
    it('should not render icon for single type', () => {
      const icon = wrapper.findComponent({ name: 'UnnnicIcon' });
      expect(icon.exists()).toBe(false);
    });

    it('should render correct icons for multiple type', async () => {
      await wrapper.setProps({ type: 'multiple', isSelected: false });
      
      let icon = wrapper.findComponent({ name: 'UnnnicIcon' });
      expect(icon.exists()).toBe(true);
      expect(icon.props('icon')).toBe('close');
      expect(icon.props('scheme')).toBe('feedback-grey');
      expect(icon.props('size')).toBe('sm');

      await wrapper.setProps({ isSelected: true });
      
      icon = wrapper.findComponent({ name: 'UnnnicIcon' });
      expect(icon.props('icon')).toBe('add');
      expect(icon.props('scheme')).toBe('teal-600');
    });
  });

  describe('Combined functionality', () => {
    it('should render all elements correctly when combined', async () => {
      await wrapper.setProps({ 
        text: 'Complete Chip',
        count: 42,
        type: 'multiple',
        isSelected: true
      });

      expect(wrapper.text()).toContain('Complete Chip');
      expect(wrapper.classes()).toContain('chip--is-selected');
      
      const countElement = wrapper.find('.chip__count');
      expect(countElement.exists()).toBe(true);
      expect(countElement.text()).toBe('42');
      expect(countElement.classes()).toContain('chip__count--is-selected');
      
      const icon = wrapper.findComponent({ name: 'UnnnicIcon' });
      expect(icon.exists()).toBe(true);
      expect(icon.props('icon')).toBe('add');
    });
  });

  describe('Click functionality', () => {
    it('should emit click event when clicked', async () => {
      await wrapper.setProps({ isClickable: true });
      
      await wrapper.trigger('click');
      
      expect(wrapper.emitted().click).toBeTruthy();
      expect(wrapper.emitted().click).toHaveLength(1);
    });

    it('should apply clickable styling when isClickable is true', async () => {
      await wrapper.setProps({ isClickable: true });
      
      expect(wrapper.classes()).toContain('chip--is-clickable');
    });

    it('should not apply clickable styling when isClickable is false', () => {
      expect(wrapper.classes()).not.toContain('chip--is-clickable');
    });

    it('should emit click event even when not marked as clickable', async () => {
      await wrapper.trigger('click');
      
      expect(wrapper.emitted().click).toBeTruthy();
      expect(wrapper.emitted().click).toHaveLength(1);
    });
  });

  describe('Edge cases', () => {
    it('should handle negative count', async () => {
      await wrapper.setProps({ count: -5 });
      
      const countElement = wrapper.find('.chip__count');
      expect(countElement.exists()).toBe(true);
      expect(countElement.text()).toBe('-5');
    });

    it('should handle empty text', async () => {
      await wrapper.setProps({ text: '' });
      
      const textElement = wrapper.find('.chip__text');
      expect(textElement.exists()).toBe(true);
      expect(textElement.text()).toBe('');
    });
  });
});
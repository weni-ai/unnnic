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
    wrapper = createWrapper({ text: 'Test Chip' });
  });

  describe('Basic rendering', () => {
    it('should render the chip with text', () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.text()).toContain('Test Chip');
    });

    it('should render with scheme bg-base', () => {
      expect(wrapper.classes()).toContain('chip--bg-base');
      expect(wrapper.classes()).toContain('chip--border');
    });

    it('should render chip text element', () => {
      const textElement = wrapper.find('.chip__text');
      expect(textElement.exists()).toBe(true);
      expect(textElement.text()).toBe('Test Chip');
    });
  });

  describe('Count functionality', () => {
    it('should render count when provided', async () => {
      await wrapper.setProps({ count: 5 });
      
      const countElement = wrapper.find('.chip__count');
      expect(countElement.exists()).toBe(true);
      expect(countElement.text()).toBe('5');
    });

    it('should not render count when not provided', () => {
      const countElement = wrapper.find('.chip__count');
      expect(countElement.exists()).toBe(false);
    });

    it('should not render count when count is null', async () => {
      await wrapper.setProps({ count: null });
      
      const countElement = wrapper.find('.chip__count');
      expect(countElement.exists()).toBe(false);
    });
  });

  describe('Icon functionality', () => {
    it('should render icon when provided', async () => {
      await wrapper.setProps({ icon: 'search-1' });
      
      const icon = wrapper.findComponent({ name: 'UnnnicIcon' });
      expect(icon.exists()).toBe(true);
      expect(icon.props('icon')).toBe('search-1');
      expect(icon.props('size')).toBe('sm');
    });

    it('should not render icon when not provided', () => {
      const icon = wrapper.findComponent({ name: 'UnnnicIcon' });
      expect(icon.exists()).toBe(false);
    });
  });

  describe('Scheme functionality', () => {
    it('should apply correct scheme class', async () => {
      await wrapper.setProps({ scheme: 'aux-blue' });
      expect(wrapper.classes()).toContain('chip--aux-blue');
    });

    it('should show border for bg-base scheme', async () => {
      await wrapper.setProps({ scheme: 'bg-base' });
      expect(wrapper.classes()).toContain('chip--border');
    });

    it('should show border for bg-soft scheme', async () => {
      await wrapper.setProps({ scheme: 'bg-soft' });
      expect(wrapper.classes()).toContain('chip--border');
    });

    it('should not show border for other schemes', async () => {
      await wrapper.setProps({ scheme: 'aux-blue' });
      expect(wrapper.classes()).not.toContain('chip--border');
    });
  });

  describe('Teal variations', () => {
    const tealVariations = [
      'teal-50', 'teal-100', 'teal-200', 'teal-300', 'teal-400',
      'teal-500', 'teal-600', 'teal-700', 'teal-800', 'teal-900', 'teal-950'
    ];

    tealVariations.forEach((tealScheme) => {
      it(`should apply teal styling for ${tealScheme}`, async () => {
        await wrapper.setProps({ 
          scheme: tealScheme,
          icon: 'check-circle-1-1',
          count: 3
        });

        expect(wrapper.classes()).toContain(`chip--${tealScheme}`);

        const textElement = wrapper.find('.chip__text');
        expect(textElement.classes()).toContain('chip__text--teal');

        const countElement = wrapper.find('.chip__count');
        expect(countElement.classes()).toContain('chip__count--teal');

        const icon = wrapper.findComponent({ name: 'UnnnicIcon' });
        expect(icon.props('scheme')).toBe('weni-600');
      });
    });

    it('should not apply teal styling for non-teal schemes', async () => {
      await wrapper.setProps({ 
        scheme: 'aux-blue',
        icon: 'check-circle-1-1',
        count: 3
      });

      const textElement = wrapper.find('.chip__text');
      expect(textElement.classes()).not.toContain('chip__text--teal');

      const countElement = wrapper.find('.chip__count');
      expect(countElement.classes()).not.toContain('chip__count--teal');

      const icon = wrapper.findComponent({ name: 'UnnnicIcon' });
      expect(icon.props('scheme')).toBe('aux-blue');
    });
  });

  describe('Icon scheme logic', () => {
    it('should use neutral-darkest for bg-base scheme', async () => {
      await wrapper.setProps({ 
        scheme: 'bg-base',
        icon: 'search-1'
      });

      const icon = wrapper.findComponent({ name: 'UnnnicIcon' });
      expect(icon.props('scheme')).toBe('neutral-darkest');
    });

    it('should use neutral-darkest for bg-soft scheme', async () => {
      await wrapper.setProps({ 
        scheme: 'bg-soft',
        icon: 'search-1'
      });

      const icon = wrapper.findComponent({ name: 'UnnnicIcon' });
      expect(icon.props('scheme')).toBe('neutral-darkest');
    });

    it('should use weni-600 for teal variations', async () => {
      await wrapper.setProps({ 
        scheme: 'teal-600',
        icon: 'search-1'
      });

      const icon = wrapper.findComponent({ name: 'UnnnicIcon' });
      expect(icon.props('scheme')).toBe('weni-600');
    });

    it('should use same scheme for other color schemes', async () => {
      await wrapper.setProps({ 
        scheme: 'feedback-green',
        icon: 'search-1'
      });

      const icon = wrapper.findComponent({ name: 'UnnnicIcon' });
      expect(icon.props('scheme')).toBe('feedback-green');
    });
  });

  describe('Combined functionality', () => {
    it('should render chip with text, count, and icon', async () => {
      await wrapper.setProps({ 
        text: 'Complete Chip',
        count: 42,
        icon: 'star-1',
        scheme: 'teal-600'
      });

      expect(wrapper.text()).toContain('Complete Chip');
      
      const countElement = wrapper.find('.chip__count');
      expect(countElement.exists()).toBe(true);
      expect(countElement.text()).toBe('42');
      
      const icon = wrapper.findComponent({ name: 'UnnnicIcon' });
      expect(icon.exists()).toBe(true);
      expect(icon.props('icon')).toBe('star-1');
      
      expect(wrapper.classes()).toContain('chip--teal-600');
    });

    it('should render chip with only text', () => {
      const simpleWrapper = createWrapper({ text: 'Simple Chip' });
      
      expect(simpleWrapper.text()).toContain('Simple Chip');
      expect(simpleWrapper.find('.chip__count').exists()).toBe(false);
      expect(simpleWrapper.findComponent({ name: 'UnnnicIcon' }).exists()).toBe(false);
    });
  });

  describe('Props validation', () => {
    it('should handle empty text prop', async () => {
      await wrapper.setProps({ text: '' });
      
      const textElement = wrapper.find('.chip__text');
      expect(textElement.exists()).toBe(true);
      expect(textElement.text()).toBe('');
    });

    it('should handle zero count', async () => {
      await wrapper.setProps({ count: 0 });
      
      const countElement = wrapper.find('.chip__count');
      expect(countElement.exists()).toBe(false);
    });

    it('should handle negative count', async () => {
      await wrapper.setProps({ count: -5 });
      
      const countElement = wrapper.find('.chip__count');
      expect(countElement.exists()).toBe(true);
      expect(countElement.text()).toBe('-5');
    });
  });

  describe('CSS classes', () => {
    it('should always have base chip class', () => {
      expect(wrapper.classes()).toContain('chip');
    });

    it('should apply multiple classes correctly', async () => {
      await wrapper.setProps({ 
        scheme: 'teal-500',
        count: 10
      });

      expect(wrapper.classes()).toContain('chip');
      expect(wrapper.classes()).toContain('chip--teal-500');
      expect(wrapper.classes()).not.toContain('chip--border');
      
      const textElement = wrapper.find('.chip__text');
      expect(textElement.classes()).toContain('chip__text');
      expect(textElement.classes()).toContain('chip__text--teal');
      
      const countElement = wrapper.find('.chip__count');
      expect(countElement.classes()).toContain('chip__count');
      expect(countElement.classes()).toContain('chip__count--teal');
    });
  });
});

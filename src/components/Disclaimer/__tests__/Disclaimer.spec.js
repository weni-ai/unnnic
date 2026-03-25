import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import Disclaimer from '../Disclaimer.vue';
import Icon from '../../Icon.vue';

const mountComponent = (props = {}, slots = {}) =>
  mount(Disclaimer, {
    props,
    slots,
    global: {
      components: { UnnnicIcon: Icon },
    },
  });

describe('Disclaimer', () => {
  it('hides title when no title is provided', () => {
    const wrapper = mountComponent({ title: '' });

    expect(wrapper.find('[data-testid="disclaimer-title"]').exists()).toBe(
      false,
    );
  });

  it('hides description when no description is provided', () => {
    const wrapper = mountComponent({ description: '' });

    expect(
      wrapper.find('[data-testid="disclaimer-description"]').exists(),
    ).toBe(false);
  });

  describe('description slot', () => {
    it('renders custom content via description slot', () => {
      const wrapper = mountComponent(
        { description: '' },
        {
          description: '<a href="https://example.com">Click here</a>',
        },
      );

      const description = wrapper.find(
        '[data-testid="disclaimer-description"]',
      );

      expect(description.exists()).toBe(true);
      expect(description.find('a').exists()).toBe(true);
      expect(description.find('a').attributes('href')).toBe(
        'https://example.com',
      );
      expect(description.find('a').text()).toBe('Click here');
    });

    it('prioritizes slot content over description prop', () => {
      const wrapper = mountComponent(
        { description: 'Prop description' },
        {
          description: '<span>Slot description</span>',
        },
      );

      const description = wrapper.find(
        '[data-testid="disclaimer-description"]',
      );

      expect(description.text()).toBe('Slot description');
      expect(description.find('span').exists()).toBe(true);
    });

    it('shows description from prop when slot is not provided', () => {
      const wrapper = mountComponent({ description: 'Prop only description' });

      expect(
        wrapper.find('[data-testid="disclaimer-description"]').text(),
      ).toBe('Prop only description');
    });

    it('hides description when neither slot nor prop is provided', () => {
      const wrapper = mountComponent({ description: '' }, {});

      expect(
        wrapper.find('[data-testid="disclaimer-description"]').exists(),
      ).toBe(false);
    });

    it('hides description when empty slot is provided', () => {
      const wrapper = mountComponent({ description: '' }, { description: '' });

      expect(
        wrapper.find('[data-testid="disclaimer-description"]').exists(),
      ).toBe(false);
    });
  });

  it.each([
    ['informational', 'info', 'fg-info'],
    ['success', 'check_circle', 'fg-success'],
    ['attention', 'error', 'fg-warning'],
    ['error', 'cancel', 'fg-critical'],
    ['neutral', 'info', 'fg-muted'],
  ])('applies variant %s styles', (type, icon, scheme) => {
    const wrapper = mountComponent({ type });

    expect(wrapper.classes()).toContain(`unnnic-disclaimer--${type}`);

    const iconComponent = wrapper.findComponent(
      '[data-testid="disclaimer-icon"]',
    );

    expect(iconComponent.props('icon')).toBe(icon);
    expect(iconComponent.props('scheme')).toBe(scheme);
  });

  describe('legacy compatibility', () => {
    it.each([
      ['alert-circle-1-1', 'error', 'fg-warning'],
      ['info', 'info', 'fg-info'],
      ['error', 'cancel', 'fg-critical'],
      ['custom-icon', 'info', 'fg-muted'],
    ])('maps icon prop "%s" to variant', (icon, expectedIcon, scheme) => {
      const wrapper = mountComponent({ icon });

      const iconComponent = wrapper.findComponent(
        '[data-testid="disclaimer-icon"]',
      );

      expect(iconComponent.props('icon')).toBe(expectedIcon);
      expect(iconComponent.props('scheme')).toBe(scheme);
    });

    it.each([
      ['feedback-yellow', 'error', 'fg-warning'],
      ['feedback-red', 'cancel', 'fg-critical'],
      ['feedback-blue', 'info', 'fg-muted'],
    ])(
      'maps iconColor prop "%s" to variant',
      (iconColor, expectedIcon, scheme) => {
        const wrapper = mountComponent({ iconColor });

        const iconComponent = wrapper.findComponent(
          '[data-testid="disclaimer-icon"]',
        );

        expect(iconComponent.props('icon')).toBe(expectedIcon);
        expect(iconComponent.props('scheme')).toBe(scheme);
      },
    );
  });
});

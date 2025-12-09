import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import Disclaimer from '../Disclaimer.vue';
import Icon from '../../Icon.vue';

const mountComponent = (props = {}) =>
  mount(Disclaimer, {
    props,
    global: {
      components: { UnnnicIcon: Icon },
    },
  });

describe('Disclaimer', () => {
  it('renders default title and description', () => {
    const wrapper = mountComponent();

    expect(wrapper.find('[data-testid="disclaimer-title"]').text()).toBe(
      'Disclaimer',
    );
    expect(wrapper.find('[data-testid="disclaimer-description"]').text()).toBe(
      'The quick brown fox jumps over the lazy dog',
    );
  });

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

  it.each([
    ['informational', 'info', 'blue-500'],
    ['success', 'check_circle', 'green-500'],
    ['attention', 'error', 'yellow-500'],
    ['error', 'cancel', 'red-500'],
    ['neutral', 'info', 'gray-400'],
  ])('applies variant %s styles', (type, icon, scheme) => {
    const wrapper = mountComponent({ type });

    expect(wrapper.classes()).toContain(`unnnic-disclaimer--${type}`);

    const iconComponent = wrapper.findComponent(
      '[data-testid="disclaimer-icon"]',
    );

    expect(iconComponent.props('icon')).toBe(icon);
    expect(iconComponent.props('scheme')).toBe(scheme);
  });
});

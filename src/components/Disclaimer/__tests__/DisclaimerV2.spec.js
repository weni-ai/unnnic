import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import DisclaimerV2 from '../DisclaimerV2.vue';
import Icon from '../../Icon.vue';

const mountComponent = (props = {}) =>
  mount(DisclaimerV2, {
    props,
    global: {
      components: { UnnnicIcon: Icon },
    },
  });

describe('DisclaimerV2', () => {
  it('renders default title and description', () => {
    const wrapper = mountComponent();

    expect(wrapper.find('[data-testid="disclaimerv2-title"]').text()).toBe(
      'Disclaimer',
    );
    expect(
      wrapper.find('[data-testid="disclaimerv2-description"]').text(),
    ).toBe('The quick brown fox jumps over the lazy dog');
  });

  it('hides title when showTitle is false', () => {
    const wrapper = mountComponent({ showTitle: false });

    expect(wrapper.find('[data-testid="disclaimerv2-title"]').exists()).toBe(
      false,
    );
  });

  it('hides description when showDescription is false', () => {
    const wrapper = mountComponent({ showDescription: false });

    expect(
      wrapper.find('[data-testid="disclaimerv2-description"]').exists(),
    ).toBe(false);
  });

  it.each([
    ['informational', 'information-circle-4', 'blue-500'],
    ['success', 'check-circle-1-1', 'green-500'],
    ['attention', 'alert-circle-1-1', 'yellow-500'],
    ['error', 'alert-circle-1', 'red-500'],
    ['neutral', 'information-circle-4', 'gray-400'],
  ])('applies variant %s styles', (type, icon, scheme) => {
    const wrapper = mountComponent({ type });

    expect(wrapper.classes()).toContain(`type-${type}`);

    const iconComponent = wrapper.findComponent(
      '[data-testid="disclaimerv2-icon"]',
    );

    expect(iconComponent.props('icon')).toBe(icon);
    expect(iconComponent.props('scheme')).toBe(scheme);
  });
});


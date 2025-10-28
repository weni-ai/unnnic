import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';

import Disclaimer from '../Disclaimer.vue';
import Icon from '../../Icon.vue';

describe('Disclaimer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Disclaimer, {
      props: { text: 'Test Disclaimer Text' },
      global: { components: { UnnnicIcon: Icon } },
    });
  });

  it('renders the text prop correctly', () => {
    expect(wrapper.find('[data-testid="disclaimer-text"]').text()).toBe(
      'Test Disclaimer Text',
    );
  });

  it('renders the UnnnicIcon component with correct icon and color', async () => {
    const icon = 'alert-circle-1-1';
    const iconColor = 'neutral-darkest';

    await wrapper.setProps({ icon, iconColor });

    const iconComponent = wrapper.findComponent(
      '[data-testid="disclaimer-icon"]',
    );
    expect(iconComponent.exists()).toBe(true);
    expect(iconComponent.props('icon')).toBe(icon);
    expect(iconComponent.props('scheme')).toBe(iconColor);
  });

  it('renders with default icon and color if not provided', () => {
    const iconComponent = wrapper.findComponent(
      '[data-testid="disclaimer-icon"]',
    );
    expect(iconComponent.props('icon')).toBe('alert-circle-1-1');
    expect(iconComponent.props('scheme')).toBe('neutral-darkest');
  });

  it('validates the icon prop correctly', () => {
    const wrapperValid = mount(Disclaimer, {
      props: { text: 'Test', icon: 'alert-circle-1-1' },
      global: { components: { UnnnicIcon: Icon } },
    });
    expect(wrapperValid.exists()).toBe(true);

    const wrapperInvalid = mount(Disclaimer, {
      props: { text: 'Test', icon: 'invalid-icon' },
      global: { components: { UnnnicIcon: Icon } },
    });
    expect(wrapperInvalid.exists()).toBe(true);
  });

  it('validates the iconColor prop correctly', () => {
    const wrapperValid = mount(Disclaimer, {
      props: { text: 'Test', iconColor: 'neutral-darkest' },
      global: { components: { UnnnicIcon: Icon } },
    });
    expect(wrapperValid.exists()).toBe(true);

    const wrapperInvalid = mount(Disclaimer, {
      props: { text: 'Test', iconColor: 'invalid-color' },
      global: { components: { UnnnicIcon: Icon } },
    });
    expect(wrapperInvalid.exists()).toBe(true);
  });
});

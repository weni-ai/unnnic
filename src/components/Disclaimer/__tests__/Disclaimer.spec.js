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
    expect(iconComponent.props('icon')).toBe(Disclaimer.props.icon.default);
    expect(iconComponent.props('scheme')).toBe(
      Disclaimer.props.iconColor.default,
    );
  });

  it('validates the icon prop correctly', () => {
    const validator = Disclaimer.props.icon.validator;
    expect(validator('alert-circle-1-1')).toBe(true);
    expect(validator('invalid-icon')).toBe(false);
  });

  it('validates the iconColor prop correctly', () => {
    const validator = Disclaimer.props.iconColor.validator;
    expect(validator('neutral-darkest')).toBe(true);
    expect(validator('invalid-color')).toBe(false);
  });
});

import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import ButtonIcon from '../ButtonIcon.vue';

const mountButtonIcon = (props = {}) =>
  mount(ButtonIcon, {
    props: {
      size: 'large',
      icon: 'search-1',
      ...props,
    },
    global: {
      stubs: {
        UnnnicIcon: {
          props: ['icon', 'scheme', 'size'],
          template:
            '<span data-testid="button-icon" :data-icon="icon" :data-scheme="scheme" />',
        },
      },
    },
  });

describe('ButtonIcon', () => {
  it('renders with primary type icon scheme', () => {
    const wrapper = mountButtonIcon({ type: 'primary' });

    expect(
      wrapper.find('[data-testid="button-icon"]').attributes('data-scheme'),
    ).toBe('fg-inverted');
    expect(wrapper.classes()).toContain('primary');
  });

  it('renders with secondary type icon scheme', () => {
    const wrapper = mountButtonIcon({ type: 'secondary' });

    expect(
      wrapper.find('[data-testid="button-icon"]').attributes('data-scheme'),
    ).toBe('fg-emphasized');
    expect(wrapper.classes()).toContain('secondary');
  });

  it('applies size class', () => {
    const wrapper = mountButtonIcon({ size: 'small' });

    expect(wrapper.classes()).toContain('small');
  });

  it('rejects invalid size prop in validator', () => {
    const { validator } = ButtonIcon.props.size;

    expect(validator('large')).toBe(true);
    expect(validator('small')).toBe(true);
    expect(validator('invalid')).toBe(false);
  });
});

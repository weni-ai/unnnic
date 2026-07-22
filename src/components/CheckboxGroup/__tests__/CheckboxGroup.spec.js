import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import CheckboxGroup from '../CheckboxGroup.vue';

const mountCheckboxGroup = (props = {}, slots = {}) =>
  mount(CheckboxGroup, {
    props,
    slots: {
      default: '<input type="checkbox" data-testid="checkbox-slot" />',
      ...slots,
    },
    global: {
      stubs: {
        UnnnicLabel: {
          props: ['label', 'tooltip'],
          template:
            '<label data-testid="checkbox-group-label">{{ label }}</label>',
        },
      },
    },
  });

describe('CheckboxGroup', () => {
  it('renders slot content', () => {
    const wrapper = mountCheckboxGroup();

    expect(wrapper.find('[data-testid="checkbox-slot"]').exists()).toBe(true);
  });

  it('renders label when provided', () => {
    const wrapper = mountCheckboxGroup({ label: 'Group label' });

    expect(wrapper.find('[data-testid="checkbox-group-label"]').text()).toBe(
      'Group label',
    );
  });

  it('renders helper text when provided', () => {
    const wrapper = mountCheckboxGroup({ helper: 'Helper text' });

    expect(wrapper.find('.unnnic-checkbox-group__helper').text()).toBe(
      'Helper text',
    );
  });

  it('applies horizontal state class by default', () => {
    const wrapper = mountCheckboxGroup();

    expect(wrapper.classes()).toContain(
      'unnnic-checkbox-group--state-horizontal',
    );
  });

  it('applies vertical state class', () => {
    const wrapper = mountCheckboxGroup({ state: 'vertical' });

    expect(wrapper.classes()).toContain(
      'unnnic-checkbox-group--state-vertical',
    );
  });
});

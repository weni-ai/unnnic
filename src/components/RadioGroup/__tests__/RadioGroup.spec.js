import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import RadioGroup from '../RadioGroup.vue';
import Radio from '../../Radio/Radio.vue';

const mountRadioGroup = (props = {}, slots = {}) =>
  mount(RadioGroup, {
    props: {
      modelValue: '',
      ...props,
    },
    slots: {
      default: `
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      `,
      ...slots,
    },
    global: {
      components: { Radio },
      stubs: {
        UnnnicLabel: {
          props: ['label', 'tooltip'],
          template:
            '<label data-testid="radio-group-label">{{ label }}</label>',
        },
      },
    },
  });

describe('RadioGroup', () => {
  it('renders radios in slot', () => {
    const wrapper = mountRadioGroup();

    expect(wrapper.findAllComponents(Radio).length).toBe(2);
  });

  it('renders label and helper when provided', () => {
    const wrapper = mountRadioGroup({
      label: 'Choose one',
      helper: 'Select an option',
    });

    expect(wrapper.find('[data-testid="radio-group-label"]').text()).toBe(
      'Choose one',
    );
    expect(wrapper.find('.unnnic-radio-group__helper').text()).toBe(
      'Select an option',
    );
  });

  it('emits update:modelValue when a radio is selected', async () => {
    const wrapper = mountRadioGroup();

    await wrapper.findAll('input[type="radio"]')[0].trigger('change');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['a']);
  });

  it('syncs modelValue from parent', async () => {
    const wrapper = mountRadioGroup({ modelValue: 'b' });

    await wrapper.setProps({ modelValue: 'a' });

    const inputs = wrapper.findAll('input[type="radio"]');
    expect(inputs[0].element.checked).toBe(true);
  });

  it('does not emit when modelValue is already in sync', async () => {
    const wrapper = mountRadioGroup({ modelValue: 'a' });

    await wrapper.setProps({ modelValue: 'a' });

    expect(wrapper.emitted('update:modelValue') ?? []).toHaveLength(0);
  });

  it('uses custom name when provided', () => {
    const wrapper = mountRadioGroup({ name: 'custom-group' });

    expect(wrapper.find('input[type="radio"]').attributes('name')).toBe(
      'custom-group',
    );
  });

  it('generates a random group name when name is not provided', () => {
    const wrapper = mountRadioGroup();

    expect(wrapper.find('input[type="radio"]').attributes('name')).toMatch(
      /^unnnic-radio-group-/,
    );
  });

  it('applies vertical state class', () => {
    const wrapper = mountRadioGroup({ state: 'vertical' });

    expect(wrapper.classes()).toContain('unnnic-radio-group--state-vertical');
  });
});

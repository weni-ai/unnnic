import { mount } from '@vue/test-utils';
import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import Radio from '@/components/Radio/Radio.vue';
import UnnnicIcon from '@/components/Icon.vue';

describe('Radio.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Radio, {
      props: {
        modelValue: '',
        value: 'option1',
        disabled: false,
        size: 'md',
      },
      global: {
        components: {
          UnnnicIcon,
        },
      },
      slots: {
        default: 'Option 1',
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('renders input with correct attributes', () => {
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes('type')).toBe('radio');
    expect(input.attributes('disabled')).toBe(undefined);
    expect(input.attributes('checked')).toBe(undefined);
  });

  test('applies disabled class when disabled prop is true', async () => {
    await wrapper.setProps({ disabled: true });
    expect(wrapper.find('.unnnic-radio__label').classes()).toContain('unnnic-radio__label--disabled');
  });

  test('icon changes based on valueName', async () => {
    await wrapper.setProps({ modelValue: 'option1' });
    const input = wrapper.find('input');
    expect(input.attributes()).toHaveProperty('checked');
  });

  test('icon and color change when disabled is true', async () => {
    await wrapper.setProps({ disabled: true });
    const input = wrapper.find('input');
    expect(input.attributes()).toHaveProperty('disabled');
  });

  test('emits update:modelValue with correct value when clicked and not disabled', async () => {
    await wrapper.find('input').trigger('change');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['option1']);
  });

  test('does not emit update:modelValue when clicked and disabled', async () => {
    await wrapper.setProps({ disabled: true });
    await wrapper.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  test('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

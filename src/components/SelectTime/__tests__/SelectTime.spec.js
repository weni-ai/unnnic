import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SelectTime from '../index.vue';

function mountSelectTime(props = {}) {
  return mount(SelectTime, {
    props: {
      modelValue: '',
      ...props,
    },
  });
}

describe('SelectTime', () => {
  it('uses a native time input when enable24hTime is off', () => {
    const wrapper = mountSelectTime({ modelValue: '24:00' });
    const input = wrapper.find('input');

    expect(input.attributes('type')).toBe('time');
    expect(wrapper.text()).not.toContain('24:00');
  });

  it('clears 24:00 on blur when enable24hTime is off', () => {
    const wrapper = mountSelectTime({ modelValue: '24:00' });

    wrapper.vm.handleBlur();

    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['']);
  });

  describe('enable24hTime', () => {
    it('renders 24:00 in a text input and lists it as an option', () => {
      const wrapper = mountSelectTime({
        modelValue: '24:00',
        enable24hTime: true,
      });
      const input = wrapper.find('input');

      expect(input.attributes('type')).toBe('text');
      expect(input.element.value).toBe('24:00');
      expect(wrapper.text()).toContain('24:00');
    });

    it('keeps 24:00 on blur', () => {
      const wrapper = mountSelectTime({
        modelValue: '24:00',
        enable24hTime: true,
      });

      wrapper.vm.handleBlur();

      expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['24:00']);
    });

    it('formats 2400 as 24:00', () => {
      const wrapper = mountSelectTime({
        modelValue: '2400',
        enable24hTime: true,
      });

      wrapper.vm.handleBlur();

      expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['24:00']);
    });

    it('formats 24 as 24:00', () => {
      const wrapper = mountSelectTime({
        modelValue: '24',
        enable24hTime: true,
      });

      wrapper.vm.handleBlur();

      expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['24:00']);
    });

    it('clears 24:30 because only 24:00 is valid past 23:59', () => {
      const wrapper = mountSelectTime({
        modelValue: '24:30',
        enable24hTime: true,
      });

      wrapper.vm.handleBlur();

      expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['']);
    });
  });
});

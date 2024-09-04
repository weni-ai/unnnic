import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, afterEach, test, vi } from 'vitest';
import BaseInput from '@/components/Input/BaseInput.vue';
import { mask } from 'vue-the-mask';

describe('BaseInput.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(BaseInput, {
      props: {
        type: 'normal',
        modelValue: '',
        nativeType: 'text',
        size: 'md',
        mask: '',
      },
      global: {
        directives: {
          mask,
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('applies the correct classes', async () => {
    expect(wrapper.classes()).toContain('input');
    expect(wrapper.classes()).toContain('size-md');
    expect(wrapper.classes()).toContain('normal');

    await wrapper.setProps({ type: 'error', size: 'sm' });
    expect(wrapper.classes()).toContain('size-sm');
    expect(wrapper.classes()).toContain('error');
  });

  test('renders input element with correct attributes and value', async () => {
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes('type')).toBe('text');
    expect(input.element.value).toBe('');

    await wrapper.setProps({
      modelValue: 'test value',
      nativeType: 'password',
    });
    expect(input.element.value).toBe('test value');
    expect(input.attributes('type')).toBe('password');
  });

  test('emits update:modelValue on input', async () => {
    const input = wrapper.find('input');
    await input.setValue('new value');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new value']);
  });

  test('applies the correct mask if provided', async () => {
    const maskedWrapper = mount(BaseInput, {
      props: {
        mask: '####-####',
        modelValue: '12345678',
      },
    });

    const input = maskedWrapper.find('input');

    expect(input.element.value).toBe('1234-5678');

    maskedWrapper.unmount();
  });

  test('does not apply mask if mask prop is empty', () => {
    const input = wrapper.find('input');
    expect(input.attributes('v-mask')).toBeUndefined();
  });

  test('focuses on input when focus method is called', () => {
    const input = wrapper.find('input');
    const focusSpy = vi.spyOn(input.element, 'focus');

    input.element.focus();

    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  test('updates the attributes computed property correctly', async () => {
    await wrapper.setProps({ placeholder: 'Enter text', disabled: true });
    const attributes = wrapper.vm.attributes;

    expect(attributes.placeholder).toBe('Enter text');
    expect(attributes.disabled).toBe(true);
  });

  test('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

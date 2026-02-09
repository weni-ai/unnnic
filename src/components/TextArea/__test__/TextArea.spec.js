import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, afterEach, test, vi } from 'vitest';
import TextArea from '@/components/TextArea/TextArea.vue';

describe('TextArea.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TextArea, {
      props: {
        label: 'Description',
        placeholder: 'Enter text',
        modelValue: '',
        maxLength: 200,
        disabled: false,
        type: 'normal',
        size: 'md',
        errors: [],
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('renders label when provided', () => {
    expect(
      wrapper.findComponent({ name: 'UnnnicFormElement' }).props('label'),
    ).toBe('Description');
  });

  test('renders textarea with correct props', () => {
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('placeholder')).toBe('Enter text');
    expect(textarea.attributes('maxlength')).toBe('200');
    expect(textarea.element.disabled).toBe(false);
  });

  test('renders character count when maxLength and type are normal', () => {
    expect(wrapper.text()).contains('0/200');
  });

  test('does not render character count when maxLength is not provided', async () => {
    await wrapper.setProps({ maxLength: null });
    const helper = wrapper.find('.helper');
    expect(helper.exists()).toBe(false);
  });

  test('emits update:modelValue on input', async () => {
    const textarea = wrapper.find('textarea');
    await textarea.setValue('new text');
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new text']);
  });

  test('displays errors when type is error', async () => {
    await wrapper.setProps({ type: 'error', errors: ['Error 1', 'Error 2'] });
    expect(
      wrapper.findComponent({ name: 'UnnnicFormElement' }).props('error'),
    ).toBe('Error 1, Error 2');
  });

  test('applies disabled class and disables textarea when disabled is true', async () => {
    await wrapper.setProps({ disabled: true });
    expect(
      wrapper.findComponent({ name: 'UnnnicFormElement' }).props('disabled'),
    ).toBe(true);
    const textarea = wrapper.find('textarea');
    expect(textarea.element.disabled).toBe(true);
  });

  test('applies the correct size class', async () => {
    await wrapper.setProps({ size: 'sm' });
    expect(wrapper.find('textarea').classes()).toContain(
      'unnnic-text-area__textarea--size-sm',
    );
  });

  test('focus method focuses the textarea element', () => {
    const textarea = wrapper.find('textarea');
    const focusSpy = vi.spyOn(textarea.element, 'focus');
    wrapper.vm.focus();
    expect(focusSpy).toHaveBeenCalled();
  });

  test('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('does not render character count when type is error', async () => {
    await wrapper.setProps({ type: 'error' });
    const helper = wrapper.find('.helper');
    expect(helper.exists()).toBe(false);
  });

  test('updates character count on input when maxLength is provided', async () => {
    await wrapper.setProps({ modelValue: 'Hello' });
    expect(wrapper.text()).contains('5/200');
  });

  test('does not render label when not provided', async () => {
    await wrapper.setProps({ label: null });
    const label = wrapper.find('.label');
    expect(label.exists()).toBe(false);
  });

  test('applies correct class when type is "error"', async () => {
    await wrapper.setProps({ type: 'error' });
    expect(wrapper.find('textarea').classes()).toContain(
      'unnnic-text-area__textarea--type-error',
    );
  });

  test('does not emit input when disabled', async () => {
    await wrapper.setProps({ disabled: true });
    const textarea = wrapper.find('textarea');
    await textarea.setValue('new text');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  test('focuses correctly when in error state', async () => {
    await wrapper.setProps({ type: 'error' });
    const textarea = wrapper.find('textarea');
    const focusSpy = vi.spyOn(textarea.element, 'focus');
    wrapper.vm.focus();
    expect(focusSpy).toHaveBeenCalled();
  });

  test('applies correct class when size is "sm"', async () => {
    await wrapper.setProps({ size: 'sm' });
    expect(wrapper.find('textarea').classes()).toContain(
      'unnnic-text-area__textarea--size-sm',
    );
  });

  test('applies correct class when size is "md"', () => {
    expect(wrapper.find('textarea').classes()).toContain(
      'unnnic-text-area__textarea--size-md',
    );
  });

  test('renders placeholder correctly', () => {
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('placeholder')).toBe('Enter text');
  });

  test('renders maxLength attribute correctly', () => {
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('maxlength')).toBe('200');
  });

  test('does not render maxLength attribute when not provided', async () => {
    await wrapper.setProps({ maxLength: undefined });
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('maxlength')).toBeUndefined();
  });

  test('emits update:modelValue with correct value on input', async () => {
    const textarea = wrapper.find('textarea');
    await textarea.setValue('New value');
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['New value']);
  });

  test('does not emit update:modelValue when disabled', async () => {
    await wrapper.setProps({ disabled: true });
    const textarea = wrapper.find('textarea');
    await textarea.setValue('New value');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  test('renders all error messages when type is error', async () => {
    const errors = ['Error 1', 'Error 2', 'Error 3'];
    await wrapper.setProps({ type: 'error', errors });
    const formElement = wrapper.findComponent({ name: 'UnnnicFormElement' });
    expect(formElement.props('error')).toBe('Error 1, Error 2, Error 3');
  });

  test('does not render error list when type is normal', () => {
    const errorList = wrapper.find('.error-list');
    expect(errorList.exists()).toBe(false);
  });

  test('updates character count correctly', async () => {
    await wrapper.setProps({ modelValue: 'Hello, world!' });
    expect(wrapper.text()).contains('13/200');
  });

  test('focus method focuses the textarea', async () => {
    const textarea = wrapper.find('textarea');
    const focusSpy = vi.spyOn(textarea.element, 'focus');
    wrapper.vm.focus();
    expect(focusSpy).toHaveBeenCalled();
  });
});

import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, afterEach, test } from 'vitest';
import Input from '@/components/Input/Input.vue';
import TextInput from '@/components/Input/TextInput.vue';

describe('Input.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Input, {
      props: {
        placeholder: 'Enter text',
        type: 'normal',
        modelValue: '',
        nativeType: 'text',
        label: 'Sample Label',
        message: 'Error message',
        iconLeft: 'search',
        iconRight: 'clear',
        iconLeftClickable: true,
        iconRightClickable: true,
        allowTogglePassword: false,
        hasCloudyColor: false,
        size: 'md',
        mask: '####-####',
      },
      global: {
        components: {
          TextInput,
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

  test('renders label correctly', async () => {
    const label = wrapper.find('.unnnic-form__label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Sample Label');

    await wrapper.setProps({ label: null });
    expect(wrapper.find('.unnnic-form__label').exists()).toBe(false);
  });

  test('renders message correctly', async () => {
    const message = wrapper.find('.unnnic-form__message');
    expect(message.exists()).toBe(true);
    expect(message.text()).toBe('Error message');

    await wrapper.setProps({ message: null });
    expect(wrapper.find('.unnnic-form__message').exists()).toBe(false);
  });

  test('applies the correct size class', async () => {
    expect(wrapper.classes()).toContain('md');

    await wrapper.setProps({ size: 'sm' });
    expect(wrapper.classes()).toContain('sm');
  });

  test('renders TextInput component', () => {
    const textInput = wrapper.findComponent(TextInput);
    expect(textInput.exists()).toBe(true);
  });

  test('emits update:modelValue when val changes', async () => {
    const textInput = wrapper.findComponent(TextInput);
    await textInput.setValue('new value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new value']);
  });

  test('watch modelValue updates val', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'initial value',
      },
      global: {
        components: {
          TextInput,
        },
      },
    });

    // Verifique o valor inicial de `val`
    expect(wrapper.vm.val).toBe('initial value');

    // Atualize a prop `modelValue`
    await wrapper.setProps({ modelValue: 'new value' });

    // Verifique se `val` foi atualizado corretamente
    expect(wrapper.vm.val).toBe('new value');
  });

  test('hasLabelSlot computed property works correctly', async () => {
    expect(wrapper.vm.hasLabelSlot).toBe(false);

    wrapper = mount(Input, {
      slots: {
        label: '<span>Custom Label</span>',
      },
    });

    expect(wrapper.vm.hasLabelSlot).toBe(true);
  });

  test('correctly mounts with initial modelValue', async () => {
    wrapper = mount(Input, {
      props: {
        modelValue: 'initial value',
      },
    });
    expect(wrapper.vm.val).toBe('initial value');
  });

  test('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

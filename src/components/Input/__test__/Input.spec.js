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

  test('renders form element correctly', async () => {
    const formElement = wrapper.findComponent('[data-testid="form-element"]');
    expect(formElement.exists()).toBe(true);
    expect(formElement.props('label')).toBe('Sample Label');
    expect(formElement.props('size')).toBe('md');
    expect(formElement.props('message')).toBe('Error message');
    expect(formElement.props('disabled')).toBe(false);
    expect(formElement.props('tooltip')).toBe('');
    expect(formElement.props('error')).toBe(false);
  });

  test('renders maxlength counter correctly', async () => {
    expect(wrapper.text()).not.toContain('0 / 10');
    await wrapper.setProps({ maxlength: 10, showMaxlengthCounter: true });
    expect(wrapper.text()).toContain('0 / 10');
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

    expect(wrapper.vm.val).toBe('initial value');

    await wrapper.setProps({ modelValue: 'new value' });

    expect(wrapper.vm.val).toBe('new value');
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

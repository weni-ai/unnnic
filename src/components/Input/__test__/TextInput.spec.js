import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, afterEach, test, vi } from 'vitest';
import TextInput from '@/components/Input/TextInput.vue';
import BaseInput from '@/components/Input/BaseInput.vue';
import UnnnicIcon from '@/components/Icon.vue';

describe('TextInput.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TextInput, {
      props: {
        placeholder: 'Enter text',
        type: 'normal',
        modelValue: '',
        nativeType: 'text',
        iconLeft: 'search',
        iconRight: 'clear',
        iconLeftClickable: true,
        iconRightClickable: true,
        allowTogglePassword: false,
        size: 'md',
      },
      global: {
        components: {
          BaseInput,
          UnnnicIcon,
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

  test('renders BaseInput component', () => {
    const baseInput = wrapper.findComponent(BaseInput);
    expect(baseInput.exists()).toBe(true);
  });

  test('renders UnnnicIcon components when icons are provided', () => {
    const iconLeft = wrapper.find('.icon-left');
    const iconRight = wrapper.find('.icon-right');
    expect(iconLeft.exists()).toBe(true);
    expect(iconRight.exists()).toBe(true);
  });

  test('does not render UnnnicIcon components when icons are not provided', async () => {
    await wrapper.setProps({ iconLeft: null, iconRight: null });
    const iconLeft = wrapper.find('.icon-left');
    const iconRight = wrapper.find('.icon-right');
    expect(iconLeft.exists()).toBe(false);
    expect(iconRight.exists()).toBe(false);
  });

  test('applies the correct size class', async () => {
    await wrapper.setProps({ size: 'sm' });
    expect(wrapper.classes()).toContain('size--sm');
  });

  test('computes the correct iconRightSvg when allowTogglePassword is true', async () => {
    await wrapper.setProps({ allowTogglePassword: true });
    expect(wrapper.vm.iconRightSvg).toBe('view-1-1');

    await wrapper.setData({ showPassword: true });
    expect(wrapper.vm.iconRightSvg).toBe('view-off-1');
  });

  test('computes the correct iconScheme based on various states', async () => {
    await wrapper.setProps({ type: 'error' });
    expect(wrapper.vm.iconScheme).toBe('fg-base');

    await wrapper.setProps({ type: 'normal' });
    await wrapper.setData({ isDisabled: true });
    expect(wrapper.vm.iconScheme).toBe('fg-base');

    await wrapper.setData({ isDisabled: false });
    await wrapper.setProps({ modelValue: 'text' });
    expect(wrapper.vm.iconScheme).toBe('fg-base');

    await wrapper.setData({ isFocused: true });
    expect(wrapper.vm.iconScheme).toBe('fg-base');

    await wrapper.setProps({ disabled: true });
    expect(wrapper.vm.iconScheme).toBe('fg-muted');
  });

  test('attributes computed property returns combined attributes and props', () => {
    const attributes = wrapper.vm.attributes;
    expect(attributes.placeholder).toBe('Enter text');
    expect(attributes.type).toBe('normal');
    expect(attributes.nativeType).toBe('text');
  });

  test('toggles password visibility when allowTogglePassword is true', async () => {
    await wrapper.setProps({
      nativeType: 'password',
      allowTogglePassword: true,
    });
    expect(wrapper.vm.nativeType).toBe('password');

    await wrapper.find('.icon-right').trigger('click');
    expect(wrapper.vm.showPassword).toBe(true);
    expect(
      wrapper.findComponent({ name: 'BaseInput' }).attributes('type'),
    ).toBe('text');

    await wrapper.find('.icon-right').trigger('click');
    expect(wrapper.vm.showPassword).toBe(false);
    expect(wrapper.vm.nativeType).toBe('password');
  });

  test('emits icon-left-click when left icon is clicked and clickable', async () => {
    const iconLeft = wrapper.find('.icon-left');
    await iconLeft.trigger('click');
    expect(wrapper.emitted('icon-left-click')).toBeTruthy();
  });

  test('emits icon-right-click when right icon is clicked and clickable', async () => {
    const iconRight = wrapper.find('.icon-right');
    await iconRight.trigger('click');
    expect(wrapper.emitted('icon-right-click')).toBeTruthy();
  });

  test('focus method calls focus on base input element', () => {
    const focusSpy = vi.spyOn(wrapper.vm.$refs['base-input'].$el, 'focus');
    wrapper.vm.focus();

    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  test('onFocus method sets isFocused to true', async () => {
    expect(wrapper.vm.isFocused).toBe(false);

    wrapper.vm.onFocus();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isFocused).toBe(true);
  });

  test('onBlur method sets isFocused to false', async () => {
    wrapper.setData({ isFocused: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isFocused).toBe(true);

    wrapper.vm.onBlur();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isFocused).toBe(false);
  });

  test('UnnnicIcon clickable prop is correctly set based on iconRightClickable and allowTogglePassword', async () => {
    await wrapper.setProps({
      iconRightClickable: true,
      allowTogglePassword: false,
    });
    expect(wrapper.findAllComponents(UnnnicIcon)[1].props('clickable')).toBe(
      true,
    );

    await wrapper.setProps({
      iconRightClickable: false,
      allowTogglePassword: true,
    });
    expect(wrapper.findAllComponents(UnnnicIcon)[1].props('clickable')).toBe(
      true,
    );

    await wrapper.setProps({
      iconRightClickable: false,
      allowTogglePassword: false,
    });

    expect(wrapper.findAllComponents(UnnnicIcon)[1].props('clickable')).toBe(
      false,
    );

    await wrapper.setProps({
      iconRightClickable: true,
      allowTogglePassword: true,
    });
    expect(wrapper.findAllComponents(UnnnicIcon)[1].props('clickable')).toBe(
      true,
    );
  });

  test('onIconRightClick method does nothing if the input is disabled', async () => {
    await wrapper.setData({ attributes: { disabled: true } });

    const iconRightClickSpy = vi.spyOn(wrapper.vm, 'onIconRightClick');

    wrapper.vm.onIconRightClick();

    expect(iconRightClickSpy).toHaveBeenCalled();
    expect(wrapper.vm.showPassword).toBe(false);

    iconRightClickSpy.mockRestore();
  });

  test('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

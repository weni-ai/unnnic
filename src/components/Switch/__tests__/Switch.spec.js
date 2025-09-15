import { beforeEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import Switch from '../Switch.vue';

const createWrapper = (props) => {
  return mount(Switch, { props });
};

describe('Switch', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper({ modelValue: false });
  });
  it('should render the component correctly with default props', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'UnnnicIcon' }).exists()).toBe(true);
    expect(wrapper.text()).toBe('');
  });

  it('should render the left text (textLeft) when provided', async () => {
    await wrapper.setProps({ textLeft: 'Left Text' });

    // This check ensures that the icon is placed before the switch text
    const switchChildren = wrapper.findComponent(Switch).element.children;
    expect(switchChildren[0].getAttribute('data-test-id')).toBe(
      'switch-text-left',
    );
    expect(switchChildren[1].getAttribute('data-test-id')).toBe('switch-icon');
  });

  it('should render the right text (textRight) when provided', async () => {
    await wrapper.setProps({ textRight: 'Right Text' });

    // This check ensures that the icon is placed after the switch text
    const switchChildren = wrapper.findComponent(Switch).element.children;
    expect(switchChildren[0].getAttribute('data-test-id')).toBe('switch-icon');
    expect(switchChildren[1].getAttribute('data-test-id')).toBe(
      'switch-text-right',
    );
  });

  it('should render the correct icon when the switch is disabled/enabled', async () => {
    await wrapper.setProps({ disabled: true });
    const disabledIconComponent = wrapper.findComponent({ name: 'UnnnicIcon' });
    expect(disabledIconComponent.props('icon')).toBe('switch-default-disabled');

    await wrapper.setProps({ modelValue: true });
    const enabledIconComponent = wrapper.findComponent({ name: 'UnnnicIcon' });
    expect(enabledIconComponent.props('icon')).toBe('switch-selected-disabled');
  });

  it('should render the correct icon based on the isActive state', async () => {
    expect(wrapper.vm.isActive).toBe(false);
    await wrapper.setProps({ modelValue: true });
    expect(wrapper.vm.isActive).toBe(true);
    expect(wrapper.findComponent({ name: 'UnnnicIcon' }).props('icon')).toBe(
      'switch-default',
    );
  });

  it('should render the correct icon size based on the size prop', async () => {
    await wrapper.setProps({ size: 'small' });
    expect(wrapper.findComponent({ name: 'UnnnicIcon' }).props('size')).toBe('sm');

    await wrapper.setProps({ size: 'medium' });
    expect(wrapper.findComponent({ name: 'UnnnicIcon' }).props('size')).toBe('md');
  });

  it('should change the icon color based on the state', async () => {
    expect(wrapper.findComponent({ name: 'UnnnicIcon' }).props('scheme')).toBe(
      'neutral-soft',
    );

    await wrapper.setProps({ modelValue: true });
    expect(wrapper.findComponent({ name: 'UnnnicIcon' }).props('scheme')).toBe(
      'brand-weni',
    );

    await wrapper.setProps({ disabled: true });
    expect(wrapper.findComponent({ name: 'UnnnicIcon' }).props('scheme')).toBe(
      'neutral-soft',
    );
  });

  it('should toggle isActive state and emit the correct event when toggleState is called', async () => {
    const initialIsActive = wrapper.vm.isActive;
    const switchIcon = wrapper.findComponent('[ data-test-id="switch-icon"]');
    await switchIcon.trigger('click');
    expect(wrapper.emitted('update:model-value')).toBeTruthy();
    expect(wrapper.vm.isActive).toBe(!initialIsActive);
  });

  it('should not change state when disabled is true', async () => {
    await wrapper.setProps({ disabled: true });
    const switchIcon = wrapper.findComponent('[ data-test-id="switch-icon"]');
    await switchIcon.trigger('click');
    expect(wrapper.emitted('update:model-value')).toBeFalsy();
    expect(wrapper.vm.isActive).toBe(false);
  });

  it('should update isActive state when modelValue changes', async () => {
    expect(wrapper.vm.isActive).toBe(false);

    await wrapper.setProps({ modelValue: true });
    expect(wrapper.vm.isActive).toBe(true);
  });

  it('should correctly use v-model to manage the isActive state', async () => {
    await wrapper.setProps({ useVModel: true });
    await wrapper.vm.toggleState();
    expect(wrapper.emitted('update:model-value')[0]).toEqual([true]);
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

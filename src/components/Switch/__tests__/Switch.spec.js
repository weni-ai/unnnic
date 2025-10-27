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

  it('should render the option when provided', async () => {
    await wrapper.setProps({ option: 'Option Text' });

    const switchOption = wrapper.find('[data-testid="switch-option"]');
    expect(switchOption.text()).toBe('Option Text');
  });

  it('should toggle isActive state and emit the correct event when toggleState is called', async () => {
    const initialIsActive = wrapper.vm.isActive;
    const switchInput = wrapper.find('input[type="checkbox"]');
    await switchInput.trigger('change');
    expect(wrapper.emitted('update:model-value')).toBeTruthy();
    expect(wrapper.vm.isActive).toBe(!initialIsActive);
  });

  it('should not change state when disabled is true', async () => {
    await wrapper.setProps({ disabled: true });
    const switchInput = wrapper.find('input[type="checkbox"]');
    await switchInput.trigger('change');
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

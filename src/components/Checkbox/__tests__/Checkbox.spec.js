import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import Checkbox from '../Checkbox.vue';

const createWrapper = (props) => {
  return mount(Checkbox, {
    props,
  });
};

describe('Checkbox', () => {
  it('should render right label', () => {
    const wrapper = createWrapper({ textRight: 'Label Test' });
    const label = wrapper.find('.unnnic-checkbox__label__right');
    expect(label.text()).eq('Label Test');

    wrapper.unmount();
  });

  it('should checkbox emit change events', async () => {
    const wrapper = createWrapper();
    const checkbox = wrapper.findComponent({ name: 'Icon' });

    // click false to true
    await checkbox.trigger('click');
    expect(wrapper.emitted('change')[0][0]).eq(true);

    // click true to false
    await wrapper.setProps({ modelValue: true });
    await checkbox.trigger('click');
    expect(wrapper.emitted('change')[1][0]).eq(false);

    // click less to false
    await wrapper.setProps({ modelValue: 'less' });
    expect(wrapper.vm.icon).eq('checkbox-less');
    await checkbox.trigger('click');
    expect(wrapper.emitted('change')[2][0]).eq(false);
    wrapper.unmount();
  });

  it('should checkbox disabled', async () => {
    const wrapper = createWrapper({ disabled: true });
    const checkbox = wrapper.findComponent({ name: 'Icon' });
    await checkbox.trigger('click');
    expect(wrapper.emitted('change')).eq(undefined);

    wrapper.unmount();
  });

  it('should define sizes', async () => {
    const wrapper = createWrapper({ size: 'sm', textRight: 'Label' });
    const checkbox = wrapper.findComponent({ name: 'Icon' });
    const label = wrapper.find('.unnnic-checkbox__label');

    // sm
    expect(checkbox.classes()).include('unnnic-icon__size--sm');
    expect(label.classes()).include('unnnic-checkbox__label__sm');

    // md
    await wrapper.setProps({ size: 'md' });
    expect(checkbox.classes()).include('unnnic-icon__size--md');
    expect(label.classes()).include('unnnic-checkbox__label__md');
  });
});

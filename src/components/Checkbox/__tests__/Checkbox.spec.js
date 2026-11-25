import { afterEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import Checkbox from '../Checkbox.vue';

const createWrapper = (props) => {
  return mount(Checkbox, {
    props,
  });
};

describe('Checkbox', () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render right label', () => {
    wrapper = createWrapper({ textRight: 'Label Test' });
    const label = wrapper.find('[data-testid="checkbox-text-right"]');
    expect(label.text()).eq('Label Test');
  });

  it('should render the label slot inside the label instead of the text', () => {
    wrapper = mount(Checkbox, {
      props: { label: 'Ignored' },
      slots: { label: '<b class="custom">Custom</b>' },
    });

    expect(
      wrapper.find('label .unnnic-checkbox__label-slot .custom').text(),
    ).eq('Custom');
    expect(wrapper.find('.unnnic-checkbox__label').exists()).toBe(false);
  });

  it('should emit when the label slot content is clicked', async () => {
    // Label activation (click on a descendant toggling the input) only runs
    // for elements connected to the document.
    wrapper = mount(Checkbox, {
      attachTo: document.body,
      slots: { label: '<b class="custom">Custom</b>' },
    });

    await wrapper.find('.custom').trigger('click');

    expect(wrapper.emitted('update:model-value')[0]).toEqual([true]);
  });

  it('should checkbox emit change events', async () => {
    wrapper = createWrapper();
    const checkbox = wrapper.find('input[type="checkbox"]');

    // click false to true
    await checkbox.trigger('change');
    expect(wrapper.emitted('change')[0][0]).eq(true);

    // click true to false
    await wrapper.setProps({ modelValue: true });
    await checkbox.trigger('change');
    expect(wrapper.emitted('change')[1][0]).eq(false);

    // click less to false
    await wrapper.setProps({ modelValue: 'less' });
    expect(wrapper.vm.valueName).eq('less');
    await checkbox.trigger('change');
    expect(wrapper.emitted('change')[2][0]).eq(false);
  });

  it('should checkbox disabled', async () => {
    wrapper = createWrapper({ disabled: true });
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.trigger('click');
    expect(wrapper.emitted('change')).eq(undefined);
  });

  it('should render helper text', () => {
    wrapper = createWrapper({ helper: 'Helper message' });
    expect(wrapper.find('.unnnic-checkbox__helper').text()).toBe(
      'Helper message',
    );
  });

  it('should render label prop', () => {
    wrapper = createWrapper({ label: 'Checkbox label' });
    expect(wrapper.find('[data-testid="checkbox-text-right"]').text()).toBe(
      'Checkbox label',
    );
  });
});

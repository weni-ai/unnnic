import { mount } from '@vue/test-utils';
import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import Radio from '@/components/Radio/Radio.vue';
import UnnnicIcon from '@/components/Icon.vue';

describe('Radio.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Radio, {
      props: {
        modelValue: '',
        value: 'option1',
        disabled: false,
        size: 'md',
      },
      global: {
        components: {
          UnnnicIcon,
        },
      },
      slots: {
        default: 'Option 1',
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('renders UnnnicIcon component with correct props', () => {
    const unnnicIcon = wrapper.findComponent(UnnnicIcon);
    expect(unnnicIcon.exists()).toBe(true);
    expect(unnnicIcon.props('icon')).toBe('radio-default');
    expect(unnnicIcon.props('scheme')).toBe('neutral-cleanest');
    expect(unnnicIcon.props('size')).toBe('md');
  });

  test('applies the correct size class', async () => {
    expect(wrapper.classes()).toContain('unnnic-radio-container--md');

    await wrapper.setProps({ size: 'sm' });
    expect(wrapper.classes()).toContain('unnnic-radio-container--sm');
  });

  test('applies disabled class when disabled prop is true', async () => {
    await wrapper.setProps({ disabled: true });
    expect(wrapper.classes()).toContain('disabled');
  });

  test('icon changes based on valueName', async () => {
    await wrapper.setProps({ modelValue: 'option1' });
    const unnnicIcon = wrapper.findComponent(UnnnicIcon);
    expect(unnnicIcon.props('icon')).toBe('radio-selected');
  });

  test('icon and color change when disabled is true', async () => {
    await wrapper.setProps({ disabled: true });
    const unnnicIcon = wrapper.findComponent(UnnnicIcon);
    expect(unnnicIcon.props('icon')).toBe('radio-disable');
    expect(unnnicIcon.props('scheme')).toBe('brand-sec');
  });

  test('emits update:modelValue with correct value when clicked and not disabled', async () => {
    await wrapper.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['option1']);
  });

  test('does not emit update:modelValue when clicked and disabled', async () => {
    await wrapper.setProps({ disabled: true });
    await wrapper.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  test('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

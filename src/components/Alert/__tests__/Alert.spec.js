import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, afterEach, test, vi } from 'vitest';
import UnnnicAlert from '@/components/Alert/Alert.vue';

describe('UnnnicAlert.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(UnnnicAlert, {
      props: {
        version: '1.0',
        title: 'Test Alert',
        text: 'This is an alert message',
        scheme: 'primary',
        icon: 'alert-icon',
        position: 'top-right',
        closeText: 'Close',
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('renders title and text in uppercase', () => {
    const title = wrapper.find('.unnnic-alert__title');
    const text = wrapper.find('.unnnic-alert__text');

    expect(title.text()).toBe('TEST ALERT');
    expect(text.text()).toBe('This is an alert message');
  });

  test('applies the correct position class', () => {
    expect(wrapper.classes()).toContain('unnnic-alert-position--top-right');
  });

  test('renders the icon with correct props', () => {
    const icon = wrapper.findComponent('[data-test="unnnic-icon"]');
    expect(icon.exists()).toBe(true);
    expect(icon.props('icon')).toBe('alert-icon');
    expect(icon.props('scheme')).toBe('primary');
    expect(icon.props('size')).toBe('sm');
  });

  test('renders closeText and calls onClose when clicked', async () => {
    const closeText = wrapper.find('.unnnic-alert__close-text');
    expect(closeText.exists()).toBe(true);
    expect(closeText.text()).toBe('CLOSE');

    const onCloseSpy = vi.spyOn(wrapper.props(), 'onClose');
    await closeText.trigger('click');
    expect(onCloseSpy).toHaveBeenCalled();
  });

  test('renders default close icon if closeText is not provided', async () => {
    await wrapper.setProps({ closeText: '', onClose: () => vi.fn() });
    await wrapper.vm.$nextTick();
    const closeIcon = wrapper.findComponent('[data-test="unnnic-icon-close"]');
    expect(closeIcon.exists()).toBe(true);
    expect(closeIcon.props('icon')).toBe('close-1');
    expect(closeIcon.props('scheme')).toBe('brand-sec');
    expect(closeIcon.props('size')).toBe('xs');
  });

  test('renders the correct component for version 1.1', async () => {
    await wrapper.setProps({ version: '1.1' });
    const versionComponent = wrapper.findComponent({ name: 'Version1dot1' });
    expect(versionComponent.exists()).toBe(true);
  });

  test('does not render alert if version is not 1.0', async () => {
    await wrapper.setProps({ version: '1.2' });
    expect(wrapper.find('.unnnic-alert').exists()).toBe(false);
  });

  test('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

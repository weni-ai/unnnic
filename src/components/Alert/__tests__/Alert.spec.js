import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, afterEach, test, vi } from 'vitest';
import UnnnicAlert from '@/components/Alert/Alert.vue';

describe('UnnnicAlert.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(UnnnicAlert, {
      props: {
        version: '2.0',
        title: 'Test Alert',
        text: 'This is an alert message',
        type: 'success',
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
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

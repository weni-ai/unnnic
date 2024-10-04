import { mount } from '@vue/test-utils';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import AlertBanner from '@/components/Alert/AlertBanner.vue';

describe('AlertBanner.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(AlertBanner, {
      props: {
        text: 'This is a banner alert',
        type: 'danger',
        showCloseButton: true,
        linkHref: 'https://example.com',
        linkText: 'Learn more',
        linkTarget: '_self',
        onClose: vi.fn(),
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('renders the correct text and link', () => {
    const textElement = wrapper.find('.text');
    const linkElement = wrapper.find('.banner-alert__link');

    expect(textElement.text()).toBe('This is a banner alert');
    expect(linkElement.text()).toBe('Learn more');
    expect(linkElement.attributes('href')).toBe('https://example.com');
    expect(linkElement.attributes('target')).toBe('_self');
  });

  test('applies the correct class based on the type', () => {
    expect(wrapper.classes()).toContain('banner-alert--banner-danger');
  });

  test('renders the correct icon based on the type', () => {
    const icon = wrapper.findComponent('[data-test="unnnic-icon"]');
    expect(icon.exists()).toBe(true);
    expect(icon.props('icon')).toBe('block');
    expect(icon.props('size')).toBe('sm');
    expect(icon.props('scheme')).toBe('neutral-white');
  });

  test('does not render the icon when type is not danger, warning, or info', async () => {
    await wrapper.setProps({ type: 'success' });
    const icon = wrapper.findComponent('[data-test="unnnic-icon"]');
    expect(icon.element.style.display).toBe('none');
  });

  test('calls emitClose and emits close event when close button is clicked', async () => {
    const closeButton = wrapper.find('.banner-alert__close');
    await closeButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('close');
    expect(wrapper.props().onClose).toHaveBeenCalled();
  });

  test('does not render close button if showCloseButton is false', async () => {
    await wrapper.setProps({ showCloseButton: false });
    const closeButton = wrapper.find('.banner-alert__close');
    expect(closeButton.element.style.display).toBe('none');
  });

  test('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('getIconType function returns the correct icon based on type', () => {
    expect(wrapper.vm.getIconType('danger')).toBe('block');
    expect(wrapper.vm.getIconType('info')).toBe('info');
    expect(wrapper.vm.getIconType('')).toBe('info');
  });

  test('isShowTextIcon function returns true for danger, warning, and info types', () => {
    expect(wrapper.vm.isShowTextIcon('danger')).toBe(true);
    expect(wrapper.vm.isShowTextIcon('warning')).toBe(true);
    expect(wrapper.vm.isShowTextIcon('info')).toBe(true);
    expect(wrapper.vm.isShowTextIcon('')).toBe(true);
    expect(wrapper.vm.isShowTextIcon('success')).toBe(false);
  });
});

import { mount } from '@vue/test-utils';
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import Alert from '@/components/Alert/Version1dot1.vue';
import UnnnicIcon from '@/components/Icon.vue';

vi.mock('@/components/Icon.vue');

describe('Alert.vue', () => {
  let wrapper;

  const defaultProps = {
    version: '1.0',
    text: 'Test Alert',
    scheme: 'feedback-green',
    onClose: vi.fn(),
    linkHref: 'https://example.com',
    linkTarget: '_blank',
    linkText: 'Learn more',
    type: 'success',
  };

  beforeEach(() => {
    wrapper = mount(Alert, {
      props: defaultProps,
      global: {
        stubs: {
          UnnnicIcon: true,
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
    vi.clearAllMocks();
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.alert').exists()).toBe(true);
    expect(wrapper.find('.alert__text').text()).toBe('Test Alert');
  });

  test('applies correct classes based on scheme and type props', () => {
    expect(wrapper.find('.alert--scheme-aux-green').exists()).toBe(true);

    wrapper = mount(Alert, {
      props: { ...defaultProps, scheme: 'feedback-red', type: 'error' },
      global: { stubs: { UnnnicIcon: true } },
    });
    expect(wrapper.find('.alert--scheme-aux-red').exists()).toBe(true);
  });

  test('renders link when linkHref is provided', () => {
    const link = wrapper.find('.alert__link');
    expect(link.exists()).toBe(true);
    expect(link.attributes('href')).toBe('https://example.com');
    expect(link.attributes('target')).toBe('_blank');
    expect(link.text()).toBe('Learn more');
  });

  test('does not render link when linkHref is not provided', async () => {
    await wrapper.setProps({ linkHref: '' });
    expect(wrapper.find('.alert__link').exists()).toBe(false);
  });

  test('emits close event and calls onClose prop when close button is clicked', async () => {
    await wrapper.find('.alert__close').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  test('adds slide-down class on progress animation end', async () => {
    const progressElement = wrapper.find('.alert__progress');
    await progressElement.trigger('animationend');
    expect(wrapper.find('.alert-container').classes()).toContain('slide-down');
  });

  test('emits close event on slide-down animation end', async () => {
    const alertContainer = wrapper.find('.alert-container');
    await alertContainer.trigger('animationend', {
      animationName: 'slideDown',
    });
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  test('does not emit close event on non-slideDown animation end', async () => {
    const alertContainer = wrapper.find('.alert-container');
    await alertContainer.trigger('animationend', {
      animationName: 'someOtherAnimation',
    });
    expect(wrapper.emitted('close')).toBeFalsy();
  });

  test.each([
    ['version', '1.1'],
    ['text', 'New Alert Text'],
    ['scheme', 'feedback-red'],
    ['linkHref', 'https://newexample.com'],
    ['linkTarget', '_self'],
    ['linkText', 'Click here'],
    ['type', 'error'],
  ])('updates %s prop correctly', async (propName, newValue) => {
    await wrapper.setProps({ [propName]: newValue });
    expect(wrapper.props(propName)).toBe(newValue);
  });

  test('renders UnnnicIcon component', () => {
    expect(wrapper.findComponent(UnnnicIcon).exists()).toBe(true);
    expect(wrapper.findComponent(UnnnicIcon).props()).toEqual({
      clickable: false,
      filled: false,
      icon: 'close-1',
      size: 'sm',
      scheme: 'neutral-white',
    });
  });

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

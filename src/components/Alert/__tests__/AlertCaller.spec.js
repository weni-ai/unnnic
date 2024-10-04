import { mount } from '@vue/test-utils';
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import AlertCaller from '@/components/Alert/AlertCaller.vue';
import alert from '@/utils/call';

vi.mock('@/utils/call', () => ({
  default: {
    callAlert: vi.fn(),
  },
}));

describe('AlertCaller.vue', () => {
  let wrapper;

  const defaultProps = {
    title: 'Test Title',
    text: 'Test Text',
    icon: 'test-icon',
    enabled: true,
    scheme: 'primary',
    seconds: 5,
    closeText: 'Close',
    position: 'top-right',
  };

  beforeEach(() => {
    wrapper = mount(AlertCaller, {
      props: defaultProps,
    });
  });

  afterEach(() => {
    wrapper.unmount();
    vi.clearAllMocks();
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('Launch alert');
  });

  test('calls callAlert method when button is clicked', async () => {
    const callAlertSpy = vi.spyOn(wrapper.vm, 'callAlert');
    await wrapper.find('button').trigger('click');
    expect(callAlertSpy).toHaveBeenCalledTimes(1);
  });

  test('callAlert method invokes alert.callAlert with correct props', async () => {
    await wrapper.find('button').trigger('click');
    expect(alert.callAlert).toHaveBeenCalledWith({
      props: defaultProps,
      seconds: defaultProps.seconds,
    });
  });

  test.each([
    ['title', 'New Title'],
    ['text', 'New Text'],
    ['icon', 'new-icon'],
    ['enabled', false],
    ['scheme', 'secondary'],
    ['seconds', 10],
    ['closeText', 'Dismiss'],
    ['position', 'bottom-left'],
  ])('updates %s prop correctly', async (propName, newValue) => {
    await wrapper.setProps({ [propName]: newValue });
    await wrapper.find('button').trigger('click');
    const expectedProps = { ...defaultProps, [propName]: newValue };
    expect(alert.callAlert).toHaveBeenCalledWith({
      props: expectedProps,
      seconds: expectedProps.seconds,
    });
  });

  test('passes default values when props are not provided', async () => {
    wrapper = mount(AlertCaller, {
      props: {},
    });
    await wrapper.find('button').trigger('click');
    expect(alert.callAlert).toHaveBeenCalledWith({
      props: {
        title: null,
        text: null,
        icon: null,
        enabled: true,
        scheme: null,
        seconds: 3,
        closeText: null,
        position: 'top-right',
      },
      seconds: 3,
    });
  });

  test('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

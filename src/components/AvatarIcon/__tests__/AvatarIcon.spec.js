import { mount } from '@vue/test-utils';
import { describe, test, expect, beforeEach } from 'vitest';
import AvatarIcon from '@/components/AvatarIcon/AvatarIcon.vue';

describe('AvatarIcon.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(AvatarIcon, {
      props: {
        enabled: true,
        icon: 'graph-stats-1',
        size: 'sm',
        scheme: 'aux-blue',
        filled: false,
        opacity: true,
      },
      global: {
        stubs: {
          UnnnicIcon: true,
        },
      },
    });
  });

  test('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('applies the correct classes based on props', async () => {
    expect(wrapper.classes()).toContain('unnnic-avatar-icon');
    expect(wrapper.classes()).toContain('aux-blue');
    expect(wrapper.classes()).toContain('sm');
    expect(wrapper.classes()).not.toContain('disabled');
    expect(wrapper.classes()).not.toContain('filled');
    expect(wrapper.classes()).not.toContain('opacity');

    await wrapper.setProps({
      enabled: false,
      size: 'lg',
      filled: true,
      opacity: false,
    });
    expect(wrapper.classes()).toContain('lg');
    expect(wrapper.classes()).toContain('disabled');
    expect(wrapper.classes()).toContain('opacity');
  });

  test('renders UnnnicIcon with correct props', () => {
    const icon = wrapper.findComponent({ name: 'UnnnicIcon' });
    expect(icon.exists()).toBe(true);
    expect(icon.props('icon')).toBe('graph-stats-1');
    expect(icon.props('scheme')).toBe('aux-blue');
    expect(icon.props('size')).toBe('md');
    expect(icon.props('filled')).toBe(false);
  });

  test('computes iconSize correctly based on size prop', async () => {
    expect(wrapper.vm.iconSize).toBe('md');

    await wrapper.setProps({ size: 'nano' });
    expect(wrapper.vm.iconSize).toBe('xs');

    await wrapper.setProps({ size: 'xl' });
    expect(wrapper.vm.iconSize).toBe('xl');
  });

  test('renders neutral-cloudy scheme when enabled is false', async () => {
    await wrapper.setProps({ enabled: false });
    const icon = wrapper.findComponent({ name: 'UnnnicIcon' });
    expect(icon.props('scheme')).toBe('neutral-cloudy');
  });

  test('applies opacity class based on prop', async () => {
    console.log('wrapper', wrapper.classes(), wrapper.vm.opacity);
    expect(wrapper.classes()).not.toContain('opacity');

    await wrapper.setProps({ opacity: false });
    expect(wrapper.classes()).toContain('opacity');
  });

  test('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

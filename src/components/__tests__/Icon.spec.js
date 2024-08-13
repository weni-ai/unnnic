import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import Icon from '../Icon.vue';

const createWrapper = (props) => {
  return mount(Icon, { props });
};

describe('Icon', () => {
  it('should render old icons map and trigger click events', async () => {
    const wrapper = createWrapper({ icon: 'search-1', clickable: false });

    const hasOldIcon = wrapper.find('[data-testid="old-map-icons"]');
    expect(hasOldIcon.exists()).toBe(true);

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBe(undefined);

    await wrapper.setProps({ clickable: true });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();

    await wrapper.trigger('mousedown');
    await wrapper.trigger('mouseup');

    expect(wrapper.emitted('mousedown')).toBeTruthy();
    expect(wrapper.emitted('mouseup')).toBeTruthy();
  });

  it('should render material icons and trigger click events', async () => {
    const wrapper = createWrapper({
      icon: 'done_all',
      clickable: false,
    });

    const hasMaterialIcon = wrapper.find('[data-testid="material-icon"]');
    expect(hasMaterialIcon.exists()).toBe(true);

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBe(undefined);

    await wrapper.setProps({ clickable: true });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();

    await wrapper.trigger('mousedown');
    await wrapper.trigger('mouseup');

    expect(wrapper.emitted('mousedown')).toBeTruthy();
    expect(wrapper.emitted('mouseup')).toBeTruthy();
  });

  it('should log warning because invalid props', () => {
    const warningSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    createWrapper({ lineHeight: 'invalid' });

    expect(warningSpy).toHaveBeenCalled();
  });
});

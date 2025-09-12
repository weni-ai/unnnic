import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import Icon from '../Icon.vue';

const createWrapper = (props) => {
  return mount(Icon, { props });
};

const handlerIconClickTest = async (wrapper) => {
  await wrapper.trigger('click');
  expect(wrapper.emitted('click')).toBeFalsy();
  await wrapper.setProps({ clickable: true });
  await wrapper.trigger('click');
  expect(wrapper.emitted('click')).toBeTruthy();
};

const handlerIconMouseDownUpTest = async (wrapper) => {
  await wrapper.trigger('mousedown');
  await wrapper.trigger('mouseup');
  expect(wrapper.emitted('mousedown')).toBeTruthy();
  expect(wrapper.emitted('mouseup')).toBeTruthy();
};

const commonTests = async (wrapper) => {
  it('should emit click event when the icon is clicked if clickable prop its true', async () => {
    await handlerIconClickTest(wrapper);
  });

  it('should emit mousedown/mouseup when doing the action with the mouse', async () => {
    await handlerIconMouseDownUpTest(wrapper);
  });
};

describe('Icon', () => {
  it('should accept valid lineHeight props', () => {
    const validValues = ['sm', 'md', 'lg', null];
    
    validValues.forEach(value => {
      const wrapper = createWrapper({ lineHeight: value });
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('OldMapIcon', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = createWrapper({ icon: 'search-1' });
    });

    it('should render the icon from OldIconsMap', () => {
      const hasOldIcon = wrapper.find('[data-testid="old-map-icons"]');
      expect(hasOldIcon.exists()).toBe(true);
    });

    it('should emit click event when the icon is clicked if clickable prop its true', async () => {
      await handlerIconClickTest(wrapper);
    });

    it('should emit mousedown/mouseup when doing the action with the mouse', async () => {
      await handlerIconMouseDownUpTest(wrapper);
    });
  });

  describe('Material Icons', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = createWrapper({ icon: 'done_all' });
    });

    it('should render the icon from Material Icons', () => {
      const hasOldIcon = wrapper.find('[data-testid="material-icon"]');
      expect(hasOldIcon.exists()).toBe(true);
    });

    it('should emit click event when the icon is clicked if clickable prop its true', async () => {
      await handlerIconClickTest(wrapper);
    });

    it('should emit mousedown/mouseup when doing the action with the mouse', async () => {
      await handlerIconMouseDownUpTest(wrapper);
    });
  });
});

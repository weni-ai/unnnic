import { beforeEach, describe, expect, it } from 'vitest';
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
  it('should emit click event when the icon is clicked if clickable prop its true', () => {
    handlerIconClickTest(wrapper);
  });

  it('should emit mousedown/mouseup when doing the action with the mouse', () => {
    handlerIconMouseDownUpTest(wrapper);
  });
};

describe('Icon', () => {
  describe('OldMapIcon', () => {
    let wrapper = createWrapper({ icon: 'search-1' });

    commonTests(wrapper);

    beforeEach(() => {
      wrapper = createWrapper({ icon: 'search-1' });
    });

    it('should render the icon from OldIconsMap', async () => {
      const hasOldIcon = wrapper.find('[data-testid="old-map-icons"]');
      expect(hasOldIcon.exists()).toBe(true);
    });
  });

  describe('Material Icons', () => {
    let wrapper = createWrapper({ icon: 'done_all' });

    commonTests(wrapper);

    beforeEach(() => {
      wrapper = createWrapper({ icon: 'done_all' });
    });

    it('should render the icon from Material Icons', async () => {
      const hasOldIcon = wrapper.find('[data-testid="material-icon"]');
      expect(hasOldIcon.exists()).toBe(true);
    });
  });
});

import { shallowMount } from '@vue/test-utils';
import SelectSmartMultipleHeader from '../SelectSmartMultipleHeader.vue';
import Tag from '@/components/Tag/Tag.vue';

describe('SelectSmartMultipleHeader.vue', () => {
  let wrapper;

  const mountWrapper = (props = {}) => {
    wrapper = shallowMount(SelectSmartMultipleHeader, {
      propsData: {
        selectedOptions: [],
        ...props,
      },
      stubs: {
        Tag,
      },
    });
  };

  beforeEach(() => {
    mountWrapper();
  });

  describe('initial rendering', () => {
    it('matches the snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('renders without any selected options by default', () => {
      const withoutSelectsMessage = wrapper.find(
        '[data-testid="without-selects-message"]',
      );
      expect(withoutSelectsMessage.exists()).toBe(true);
      expect(withoutSelectsMessage.text()).toBe('No option selected');
    });

    it('displays the correct "without selects" message when no options are selected', async () => {
      await wrapper.setProps({ withoutSelectsMessage: 'No items selected' });
      const withoutSelectsMessage = wrapper.find(
        '[data-testid="without-selects-message"]',
      );
      expect(withoutSelectsMessage.text()).toBe('No items selected');
    });
  });

  describe('selected options display', () => {
    beforeEach(() => {
      mountWrapper({
        selectedOptions: [
          { value: 1, label: 'Option 1' },
          { value: 2, label: 'Option 2' },
          { value: 3, label: 'Option 3' },
        ],
      });
    });

    it('renders tags for the first multiple selected options', () => {
      const tags = wrapper.findAllComponents(Tag);
      expect(tags.length).toBe(2);
    });

    it('displays remaining selected options count correctly', () => {
      const remainingCount = wrapper.find('[data-testid="remaining-count"]');
      expect(remainingCount.exists()).toBe(true);
      expect(remainingCount.text()).toBe('+1');
    });
  });

  describe('unselectOption method', () => {
    it('emits "unselect-option" event when a Tag close icon is clicked', async () => {
      mountWrapper({
        selectedOptions: [
          { value: 1, label: 'Option 1' },
          { value: 2, label: 'Option 2' },
        ],
      });

      const firstTag = wrapper.findComponent(Tag);
      await firstTag.vm.$emit('close');
      expect(wrapper.emitted('unselect-option')).toBeTruthy();
      expect(wrapper.emitted('unselect-option')[0]).toEqual([
        { value: 1, label: 'Option 1' },
      ]);
    });
  });
});

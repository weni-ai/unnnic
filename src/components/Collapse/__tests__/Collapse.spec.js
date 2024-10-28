import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import Collapse from '../Collapse.vue';

describe('Collapse.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Collapse, {
      props: { title: 'Test Title' },
    });
  });

  it('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('Props', () => {
    it('should accept title prop and render it correctly', () => {
      expect(wrapper.find('[data-testid="collapse-header"]').text()).toContain(
        'Test Title',
      );
    });

    it('should accept active prop and set localActive accordingly', async () => {
      await wrapper.setProps({ active: true });
      expect(wrapper.vm.localActive).toBe(true);

      await wrapper.setProps({ active: false });
      expect(wrapper.vm.localActive).toBe(false);
    });

    it('should apply classes based on props', async () => {
      await wrapper.setProps({ borderBottom: true });
      expect(wrapper.classes()).toContain('unnnic-collapse--border-bottom');

      await wrapper.setProps({ unspacedIcon: true });
      expect(wrapper.classes()).toContain('unnnic-collapse--unspaced-icon');

      await wrapper.setProps({ size: 'lg' });
      expect(wrapper.classes()).toContain('unnnic-collapse--size-lg');

      await wrapper.setProps({ size: 'md' });
      expect(wrapper.classes()).toContain('unnnic-collapse--size-md');

      await wrapper.setProps({ size: undefined });
      expect(wrapper.classes()).toContain('unnnic-collapse--size-lg'); // default size

      await wrapper.setProps({ modelValue: true });
      expect(wrapper.classes()).toContain('unnnic-collapse--active');

      await wrapper.setProps({ modelValue: false });
      expect(wrapper.classes()).not.toContain('unnnic-collapse--active');
    });
  });

  describe('Interactions', () => {
    it('should toggle localActive when header is clicked', async () => {
      const header = wrapper.find('[data-testid="collapse-header"]');

      expect(wrapper.vm.localActive).toBe(false);
      await header.trigger('click');
      expect(wrapper.vm.localActive).toBe(true);
      await header.trigger('click');
      expect(wrapper.vm.localActive).toBe(false);
    });

    it('should emit change and update:modelValue on toggle', async () => {
      const header = wrapper.find('[data-testid="collapse-header"]');

      await header.trigger('click');

      expect(wrapper.emitted('change')).toEqual([[true]]);
      expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);

      await header.trigger('click');

      expect(wrapper.emitted('change')).toEqual([[true], [false]]);
      expect(wrapper.emitted('update:modelValue')).toEqual([[true], [false]]);
    });
  });

  describe('Slots', () => {
    it('should render default slot content when active', async () => {
      const defaultSlotContent = 'This is default slot content';
      wrapper = mount(Collapse, {
        props: { title: 'Test Title', active: true },
        slots: { default: defaultSlotContent },
      });
      expect(wrapper.html()).toContain(defaultSlotContent);
    });

    it('should render header slot content if provided', async () => {
      const headerSlotContent =
        '<header data-testid="header-slot">Header Slot Content</header>';
      wrapper = mount(Collapse, {
        props: { title: 'Test Title' },
        slots: { header: headerSlotContent },
      });
      expect(wrapper.find('[data-testid="header-slot"]').exists()).toBe(true);
    });
  });

  describe('Watchers', () => {
    it('should update localActive when active prop changes', async () => {
      expect(wrapper.vm.localActive).toBe(false);
      await wrapper.setProps({ active: true });
      expect(wrapper.vm.localActive).toBe(true);
    });

    it('should update localActive when modelValue prop changes', async () => {
      expect(wrapper.vm.localActive).toBe(false);
      await wrapper.setProps({ modelValue: true });
      expect(wrapper.vm.localActive).toBe(true);
    });
  });
});

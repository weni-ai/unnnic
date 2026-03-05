import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test } from 'vitest';
import SelectItem from '../SelectItem.vue';

const createWrapper = (props = {}, slots = {}) => {
  return mount(SelectItem, {
    props,
    slots: slots.default ? { default: slots.default } : {},
  });
};

describe('SelectItem.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper({}, { default: 'Test Item' });
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('renders slot content', () => {
    const labelElement = wrapper.find('.unnnic-select-item__label');
    expect(labelElement.exists()).toBe(true);
    expect(labelElement.text()).toBe('Test Item');
  });

  test('applies the correct base CSS class', () => {
    expect(wrapper.classes()).toContain('unnnic-select-item');
  });

  describe('props validation', () => {
    test('validates optional size prop', () => {
      const { size } = wrapper.vm.$options.props;
      expect(size.required).toBeFalsy();
      expect(size.type).toBe(String);
      expect(size.default).toBe('');
    });

    test('validates optional selectable prop', () => {
      const { selectable } = wrapper.vm.$options.props;
      expect(selectable.required).toBeFalsy();
      expect(selectable.type).toBe(Boolean);
      expect(selectable.default).toBe(true);
    });

    test('validates optional active prop', () => {
      const { active } = wrapper.vm.$options.props;
      expect(active.required).toBeFalsy();
      expect(active.type).toBe(Boolean);
      expect(active.default).toBe(false);
    });

    test('validates optional textFocused prop', () => {
      const { textFocused } = wrapper.vm.$options.props;
      expect(textFocused.required).toBeFalsy();
      expect(textFocused.type).toBe(Boolean);
      expect(textFocused.default).toBe(false);
    });
  });

  describe('size prop', () => {
    test('applies md size class when size is md', async () => {
      await wrapper.setProps({ size: 'md' });
      const labelElement = wrapper.find('.unnnic-select-item__label');
      expect(labelElement.classes()).toContain('unnnic-select-item__label--md');
    });

    test('applies sm size class when size is sm', async () => {
      await wrapper.setProps({ size: 'sm' });
      const labelElement = wrapper.find('.unnnic-select-item__label');
      expect(labelElement.classes()).toContain('unnnic-select-item__label--sm');
    });

    test('does not apply size class when size is empty', async () => {
      await wrapper.setProps({ size: '' });
      const labelElement = wrapper.find('.unnnic-select-item__label');
      expect(labelElement.classes()).not.toContain(
        'unnnic-select-item__label--md',
      );
      expect(labelElement.classes()).not.toContain(
        'unnnic-select-item__label--sm',
      );
    });
  });

  describe('selectable prop', () => {
    test('applies selectable class when selectable is true', async () => {
      await wrapper.setProps({ selectable: true });
      expect(wrapper.classes()).toContain('unnnic-select-item--selectable');
      expect(wrapper.classes()).toContain('unnnic--clickable');
    });

    test('does not apply selectable class when selectable is false', async () => {
      await wrapper.setProps({ selectable: false });
      expect(wrapper.classes()).not.toContain('unnnic-select-item--selectable');
      expect(wrapper.classes()).not.toContain('unnnic--clickable');
    });
  });

  describe('active state', () => {
    test('applies active class when active prop is true', async () => {
      await wrapper.setProps({ active: true });
      expect(wrapper.classes()).toContain('unnnic-select-item__active');
    });

    test('does not apply active class when active prop is false', async () => {
      await wrapper.setProps({ active: false });
      expect(wrapper.classes()).not.toContain('unnnic-select-item__active');
    });
  });

  describe('textFocused state', () => {
    test('applies text-focused class when textFocused prop is true', async () => {
      await wrapper.setProps({ textFocused: true });
      expect(wrapper.classes()).toContain('text-focused');
    });

    test('does not apply text-focused class when textFocused prop is false', async () => {
      await wrapper.setProps({ textFocused: false });
      expect(wrapper.classes()).not.toContain('text-focused');
    });
  });

  describe('click events', () => {
    test('emits click event when clicked', async () => {
      const clickWrapper = createWrapper({}, { default: 'Test Item' });
      await clickWrapper.trigger('click');
      expect(clickWrapper.emitted('click')).toBeTruthy();
      expect(clickWrapper.emitted('click').length).toBeGreaterThanOrEqual(1);
    });

    test('emits click event even when selectable is false', async () => {
      const clickWrapper = createWrapper(
        { selectable: false },
        { default: 'Test Item' },
      );
      await clickWrapper.trigger('click');
      expect(clickWrapper.emitted('click')).toBeTruthy();
      expect(clickWrapper.emitted('click').length).toBeGreaterThanOrEqual(1);
    });

    test('emits multiple click events', async () => {
      const clickWrapper = createWrapper({}, { default: 'Test Item' });
      await clickWrapper.trigger('click');
      await clickWrapper.trigger('click');
      expect(clickWrapper.emitted('click').length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('combined states', () => {
    test('can be active and selectable', async () => {
      await wrapper.setProps({ active: true, selectable: true });
      expect(wrapper.classes()).toContain('unnnic-select-item__active');
      expect(wrapper.classes()).toContain('unnnic-select-item--selectable');
      expect(wrapper.classes()).toContain('unnnic--clickable');
    });

    test('can be textFocused and active', async () => {
      await wrapper.setProps({ textFocused: true, active: true });
      expect(wrapper.classes()).toContain('text-focused');
      expect(wrapper.classes()).toContain('unnnic-select-item__active');
    });

    test('renders correctly with all props', async () => {
      await wrapper.setProps({
        size: 'md',
        selectable: true,
        active: true,
        textFocused: true,
      });

      expect(wrapper.classes()).toContain('unnnic-select-item');
      expect(wrapper.classes()).toContain('unnnic-select-item__active');
      expect(wrapper.classes()).toContain('unnnic-select-item--selectable');
      expect(wrapper.classes()).toContain('unnnic--clickable');
      expect(wrapper.classes()).toContain('text-focused');

      const labelElement = wrapper.find('.unnnic-select-item__label');
      expect(labelElement.classes()).toContain('unnnic-select-item__label--md');
    });
  });

  describe('component structure', () => {
    test('has correct component name', () => {
      expect(wrapper.vm.$options.name).toBe('UnnicSelectItem');
    });

    test('renders a div element', () => {
      expect(wrapper.element.tagName).toBe('DIV');
    });

    test('contains a span element for the label', () => {
      const labelElement = wrapper.find('span.unnnic-select-item__label');
      expect(labelElement.exists()).toBe(true);
    });
  });

  describe('accessibility', () => {
    test('has proper semantic structure', () => {
      const div = wrapper.find('.unnnic-select-item');
      const span = wrapper.find('.unnnic-select-item__label');

      expect(div.exists()).toBe(true);
      expect(span.exists()).toBe(true);
      expect(span.element.tagName).toBe('SPAN');
    });

    test('slot content is accessible', () => {
      const labelElement = wrapper.find('.unnnic-select-item__label');
      expect(labelElement.text()).toBe('Test Item');
    });
  });

  describe('edge cases', () => {
    test('handles empty slot content', async () => {
      const emptyWrapper = createWrapper({}, { default: '' });
      const labelElement = emptyWrapper.find('.unnnic-select-item__label');
      expect(labelElement.text()).toBe('');
    });

    test('handles long slot content', async () => {
      const longText =
        'This is a very long text content that should be handled properly by the component';
      const longWrapper = createWrapper({}, { default: longText });
      const labelElement = longWrapper.find('.unnnic-select-item__label');
      expect(labelElement.text()).toBe(longText);
    });

    test('handles special characters in slot content', async () => {
      const specialText = 'Item with special chars: @#$%^&*()';
      const specialWrapper = createWrapper({}, { default: specialText });
      const labelElement = specialWrapper.find('.unnnic-select-item__label');
      expect(labelElement.text()).toBe(specialText);
    });

    test('handles HTML content in slot', async () => {
      const htmlContent = '<strong>Bold text</strong>';
      const htmlWrapper = createWrapper({}, { default: htmlContent });
      const labelElement = htmlWrapper.find('.unnnic-select-item__label');
      expect(labelElement.html()).toContain('<strong>Bold text</strong>');
    });
  });

  describe('CSS class combinations', () => {
    test('applies correct classes for non-selectable inactive item', async () => {
      await wrapper.setProps({
        selectable: false,
        active: false,
        textFocused: false,
      });

      expect(wrapper.classes()).toContain('unnnic-select-item');
      expect(wrapper.classes()).not.toContain('unnnic-select-item--selectable');
      expect(wrapper.classes()).not.toContain('unnnic--clickable');
      expect(wrapper.classes()).not.toContain('unnnic-select-item__active');
      expect(wrapper.classes()).not.toContain('text-focused');
    });

    test('applies correct classes for selectable active item', async () => {
      await wrapper.setProps({
        selectable: true,
        active: true,
        textFocused: false,
      });

      expect(wrapper.classes()).toContain('unnnic-select-item');
      expect(wrapper.classes()).toContain('unnnic-select-item--selectable');
      expect(wrapper.classes()).toContain('unnnic--clickable');
      expect(wrapper.classes()).toContain('unnnic-select-item__active');
      expect(wrapper.classes()).not.toContain('text-focused');
    });

    test('applies correct classes for text-focused item', async () => {
      await wrapper.setProps({
        selectable: true,
        active: false,
        textFocused: true,
      });

      expect(wrapper.classes()).toContain('unnnic-select-item');
      expect(wrapper.classes()).toContain('unnnic-select-item--selectable');
      expect(wrapper.classes()).toContain('unnnic--clickable');
      expect(wrapper.classes()).not.toContain('unnnic-select-item__active');
      expect(wrapper.classes()).toContain('text-focused');
    });
  });

  describe('snapshot testing', () => {
    test('matches snapshot with default props', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    test('matches snapshot with active state', async () => {
      await wrapper.setProps({ active: true });
      expect(wrapper.html()).toMatchSnapshot();
    });

    test('matches snapshot with textFocused state', async () => {
      await wrapper.setProps({ textFocused: true });
      expect(wrapper.html()).toMatchSnapshot();
    });

    test('matches snapshot with non-selectable state', async () => {
      await wrapper.setProps({ selectable: false });
      expect(wrapper.html()).toMatchSnapshot();
    });

    test('matches snapshot with md size', async () => {
      await wrapper.setProps({ size: 'md' });
      expect(wrapper.html()).toMatchSnapshot();
    });

    test('matches snapshot with sm size', async () => {
      await wrapper.setProps({ size: 'sm' });
      expect(wrapper.html()).toMatchSnapshot();
    });

    test('matches snapshot with all states combined', async () => {
      await wrapper.setProps({
        size: 'md',
        selectable: true,
        active: true,
        textFocused: true,
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});

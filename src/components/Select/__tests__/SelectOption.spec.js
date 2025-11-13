import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test } from 'vitest';
import SelectOption from '../SelectOption.vue';

const createWrapper = (props = {}) => {
  return mount(SelectOption, { props });
};

describe('SelectOption.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper({
      label: 'Test Option',
    });
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('renders the label text', () => {
    const labelElement = wrapper.find('.unnnic-select-option__label');
    expect(labelElement.exists()).toBe(true);
    expect(labelElement.text()).toBe('Test Option');
  });

  test('applies the correct base CSS class', () => {
    expect(wrapper.classes()).toContain('unnnic-select-option');
  });

  describe('props validation', () => {
    test('validates required label prop', () => {
      const { label } = wrapper.vm.$options.props;
      expect(label.required).toBe(true);
      expect(label.type).toBe(String);
    });

    test('validates optional disabled prop', () => {
      const { disabled } = wrapper.vm.$options.props;
      expect(disabled.required).toBe(false);
      expect(disabled.type).toBe(Boolean);
      expect(disabled.default).toBe(false);
    });

    test('validates optional active prop', () => {
      const { active } = wrapper.vm.$options.props;
      expect(active.required).toBe(false);
      expect(active.type).toBe(Boolean);
      expect(active.default).toBe(false);
    });
  });

  describe('disabled state', () => {
    test('applies disabled class when disabled prop is true', async () => {
      await wrapper.setProps({ disabled: true });
      expect(wrapper.classes()).toContain('unnnic-select-option--disabled');
    });

    test('does not apply disabled class when disabled prop is false', async () => {
      await wrapper.setProps({ disabled: false });
      expect(wrapper.classes()).not.toContain('unnnic-select-option--disabled');
    });
  });

  describe('active state', () => {
    test('applies active class when active prop is true', async () => {
      await wrapper.setProps({ active: true });
      expect(wrapper.classes()).toContain('unnnic-select-option--active');
    });

    test('does not apply active class when active prop is false', async () => {
      await wrapper.setProps({ active: false });
      expect(wrapper.classes()).not.toContain('unnnic-select-option--active');
    });
  });

  describe('combined states', () => {
    test('can be both active and disabled', async () => {
      await wrapper.setProps({ active: true, disabled: true });
      expect(wrapper.classes()).toContain('unnnic-select-option--active');
      expect(wrapper.classes()).toContain('unnnic-select-option--disabled');
    });

    test('renders correctly with all props', async () => {
      await wrapper.setProps({
        label: 'Complex Option',
        active: true,
        disabled: false,
      });

      expect(wrapper.find('.unnnic-select-option__label').text()).toBe(
        'Complex Option',
      );
      expect(wrapper.classes()).toContain('unnnic-select-option--active');
      expect(wrapper.classes()).not.toContain('unnnic-select-option--disabled');
    });
  });

  describe('component structure', () => {
    test('has correct component name', () => {
      expect(wrapper.vm.$options.name).toBe('UnnnicSelectOption');
    });

    test('renders a div element', () => {
      expect(wrapper.element.tagName).toBe('DIV');
    });

    test('contains a paragraph element for the label', () => {
      const labelElement = wrapper.find('p.unnnic-select-option__label');
      expect(labelElement.exists()).toBe(true);
    });
  });

  describe('accessibility', () => {
    test('has proper semantic structure', () => {
      const div = wrapper.find('.unnnic-select-option');
      const p = wrapper.find('.unnnic-select-option__label');

      expect(div.exists()).toBe(true);
      expect(p.exists()).toBe(true);
      expect(p.element.tagName).toBe('P');
    });

    test('label text is accessible', () => {
      const labelElement = wrapper.find('.unnnic-select-option__label');
      expect(labelElement.text()).toBe('Test Option');
    });
  });

  describe('edge cases', () => {
    test('handles empty label', async () => {
      await wrapper.setProps({ label: '' });
      const labelElement = wrapper.find('.unnnic-select-option__label');
      expect(labelElement.text()).toBe('');
    });

    test('handles long label text', async () => {
      const longText =
        'This is a very long label text that should be handled properly by the component';
      await wrapper.setProps({ label: longText });
      const labelElement = wrapper.find('.unnnic-select-option__label');
      expect(labelElement.text()).toBe(longText);
    });

    test('handles special characters in label', async () => {
      const specialText = 'Option with special chars: @#$%^&*()';
      await wrapper.setProps({ label: specialText });
      const labelElement = wrapper.find('.unnnic-select-option__label');
      expect(labelElement.text()).toBe(specialText);
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

    test('matches snapshot with disabled state', async () => {
      await wrapper.setProps({ disabled: true });
      expect(wrapper.html()).toMatchSnapshot();
    });

    test('matches snapshot with both active and disabled states', async () => {
      await wrapper.setProps({ active: true, disabled: true });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});

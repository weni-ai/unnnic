import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, afterEach } from 'vitest';
import MultiSelectOption from '../MultiSelectOption.vue';
import i18n from '@/utils/plugins/i18n';

const createWrapper = (props = {}) => {
  return mount(MultiSelectOption, {
    props,
    global: {
      plugins: [i18n],
    },
  });
};

describe('MultiSelectOption.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper({
      label: 'Test Option',
    });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('applies the correct base CSS class', () => {
    expect(wrapper.classes()).toContain('unnnic-multi-select-option');
  });

  test('renders UnnnicCheckbox component', () => {
    const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });
    expect(checkbox.exists()).toBe(true);
  });

  test('passes label prop to checkbox', () => {
    const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });
    expect(checkbox.props('label')).toBe('Test Option');
  });

  describe('props validation', () => {
    test('validates required label prop', () => {
      const wrapper = createWrapper({ label: 'Required Label' });
      expect(wrapper.props('label')).toBe('Required Label');
    });

    test('validates optional disabled prop with default value', () => {
      expect(wrapper.props('disabled')).toBe(false);
    });

    test('validates optional active prop with default value', () => {
      expect(wrapper.props('active')).toBe(false);
    });

    test('validates optional focused prop with default value', () => {
      expect(wrapper.props('focused')).toBe(false);
    });
  });

  describe('disabled state', () => {
    test('passes disabled prop to checkbox when disabled is true', async () => {
      await wrapper.setProps({ disabled: true });
      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });
      expect(checkbox.props('disabled')).toBe(true);
    });

    test('passes disabled prop to checkbox when disabled is false', async () => {
      await wrapper.setProps({ disabled: false });
      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });
      expect(checkbox.props('disabled')).toBe(false);
    });
  });

  describe('indeterminate state', () => {
    test('passes less to the checkbox modelValue', async () => {
      await wrapper.setProps({ active: 'less' });
      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });
      expect(checkbox.props('modelValue')).toBe('less');
    });

    test('emits true when the checkbox is clicked while less', async () => {
      await wrapper.setProps({ active: 'less' });
      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });

      await checkbox.vm.$emit('update:model-value', false);

      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(true);
    });
  });

  describe('tree props', () => {
    test('renders the expand button and emits update:expanded', async () => {
      await wrapper.setProps({ expandable: true, expanded: false });

      const button = wrapper.find('.unnnic-multi-select-option__expand');
      expect(button.exists()).toBe(true);
      expect(button.attributes('aria-expanded')).toBe('false');

      await button.trigger('click');

      expect(wrapper.emitted('update:expanded')[0][0]).toBe(true);
    });

    test('applies the level 2 modifier class', async () => {
      await wrapper.setProps({ level: 2 });
      expect(wrapper.classes()).toContain(
        'unnnic-multi-select-option--level-2',
      );
    });

    test('renders a spacer on a root leaf', async () => {
      await wrapper.setProps({ level: 1, expandable: false });
      expect(
        wrapper.find('.unnnic-multi-select-option__expand-spacer').exists(),
      ).toBe(true);
      expect(wrapper.find('.unnnic-multi-select-option__expand').exists()).toBe(
        false,
      );
    });
  });

  describe('active state', () => {
    test('passes active prop to checkbox modelValue when active is true', async () => {
      await wrapper.setProps({ active: true });
      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });
      expect(checkbox.props('modelValue')).toBe(true);
    });

    test('passes active prop to checkbox modelValue when active is false', async () => {
      await wrapper.setProps({ active: false });
      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });
      expect(checkbox.props('modelValue')).toBe(false);
    });
  });

  describe('events', () => {
    test('emits update:modelValue when checkbox emits update:model-value', async () => {
      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });

      await checkbox.vm.$emit('update:model-value', true);

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(true);
    });

    test('emits update:modelValue with toggled value when active is false', async () => {
      await wrapper.setProps({ active: false });
      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });

      await checkbox.vm.$emit('update:model-value', true);

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(true);
    });

    test('emits update:modelValue with toggled value when active is true', async () => {
      await wrapper.setProps({ active: true });
      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });

      await checkbox.vm.$emit('update:model-value', false);

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false);
    });
  });

  describe('combined states', () => {
    test('can be both active and disabled', async () => {
      await wrapper.setProps({ active: true, disabled: true });
      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });

      expect(checkbox.props('modelValue')).toBe(true);
      expect(checkbox.props('disabled')).toBe(true);
    });

    test('renders correctly with all props', async () => {
      await wrapper.setProps({
        label: 'Complex Option',
        active: true,
        disabled: false,
        focused: true,
      });

      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });
      expect(checkbox.props('label')).toBe('Complex Option');
      expect(checkbox.props('modelValue')).toBe(true);
      expect(checkbox.props('disabled')).toBe(false);
    });
  });

  describe('component structure', () => {
    test('has correct component name', () => {
      expect(wrapper.vm.$options.name).toBe('UnnnicMultiSelectOption');
    });

    test('renders a div element', () => {
      expect(wrapper.element.tagName).toBe('DIV');
    });

    test('contains UnnnicCheckbox component', () => {
      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });
      expect(checkbox.exists()).toBe(true);
    });
  });

  describe('edge cases', () => {
    test('handles empty label', async () => {
      await wrapper.setProps({ label: '' });
      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });
      expect(checkbox.props('label')).toBe('');
    });

    test('handles long label text', async () => {
      const longText =
        'This is a very long label text that should be handled properly by the component';
      await wrapper.setProps({ label: longText });
      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });
      expect(checkbox.props('label')).toBe(longText);
    });

    test('handles special characters in label', async () => {
      const specialText = 'Option with special chars: @#$%^&*()';
      await wrapper.setProps({ label: specialText });
      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });
      expect(checkbox.props('label')).toBe(specialText);
    });

    test('handles rapid state changes', async () => {
      await wrapper.setProps({ active: true });
      await wrapper.setProps({ active: false });
      await wrapper.setProps({ active: true });

      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });
      expect(checkbox.props('modelValue')).toBe(true);
    });
  });

  describe('accessibility', () => {
    test('checkbox receives disabled state for accessibility', async () => {
      await wrapper.setProps({ disabled: true });
      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });
      expect(checkbox.props('disabled')).toBe(true);
    });

    test('checkbox receives label for accessibility', () => {
      const checkbox = wrapper.findComponent({ name: 'UnnnicCheckbox' });
      expect(checkbox.props('label')).toBe('Test Option');
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

    test('matches snapshot with focused state', async () => {
      await wrapper.setProps({ focused: true });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});

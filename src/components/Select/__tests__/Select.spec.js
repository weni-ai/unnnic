import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, afterEach, test, vi } from 'vitest';
import UnnnicSelect from '../index.vue';

vi.mock('../../mixins/i18n', () => ({
  default: {
    methods: {
      $t: (key) => key,
    },
  },
}));

describe('UnnnicSelect.vue', () => {
  let wrapper;

  const defaultProps = {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    modelValue: null,
  };

  const mountWrapper = (props = {}, slots = {}) => {
    return mount(UnnnicSelect, {
      props: {
        ...defaultProps,
        ...props,
      },
      global: {
        mocks: {
          $t: (key) => key,
        },
      },
      slots,
    });
  };

  beforeEach(() => {
    wrapper = mountWrapper();
  });

  afterEach(() => {
    wrapper?.unmount();
  });

  describe('rendering', () => {
    test('renders correctly', () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('.unnnic-select').exists()).toBe(true);
    });

    test('renders input component', () => {
      const input = wrapper.findComponent({ name: 'UnnnicInput' });
      expect(input.exists()).toBe(true);
    });

    test('renders popover component', () => {
      const popover = wrapper.findComponent({ name: 'UnnnicPopover' });
      expect(popover.exists()).toBe(true);
    });

    test('renders select options when popover is open', async () => {
      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      const options = wrapper.findAllComponents(
        '[data-testid="select-option"]',
      );
      expect(options.length).toBe(3);
    });
  });

  describe('props validation', () => {
    test('validates required options prop', () => {
      const { options } = wrapper.vm.$options.props;
      expect(options.required).toBe(true);
    });

    test('validates required modelValue prop', () => {
      const { modelValue } = wrapper.vm.$options.props;
      expect(modelValue.required).toBe(true);
    });

    test('applies default values correctly', () => {
      expect(wrapper.vm.size).toBe('md');
      expect(wrapper.vm.type).toBe('normal');
      expect(wrapper.vm.placeholder).toBe('');
      expect(wrapper.vm.optionsLines).toBe(5);
      expect(wrapper.vm.returnObject).toBe(false);
      expect(wrapper.vm.itemLabel).toBe('label');
      expect(wrapper.vm.itemValue).toBe('value');
      expect(wrapper.vm.locale).toBe('en');
      expect(wrapper.vm.enableSearch).toBe(false);
      expect(wrapper.vm.disabled).toBe(false);
    });
  });

  describe('input display', () => {
    test('displays placeholder when no option is selected', () => {
      const input = wrapper.findComponent({ name: 'UnnnicInput' });
      expect(input.props('placeholder')).toBe('');
    });

    test('displays selected option label', async () => {
      await wrapper.setProps({ modelValue: 'option1' });
      const input = wrapper.findComponent({ name: 'UnnnicInput' });
      expect(input.props('modelValue')).toBe('Option 1');
    });

    test('displays custom placeholder', async () => {
      await wrapper.setProps({ placeholder: 'Select an option' });
      const input = wrapper.findComponent({ name: 'UnnnicInput' });
      expect(input.props('placeholder')).toBe('Select an option');
    });

    test('input is readonly', () => {
      const input = wrapper.findComponent({ name: 'UnnnicInput' });
      expect(input.props('readonly')).toBe(true);
    });

    test('input shows correct icon based on popover state', async () => {
      const input = wrapper.findComponent({ name: 'UnnnicInput' });

      // Initially closed
      expect(input.props('iconRight')).toBe('keyboard_arrow_down');

      // When popover is open
      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      expect(input.props('iconRight')).toBe('keyboard_arrow_up');
    });
  });

  describe('option selection', () => {
    test('emits update:modelValue when option is selected', async () => {
      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      const options = wrapper.findAllComponents(
        '[data-testid="select-option"]',
      );

      await options[0].vm.$emit('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['option1']);
    });

    test('emits object when returnObject is true', async () => {
      await wrapper.setProps({ returnObject: true });
      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      const options = wrapper.findAllComponents(
        '[data-testid="select-option"]',
      );

      await options[0].vm.$emit('click');

      expect(wrapper.emitted('update:modelValue')[0]).toEqual([
        { label: 'Option 1', value: 'option1' },
      ]);
    });

    test('does not emit when same option is selected', async () => {
      await wrapper.setProps({ modelValue: 'option1' });
      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      const options = wrapper.findAllComponents(
        '[data-testid="select-option"]',
      );

      await options[0].vm.$emit('click');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });

    test('does not emit when disabled option is clicked', async () => {
      const disabledOptions = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Disabled Option', value: 'disabled', disabled: true },
      ];

      await wrapper.setProps({ options: disabledOptions });
      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      const options = wrapper.findAllComponents(
        '[data-testid="select-option"]',
      );

      await options[1].vm.$emit('click');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });
  });

  describe('search functionality', () => {
    test('renders search input when enableSearch is true', async () => {
      await wrapper.setProps({ enableSearch: true });
      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      const searchInputs = wrapper.findAllComponents({ name: 'UnnnicInput' });
      expect(searchInputs.length).toBe(2); // Main input + search input
    });

    test('does not render search input when enableSearch is false', async () => {
      await wrapper.setProps({ enableSearch: false, modelValue: true });
      const searchInputs = wrapper.findAllComponents({ name: 'UnnnicInput' });
      expect(searchInputs.length).toBe(1); // Only main input
    });

    test('emits update:search when search input changes', async () => {
      await wrapper.setProps({ enableSearch: true });
      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      const searchInput = wrapper.findAllComponents({ name: 'UnnnicInput' })[1];

      await searchInput.vm.$emit('update:modelValue', 'test search');

      expect(wrapper.emitted('update:search')).toBeTruthy();
      expect(wrapper.emitted('update:search')[0]).toEqual(['test search']);
    });

    test('filters options based on search term', async () => {
      await wrapper.setProps({ enableSearch: true, search: 'Option 1' });

      const filteredOptions = wrapper.vm.filteredOptions;
      expect(filteredOptions.length).toBe(1);
      expect(filteredOptions[0].label).toBe('Option 1');
    });

    test('filters options by both label and value', async () => {
      await wrapper.setProps({ enableSearch: true, search: 'option1' });

      const filteredOptions = wrapper.vm.filteredOptions;
      expect(filteredOptions.length).toBe(1);
      expect(filteredOptions[0].value).toBe('option1');
    });

    test('shows all options when search is empty', async () => {
      await wrapper.setProps({ enableSearch: true, search: '' });

      const filteredOptions = wrapper.vm.filteredOptions;
      expect(filteredOptions.length).toBe(3);
    });
  });

  describe('computed properties', () => {
    test('calculatedPopoverHeight returns correct value', () => {
      const maxHeight = wrapper.vm.calculatedPopoverHeight;
      expect(maxHeight).toBe('235px');
    });

    test('calculatedPopoverHeight includes search height when enabled', async () => {
      await wrapper.setProps({ enableSearch: true });
      const maxHeight = wrapper.vm.calculatedPopoverHeight;
      expect(maxHeight).toBe('282px');
    });

    test('calculatedPopoverHeight returns unset when no options', async () => {
      await wrapper.setProps({ options: [] });
      const maxHeight = wrapper.vm.calculatedPopoverHeight;
      expect(maxHeight).toBe('unset');
    });

    test('selectedItem returns correct item for returnObject false', async () => {
      await wrapper.setProps({ modelValue: 'option2' });
      const selectedItem = wrapper.vm.selectedItem;
      expect(selectedItem.label).toBe('Option 2');
      expect(selectedItem.value).toBe('option2');
    });

    test('selectedItem returns modelValue for returnObject true', async () => {
      const selectedOption = { label: 'Option 2', value: 'option2' };
      await wrapper.setProps({
        returnObject: true,
        modelValue: selectedOption,
      });
      const selectedItem = wrapper.vm.selectedItem;
      expect(selectedItem).toStrictEqual(selectedOption);
    });

    test('inputValue returns correct label', async () => {
      await wrapper.setProps({ modelValue: 'option3' });
      const inputValue = wrapper.vm.inputValue;
      expect(inputValue).toBe('Option 3');
    });

    test('inputValue returns undefined when no selection', () => {
      const inputValue = wrapper.vm.inputValue;
      expect(inputValue).toBeUndefined();
    });
  });

  describe('disabled state', () => {
    test('passes disabled prop to input', async () => {
      await wrapper.setProps({ disabled: true });
      const input = wrapper.findComponent({ name: 'UnnnicInput' });
      expect(input.props('disabled')).toBe(true);
    });

    test('input is not disabled by default', () => {
      const input = wrapper.findComponent({ name: 'UnnnicInput' });
      expect(input.props('disabled')).toBe(false);
    });
  });

  describe('size prop', () => {
    test('passes size prop to input', async () => {
      await wrapper.setProps({ size: 'sm' });
      const input = wrapper.findComponent({ name: 'UnnnicInput' });
      expect(input.props('size')).toBe('sm');
    });

    test('defaults to md size', () => {
      const input = wrapper.findComponent({ name: 'UnnnicInput' });
      expect(input.props('size')).toBe('md');
    });
  });

  describe('label and message props', () => {
    test('passes label prop to input', async () => {
      await wrapper.setProps({ label: 'Select Label' });
      const input = wrapper.findComponent({ name: 'UnnnicInput' });
      expect(input.props('label')).toBe('Select Label');
    });

    test('passes message prop to input', async () => {
      await wrapper.setProps({ message: 'Select Message' });
      const input = wrapper.findComponent({ name: 'UnnnicInput' });
      expect(input.props('message')).toBe('Select Message');
    });

    test('passes errors prop to input', async () => {
      await wrapper.setProps({ errors: 'Error message' });
      const input = wrapper.findComponent({ name: 'UnnnicInput' });
      expect(input.props('errors')).toBe('Error message');
    });
  });

  describe('custom item keys', () => {
    test('uses custom itemLabel and itemValue', async () => {
      const customOptions = [
        { name: 'Custom 1', id: 'custom1' },
        { name: 'Custom 2', id: 'custom2' },
      ];

      await wrapper.setProps({
        options: customOptions,
        itemLabel: 'name',
        itemValue: 'id',
        modelValue: 'custom1',
      });

      const inputValue = wrapper.vm.inputValue;
      expect(inputValue).toBe('Custom 1');
    });
  });

  describe('edge cases', () => {
    test('handles empty options array', async () => {
      await wrapper.setProps({ options: [] });
      expect(wrapper.vm.filteredOptions).toEqual([]);
      expect(wrapper.vm.calculatedPopoverHeight).toBe('unset');
    });

    test('handles null modelValue', async () => {
      await wrapper.setProps({ modelValue: null });
      expect(wrapper.vm.inputValue).toBeUndefined();
      expect(wrapper.vm.selectedItem).toBeUndefined();
    });

    test('handles undefined modelValue', async () => {
      await wrapper.setProps({ modelValue: undefined });
      expect(wrapper.vm.inputValue).toBeUndefined();
      expect(wrapper.vm.selectedItem).toBeUndefined();
    });

    test('handles case insensitive search', async () => {
      await wrapper.setProps({ enableSearch: true, search: 'OPTION 1' });
      const filteredOptions = wrapper.vm.filteredOptions;
      expect(filteredOptions.length).toBe(1);
      expect(filteredOptions[0].label).toBe('Option 1');
    });

    test('handles partial search matches', async () => {
      await wrapper.setProps({ enableSearch: true, search: 'tion' });
      const filteredOptions = wrapper.vm.filteredOptions;
      expect(filteredOptions.length).toBe(3); // All options contain 'tion'
    });
  });

  describe('component structure', () => {
    test('has correct component name', () => {
      expect(wrapper.vm.$options.name).toBe('UnnnicSelect');
    });

    test('includes i18n mixin', () => {
      expect(wrapper.vm.$options.mixins).toBeDefined();
    });
  });

  describe('snapshot testing', () => {
    test('matches snapshot with default props', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    test('matches snapshot with selected value', async () => {
      await wrapper.setProps({ modelValue: 'option1' });
      expect(wrapper.html()).toMatchSnapshot();
    });

    test('matches snapshot with search enabled', async () => {
      await wrapper.setProps({ enableSearch: true, modelValue: true });
      expect(wrapper.html()).toMatchSnapshot();
    });

    test('matches snapshot with disabled state', async () => {
      await wrapper.setProps({ disabled: true });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});

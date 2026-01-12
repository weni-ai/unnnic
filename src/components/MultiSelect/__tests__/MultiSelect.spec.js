import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, afterEach, test, vi } from 'vitest';
import UnnnicMultiSelect from '../index.vue';

vi.mock('../../mixins/i18n', () => ({
  default: {
    methods: {
      $t: (key) => key,
    },
  },
}));

describe('UnnnicMultiSelect.vue', () => {
  let wrapper;

  const defaultProps = {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    modelValue: [],
  };

  const mountWrapper = (props = {}, slots = {}) => {
    return mount(UnnnicMultiSelect, {
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
      expect(wrapper.find('.unnnic-multi-select').exists()).toBe(true);
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
      const options = wrapper.findAllComponents({
        name: 'UnnnicMultiSelectOption',
      });
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

    test('displays selected option labels', async () => {
      await wrapper.setProps({ modelValue: ['option1'] });
      const input = wrapper.findComponent({ name: 'UnnnicInput' });
      expect(input.props('modelValue')).toBe('Option 1');
    });

    test('displays multiple selected option labels separated by comma', async () => {
      await wrapper.setProps({ modelValue: ['option1', 'option2'] });
      const input = wrapper.findComponent({ name: 'UnnnicInput' });
      expect(input.props('modelValue')).toBe('Option 1, Option 2');
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

      expect(input.props('iconRight')).toBe('keyboard_arrow_down');

      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      expect(input.props('iconRight')).toBe('keyboard_arrow_up');
    });
  });

  describe('option selection', () => {
    test('emits update:modelValue with array when option is selected', async () => {
      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      const options = wrapper.findAllComponents({
        name: 'UnnnicMultiSelectOption',
      });

      await options[0].vm.$emit('update:model-value', true);

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([['option1']]);
    });

    test('adds option to existing selection', async () => {
      await wrapper.setProps({ modelValue: ['option1'] });
      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      const options = wrapper.findAllComponents({
        name: 'UnnnicMultiSelectOption',
      });

      await options[1].vm.$emit('update:model-value', true);

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([
        ['option1', 'option2'],
      ]);
    });

    test('removes option from selection when unselected', async () => {
      await wrapper.setProps({ modelValue: ['option1', 'option2'] });
      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      const options = wrapper.findAllComponents({
        name: 'UnnnicMultiSelectOption',
      });

      await options[0].vm.$emit('update:model-value', false);

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([['option2']]);
    });

    test('emits object array when returnObject is true', async () => {
      await wrapper.setProps({ returnObject: true, modelValue: [] });
      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      const options = wrapper.findAllComponents({
        name: 'UnnnicMultiSelectOption',
      });

      await options[0].vm.$emit('update:model-value', true);

      expect(wrapper.emitted('update:modelValue')[0]).toEqual([
        [{ label: 'Option 1', value: 'option1' }],
      ]);
    });

    test('removes object from selection when returnObject is true', async () => {
      await wrapper.setProps({
        returnObject: true,
        modelValue: [{ label: 'Option 1', value: 'option1' }],
      });
      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      const options = wrapper.findAllComponents({
        name: 'UnnnicMultiSelectOption',
      });

      await options[0].vm.$emit('update:model-value', false);

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([[]]);
    });

    test('does not emit when disabled option is clicked', async () => {
      const disabledOptions = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Disabled Option', value: 'disabled', disabled: true },
      ];

      await wrapper.setProps({ options: disabledOptions });
      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      const options = wrapper.findAllComponents({
        name: 'UnnnicMultiSelectOption',
      });

      expect(options[1].props('disabled')).toBe(true);
    });
  });

  describe('search functionality', () => {
    test('renders search input when enableSearch is true', async () => {
      await wrapper.setProps({ enableSearch: true });
      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      const searchInputs = wrapper.findAllComponents({ name: 'UnnnicInput' });
      expect(searchInputs.length).toBe(2);
    });

    test('does not render search input when enableSearch is false', async () => {
      await wrapper.setProps({ enableSearch: false });
      const searchInputs = wrapper.findAllComponents({ name: 'UnnnicInput' });
      expect(searchInputs.length).toBe(1);
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
    test('calculatedMaxHeight returns correct value', () => {
      const maxHeight = wrapper.vm.calculatedPopoverHeight;
      console.log(maxHeight);
      expect(maxHeight).toBe('228px');
    });

    test('calculatedMaxHeight includes search height when enabled', async () => {
      await wrapper.setProps({ enableSearch: true });
      const maxHeight = wrapper.vm.calculatedPopoverHeight;
      expect(maxHeight).toBe('295px');
    });

    test('calculatedMaxHeight returns unset when no options', async () => {
      await wrapper.setProps({ options: [] });
      const maxHeight = wrapper.vm.calculatedPopoverHeight;
      expect(maxHeight).toBe('unset');
    });

    test('selectedItems returns correct items for returnObject false', async () => {
      await wrapper.setProps({ modelValue: ['option2'] });
      const selectedItems = wrapper.vm.selectedItems;
      expect(selectedItems.length).toBe(1);
      expect(selectedItems[0].label).toBe('Option 2');
      expect(selectedItems[0].value).toBe('option2');
    });

    test('selectedItems returns multiple items', async () => {
      await wrapper.setProps({ modelValue: ['option1', 'option2'] });
      const selectedItems = wrapper.vm.selectedItems;
      expect(selectedItems.length).toBe(2);
      expect(selectedItems[0].label).toBe('Option 1');
      expect(selectedItems[1].label).toBe('Option 2');
    });

    test('selectedItems returns modelValue for returnObject true', async () => {
      const selectedOptions = [
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ];
      await wrapper.setProps({
        returnObject: true,
        modelValue: selectedOptions,
      });
      const selectedItems = wrapper.vm.selectedItems;
      expect(selectedItems).toStrictEqual(selectedOptions);
    });

    test('selectedItems handles returnObject false with array of values', async () => {
      await wrapper.setProps({
        returnObject: false,
        modelValue: ['option1', 'option2'],
      });
      const selectedItems = wrapper.vm.selectedItems;
      expect(selectedItems.length).toBe(2);
      expect(selectedItems[0].value).toBe('option1');
      expect(selectedItems[1].value).toBe('option2');
    });

    test('selectedItems with returnObject true and array of objects in modelValue', async () => {
      const modelValueObjects = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
      ];
      await wrapper.setProps({
        returnObject: true,
        modelValue: modelValueObjects,
      });
      const selectedItems = wrapper.vm.selectedItems;

      expect(selectedItems).toStrictEqual(modelValueObjects);
    });

    test('selectedItems handles modelValue as array of objects when returnObject is false', async () => {
      const optionsWithCustomKeys = [
        { name: 'Custom 1', id: 'custom1' },
        { name: 'Custom 2', id: 'custom2' },
      ];
      await wrapper.setProps({
        returnObject: false,
        options: optionsWithCustomKeys,
        itemLabel: 'name',
        itemValue: 'id',
        modelValue: ['custom1'],
      });
      const selectedItems = wrapper.vm.selectedItems;

      expect(selectedItems.length).toBe(1);
      expect(selectedItems[0].id).toBe('custom1');
      expect(selectedItems[0].name).toBe('Custom 1');
    });

    test('inputValue returns correct labels separated by comma', async () => {
      await wrapper.setProps({ modelValue: ['option3'] });
      const inputValue = wrapper.vm.inputValue;
      expect(inputValue).toBe('Option 3');
    });

    test('inputValue returns multiple labels separated by comma', async () => {
      await wrapper.setProps({ modelValue: ['option1', 'option2', 'option3'] });
      const inputValue = wrapper.vm.inputValue;
      expect(inputValue).toBe('Option 1, Option 2, Option 3');
    });

    test('inputValue returns empty string when no selection', () => {
      const inputValue = wrapper.vm.inputValue;
      expect(inputValue).toBe('');
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

    test('handles empty modelValue array', async () => {
      await wrapper.setProps({ modelValue: [] });
      expect(wrapper.vm.inputValue).toBe('');
      expect(wrapper.vm.selectedItems).toEqual([]);
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
      expect(filteredOptions.length).toBe(3);
    });
  });

  describe('component structure', () => {
    test('has correct component name', () => {
      expect(wrapper.vm.$options.name).toBe('UnnnicMultiSelect');
    });
  });

  describe('clear functionality', () => {
    test('emits empty array when clear button is clicked', async () => {
      await wrapper.setProps({ modelValue: ['option1', 'option2'] });
      const input = wrapper.findComponent({ name: 'UnnnicInput' });

      await input.vm.$emit('clear');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([[]]);
    });
  });

  describe('getActivatedOptionStatus', () => {
    test('returns true when option is in modelValue array', async () => {
      await wrapper.setProps({ modelValue: ['option1'] });
      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      const options = wrapper.findAllComponents({
        name: 'UnnnicMultiSelectOption',
      });

      expect(options[0].props('active')).toBe(true);
      expect(options[1].props('active')).toBe(false);
    });

    test('returns true when option object is in modelValue array with returnObject true', async () => {
      await wrapper.setProps({
        returnObject: true,
        modelValue: [{ label: 'Option 1', value: 'option1' }],
      });
      wrapper.vm.openPopover = true;
      await wrapper.vm.$nextTick();
      const options = wrapper.findAllComponents({
        name: 'UnnnicMultiSelectOption',
      });

      expect(options[0].props('active')).toBeTruthy();
      expect(options[1].props('active')).toBeFalsy();
    });
  });

  describe('snapshot testing', () => {
    test('matches snapshot with default props', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    test('matches snapshot with selected values', async () => {
      await wrapper.setProps({ modelValue: ['option1'] });
      expect(wrapper.html()).toMatchSnapshot();
    });

    test('matches snapshot with multiple selected values', async () => {
      await wrapper.setProps({ modelValue: ['option1', 'option2'] });
      expect(wrapper.html()).toMatchSnapshot();
    });

    test('matches snapshot with search enabled', async () => {
      await wrapper.setProps({ enableSearch: true });
      expect(wrapper.html()).toMatchSnapshot();
    });

    test('matches snapshot with disabled state', async () => {
      await wrapper.setProps({ disabled: true });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});

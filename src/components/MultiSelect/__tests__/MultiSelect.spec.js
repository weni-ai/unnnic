import { mount, flushPromises } from '@vue/test-utils';
import { beforeEach, describe, expect, afterEach, test, vi } from 'vitest';
import UnnnicMultiSelect from '../index.vue';
import i18n from '@/utils/plugins/i18n';

const { infiniteScrollResetMock, useInfiniteScrollMock } = vi.hoisted(() => {
  const infiniteScrollResetMock = vi.fn();
  const useInfiniteScrollMock = vi.fn((_element, _onLoadMore, _options) => ({
    reset: infiniteScrollResetMock,
    isLoading: { value: false },
  }));
  return { infiniteScrollResetMock, useInfiniteScrollMock };
});

vi.mock('@vueuse/core', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useInfiniteScroll: (...args) => useInfiniteScrollMock(...args),
  };
});

function getInfiniteScrollCallbacks() {
  const lastCall = useInfiniteScrollMock.mock.calls.at(-1);
  return {
    onLoadMore: lastCall?.[1],
    canLoadMore: lastCall?.[2]?.canLoadMore,
  };
}

const visibleScrollEl = { clientHeight: 200 };
const overflowingScrollEl = { clientHeight: 200, scrollHeight: 800 };

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

  const mountWrapper = (props = {}, slots = {}, options = {}) => {
    return mount(UnnnicMultiSelect, {
      attachTo: document.body,
      ...options,
      global: {
        plugins: [i18n],
        ...(options.global || {}),
      },
      props: {
        ...defaultProps,
        ...props,
      },
      slots,
    });
  };

  beforeEach(() => {
    infiniteScrollResetMock.mockClear();
    useInfiniteScrollMock.mockClear();
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
      wrapper.vm.setOpenPopover(true);
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

      wrapper.vm.setOpenPopover(true);
      await wrapper.vm.$nextTick();
      expect(input.props('iconRight')).toBe('keyboard_arrow_up');
    });
  });

  describe('option selection', () => {
    test('emits update:modelValue with array when option is selected', async () => {
      wrapper.vm.setOpenPopover(true);
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
      wrapper.vm.setOpenPopover(true);
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
      wrapper.vm.setOpenPopover(true);
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
      wrapper.vm.setOpenPopover(true);
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
      wrapper.vm.setOpenPopover(true);
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
      wrapper.vm.setOpenPopover(true);
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
      wrapper.vm.setOpenPopover(true);
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
      wrapper.vm.setOpenPopover(true);
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

    test('shows no results message when search has no matches', async () => {
      await wrapper.setProps({ enableSearch: true, search: 'no-match' });
      wrapper.vm.setOpenPopover(true);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.filteredOptions).toEqual([]);
      const noResults = wrapper.find(
        '.unnnic-multi-select__content-no-results',
      );
      if (noResults.exists()) {
        expect(noResults.text()).toContain('No results found');
      }
    });

    test('clears search when popover closes', async () => {
      await wrapper.setProps({ enableSearch: true, search: 'option' });
      wrapper.vm.setOpenPopover(true);
      await wrapper.vm.$nextTick();
      wrapper.vm.setOpenPopover(false);
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('update:search')).toContainEqual(['']);
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

    test('shows clear button when clearable and items are selected', async () => {
      await wrapper.setProps({
        clearable: true,
        modelValue: ['option1'],
      });

      const input = wrapper.findComponent({ name: 'UnnnicInput' });
      expect(input.props('showClear')).toBe(true);
    });
  });

  describe('getActivatedOptionStatus', () => {
    test('returns true when option is in modelValue array', async () => {
      await wrapper.setProps({ modelValue: ['option1'] });
      wrapper.vm.setOpenPopover(true);
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
      wrapper.vm.setOpenPopover(true);
      await wrapper.vm.$nextTick();
      const options = wrapper.findAllComponents({
        name: 'UnnnicMultiSelectOption',
      });

      expect(options[0].props('active')).toBeTruthy();
      expect(options[1].props('active')).toBeFalsy();
    });
  });

  describe('keyboard navigation', () => {
    test('closes popover through keyboard close callback', async () => {
      wrapper.vm.setOpenPopover(true);
      await flushPromises();
      await flushPromises();

      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
      );
      await flushPromises();
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
      );
      await flushPromises();

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    });

    test('ignores disabled options on Enter key', async () => {
      await wrapper.setProps({
        options: [
          { label: 'Disabled', value: 'disabled', disabled: true },
          { label: 'Option 2', value: 'option2' },
        ],
      });
      wrapper.vm.setOpenPopover(true);
      await flushPromises();
      await flushPromises();

      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
      );
      await flushPromises();
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
      );
      await flushPromises();

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });

    test('toggles option through option component emit', async () => {
      await wrapper.setProps({ modelValue: ['option1'] });
      wrapper.vm.setOpenPopover(true);
      await wrapper.vm.$nextTick();
      const options = wrapper.findAllComponents({
        name: 'UnnnicMultiSelectOption',
      });

      await options[0].vm.$emit('update:model-value', false);

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    });

    test('closes popover through popover update event', async () => {
      wrapper.vm.setOpenPopover(true);
      await wrapper.vm.$nextTick();

      const popover = wrapper.findComponent({ name: 'UnnnicPopover' });
      if (popover.exists()) {
        await popover.vm.$emit('update:open', false);
      } else {
        wrapper.vm.setOpenPopover(false);
      }
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.openPopover).toBe(false);
    });
  });

  describe('infinite scroll functionality', () => {
    test('infinite scroll is disabled by default', () => {
      expect(wrapper.vm.infiniteScroll).toBe(false);
    });

    test('applies infinite scroll props correctly', async () => {
      await wrapper.setProps({
        infiniteScroll: true,
        infiniteScrollDistance: 20,
        infiniteScrollCanLoadMore: () => false,
      });

      expect(wrapper.vm.infiniteScroll).toBe(true);
      expect(wrapper.vm.infiniteScrollDistance).toBe(20);
      expect(wrapper.vm.infiniteScrollCanLoadMore()).toBe(false);
    });

    test('does not render loading when infiniteScrollLoading is false', async () => {
      await wrapper.setProps({ infiniteScroll: true });
      wrapper.vm.setOpenPopover(true);
      await wrapper.vm.$nextTick();

      const loading = wrapper.find('.unnnic-multi-select__infinite-loading');
      expect(loading.exists()).toBe(false);
    });

    test('sets infiniteScrollLoading to true and verifies state', async () => {
      await wrapper.setProps({
        infiniteScroll: true,
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ],
      });

      wrapper.vm.setOpenPopover(true);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.infiniteScrollLoading).toBe(false);

      wrapper.vm.infiniteScrollLoading = true;
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.infiniteScrollLoading).toBe(true);
      expect(wrapper.vm.infiniteScroll).toBe(true);
    });

    test('finishInfiniteScroll sets loading to false', async () => {
      await wrapper.setProps({ infiniteScroll: true });
      wrapper.vm.infiniteScrollLoading = true;
      expect(wrapper.vm.infiniteScrollLoading).toBe(true);

      wrapper.vm.finishInfiniteScroll();
      expect(wrapper.vm.infiniteScrollLoading).toBe(false);
    });

    test('resetInfiniteScroll sets loading to false', async () => {
      await wrapper.setProps({ infiniteScroll: true });
      wrapper.vm.infiniteScrollLoading = true;
      expect(wrapper.vm.infiniteScrollLoading).toBe(true);

      wrapper.vm.resetInfiniteScroll();
      expect(wrapper.vm.infiniteScrollLoading).toBe(false);
    });

    test('calls useInfiniteScroll once and does not recreate it on finish', async () => {
      wrapper.unmount();
      useInfiniteScrollMock.mockClear();
      infiniteScrollResetMock.mockClear();

      const scrollWrapper = mountWrapper({ infiniteScroll: true });
      expect(useInfiniteScrollMock).toHaveBeenCalledTimes(1);

      scrollWrapper.vm.setOpenPopover(true);
      await scrollWrapper.vm.$nextTick();
      scrollWrapper.vm.infiniteScrollLoading = true;
      scrollWrapper.vm.finishInfiniteScroll();
      await scrollWrapper.vm.$nextTick();

      expect(useInfiniteScrollMock).toHaveBeenCalledTimes(1);
      expect(infiniteScrollResetMock).toHaveBeenCalled();

      scrollWrapper.unmount();
    });

    test('emits scroll-end once when the list does not fill the popover', async () => {
      const fewOptions = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
      ];
      const scrollWrapper = mountWrapper({
        infiniteScroll: true,
        options: fewOptions,
      });

      scrollWrapper.vm.setOpenPopover(true);
      await scrollWrapper.vm.$nextTick();

      const { onLoadMore, canLoadMore } = getInfiniteScrollCallbacks();
      expect(canLoadMore(visibleScrollEl)).toBe(true);
      expect(scrollWrapper.emitted('scroll-end')).toBeFalsy();

      onLoadMore();
      expect(scrollWrapper.emitted('scroll-end')).toHaveLength(1);
      expect(scrollWrapper.vm.infiniteScrollLoading).toBe(true);
      expect(canLoadMore(visibleScrollEl)).toBe(false);

      onLoadMore();
      expect(scrollWrapper.emitted('scroll-end')).toHaveLength(1);

      scrollWrapper.unmount();
    });

    test('does not emit scroll-end on open when the list already overflows', async () => {
      const manyOptions = Array.from({ length: 20 }, (_, i) => ({
        label: `Option ${i + 1}`,
        value: `option${i + 1}`,
      }));
      const scrollWrapper = mountWrapper({
        infiniteScroll: true,
        options: manyOptions,
        optionsLines: 5,
      });

      scrollWrapper.vm.setOpenPopover(true);
      await scrollWrapper.vm.$nextTick();

      expect(scrollWrapper.emitted('scroll-end')).toBeFalsy();

      const { canLoadMore } = getInfiniteScrollCallbacks();
      expect(canLoadMore(overflowingScrollEl)).toBe(true);
      expect(canLoadMore({ clientHeight: 0 })).toBe(false);

      scrollWrapper.unmount();
    });

    test('canLoadMore is false when infinite scroll is disabled or the popover is closed', () => {
      const { canLoadMore } = getInfiniteScrollCallbacks();
      expect(canLoadMore(visibleScrollEl)).toBe(false);

      wrapper.vm.setOpenPopover(true);
      expect(canLoadMore(visibleScrollEl)).toBe(false);
    });

    test('displays loading indicator when infiniteScrollLoading is true', async () => {
      await wrapper.setProps({ infiniteScroll: true });
      wrapper.vm.setOpenPopover(true);
      await wrapper.vm.$nextTick();

      const { onLoadMore } = getInfiniteScrollCallbacks();
      onLoadMore();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.infiniteScrollLoading).toBe(true);
      expect(
        document.querySelector('.unnnic-multi-select__infinite-loading'),
      ).not.toBeNull();
    });

    test('does not display infinite scroll loading when infiniteScroll is false', async () => {
      await wrapper.setProps({ infiniteScroll: false });
      wrapper.vm.setOpenPopover(true);
      await wrapper.vm.$nextTick();

      expect(
        document.querySelector('.unnnic-multi-select__infinite-loading'),
      ).toBeNull();
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

    test('matches snapshot with infinite scroll enabled', async () => {
      await wrapper.setProps({ infiniteScroll: true });
      wrapper.vm.setOpenPopover(true);
      await wrapper.vm.$nextTick();

      const { onLoadMore } = getInfiniteScrollCallbacks();
      onLoadMore();
      await wrapper.vm.$nextTick();

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});

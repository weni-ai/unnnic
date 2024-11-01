import { vi } from 'vitest';
import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';

import SelectSmart from '../SelectSmart.vue';
import DropdownSkeleton from '../../Dropdown/DropdownSkeleton.vue';

describe('SelectSmart.vue', () => {
  let wrapper;

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
    { label: 'Option 5', value: 'option5' },
  ];

  const mountWrapper = (props = {}) => {
    wrapper = shallowMount(SelectSmart, {
      propsData: {
        options: [],
        ...props,
      },
      global: {
        stubs: {
          DropdownSkeleton,
        },
      },
    });
  };

  beforeEach(() => {
    mountWrapper();
  });

  const selectSmart = () => wrapper.find('[data-testid="select-smart"]');
  const input = () =>
    wrapper.findComponent('[data-testid="select-smart-input"]');
  const optionsContainer = () =>
    wrapper.find('[data-testid="options-container"]');

  describe('Rendering', () => {
    it('should render the component correctly', () => {
      expect(selectSmart().exists()).toBe(true);
    });

    it('should display placeholder text when no selection is made', () => {
      const placeholderText = 'Select an option';
      mountWrapper({ placeholder: placeholderText });

      expect(input().props('placeholder')).toBe(placeholderText);
    });
  });

  describe('Dropdown Visibility', () => {
    it('should open the dropdown when input is clicked', async () => {
      await input().trigger('click');

      expect(optionsContainer().exists()).toBe(true);
    });

    it('should close the dropdown on active is false', async () => {
      wrapper.vm.active = true;
      await nextTick();
      expect(optionsContainer().exists()).toBe(true);

      wrapper.vm.active = false;
      await nextTick();
      expect(optionsContainer().exists()).toBe(false);
    });

    it('should toggle the dropdown visibility on input click', async () => {
      await input().trigger('click');
      expect(optionsContainer().exists()).toBe(true);

      await input().trigger('click');

      expect(optionsContainer().exists()).toBe(false);
    });

    it('should close the dropdown when pressing escape key', async () => {
      await input().trigger('click');
      expect(optionsContainer().exists()).toBe(true);

      await selectSmart().trigger('keydown', { key: 'Escape' });

      expect(optionsContainer().exists()).toBe(false);
    });
  });

  describe('Autocomplete Functionality', () => {
    beforeEach(async () => {
      mountWrapper({
        options: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { label: 'Orange', value: 'orange' },
        ],
      });
    });

    it('should filter options based on search input', async () => {
      wrapper.vm.active = true;
      const filteredOptions = () =>
        wrapper.findAllComponents('[data-testid="option"]');

      await wrapper.setData({ searchValue: 'ap' });

      expect(filteredOptions().length).toBe(1);
      expect(filteredOptions()[0].props('label')).toBe('Apple');

      await wrapper.setData({ searchValue: 'or' });
      expect(filteredOptions().length).toBe(1);
      expect(filteredOptions()[0].props('label')).toBe('Orange');
    });

    it('should clear search input on focus if autocompleteClearOnFocus is true', async () => {
      await wrapper.setProps({
        autocomplete: true,
        autocompleteClearOnFocus: true,
      });
      await wrapper.setData({ searchValue: 'ap' });

      await input().trigger('click');

      expect(wrapper.vm.searchValue).toBe('');
    });
  });

  describe('Option Selection', () => {
    beforeEach(async () => {
      mountWrapper({
        options,
      });

      wrapper.vm.active = true;
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should select a single option', async () => {
      await wrapper.setProps({ modelValue: [] });

      const option = wrapper.findComponent('[data-testid="option"]');
      await option.trigger('click');

      expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([options[0]]);
    });

    it('should add an option to the selection if multiple is true', async () => {
      await wrapper.setProps({
        multiple: true,
        modelValue: [options[0]],
      });

      const optionsElements = wrapper.findAllComponents(
        '[data-testid="option"]',
      );
      await optionsElements[1].trigger('click');

      expect(wrapper.emitted('update:modelValue')[2][0]).toEqual([
        options[0],
        options[1],
      ]);
    });

    it('should unselect an option if clicked again in multiple mode', async () => {
      await wrapper.setProps({
        multiple: true,
        modelValue: [options[0]],
      });

      const optionsElements = wrapper.findAllComponents(
        '[data-testid="option"]',
      );
      await optionsElements[0].trigger('click');

      expect(wrapper.emitted('update:modelValue')[1][0]).toEqual([]);
    });
  });

  describe('Scrolling Behavior', () => {
    beforeEach(async () => {
      mountWrapper({
        options,
      });
    });

    it('should scroll to selected option on opening', async () => {
      wrapper.vm.scrollToOption = vi.fn();
      await wrapper.setProps({
        modelValue: [options[2]],
      });

      await nextTick();
      wrapper.vm.active = true;
      await nextTick();
      await nextTick();

      expect(wrapper.vm.scrollToOption).toHaveBeenCalledWith(2, 'center');
    });

    it('should scroll to focused option when navigating with keyboard', async () => {
      wrapper.vm.active = true;
      await nextTick();

      await selectSmart().trigger('keydown', { key: 'ArrowDown' });

      const optionsElements = wrapper.findAllComponents(
        '[data-testid="option"]',
      );
      const focusedOption = optionsElements.find(
        (option) => option.props('focused') === true,
      );

      expect(focusedOption.exists()).toBe(true);

      const dropdownRect = optionsContainer().element.getBoundingClientRect();
      const focusedRect = focusedOption.element.getBoundingClientRect();

      expect(focusedRect.top).toBeGreaterThanOrEqual(dropdownRect.top);
      expect(focusedRect.bottom).toBeLessThanOrEqual(dropdownRect.bottom);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should select focused option with enter key', async () => {
      wrapper.vm.active = true;
      await wrapper.setData({ focusedOption: options[1] });

      await selectSmart().trigger('keydown', { key: 'Enter' });

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([options[1]]);
    });
  });
});

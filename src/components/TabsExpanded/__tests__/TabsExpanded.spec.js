import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import UnnnicTabsExpanded from '../TabsExpanded.vue';

describe('UnnnicTabsExpanded', () => {
  let wrapper;

  const mockItems = [
    { value: 1, title: 'Tab 1', description: 'Description 1' },
    { value: 2, title: 'Tab 2', description: 'Description 2' },
    { value: 3, title: 'Tab 3', description: 'Description 3' },
  ];

  beforeEach(() => {
    wrapper = mount(UnnnicTabsExpanded, {
      props: {
        modelValue: 1,
        items: mockItems,
      },
      global: {
        stubs: {
          UnnnicIcon: true,
        },
      },
    });
  });

  it('renders correctly with the given items', () => {
    const tabs = wrapper.findAll('[data-testid="tab"]');
    expect(tabs.length).toBe(mockItems.length);

    mockItems.forEach((item, index) => {
      const tab = tabs[index];
      expect(tab.find('[data-testid="tab-title"]').text()).toBe(item.title);
      expect(tab.find('[data-testid="tab-description"]').text()).toBe(
        item.description,
      );
    });
  });

  it('highlights the selected tab', () => {
    const selectedTab = wrapper.findAll('[data-testid="tab"]')[0];
    expect(selectedTab.find('.color-brand-weni-soft').exists()).toBe(true);
  });

  it('emits "update:model-value" when a tab is clicked', async () => {
    const secondTab = wrapper.findAll('[data-testid="tab"]')[1];
    await secondTab.trigger('click');
    expect(wrapper.emitted('update:model-value')).toBeTruthy();
    expect(wrapper.emitted('update:model-value')[0]).toEqual([2]);
  });

  it('emits "close-tab" with the correct item when close icon is clicked', async () => {
    const closeIcon = wrapper.findAll('[data-testid="tab-close-icon"]')[0];
    await closeIcon.trigger('click');
    expect(wrapper.emitted('close-tab')).toBeTruthy();
    expect(wrapper.emitted('close-tab')[0]).toEqual([mockItems[0]]);
  });

  it('emits "back" when the back button is clicked', async () => {
    const backButton = wrapper.find('[data-testid="back"]');
    await backButton.trigger('click');
    expect(wrapper.emitted('back')).toBeTruthy();
  });

  it('emits "add" when the add button is clicked', async () => {
    const addButton = wrapper.find('[data-testid="tab-add"]');
    await addButton.trigger('click');
    expect(wrapper.emitted('add')).toBeTruthy();
  });

  it('renders close icon only for the active tab', () => {
    const closeIcons = wrapper.findAll('[data-testid="tab-close-icon"]');
    expect(closeIcons.length).toBe(1);
    const activeCloseIcon = closeIcons[0];
    expect(activeCloseIcon.exists()).toBe(true);
  });
});

import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import SidebarItem from '../SidebarItem.vue';

const item = {
  label: 'Parent Item',
  icon: 'parent-icon',
  children: [
    { label: 'Child Item 1', icon: 'child-icon-1' },
    { label: 'Child Item 2', icon: 'child-icon-2' },
  ],
};

describe('SidebarItem', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SidebarItem, {
      props: {
        item,
        active: { item: null, childIndex: null },
      },
      global: {
        stubs: {
          Icon: true,
        },
      },
    });
  });

  it('renders the component with required props', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain(item.label);
  });

  it('renders the item icon and toggle arrow icon when there are children', () => {
    expect(wrapper.find('[data-testid="item-icon"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="arrow-icon"]').exists()).toBe(true);
  });

  it('emits "navigate" when item is clicked and has no children', async () => {
    await wrapper.setProps({
      item: { label: 'Single Item', icon: 'single-icon' },
    });

    const sidebarItem = wrapper.find('[data-testid="sidebar-item"]');

    await sidebarItem.trigger('click');

    expect(wrapper.emitted('navigate')).toBeTruthy();
    expect(wrapper.emitted('navigate')[0][0]).toEqual({
      item: { label: 'Single Item', icon: 'single-icon' },
      child: null,
    });
  });

  it('should not emit navigation event if the item is active', async () => {
    await wrapper.setProps({
      item: { label: 'Single Item', icon: 'single-icon' },
      active: { item: true, childIndex: null },
    });
    const sidebarItem = wrapper.find('[data-testid="sidebar-item"]');

    await sidebarItem.trigger('click');

    expect(wrapper.emitted('navigate')).toBeFalsy();
  });

  it('toggles showChildrenList and emits "navigate" when child item is clicked', async () => {
    await wrapper.find('[data-testid="sidebar-item"]').trigger('click');
    expect(wrapper.vm.showChildrenList).toBe(true);

    await wrapper
      .findAll('[data-testid="sidebar-item-child"]')[1]
      .trigger('click');
    expect(wrapper.emitted('navigate')).toBeTruthy();
    expect(wrapper.emitted('navigate')[0][0]).toEqual({
      item,
      child: item.children[1],
    });
  });

  it('automatically navigates to the first child if autoNavigateFirstChild is true', async () => {
    await wrapper.setProps({ autoNavigateFirstChild: true });

    await wrapper.find('[data-testid="sidebar-item"]').trigger('click');
    expect(wrapper.emitted('navigate')).toBeTruthy();
    expect(wrapper.emitted('navigate')[0][0]).toEqual({
      item,
      child: item.children[0],
    });
  });

  it('calls handleShowChildrenList on mount if active.childIndex is a valid number and active.item is true', async () => {
    const wrapper = mount(SidebarItem, {
      props: {
        item,
        active: { item: true, childIndex: 0 },
      },
    });

    expect(wrapper.vm.showChildrenList).toBe(true);
  });
});

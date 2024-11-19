import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';

import Sidebar from '../index.vue';

const items = [
  { label: 'Item 1', icon: 'icon-1', children: [] },
  { label: 'Item 2', icon: 'icon-2', children: [] },
];

describe('Sidebar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Sidebar, {
      props: { items },
      global: { stubs: { SidebarItem: true } },
    });
  });

  it('validates position prop correctly', () => {
    const validator = Sidebar.props.position.validator;
    expect(validator('left')).toBe(true);
    expect(validator('right')).toBe(true);
    expect(validator('center')).toBe(false);
  });

  it('renders the sidebar with correct position', () => {
    expect(wrapper.classes()).toContain(
      `unnnic-sidebar--${wrapper.props().position}`,
    );
  });

  it('renders the items as SidebarItem components', () => {
    const sidebarItems = wrapper.findAllComponents(
      '[data-testid="sidebar-item"]',
    );
    expect(sidebarItems.length).toBe(items.length);
  });

  it('emits "navigate" event when handleNavigate is called', async () => {
    await wrapper
      .findComponent('[data-testid="sidebar-item"]')
      .vm.$emit('navigate', { item: items[0], child: null });

    expect(wrapper.emitted('navigate')).toBeTruthy();
    expect(wrapper.emitted('navigate')[0]).toEqual([
      { item: items[0], child: null },
    ]);
  });

  it('validates width prop correctly', () => {
    const validator = Sidebar.props.width.validator;
    expect(validator('100px')).toBe(true);
    expect(validator('50%')).toBe(true);
    expect(validator('100')).toBe(false);
    expect(validator('100em')).toBe(false);
  });

  describe('shoult emit error on invalid props', () => {
    it('empty items array', () => {
      try {
        mount(Sidebar, { props: { items: [] } });
      } catch (error) {
        expect(error).toStrictEqual(
          new Error('Items property cannot be an empty array.'),
        );
      }
    });

    it('invalid item', () => {
      try {
        mount(Sidebar, { props: { items: [{ label: '' }] } });
      } catch (error) {
        expect(error).toStrictEqual(
          new Error('Each item in "items" must have "label".'),
        );
      }
    });

    it('invalid child item', () => {
      try {
        mount(Sidebar, {
          props: { items: [{ label: 'parent', children: [{ label: '' }] }] },
        });
      } catch (error) {
        expect(error).toStrictEqual(
          new Error('Each item in "items" must have "label".'),
        );
      }
    });
  });
});

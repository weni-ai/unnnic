import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import PageHeader from '../PageHeader.vue';

const mountPageHeader = (props = {}, slots = {}) =>
  mount(PageHeader, {
    props: {
      title: 'Page title',
      ...props,
    },
    slots,
    global: {
      stubs: {
        UnnnicButton: {
          template:
            '<button data-testid="back-button-stub" @click="$emit(\'click\')"><slot /></button>',
        },
      },
    },
  });

describe('PageHeader', () => {
  it('renders title and description', () => {
    const wrapper = mountPageHeader({
      description: 'Page description',
    });

    expect(wrapper.find('[data-testid="page-title"]').text()).toBe(
      'Page title',
    );
    expect(wrapper.find('[data-testid="page-description"]').text()).toBe(
      'Page description',
    );
  });

  it('renders back button and emits back event', async () => {
    const wrapper = mountPageHeader({ hasBackButton: true });

    expect(wrapper.classes()).toContain('page-header--has-back-button');
    await wrapper.find('[data-testid="back-button"]').trigger('click');
    expect(wrapper.emitted('back')).toBeTruthy();
  });

  it('renders actions slot', () => {
    const wrapper = mountPageHeader(
      {},
      {
        actions: '<button data-testid="action-btn">Action</button>',
      },
    );

    expect(wrapper.find('[data-testid="page-actions"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="action-btn"]').exists()).toBe(true);
  });

  it('renders tabs slot and removes divider class', () => {
    const wrapper = mountPageHeader(
      {},
      {
        tabs: '<nav data-testid="tabs-nav">Tabs</nav>',
      },
    );

    expect(wrapper.find('[data-testid="page-tabs"]').exists()).toBe(true);
    expect(wrapper.classes()).toContain('page-header--no-divider');
  });

  it('hides divider when hideDivider is true', () => {
    const wrapper = mountPageHeader({ hideDivider: true });

    expect(wrapper.classes()).toContain('page-header--no-divider');
  });

  it('renders custom infos slot', () => {
    const wrapper = mountPageHeader(
      {},
      {
        infos: '<section data-testid="custom-infos">Custom</section>',
      },
    );

    expect(wrapper.find('[data-testid="custom-infos"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="page-title"]').exists()).toBe(false);
  });

  it('renders tag slot inside default infos', () => {
    const wrapper = mountPageHeader(
      {},
      {
        tag: '<span data-testid="header-tag">Tag</span>',
      },
    );

    expect(wrapper.find('[data-testid="header-tag"]').exists()).toBe(true);
  });
});

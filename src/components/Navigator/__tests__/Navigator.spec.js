import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';

import UnnnicNavigator from '../index.vue';

const pages = ['Page 1', 'Page 2', 'Page 3'];
const activePage = 'Page 2';

const createWrapper = (props = {}) => {
  return mount(UnnnicNavigator, { props: { pages, activePage, ...props } });
};

describe('UnnnicNavigator.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper();
  });
  it('renders the correct number of pages', () => {
    const pageElements = wrapper.findAll('[data-testid="navigator-page"]');
    expect(pageElements.length).toBe(pages.length);
  });
  it('applies the correct class for the active page', () => {
    const activePageElement = wrapper.find(
      '.unnnic-navigator-pages__page--current',
    );
    expect(activePageElement.exists()).toBe(true);
    expect(activePageElement.text()).toContain(activePage);
  });
  it('applies the correct class for pages before the active page', () => {
    const beforePageElements = wrapper.findAll(
      '.unnnic-navigator-pages__page--before',
    );
    expect(beforePageElements.length).toBe(1);
    expect(beforePageElements.at(0).text()).toContain('Page 1');
  });
  it('does not apply the "before" or "current" class to pages after the active page', () => {
    const afterPageElement = wrapper
      .findAll('[data-testid="navigator-page"]')
      .at(2);
    expect(afterPageElement.classes()).not.toContain(
      'unnnic-navigator-pages__page--before',
    );
    expect(afterPageElement.classes()).not.toContain(
      'unnnic-navigator-pages__page--current',
    );
  });
  it('displays the correct titles for each page', () => {
    const pageElements = wrapper.findAll(
      '[data-testid="navigator-page-title"]',
    );
    pages.forEach((page, index) => {
      expect(pageElements.at(index).text()).toBe(page);
    });
  });
});

import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import puppeteer from 'puppeteer';

import Checkbox from '../Checkbox.vue';

const createWrapper = (props) => {
  return mount(Checkbox, {
    props,
  });
};

describe('Checkbox', () => {
  let wrapper;

  it('should render right label', () => {
    wrapper = createWrapper({ textRight: 'Label Test' });
    const label = wrapper.find('[data-testid="checkbox-text-right"]');
    expect(label.text()).eq('Label Test');
  });

  it('should checkbox emit change events', async () => {
    wrapper = createWrapper();
    const checkbox = wrapper.findComponent({ name: 'Icon' });

    // click false to true
    await checkbox.trigger('click');
    expect(wrapper.emitted('change')[0][0]).eq(true);

    // click true to false
    await wrapper.setProps({ modelValue: true });
    await checkbox.trigger('click');
    expect(wrapper.emitted('change')[1][0]).eq(false);

    // click less to false
    await wrapper.setProps({ modelValue: 'less' });
    expect(wrapper.vm.icon).eq('checkbox-less');
    await checkbox.trigger('click');
    expect(wrapper.emitted('change')[2][0]).eq(false);
  });

  it('should checkbox disabled', async () => {
    wrapper = createWrapper({ disabled: true });
    const checkbox = wrapper.findComponent({ name: 'Icon' });
    await checkbox.trigger('click');
    expect(wrapper.emitted('change')).eq(undefined);
  });

  it('should define sizes', async () => {
    wrapper = createWrapper({ size: 'sm', textRight: 'Label' });
    const checkbox = wrapper.findComponent({ name: 'Icon' });
    const label = wrapper.find('.unnnic-checkbox__label');

    // sm
    expect(checkbox.classes()).include('unnnic-icon__size--sm');
    expect(label.classes()).include('unnnic-checkbox__label__sm');

    // md
    await wrapper.setProps({ size: 'md' });
    expect(checkbox.classes()).include('unnnic-icon__size--md');
    expect(label.classes()).include('unnnic-checkbox__label__md');
  });
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  afterEach(() => {
    if (page) {
      page.close();
    }
  });

  it.only('should match visual snapshot', async () => {
    const wrapper = createWrapper({ size: 'sm', textRight: 'Label Test' });

    // Set the content of the page to the component's HTML
    await page.setContent(wrapper.html());

    // Capture the screenshot
    const screenshot = await page.screenshot();

    // Compare the screenshot with the saved snapshot
    expect(screenshot).toMatchImageSnapshot();
  });
});

import { beforeEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import Button from '../Button.vue';

const createWrapper = (props) => {
  return mount(Button, { props });
};

describe('Button', () => {
  it('should render text and default props', () => {
    const wrapper = createWrapper({ text: 'Button' });
    expect(wrapper.text()).contain('Button');
    expect(wrapper.classes()).toContain('unnnic-button');
    expect(wrapper.classes()).toContain('unnnic-button--size-large');
    expect(wrapper.classes()).toContain('unnnic-button--primary');
  });

  it('should render left icon and text', () => {
    const wrapper = createWrapper({ iconLeft: 'search-1', text: 'Search' });

    const buttonChildren = wrapper.findComponent({
      name: 'UnnnicButton',
    }).element.children;

    expect(
      buttonChildren[0].classList.contains('unnnic-button__icon-left'),
    ).toBe(true);
    expect(buttonChildren[1].classList.contains('unnnic-button__label')).toBe(
      true,
    );
  });

  it('should render right icon', () => {
    const wrapper = createWrapper({ iconRight: 'search-1', text: 'Search' });

    const buttonChildren = wrapper.findComponent({
      name: 'UnnnicButton',
    }).element.children;

    expect(buttonChildren[0].classList.contains('unnnic-button__label')).toBe(
      true,
    );

    expect(
      buttonChildren[1].classList.contains('unnnic-button__icon-right'),
    ).toBe(true);
  });

  it('should render button only icon and float variation', async () => {
    const wrapper = createWrapper({ iconCenter: 'search-1' });

    expect(wrapper.classes()).toContain('unnnic-button--icon-on-center');

    const buttonChildren = wrapper.findComponent({
      name: 'UnnnicButton',
    }).element.children;

    expect(buttonChildren[0].classList.contains('unnnic-icon')).toBe(true);
    expect(wrapper.text()).toBe('');

    await wrapper.setProps({ float: true });

    expect(wrapper.classes()).toContain('unnnic-button--float');
  });

  it('should emit click event', async () => {
    const wrapper = createWrapper({ text: 'Button' });
    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('should disable click event', async () => {
    const wrapper = createWrapper({ text: 'Button', disabled: true });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBe(undefined);
  });

  it('should show loading variation and disable click', async () => {
    const wrapper = createWrapper({ loading: true });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBe(undefined);

    const loadingIcon = wrapper.findComponent('[data-testid="icon-loading"]');
    expect(loadingIcon.exists()).toBe(true);
  });
});

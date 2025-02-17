import { beforeEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import Button from '../Button.vue';

const createWrapper = (props, slots = {}) => {
  return mount(Button, { props, slots });
};

describe('Button', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper({ text: 'Button' });
  });

  it('should render button text', () => {
    expect(wrapper.text()).contain('Button');
    const wrapperWithSlotedText = createWrapper({}, { default: 'Button' });
    expect(wrapperWithSlotedText.text()).contain('Button');
  });

  it('should render icon before button text', async () => {
    await wrapper.setProps({ iconLeft: 'search-1' });

    // This check ensures that the icon is placed before the button text
    const buttonChildren = wrapper.findComponent({
      name: 'UnnnicButton',
    }).element.children;

    expect(buttonChildren[0].getAttribute('data-testid')).toBe('icon-left');
    expect(buttonChildren[1].getAttribute('data-testid')).toBe('button-label');
  });

  it('should render icon after button text', async () => {
    await wrapper.setProps({ iconRight: 'search-1' });

    // This check ensures that the icon is rendered after the button text
    const buttonChildren = wrapper.findComponent({
      name: 'UnnnicButton',
    }).element.children;

    expect(buttonChildren[0].getAttribute('data-testid')).toBe('button-label');
    expect(buttonChildren[1].getAttribute('data-testid')).toBe('icon-right');
  });

  it('should render button with center icon only', async () => {
    await wrapper.setProps({ iconCenter: 'search-1', text: '' });

    const centeredIcon = wrapper.findComponent('[data-testid="icon-center"]');

    expect(centeredIcon.exists()).toBe(true);

    expect(wrapper.text()).toBe('');
  });

  it('should render button float variation', async () => {
    await wrapper.setProps({ iconCenter: 'search-1', float: true });

    expect(wrapper.text()).toBe('');

    expect(wrapper.classes()).toContain('unnnic-button--float');
  });

  it('should emit a click event when the button is clicked', async () => {
    const wrapper = createWrapper({ text: 'Button' });
    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('should not emit click event when button is disabled variation', async () => {
    const wrapper = createWrapper({ text: 'Button', disabled: true });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('should not emit click event when button is loading variation', async () => {
    const wrapper = createWrapper({ loading: true });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();

    const loadingIcon = wrapper.findComponent('[data-testid="icon-loading"]');
    expect(loadingIcon.exists()).toBe(true);
  });

  it('should show errors because invalid props', () => {
    const invalidSize = () => createWrapper({ size: 'invalid-size' });
    expect(invalidSize).toThrow(Error);
    const invalidType = () => createWrapper({ type: 'invalid-type' });
    expect(invalidType).toThrow(Error);
  });

  it('should render filled icons when iconsFilled prop is true', async () => {
    const wrapper = createWrapper({ 
      iconLeft: 'search-1',
      iconRight: 'search-1',
      iconsFilled: true 
    });

    const leftIcon = wrapper.findComponent('[data-testid="icon-left"]');
    const rightIcon = wrapper.findComponent('[data-testid="icon-right"]');

    expect(leftIcon.props('filled')).toBe(true);
    expect(rightIcon.props('filled')).toBe(true);
  });
});

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

    const label = wrapper.find('[data-testid="button-label"]');
    expect(label.text()).toBe('');
  });

  it('should render button float variation', async () => {
    await wrapper.setProps({ iconCenter: 'search-1', float: true });

    const label = wrapper.find('[data-testid="button-label"]');
    expect(label.exists()).toBe(false);

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

  it('should render button text from slot without text prop', () => {
    const slotOnlyWrapper = createWrapper(
      { text: '' },
      { default: 'Slot only' },
    );
    expect(slotOnlyWrapper.text()).toContain('Slot only');
  });

  it('should render filled icons when iconsFilled prop is true', async () => {
    const wrapper = createWrapper({
      iconLeft: 'search-1',
      iconRight: 'search-1',
      iconsFilled: true,
    });

    const leftIcon = wrapper.findComponent('[data-testid="icon-left"]');
    const rightIcon = wrapper.findComponent('[data-testid="icon-right"]');

    expect(leftIcon.props('filled')).toBe(true);
    expect(rightIcon.props('filled')).toBe(true);
  });

  it('should apply pressed class when pressed prop is true', () => {
    const pressedWrapper = createWrapper({ text: 'Button', pressed: true });
    expect(pressedWrapper.classes()).toContain('unnnic-button--pressed');
  });

  it.each(['primary', 'secondary', 'tertiary', 'warning', 'attention'])(
    'should render %s type',
    (type) => {
      const typeWrapper = createWrapper({ text: 'Button', type });
      expect(typeWrapper.classes()).toContain(`unnnic-button--${type}`);
    },
  );

  it('should map alternative type to tertiary', () => {
    const altWrapper = createWrapper({ text: 'Button', type: 'alternative' });
    expect(altWrapper.classes()).toContain('unnnic-button--tertiary');
  });

  it('should use muted icon scheme when disabled', async () => {
    const disabledWrapper = createWrapper({
      text: 'Button',
      iconLeft: 'search-1',
      disabled: true,
    });

    expect(
      disabledWrapper
        .findComponent('[data-testid="icon-left"]')
        .props('scheme'),
    ).toBe('fg-muted');
  });

  it('should use extra-large icon size for extra-large float button', () => {
    const floatWrapper = createWrapper({
      iconCenter: 'search-1',
      float: true,
      size: 'extra-large',
      text: '',
    });

    expect(
      floatWrapper.findComponent('[data-testid="icon-center"]').props('size'),
    ).toBe('lg');
  });

  it('should render small size variation', () => {
    const smallWrapper = createWrapper({ text: 'Button', size: 'small' });
    expect(smallWrapper.classes()).toContain('unnnic-button--size-small');
  });

  it('should throw only invalid size message when size is invalid', () => {
    expect(() => createWrapper({ size: 'small', float: true })).toThrow(
      /Invalid size prop/,
    );
  });

  it('should throw only invalid type message when type is invalid', () => {
    expect(() => createWrapper({ type: 'invalid-type' })).toThrow(
      /Invalid type prop/,
    );
  });
});

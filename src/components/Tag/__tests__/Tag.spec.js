import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import Tag from '../Tag.vue';
import DefaultTag from '../DefaultTag.vue';
import Chip from '../../Chip/Chip.vue';

const mountTag = (props = {}) =>
  mount(Tag, {
    props: {
      text: 'Tag label',
      ...props,
    },
    global: {
      stubs: {
        UnnnicIcon: true,
      },
    },
  });

describe('Tag', () => {
  it('renders DefaultTag for default type', () => {
    const wrapper = mountTag({ type: 'default' });

    expect(wrapper.findComponent(DefaultTag).exists()).toBe(true);
    expect(wrapper.text()).toContain('Tag label');
  });

  it('renders Chip for brand type', () => {
    const wrapper = mountTag({ type: 'brand' });

    expect(wrapper.findComponent(Chip).exists()).toBe(true);
  });

  it('renders Chip when hasCloseIcon is true', () => {
    const wrapper = mountTag({ hasCloseIcon: true });

    expect(wrapper.findComponent(Chip).exists()).toBe(true);
  });

  it('emits close when chip with close icon is clicked', async () => {
    const wrapper = mountTag({ hasCloseIcon: true });

    await wrapper.find('.chip').trigger('click');

    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('emits click for brand type chip', async () => {
    const wrapper = mountTag({ type: 'brand' });

    await wrapper.find('.chip').trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('passes small size for next type', () => {
    const wrapper = mountTag({ type: 'next' });

    expect(wrapper.findComponent(DefaultTag).props('size')).toBe('small');
  });
});

describe('DefaultTag', () => {
  const schemes = [
    ['aux-green', 'green'],
    ['aux-blue', 'blue'],
    ['aux-purple', 'purple'],
    ['aux-red', 'red'],
    ['aux-pink', 'pink'],
    ['aux-orange', 'orange'],
    ['aux-yellow', 'yellow'],
    ['aux-gray', 'gray'],
    ['aux-teal', 'teal'],
    ['aux-weni', 'weni'],
    ['unknown', 'muted'],
  ];

  it.each(schemes)('maps scheme %s to a background color', (scheme) => {
    const wrapper = mount(DefaultTag, {
      props: { text: 'Label', scheme },
    });

    expect(wrapper.find('.unnnic-tag__label').text()).toBe('Label');
    expect(wrapper.classes()).toContain('unnnic-tag');
    expect(wrapper.element.style.backgroundColor).toBeTruthy();
  });

  it('renders left icon when provided', () => {
    const wrapper = mount(DefaultTag, {
      props: { text: 'Label', leftIcon: 'info' },
      global: { stubs: { UnnnicIcon: true } },
    });

    expect(wrapper.find('.unnnic-tag__icon').exists()).toBe(true);
  });

  it('applies small size class', () => {
    const wrapper = mount(DefaultTag, {
      props: { text: 'Label', size: 'small' },
      global: { stubs: { UnnnicIcon: true } },
    });

    expect(wrapper.classes()).toContain('unnnic-tag--small');
  });
});

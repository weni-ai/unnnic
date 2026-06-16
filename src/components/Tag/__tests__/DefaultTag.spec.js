import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import DefaultTag from '../DefaultTag.vue';

const schemes = [
  'aux-green',
  'aux-blue',
  'aux-purple',
  'aux-red',
  'aux-pink',
  'aux-orange',
  'aux-yellow',
  'aux-gray',
  'aux-teal',
  'aux-weni',
  'unknown-scheme',
];

describe('DefaultTag', () => {
  schemes.forEach((scheme) => {
    it(`renders with scheme ${scheme}`, () => {
      const wrapper = mount(DefaultTag, {
        props: { text: `Tag ${scheme}`, scheme },
        global: { stubs: { UnnnicIcon: true } },
      });

      expect(wrapper.find('.unnnic-tag__label').text()).toBe(`Tag ${scheme}`);
      expect(wrapper.element.style.backgroundColor).toBeTruthy();
      wrapper.unmount();
    });
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

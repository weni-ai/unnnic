import { mount } from '@vue/test-utils';

import Label from '../Label.vue';
import { beforeEach, describe, expect, it } from 'vitest';

const createWrapper = () => {
  return mount(Label, {
    props: {
      label: 'Label Test',
    },
  });
};

describe('Label', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('should render label', () => {
    const label = wrapper.findComponent({ name: 'UnnnicLabel' });
    expect(label.text()).eq('Label Test');
  });

  it('applies the correct classes and styles', () => {
    const label = wrapper.findComponent('.unnnic-label__label');
    expect(label.exists()).toBe(true);
  });
});

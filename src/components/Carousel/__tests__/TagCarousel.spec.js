import { afterEach, describe, expect, it } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';

import TagCarousel from '../TagCarousel.vue';

const tagItems = [
  { id: 1, name: 'Tag 1' },
  { id: 2, name: 'Tag 2' },
  { id: 3, name: 'Tag 3' },
];

const mountCarousel = async (props = {}) => {
  const wrapper = mount(TagCarousel, {
    props: {
      modelValue: [],
      tagItems,
      ...props,
    },
    attachTo: document.body,
    global: {
      stubs: {
        UnnnicIcon: true,
      },
    },
  });

  await flushPromises();
  await wrapper.vm.$nextTick();

  return wrapper;
};

const mockScrollElement = (
  wrapper,
  { scrollWidth = 800, clientWidth = 400, scrollLeft = 0 } = {},
) => {
  const element = wrapper.find('#scroll').element;

  Object.defineProperty(element, 'scrollWidth', {
    configurable: true,
    value: scrollWidth,
  });
  Object.defineProperty(element, 'clientWidth', {
    configurable: true,
    value: clientWidth,
  });

  let currentScrollLeft = scrollLeft;
  Object.defineProperty(element, 'scrollLeft', {
    configurable: true,
    get: () => currentScrollLeft,
    set: (value) => {
      currentScrollLeft = value;
    },
  });

  return element;
};

describe('TagCarousel', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders tag slides from tagItems', async () => {
    const wrapper = await mountCarousel();

    expect(wrapper.vm.slides).toHaveLength(3);
    expect(wrapper.findAll('.chip')).toHaveLength(3);
    expect(wrapper.text()).toContain('Tag 1');
  });

  it('adds a tag to selection when clicked', async () => {
    const wrapper = await mountCarousel();

    await wrapper.findAll('.chip')[0].trigger('click');

    expect(wrapper.emitted('selected')[0]).toEqual([[1]]);
  });

  it('removes a tag from selection when already selected', async () => {
    const wrapper = await mountCarousel({ modelValue: [1] });

    await wrapper.findAll('.chip')[0].trigger('click');

    expect(wrapper.emitted('selected')[0]).toEqual([[]]);
  });

  it('checks whether a tag is included in modelValue', async () => {
    const wrapper = await mountCarousel({ modelValue: [2] });

    expect(wrapper.vm.checkIsInclude({ id: 2, name: 'Tag 2' })).toBe(true);
    expect(wrapper.vm.checkIsInclude({ id: 1, name: 'Tag 1' })).toBe(false);
  });

  it('enables previous button after moving forward', async () => {
    const wrapper = await mountCarousel();
    mockScrollElement(wrapper, {
      scrollWidth: 800,
      clientWidth: 400,
      scrollLeft: 0,
    });

    wrapper.vm.next();

    expect(wrapper.vm.hasPrev).toBe(true);
    expect(wrapper.vm.hasNext).toBe(true);
  });

  it('disables next button when scrolled to the end', async () => {
    const wrapper = await mountCarousel();
    mockScrollElement(wrapper, {
      scrollWidth: 800,
      clientWidth: 400,
      scrollLeft: 200,
    });

    wrapper.vm.next();

    expect(wrapper.vm.hasNext).toBe(false);
  });

  it('disables previous button when scrolled to the start', async () => {
    const wrapper = await mountCarousel();
    mockScrollElement(wrapper, {
      scrollWidth: 800,
      clientWidth: 400,
      scrollLeft: 200,
    });

    wrapper.vm.previous();

    expect(wrapper.vm.hasPrev).toBe(false);
    expect(wrapper.vm.hasNext).toBe(true);
  });

  it('keeps next enabled when already disabled and not at end', async () => {
    const wrapper = await mountCarousel();
    mockScrollElement(wrapper, {
      scrollWidth: 900,
      clientWidth: 400,
      scrollLeft: 0,
    });
    wrapper.vm.hasNext = false;

    wrapper.vm.next();

    expect(wrapper.vm.hasNext).toBe(true);
  });

  it('keeps previous enabled when already disabled and not at start', async () => {
    const wrapper = await mountCarousel();
    mockScrollElement(wrapper, {
      scrollWidth: 900,
      clientWidth: 400,
      scrollLeft: 500,
    });

    wrapper.vm.previous();

    expect(wrapper.vm.hasPrev).toBe(true);
    expect(wrapper.vm.hasNext).toBe(true);
  });

  it('shows blur overlays when navigation is available', async () => {
    const wrapper = await mountCarousel();
    mockScrollElement(wrapper, {
      scrollWidth: 800,
      clientWidth: 400,
      scrollLeft: 0,
    });

    expect(wrapper.vm.hasNext).toBe(true);
    expect(wrapper.vm.hasPrev).toBe(false);

    wrapper.vm.next();

    expect(wrapper.vm.hasPrev).toBe(true);
    expect(wrapper.vm.hasNext).toBe(true);
  });

  it('uses default modelValue when omitted', async () => {
    const wrapper = mount(TagCarousel, {
      props: { tagItems },
      attachTo: document.body,
      global: { stubs: { UnnnicIcon: true } },
    });

    await flushPromises();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.modelValue).toEqual([]);
    expect(wrapper.vm.slides).toHaveLength(3);

    wrapper.unmount();
  });

  it('uses default tagItems when omitted', async () => {
    const wrapper = mount(TagCarousel, {
      props: { modelValue: [] },
      attachTo: document.body,
      global: { stubs: { UnnnicIcon: true } },
    });

    await flushPromises();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.tagItems).toEqual([]);
    expect(wrapper.vm.slides).toEqual([]);

    wrapper.unmount();
  });

  it('keeps next enabled when it is already enabled', async () => {
    const wrapper = await mountCarousel();
    mockScrollElement(wrapper, {
      scrollWidth: 900,
      clientWidth: 400,
      scrollLeft: 0,
    });
    wrapper.vm.hasNext = true;

    wrapper.vm.handleNext();

    expect(wrapper.vm.hasNext).toBe(true);
    expect(wrapper.vm.hasPrev).toBe(true);
  });

  it('keeps previous enabled when it is already enabled', async () => {
    const wrapper = await mountCarousel();
    mockScrollElement(wrapper, {
      scrollWidth: 900,
      clientWidth: 400,
      scrollLeft: 500,
    });
    wrapper.vm.hasPrev = true;

    wrapper.vm.handlePrevious();

    expect(wrapper.vm.hasPrev).toBe(true);
    expect(wrapper.vm.hasNext).toBe(true);
  });

  it('delegates navigation to next and previous handlers', async () => {
    const wrapper = await mountCarousel();
    mockScrollElement(wrapper, {
      scrollWidth: 800,
      clientWidth: 400,
      scrollLeft: 0,
    });

    wrapper.vm.handleNext();
    expect(wrapper.vm.hasPrev).toBe(true);

    wrapper.vm.handlePrevious();
    expect(wrapper.vm.hasPrev).toBe(false);
  });
});

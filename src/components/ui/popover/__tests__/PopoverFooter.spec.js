import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import PopoverContent from '../PopoverContent.vue';
import PopoverFooter from '../PopoverFooter.vue';

// Render reka-ui's portal/content inline so the component's own markup
// (`.unnnic-popover__content` + footer container) is testable. The native
// Teleport is kept real so we can assert the footer actually moves.
const inlineSlot = { template: '<div><slot /></div>' };

const globalStubs = {
  PopoverPortal: inlineSlot,
  PopoverContent: inlineSlot,
};

// A child component that renders the footer from its own template, simulating
// a footer nested inside a consumer component rather than a direct slot child.
const NestedFooterChild = {
  components: { PopoverFooter },
  template: `
    <section data-testid="nested-wrapper">
      <PopoverFooter>
        <button data-testid="nested-footer-btn">Save</button>
      </PopoverFooter>
    </section>
  `,
};

const mountPopover = (defaultSlot) =>
  mount(PopoverContent, {
    attachTo: document.body,
    slots: { default: defaultSlot },
    global: {
      stubs: globalStubs,
      components: { PopoverFooter, NestedFooterChild },
    },
  });

const content = (wrapper) => wrapper.find('.unnnic-popover__content');
const footerContainer = (wrapper) =>
  wrapper.find('[data-testid="popover-footer-container"]');

describe('UnnnicPopoverFooter', () => {
  it('renders a direct footer child inside the footer container, outside the content', async () => {
    const wrapper = mountPopover(
      `<p data-testid="body">Body</p>
       <PopoverFooter><button data-testid="footer-btn">Save</button></PopoverFooter>`,
    );
    await flushPromises();

    expect(
      footerContainer(wrapper).find('.unnnic-popover__footer').exists(),
    ).toBe(true);
    expect(content(wrapper).find('.unnnic-popover__footer').exists()).toBe(
      false,
    );
    expect(wrapper.find('[data-testid="footer-btn"]').exists()).toBe(true);

    wrapper.unmount();
  });

  it('renders a footer nested inside a child component in the footer container', async () => {
    const wrapper = mountPopover('<NestedFooterChild />');
    await flushPromises();

    expect(
      footerContainer(wrapper).find('.unnnic-popover__footer').exists(),
    ).toBe(true);
    expect(
      footerContainer(wrapper)
        .find('[data-testid="nested-footer-btn"]')
        .exists(),
    ).toBe(true);
    expect(content(wrapper).find('.unnnic-popover__footer').exists()).toBe(
      false,
    );

    wrapper.unmount();
  });

  it('renders no footer area when no footer is provided', async () => {
    const wrapper = mountPopover('<p data-testid="body">Body</p>');
    await flushPromises();

    expect(wrapper.find('.unnnic-popover__footer').exists()).toBe(false);
    expect(footerContainer(wrapper).element.children.length).toBe(0);

    wrapper.unmount();
  });

  it('teleports every footer into the container when multiple are provided', async () => {
    const wrapper = mountPopover(
      `<PopoverFooter><span>First</span></PopoverFooter>
       <PopoverFooter><span>Second</span></PopoverFooter>`,
    );
    await flushPromises();

    const footers = footerContainer(wrapper).findAll('.unnnic-popover__footer');
    expect(footers).toHaveLength(2);
    expect(content(wrapper).find('.unnnic-popover__footer').exists()).toBe(
      false,
    );

    wrapper.unmount();
  });

  it('renders inline as a fallback when used without a PopoverContent target', () => {
    const wrapper = mount(PopoverFooter, {
      slots: { default: '<button data-testid="standalone">Save</button>' },
    });

    const footer = wrapper.find('.unnnic-popover__footer');
    expect(footer.exists()).toBe(true);
    expect(footer.find('[data-testid="standalone"]').exists()).toBe(true);
  });
});

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import ToolTip from '../ToolTip.vue';

globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

const createWrapper = (props = {}, slots = {}) => {
  return mount(ToolTip, {
    props,
    slots: {
      default: '<button data-testid="trigger-button">Hover me</button>',
      ...slots,
    },
    attachTo: document.body,
    global: {
      stubs: {
        teleport: true,
      },
    },
  });
};

describe('ToolTip', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper({ text: 'Tooltip text', enabled: true });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('Component Rendering', () => {
    it('should render the component', () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.vm).toBeTruthy();
    });

    it('should render slot content', () => {
      const triggerButton = wrapper.find('[data-testid="trigger-button"]');
      expect(triggerButton.exists()).toBe(true);
      expect(triggerButton.text()).toBe('Hover me');
    });

    it('should render custom slot content', () => {
      const customWrapper = createWrapper(
        { text: 'Tooltip text', enabled: true },
        {
          default: '<span data-testid="custom-trigger">Custom Content</span>',
        },
      );

      const customTrigger = customWrapper.find(
        '[data-testid="custom-trigger"]',
      );
      expect(customTrigger.exists()).toBe(true);
      expect(customTrigger.text()).toBe('Custom Content');

      customWrapper.unmount();
    });
  });

  describe('Props', () => {
    it('should accept text prop', () => {
      expect(wrapper.vm.$props.text).toBe('Tooltip text');
    });

    it('should accept enabled prop', () => {
      expect(wrapper.vm.$props.enabled).toBe(true);
    });

    it('should accept forceOpen prop', () => {
      const testWrapper = createWrapper({ text: 'Text', forceOpen: true });
      expect(testWrapper.vm.$props.forceOpen).toBe(true);
      testWrapper.unmount();
    });

    it('should accept side prop with valid values', () => {
      const sides = ['top', 'right', 'bottom', 'left'];

      sides.forEach((side) => {
        const sideWrapper = createWrapper({
          text: 'Text',
          enabled: true,
          side,
        });
        expect(sideWrapper.vm.$props.side).toBe(side);
        sideWrapper.unmount();
      });
    });

    it('should default to "right" side when not specified', () => {
      expect(wrapper.vm.$props.side).toBe('right');
    });

    it('should accept maxWidth prop', () => {
      const maxWidthWrapper = createWrapper({
        text: 'Text',
        enabled: true,
        maxWidth: '200px',
      });

      expect(maxWidthWrapper.vm.$props.maxWidth).toBe('200px');

      maxWidthWrapper.unmount();
    });

    it('should accept enableHtml prop', () => {
      const htmlWrapper = createWrapper({
        text: 'Text',
        enableHtml: true,
      });

      expect(htmlWrapper.vm.$props.enableHtml).toBe(true);

      htmlWrapper.unmount();
    });
  });

  describe('Boolean Props', () => {
    it('should handle enabled false', () => {
      const disabledWrapper = createWrapper({
        text: 'Text',
        enabled: false,
      });

      expect(disabledWrapper.vm.$props.enabled).toBe(false);

      disabledWrapper.unmount();
    });

    it('should handle forceOpen true', () => {
      const forceOpenWrapper = createWrapper({
        text: 'Text',
        enabled: false,
        forceOpen: true,
      });

      expect(forceOpenWrapper.vm.$props.forceOpen).toBe(true);

      forceOpenWrapper.unmount();
    });

    it('should handle enableHtml false', () => {
      expect(wrapper.vm.$props.enableHtml).toBe(false);
    });
  });

  describe('Text Content Rendering', () => {
    it('should accept plain text content via prop', () => {
      const plainWrapper = createWrapper({
        text: 'Simple tooltip text',
        enabled: true,
      });

      expect(plainWrapper.vm.$props.text).toBe('Simple tooltip text');

      plainWrapper.unmount();
    });

    it('should accept multiline text via prop', () => {
      const multilineWrapper = createWrapper({
        text: 'First line\nSecond line\nThird line',
        enabled: true,
      });

      expect(multilineWrapper.vm.$props.text).toBe(
        'First line\nSecond line\nThird line',
      );

      multilineWrapper.unmount();
    });

    it('should handle empty text', () => {
      const emptyWrapper = createWrapper({ text: '', enabled: true });

      expect(emptyWrapper.vm.$props.text).toBe('');
      expect(emptyWrapper.exists()).toBe(true);

      emptyWrapper.unmount();
    });
  });

  describe('HTML Content', () => {
    it('should accept HTML text with enableHtml prop set to true', () => {
      const htmlWrapper = createWrapper({
        enableHtml: true,
        enabled: true,
        text: 'Tooltip with <strong>bold</strong> text',
      });

      expect(htmlWrapper.vm.$props.enableHtml).toBe(true);
      expect(htmlWrapper.vm.$props.text).toBe(
        'Tooltip with <strong>bold</strong> text',
      );

      htmlWrapper.unmount();
    });

    it('should accept HTML link with enableHtml prop', () => {
      const linkWrapper = createWrapper({
        enableHtml: true,
        enabled: true,
        text: 'Visit <a href="https://weni.ai/" target="_blank">Weni</a>',
      });

      expect(linkWrapper.vm.$props.enableHtml).toBe(true);
      expect(linkWrapper.vm.$props.text).toContain('href="https://weni.ai/"');
      expect(linkWrapper.vm.$props.text).toContain('target="_blank"');

      linkWrapper.unmount();
    });

    it('should handle plain text when enableHtml is false', () => {
      const plainWrapper = createWrapper({
        enableHtml: false,
        enabled: true,
        text: 'Tooltip with <strong>bold</strong> text',
      });

      expect(plainWrapper.vm.$props.enableHtml).toBe(false);
      expect(plainWrapper.vm.$props.text).toBe(
        'Tooltip with <strong>bold</strong> text',
      );

      plainWrapper.unmount();
    });
  });

  describe('Component Structure', () => {
    it('should have Tooltip component', () => {
      expect(wrapper.findComponent({ name: 'Tooltip' }).exists()).toBe(true);
    });

    it('should have TooltipTrigger component', () => {
      expect(wrapper.findComponent({ name: 'TooltipTrigger' }).exists()).toBe(
        true,
      );
    });

    it('should have TooltipContent component', () => {
      expect(wrapper.findComponent({ name: 'TooltipContent' }).exists()).toBe(
        true,
      );
    });
  });

  describe('CSS Classes', () => {
    it('should pass side prop to TooltipContent', () => {
      const sides = ['top', 'right', 'bottom', 'left'];

      sides.forEach((side) => {
        const sideWrapper = createWrapper({
          text: 'Text',
          enabled: true,
          side,
        });

        const tooltipContent = sideWrapper.findComponent({
          name: 'TooltipContent',
        });
        expect(tooltipContent.exists()).toBe(true);
        expect(tooltipContent.props('side')).toBe(side);

        sideWrapper.unmount();
      });
    });

    it('should pass class prop to TooltipContent component', () => {
      const tooltipContent = wrapper.findComponent({ name: 'TooltipContent' });
      expect(tooltipContent.exists()).toBe(true);
      expect(tooltipContent.props('class')).toContain('unnnic-tooltip-label');
    });
  });

  describe('Side Validator', () => {
    it('should validate side prop correctly', () => {
      const validator = wrapper.vm.$options.props.side.validator;

      expect(validator('top')).toBe(true);
      expect(validator('right')).toBe(true);
      expect(validator('bottom')).toBe(true);
      expect(validator('left')).toBe(true);
      expect(validator('invalid')).toBe(false);
    });
  });

  describe('Props Defaults', () => {
    it('should have correct default values', () => {
      const defaultWrapper = createWrapper();

      expect(defaultWrapper.vm.$props.text).toBe('');
      expect(defaultWrapper.vm.$props.enabled).toBe(false);
      expect(defaultWrapper.vm.$props.forceOpen).toBe(false);
      expect(defaultWrapper.vm.$props.side).toBe('right');
      expect(defaultWrapper.vm.$props.maxWidth).toBe('');
      expect(defaultWrapper.vm.$props.enableHtml).toBe(false);

      defaultWrapper.unmount();
    });
  });

  describe('Max Width Style', () => {
    it('should pass maxWidth prop to TooltipContent', () => {
      const maxWidthWrapper = createWrapper({
        text: 'Text',
        enabled: true,
        maxWidth: '250px',
      });

      expect(maxWidthWrapper.vm.$props.maxWidth).toBe('250px');

      maxWidthWrapper.unmount();
    });

    it('should handle different maxWidth values', () => {
      const values = ['100px', '50%', '20rem', '300px'];

      values.forEach((maxWidth) => {
        const testWrapper = createWrapper({
          text: 'Text',
          enabled: true,
          maxWidth,
        });

        expect(testWrapper.vm.$props.maxWidth).toBe(maxWidth);

        testWrapper.unmount();
      });
    });
  });

  describe('Component Props Types', () => {
    it('should have correct prop types', () => {
      const { props } = wrapper.vm.$options;

      expect(props.text.type).toBe(String);
      expect(props.enabled.type).toBe(Boolean);
      expect(props.forceOpen.type).toBe(Boolean);
      expect(props.side.type).toBe(String);
      expect(props.maxWidth.type).toBe(String);
      expect(props.enableHtml.type).toBe(Boolean);
    });
  });

  describe('Enabled and ForceOpen Logic', () => {
    it('should be disabled when enabled is false and forceOpen is false', () => {
      const disabledWrapper = createWrapper({
        text: 'Text',
        enabled: false,
        forceOpen: false,
      });

      expect(disabledWrapper.vm.$props.enabled).toBe(false);
      expect(disabledWrapper.vm.$props.forceOpen).toBe(false);

      disabledWrapper.unmount();
    });

    it('should override disabled state when forceOpen is true', () => {
      const forceOpenWrapper = createWrapper({
        text: 'Text',
        enabled: false,
        forceOpen: true,
      });

      expect(forceOpenWrapper.vm.$props.enabled).toBe(false);
      expect(forceOpenWrapper.vm.$props.forceOpen).toBe(true);
      expect(forceOpenWrapper.html()).toContain('unnnic-tooltip');

      forceOpenWrapper.unmount();
    });
  });
});

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import ToolTip from '../ToolTip.vue';

const createWrapper = (props) => {
  return mount(ToolTip, { props });
};

describe('ToolTip', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper({ text: 'Text', enabled: true });
  });

  it('should not display the tooltip when enabled is false', async () => {
    await wrapper.setProps({ enabled: false });
    const tooltipLabel = wrapper.find('[data-testid="tooltip-label"]');
    expect(tooltipLabel.isVisible()).toBe(false);
  });

  it('should display the tooltip when enabled is true', async () => {
    const tooltipLabel = wrapper.find('[data-testid="tooltip-label"]');
    expect(tooltipLabel.isVisible()).toBe(true);
  });

  it('should force open the tooltip when forceOpen is true', async () => {
    await wrapper.setProps({ forceOpen: true });

    const tooltipLabel = wrapper.find('[data-testid="tooltip-label"]');
    expect(tooltipLabel.isVisible()).toBe(true);
  });

  it('should position the tooltip correctly based on the side prop', async () => {
    const sideValues = ['top', 'right', 'bottom', 'left'];

    for (let side of sideValues) {
      await wrapper.setProps({ side });
      const tooltipLabel = wrapper.find('[data-testid="tooltip-label"]');
      expect(tooltipLabel.classes()).include(`unnnic-tooltip-label-${side}`);
    }
  });

  it('should split tooltip text into multiple lines', async () => {
    await wrapper.setProps({ text: 'First line\nSecond line' });

    const tooltipLabel = wrapper.find('[data-testid="tooltip-label"]');

    expect(tooltipLabel.text()).toContain('First line');
    expect(tooltipLabel.text()).toContain('Second line');

    const brElements = tooltipLabel.findAll('br');
    expect(brElements.length).toBe(2);
  });

  it('should display shortcutText when provided', async () => {
    await wrapper.setProps({ shortcutText: 'Ctrl+C' });

    const tooltipShortcut = wrapper.find(
      '[data-testid="tooltip-label-shortcut"]',
    );
    expect(tooltipShortcut.exists()).toBe(true);
    expect(tooltipShortcut.text()).toBe('Ctrl+C');
  });

  it('should calculate tooltip position based on element coordinates', async () => {
    await wrapper.setProps({ side: 'right' });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.leftPos).toBeDefined();
    expect(wrapper.vm.topPos).toBeDefined();
  });

  it('should remove event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });

  it('should call handleResize on mouseover event', async () => {
    const handlResizeSpy = vi.spyOn(wrapper.vm, 'handleResize');
    await wrapper.trigger('mouseover');
    expect(handlResizeSpy).toHaveBeenCalled();
  });
});

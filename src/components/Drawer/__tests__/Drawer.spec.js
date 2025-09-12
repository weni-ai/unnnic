import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Drawer from '../Drawer.vue';

describe('Drawer.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Drawer, {
      props: {
        modelValue: true,
        title: 'Test Title',
        description: 'Test Description',
        primaryButtonText: 'Primary Action',
        secondaryButtonText: 'Secondary Action',
      },
      global: {
        stubs: ['UnnnicIcon', 'UnnnicButton'],
      },
    });
  });

  const element = (id) => wrapper.find(`[data-testid="${id}"]`);
  const component = (id) => wrapper.findComponent(`[data-testid="${id}"]`);
  const drawer = () => element('drawer');
  const overlay = () => element('overlay');
  const title = () => element('drawer-title');
  const description = () => element('drawer-description');
  const primaryButton = () => component('primary-button');
  const secondaryButton = () => component('secondary-button');
  const footer = () => element('footer');
  const closeIcon = () => component('close-icon');
  const drawerContainer = () => element('drawer-container');

  describe('Component Rendering', () => {
    describe('Component Rendering', () => {
      it('matches the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
      });

      it('should render the drawer when modelValue is true', () => {
        expect(drawer().exists()).toBe(true);
      });

      it('should not render the drawer when modelValue is false', async () => {
        await wrapper.setProps({ modelValue: false });
        expect(drawer().exists()).toBe(false);
      });

      it('should render the overlay when withoutOverlay is false', () => {
        expect(overlay().exists()).toBe(true);
      });

      it('should not render the overlay when withoutOverlay is true', async () => {
        await wrapper.setProps({ withoutOverlay: true });
        expect(overlay().exists()).toBe(false);
      });

      it('should display the title and description correctly', () => {
        expect(title().text()).toBe('Test Title');
        expect(description().text()).toBe('Test Description');
      });

      it('should not display the description when not provided', async () => {
        await wrapper.setProps({ description: '' });
        expect(description().exists()).toBe(false);
      });

      it('should render the slot content correctly', () => {
        wrapper = mount(Drawer, {
          props: {
            modelValue: true,
            title: 'Test Title',
          },
          slots: {
            content: '<div data-testid="slot-content">Slot Content</div>',
          },
        });
        expect(wrapper.find('[data-testid="slot-content"]').exists()).toBe(
          true,
        );
        expect(wrapper.find('[data-testid="slot-content"]').text()).toBe(
          'Slot Content',
        );
      });

      it('should render custom title content when using title slot', () => {
        wrapper = mount(Drawer, {
          props: {
            modelValue: true,
            title: 'Default Title',
          },
          slots: {
            title: '<h2 data-testid="custom-title">Custom Title Content</h2>',
          },
        });

        expect(title().exists()).toBe(false);
        expect(wrapper.find('[data-testid="custom-title"]').exists()).toBe(
          true,
        );
        expect(wrapper.find('[data-testid="custom-title"]').text()).toBe(
          'Custom Title Content',
        );
      });

      it('should prioritize title slot over title prop', () => {
        wrapper = mount(Drawer, {
          props: {
            modelValue: true,
            title: 'Prop Title',
          },
          slots: {
            title: '<div data-testid="custom-title">Slot Title</div>',
          },
        });

        expect(title().exists()).toBe(false);
        expect(wrapper.find('[data-testid="custom-title"]').text()).toBe(
          'Slot Title',
        );
      });
    });
  });

  describe('Button Behavior', () => {
    it('should emit the primaryButtonClick event when the primary button is clicked', async () => {
      await primaryButton().trigger('click');
      expect(wrapper.emitted('primaryButtonClick')).toBeTruthy();
    });

    it('should disable the primary button when disabledPrimaryButton is true', async () => {
      await wrapper.setProps({ disabledPrimaryButton: true });
      expect(primaryButton().attributes('disabled')).toBeDefined();
    });

    it('should display the correct text on the primary button', () => {
      expect(primaryButton().props('text')).toBe('Primary Action');
    });

    it('should emit the secondaryButtonClick event when the secondary button is clicked', async () => {
      await secondaryButton().trigger('click');
      expect(wrapper.emitted('secondaryButtonClick')).toBeTruthy();
    });

    it('should disable the secondary button when disabledSecondaryButton is true', async () => {
      await wrapper.setProps({ disabledSecondaryButton: true });
      expect(secondaryButton().attributes('disabled')).toBeDefined();
    });

    it('should display the correct text on the secondary button', () => {
      expect(secondaryButton().props('text')).toBe('Secondary Action');
    });

    it('should render the footer only if showFooter is true', async () => {
      expect(footer().exists()).toBe(true);

      await wrapper.setProps({
        primaryButtonText: '',
        secondaryButtonText: '',
      });

      expect(footer().exists()).toBe(false);
    });
  });

  describe('Interactions and Transitions', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.clearAllTimers();
    });

    it('should close the drawer when the close icon is clicked', async () => {
      await closeIcon().trigger('click');

      vi.advanceTimersByTime(200);

      expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('should call back method when back icon is clicked and distinctCloseBack is true', async () => {
      await wrapper.setProps({ distinctCloseBack: true });
      await closeIcon().trigger('click');

      vi.advanceTimersByTime(200);

      expect(wrapper.emitted('back')).toBeTruthy();
    });

    it('should not emit back event when back icon is clicked and distinctCloseBack is false', async () => {
      await closeIcon().trigger('click');
      expect(wrapper.emitted('back')).toBeUndefined();
    });

    it('should correctly handle transitions when closing the drawer', async () => {
      await wrapper.vm.close();
      expect(wrapper.vm.showDrawer).toBe(false);

      setTimeout(() => {
        expect(drawer().exists()).toBe(false);
      }, 200);
    });

    it('should handle overlay clicks to close the drawer when withoutOverlay is false', async () => {
      expect(overlay().exists()).toBe(true);
      await overlay().trigger('click');

      vi.advanceTimersByTime(200);

      expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('should execute the callback after 200ms timeout and reset showDrawer', async () => {
      const callbackMock = vi.fn();
      wrapper.vm.transitionClose(callbackMock);

      expect(wrapper.vm.showDrawer).toBe(false);

      vi.advanceTimersByTime(200);

      expect(callbackMock).toHaveBeenCalled();
      expect(wrapper.vm.showDrawer).toBe(true);
    });
  });

  describe('Props and Computed Properties', () => {
    it('should render the correct size class based on size prop', async () => {
      await wrapper.setProps({ size: 'lg' });
      expect(drawerContainer().classes()).toContain(
        'unnnic-drawer__container--lg',
      );

      await wrapper.setProps({ size: 'xl' });
      expect(drawerContainer().classes()).toContain(
        'unnnic-drawer__container--xl',
      );
    });

    it('should display footer if either primaryButtonText or secondaryButtonText is provided', async () => {
      expect(footer().exists()).toBe(true);

      await wrapper.setProps({
        primaryButtonText: '',
        secondaryButtonText: 'Secondary Button',
      });
      expect(footer().exists()).toBe(true);
    });

    it('should not display footer if both primaryButtonText and secondaryButtonText are not provided', async () => {
      await wrapper.setProps({
        primaryButtonText: '',
        secondaryButtonText: '',
      });

      expect(footer().exists()).toBe(false);
    });

    it('should disable primary button when disabledPrimaryButton prop is true', async () => {
      await wrapper.setProps({
        primaryButtonText: 'Primary Button',
        disabledPrimaryButton: true,
      });
      expect(primaryButton().attributes('disabled')).toBe('true');
    });

    it('should disable secondary button when disabledSecondaryButton prop is true', async () => {
      await wrapper.setProps({
        secondaryButtonText: 'Secondary Button',
        disabledSecondaryButton: true,
      });
      expect(secondaryButton().attributes('disabled')).toBe('true');
    });

    it('should use correct icon for close button based on closeIcon prop', async () => {
      await wrapper.setProps({ closeIcon: 'custom_close_icon' });
      expect(closeIcon().props('icon')).toBe('custom_close_icon');
    });

    it('should validate all size prop values correctly', () => {
      const validator = Drawer.props.size.validator;
      expect(validator('md')).toBe(true);
      expect(validator('lg')).toBe(true);
      expect(validator('xl')).toBe(true);
      expect(validator('gt')).toBe(true);
      expect(validator('sm')).toBe(false);
      expect(validator('invalid')).toBe(false);
    });
  });
});

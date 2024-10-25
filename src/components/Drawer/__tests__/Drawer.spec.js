import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
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

  describe('Component Rendering', () => {
    it('should render the drawer when modelValue is true', () => {
      expect(wrapper.find('[data-testid="drawer"]').exists()).toBe(true);
    });

    it('should not render the drawer when modelValue is false', async () => {
      await wrapper.setProps({ modelValue: false });
      expect(wrapper.find('[data-testid="drawer"]').exists()).toBe(false);
    });

    it('should render the overlay when withoutOverlay is false', () => {
      expect(wrapper.find('[data-testid="overlay"]').exists()).toBe(true);
    });

    it('should not render the overlay when withoutOverlay is true', async () => {
      await wrapper.setProps({ withoutOverlay: true });
      expect(wrapper.find('[data-testid="overlay"]').exists()).toBe(false);
    });

    it('should display the title and description correctly', () => {
      expect(wrapper.find('[data-testid="drawer-title"]').text()).toBe(
        'Test Title',
      );
      expect(wrapper.find('[data-testid="drawer-description"]').text()).toBe(
        'Test Description',
      );
    });

    it('should not display the description when not provided', async () => {
      await wrapper.setProps({ description: '' });
      expect(wrapper.find('[data-testid="drawer-description"]').exists()).toBe(
        false,
      );
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
      expect(wrapper.find('[data-testid="slot-content"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="slot-content"]').text()).toBe(
        'Slot Content',
      );
    });
  });

  describe('Button Behavior', () => {
    it('should emit the primaryButtonClick event when the primary button is clicked', async () => {
      await wrapper
        .findComponent('[data-testid="primary-button"]')
        .trigger('click');
      expect(wrapper.emitted('primaryButtonClick')).toBeTruthy();
    });

    it('should disable the primary button when disabledPrimaryButton is true', async () => {
      await wrapper.setProps({ disabledPrimaryButton: true });
      expect(
        wrapper.find('[data-testid="primary-button"]').attributes('disabled'),
      ).toBeDefined();
    });

    it('should display the correct text on the primary button', () => {
      expect(
        wrapper.findComponent('[data-testid="primary-button"]').props('text'),
      ).toBe('Primary Action');
    });

    it('should emit the secondaryButtonClick event when the secondary button is clicked', async () => {
      await wrapper
        .findComponent('[data-testid="secondary-button"]')
        .trigger('click');
      expect(wrapper.emitted('secondaryButtonClick')).toBeTruthy();
    });

    it('should disable the secondary button when disabledSecondaryButton is true', async () => {
      await wrapper.setProps({ disabledSecondaryButton: true });
      expect(
        wrapper
          .findComponent('[data-testid="secondary-button"]')
          .attributes('disabled'),
      ).toBeDefined();
    });

    it('should display the correct text on the secondary button', () => {
      expect(
        wrapper.findComponent('[data-testid="secondary-button"]').props('text'),
      ).toBe('Secondary Action');
    });

    it('should render the footer only if showFooter is true', async () => {
      expect(wrapper.find('[data-testid="footer"]').exists()).toBe(true);

      await wrapper.setProps({
        primaryButtonText: '',
        secondaryButtonText: '',
      });

      expect(wrapper.find('[data-testid="footer"]').exists()).toBe(false);
    });
  });

  describe('Interactions and Transitions', () => {
    it('should close the drawer when the close icon is clicked', async () => {
      await wrapper
        .findComponent('[data-testid="close-icon"]')
        .trigger('click');

      setTimeout(() => {
        expect(wrapper.emitted('close')).toBeTruthy();
        expect(wrapper.vm.showDrawer).toBe(false);
      }, 200); // Transition time
    });

    it('should call back method when back icon is clicked and distinctCloseBack is true', async () => {
      await wrapper.setProps({ distinctCloseBack: true });
      await wrapper
        .findComponent('[data-testid="close-icon"]')
        .trigger('click');

      setTimeout(() => {
        expect(wrapper.emitted('back')).toBeTruthy();
      }, 200); // Transition time
    });

    it('should not emit back event when back icon is clicked and distinctCloseBack is false', async () => {
      await wrapper.find('[data-testid="close-icon"]').trigger('click');
      expect(wrapper.emitted('back')).toBeUndefined();
    });

    it('should correctly handle transitions when closing the drawer', async () => {
      await wrapper.vm.close();
      expect(wrapper.vm.showDrawer).toBe(false);

      setTimeout(() => {
        expect(wrapper.find('[data-testid="drawer"]').exists()).toBe(false);
      }, 200); // Transition time
    });

    it('should handle overlay clicks to close the drawer when withoutOverlay is false', async () => {
      expect(wrapper.find('[data-testid="overlay"]').exists()).toBe(true);
      await wrapper.find('[data-testid="overlay"]').trigger('click');
      setTimeout(() => {
        expect(wrapper.emitted('close')).toBeTruthy();
      }, 200); // Transition time
    });
  });

  describe('Props and Computed Properties', () => {
    it('should render the correct size class based on size prop', async () => {
      await wrapper.setProps({ size: 'lg' });
      expect(
        wrapper.find('[data-testid="drawer-container"]').classes(),
      ).toContain('unnnic-drawer__container--lg');

      await wrapper.setProps({ size: 'xl' });
      expect(
        wrapper.find('[data-testid="drawer-container"]').classes(),
      ).toContain('unnnic-drawer__container--xl');
    });

    it('should display footer if either primaryButtonText or secondaryButtonText is provided', async () => {
      expect(wrapper.find('[data-testid="footer"]').exists()).toBe(true);

      await wrapper.setProps({
        primaryButtonText: '',
        secondaryButtonText: 'Secondary Button',
      });
      expect(wrapper.find('[data-testid="footer"]').exists()).toBe(true);
    });

    it('should not display footer if both primaryButtonText and secondaryButtonText are not provided', async () => {
      await wrapper.setProps({
        primaryButtonText: '',
        secondaryButtonText: '',
      });

      expect(wrapper.find('[data-testid="footer"]').exists()).toBe(false);
    });

    it('should disable primary button when disabledPrimaryButton prop is true', async () => {
      await wrapper.setProps({
        primaryButtonText: 'Primary Button',
        disabledPrimaryButton: true,
      });
      expect(
        wrapper.find('[data-testid="primary-button"]').attributes('disabled'),
      ).toBe('true');
    });

    it('should disable secondary button when disabledSecondaryButton prop is true', async () => {
      await wrapper.setProps({
        secondaryButtonText: 'Secondary Button',
        disabledSecondaryButton: true,
      });
      expect(
        wrapper.find('[data-testid="secondary-button"]').attributes('disabled'),
      ).toBe('true');
    });

    it('should use correct icon for close button based on closeIcon prop', async () => {
      await wrapper.setProps({ closeIcon: 'custom_close_icon' });
      const closeIcon = wrapper.findComponent('[data-testid="close-icon"]');
      expect(closeIcon.props('icon')).toBe('custom_close_icon');
    });

    it('should validate size prop to accept only md, lg, or xl values', async () => {
      const validator = Drawer.props.size.validator;
      expect(validator('md')).toBe(true);
      expect(validator('lg')).toBe(true);
      expect(validator('xl')).toBe(true);
      expect(validator('sm')).toBe(false); // Should not be valid
    });
  });
});

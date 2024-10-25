import { mount } from '@vue/test-utils';
import { describe, it, vi } from 'vitest';
import ModalDialog from '../ModalDialog.vue';

describe('ModalDialog.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ModalDialog, {
      props: {
        title: 'Test Title',
        icon: 'test-icon',
        modelValue: true,
        showCloseIcon: true,
        primaryButtonProps: { text: 'Confirm' },
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
      },
      global: {
        stubs: ['UnnnicIcon', 'UnnnicButton'],
      },
    });
  });

  describe('Elements rendering', () => {
    it('matches the snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should render correctly when modelValue is true', () => {
      const modal = wrapper.find('[data-testid="modal-dialog"]');
      expect(modal.exists()).toBe(true);
    });

    it('should not render when modelValue is false', async () => {
      await wrapper.setProps({ modelValue: false });

      const modal = wrapper.find('[data-testid="modal-dialog"]');
      expect(modal.exists()).toBe(false);
    });

    it('should apply the correct size class based on the size prop', async () => {
      const modalContainer = wrapper.find('[data-testid="modal-container"]');
      const defaultClass = 'unnnic-modal-dialog__container';

      expect(modalContainer.classes()).toContain(defaultClass + '--md');

      await wrapper.setProps({ size: 'lg' });
      expect(modalContainer.classes()).toContain(defaultClass + '--lg');

      await wrapper.setProps({ size: 'sm' });
      expect(modalContainer.classes()).toContain(defaultClass + '--sm');
    });

    it('should render the icon and title when provided', () => {
      const title = wrapper.find('[data-testid="title-text"]');
      expect(title.exists()).toBe(true);
      expect(title.text()).toBe('Test Title');

      const icon = wrapper.findComponent('[data-testid="title-icon"]');
      expect(icon.exists()).toBe(true);
      expect(icon.props('icon')).toBe('test-icon');
    });

    it('should render the icon from iconsMapper when type prop is provided', async () => {
      await wrapper.setProps({
        type: 'success',
        icon: '',
      });

      const icon = wrapper.findComponent('[data-testid="title-icon"]');
      expect(icon.exists()).toBe(true);
      expect(icon.props().icon).toBe(wrapper.vm.iconsMapper['success'].icon);
    });

    it('should not render the icon when both icon and type props are not provided', async () => {
      await wrapper.setProps({
        icon: '',
        type: '',
      });

      const icon = wrapper.find('[data-testid="title-icon"]');
      expect(icon.exists()).toBe(false);
    });

    it('should render the close icon when showCloseIcon is true', () => {
      const closeIcon = wrapper.find('[data-testid="close-icon"]');
      expect(closeIcon.exists()).toBe(true);
    });

    it('should not render buttons when primaryButtonProps is not provided', async () => {
      await wrapper.setProps({ primaryButtonProps: undefined });

      const primaryButton = wrapper.find('[data-testid="primary-button"]');
      const secondaryButton = wrapper.find('[data-testid="secondary-button"]');
      expect(primaryButton.exists()).toBe(false);
      expect(secondaryButton.exists()).toBe(false);
    });
  });

  describe('Overlay behavior', () => {
    it('should close the modal when clicking on the overlay if persistent is false', async () => {
      expect(wrapper.props().modelValue).toBe(true);

      const overlay = wrapper.find('[data-testid="modal-overlay"]');
      await overlay.trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([false]);
      expect(wrapper.props().modelValue).toBe(false);
    });

    it('should not close the modal when clicking on the overlay if persistent is true', async () => {
      await wrapper.setProps({ persistent: true });

      const overlay = wrapper.find('[data-testid="modal-overlay"]');
      await overlay.trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      expect(wrapper.props().modelValue).toBe(true);
    });
  });

  describe('Slot rendering', () => {
    it('should render leftSidebar slot when provided', () => {
      const wrapper = mount(ModalDialog, {
        props: {
          modelValue: true,
        },
        slots: {
          leftSidebar:
            '<div data-testid="left-sidebar">Left Sidebar Content</div>',
        },
      });

      const leftSidebar = wrapper.find('[data-testid="left-sidebar"]');
      expect(leftSidebar.exists()).toBe(true);
      expect(leftSidebar.text()).toBe('Left Sidebar Content');
    });

    it('should render default slot content', () => {
      const wrapper = mount(ModalDialog, {
        props: {
          modelValue: true,
        },
        slots: {
          default: '<div data-testid="default-slot">Default Slot Content</div>',
        },
      });

      const defaultSlot = wrapper.find('[data-testid="default-slot"]');
      expect(defaultSlot.exists()).toBe(true);
      expect(defaultSlot.text()).toBe('Default Slot Content');
    });
  });

  describe('Buttons actions', () => {
    it('should close the modal when clicking on close icon', async () => {
      const closeIcon = wrapper.find('[data-testid="close-icon"]');
      await closeIcon.trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([false]);
      expect(wrapper.props().modelValue).toBe(false);
    });

    it('should emit primaryButtonClick event when the primary button is clicked', async () => {
      const primaryButton = wrapper.find('[data-testid="primary-button"]');
      await primaryButton.trigger('click');

      expect(wrapper.emitted('primaryButtonClick')).toBeTruthy();
    });

    it('should emit secondaryButtonClick event when the secondary button is clicked', async () => {
      await wrapper.setProps({
        secondaryButtonProps: { text: 'Cancel' },
      });

      const secondaryButton = wrapper.find('[data-testid="secondary-button"]');
      await secondaryButton.trigger('click');

      expect(wrapper.emitted('secondaryButtonClick')).toBeTruthy();
    });

    it('should close the modal when the secondary button is clicked and no secondaryButtonClick event is provided', async () => {
      const secondaryButton = wrapper.find('[data-testid="secondary-button"]');
      await secondaryButton.trigger('click');

      const emittedValue = wrapper.emitted('update:modelValue');

      expect(emittedValue).toBeTruthy();
      expect(emittedValue[0][0]).toEqual(false);
    });
  });

  describe('Actions and appearance', () => {
    it('should not render the secondary button when hideSecondaryButton is true', async () => {
      await wrapper.setProps({
        hideSecondaryButton: true,
      });
      const secondaryButton = wrapper.find('[data-testid="secondary-button"]');
      expect(secondaryButton.exists()).toBe(false);
    });

    it('should apply a divider class to the actions section when showActionsDivider is true', async () => {
      await wrapper.setProps({
        showActionsDivider: true,
      });

      const actionsSection = wrapper.find('[data-testid="actions-section"]');
      expect(actionsSection.classes()).toContain(
        'unnnic-modal-dialog__container__actions--divider',
      );
    });
  });

  describe('Body overflow', () => {
    it('should toggle body overflow based on modal visibility', async () => {
      await wrapper.setProps({ modelValue: false });
      const updateBodyOverflowSpy = vi.spyOn(wrapper.vm, 'updateBodyOverflow');

      await wrapper.setProps({ modelValue: true });
      expect(updateBodyOverflowSpy).toHaveBeenCalledWith(true);

      await wrapper.setProps({ modelValue: false });
      expect(updateBodyOverflowSpy).toHaveBeenCalledWith(false);
    });
  });

  describe('Validators', () => {
    describe('type prop validator', () => {
      it('should validate type prop when a valid value is provided', () => {
        const validTypes = ['success', 'warning', 'attention'];
        validTypes.forEach((validType) => {
          expect(ModalDialog.props.type.validate(validType)).toBe(true);
        });
      });

      it('should invalidate type prop when an invalid value is provided', () => {
        expect(ModalDialog.props.type.validate('invalidType')).toBe(false);
      });
    });

    describe('size prop validator', () => {
      it('should validate size prop when a valid value is provided', () => {
        const validSizes = ['sm', 'md', 'lg'];
        validSizes.forEach((validSize) => {
          expect(ModalDialog.props.size.validate(validSize)).toBe(true);
        });
      });

      it('should invalidate size prop when an invalid value is provided', () => {
        expect(ModalDialog.props.size.validate('invalidSize')).toBe(false);
      });
    });
  });
});

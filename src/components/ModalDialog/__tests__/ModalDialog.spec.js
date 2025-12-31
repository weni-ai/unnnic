import { mount } from '@vue/test-utils';
import { beforeEach, describe, it, expect, vi } from 'vitest';
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
        stubs: [
          'teleport',
          'UnnnicIcon',
          'UnnnicButton',
          'UnnnicDialogContent',
        ],
      },
    });
  });

  describe('Elements rendering', () => {
    it('matches the snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should apply the correct size class based on the size prop', async () => {
      const modalContainer = wrapper.find('[data-testid="modal-dialog"]');

      expect(modalContainer.attributes('size')).toContain('medium');

      await wrapper.setProps({ size: 'lg' });
      expect(modalContainer.attributes('size')).toContain('large');

      await wrapper.setProps({ size: 'sm' });
      expect(modalContainer.attributes('size')).toContain('small');
    });
  });

  describe('persistentHandler', () => {
    it('prevents default when persistent is true', () => {
      wrapper = mount(ModalDialog, {
        props: {
          title: 'Test Title',
          modelValue: true,
          persistent: true,
          primaryButtonProps: { text: 'Confirm' },
        },
        global: {
          stubs: [
            'teleport',
            'UnnnicIcon',
            'UnnnicButton',
            'UnnnicDialogContent',
          ],
        },
      });

      const mockEvent = {
        preventDefault: vi.fn(),
        target: document.createElement('div'),
      };

      wrapper.vm.persistentHandler(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('prevents default when clicking on datepicker dropdown (teleported element)', () => {
      const mockEvent = {
        preventDefault: vi.fn(),
        target: document.createElement('div'),
      };

      // Create a datepicker dropdown element
      const datepickerDropdown = document.createElement('div');
      datepickerDropdown.setAttribute('data-datepicker-dropdown', 'true');
      document.body.appendChild(datepickerDropdown);

      // Make target inside the datepicker dropdown
      datepickerDropdown.appendChild(mockEvent.target);

      wrapper.vm.persistentHandler(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();

      // Cleanup
      document.body.removeChild(datepickerDropdown);
    });

    it('does not prevent default when clicking outside datepicker dropdown and not persistent', () => {
      const mockEvent = {
        preventDefault: vi.fn(),
        target: document.createElement('div'),
      };

      // Target is not inside a datepicker dropdown
      document.body.appendChild(mockEvent.target);

      wrapper.vm.persistentHandler(mockEvent);

      expect(mockEvent.preventDefault).not.toHaveBeenCalled();

      // Cleanup
      document.body.removeChild(mockEvent.target);
    });

    it('handles event with target that does not have closest method', () => {
      const mockEvent = {
        preventDefault: vi.fn(),
        target: null,
      };

      // Should not throw error
      expect(() => wrapper.vm.persistentHandler(mockEvent)).not.toThrow();
    });

    it('prevents default when target is a child of datepicker dropdown', () => {
      const mockEvent = {
        preventDefault: vi.fn(),
        target: document.createElement('span'),
      };

      // Create a nested structure
      const datepickerDropdown = document.createElement('div');
      datepickerDropdown.setAttribute('data-datepicker-dropdown', 'true');
      const innerDiv = document.createElement('div');
      innerDiv.appendChild(mockEvent.target);
      datepickerDropdown.appendChild(innerDiv);
      document.body.appendChild(datepickerDropdown);

      wrapper.vm.persistentHandler(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();

      // Cleanup
      document.body.removeChild(datepickerDropdown);
    });
  });

  describe('Modal interactions with DatePicker', () => {
    it('allows interaction with datepicker without closing modal', () => {
      const datepickerElement = document.createElement('div');
      datepickerElement.setAttribute('data-datepicker-dropdown', 'true');
      document.body.appendChild(datepickerElement);

      const clickInsideDatepicker = {
        preventDefault: vi.fn(),
        target: datepickerElement,
      };

      wrapper.vm.persistentHandler(clickInsideDatepicker);

      expect(clickInsideDatepicker.preventDefault).toHaveBeenCalled();
      expect(wrapper.props('modelValue')).toBe(true);

      // Cleanup
      document.body.removeChild(datepickerElement);
    });
  });
});

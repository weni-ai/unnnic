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

  describe('Title slot', () => {
    const titleSlotStubs = {
      teleport: true,
      UnnnicIcon: true,
      UnnnicButton: true,
      DialogPortal: { template: '<div><slot /></div>' },
      DialogOverlay: true,
    };

    it('renders the header when the title slot is provided without a title prop', () => {
      wrapper = mount(ModalDialog, {
        props: {
          modelValue: true,
          primaryButtonProps: { text: 'Confirm' },
        },
        slots: {
          title:
            '<span class="custom-title">Custom <strong>Title</strong></span>',
        },
        global: {
          stubs: titleSlotStubs,
        },
      });

      expect(wrapper.find('.custom-title').exists()).toBe(true);
      expect(wrapper.find('.custom-title').html()).toContain(
        '<strong>Title</strong>',
      );
    });

    it('does not render the header when neither title prop nor title slot is provided', () => {
      wrapper = mount(ModalDialog, {
        props: {
          modelValue: true,
          primaryButtonProps: { text: 'Confirm' },
        },
        global: {
          stubs: titleSlotStubs,
        },
      });

      expect(
        wrapper.findComponent({ name: 'UnnnicDialogHeader' }).exists(),
      ).toBe(false);
    });

    it('renders the title prop text when no title slot is provided', () => {
      wrapper = mount(ModalDialog, {
        props: {
          title: 'Test Title',
          modelValue: true,
          primaryButtonProps: { text: 'Confirm' },
        },
        global: {
          stubs: titleSlotStubs,
        },
      });

      expect(wrapper.findComponent({ name: 'UnnnicDialogTitle' }).text()).toBe(
        'Test Title',
      );
    });

    it('renders the title slot content instead of the title prop when both are provided', () => {
      wrapper = mount(ModalDialog, {
        props: {
          title: 'Prop Title',
          modelValue: true,
          primaryButtonProps: { text: 'Confirm' },
        },
        slots: {
          title: '<span class="slot-title">Slot Title</span>',
        },
        global: {
          stubs: titleSlotStubs,
        },
      });

      expect(wrapper.find('.slot-title').exists()).toBe(true);
      expect(wrapper.find('.slot-title').text()).toBe('Slot Title');
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
  });
});

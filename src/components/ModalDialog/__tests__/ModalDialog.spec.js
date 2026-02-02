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
  });
});

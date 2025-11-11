import { mount } from '@vue/test-utils';
import { describe, it } from 'vitest';
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
});

import { createApp } from 'vue';
import Alert from '../components/Alert/Alert.vue';
import Modal from '../components/Modal/Modal.vue';

export default {
  callAlert({ props }) {
    const AlertComponent = createApp(Alert, {
      ...props,
      onClose: () => {
        instance.$el.remove();
      },
      created() {
        this.$on(['close'], () => {
          instance.$el.remove();
        });
      },
    });
    const element = document.createElement('div');
    const instance = AlertComponent.mount(element);
    document.body.appendChild(element);
  },

  callModal({ props }) {
    const ModalComponent = createApp(Modal, {
      ...props,
      onClose: () => {
        instance.$el.remove();
      },
      created() {
        this.$on(['close'], () => {
          instance.$el.remove();
        });
      },
    });
    const element = document.createElement('div');
    const instance = ModalComponent.mount(element);
    document.body.appendChild(element);
  },
};

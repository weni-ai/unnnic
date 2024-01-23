import * as Vue from 'vue';
import Alert from '../components/Alert/Alert.vue';
import Modal from '../components/Modal/Modal.vue';

export default {
  callAlert({ props }) {
    const AlertClass = Vue.createApp(Alert, {
      name: 'Alert',
      propsData: {
        ...props,
        onClose: () => {
          instance.$el.remove();
        },
      },
      created() {
        this.$on(['close'], () => {
          instance.$el.remove();
        });
      },
    });
    const container = document.createElement('div');
    AlertClass.mount(container);
    return AlertClass._container;
  },

  callModal({ props }) {
    const ModalClass = Vue.createApp(Modal, {
      propsData: {
        ...props,
        onClose: () => {
          instance.$el.remove();
        },
      },
      created() {
        this.$on(['close'], () => {
          instance.$el.remove();
        });
      },
    });
    const container = document.createElement('div');
    ModalClass.mount(container);
    return ModalClass._container;
  },
};

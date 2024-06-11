import { createApp } from 'vue';
import Alert from '../components/Alert/Alert.vue';
import Modal from '../components/Modal/Modal.vue';
import mitt from 'mitt';

const emitter = mitt();

const callAlert = ({ props, containerRef }) => {
  const AlertComponent = createApp(Alert, {
    ...props,
    onClose: () => {
      instance.$el.remove();
    },
    created() {
      emitter.on(['close'], () => {
        instance.$el.remove();
      });
    },
  });
  const element = document.createElement('div');
  const instance = AlertComponent.mount(element);

  if (containerRef) {
    instance.$el.style.position = 'absolute';
    containerRef.appendChild(instance.$el);
  } else {
    document.body.appendChild(instance.$el);
  }
};

const callModal = ({ props }) => {
  const ModalComponent = createApp(Modal, {
    ...props,
    onClose: () => {
      instance.$el.remove();
    },
    created() {
      emitter.on(['close'], () => {
        instance.$el.remove();
      });
    },
  });
  const element = document.createElement('div');
  const instance = ModalComponent.mount(element);
  document.body.appendChild(element);
};

export { callAlert, callModal };

export default {
  callAlert,
  callModal,
};

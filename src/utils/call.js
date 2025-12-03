import { createApp } from 'vue';
import Alert from '../components/Alert/Alert.vue';
import Modal from '../components/Modal/Modal.vue';
import ToastInstance from '../components/Toast/ToastManager';
import mitt from 'mitt';

const emitter = mitt();
const callAlert = ({ props, containerRef, seconds }) => {
  if (props.version === '1.1' || containerRef) {
    const AlertComponent = createApp(Alert, {
      ...props,
      seconds,
      version: '1.1',
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
  } else {
    const typeMap = {
      success: 'success',
      error: 'error',
      attention: 'attention',
      default: 'informational',
      'feedback-green': 'success',
      'feedback-red': 'error',
    };

    const toastProps = {
      timeout: seconds ? seconds * 1000 : 5000,
      type: typeMap[props.scheme || props.type] || typeMap.default,

      onClose: () => {
        emitter.emit(['close']);
      },
    };

    ToastInstance.show({
      title: props.text,
      description: '',
      ...toastProps,
    });
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

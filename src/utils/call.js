import Vue from 'vue';
import Alert from '../components/Alert/Alert.vue';
import Modal from '../components/Modal/Modal.vue';

export default {
  callAlert({ props, seconds }) {
    const AlertClass = Vue.extend(Alert);
    const instance = new AlertClass({
      propsData: { ...props, onClose: () => { instance.$el.remove(); } },
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
    setTimeout(() => { instance.$el.remove(); }, seconds * 1000);
  },

  callModal({ props }) {
    const ModalClass = Vue.extend(Modal);
    const instance = new ModalClass({
      propsData: { ...props, onClose: () => { instance.$el.remove(); } },
      created() { this.$on(['close'], () => { instance.$el.remove(); }); },
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
  },
};

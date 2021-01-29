import Vue from 'vue';
import Alert from '../components/Alert/Alert.vue';

export default {
  callAlert({ props, seconds }) {
    console.log(props);
    const AlertClass = Vue.extend(Alert);
    const instance = new AlertClass({
      propsData: { ...props, onClose: () => { instance.$el.remove(); } },
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
    setTimeout(() => { instance.$el.remove(); }, seconds * 1000);
  },
};

import Vue from 'vue';
import vClickOutside from 'v-click-outside';
import i18n from './utils/plugins/i18n';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(vClickOutside);

new Vue({
  i18n,
  render: (h) => h(App),
}).$mount('#app');

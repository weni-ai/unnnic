import Vue from 'vue';
import vClickOutside from 'v-click-outside';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(vClickOutside);

new Vue({
  render: (h) => h(App),
}).$mount('#app');

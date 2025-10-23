import { createApp } from 'vue';
import App from './App.vue';
import Unnnic from './index';
import './assets/css/tailwind.css';

const app = createApp(App);

app.use(Unnnic);
app.mount('#app');

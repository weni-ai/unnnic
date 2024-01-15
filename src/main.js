import './assets/main.css';

import { createApp } from 'vue';
import { registerGlobalComponents } from '@/components/';
import App from './App.vue';

const app = createApp(App);

registerGlobalComponents(app);

app.mount('#app');

import { createApp } from 'vue';
import App from './App.vue';
import Unnnic from '@/components';

const app = createApp(App);

app.use(Unnnic);
app.mount('#app');

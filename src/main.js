import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from './api/axios'; // Adjusted for the new file location
import './assets/styles/tailwind.css';

const app = createApp(App);
app.use(router);

// Use Axios instance globally
app.config.globalProperties.$axios = axios;

app.mount('#app');

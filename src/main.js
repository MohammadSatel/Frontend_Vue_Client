// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/tailwind.css'; // Adjust the path to where your Tailwind CSS file is located

createApp(App).use(router).mount('#app');

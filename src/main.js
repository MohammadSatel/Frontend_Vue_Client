// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/tailwind.css'; // Ensure this points to your Tailwind CSS file

createApp(App).use(router).mount('#app');

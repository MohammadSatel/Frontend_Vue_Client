// Import the necessary functions and components from Vue and other libraries
import { createApp } from 'vue';
import App from './App.vue'; // Root component
import router from './router'; // Vue Router for handling navigation
// Import a custom axios instance configured for API calls
// Make sure the file './api/axios' exports a configured axios instance
import axios from './api/axios';
// Import Tailwind CSS for styling
import './assets/styles/tailwind.css';

// Create a new Vue application instance
const app = createApp(App);

// Install the router to the application for page routing
app.use(router);

// Make the axios instance available throughout your application
// as a global property called $axios
app.config.globalProperties.$axios = axios;

// Mount the Vue application to the HTML element with id 'app'
app.mount('#app');

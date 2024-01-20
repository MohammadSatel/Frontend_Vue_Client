import axios from 'axios';

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000' // Your API base URL here
});

// If you have an auth token, uncomment the following line and replace 'YOUR_AUTH_TOKEN' with your actual token
// instance.defaults.headers.common['Authorization'] = 'Bearer YOUR_AUTH_TOKEN';

export default instance;

// src/api/axios.js
// Import the axios library to make HTTP requests
import axios from 'axios';

// Create an instance of axios with custom configuration
const instance = axios.create({
  // Set the base URL for all HTTP requests made using this instance
  // It should match the URL where your Flask backend is served
  baseURL: 'http://127.0.0.1:5000', // Your Flask API URL
});

// Export the configured instance for use throughout your application
export default instance;

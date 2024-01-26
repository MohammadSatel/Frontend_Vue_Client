import axios from 'axios';


// Create an axios instance with the base URL for your API
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: false, // This is set to false, meaning that no credentials need to be passed along with the requests.
});

// Export the service that includes the CRUD operations for books
export default {
  // Fetch all books from the server
  async getAllBooks() {
    return apiClient.get('/books/');
  },
  // Add a new book with the provided data
  async addBook(bookData) {
    return apiClient.post('/books/', bookData);
  },
  // Update an existing book identified by the 'id' with new data
  async updateBook(id, bookData) {
    return apiClient.put(`/books/${id}/`, bookData);
  },
  // Delete a book identified by the 'id'
  async deleteBook(id) {
    return apiClient.delete(`/books/${id}/`);
  },
};

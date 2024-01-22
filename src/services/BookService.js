import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: false,
});

export default {
  async getAllBooks() {
    return apiClient.get('/books/');
  },
  async addBook(bookData) {
    return apiClient.post('/books/', bookData);
  },
  async updateBook(id, bookData) {
    return apiClient.put(`/books/${id}/`, bookData);
  },
  async deleteBook(id) {
    return apiClient.delete(`/books/${id}/`);
  },
};

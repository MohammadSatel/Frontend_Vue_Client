// src/services/BookService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/books';

export default {
  async getAllBooks() {
    const response = await axios.get(API_URL);
    return response.data;
  },
  async addBook(bookData) {
    const response = await axios.post(API_URL, bookData);
    return response.data;
  },
  async updateBook(id, bookData) {
    const response = await axios.put(`${API_URL}/${id}`, bookData);
    return response.data;
  },
  async deleteBook(id) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};

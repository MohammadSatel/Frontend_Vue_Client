import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getLoans() {
    return apiClient.get('/loans');
  },
  addLoan(loan) {
    return apiClient.post('/loans', loan);
  },
  deleteLoan(id) {
    return apiClient.delete(`/loans/${id}`);
  },
  // Add more methods for updating loans if needed
};

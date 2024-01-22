// src/services/LoanService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/loans';

export default {
  getLoans() {
    return axios.get(API_URL);
  },
  createLoan(loanData) {
    return axios.post(API_URL, loanData);
  },
  deleteLoan(loanId) {
    return axios.delete(`${API_URL}/${loanId}`);
  },
  getLoanDetails(loanId) {
    return axios.get(`${API_URL}/${loanId}`);
  },
};

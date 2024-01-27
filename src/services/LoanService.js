// src/services/LoanService.js
import axios from 'axios';

// Base URL for the loan-related API endpoints
const API_URL = 'http://127.0.0.1:5000/api/loans';

export default {
  // Fetches a list of all loans from the server
  getLoans() {
    return axios.get(API_URL);
  },
  // Sends a POST request to the server to add a new loan with the provided loan data
  addLoan(loanData) {
    return axios.post(API_URL, loanData);
  },
  // Sends a DELETE request to remove a loan identified by the loanId
  deleteLoan(loanId) {
    return axios.delete(`${API_URL}/${loanId}`);
  },
  // Fetches details of a single loan identified by loanId
  getLoanDetails(loanId) {
    return axios.get(`${API_URL}/${loanId}`);
  },
};

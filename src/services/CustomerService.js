import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: false, // This is the default
});

export default {
  getCustomers() {
    return apiClient.get('/customers');
  },
  addCustomer(customer) {
    return apiClient.post('/customers', customer);
  },
  updateCustomer(id, customer) {
    return apiClient.put(`/customers/${id}`, customer);
  },
  deleteCustomer(id) {
    return apiClient.delete(`/customers/${id}`);
  },
};

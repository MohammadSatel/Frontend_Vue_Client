<template>
  <div>
    <h1>Customers</h1>
    <ul>
      <li v-for="customer in customers" :key="customer.id">
        {{ customer.name }} from {{ customer.city }}, age {{ customer.age }}
        <!-- Add other customer details here -->
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      customers: []
    };
  },
  created() {
    this.fetchCustomers();
  },
  methods: {
    fetchCustomers() {
      axios.get('http://127.0.0.1:5000/api/customers')  // Update to match your Flask API URL
        .then(response => {
          this.customers = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the customers:', error);
        });
    }
  }
};
</script>

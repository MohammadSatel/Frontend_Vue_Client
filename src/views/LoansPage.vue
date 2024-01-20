<template>
  <div>
    <h1>Loans</h1>
    <ul>
      <li v-for="loan in loans" :key="loan.id">
        {{ loan.customer_name }} has borrowed {{ loan.book_name }}
        <!-- Add other loan details here -->
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loans: []
    };
  },
  created() {
    this.fetchLoans();
  },
  methods: {
    fetchLoans() {
      axios.get('http://127.0.0.1:5000/api/loans')  // Update to match your Flask API URL
        .then(response => {
          this.loans = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the loans:', error);
        });
    }
  }
};
</script>

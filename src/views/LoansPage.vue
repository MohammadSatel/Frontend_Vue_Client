<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-semibold mb-5">Loans</h1>

    <!-- Add your form for creating a new loan here -->

    <!-- List of loans -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="loan in loans" :key="loan.id" class="bg-white p-4 rounded shadow">
        <div v-if="loan.editing">
          <!-- Add input fields for editing loan details here -->
          <button @click="updateLoan(loan)" class="bg-green-500 text-white p-2 rounded">Save</button>
          <button @click="cancelEditing(loan)" class="bg-gray-500 text-white p-2 rounded">Cancel</button>
        </div>
        <div v-else>
          <h2 class="text-xl font-bold">{{ loan.customer_name }}</h2>
          <p class="text-gray-600">Book: {{ loan.book_name }}</p>
          <p class="text-gray-600">Loan Date: {{ loan.loan_date }}</p>
          <p class="text-gray-600">Return Date: {{ loan.return_date }}</p>
          <button @click="enableEditing(loan)" class="bg-blue-500 text-white p-2 rounded">Edit</button>
          <button @click="deleteLoan(loan.id)" class="bg-red-500 text-white p-2 rounded">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoanService from '@/services/LoanService.js';

export default {
  data() {
    return {
      loans: [],
      // Define newLoan data structure based on your loan model
      newLoan: {
        customer_name: '',
        book_name: '',
        loan_date: '',
        return_date: '',
        // Other loan attributes
      },
      // ...other data properties
    };
  },
  methods: {
    fetchLoans() {
      LoanService.getLoans()
        .then(response => {
          this.loans = response.data.loans;
          // Initialize editing state
          this.loans.forEach(loan => this.$set(loan, 'editing', false));
        })
        .catch(error => {
          console.error('Error fetching loans:', error);
        });
    },
    addLoan() {
      LoanService.addLoan(this.newLoan)
        .then(() => {
          this.fetchLoans();
          // Reset the newLoan data
          this.newLoan = {
            // Reset structure
          };
        })
        .catch(error => {
          console.error('Error adding loan:', error);
        });
    },
    deleteLoan(id) {
      LoanService.deleteLoan(id)
        .then(() => {
          this.fetchLoans();
        })
        .catch(error => {
          console.error('Error deleting loan:', error);
        });
    },
    enableEditing(loan) {
      loan.editing = true;
    },
    updateLoan(loan) {
      const updatedLoan = {
        // Prepare the updated loan data
      };
      LoanService.updateLoan(loan.id, updatedLoan)
        .then(() => {
          loan.editing = false;
          this.fetchLoans();
        })
        .catch(error => {
          console.error('Error updating loan:', error);
        });
    },
    cancelEditing(loan) {
      loan.editing = false;
      // Optionally reset to original data or re-fetch
      this.fetchLoans();
    },
  },
  mounted() {
    this.fetchLoans();
  }
};
</script>

<style scoped>
/* Add any custom styles for your Loans page here */
</style>

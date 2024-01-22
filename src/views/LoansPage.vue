<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-semibold mb-5">Loans Management</h1>

    <!-- Form for adding a new loan -->
    <form @submit.prevent="addLoan" class="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Select customer -->
      <div>
        <label for="customer">Customer:</label>
        <select id="customer" v-model="newLoan.customerId" required class="block w-full mt-1 p-2 border border-gray-300 rounded">
          <option disabled value="">Select a customer</option>
          <option v-for="customer in customers" :value="customer.id" :key="customer.id">{{ customer.name }}</option>
        </select>
      </div>

      <!-- Select book -->
      <div>
        <label for="book">Book:</label>
        <select id="book" v-model="newLoan.bookId" required class="block w-full mt-1 p-2 border border-gray-300 rounded">
          <option disabled value="">Select a book</option>
          <option v-for="book in books" :value="book.id" :key="book.id">{{ book.name }}</option>
        </select>
      </div>

      <!-- Input for loan date -->
      <div>
        <label for="loanDate">Loan Date:</label>
        <input id="loanDate" type="date" v-model="newLoan.loanDate" required class="block w-full mt-1 p-2 border border-gray-300 rounded">
      </div>

      <!-- Input for return date -->
      <div>
        <label for="returnDate">Return Date:</label>
        <input id="returnDate" type="date" v-model="newLoan.returnDate" required class="block w-full mt-1 p-2 border border-gray-300 rounded">
      </div>

      <!-- Submit button -->
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Loan</button>
    </form>

    <!-- List of loans -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="loan in loans" :key="loan.id" class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-bold">{{ loan.customerName }} - {{ loan.bookName }}</h2>
        <p>Loan Date: {{ new Date(loan.loanDate).toLocaleDateString() }}</p>
        <p>Return Date: {{ new Date(loan.returnDate).toLocaleDateString() }}</p>
        <button @click="deleteLoan(loan.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mt-2">Return Book</button>
      </div>
    </div>
  </div>
</template>

<script>
import LoanService from '@/services/LoanService.js';
import CustomerService from '@/services/CustomerService.js';
import BookService from '@/services/BookService.js';

export default {
  data() {
    return {
      loans: [],
      customers: [],
      books: [],
      newLoan: {
        customerId: '',
        bookId: '',
        loanDate: '',
        returnDate: '',
      }
    };
  },
  methods: {
    fetchLoans() {
      LoanService.getLoans()
        .then(response => {
          this.loans = response.data.loans;
        })
        .catch(error => {
          console.error('Error fetching loans:', error);
        });
    },
    fetchCustomers() {
      CustomerService.getCustomers()
        .then(response => {
          this.customers = response.data.customers;
        })
        .catch(error => {
          console.error('Error fetching customers:', error);
        });
    },
    fetchBooks() {
      BookService.getAllBooks()
        .then(response => {
          this.books = response.data.books;
        })
        .catch(error => {
          console.error('Error fetching books:', error);
        });
    },
    addLoan() {
      const loanData = {
        customerId: this.newLoan.customerId,
        bookId: this.newLoan.bookId,
        loanDate: this.newLoan.loanDate,
        returnDate: this.newLoan.returnDate
      };
      LoanService.addLoan(loanData)
        .then(() => {
          this.fetchLoans();
          this.resetForm();
        })
        .catch(error => {
          console.error('Error creating loan:', error);
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
    resetForm() {
      this.newLoan = {
        customerId: '',
        bookId: '',
        loanDate: '',
        returnDate: ''
      };
    }
  },
  mounted() {
    this.fetchLoans();
    this.fetchCustomers();
    this.fetchBooks();
  }
};
</script>

<style scoped>
/* Custom styles */
</style>

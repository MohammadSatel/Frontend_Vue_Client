<template>
  <div class="container mx-auto p-6">
    <!-- Page title -->
    <h1 class="text-3xl font-semibold mb-5">Customers</h1>

    <!-- Search bar for customers -->
    <div class="mb-6">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search customers..."
        class="p-2 border border-gray-300 rounded w-full"
      />
    </div>

    <!-- Form for adding a new customer -->
    <form @submit.prevent="addCustomer" class="mb-6 flex flex-wrap gap-4">
      <!-- Input fields for the new customer's properties -->
      <input
        v-model="newCustomer.name"
        placeholder="Customer Name"
        required
        class="p-2 border border-gray-300 rounded"
      />
      <input
        v-model="newCustomer.city"
        placeholder="City"
        required
        class="p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        v-model="newCustomer.age"
        placeholder="Age"
        required
        class="p-2 border border-gray-300 rounded"
      />
      <!-- Button to submit the form and add a new customer -->
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Customer
      </button>
    </form>

    <!-- Grid display for customers -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Individual customer card -->
      <div
        v-for="customer in filteredCustomers"
        :key="customer.id"
        class="bg-white p-4 rounded shadow"
      >
        <!-- Editable fields for updating customer details -->
        <div v-if="customer.editing">
          <input v-model="customer.name" class="p-2 border border-gray-300 rounded">
          <input v-model="customer.city" class="p-2 border border-gray-300 rounded">
          <input v-model.number="customer.age" type="number" class="p-2 border border-gray-300 rounded">
          <!-- Buttons to save or cancel the update -->
          <button @click="updateCustomer(customer)" class="bg-green-500 text-white p-2 rounded">Save</button>
          <button @click="cancelEditing(customer)" class="bg-gray-500 text-white p-2 rounded">Cancel</button>
        </div>
        <div v-else>
          <!-- Display customer details -->
          <h2 class="text-xl font-bold">{{ customer.name }}</h2>
          <p class="text-gray-600">City: {{ customer.city }}</p>
          <p class="text-gray-600">Age: {{ customer.age }}</p>
          <!-- Buttons to edit or delete the customer -->
          <button @click="enableEditing(customer)" class="bg-blue-500 text-white p-2 rounded">Edit</button>
          <button @click="deleteCustomer(customer.id)" class="bg-red-500 text-white p-2 rounded">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Import axios for making API requests

export default {
  data() {
    return {
      customers: [], // Array to store customers
      newCustomer: { // Model for the new customer form
        name: '',
        city: '',
        age: ''
      },
      searchQuery: '' // Search query for the search bar
    };
  },
  computed: {
    // Computed property to filter customers based on the search query
    filteredCustomers() {
      return this.searchQuery
        ? this.customers.filter(customer =>
            customer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            customer.city.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        : this.customers;
    }
  },
  methods: {
    // Method to fetch customers from the server
    fetchCustomers() {
      axios.get('/api/customers/')
        .then(response => {
          this.customers = response.data.customers;
          // Ensure each customer has an 'editing' property
          this.customers.forEach(customer => this.$set(customer, 'editing', false));
        })
        .catch(error => {
          console.error("Error fetching customers:", error);
        });
    },
    // Method to add a new customer
    addCustomer() {
      axios.post('/api/customers/', this.newCustomer)
        .then(() => {
          this.fetchCustomers(); // Refresh the list of customers
          this.newCustomer = { name: '', city: '', age: '' }; // Reset the form fields
        })
        .catch(error => {
          console.error("Error adding customer:", error);
        });
    },
    // Method to delete a customer
    deleteCustomer(customerId) {
      axios.delete(`/api/customers/${customerId}/`)
        .then(() => {
          this.fetchCustomers(); // Refresh the list of customers
        })
        .catch(error => {
          console.error("Error deleting customer:", error);
        });
    },
    // Method to enable editing mode for a customer
    enableEditing(customer) {
      customer.editing = true;
    },
    // Method to update customer details
    updateCustomer(customer) {
      const updatedCustomer = {
        name: customer.name,
        city: customer.city,
        age: customer.age
      };

      axios.put(`/api/customers/${customer.id}/`, updatedCustomer)
        .then(() => {
          customer.editing = false;
          this.fetchCustomers(); // Refresh the list of customers
        })
        .catch(error => {
          console.error("Error updating customer:", error);
        });
    },
    // Method to cancel editing mode
    cancelEditing(customer) {
      customer.editing = false;
      this.fetchCustomers(); // To revert any unsaved changes
    }
  },
  mounted() {
    this.fetchCustomers(); // Fetch customers when the component is mounted
  }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>

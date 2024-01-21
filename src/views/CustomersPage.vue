<template>
  <div class="container mx-auto p-6">
    <!-- Page Title -->
    <h1 class="text-3xl font-semibold mb-5">Customers</h1>

    <!-- Search Bar -->
    <div class="mb-6">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search customers..."
        class="p-2 border border-gray-300 rounded w-full"
      />
    </div>

    <!-- Form for Adding New Customer -->
    <form @submit.prevent="addCustomer" class="mb-6 flex flex-wrap gap-4">
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
        v-model.number="newCustomer.age"
        placeholder="Age"
        required
        class="p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Customer
      </button>
    </form>

    <!-- Customer List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="customer in filteredCustomers"
        :key="customer.id"
        class="bg-white p-4 rounded shadow"
      >
        <!-- Editable Fields for Update -->
        <div v-if="customer.editing">
          <input v-model="customer.name" class="p-2 border border-gray-300 rounded" />
          <input v-model="customer.city" class="p-2 border border-gray-300 rounded" />
          <input v-model.number="customer.age" type="number" class="p-2 border border-gray-300 rounded" />
          <button @click="updateCustomer(customer)" class="bg-green-500 text-white p-2 rounded">Save</button>
          <button @click="cancelEditing(customer)" class="bg-gray-500 text-white p-2 rounded">Cancel</button>
        </div>

        <!-- Display Customer Details -->
        <div v-else>
          <h2 class="text-xl font-bold">{{ customer.name }}</h2>
          <p class="text-gray-600">City: {{ customer.city }}</p>
          <p class="text-gray-600">Age: {{ customer.age }}</p>
          <button @click="enableEditing(customer)" class="bg-blue-500 text-white p-2 rounded">Edit</button>
          <button @click="deleteCustomer(customer.id)" class="bg-red-500 text-white p-2 rounded">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerService from '@/services/CustomerService.js'; // Ensure this path is correct

export default {
  data() {
    return {
      customers: [],
      newCustomer: {
        name: '',
        city: '',
        age: 0
      },
      searchQuery: ''
    };
  },
  computed: {
    filteredCustomers() {
      // Filters the customers based on the search query
      return this.searchQuery
        ? this.customers.filter(customer =>
            customer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            customer.city.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        : this.customers;
    }
  },
  methods: {
    fetchCustomers() {
      // Fetches the list of customers from the server
      CustomerService.getCustomers()
        .then(response => {
          this.customers = response.data.customers;
          // Initializes the 'editing' property for each customer
          this.customers.forEach(customer => this.$set(customer, 'editing', false));
        })
        .catch(error => {
          console.error('Error fetching customers:', error);
        });
    },
    addCustomer() {
      // Adds a new customer to the server
      CustomerService.addCustomer(this.newCustomer)
        .then(() => {
          this.fetchCustomers();
          // Resets the form fields
          this.newCustomer = { name: '', city: '', age: 0 };
        })
        .catch(error => {
          console.error('Error adding customer:', error);
        });
    },
    deleteCustomer(customerId) {
      // Deletes a customer from the server
      CustomerService.deleteCustomer(customerId)
        .then(() => {
          this.fetchCustomers();
        })
        .catch(error => {
          console.error('Error deleting customer:', error);
        });
    },
    enableEditing(customer) {
      // Enables editing mode for a customer
      customer.editing = true;
    },
    updateCustomer(customer) {
      // Updates a customer's details on the server
      const updatedCustomer = {
        name: customer.name,
        city: customer.city,
        age: customer.age
      };
      CustomerService.updateCustomer(customer.id, updatedCustomer)
        .then(() => {
          // Disables editing mode and refreshes the list
          customer.editing = false;
          this.fetchCustomers();
        })
        .catch(error => {
          console.error('Error updating customer:', error);
        });
    },
    cancelEditing(customer) {
      // Cancels editing mode without saving changes
      customer.editing = false;
      // Optionally, refresh the list to revert any unsaved changes
      // this.fetchCustomers();
    }
  },
  mounted() {
    // Fetches the customer list when the component is mounted
    this.fetchCustomers();
  }
};
</script>

<style scoped>
/* Custom styles for the customer page */
</style>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-semibold mb-5">Customers</h1>

    <!-- Search bar -->
    <div class="mb-6">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search customers..."
        class="p-2 border border-gray-300 rounded w-full"
      />
    </div>

    <!-- Form for adding a new customer -->
    <form @submit.prevent="addCustomer" class="mb-6 flex gap-4">
      <input v-model="newCustomer.name" placeholder="Customer Name" required class="p-2 border border-gray-300 rounded">
      <input v-model="newCustomer.city" placeholder="City" required class="p-2 border border-gray-300 rounded">
      <input type="number" v-model.number="newCustomer.age" placeholder="Age" required class="p-2 border border-gray-300 rounded">
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Customer</button>
    </form>

    <!-- List of customers -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="customer in filteredCustomers" :key="customer.id" class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-bold">{{ customer.name }}</h2>
        <p>City: {{ customer.city }}</p>
        <p>Age: {{ customer.age }}</p>
        <div class="flex justify-between">
          <button @click="enableEditing(customer)" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded">Edit</button>
          <button @click="deleteCustomer(customer.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Delete</button>
        </div>
        <!-- Inline edit form -->
        <div v-if="customer.editing" class="mt-4">
          <input v-model="customer.name" placeholder="Customer Name" required class="p-2 border border-gray-300 rounded">
          <input v-model="customer.city" placeholder="City" required class="p-2 border border-gray-300 rounded">
          <input type="number" v-model.number="customer.age" placeholder="Age" required class="p-2 border border-gray-300 rounded">
          <button @click="updateCustomer(customer)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">Save</button>
          <button @click="cancelEditing(customer)" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerService from '@/services/CustomerService.js'; // Make sure to have a CustomerService.js with appropriate methods

export default {
  data() {
    return {
      customers: [],
      newCustomer: {
        name: '',
        city: '',
        age: 0,
      },
      searchQuery: '',
    };
  },
  computed: {
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
    fetchCustomers() {
      CustomerService.getCustomers()
        .then(response => {
          this.customers = response.data;
        })
        .catch(error => {
          console.error("There was an error fetching the customers:", error);
        });
    },
    addCustomer() {
      CustomerService.addCustomer(this.newCustomer)
        .then(() => {
          this.fetchCustomers();
          this.resetForm();
        })
        .catch(error => {
          console.error("There was an error adding the customer:", error);
        });
    },
    resetForm() {
      this.newCustomer = { name: '', city: '', age: 0 };
    },
    deleteCustomer(id) {
      CustomerService.deleteCustomer(id)
        .then(() => {
          this.fetchCustomers();
        })
        .catch(error => {
          console.error("There was an error deleting the customer:", error);
        });
    },
    enableEditing(customer) {
      this.$set(customer, 'editing', true);
    },
    updateCustomer(customer) {
      CustomerService.updateCustomer(customer.id, customer)
        .then(() => {
          customer.editing = false;
          this.fetchCustomers();
        })
        .catch(error => {
          console.error("There was an error updating the customer:", error);
        });
    },
    cancelEditing(customer) {
      customer.editing = false;
      this.fetchCustomers();
    },
  },
  mounted() {
    this.fetchCustomers();
  }
};
</script>

<style scoped>
/* Add any custom styles for your customer component */
</style>

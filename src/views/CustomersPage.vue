<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-semibold mb-5">Customers</h1>

    <div class="mb-6">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search customers..."
        class="p-2 border border-gray-300 rounded w-full"
      />
    </div>

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

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="customer in filteredCustomers"
        :key="customer.id"
        class="bg-white p-4 rounded shadow"
      >
        <div v-if="customer.editing">
          <input v-model="customer.name" placeholder="Customer Name" class="p-2 border border-gray-300 rounded" />
          <input v-model="customer.city" placeholder="City" class="p-2 border border-gray-300 rounded" />
          <input v-model.number="customer.age" type="number" placeholder="Age" class="p-2 border border-gray-300 rounded" />
          <button @click="updateCustomer(customer)" class="bg-green-500 text-white p-2 rounded">Save</button>
          <button @click="cancelEditing(customer)" class="bg-gray-500 text-white p-2 rounded">Cancel</button>
        </div>
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
          this.customers.forEach(customer => this.$set(customer, 'editing', false));
        })
        .catch(error => {
          console.error('Error fetching customers:', error);
        });
    },
    addCustomer() {
      CustomerService.addCustomer(this.newCustomer)
        .then(() => {
          this.fetchCustomers();
          this.newCustomer = { name: '', city: '', age: 0 };
        })
        .catch(error => {
          console.error('Error adding customer:', error);
        });
    },
    deleteCustomer(customerId) {
      CustomerService.deleteCustomer(customerId)
        .then(() => {
          this.fetchCustomers();
        })
        .catch(error => {
          console.error('Error deleting customer:', error);
        });
    },
    enableEditing(customer) {
      customer.editing = true;
    },
    updateCustomer(customer) {
      const updatedCustomer = {
        name: customer.name,
        city: customer.city,
        age: customer.age
      };
      CustomerService.updateCustomer(customer.id, updatedCustomer)
        .then(() => {
          customer.editing = false;
          this.fetchCustomers();
        })
        .catch(error => {
          console.error('Error updating customer:', error);
        });
    },
    cancelEditing(customer) {
      customer.editing = false;
      this.fetchCustomers();
    }
  },
  mounted() {
    this.fetchCustomers();
  }
};
</script>

<style scoped>
/* Add any custom styles for your customer page here */
</style>

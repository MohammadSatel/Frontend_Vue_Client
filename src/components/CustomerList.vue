<template>
  <div class="customer-list">
    <ul>
      <!-- List all customers with options to edit and delete -->
      <li v-for="customer in customers" :key="customer.id" class="customer-item">
        <span>{{ customer.name }}</span>
        <!-- Add buttons for editing and deleting customers -->
        <button @click="$emit('edit-customer', customer)">Edit</button>
        <button @click="$emit('delete-customer', customer.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    customers: Array,
  },
  // Component logic goes here
};
</script>

<style scoped>
.customer-list {
  /* Styles go here */
}

.customer-item {
  /* Additional styles for customer items */
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  align-items: center;
}

.customer-item button {
  /* Styles for buttons */
  margin-left: 1rem;
}
</style>

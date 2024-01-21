<template>
  <div class="customer-list">
    <ul>
      <li v-for="customer in customers" :key="customer.id" class="customer-item">
        <span>{{ customer.name }} from {{ customer.city }}, {{ customer.age }} years old</span>
        <button @click="$emit('edit-customer', customer)">Edit</button>
        <button @click="$emit('delete-customer', customer.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    customers: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.customer-list ul {
  list-style-type: none;
  padding: 0;
}

.customer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.customer-item button {
  margin-left: 1rem;
}
</style>

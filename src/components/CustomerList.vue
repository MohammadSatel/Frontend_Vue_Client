<template>
    <div class="customer-list">
      <ul>
        <!-- This will list all customers. Replace with data from your API -->
        <li v-for="customer in customers" :key="customer.id">{{ customer.name }}</li>
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
  /* Your CSS for CustomerList.vue */
  .customer-list {
    /* Styles go here */
  }
  </style>
  
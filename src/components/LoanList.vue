<template>
    <div class="loan-list">
      <ul>
        <!-- This will list all loans. Replace with data from your API -->
        <li v-for="loan in loans" :key="loan.id">{{ loan.bookName }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      loans: Array,
    },
    // Component logic goes here
  };
  </script>
  
  <style scoped>
  /* Your CSS for LoanList.vue */
  .loan-list {
    /* Styles go here */
  }
  </style>
  
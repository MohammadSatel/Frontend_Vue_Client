<template>
  <div class="loan-list">
    <!-- Display a message if there are no loans -->
    <p v-if="loans.length === 0">No loans to display</p>

    <!-- List of loans -->
    <ul>
      <li v-for="loan in loans" :key="loan.id">
        <!-- Loan details -->
        <div>
          <!-- Displaying the book name -->
          <h3>{{ loan.bookName }}</h3>
          <!-- Displaying the customer name -->
          <p>Loaned by: {{ loan.customerName }}</p>
          <!-- Formatting and displaying the loan and return dates -->
          <p>Loan Date: {{ formatDate(loan.loanDate) }}</p>
          <p>Return Date: {{ formatDate(loan.returnDate) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // Props passed down from the parent component, with validation
  props: {
    loans: {
      type: Array,
      default: () => [], // Default to an empty array if no loans are provided
    },
  },

  methods: {
    // Method to format date strings for readability
    formatDate(dateString) {
      const date = new Date(dateString);
      // Locale string options for date formatting
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      // Adjust 'undefined' to your locale if needed
      return date.toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
/* Scoped CSS for styling the loan list component */
.loan-list ul {
  list-style-type: none; /* Remove default list styling */
  padding: 0;
}

.loan-list li {
  margin-bottom: 20px; /* Space between list items */
  padding: 10px; /* Padding inside each list item */
  background-color: #f3f3f3; /* Light grey background for each item */
  border-radius: 5px; /* Rounded corners for the list items */
}

.loan-list h3 {
  margin-top: 0; /* Remove the top margin for the book title */
}
</style>

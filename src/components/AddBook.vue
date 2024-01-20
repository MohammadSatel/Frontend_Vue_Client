<template>
  <form @submit.prevent="addBook">
    <input type="text" v-model="newBook.name" placeholder="Book Name" required>
    <input type="text" v-model="newBook.author" placeholder="Author" required>
    <input type="number" v-model="newBook.year_published" placeholder="Year Published" required>
    <select v-model="newBook.book_type" required>
      <option value="">Select Type</option>
      <option value="fiction">Fiction</option>
      <option value="non-fiction">Non-Fiction</option>
    </select>
    <button type="submit">Add Book</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      // Data model for a new book
      newBook: {
        name: '',
        author: '',
        year_published: '',
        book_type: ''
      }
    };
  },
  methods: {
    addBook() {
      // Posts the new book to the server
      this.$axios.post('/api/books/', this.newBook)
        .then(() => {
          this.$emit('bookAdded'); // Emit an event after adding the book
          this.resetForm(); // Reset the form fields
        })
        .catch(error => {
          // Handle the error response here
          console.error("There was an error adding the book:", error.response.data);
        });
    },
    resetForm() {
      // Resets the newBook object to clear the form
      this.newBook = { name: '', author: '', year_published: '', book_type: '' };
    }
  }
};
</script>

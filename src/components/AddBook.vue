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
// Assume axios is globally imported, otherwise import it
export default {
  props: {
    onBookAdded: Function // Parent component can pass a callback
  },
  data() {
    return {
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
      axios.post('/api/books/', this.newBook)
        .then(response => {
          this.$emit('bookAdded'); // Notify parent component
          this.newBook = { name: '', author: '', year_published: '', book_type: '' }; // Reset form
        })
        .catch(error => {
          console.error("There was an error adding the book:", error);
        });
    }
  }
};
</script>

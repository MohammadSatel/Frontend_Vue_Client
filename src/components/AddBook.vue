<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-4">Add New Book</h1>
    <form @submit.prevent="addBook">
      <div class="mb-4">
        <label class="block">Name</label>
        <input type="text" v-model="newBook.name" class="border rounded p-2 w-full" required>
      </div>
      <div class="mb-4">
        <label class="block">Author</label>
        <input type="text" v-model="newBook.author" class="border rounded p-2 w-full" required>
      </div>
      <div class="mb-4">
        <label class="block">Year Published</label>
        <input type="number" v-model="newBook.year_published" class="border rounded p-2 w-full" required>
      </div>
      <div class="mb-4">
        <label class="block">Book Type</label>
        <select v-model="newBook.book_type" class="border rounded p-2 w-full" required>
          <option value="2days">Up to 2 days</option>
          <option value="5days">Up to 5 days</option>
          <option value="10days">Up to 10 days</option>
        </select>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Book</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newBook: {
        name: '',
        author: '',
        year_published: null,
        book_type: ''
      }
    };
  },
  methods: {
    addBook() {
      axios.post('http://127.0.0.1:5000/books/create', this.newBook)
        .then(response => {
          // Redirect to the book list or update state accordingly
          this.$router.push('/books'); // Assuming '/books' is the route for the BookList component
        })
        .catch(error => {
          console.error(error);
          alert('An error occurred.');
        });
    }
  }
};
</script>

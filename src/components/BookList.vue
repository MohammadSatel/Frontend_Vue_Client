<template>
    <div class="container mx-auto">
      <h1 class="text-2xl font-bold mb-4">Book List</h1>
      <div v-for="book in books" :key="book.id" class="mb-4">
        <div class="p-4 shadow-md rounded">
          <h2 class="text-xl">{{ book.name }}</h2>
          <p>Author: {{ book.author }}</p>
          <p>Year Published: {{ book.year_published }}</p>
          <p>Type: {{ book.book_type }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        books: []
      };
    },
    mounted() {
      this.fetchBooks();
    },
    methods: {
      fetchBooks() {
        axios.get('/api/books')
          .then(response => {
            this.books = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  </script>
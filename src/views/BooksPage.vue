<template>
  <div>
    <h1>Books</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} by {{ book.author }}
        <!-- Include edit and delete buttons -->
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: [],
      newBook: {
        name: '',
        author: '',
        year_published: '',
        book_type: '',
        status: 'available' // Assuming a default status
      }
    };
  },
  methods: {
    fetchBooks() {
      axios.get('/api/books/')
        .then(response => {
          this.books = response.data.books;
        })
        .catch(error => {
          console.error("There was an error fetching the books:", error);
        });
    },
    addBook() {
      axios.post('/api/books/', this.newBook)
        .then(response => {
          this.fetchBooks(); // Refresh the list
        })
        .catch(error => {
          console.error("There was an error adding the book:", error);
        });
    },
    deleteBook(bookId) {
      axios.delete(`/api/books/${bookId}/`)
        .then(response => {
          this.fetchBooks(); // Refresh the list
        })
        .catch(error => {
          console.error("There was an error deleting the book:", error);
        });
    }
  },
  mounted() {
    this.fetchBooks();
  }
};
</script>

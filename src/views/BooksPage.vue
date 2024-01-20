<template>
  <div>
    <h1>Books</h1>
    <form @submit.prevent="addBook">
      <input v-model="newBook.name" placeholder="Book Name" required>
      <input v-model="newBook.author" placeholder="Author" required>
      <input type="number" v-model="newBook.year_published" placeholder="Year Published" required>
      <input v-model="newBook.book_type" placeholder="Book Type" required>
      <button type="submit">Add Book</button>
    </form>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} by {{ book.author }}
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [],
      newBook: {
        name: '',
        author: '',
        year_published: '',
        book_type: '',
        status: 'available'
      }
    };
  },
  methods: {
    fetchBooks() {
      this.$axios.get('/api/books/')
        .then(response => {
          this.books = response.data;  // Assuming the API returns the array of books directly
        })
        .catch(error => {
          console.error("There was an error fetching the books:", error);
        });
    },
    addBook() {
      this.$axios.post('/api/books/', this.newBook)
        .then(() => {
          this.fetchBooks(); // Refresh the list
        })
        .catch(error => {
          console.error("There was an error adding the book:", error);
        });
    },
    deleteBook(bookId) {
    if (!bookId) {
      console.error("Cannot delete book: bookId is undefined.");
      return;
    }
    this.$axios.delete(`/api/books/${bookId}/`)
      .then(() => {
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

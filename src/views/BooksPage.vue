<template>
  
  <div class="container mx-auto p-6">
    <!-- Title -->
    <h1 class="text-3xl font-semibold mb-5">Books</h1>

    <!-- Search Bar -->
    <div class="mb-6">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search books..."
        class="p-2 border border-gray-300 rounded w-full"
      />
    </div>

    <!-- Form for adding a new book -->
    <form @submit.prevent="addBook" class="mb-6 flex flex-wrap gap-4">
      <input
        v-model="newBook.name"
        placeholder="Book Name"
        required
        class="p-2 border border-gray-300 rounded"
      />
      <input
        v-model="newBook.author"
        placeholder="Author"
        required
        class="p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        v-model="newBook.year_published"
        placeholder="Year Published"
        required
        class="p-2 border border-gray-300 rounded"
      />
      <input
        v-model="newBook.book_type"
        placeholder="Book Type"
        required
        class="p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Book
      </button>
    </form>

    <!-- Grid of books -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Book Card -->
      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="bg-white p-4 rounded shadow"
      >
        <h2 class="text-xl font-bold">{{ book.name }}</h2>
        <p class="text-gray-600">Author: {{ book.author }}</p>
        <p class="text-gray-600">Year: {{ book.year_published }}</p>
        <p class="text-gray-600">Type: {{ book.book_type }}</p>
        <button
          @click="deleteBook(book.id)"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mt-2"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [], // Holds the array of books
      newBook: {
        name: '',
        author: '',
        year_published: '',
        book_type: '',
        status: 'available' // Default status for new books
      },
      searchQuery: '' // Bound to the search input
    };
  },
  computed: {
    filteredBooks() {
      // Filters books based on the search query
      return this.searchQuery
        ? this.books.filter((book) =>
            book.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        : this.books;
    }
  },
  methods: {
    fetchBooks() {
      // Fetches books from the server
      this.$axios.get('/api/books/')
        .then((response) => {
          this.books = response.data.books; // Assumes response.data.books is the array of books
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    },
    addBook() {
      // Adds a new book to the server
      this.$axios.post('/api/books/', this.newBook)
        .then(() => {
          this.fetchBooks(); // Refresh the books list
          this.newBook = { name: '', author: '', year_published: '', book_type: '', status: 'available' }; // Reset form
        })
        .catch((error) => {
          console.error("Error adding book:", error);
        });
    },
    deleteBook(bookId) {
      // Deletes a book from the server
      this.$axios.delete(`/api/books/${bookId}/`)
        .then(() => {
          this.fetchBooks(); // Refresh the books list
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
        });
    },
    enableEditing(book) {
      // We are adding an 'editing' property to activate the edit mode
      this.$set(book, 'editing', true);
    },
    updateBook(book) {
      // Perform the update request here
      const updatedData = {
        name: book.name,
        author: book.author,
        year_published: book.year_published,
        book_type: book.book_type
      };
      this.$axios.put(`/api/books/${book.id}/`, updatedData)
        .then(response => {
          // On successful update, exit editing mode and refresh the list
          book.editing = false;
          this.fetchBooks();
        })
        .catch(error => {
          console.error("There was an error updating the book:", error);
        });
    },
    cancelEditing(book) {
      // Exit editing mode without saving changes
      book.editing = false;
      // Optionally, refresh the list to revert changes
      // this.fetchBooks();
    },
  },
  mounted() {
    this.fetchBooks(); // Fetch books when the component is mounted
  }
};
</script>

<style scoped>
/* Custom styles for your component */
</style>

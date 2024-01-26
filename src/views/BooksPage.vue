<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-semibold mb-5">Books</h1>

    <div class="mb-6">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search books..."
        class="p-2 border border-gray-300 rounded w-full"
      />
    </div>

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

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="bg-white p-4 rounded shadow"
      >
        <div v-if="book.editing">
          <input type="text" v-model="book.name" class="p-2 border border-gray-300 rounded">
          <input type="text" v-model="book.author" class="p-2 border border-gray-300 rounded">
          <input type="number" v-model="book.year_published" class="p-2 border border-gray-300 rounded">
          <input type="text" v-model="book.book_type" class="p-2 border border-gray-300 rounded">
          <button @click="updateBook(book)" class="bg-green-500 text-white p-2 rounded">Save</button>
          <button @click="cancelEditing(book)" class="bg-gray-500 text-white p-2 rounded">Cancel</button>
        </div>
        <div v-else>
          <h2 class="text-xl font-bold">{{ book.name }}</h2>
          <p class="text-gray-600">Author: {{ book.author }}</p>
          <p class="text-gray-600">Year: {{ book.year_published }}</p>
          <p class="text-gray-600">Type: {{ book.book_type }}</p>
          <button @click="enableEditing(book)" class="bg-blue-500 text-white p-2 rounded">Edit</button>
          <button @click="deleteBook(book.id)" class="bg-red-500 text-white p-2 rounded">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//rrtest
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
      },
      searchQuery: ''
    };
  },
  computed: {
    filteredBooks() {
      return this.searchQuery
        ? this.books.filter(book =>
            book.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        : this.books;
    }
  },
  methods: {
    fetchBooks() {
      this.$axios.get('/api/books/')
        .then(response => {
          this.books = response.data.books;
          // Ensure each book has an 'editing' property
          this.books.forEach(book => { book.editing = false; });
        })
        .catch(error => {
          console.error("Error fetching books:", error);
        });
    },
    addBook() {
      this.$axios.post('/api/books/', this.newBook)
        .then(() => {
          this.fetchBooks();
          this.newBook = { name: '', author: '', year_published: '', book_type: '', status: 'available' };
        })
        .catch(error => {
          console.error("Error adding book:", error);
        });
    },
    deleteBook(bookId) {
      this.$axios.delete(`/api/books/${bookId}/`)
        .then(() => {
          this.fetchBooks();
        })
        .catch(error => {
          console.error("Error deleting book:", error);
        });
    },
    enableEditing(book) {
      book.editing = true;
    },
    updateBook(book) {
      const updatedBook = {
        name: book.name,
        author: book.author,
        year_published: book.year_published,
        book_type: book.book_type,
        status: book.status // Include the status if you have it in your form
      };

      this.$axios.put(`/api/books/${book.id}/`, updatedBook)
        .then(() => {
          book.editing = false;
          this.fetchBooks();
        })
        .catch(error => {
          console.error("Error updating book:", error);
        });
    },
    cancelEditing(book) {
      book.editing = false;
      this.fetchBooks(); // To revert any unsaved changes
    }
  },
  mounted() {
    this.fetchBooks();
  }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>

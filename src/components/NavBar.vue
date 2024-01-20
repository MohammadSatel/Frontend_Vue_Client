<template>
  <nav class="bg-gray-800 text-white fixed inset-x-0 top-0 z-50 shadow-md">
    <div class="container mx-auto px-6 py-3 flex justify-between items-center">
      <a class="font-semibold text-xl tracking-tight" href="/">Book Library</a>
      <div class="flex items-center">
        <router-link to="/" class="px-3 py-2 rounded hover:bg-gray-700">Home</router-link>
        <router-link to="/books" class="px-3 py-2 rounded hover:bg-gray-700">Books</router-link>
        <router-link to="/customers" class="px-3 py-2 rounded hover:bg-gray-700">Customers</router-link>
        <router-link to="/loans" class="px-3 py-2 rounded hover:bg-gray-700">Loans</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style>
/* Additional styles if needed */
</style>

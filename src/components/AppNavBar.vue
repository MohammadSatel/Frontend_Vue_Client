<template>
  <nav class="bg-gray-800 shadow-lg">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between">
        <div class="flex space-x-7">
          <div>
            <!-- Website Logo -->
            <a href="#" class="flex items-center py-4 px-2">
              <span class="font-semibold text-white text-lg">Navbar</span>
            </a>
          </div>
          <!-- Primary Navbar items -->
          <div class="hidden md:flex items-center space-x-1">
            <a href="/" class="py-4 px-2 text-gray-300 hover:text-white">Home</a>
            <a href="/books" class="py-4 px-2 text-gray-300 hover:text-white">Books</a>
            <a href="/customers" class="py-4 px-2 text-gray-300 hover:text-white">Customers</a>
            <a href="/loans" class="py-4 px-2 text-gray-300 hover:text-white">Loans</a>
          </div>
        </div>
        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button class="outline-none mobile-menu-button">
            <svg class=" w-6 h-6 text-gray-500 hover:text-white "
              x-show="!showMenu"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
  <!-- Mobile menu -->
  <div class="hidden mobile-menu">
    <ul class="">
      <li class="active"><a href="/" class="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
      <li><a href="#services" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Services</a></li>
      <li><a href="#about" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</a></li>
      <li><a href="#contact" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Contact</a></li>
    </ul>
  </div>
</template>


<script>
export default {
  name: 'NavBar',
};
</script>

<style>
/* Additional styles if needed */
</style>

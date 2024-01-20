// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import BooksPage from '@/views/BooksPage.vue';
import CustomersPage from '@/views/CustomersPage.vue';
import LoansPage from '@/views/LoansPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/books', name: 'Books', component: BooksPage },
  { path: '/customers', name: 'Customers', component: CustomersPage },
  { path: '/loans', name: 'Loans', component: LoansPage },
  // Define other routes here
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

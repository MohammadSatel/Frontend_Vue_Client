<template>
  <div id="app">
    <AppNavBar />
    <router-view/>
    <AppFooter />
  </div>
</template>

<script>
import AppNavBar from './components/AppNavBar.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppNavBar,
    AppFooter
  }
};
</script>


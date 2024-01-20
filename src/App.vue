<!-- src/App.vue -->
<template>
  <div id="app">
    <AppNavBar />
    <router-view></router-view> <!-- This is where your routed components will be displayed -->
  </div>
</template>


<script>
import AppNavBar from './components/AppNavBar.vue';

export default {
  name: 'App',
  components: {
    AppNavBar // This key should match the name used in the template
  }
};
</script>

<style>
/* Ensure that the background image covers the entire screen and does not repeat */
html, body, #app {
  min-height: 100vh;
}
</style>



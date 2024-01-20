<template>
  <div id="app" class="min-h-screen bg-fixed bg-center bg-cover" style="background-image: url('~@/assets/library-background.png');">
    <NavBar />
    <div class="pt-16">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'NavBar',
  components: {
    NavBar
  }
};
</script>

<style>
/* Ensure that the background image covers the entire screen and does not repeat */
html, body, #app {
  min-height: 100vh;
}
</style>



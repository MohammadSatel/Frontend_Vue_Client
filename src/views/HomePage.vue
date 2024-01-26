<template>
  <div class="image-container">
    <img :src="require('@/assets/library-background.gif')" />
  </div>
</template>

<style scoped>
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; /* Adjusted to take less than full viewport height */
}

img {
  max-width: 60%; /* Adjust width as needed */
  max-height: 60vh; /* Adjust height to leave space for the footer */
  height: auto; /* Maintain aspect ratio */
}
</style>

<script>
export default {
  name: 'HomePage',
  // Other component options
};
</script>

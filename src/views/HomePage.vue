<template>
  <div class="bg-white">
    <!-- Use require to reference images from assets in Vue -->
    <img :src="require('@/assets/library-background.png')" />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  // Other component options
};
</script>

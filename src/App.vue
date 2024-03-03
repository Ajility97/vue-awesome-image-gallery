<template>
  <div style="width: 40%">
    <awesome-image-gallery
      :images="[
        {
          url: 'https://cdn11.bigcommerce.com/s-j38el1cgyu/images/stencil/1280x1280/products/7462/24151/B-3793_0__72902.1689395806.png?c=1',
        },
        {
          url: 'https://cdn11.bigcommerce.com/s-j38el1cgyu/images/stencil/1280x1280/products/7462/24152/B-3793_1__50815.1689395808.png?c=1',
        },
        {
          url: 'https://cdn11.bigcommerce.com/s-j38el1cgyu/images/stencil/1280x1280/products/7462/24153/B-3793_2__17221.1689395810.png?c=1',
        }
      ]"
      :scale="0.9"
    />
  </div>
</template>

<script setup lang="ts">
import AwesomeImageGallery from './AwesomeImageGallery.vue'
</script>

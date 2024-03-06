<template>
  <div style="width: 40%">
    <awesome-image-gallery
      :images="[
        {
          url: 'https://ajility.dev/github/vue-awesome-image-gallery/1.webp',
        },
        {
          url: 'https://ajility.dev/github/vue-awesome-image-gallery/2.webp',
        },
        {
          url: 'https://ajility.dev/github/vue-awesome-image-gallery/3.webp',
        }
      ]"
      :scale="0.9"
    />
  </div>
</template>

<script setup lang="ts">
import { AwesomeImageGallery } from "./components"
</script>

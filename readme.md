# Vue Awesome Image Gallery

Vue.js 3 component that implements (what I think is) an awesome image gallery. When hovering over the active image, it is zoomed in.

![Demo](https://ajility.dev/github/vue-awesome-image-gallery/demo.gif)

## Usage
Install package:
```bash
npm i vue-awesome-image-gallery
```

Use the component:
```js
<template>
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
</template>

<script setup>
import AwesomeImageGallery from './AwesomeImageGallery.vue'
<script
  
```

## Props
***\* Indicates a property is required***

| Property                    | Default Value | Description                                                                                                                                     |
|-----------------------------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `alt`                       | `An image.`  | Alt tag applied to any entry in `images` that does not have one specified.                                                                       |
| `disable-zoom`              | `false`      | Disables the ability to zoom in on the active image on hover.                                                                                    |
| `hide-active-image-on-zoom` | `false`      | Only show the zoomed image while hovering.                                                                                                       |
| `images`*                   | `undefined`  | An array of `AwesomeImage` objects. [See interface definition.](https://github.com/Ajility97/vue-awesome-image-gallery/blob/main/src/types.ts)   |
| `scale`                     | `1.5`         | A constant representing how much to scale the active image on hover.                                                                            |

## Events

| Event     | Description                                 |
|-----------|---------------------------------------------|
| `changed` | Emitted when a thumbnail is selected.       |
| `loaded`  | Emitted when the selected image has loaded. |
| `resized` | Emitted when the image is resized.          |


### Special Note
This package is based on the unmaintained packages of GitHub users [@174n](https://github.com/174n) and [@Intera](https://github.com/Intera).It was ported to Vue 3 and given some TLC to make it more useful.

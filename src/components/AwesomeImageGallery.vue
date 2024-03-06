<template>
  <div
    ref="vueAwesomeImageContainer"
    class="active-image"
    @pointerover="onPointerOverEvent"
    @pointerout="onPointerOverEvent"
    @pointermove="onMoveEvent"
    @pointerenter="onZoomEvent"
    @pointerleave="onUnzoomEvent"
  >
    <img
      ref="normalImg"
      class="normal"
      :src="activeImage.url"
      :alt="activeImage.alt ?? alt"
    />
    <img
      ref="zoomedImg"
      class="zoomed"
      :src="activeImage.url_zoom ?? activeImage.url"
      :alt="activeImage.alt ?? alt"
    />
  </div>
  <div class="image-thumbnails">
    <div
      class="image-thumbnail"
      :class="{'active-thumbnail': activeImageIdx === idx, 'inactive-thumbnail': activeImageIdx !== idx}"
      v-for="(image, idx) in images"
      @click="changeActiveImgIdx(idx)"
    >
      <img
        class="thumbnail"
        :src="image.url_thumbnail ?? image.url"
        :alt="image.alt ?? alt"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, onUpdated, ref, watch} from "vue"
import type { AwesomeImage } from "../types"
import type { PropType, Ref } from "vue"

const vueAwesomeImageContainer = ref(null)
const activeImageIdx = ref(0)
const normalImg: Ref<HTMLImageElement | null> = ref(null)
const zoomedImg: Ref<HTMLImageElement | null> = ref(null)
const isZoomed: Ref<boolean> = ref(false)
const scaleFactor: Ref<number> = ref(1)
const resizeCheckInterval: Ref<ReturnType<typeof setTimeout> | undefined> = ref(undefined)

const emit = defineEmits(["changed", "loaded", "resized"])
const props = defineProps({
  alt: {
    type: String,
    default: "An image."
  },
  disableZoom: {
    type: Boolean,
    default: false
  },
  hideActiveImageOnZoom: {
    type: Boolean,
    default: false
  },
  images: {
    type: Array as PropType<AwesomeImage[]>,
    required: true
  },
  scale: {
    type: Number,
    default: 1.5
  },
})

const activeImage = computed(() => {
  return props.images[activeImageIdx.value]
})

function changeActiveImgIdx(idx: number) {
  activeImageIdx.value = idx
  emit("changed", {
    idx: idx,
    image: activeImage.value
  })
}

function pageOffset(el: any) {
  const rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop
  return {
    y: rect.top + scrollTop,
    x: rect.left + scrollLeft
  }
}

function onPointerOverEvent(event: any) {
  if (props.disableZoom) return
  isZoomed.value = event.type === "pointerover"
  onMoveEvent(event)
}

function onZoomEvent() {
  if (props.disableZoom) return
  isZoomed.value = true
}

function onUnzoomEvent() {
  if (props.disableZoom) return
  isZoomed.value = false
}

function onMoveEvent(event: any) {
  let zoom = zoomedImg.value
  let normal = normalImg.value
  if (props.disableZoom || !isZoomed.value || !zoom || !normal) return
  let offset = pageOffset(vueAwesomeImageContainer.value)
  let relativeX = event.clientX - offset.x + window.pageXOffset
  let relativeY = event.clientY - offset.y + window.pageYOffset
  let normalFactorX = relativeX / normal.offsetWidth
  let normalFactorY = relativeY / normal.offsetHeight
  let x = normalFactorX * (zoom.offsetWidth * scaleFactor.value - normal.offsetWidth)
  let y = normalFactorY * (zoom.offsetHeight * scaleFactor.value - normal.offsetHeight)
  zoom.style.left = -x + "px"
  zoom.style.top = -y + "px"
}

function initEventLoaded() {
  // emit the “loaded” event if all images have been loaded
  let promises = [zoomedImg.value!, normalImg.value!].map(function(image) {
    return new Promise(function(resolve, reject) {
      image.addEventListener("load", resolve)
      image.addEventListener("error", reject)
    })
  })
  Promise.all(promises).then(function() {
    emit("loaded")
  })
}

function initEventResized() {
  let normal: HTMLImageElement = normalImg.value!
  let previousWidth = normal.offsetWidth
  let previousHeight = normal.offsetHeight
  resizeCheckInterval.value = setInterval(function() {
    if (previousWidth != normal.offsetWidth || previousHeight != normal.offsetHeight) {
      previousWidth = normal.offsetWidth
      previousHeight = normal.offsetHeight
      emit("resized", {
        width: normal.width,
        height: normal.height,
        fullWidth: normal.naturalWidth,
        fullHeight: normal.naturalHeight
      })
    }
  }, 1000)
}

watch(isZoomed, async () => {
  if (isZoomed.value) {
    zoomedImg.value!.style.visibility = 'visible'
    if (props.hideActiveImageOnZoom) normalImg.value!.style.visibility = 'hidden'
  } else {
    zoomedImg.value!.style.visibility = 'hidden'
    if (props.hideActiveImageOnZoom) normalImg.value!.style.visibility = 'visible'
  }
})

onMounted(() => {
  if (props.scale && zoomedImg.value!) {
    scaleFactor.value = props.scale
    zoomedImg.value.style.transform = `scale(${scaleFactor.value})`
  }
  initEventLoaded()
  initEventResized()
})

onUpdated(() => {
  initEventLoaded()
})

onBeforeUnmount(() => {
  if (resizeCheckInterval.value) clearInterval(resizeCheckInterval.value!)
})
</script>

<style scoped lang="scss">
.active-image {
  position: relative;
  overflow: hidden;

  .normal {
    width: 100%;
  }

  .zoomed {
    position: absolute;
    transform-origin: top left;
  }
}
.image-thumbnails {
  .image-thumbnail {
    display: inline-block;
    width: 80px;
    height: 80px;
    padding: 5px;
    margin: 10px;

    .thumbnail {
      width: 100%;
    }
  }

  .image-thumbnail:hover {
    background: #D3D3D3;
    border: #5D5E60 solid 1px;
    opacity: 0.8;
  }

  .active-thumbnail {
    border: #5D5E60 solid 1px;
  }

  .inactive-thumbnail {
    border: #D2D4D1 solid 1px;
  }
}
</style>


import { createApp } from "vue"
import App from "./App.vue"
import AwesomeImageGalleryPlugin from "./AwesomeImageGalleryPlugin"

const app = createApp(App)
app.use(AwesomeImageGalleryPlugin)
app.mount("#app")

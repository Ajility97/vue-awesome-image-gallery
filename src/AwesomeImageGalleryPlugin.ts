import type { App } from "vue"
import { AwesomeImageGallery } from "./components"

export default {
    install: (app: App) => {
        app.component("AwesomeImageGallery", AwesomeImageGallery)
    }
}

export { AwesomeImageGallery }

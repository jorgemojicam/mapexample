import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/styles.css";


createApp(App)
    .use(createPinia())
    .use(router)
    .use(OpenLayersMap)
    .mount('#app')

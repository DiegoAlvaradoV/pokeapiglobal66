import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaStar,RiCloseCircleFill, HiSolidSearch } from "oh-vue-icons/icons";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

addIcons(FaStar, RiCloseCircleFill, HiSolidSearch)

const pinia = createPinia()

const app = createApp(App)

app.component("v-icon",OhVueIcon)

app.use(VueSweetalert2)

app.use(pinia).use(router).mount('#app')
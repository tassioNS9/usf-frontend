
import { createPinia } from 'pinia'
import { createApp} from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from '@/router/index';
import VueApexCharts from "vue3-apexcharts";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const pinia = createPinia()
const app = createApp(App)
app.use(pinia).use(router).use(VueApexCharts)
app.use(VueSweetalert2)

//import DashboardLayout from './components/DashboardLayout.vue'
//import EmptyLayout from './components/EmptyLayout.vue'

// app.component('DefaultLayout', DashboardLayout)
// app.component('EmptyLayout', EmptyLayout)

app.mount('#app')

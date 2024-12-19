import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import Visualizar from './components/Visualizar.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/Visualizar', component: Visualizar },
    ]
});

const app = createApp(App)
app.use(router);
app.mount('#app')
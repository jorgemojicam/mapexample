import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import Captura from '../views/Captura.vue';
import Podas from '../views/PodasView.vue';
import Informe from '../views/PodasInformeView.vue';


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'captura',
        component: Captura
    }, 
    {
        path: '/captura',
        name: 'captura',
        component: Captura
    },
    {
        path: '/podas',
        name: 'podas',
        component: Podas
    },
    {
        path: '/informe',
        name: 'informe',
        component: Informe
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
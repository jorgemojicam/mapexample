import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import Captura from '../views/Captura.vue';


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
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
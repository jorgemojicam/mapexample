import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue';
import CounterView from '../views/CounterView.vue';
import OlMap from '../views/OlMap.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: '',
        component: HomeView
    },
    {
        path: '/counter',
        name: 'counter',
        component: CounterView
    },
    {
        path: '/olmap',
        name: 'olmap',
        component: OlMap
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
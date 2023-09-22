import { createRouter , createWebHistory } from "vue-router";

import Home from '../components/HomeComp.vue';
import About from '../components/AboutComp.vue';
import Food from '../components/FoodComp.vue'
const routes = 
[
    {
        path : '/',
        component : Home
    },
    {
        path : '/about',
        component  : About
    },
    {
        path : '/food/:id',
        component  : Food
    }
]

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router
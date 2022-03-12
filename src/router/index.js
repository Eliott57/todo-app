import Vue from 'vue'

import VueRouter from 'vue-router'
import HomePage from "@/pages/HomePage";
import TodoPage from "@/pages/TodosPage";

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: HomePage
    },
    {
        name: 'todo',
        path: '/Todo/:id',
        component: () => import ('../pages/TodoEditPage.vue')
    },
    {
        name: 'todos',
        path: '/todos',
        component: TodoPage
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;
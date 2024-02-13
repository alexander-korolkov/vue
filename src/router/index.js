import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import EditNotePage from '../components/EditNotePage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/edit/:id',
        name: 'EditNote',
        component: EditNotePage
    }
];

const router = createRouter({
    history: createWebHistory("/"),
    routes
});

export default router;
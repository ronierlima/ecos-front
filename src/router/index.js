import Vue from 'vue'
import VueRouter from 'vue-router'
import paths from './paths';

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: paths
});


export default router
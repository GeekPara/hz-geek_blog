import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/article/:onlyTag',
    name: 'Article',
    component: () => import('../views/Article.vue')
  },
  {
    path: '/write/:onlyTag',
    name: 'Write',
    component: () => import('../views/Write.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

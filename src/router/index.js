import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',//mendaftarkan view home pada vue-router
    name: 'Home',
    component: Home
  },
  {
    path: '/about',//mendaftarkan view about pada vue-router 
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/categories',//mendaftarkan view categories pada vue-router
    name: 'categories',
    component: () => import(
      '../views/Categories.vue'
    )
  },
  {
    path: '/menu',//mendaftarkan view menu pada vue-router
    name: 'menu',
    component: () => import(
      '../views/Menu.vue'
    )
  },
  {
    path: '/category/:slug',//mendaftarkan view category pada vue-router
    name: 'category',
    component: () => import(
      '../views/Category.vue'
    )
  },
  {
    path: '/list/:slug',//mendaftarkan view detail pada vue-router
    name: 'Detail',
    component: () => import(
      '../views/Detail.vue'
    )
  },
  {
    path: '/profile',//mendaftarkan view profile pada vue-router
    name: 'profile',
    component: () => import(
      '../views/Profile.vue'),
      meta: {auth:true}  
  }
]

const router = new VueRouter({
  routes
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

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
    path:'/nuestrasnoticias',
    name:'Noticias',
    component: () => import('../views/Noticias.vue')
  },
  {
    path:'/publicaciones',
    name:'Publicacion',
    component: () => import ('../views/Publicacion.vue')
  },

  {
    path:'/productos',
    name:'Productos',
    component: () => import ('../views/Productos.vue')
    
  }

    
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

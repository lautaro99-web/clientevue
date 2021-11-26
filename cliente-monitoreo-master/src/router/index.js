import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/cliente',
    name: 'Cliente',
    component: () => import ('../views/Cliente.vue')
  },

  {
    path: '/cpu',
    name: 'Cpu',
    
    component: () => import ('../views/Cpu.vue')
  },

  {
    path:'/drive',
    name:'Drive',
    component: () => import('../views/Drive.vue')
  },
   {
    path:'/memoria',
    name:'Memoria',
    component: () => import ('../views/Memoria.vue')
  },

  {
    path:'/netstat',
    name:'Netstat',
    component: () => import ('../views/Netstat.vue')

  },

  {
    path:'/os',
    name:'Os',
    component: () => import ('../views/Os.vue')
    
  },

     
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
                                                        
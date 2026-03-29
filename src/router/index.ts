import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/Home.vue'
import SelectView from '../pages/Select.vue'
import RostarView from '../pages/Rostar.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/select',
    name: 'select',
    component: SelectView
  },
  {
    path: '/rostar',
    name: 'rostar',
    component: RostarView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

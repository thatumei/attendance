import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/select',
    name: 'select',
    component: () => import('../pages/Select.vue')
  },
  {
    path: '/class/:schoolId/:classId',
    name: 'class',
    component: () => import('../pages/Class.vue')
  },
  {
    path: '/verify/:schoolId/:classId/:memberId',
    name: 'verify',
    component: () => import('../pages/Verify.vue')
  },
  {
    path: '/success/:schoolId/:classId/:memberId',
    name: 'success',
    component: () => import('../pages/Success.vue')
  },
  {
    path: '/qr',
    name: 'qr',
    component: () => import('../pages/Qr.vue')
  },
  {
    path: '/staff/:schoolId/:classId',
    name: 'staff',
    component: () => import('../pages/Staff.vue')
  },
  {
    path: '/add/:schoolId/:classId',
    name: 'add',
    component: () => import('../pages/Add.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

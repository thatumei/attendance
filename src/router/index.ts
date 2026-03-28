import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
    meta: { title: 'ログイン｜豊田少年少女出席システム' },
  },
  {
    path: '/select',
    component: () => import('@/pages/select.vue'),
    meta: { title: '教室・クラスの選択｜豊田少年少女出席システム' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// タイトルを動的に変更する処理
router.beforeEach((to) => {
  const title = to.meta.title as string | undefined;
  if (title) {
    document.title = title;
  }
});

export default router
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: { name: 'products' },
    },
    {
      path: '/products',
      component: () => import('@/views/ProductsView.vue'),
      children: [
        {
          path: '',
          name: 'products',
          component: () => import('@/components/products/ProductsPanel.vue'),
        },
        {
          path: ':id',
          name: 'details',
          component: () => import('@/components/products/DetailsPanel.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/cart',
      component: () => import('@/views/CartView.vue'),
      children: [
        {
          path: '',
          name: 'cart',
          component: () => import('@/components/cart/CartPanel.vue'),
        },
      ],
    },
    {
      path: '/:path(.*)',
      redirect: { name: 'products' },
    },
  ],
})

export default router

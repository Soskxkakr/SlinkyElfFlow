import { createRouter, createWebHistory } from 'vue-router'
import WorkflowView from '@/views/WorkflowView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'workflow',
      component: WorkflowView,
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('@/views/DetailsView.vue'),
    },
    {
      path: '/details/:id',
      name: 'node-details',
      component: () => import('@/views/NodeDetails.vue'),
    },
  ],
})

export default router

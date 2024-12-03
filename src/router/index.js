import { createRouter, createWebHistory } from 'vue-router'
import WorkflowView from '@/views/WorkflowView.vue'
import DetailsView from '@/views/DetailsView.vue'
import NodeDetailsView from '@/views/NodeDetails.vue'

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
      component: DetailsView,
    },
    {
      path: '/details/:id',
      name: 'node-details',
      component: NodeDetailsView,
    },
  ],
})

export default router

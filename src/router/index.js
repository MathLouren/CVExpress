import { createRouter, createWebHistory } from 'vue-router'
import FormularioCurriculo from '@/components/FormularioCurriculo.vue'

const routes = [
  {
    path: '/',
    name: 'FormularioCurriculo',
    component: FormularioCurriculo
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

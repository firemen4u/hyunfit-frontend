import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '/src/module/main/views/MainPage.vue'
import SurveyPage from '/src/module/survey/views/SurveyPage.vue'
import TrnSearchPage from '/src/module/trn-search/views/TrnSearchPage.vue'
import MbrRsvPage from '/src/module/mbr-reservation/views/MbrRsvPage.vue'
import AITrainingPage from '/src/module/ai-training/view/AITrainingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage,
    },
    {
      path: '/survey',
      name: 'survey',
      component: SurveyPage,
    },
    {
      path: '/trn-search',
      name: 'trn-search',
      component: TrnSearchPage,
    },
    {
      path: '/mbr-reservation',
      name: 'mbr-reservation',
      component: MbrRsvPage,
    },
    {
      path: '/ai-training',
      name: 'ai-training',
      component: AITrainingPage,
    },
  ],
})

export default router

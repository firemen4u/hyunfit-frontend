import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '/src/module/main/views/MainPage.vue'
import SurveyPage from '/src/module/survey/views/SurveyPage.vue'
import TrnSearchPage from '/src/module/trn-search/views/TrnSearchPage.vue'
import MbrRsvPage from '/src/module/mbr-reservation/views/MbrRsvPage.vue'
import AITrainingPage from '/src/module/ai-training/view/AITrainingPage.vue'
import TrnDetailPage from '/src/module/trn-detail/views/TrnDetailPage.vue'
import PtRoomPage from '/src/module/PtRoom/views/PtRoomPage.vue'
import RsvSample from '/src/module/boptrsv/views/RsvSample.vue'
import MbrmyPage from '/src/module/mbr-mypage/views/MbrmyPage.vue'

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
    {
      path: '/trn-detail',
      name: 'trn-detail',
      component: TrnDetailPage,
    },
    {
      path: '/PtRoom',
      name: 'PtRoom',
      component: PtRoomPage,
    },
    {
      path: '/rsvsample',
      name: 'RsvSample',
      component: RsvSample,
    },
    {
      path: '/mbr-myPage',
      name: 'mbr-myPage',
      component: MbrmyPage,
    },
  ],
})

export default router

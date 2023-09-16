import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '/src/module/main/views/MainPage.vue'
import SurveyPage from '/src/module/survey/views/SurveyPage.vue'
import TrnSearchPage from '/src/module/trn-search/views/TrnSearchPage.vue'
import MbrRsvPage from '/src/module/mbr-reservation/views/MbrRsvPage.vue'
import AITrainingPage from '/src/module/ai-training/view/AITrainingPage.vue'
import TrnDetailPage from '/src/module/trn-detail/views/TrnDetailPage.vue'
import PtRoomPage from '/src/module/PtRoom/views/PtRoomPage.vue'
import MbrMyPage from '/src/module/mbr-mypage/views/MbrMyPage.vue'
import ReservationManagingPage from '/src/module/bo/trn/views/ReservationManagingPage.vue'
import FeedbackManagingPage from '/src/module/bo/trn/views/FeedbackManagingPage.vue'
import BoRtnBoardPage from '/src/module/bo/exc/views/BoRtnBoardPage.vue'
import BoExcNewPage from '/src/module/bo/exc/views/BoExcNewPage.vue'
import BoExcBoardPage from '/src/module/bo/exc/views/BoExcBoardPage.vue'
import ReportPage from '@/module/report/views/ReportPage.vue'
import TrnFeedBackPage from '/src/module/trn-feedback/views/TrnFeedBackPage.vue'

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
      path: '/ptroom',
      name: 'ptroom',
      component: PtRoomPage,
    },
    {
      path: '/pt-rsv-manage',
      name: 'pt-rsv-manage',
      component: ReservationManagingPage,
    },
    {
      path: '/pt-fb-manage',
      name: 'pt-fb-manage',
      component: FeedbackManagingPage,
    },
    {
      path: '/mbr-myPage',
      name: 'mbr-myPage',
      component: MbrMyPage,
    },
    {
      path: '/bo-rtnBoard',
      name: 'bo-BoRtnBoardPage',
      component: BoRtnBoardPage,
    },
    {
      path: '/bo-excNew',
      name: 'bo-BoExcNewPage',
      component: BoExcNewPage,
    },
    {
      path: '/report',
      name: 'report',
      component: ReportPage,
    },
    {
      path: '/trn-feedback',
      name: 'trn-feedback',
      component: TrnFeedBackPage,
    },
    {
      path: '/bo-excBoard',
      name: 'bo-BoExcBoardPage',
      component: BoExcBoardPage,
    },
  ],
})

export default router

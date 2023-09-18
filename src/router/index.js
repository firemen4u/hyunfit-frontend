import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '/src/module/main/views/MainPage.vue'
import SurveyPage from '/src/module/survey/views/SurveyPage.vue'
import TrnSearchPage from '/src/module/trn-search/views/TrnSearchPage.vue'
import MbrRsvPage from '/src/module/mbr-reservation/views/MbrRsvPage.vue'
import AITrainingPage from '/src/module/ai-training/view/AITrainingPage.vue'
import TrnDetailPage from '/src/module/trn-detail/views/TrnDetailPage.vue'
import PtRoomPage from '/src/module/pt-room/views/PtRoomPage.vue'
import MbrMypage from '/src/module/mbr-mypage/views/MbrMypage.vue'
import ReservationManagingPage from '/src/module/bo/trn/views/ReservationManagingPage.vue'
import FeedbackManagingPage from '/src/module/bo/trn/views/FeedbackManagingPage.vue'
import BoExcNewPage from '/src/module/bo/exc/views/BoExcNewPage.vue'
import BoExcBoardPage from '/src/module/bo/exc/views/BoExcBoardPage.vue'
import ReportPage from '@/module/report/views/ReportPage.vue'
import TrnFeedBackPage from '/src/module/mbr-pt-feedback/views/MbrPtFeedBackPage.vue'
import LoginPage from '/src/module/main/views/LoginPage.vue'
import BoRtnBoardPage from '/src/module/bo/rtn/views/BoRtnBoardPage.vue'
import BoRtnNewPage from '/src/module/bo/rtn/views/BoRtnNewPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
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
      path: '/trainers/:trnId',
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
      component: MbrMypage,
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
      path: '/mbr-pt-feedback',
      name: 'mbr-pt-feedback',
      component: TrnFeedBackPage,
    },
    {
      path: '/bo-excBoard',
      name: 'bo-BoExcBoardPage',
      component: BoExcBoardPage,
    },
    {
      path: '/bo-rtnNew',
      name: 'bo-BoRtnNewPage',
      component: BoRtnNewPage,
    },
  ],
})
export default router

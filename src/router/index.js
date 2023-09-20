import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '/src/module/main/views/MainPage.vue'
import SurveyPage from '/src/module/survey/views/SurveyPage.vue'
import TrnSearchPage from '/src/module/trn-search/views/TrnSearchPage.vue'
import MbrRsvPage from '/src/module/mbr-rsv/views/MbrRsvPage.vue'
import AITrainingPage from '/src/module/ai-training/view/AITrainingPage.vue'
import TrnDetailPage from '/src/module/trn-detail/views/TrnDetailPage.vue'
import PtRoomPage from '/src/module/pt-room/views/PtRoomPage.vue'
import MbrMyPage from '/src/module/mbr-my/views/MbrMyPage.vue'
import BoTrnRsvBoardPage from '/src/module/bo/trn/views/BoTrnRsvBoardPage.vue'
import BoTrnFbBoardPage from '/src/module/bo/trn/views/BoTrnFbBoardPage.vue'
import BoExcNewPage from '/src/module/bo/exc/views/BoExcNewPage.vue'
import BoExcBoardPage from '/src/module/bo/exc/views/BoExcBoardPage.vue'
import ReportPage from '@/module/report/views/ReportPage.vue'
import MbrPtFeedBackPage from '/src/module/mbr-pt-feedback/views/MbrPtFeedBackPage.vue'
import LoginPage from '/src/module/login/views/LoginPage.vue'
import BoRtnBoardPage from '/src/module/bo/rtn/views/BoRtnBoardPage.vue'
import BoRtnNewPage from '/src/module/bo/rtn/views/BoRtnNewPage.vue'
import MbrRsvCompletionPage from '/src/module/mbr-rsv-completion/views/MbrRsvCompletionPage.vue'
import MbrRoutineBoardPage from '/src/module/mbr-routine-board/views/MbrRoutineBoardPage.vue'

const pathNames = {
  mainPage: { name: 'mainPage', parent: () => pathNames.mainPage.name },
  loginPage: { name: 'loginPage' },
  surveyPage: { name: 'surveyPage', parent: () => '' },
  trnSearchPage: {
    name: 'trnSearchPage',
    parent: () => pathNames.trnSearchPage.name,
  },
  mbrRsvPage: {
    name: 'mbrRsvPage',
    parent: () => pathNames.trnSearchPage.name,
  },
  aiTrainingPage: {
    name: 'aiTrainingPage',
  },
  trnDetailPage: {
    name: 'trnDetailPage',
    parent: () => pathNames.trnSearchPage.name,
  },
  ptRoomPage: { name: 'ptRoomPage' },
  boTrnRsvBoardPage: { name: 'boTrnRsvBoardPage' },
  boTrnFbBoardPage: { name: 'boTrnFbBoardPage' },
  mbrMyPage: { name: 'mbrMyPage', parent: () => '' },
  reportPage: {
    name: 'reportPage',
    parent: () => pathNames.mbrRoutineBoardPage.name,
  },
  mbrPtFeedbackPage: {
    name: 'mbrPtFeedbackPage',
    parent: () => pathNames.trnSearchPage.name,
  },
  boExcBoardPage: {
    name: 'boExcBoardPage',
    parent: () => pathNames.boExcBoardPage.name,
  },
  boExcNewPage: {
    name: 'boExcNewPage',
    parent: () => pathNames.boExcBoardPage.name,
  },
  boRtnBoardPage: {
    name: 'boRtnBoardPage',
    parent: () => pathNames.boRtnBoardPage.name,
  },
  boRtnNewPage: {
    name: 'boRtnNewPage',
    parent: () => pathNames.boRtnBoardPage.name,
  },
  mbrRsvCompletionPage: {
    name: 'mbrRsvCompletionPage',
    parent: () => pathNames.trnSearchPage.name,
  },
  mbrRoutineBoardPage: {
    name: 'mbrRoutineBoardPage',
    parent: () => pathNames.mbrRoutineBoardPage.name,
  },
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: pathNames.mainPage.name,
      component: MainPage,
    },
    {
      path: '/login',
      name: pathNames.loginPage.name,
      component: LoginPage,
    },
    {
      path: '/survey',
      name: pathNames.surveyPage.name,
      component: SurveyPage,
    },
    {
      path: '/trainers',
      name: pathNames.trnSearchPage.name,
      component: TrnSearchPage,
    },
    {
      path: '/mbr-reservation',
      name: pathNames.mbrRsvPage.name,
      component: MbrRsvPage,
    },
    {
      path: '/ai-training',
      name: pathNames.aiTrainingPage.name,
      component: AITrainingPage,
    },
    {
      path: '/trainers/:trnId',
      name: pathNames.trnDetailPage.name,
      component: TrnDetailPage,
    },
    {
      path: '/ptroom',
      name: pathNames.ptRoomPage.name,
      component: PtRoomPage,
    },
    {
      path: '/pt-rsv-manage',
      name: pathNames.boTrnRsvBoardPage.name,
      component: BoTrnRsvBoardPage,
    },
    {
      path: '/pt-fb-manage',
      name: pathNames.boTrnFbBoardPage.name,
      component: BoTrnFbBoardPage,
    },
    {
      path: '/mbr-myPage',
      name: pathNames.mbrMyPage.name,
      component: MbrMyPage,
    },
    {
      path: '/report',
      name: pathNames.reportPage.name,
      component: ReportPage,
    },
    {
      path: '/mbr-pt-feedback',
      name: pathNames.mbrPtFeedbackPage.name,
      component: MbrPtFeedBackPage,
    },
    {
      path: '/bo-excNew',
      name: pathNames.boExcNewPage.name,
      component: BoExcNewPage,
    },
    {
      path: '/bo-excBoard',
      name: pathNames.boExcBoardPage.name,
      component: BoExcBoardPage,
    },
    {
      path: '/bo-rtnBoard',
      name: pathNames.boRtnBoardPage.name,
      component: BoRtnBoardPage,
    },
    {
      path: '/bo-rtnNew',
      name: pathNames.boRtnNewPage.name,
      component: BoRtnNewPage,
    },
    {
      path: '/reservations/complete',
      name: pathNames.mbrRsvCompletionPage.name,
      component: MbrRsvCompletionPage,
    },
    {
      path: '/routines',
      name: pathNames.mbrRoutineBoardPage.name,
      component: MbrRoutineBoardPage,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Scroll to the top of the page on route change
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})
export default router

export { pathNames }

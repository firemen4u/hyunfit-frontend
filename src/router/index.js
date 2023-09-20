import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '/src/module/main/views/MainPage.vue'
import SurveyPage from '/src/module/survey/views/SurveyPage.vue'
import TrnSearchPage from '/src/module/trn-search/views/TrnSearchPage.vue'
import MbrRsvPage from '/src/module/mbr-reservation/views/MbrRsvPage.vue'
import AITrainingPage from '/src/module/ai-training/view/AITrainingPage.vue'
import TrnDetailPage from '/src/module/trn-detail/views/TrnDetailPage.vue'
import PtRoomPage from '/src/module/pt-room/views/PtRoomPage.vue'
import MbrMypage from '/src/module/mbr-mypage/views/MbrMypage.vue'
import BoTrnRsvBoard from '/src/module/bo/trn/views/BoTrnRsvBoard.vue'
import BoTrnFbBoard from '/src/module/bo/trn/views/BoTrnFbBoard.vue'
import BoExcNewPage from '/src/module/bo/exc/views/BoExcNewPage.vue'
import BoExcBoardPage from '/src/module/bo/exc/views/BoExcBoardPage.vue'
import ReportPage from '@/module/report/views/ReportPage.vue'
import TrnFeedBackPage from '/src/module/mbr-pt-feedback/views/MbrPtFeedBackPage.vue'
import LoginPage from '/src/module/main/views/LoginPage.vue'
import BoRtnBoardPage from '/src/module/bo/rtn/views/BoRtnBoardPage.vue'
import BoRtnNewPage from '/src/module/bo/rtn/views/BoRtnNewPage.vue'
import PtReservationCompletePage from '@/module/pt-reservation/views/PtReservationCompletionPage.vue'

const pathNames = {
  main: { name: 'main', parent: () => pathNames.main.name },
  login: { name: 'login' },
  survey: { name: 'survey', parent: () => '' },
  trnSearch: { name: 'trnSearch', parent: () => pathNames.trnSearch.name },
  mbrReservation: {
    name: 'mbrReservation',
    parent: () => pathNames.trnSearch.name,
  },
  aiTraining: {
    name: 'aiTraining',
  },
  trnDetail: {
    name: 'trnDetail',
    parent: () => pathNames.trnSearch.name,
  },
  ptRoom: { name: 'ptRoom' },
  boTrnRsvBoard: { name: 'boTrnRsvBoard' },
  boTrnFbBoard: { name: 'boTrnFbBoard' },
  mbrMyPage: { name: 'mbrMyPage', parent: () => '' },
  report: { name: 'report', parent: () => pathNames.mbrRoutineBoard.name },
  mbrPtFeedback: {
    name: 'mbrPtFeedback',
    parent: () => pathNames.trnSearch.name,
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
  ptReservationCompleted: {
    name: 'ptReservationCompleted',
    parent: () => pathNames.trnSearch.name,
  },
  mbrRoutineBoard: {
    name: 'mbrRoutineBoard',
    parent: () => pathNames.mbrRoutineBoard.name,
  },
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: pathNames.main.name,
      component: MainPage,
    },
    {
      path: '/login',
      name: pathNames.login.name,
      component: LoginPage,
    },
    {
      path: '/survey',
      name: pathNames.survey.name,
      component: SurveyPage,
    },
    {
      path: '/trainers',
      name: pathNames.trnSearch.name,
      component: TrnSearchPage,
    },
    {
      path: '/mbr-reservation',
      name: pathNames.mbrReservation.name,
      component: MbrRsvPage,
    },
    {
      path: '/ai-training',
      name: pathNames.aiTraining.name,
      component: AITrainingPage,
    },
    {
      path: '/trainers/:trnId',
      name: pathNames.trnDetail.name,
      component: TrnDetailPage,
    },
    {
      path: '/ptroom',
      name: pathNames.ptRoom.name,
      component: PtRoomPage,
    },
    {
      path: '/pt-rsv-manage',
      name: pathNames.boTrnRsvBoard.name,
      component: BoTrnRsvBoard,
    },
    {
      path: '/pt-fb-manage',
      name: pathNames.boTrnFbBoard.name,
      component: BoTrnFbBoard,
    },
    {
      path: '/mbr-myPage',
      name: pathNames.mbrMyPage.name,
      component: MbrMypage,
    },
    {
      path: '/report',
      name: pathNames.report.name,
      component: ReportPage,
    },
    {
      path: '/mbr-pt-feedback',
      name: pathNames.mbrPtFeedback.name,
      component: TrnFeedBackPage,
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
      name: pathNames.ptReservationCompleted.name,
      component: PtReservationCompletePage,
    },
    {
      path: '/routines',
      name: pathNames.mbrRoutineBoard.name,
      component: MainPage,
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

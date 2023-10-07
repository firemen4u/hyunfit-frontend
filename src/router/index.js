import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '/src/module/main/views/MainPage.vue'
import SurveyPage from '/src/module/survey/views/SurveyPage.vue'
import TrnSearchPage from '/src/module/trn-search/views/TrnSearchPage.vue'
import MbrRsvPage from '/src/module/mbr-rsv/views/MbrRsvPage.vue'
import AiTrainingPage from '/src/module/ai-training/view/AiTrainingPage.vue'
import TrnDetailPage from '/src/module/trn-detail/views/TrnDetailPage.vue'
import PtRoomPage from '/src/module/pt-room/views/PtRoomPage.vue'
import MbrMyPage from '/src/module/mbr-my/views/MbrMyPage.vue'
import BoTrnRsvBoardPage from '/src/module/bo/trn/views/BoTrnRsvBoardPage.vue'
import BoTrnFbBoardPage from '/src/module/bo/trn/views/BoTrnFbBoardPage.vue'
import BoExcNewPage from '/src/module/bo/exc/views/BoExcNewPage.vue'
import BoExcBoardPage from '/src/module/bo/exc/views/BoExcBoardPage.vue'
import ReportPage from '@/module/report/views/ReportPage.vue'
import MbrPtFeedbackPage from '/src/module/mbr-pt-feedback/views/MbrPtFeedbackPage.vue'
import LoginPage from '/src/module/login/views/LoginPage.vue'
import BoRtnBoardPage from '/src/module/bo/rtn/views/BoRtnBoardPage.vue'
import BoRtnNewPage from '/src/module/bo/rtn/views/BoRtnNewPage.vue'
import MbrRsvCompletionPage from '@/module/mbr-rsv-completion/views/MbrRsvCompletionPage.vue'
import MbrRtnBoardPage from '@/module/mbr-rtn-board/views/MbrRtnBoardPage.vue'
import MbrMyPointPage from '/src/module/mbr-my/views/MbrMyPointPage.vue'
import AiTrainingErrorPage from '@/module/ai-training/view/AiTrainingErrorPage.vue'
function buildPath(page, params, query) {
  return {
    name: page.name,
    params: params,
    query: query,
  }
}
const pathNames = {
  mainPage: {
    name: 'mainPage',
    parent: () => pathNames.mainPage.name,
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  loginPage: {
    name: 'loginPage',
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  surveyPage: {
    name: 'surveyPage',
    parent: () => '',
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  trnSearchPage: {
    name: 'trnSearchPage',
    parent: () => pathNames.mbrRsvPage.name,
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  mbrRsvPage: {
    name: 'mbrRsvPage',
    parent: () => pathNames.mbrRsvPage.name,
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  aiTrainingPage: {
    name: 'aiTrainingPage',
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  aiTrainingErrorPage: {
    name: 'aiTrainingErrorPage',
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  trnDetailPage: {
    name: 'trnDetailPage',
    parent: () => pathNames.mbrRsvPage.name,
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  ptRoomPage: {
    name: 'ptRoom',
    parent: () => '',
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  boTrnRsvBoardPage: {
    name: 'boTrnRsvBoardPage',
    parent: () => pathNames.boTrnRsvBoardPage.name,
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  boTrnFbBoardPage: {
    name: 'boTrnFbBoardPage',
    parent: () => pathNames.boTrnFbBoardPage.name,
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  mbrMyPage: {
    name: 'mbrMyPage',
    parent: () => '',
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  mbrMyPointPage: {
    name: 'mbrMyPointPage',
    parent: () => '',
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  reportPage: {
    name: 'reportPage',
    parent: () => pathNames.mbrRtnBoardPage.name,
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  mbrPtFeedbackPage: {
    name: 'mbrPtFeedbackPage',
    parent: () => pathNames.mbrRsvPage.name,
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  boExcBoardPage: {
    name: 'boExcBoardPage',
    parent: () => pathNames.boExcBoardPage.name,
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  boExcNewPage: {
    name: 'boExcNewPage',
    parent: () => pathNames.boExcBoardPage.name,
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  boRtnBoardPage: {
    name: 'boRtnBoardPage',
    parent: () => pathNames.boRtnBoardPage.name,
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  boRtnNewPage: {
    name: 'boRtnNewPage',
    parent: () => pathNames.boRtnBoardPage.name,
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  mbrRsvCompletionPage: {
    name: 'mbrRsvCompletionPage',
    parent: () => pathNames.trnSearchPage.name,
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
  mbrRtnBoardPage: {
    name: 'mbrRtnBoardPage',
    parent: () => pathNames.mbrRtnBoardPage.name,
    with: function (params, query) {
      return buildPath(this, params, query)
    },
  },
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: pathNames.mainPage.name,
      component: MainPage,
      meta: {
        title: '오늘도 핏! 하게 | 현핏',
      },
    },
    {
      path: '/login',
      name: pathNames.loginPage.name,
      component: LoginPage,
      meta: {
        title: '로그인 | 현핏',
      },
    },
    {
      path: '/survey',
      name: pathNames.surveyPage.name,
      component: SurveyPage,
      meta: {
        title: '운동환경 재설정 | 현핏',
      },
    },
    {
      path: '/trainers',
      name: pathNames.trnSearchPage.name,
      component: TrnSearchPage,
      meta: {
        title: '트레이너 찾기 | 현핏',
      },
    },
    {
      path: '/mbr-rsv',
      name: pathNames.mbrRsvPage.name,
      component: MbrRsvPage,
      meta: {
        title: '라이브 클래스 | 현핏',
      },
    },
    {
      path: '/ai-training',
      name: pathNames.aiTrainingPage.name,
      component: AiTrainingPage,
      meta: {
        title: '트레이닝 프로그램 | 현핏',
      },
    },
    {
      path: '/ai-training/error',
      name: pathNames.aiTrainingErrorPage.name,
      component: AiTrainingErrorPage,
      meta: {
        title: '오류 - 트레이닝 프로그램 | 현핏',
      },
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
      meta: {
        title: '라이브 클래스 | 현핏',
      },
    },
    {
      path: '/boTrnRsvBoard',
      name: pathNames.boTrnRsvBoardPage.name,
      component: BoTrnRsvBoardPage,
      meta: {
        title: '트레이너 - 월간 라이브 클래스 | 현핏',
      },
    },
    {
      path: '/boTrnFbBoard',
      name: pathNames.boTrnFbBoardPage.name,
      component: BoTrnFbBoardPage,
      meta: {
        title: '트레이너 - 월간 피드백 | 현핏',
      },
    },
    {
      path: '/mbr-myPage',
      name: pathNames.mbrMyPage.name,
      component: MbrMyPage,
      meta: {
        title: '마이페이지 | 현핏',
      },
    },
    {
      path: '/mbr-myPoint',
      name: pathNames.mbrMyPointPage.name,
      component: MbrMyPointPage,
      meta: {
        title: '포인트 | 현핏',
      },
    },
    {
      path: '/report',
      name: pathNames.reportPage.name,
      component: ReportPage,
      meta: {
        title: '현핏 리포트 | 현핏',
      },
    },
    {
      path: '/mbr-pt-feedback',
      name: pathNames.mbrPtFeedbackPage.name,
      component: MbrPtFeedbackPage,
      meta: {
        title: '트레이너 피드백 | 현핏',
      },
    },
    {
      path: '/bo-excNew',
      name: pathNames.boExcNewPage.name,
      component: BoExcNewPage,
      meta: {
        title: '관리자 - 트레이닝 등록 | 현핏',
      },
    },
    {
      path: '/bo-excBoard',
      name: pathNames.boExcBoardPage.name,
      component: BoExcBoardPage,
      meta: {
        title: '관리자 - 트레이닝 | 현핏',
      },
    },
    {
      path: '/bo-rtnBoard',
      name: pathNames.boRtnBoardPage.name,
      component: BoRtnBoardPage,
      meta: {
        title: '관리자 - 트레이닝 프로그램 | 현핏',
      },
    },
    {
      path: '/bo-rtnNew',
      name: pathNames.boRtnNewPage.name,
      component: BoRtnNewPage,
      meta: {
        title: '관리자 - 트레이닝 프로그램 등록 | 현핏',
      },
    },
    {
      path: '/reservations/complete',
      name: pathNames.mbrRsvCompletionPage.name,
      component: MbrRsvCompletionPage,
      meta: {
        title: '라이브 클래스 예약 | 현핏',
      },
    },
    {
      path: '/routines',
      name: pathNames.mbrRtnBoardPage.name,
      component: MbrRtnBoardPage,
      meta: {
        title: '트레이닝 프로그램 | 현핏',
      },
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
router.afterEach((to, from) => {
  const title = to.meta.title === undefined ? '현핏' : to.meta.title
  document.title = title
})
export default router

export { pathNames }

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { DownArrowSvg, EditPencilSvg } from '@/module/@base/svg'
import router, { pathNames } from '@/router'
import BaseDivider from '@/module/@base/components/BaseDivider.vue'
import ApiClient from '@/services/api'
import HyunfitLogoMonoVer2Svg from '@/module/@base/svg/HyunfitLogoMonoVer2Svg.vue'

const props = defineProps({
  page: String,
  category: String,
  loading: Boolean,
})

const headerPages = [
  { displayName: '홈', destination: pathNames.mainPage },
  {
    displayName: 'AI트레이닝',
    destination: pathNames.mbrRtnBoardPage,

    menus: [
      { menuName: '프로그램', destination: pathNames.mbrRtnBoardPage },
      { menuName: '리포트', destination: pathNames.reportPage },
    ],
  },
  {
    displayName: '라이브 클래스',
    destination: pathNames.mbrRsvPage,
    menus: [
      { menuName: '라이브 클래스', destination: pathNames.mbrRsvPage },
      { menuName: '트레이너 찾기', destination: pathNames.trnSearchPage },
      { menuName: '트레이너 피드백', destination: pathNames.mbrPtFeedbackPage },
    ],
  },
]

const adminPages = [
  {
    displayName: '운동관리',
    destination: pathNames.boExcBoardPage,
  },
  {
    displayName: '프로그램관리',
    destination: pathNames.boRtnBoardPage,
  },
]

const trainerPages = [
  {
    displayName: '예약현황',
    destination: pathNames.boTrnRsvBoardPage,
  },
  {
    displayName: '피드백 현황',
    destination: pathNames.boTrnFbBoardPage,
  },
]

const profileMenus = [
  { displayName: '운동환경 재설정', destination: pathNames.surveyPage },
  { displayName: '마이페이지', destination: pathNames.mbrMyPage },
  { displayName: '비밀번호 변경', destination: '/' },
]
function getPages() {
  if (props.category === 'admin') return adminPages
  else if (props.category === 'trainer') return trainerPages
  return headerPages
}
function getMenus() {
  if (props.category === 'admin') return []
  else if (props.category === 'trainer') return []
  return profileMenus
}

let menuOpen = ref(false)
let profileMenu = ref(null)
let profileMenuButton = ref(null)
function closeMenuOutsideClick(event) {
  if (
    menuOpen.value &&
    !profileMenu.value?.contains(event.target) &&
    !profileMenuButton.value?.contains(event.target)
  ) {
    menuOpen.value = false
    window.removeEventListener('click', closeMenuOutsideClick)
  }
}
function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value === true) {
    window.addEventListener('click', closeMenuOutsideClick)
  }
}

const route = useRoute()

const activeMenuIndex = ref(-1)
const menuActivationHandler = (index, hasMenu) => {
  return hasMenu ? { mouseenter: (activeMenuIndex.value = index) } : {}
}
const menuDeactivationHandler = hasMenu => {
  return hasMenu ? { mouseleave: (activeMenuIndex.value = -1) } : {}
}
const isActivatedMenu = index => {
  return activeMenuIndex.value === index
}

const pageItemClasses = pg => {
  if (pathNames[route.name]?.parent() === pg.destination.name) {
    return 'text-white font-black'
  }
  return 'text-gray-400 font-medium hover:text-gray-200 hover:font-bold'
}
const menuItemClasses = pg => {
  console.log(route.name, pg.destination.name)
  if (
    route.name === pg.destination.name ||
    (route.name === 'trnDetailPage' && pg.destination.name === 'trnSearchPage')
  ) {
    return 'text-gray-800 font-bold'
  }
  return 'text-gray-400 font-medium hover:text-gray-800 hover:font-bold'
}
const lastMenuItemClasses = (idx, pg) => {
  if (idx < pg.menus.length - 1) return 'mb-3'
  else return ''
}

function moveToMain() {
  let userRole = localStorage.getItem('userRoleName')
  if (userRole === 'admin') {
    router.push(pathNames.boExcBoardPage)
  } else if (userRole === 'trainer') {
    router.push(pathNames.boTrnRsvBoardPage)
  } else {
    router.push(pathNames.mainPage)
  }
}

function logout() {
  ApiClient.removeTokenOnLocalStorage()
  userData.value = null
  location.href = '/'
}
function login() {
  location.href = '/login'
}
const userData = ref(null)
const loggedIn = computed(() => userData.value)

const userName = computed(() => {
  if (!loggedIn.value) return null
  if ('mbrName' in userData.value) return userData.value.mbrName
  if ('admName' in userData.value) return userData.value.admName
  if ('trnName' in userData.value) return userData.value.trnName
  console.log('at `userName` BaseHeader: name not found', userData)
  return 'unknown'
})

const userProfile = computed(() => {
  if ('mbrProfileUrl' in userData.value) return userData.value.mbrProfileUrl
  if ('admProfileUrl' in userData.value) return userData.value.admProfileUrl
  if ('trnProfileUrl' in userData.value) return userData.value.trnProfileUrl
  return ''
})
onMounted(async () => {
  userData.value = await ApiClient.me()
})

// { displayName: '로그인', destination: pathNames.loginPage },
</script>

<template>
  <div class="header flex justify-center">
    <div class="header-wrapper items-center">
      <div class="flex flex-row justify-between h-full">
        <!-- 타이틀-->
        <div class="flex items-center">
          <button @click="moveToMain()" class="mr-10 cursor-pointer">
            <HyunfitLogoMonoVer2Svg color="#ffffff" :size="160" class="ml-1" />
          </button>

          <div
            v-for="(pg, i) in getPages()"
            :key="i"
            class="my-2 relative"
            @mouseenter="menuActivationHandler(i, pg.menus)"
            @mouseleave="menuDeactivationHandler(pg.menus)"
          >
            <div class="h-full flex items-center justify-start">
              <button
                @click="router.push(pg.destination)"
                class="px-3 mx-1 py-2 transition-all"
                :class="pageItemClasses(pg)"
              >
                {{ pg.displayName }}
              </button>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="isActivatedMenu(i)"
                class="header-hover-menu-wrapper absolute px-2 py-8 self-center pt-1"
              >
                <div
                  class="header-hover-menu bg-white rounded-md flex flex-col items-center px-2 py-3"
                >
                  <button
                    v-for="(menu, m_idx) in pg.menus"
                    class="mx-4 transition-all"
                    :class="[
                      lastMenuItemClasses(m_idx, pg),
                      menuItemClasses(menu),
                    ]"
                    :key="m_idx"
                    @click="router.push(menu.destination)"
                  >
                    {{ menu.menuName }}
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!--        Profile dropdown-->
        <div class="flex items-center">
          <div class="relative">
            <button
              class="profile-dropdown-button flex items-center cursor-pointer focus:outline-none"
              @click="toggleMenu()"
              ref="profileMenuButton"
              tabindex="-1"
            >
              <img
                v-if="loggedIn"
                class="h-8 w-8 rounded-full mr-1 object-cover"
                :src="userProfile"
                alt=""
              />
              <img
                v-else
                class="h-8 w-8 rounded-full mr-1 object-cover"
                src="/src/assets/images/default-user-profile.png"
                alt=""
              />
              <DownArrowSvg :size="22" color="#AAAAAA" />
            </button>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="menuOpen"
                ref="profileMenu"
                class="absolute right-0 mt-5 profile-menu py-4 px-2 bg-white z-[101] w-64 rounded-md shadow-lg focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              >
                <div class="py-1 px-2 flex items-center flex-col">
                  <img
                    v-if="loggedIn"
                    class="h-24 w-24 rounded-full object-cover"
                    :src="userProfile"
                    alt=""
                  />
                  <img
                    v-else
                    class="h-24 w-24 rounded-full object-cover"
                    src="/src/assets/images/default-user-profile.png"
                    alt=""
                  />
                  <div
                    v-if="loggedIn"
                    class="profile-edit-button absolute mt-[68px] ml-[68px] rounded-full p-1"
                  >
                    <EditPencilSvg :size="18" />
                  </div>
                  <div v-if="loggedIn" class="text-xl mt-4">
                    안녕하세요, {{ userName }}님.
                  </div>
                  <button
                    v-else
                    @click="login()"
                    class="block px-4 py-2 text-xl cursor-pointer transition-all text-gray-400 font-medium hover:text-gray-800 hover:font-bold"
                    role="menuitem"
                    tabindex="-1"
                  >
                    로그인하기
                  </button>
                </div>

                <div class="py-1 px-2" role="none" v-if="loggedIn">
                  <BaseDivider class="mx-4 my-2" />
                  <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                  <button
                    v-for="(menu, i) in getMenus()"
                    :key="i"
                    @click="router.push(menu.destination)"
                    class="block px-4 py-2 text-base cursor-pointer transition-all"
                    :class="menuItemClasses(menu)"
                    role="menuitem"
                    tabindex="-1"
                  >
                    {{ menu.displayName }}
                  </button>
                  <button
                    @click="logout()"
                    class="block px-4 py-2 text-base cursor-pointer transition-all text-gray-400 font-medium hover:text-gray-800 hover:font-bold"
                    role="menuitem"
                    tabindex="-1"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  height: 64px;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #021f3d;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 100;
}
.header-wrapper {
  width: 1100px;
}
.header-hover-menu-wrapper {
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  min-width: auto;
  white-space: nowrap;
}
.header-hover-menu {
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 0.1);
}
.profile-edit-button {
  background-color: #f6e1e7;
}
.profile-menu a:hover {
  //background-color: #f6e1e7;
  //cursor: pointer;
}
</style>

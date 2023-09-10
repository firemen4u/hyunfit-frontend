<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import {
  HyunfitLogoGradientSvg,
  DownArrowSvg,
  EditPencilSvg,
} from '@/module/@base/svg'

const props = defineProps({
  page: String,
})

const headerPages = [
  { displayName: '홈', routeNames: ['main'], url: '/' },
  { displayName: 'AI트레이닝', routeNames: [''], url: '/' },
  {
    displayName: '화상트레이닝',
    routeNames: ['trn-search', 'trn-detail'],
    url: '/trn-search',
  },
  { displayName: '리포트', routeNames: [''], url: '/reports' },
]

const profileMenus = [
  { displayName: '계정설정', url: '/' },
  { displayName: '마이페이지', url: '/mbr-mypage' },
  { displayName: '비밀번호 변경', url: '/' },
  { displayName: '로그아웃', url: '/' },
]

let menuOpen = ref(false)
let profileMenu = ref(null)
let profileMenuButton = ref(null)
let userName = '지수'
function closeMenuOutsideClick(event) {
  if (
    menuOpen.value &&
    !profileMenu.value.contains(event.target) &&
    !profileMenuButton.value.contains(event.target)
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
const currentRouteName = computed(() => {
  return route.name
})
</script>

<template>
  <div class="header flex justify-center">
    <div class="header-wrapper items-center">
      <div class="flex flex-row justify-between h-100">
        <!-- 타이틀-->
        <div class="flex items-center">
          <a href="/" class="mr-10">
            <HyunfitLogoGradientSvg :size="140" />
          </a>

          <div v-for="(pg, i) in headerPages" :key="i">
            <a
              :href="pg.url"
              class="mr-6"
              :class="
                pg.routeNames.includes(currentRouteName)
                  ? 'text-black font-black'
                  : 'text-neutral-400 font-medium'
              "
              >{{ pg.displayName }}</a
            >
          </div>
        </div>
        <div class="flex items-center">
          <button
            class="profile-dropdown-button flex items-center cursor-pointer focus:outline-none"
            @click="toggleMenu()"
            ref="profileMenuButton"
            tabindex="-1"
          >
            <img
              class="h-8 w-8 rounded-full mr-1 object-cover"
              src="/src/assets/images/goat-jisu.png"
              alt=""
            />
            <DownArrowSvg :size="22" color="#AAAAAA" />
          </button>
        </div>
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
          v-if="menuOpen"
          ref="profileMenu"
          class="profile-menu py-4 px-2 bg-white z-[101] mt-1 ml-[844px] w-64 rounded-md shadow-lg focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div class="py-1 px-2 flex items-center flex-col">
            <img
              class="h-20 w-20 rounded-full mr-1 object-cover"
              src="/src/assets/images/goat-jisu.png"
              alt=""
            />
            <div
              class="profile-edit-button absolute mt-13 ml-14 rounded-full p-1"
            >
              <EditPencilSvg :size="18" />
            </div>
            <div class="text-xl my-2">안녕하세요, {{ userName }}님.</div>
          </div>
          <div class="py-1 px-2" role="none">
            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
            <a
              v-for="(menu, i) in profileMenus"
              :key="i"
              :href="menu.url"
              class="text-gray-700 block px-4 py-2 text-sm rounded-md"
              role="menuitem"
              tabindex="-1"
            >
              {{ menu.displayName }}
            </a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.header {
  height: 64px;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 100;
}
.header-wrapper {
  width: 1100px;
}
.profile-edit-button {
  background-color: #f6e1e7;
}
.profile-menu a:hover {
  background-color: #f6e1e7;
}
</style>

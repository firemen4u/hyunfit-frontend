<!-- ParentComponent.vue -->
<template>
  <div class="all-content-wrap">
    <div class="rtn-board-header-wrap">
      <div v-if="showAdmin" class="font-bold text-3xl ml-5">루틴 목록</div>
      <div v-if="showMember" class="font-bold text-2xl ml-10">
        HYUNFIT과 함께 운동하고 건강한 운동 습관을 완성해보세요!
      </div>
      <div class="rtn-board-header">
        <!-- admSeq가 있는 경우에만 "등록하기" 버튼을 표시 -->
        <div class="flex justify-end mt-5 mr-6 mb-5">
            <input
              type="text"
              v-model="searchTerm"
              placeholder="루틴 검색"
              class="border p-2 rounded"
            />
        </div>
      </div>
    </div>
    <div>
      <!-- BaseRtnCardGroup 컴포넌트에 props로 routines 전달 -->
      <BaseRtnCardGroup :routines="currentRoutines" />
    </div>
    <div class="flex justify-end mt-5 mr-6">
      <v-btn v-if="showAdmin" @click="goToNewRtnPage" color="primary">
        등록하기
      </v-btn>
    </div>
    <div class="mb-10">
      <BasePagination :totalPages="totalPages" v-model="currentPage" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import BaseRtnCardGroup from '/src/module/@base/components/BaseRtnCardGroup.vue'
import ApiClient from '/src/services/api'
import router, { pathNames } from '@/router'
import BasePagination from '/src/module/@base/components/BasePagination.vue'

const routines = ref([])
const searchTerm = ref('')
const loggedInUser = ref(null)
const itemsPerPage = 12
const currentPage = ref(1)

//showAdmin:true, showMember:true 인곳에 버튼 보이게 하기
const { showAdmin, showMember } = defineProps(['showAdmin', 'showMember'])

const filteredRoutines = computed(() => {
  return routines.value.filter(routine =>
    routine.rtnName.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

// onPageChange 추가
watch(currentPage, newVal => {
  console.log('currentPage changed:', newVal)
})

const totalPages = computed(() =>
  Math.ceil(filteredRoutines.value.length / itemsPerPage)
)

const currentRoutines = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  console.log('Start Index:', startIndex) // 로그 추가
  console.log('End Index:', endIndex) // 로그 추가
  const slicedRoutines = filteredRoutines.value.slice(startIndex, endIndex)
  console.log('Current Page Routines:', slicedRoutines) // 로그 추가
  return slicedRoutines
})

const handlePageChange = page => {
  console.log('Changing to page:', page)
  currentPage.value = page
  console.log('Current Routines After Change:', currentRoutines.value)
}

onMounted(async () => {
  try {
    // routines.value = await ApiClient.get('/routines')
    const fetchedRoutines = await ApiClient.get('/routines')
    routines.value = fetchedRoutines.sort((a, b) => b.rtnSeq - a.rtnSeq) // seq로 정렬
    console.log('Sorted Routines by seq:', routines.value)
    //   let fetchedUser = null

    //   try {
    //     fetchedUser = await ApiClient.get('/members/me')
    //   } catch (error) {
    //     console.log('멤버 로그인 안 됨')
    //   }

    //   if (!fetchedUser) {
    //     try {
    //       fetchedUser = await ApiClient.get('/admins/me')
    //     } catch (error) {
    //       console.log('관리자 로그인 안 됨')
    //     }
    //   }

    //   if (fetchedUser) {
    //     loggedInUser.value = fetchedUser
    //   }
  } catch (error) {
    console.error('API 호출 중 에러 발생:', error)
  }
  console.log('Routines Fetched:', routines.value)
})

const goToNewRtnPage = () => {
  router.push(pathNames.boRtnNewPage)
}
</script>

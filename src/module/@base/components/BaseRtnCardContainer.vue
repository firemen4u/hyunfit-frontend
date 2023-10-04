<!-- ParentComponent.vue -->
<template>
  <div class="all-content-wrap">
    <div class="rtn-board-header-wrap flex items-center px-10">
      <div v-if="showAdmin" class="text-4xl font-black text-[#021f3d]">
        <p class="text-2xl font-bold text-[#021f3d]">오피스</p>
        <p class="text-4xl font-black mt-3 text-[#021f3d]">트레이닝 프로그램</p>
      </div>
      <div v-if="showMember" class="text-4xl font-black text-[#021f3d]">
        <p class="text-4xl font-black mt-5 text-[#021f3d]">트레이닝 프로그램</p>
        <p class="text-2xl font-bold mt-5 text-[#021f3d]">
          HYUNFIT과 함께 건강한 운동 습관을 완성해보세요!
        </p>
      </div>
    </div>
    <div class="mt-6 px-[50px]">
      <v-text-field
        label="프로그램 이름으로 검색하세요."
        single-line
        hide-details
        clearable
        flat
        bg-color="#F8F8F8"
        variant="solo"
        v-model="searchTerm"
        type="text"
      >
        <template v-slot:prepend-inner>
          <div class="px-5">
            <SearchSvg :size="20" color="#AAAAAA" />
          </div>
        </template>
      </v-text-field>
    </div>
    <div class="flex justify-end mt-5 mx-[50px]">
      <v-btn
        v-if="showAdmin"
        @click="goToNewRtnPage"
        color="#021f3d"
        size="x-large"
        class="rounde-lg"
      >
        프로그램 등록하기
      </v-btn>
    </div>
    <div class="mt-3 mx-[35px]">
      <!-- BaseRtnCardGroup 컴포넌트에 props로 routines 전달 -->
      <BaseRtnCardGroup :routines="currentRoutines" :showMember="showMember" />
    </div>

    <div class="mb-10">
      <BasePagination :totalPages="totalPages" v-model="currentPage" />
    </div>
  </div>
</template>

<script setup>
import { SearchSvg } from '/src/module/@base/svg'
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
  const slicedRoutines = filteredRoutines.value.slice(startIndex, endIndex)
  return slicedRoutines
})

const handlePageChange = page => {
  currentPage.value = page
}

onMounted(async () => {
  try {
    const fetchedRoutines = await ApiClient.get('/routines')
    routines.value = fetchedRoutines.sort((a, b) => b.rtnSeq - a.rtnSeq) // seq로 정렬
  } catch (error) {
    console.error('API 호출 중 에러 발생:', error)
  }
})

const goToNewRtnPage = () => {
  router.push(pathNames.boRtnNewPage)
}
</script>
<style scoped>
.rtn-board-header-wrap {
  background-image: url('https://fs.hyunfit.life/api/hyunfit/file/rm222-mind-14.svg');
  width: 100%;
  background-size: cover;
  background-position-y: -20px;
  height: 200px;
}
</style>

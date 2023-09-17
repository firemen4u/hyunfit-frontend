<template lang="">
  <BaseContainer>
    <BaseSideBar
      :sidebarHeader="sidebarHeader"
      :categoryTitle="mainCategory"
      :subcategories="subcategories"
    />
    <BaseBodyWrapper>
      <div class="제일큰 pt-10">
        <div class="운동목록이랑검색창있는div flex justify-between">
          <div>운동 목록</div>
          <div>
            <input
              type="text"
              v-model="searchText"
              placeholder="운동 검색"
              class="border-2 border-solid border-gray-400"
            />
          </div>
        </div>

        <div class="border-4 border-black border-dashed">
          <BoExcBoardFilterContainer
            class="flex justify-between"
            @updateExcType="updateExcType"
          />

          <!-- 생략 -->
          <hr />
          <!-- 생략 -->
          <div class="w-full border-dashed border-4 border-yellow-400">
            <div v-if="paginatedExercises.length > 0" class="flex flex-wrap">
              <div
                v-for="exercise in paginatedExercises"
                :key="exercise.excSeq"
              >
                <BoExcCard :exercise="exercise" />
              </div>
            </div>
            <div v-else>해당하는 운동이 없습니다.</div>
          </div>
          <!-- 생략 -->
          <BasePagination v-model="currentPage" :total-pages="totalPages" />
        </div>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>
<script setup>
import {
  BoExcCard,
  BoExcBoardFilterContainer,
} from '/src/module/bo/exc/components'
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import BaseSideBar from '/src/module/@base/views/BaseSideBar.vue'
import BasePagination from '/src/module/@base/components/BasePagination.vue'
import { defineProps, ref, onMounted, computed, watch } from 'vue'

const sidebarHeader = '관리페이지'
const mainCategory = 'AI 트레이닝'
const subcategories = [
  { id: 1, title: '운동 관리', link: '/bo-excBoard' },
  { id: 2, title: '루틴 관리', link: '/bo-rtnboard' },
  { id: 3, title: '운동 등록', link: '/bo-excNew' },
  { id: 4, title: '루틴 등록', link: '/link4' },
]

const searchText = ref('') // 검색 텍스트를 저장할 ref 변수

const selectedExcType = ref(null) // 선택한 excType을 저장할 변수

// 검색 텍스트와 필터링된 운동 목록
const updateExcType = value => {
  selectedExcType.value = value // 선택한 excType 업데이트
  console.log('Before reset:', currentPage.value) // 로그 추가
  currentPage.value = 1 // 페이지를 1로 초기화
  console.log('After reset:', currentPage.value) // 로그 추가
}

const itemsPerPage = ref(7) // 한 페이지당 표시될 아이템 수
const currentPage = ref(1) // 현재 페이지

const totalPages = computed(() => {
  return Math.ceil(filteredExercises.value.length / itemsPerPage.value)
})
// 페이지에 따라 나눌 운동 목록
const paginatedExercises = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredExercises.value.slice(start, end)
})

const filteredExercises = computed(() => {
  let result = exercises.value

  // excType에 따른 필터링
  if (selectedExcType.value !== null) {
    result = result.filter(
      exercise => exercise.excType === selectedExcType.value
    )
  }

  // 검색어에 따른 필터링
  if (searchText.value) {
    result = result.filter(exercise => {
      return exercise.excName
        .toLowerCase()
        .includes(searchText.value.toLowerCase())
    })
  }

  return result
})

const exercises = ref([]) // API로 받아온 운동 목록을 저장할 변수
// API를 통해 운동 목록을 가져오는 함수
const fetchExercises = async () => {
  try {
    const response = await fetch('http://localhost:8080/exercises') // API 엔드포인트를 설정하세요.
    const data = await response.json()
    exercises.value = data // 받아온 데이터를 exercises 변수에 저장합니다.
  } catch (error) {
    console.error('운동 목록을 불러오는 중 에러 발생:', error)
  }
}

// 컴포넌트가 마운트된 후 API로부터 데이터를 가져옵니다.
onMounted(() => {
  fetchExercises()
})

watch(searchText, () => {
  currentPage.value = 1 // 검색어가 바뀔 때 페이지를 1로 초기화
  console.log(
    '검색어 바뀌어서 1로초기화 currentPage.value :',
    currentPage.value
  )
})

watch(currentPage, (newVal, oldVal) => {
  console.log('BoExcBoardPage currentPage changed:', newVal, oldVal) // 로그 추가
})
</script>
<style lang=""></style>

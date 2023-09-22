<template>
  <BaseContainer category="admin">
    <BaseBodyWrapper>
      <div class="pt-10">
        <div class="flex justify-between">
          <div class="text-3xl font-bold">운동 목록</div>
        </div>

        <div
          class="content-wrap p-2 mt-5 mb-20 shadow-md border-2 border-gray-100 rounded-lg"
        >
          <div class="flex justify-between items-center">
            <BoExcBoardFilterContainer
              class="flex"
              @updateExcType="updateExcType"
            />
            <div class="mr-5">
              <input
                type="text"
                v-model="searchText"
                placeholder=" 운동 검색"
                class="border-2 border-solid border-gray-400 rounded-md pl-4 hover:border-gray-600"
              />
            </div>
          </div>
          <div class="exc-wrap w-full">
            <div
              v-if="paginatedExercises.length > 0"
              class="flex flex-wrap ml-4"
            >
              <div
                v-for="exercise in paginatedExercises"
                :key="exercise.excSeq"
              >
                <BoExcCard :exercise="exercise" @openModal="openModal" />
              </div>
            </div>
            <div v-else>해당하는 운동이 없습니다.</div>
          </div>
          <div class="flex justify-end mr-5 mb-10">
            <v-btn @click="goToExcNewPage" color="primary">운동 등록하기</v-btn>
          </div>
          <BasePagination v-model="currentPage" :total-pages="totalPages" />
        </div>
      </div>
      <BoExcCardModal
        :show="showModal"
        :exercise="selectedExercise"
        @update:show="showModal = $event"
      />
    </BaseBodyWrapper>
  </BaseContainer>
</template>
<script setup>
import {
  BoExcCard,
  BoExcBoardFilterContainer,
  BoExcCardModal,
} from '/src/module/bo/exc/components'
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import BasePagination from '/src/module/@base/components/BasePagination.vue'
import { ref, onMounted, computed, watch } from 'vue'
import router, { pathNames } from '@/router'

const goToExcNewPage = () => {
  router.push(pathNames.boExcNewPage)
}
const searchText = ref('') // 검색 텍스트를 저장할 ref 변수

const selectedExcType = ref(null) // 선택한 excType을 저장할 변수

// 검색 텍스트와 필터링된 운동 목록
const updateExcType = value => {
  selectedExcType.value = value // 선택한 excType 업데이트
  console.log('Before reset:', currentPage.value) // 로그 추가
  currentPage.value = 1 // 페이지를 1로 초기화
  console.log('After reset:', currentPage.value) // 로그 추가
}

const itemsPerPage = ref(15) // 한 페이지당 표시될 아이템 수
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
onMounted(async () => {
  await fetchExercises()

  // excSeq로 정렬
  exercises.value.sort((a, b) => b.excSeq - a.excSeq)

  // 정렬된 운동 목록을 출력
  console.log('Sorted Exercises by excSeq:', exercises.value)
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

//모달창
const showModal = ref(false) // 모달 상태를 관리할 변수
const selectedExercise = ref(null) // 선택된 운동을 저장할 변수

// 모달을 띄우는 함수
const openModal = exercise => {
  selectedExercise.value = exercise
  showModal.value = true
}
</script>
<style scoped>
.exc-wrap {
  height: 650px;
}
</style>

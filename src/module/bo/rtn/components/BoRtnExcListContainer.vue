<script setup>
import {
  BoExcBoardFilterContainer,
  BoExcCardModal,
} from '/src/module/bo/exc/components'
import BasePagination from '/src/module/@base/components/BasePagination.vue'
import BoRtnExcCard from '/src/module/bo/rtn/components/BoRtnExcCard.vue'
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: Array,
  exercises: Array,
})

const emit = defineEmits(['update:modelValue'])

// 총 시간 계산
const totalMinutes = computed(() => {
  return props.modelValue.reduce((acc, curr) => {
    return acc + (curr.excSetCount * curr.excTimePerSetInSec) / 60
  }, 0)
})

const addExercise = exercise => {
  emit('update:modelValue', [...props.modelValue, exercise])
}

const removeExercise = exerciseToRemove => {
  const index = props.modelValue.findIndex(
    exercise => exercise.excSeq === exerciseToRemove.excSeq
  )
  emit(
    'update:modelValue',
    props.modelValue.filter((a, i) => i !== index)
  )
}

const clearExercises = () => {
  emit('update:modelValue', [])
}

const searchText = ref('') // 검색 텍스트를 저장할 ref 변수

const selectedExcType = ref(0) // 선택한 excType을 저장할 변수

// 검색 텍스트와 필터링된 운동 목록
const updateExcType = value => {
  selectedExcType.value = value // 선택한 excType 업데이트
  currentPage.value = 1 // 페이지를 1로 초기화
}

const itemsPerPage = ref(9) // 한 페이지당 표시될 아이템 수
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
  let result = props.exercises
  // excType에 따른 필터링
  if (selectedExcType.value !== 0) {
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

watch(searchText, () => {
  currentPage.value = 1 // 검색어가 바뀔 때 페이지를 1로 초기화
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

<template>
  <div class="flex justify-between w-full">
    <div
      class="exc-list-container p-2 mt-5 mb-4 shadow-md border-2 border-gray-100 rounded-lg"
    >
      <div class="p-5 flex flex-col justify-center">
        <div class="flex justify-between items-center h-20">
          <BoExcBoardFilterContainer
            :modelValue="selectedExcType"
            @updateExcType="updateExcType"
          />
          <v-text-field
            type="text"
            v-model="searchText"
            variant="outlined"
            placeholder="운동 검색"
            density="compact"
            hide-details
          />
        </div>
        <div
          v-if="paginatedExercises.length > 0"
          class="grid grid-cols-3 gap-4"
        >
          <BoRtnExcCard
            v-for="exercise in paginatedExercises"
            :key="exercise.excSeq"
            :exercise="exercise"
            @click:card="openModal"
            @click:add="addExercise"
          />
        </div>
        <div v-else class="">해당하는 운동이 없습니다.</div>
      </div>
      <BasePagination v-model="currentPage" :total-pages="totalPages" />
    </div>
    <div class="exc-selection-list-container">
      <div class="flex justify-between">
        <div class="p-2">
          <p class="text-lg font-bold">선택한 운동 목록</p>
        </div>

        <div class="p-2">
          <p class="text-lg font-bold">
            총 시간 : {{ totalMinutes.toFixed(1) }} 분
            <!-- 총 시간 추가 -->
          </p>
        </div>
        <div class="">
          <button @click="clearExercises" class="bg-gray-200 p-2 rounded-md">
            초기화
          </button>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div v-for="exercise in props.modelValue" :key="exercise.excSeq">
          <div
            class="flex justify-between p-2 bg-primary w-80 mb-2 mr-2 rounded-lg"
          >
            <p>이름: {{ exercise.excName }}</p>
            <p>
              소요 시간 :
              {{
                (
                  (exercise.excSetCount * exercise.excTimePerSetInSec) /
                  60
                ).toFixed(1)
              }}
              분
            </p>
            <button @click="removeExercise(exercise)">❌</button>
          </div>
        </div>
      </div>
    </div>
    <BoExcCardModal v-model="showModal" :exercise="selectedExercise" />
  </div>
</template>

<style scoped>
.exc-list-container {
  width: 70%;
  margin-right: 20px;
}
.exc-selection-list-container {
  width: 30%;
}
</style>

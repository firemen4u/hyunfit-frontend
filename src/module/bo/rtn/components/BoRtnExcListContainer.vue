<script setup>
import {
  BoExcBoardFilterContainer,
  BoExcCardModal,
} from '/src/module/bo/exc/components'
import BasePagination from '/src/module/@base/components/BasePagination.vue'
import { ref, computed, watch } from 'vue'
import RefreshSvg from '@/module/@base/svg/RefreshSvg.vue'
import BoRtnExcListItem from '@/module/bo/rtn/components/BoRtnExcListItem.vue'
import BoRtnExcSelectedLabel from '@/module/bo/rtn/components/BoRtnExcSelectedLabel.vue'
import ExcUtils from '@/module/bo/exc/services/excUtils'

const props = defineProps({
  modelValue: Array,
  exercises: Array,
})

const emit = defineEmits(['update:modelValue'])

function isChecked(exercise) {
  return props.modelValue?.reduce(
    (total, exc) => total + (exc.excSeq === exercise.excSeq),
    0
  )
}

const addExercise = exercise => {
  emit('update:modelValue', [...props.modelValue, exercise])
}

const removeExercise = index => {
  // const index = props.modelValue.findIndex(
  //   exercise => exercise.excSeq === exerciseToRemove.excSeq
  // )
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

const itemsPerPage = ref(6) // 한 페이지당 표시될 아이템 수
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
  <div>
    <div class="flex">
      <p class="font-bold text-xl mt-3 mr-5">운동 선택하기</p>
      <slot name="input-validator"></slot>
    </div>
    <div
      class="rtn-exc-container flex justify-between w-full mt-4 px-4 py-4 shadow-md border-2 border-gray-100 rounded-lg"
    >
      <div class="exc-list-container">
        <div class="flex flex-col justify-center mb-4">
          <div class="items-center mb-5">
            <v-text-field
              class="mb-2"
              v-model="searchText"
              variant="outlined"
              label="운동 검색"
              density="compact"
              hide-details
            />
            <div class="flex justify-between">
              <BoExcBoardFilterContainer
                :modelValue="selectedExcType"
                @updateExcType="updateExcType"
              />
              <v-btn variant="text" @click="clearExercises">
                <div class="mr-1 text-gray-600">초기화</div>
                <RefreshSvg size="15" color="#374151" />
              </v-btn>
            </div>
          </div>
          <div
            v-if="paginatedExercises.length > 0"
            class="justify-items-center"
          >
            <BoRtnExcListItem
              v-for="exercise in paginatedExercises"
              :key="exercise.excSeq"
              :exercise="exercise"
              :checked="isChecked(exercise)"
              @click:card="openModal"
              @click:add="addExercise"
            />
          </div>
          <div v-else class="self-center">해당하는 운동이 없습니다.</div>
        </div>
        <BasePagination v-model="currentPage" :total-pages="totalPages" />
      </div>
      <div class="ml-3 exc-selection-list-container h-full w-full">
        <div class="text-lg font-bold mt-2">선택항목</div>
        <div class="h-[350px] w-full overflow-y-auto flex flex-col my-2">
          <div
            class="w-full"
            v-for="(exercise, i) in props.modelValue"
            :key="i"
          >
            <BoRtnExcSelectedLabel
              :rtnIdx="i"
              :exercise="exercise"
              @click="removeExercise(i)"
            />
          </div>
        </div>
        <div>
          <div class="flex items-baseline ml-2 mb-2">
            <div class="w-28 font-semibold">루틴 시간 :</div>
            <div class="text-xl font-bold mx-1">
              <slot name="totalMinutes"></slot>
            </div>
            분
          </div>
          <div class="flex items-baseline ml-2 mb-2">
            <div class="w-28 font-semibold">주요 운동부위 :</div>
            <div class="text-xl font-bold mx-1">
              <slot name="averageTarget"></slot>
            </div>
          </div>
          <div class="flex items-baseline ml-2 mb-2">
            <div class="w-28 font-semibold">난이도 :</div>
            <div class="text-xl font-bold mx-1">
              <slot name="averageDifficulty"></slot>
            </div>
          </div>

          <div class="flex items-baseline ml-2 mb-2">
            <div class="w-28 font-semibold">소모 칼로리 :</div>
            <div class="text-xl font-bold mx-1">
              <slot name="totalCalories"></slot>
            </div>
            kcal
          </div>
        </div>
      </div>
      <BoExcCardModal v-model="showModal" :exercise="selectedExercise" />
    </div>
  </div>
</template>

<style scoped>
.rtn-exc-container {
  height: 600px;
}
.exc-list-container {
  width: 60%;
  margin-right: 20px;
  height: 100%;
}
.exc-selection-list-container {
  width: 35%;
}
</style>

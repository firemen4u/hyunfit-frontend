<template>
  <BaseContainer category="admin">
    <div class="w-100 flex justify-center primary-background mb-[150px]">
      <BaseBodyWrapper>
        <div class="mt-3 bg-white shadow-lg rounded-xl overflow-hidden">
          <div class="bo-excNewBoard-banner flex items-center px-10">
            <div>
              <p class="text-2xl font-bold text-[#021f3d]">트레이너</p>
              <p class="text-4xl font-black mt-3 text-[#021f3d]">
                트레이닝 관리
              </p>
            </div>
          </div>

          <div class="mt-6 px-[50px]">
            <v-text-field
              label="운동 이름으로 검색하세요."
              single-line
              hide-details
              clearable
              flat
              bg-color="#F8F8F8"
              variant="solo"
              v-model="searchText"
              type="text"
            >
              <template v-slot:prepend-inner>
                <div class="px-5">
                  <SearchSvg :size="20" color="#AAAAAA" />
                </div>
              </template>
            </v-text-field>
          </div>

          <div class="flex justify-between items-center mt-5 mx-[50px]">
            <div class="flex">
              <BoExcBoardFilterContainer
                class="flex"
                @updateExcType="updateExcType"
                :modelValue="selectedExcType"
              />
            </div>
            <v-btn
              @click="goToExcNewPage"
              color="#021f3d"
              size="x-large"
              class="rounded-lg"
              >트레이닝 등록하기</v-btn
            >
          </div>

          <div
            class="content-wrap p-2 mt-5 mb-20 border-gray-100 rounded-lg bg-white"
          >
            <div class="exc-wrap w-full">
              <div
                v-if="paginatedExercises.length > 0"
                class="flex flex-wrap justify-center"
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
            <BasePagination
              v-model="currentPage"
              :total-pages="totalPages"
              class="mt-3"
            />
          </div>
        </div>
        <BoExcCardModal
          :show="showModal"
          :exercise="selectedExercise"
          :showDeleteBtn="true"
          @update:show="showModal = $event"
          @deleteExercise="deleteExercise"
        />
      </BaseBodyWrapper>
    </div>
  </BaseContainer>
</template>
<script setup>
import { SearchSvg } from '/src/module/@base/svg'
import {
  BoExcCard,
  BoExcBoardFilterContainer,
  BoExcCardModal,
} from '/src/module/bo/exc/components'
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import BasePagination from '/src/module/@base/components/BasePagination.vue'
import { ref, onMounted, computed, watch, onBeforeMount } from 'vue'
import router, { pathNames } from '@/router'

onBeforeMount(async () => {
  const user = {
    username: 'admin',
    password: '123',
  }
  await axios
    .post(`${BACKEND_API_BASE_URL}/auth/admin`, user)
    .then(response => {
      let token = response.headers.get('authorization')
      ApiClient.setTokenOnLocalStorage(token, 'admin')
    })
})
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

const itemsPerPage = ref(8) // 한 페이지당 표시될 아이템 수
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
    const data = await ApiClient.get('/exercises') // ApiClient 사용
    exercises.value = data
  } catch (error) {
    console.error('운동 목록을 불러오는 중 에러 발생:', error)
  }
}

// 컴포넌트가 마운트된 후 API로부터 데이터를 가져옵니다.
onMounted(async () => {
  await fetchExercises()
  // excSeq로 정렬
  exercises.value.sort((a, b) => b.excSeq - a.excSeq)
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
// 운동 삭제 함수
const emit = defineEmits([])
const deleteExercise = async excSeq => {
  try {
    await ApiClient.delete(`/exercises/${excSeq}`)
    fetchExercises()
  } catch (error) {
    console.error('운동 삭제 중 에러 발생:', error)
  }
}
</script>

<script>
import axios from 'axios'
import { BACKEND_API_BASE_URL } from '@/config'
import ApiClient from '@/services/api'

export default {
  async beforeRouteEnter() {
    const user = {
      username: 'admin',
      password: '123',
    }
    await axios
      .post(`${BACKEND_API_BASE_URL}/auth/admin`, user)
      .then(response => {
        let token = response.headers.get('authorization')
        ApiClient.setTokenOnLocalStorage(token, 'admin')
      })
  },
}
</script>

<style scoped>
.exc-wrap {
  height: 100%;
}
.bo-excNewBoard-banner {
  background-image: url('https://fs.hyunfit.life/api/hyunfit/file/rm222-mind-14.svg');
  width: 100%;
  background-size: cover;
  background-position-y: -20px;
  height: 200px;
}
</style>

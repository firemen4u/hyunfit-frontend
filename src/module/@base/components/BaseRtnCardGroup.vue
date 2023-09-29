<script setup>
import { ref } from 'vue'
import HeartSvg from '@/module/@base/svg/HeartSvg.vue'
import BaseLabel from '@/module/@base/components/BaseLabel.vue'
import RewardSvg from '@/module/@base/svg/RewardSvg.vue'
import { FILE_SERVER_HYUNFIT_URL } from '@/config'
import BoExcCard from '/src/module/@base/components/BaseExcCard.vue'
import router, { pathNames } from '@/router'

const props = defineProps({
  routines: Array,
})

const goToAiTraining = () => {
  router.push(pathNames.aiTrainingPage)
}

const showModal = ref(false) // 모달 상태
const selectedRoutine = ref(null) // 선택된 루틴 정보를 담을 변수

// 루틴 카드를 클릭했을 때 모달을 열고 선택된 루틴 정보를 저장하는 함수
const openModal = routine => {
  showModal.value = true
  selectedRoutine.value = routine
}
function srcUrlOf(rtnSeq) {
  return `${FILE_SERVER_HYUNFIT_URL}/routine_thumbnail_${rtnSeq}.jpg`
}

const startRoutine = () => {
  // 여기서 selectedRoutine 를 사용하여 루틴 정보를 전송하는 코드 쓰면 돼
  // 선택된 루틴 정보가 있고, 그 정보를 기반으로 AI 트레이닝 페이지로 이동하고 싶다면
  if (selectedRoutine.value) {
    console.log('루틴 시작:', selectedRoutine.value)
    goToAiTraining() // 이 함수를 호출하여 AI 트레이닝 페이지로 이동
  }
}
</script>
<template>
  <v-dialog v-model="showModal" width="auto">
    <div class="card-container bg-gray-50 rounded-lg">
      <div class="close-btn-wrap flex justify-end pr-2">
        <v-card variant="toner" class="w-16 text-center">
          <v-card-actions>
            <v-btn color="primary" @click="showModal = false">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <div class="rtn-detail-wrap">
        <div class="rtn-detail-content flex justify-between">
          <div class="ml-10">
            <div class="rtn-detail-name">
              <p class="text-3xl font-extrabold">
                {{ selectedRoutine.rtnName }}
              </p>
            </div>
            <div class="rtn-detail-col flex">
              <p class="rtn-detail-col-1 font-bold">루틴 설명</p>
              <p class="rtn-detail-col-2 text-md">
                {{ selectedRoutine.rtnContent }}
              </p>
            </div>

            <div class="rtn-detail-col flex">
              <p class="rtn-detail-col-1 font-bold">소요 시간</p>
              <p class="rtn-detail-col-2">
                {{ selectedRoutine.rtnDurationInMin }}분
              </p>
            </div>

            <div class="rtn-detail-col flex">
              <p class="rtn-detail-col-1 font-bold">소모 칼로리</p>
              <p>{{ selectedRoutine.rtnCaloriesBurnt }} Kcal</p>
            </div>
          </div>
          <div class="mr-15">
            <img
              class="rtn-detail-img object-cover bg-gray-200"
              :src="srcUrlOf(selectedRoutine.rtnSeq)"
              alt="이미지"
            />
          </div>
        </div>
      </div>

      <div class="">
        <!-- 선택된 루틴의 운동 정보를 렌더링합니다. -->
        <div
          v-if="selectedRoutine"
          class="rtn-excCard-wrap flex-wrap grid grid-cols-3 justify-items-center pt-10 pb-10 mx-7"
        >
          <BoExcCard
            v-for="exercise in selectedRoutine.exercises"
            :exercise="exercise"
            :key="exercise.excSeq"
          />
        </div>
        <div class="flex justify-center mb-10">
          <v-btn size="large" color="primary" @click="startRoutine">
            루틴 시작하기
          </v-btn>
        </div>
      </div>
    </div>
  </v-dialog>

  <div
    class="rtn-card-group-container grid grid-cols-3 gap-0 justify-items-center"
  >
    <div
      v-for="data in routines"
      :key="data.rtnSeq"
      @click="openModal(data)"
      class="rtn-card rounded-lg overflow-hidden shadow-md my-3 bg-white"
    >
      <img
        class="cover-image w-full object-cover bg-gray-200"
        :src="srcUrlOf(data.rtnSeq)"
        alt="이미지"
      />
      <div class="px-2 pb-2 pt-2">
        <div class="content-wrapper p-1">
          <div class="flex items-start">
            <div class="text-base rtn-card-title font-black self-center">
              {{ data.rtnName }}
            </div>
            <BaseLabel class="ml-2 mt-0.5 px-2 py-1"
              >{{ data.rtnDurationInMin }}분</BaseLabel
            >
          </div>

          <div class="flex items-center my-1 mt-2">
            <div
              class="flex items-center border-1.5 border-gray-200 rounded-full text-sm font-semibold text-gray-600 px-2 py-1 mr-1"
            >
              <HeartSvg :size="16"></HeartSvg>
              <div class="text-xs ml-0.5">{{ data.rtnCaloriesBurnt }} Kcal</div>
            </div>
            <div
              class="flex items-center border-1.5 border-gray-200 rounded-full text-sm font-semibold text-gray-700 px-2 py-1 mr-1"
            >
              <RewardSvg :size="16"></RewardSvg>

              <div class="text-xs ml-0.5">포인트 {{ data.rtnRewardPoint }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rtn-card {
  width: 310px;
  height: 280px;
}
.cover-image {
  height: 165px;
}
.rtn-card-title {
  width: 250px;
  height: 55px;
}
.rtn-excCard-wrap {
  max-height: 660px;
  overflow: scroll;
}

.card-container {
  width: 1000px;
}
.rtn-detail-img {
  max-width: 300px;
  max-height: 200px;
}
.rtn-detail-col {
  margin-top: 10px;
}
.rtn-detail-col-1 {
  width: 100px;
}
.rtn-detail-col-2 {
  width: 450px;
}
.rtn-detail-name {
  width: 560px;
}
</style>

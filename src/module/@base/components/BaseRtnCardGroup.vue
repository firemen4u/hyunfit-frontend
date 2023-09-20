<script setup>
import { ref } from 'vue'
import HeartSvg from '@/module/@base/svg/HeartSvg.vue'
import BaseLabel from '@/module/@base/components/BaseLabel.vue'
import RewardSvg from '@/module/@base/svg/RewardSvg.vue'
import { FILE_SERVER_HYUNFIT_URL } from '@/config'
import BoExcCard from '/src/module/bo/exc/components/BoExcCard.vue'

const props = defineProps({
  routines: Array,
})

const showModal = ref(false) // 모달 상태
const selectedRoutine = ref(null) // 선택된 루틴 정보를 담을 변수

// 루틴 카드를 클릭했을 때 모달을 열고 선택된 루틴 정보를 저장하는 함수
const openModal = routine => {
  showModal.value = true
  selectedRoutine.value = routine
  console.log(routine.exercises[0])
  console.log(routine.exercises[1])
  console.log(routine.exercises[2])
}
function srcUrlOf(rtnSeq) {
  return `${FILE_SERVER_HYUNFIT_URL}/routine_thumbnail_${rtnSeq}.jpg`
}
</script>
<template>
  <v-dialog v-model="showModal" width="auto">
    <div class="card-container">
      <div class="bg-white">
        <p>루틴안의 운동 정보</p>
        <!-- 선택된 루틴의 운동 정보를 렌더링합니다. -->
        <div v-if="selectedRoutine.value">
          <ul>
            <li
              v-for="exercise in selectedRoutine.value.exercises"
              :key="exercise.excSeq"
            >
              {{ exercise.excName }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <v-card>
      <v-card-actions>
        <v-btn color="primary" block @click="showModal = false"
          >Close Dialog</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <div
    class="rtn-card-group-container px-5 grid grid-cols-4 gap-0 justify-items-center"
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
  width: 250px;
  height: 240px;
}
.cover-image {
  height: 130px;
}
.rtn-card-title {
  width: 165px;
  height: 55px;
}
</style>

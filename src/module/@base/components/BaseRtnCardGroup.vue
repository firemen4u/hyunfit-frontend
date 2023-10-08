<script setup>
import { ref } from 'vue'
import { HeartSvg, LevelSvg, RewardSvg } from '@/module/@base/svg'
import BaseLabel from '@/module/@base/components/BaseLabel.vue'
import { FILE_SERVER_HYUNFIT_URL } from '@/config'
import BoExcCard from '/src/module/@base/components/BaseExcCard.vue'
import router, { pathNames } from '@/router'
import excUtils from '../../bo/exc/services/excUtils'
import TimerSvg from '@/module/@base/svg/TimerSvg.vue'
import BaseRtnCardModalChips from '@/module/@base/components/BaseRtnCardModalChips.vue'

const props = defineProps({
  routines: Array,
  showMember: Boolean,
})

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

const startRoutine = async () => {
  // 여기서 selectedRoutine 를 사용하여 루틴 정보를 전송하는 코드 쓰면 돼
  // 선택된 루틴 정보가 있고, 그 정보를 기반으로 AI 트레이닝 페이지로 이동하고 싶다면
  if (selectedRoutine.value) {
    await router.push(
      pathNames.aiTrainingPage.with(undefined, {
        rtnSeq: selectedRoutine.value.rtnSeq,
      })
    )
  }
}

const rtnExperienceLevelMapping = {
  1: '초급',
  2: '초중급',
  3: '중급',
  4: '중상급',
  5: '상급',
}

const mapExperienceLevel = level => {
  return rtnExperienceLevelMapping[level] || '알 수 없음'
}

const considerationsMapping = {
  rtnGoal: {
    1: '# 체중 관리',
    2: '# 건강 관리',
  },
  rtnKneeHealthConsidered: {
    0: '',
    1: '# 무릎 건강을 고려한',
  },
  rtnNoiseConsidered: {
    0: '',
    1: '# 층간 소음을 고려한',
  },
  rtnLongSitter: {
    0: '',
    1: '# 오래 앉아있는 사람을 위한',
  },
  rtnNeckShoulderFocused: {
    0: '',
    1: '# 목과 어깨에 집중된',
  },
  rtnBackDiskConsidered: {
    0: '',
    1: '# 허리디스크 환자를 고려한',
  },
}

const mapConsideration = (key, level) => {
  return (considerationsMapping[key] && considerationsMapping[key][level]) || ''
}
</script>
<template>
  <v-dialog v-model="showModal" width="auto">
    <div class="card-container bg-white rounded-lg py-5">
      <div class="rtn-detail-wrap mb-3">
        <div class="rtn-detail-content flex justify-between items-start">
          <div class="flex flex-col justify-end">
            <div class="ml-10 w-[560px]">
              <div class="rtn-detail-name">
                <p class="text-3xl font-extrabold mb-3">
                  {{ selectedRoutine.rtnName }}
                </p>
              </div>
              <BaseRtnCardModalChips :routine="selectedRoutine" />
              <div class="flex justify-between items-start mt-3 h-[140px]">
                <div>
                  <div class="rtn-detail-col flex">
                    <p class="rtn-detail-col-1 font-bold">루틴 설명</p>
                    <p class="rtn-detail-col-2 text-md">
                      {{ selectedRoutine.rtnContent }}
                    </p>
                  </div>

                  <div class="rtn-detail-col flex">
                    <p class="rtn-detail-col-1 font-bold">트레이닝 수</p>
                    <p>{{ selectedRoutine.exercises.length }}개</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mr-8 rounded-lg overflow-hidden">
            <img
              class="w-[350px] h-[225px] object-cover bg-gray-200"
              :src="srcUrlOf(selectedRoutine.rtnSeq)"
              alt="이미지"
            />
          </div>
        </div>
        <div class="flex justify-between px-8 mt-3">
          <div>
            <div class="items-end flex flex-wrap text-gray-500">
              <p class="pr-2">
                {{ mapConsideration('rtnGoal', selectedRoutine.rtnGoal) }}
              </p>
              <p
                class="pr-2"
                v-if="selectedRoutine.rtnKneeHealthConsidered === 1"
              >
                {{
                  mapConsideration(
                    'rtnKneeHealthConsidered',
                    selectedRoutine.rtnKneeHealthConsidered
                  )
                }}
              </p>
              <p class="pr-2" v-if="selectedRoutine.rtnNoiseConsidered === 1">
                {{
                  mapConsideration(
                    'rtnNoiseConsidered',
                    selectedRoutine.rtnNoiseConsidered
                  )
                }}
              </p>
              <p class="pr-2" v-if="selectedRoutine.rtnLongSitter === 1">
                {{
                  mapConsideration(
                    'rtnLongSitter',
                    selectedRoutine.rtnLongSitter
                  )
                }}
              </p>
              <p
                class="pr-2"
                v-if="selectedRoutine.rtnNeckShoulderFocused === 1"
              >
                {{
                  mapConsideration(
                    'rtnNeckShoulderFocused',
                    selectedRoutine.rtnNeckShoulderFocused
                  )
                }}
              </p>
              <p
                class="pr-2"
                v-if="selectedRoutine.rtnBackDiskConsidered === 1"
              >
                {{
                  mapConsideration(
                    'rtnBackDiskConsidered',
                    selectedRoutine.rtnBackDiskConsidered
                  )
                }}
              </p>
            </div>
          </div>
          <v-btn
            v-if="showMember"
            size="x-large"
            color="primary"
            class="w-[350px]"
            @click="startRoutine"
          >
            프로그램 시작하기
          </v-btn>
        </div>
      </div>

      <!-- 선택된 루틴의 운동 정보를 렌더링합니다. -->
      <div
        v-if="selectedRoutine"
        class="rtn-excCard-wrap flex-wrap grid grid-cols-3 justify-items-center py-2 px-2 mx-7 mb-8 bg-gray-100 rounded-lg"
      >
        <BoExcCard
          v-for="exercise in selectedRoutine.exercises"
          :exercise="exercise"
          :key="exercise.excSeq"
        />
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

              <div class="text-xs ml-0.5">{{ data.rtnRewardPoint }} 포인트</div>
            </div>
            <div
              class="flex items-center border-1.5 border-gray-200 rounded-full text-sm font-semibold text-gray-700 px-2 py-1 mr-1"
            >
              <LevelSvg :size="16"></LevelSvg>
              <div class="text-xs ml-0.5">
                <p>{{ mapExperienceLevel(data.rtnExperienceLevel) }}</p>
              </div>
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
  height: 450px;
  overflow-y: auto;
}

.card-container {
  width: 1000px;
  height: 800px;
}
.rtn-detail-img {
  width: 330px;
  height: 300px;
}
.rtn-detail-col {
  margin-top: 10px;
}
.rtn-detail-col-1 {
  width: 140px;
}
.rtn-detail-col-2 {
  width: 420px;
}
.rtn-detail-name {
  width: 560px;
}
</style>

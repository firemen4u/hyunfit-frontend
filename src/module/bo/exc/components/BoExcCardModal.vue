<!-- BoExcCardModal.vue -->
<script setup>
import dateUtil from '/src/utils/date.js'
import ExctgUtils from '@/module/bo/exc/services/excUtils'
import { watch, ref } from 'vue'
import {
  HeartSvg,
  LevelSvg,
  ExcTypeSvg,
  TimerSvg,
} from '/src/module/@base/svg/'
const props = defineProps({
  show: Boolean,
  showDeleteBtn: Boolean,
  exercise: Object,
})

const isActive = ref(props.show)

watch(
  () => props.show,
  newVal => {
    isActive.value = newVal
  }
)

watch(isActive, newVal => {
  emit('update:show', newVal)
})

const emit = defineEmits([])
import { FILE_SERVER_HYUNFIT_URL } from '/src/config.js'
import { computed } from 'vue'
import CrossSvg from '@/module/@base/svg/CrossSvg.vue'

const videoSrc = computed(
  () =>
    `${FILE_SERVER_HYUNFIT_URL}/low_quality_preview_video_${props.exercise.excSeq}.mp4`
)

const formatDate = dateString => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(dateString).toLocaleDateString('ko-KR', options)
}
const excTypeMapping = {
  1: '상체',
  2: '하체',
  3: '전신',
  4: '유산소',
}

const mapExcType = type => {
  return excTypeMapping[type] || '알 수 없음'
}

const excDifficultyMapping = {
  1: '초급',
  2: '초중급',
  3: '중급',
  4: '중상급',
  5: '상급',
}

const mapDifficultyType = type => {
  return excDifficultyMapping[type] || '알 수 없음'
}

// 운동 삭제
const deleteExercise = () => {
  if (window.confirm('삭제하시겠습니까?')) {
    emit('deleteExercise', props.exercise.excSeq)
  }
}
</script>

<template>
  <v-dialog v-model="isActive" width="auto">
    <template v-slot:default="{ isActive }">
      <div class="bg-white rounded-lg px-5 py-5" @click.stop>
        <div class="exc-modal-excName text-3xl font-black" title="운동 이름">
          <p>{{ exercise.excName }}</p>
        </div>

        <div class="exc-modal-tag-wrap flex my-3">
          <div
            class="flex items-center border-1.5 border-gray-200 rounded-full text-sm font-semibold text-gray-700 px-2 py-1 mr-1"
          >
            <ExcTypeSvg :size="16"></ExcTypeSvg>
            <div class="text-xs ml-0.5">
              <p>{{ mapExcType(exercise.excType) }}</p>
            </div>
          </div>
          <div
            class="flex items-center border-1.5 border-gray-200 rounded-full text-sm font-semibold text-gray-700 px-2 py-1 mr-1"
          >
            <HeartSvg :size="16"></HeartSvg>
            <div class="text-xs ml-0.5">
              <p>
                {{ exercise.excCaloriesPerRep * exercise.excSetCount }}
                Kcal
              </p>
            </div>
          </div>
          <div
            class="flex items-center border-1.5 border-gray-200 rounded-full text-sm font-semibold text-gray-700 px-2 py-1 mr-1"
          >
            <LevelSvg :size="16"></LevelSvg>
            <div class="text-xs ml-0.5">
              <p>{{ mapDifficultyType(exercise.excDifficulty) }}</p>
            </div>
          </div>
          <div
            class="flex items-center border-1.5 border-gray-200 rounded-full text-sm font-semibold text-gray-700 px-2 py-1 mr-1"
          >
            <TimerSvg :size="16"></TimerSvg>
            <div class="text-xs ml-0.5">
              <p>
                {{ exercise.excTimePerSetInSec }}초 X
                {{ exercise.excSetCount }}회
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center rounded-md">
          <video controls loop muted autoplay class="exc-img rounded-md">
            <!-- class 추가 -->
            <source :src="videoSrc" />
            <!-- 비디오 소스 바인딩 -->
          </video>
        </div>
        <div class="modal-category-wrap mt-3">
          <div class="modal-sub-wrap my-2">
            <p class="modal-sub-wrap-title">운동 설명</p>
            <p class="modal-sub-wrap-content">{{ exercise.excContent }}</p>
          </div>
          <!-- <div class="modal-sub-wrap">
            <p>세트당 칼로리 소모량</p>
            <p>:</p>
            <p>{{ exercise.excCaloriesPerRep }}Kcal</p>
          </div>
          <div class="modal-sub-wrap">
            <p>총 세트수</p>
            <p>:</p>
            <p>{{ exercise.excSetCount }}회</p>
          </div>
          <div class="modal-sub-wrap flex">
            <p>세트 당 동작수</p>
            <p>:</p>
            <p>{{ exercise.excRepCountPerSet }}회</p>
          </div>
          <div class="modal-sub-wrap">
            <p>세트 당 시간</p>
            <p>:</p>
            <p>{{ exercise.excTimePerSetInSec }}sec</p>
          </div> -->
          <div class="modal-sub-wrap flex items-center">
            <p class="modal-sub-wrap-title">타겟 부위</p>
            <div class="modal-sub-wrap-content flex my-1">
              <div
                v-for="(target, index) in exercise.exerciseTargets"
                :key="index"
                class="flex text-sm font-semibold text-gray-500 px-2 py-1 mr-1"
              >
                <p class="ml-0.5">
                  #{{ ExctgUtils.mapExcAreaType(target.exctgArea) }} -
                  {{ target.exctgWeight * 100 }}
                </p>
              </div>
            </div>
          </div>
          <div class="modal-sub-wrap my-1">
            <p class="modal-sub-wrap-title">생성 일자</p>
            <p>{{ dateUtil.timestampToFullDate(exercise.excCreatedDate) }}</p>
          </div>
        </div>
        <div class="modal-sub-wrap justify-end">
          <div class="deleteBtn">
            <v-btn
              v-if="showDeleteBtn"
              @click="deleteExercise"
              color="primary"
              class="mr-0 rounded-lg"
            >
              삭제
            </v-btn>
          </div>
        </div>
      </div>
    </template>
  </v-dialog>
</template>

<style scoped>
.modal-sub-wrap {
  display: flex;
  margin-bottom: 0px;
}

.modal-sub-wrap-title {
  text-align: start;
  width: 80px;
  font-weight: bold;
}
.modal-sub-wrap-content {
  width: 500px;
  text-align: start;
}
.exc-img {
  width: 100%;
  height: 250px; /* 지정된 높이 */
  max-height: 300px;
  object-fit: contain;
  object-fit: cover;
  overflow: hidden;
}
</style>

<!-- BoExcCardModal.vue -->
<script setup>
import dateUtil from '/src/utils/date.js'
import ExctgUtils from '@/module/bo/exc/services/excUtils'
import { watch, ref } from 'vue'
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
      <div class="bg-white rounded-lg p-4" @click.stop>
        <div class="flex justify-end">
          <v-btn
            @click="isActive.value = false"
            :icon="CrossSvg"
            size="small"
            variant="text"
          />
        </div>
        <div class="flex items-center justify-center rounded-md">
          <video controls loop muted autoplay class="exc-img rounded-md">
            <!-- class 추가 -->
            <source :src="videoSrc" />
            <!-- 비디오 소스 바인딩 -->
          </video>
        </div>
        <div class="modal-category-wrap p-3">
          <div class="modal-sub-wrap">
            <p>운동 이름</p>
            <p>:</p>
            <p>{{ exercise.excName }}</p>
          </div>
          <div class="modal-sub-wrap">
            <p>운동 설명</p>
            <p>:</p>
            <p>{{ exercise.excContent }}</p>
          </div>
          <div class="modal-sub-wrap">
            <p>운동 부위</p>
            <p>:</p>
            <p>{{ mapExcType(exercise.excType) }}</p>
          </div>
          <div class="modal-sub-wrap">
            <p>운동 난이도</p>
            <p>:</p>
            <p>{{ mapDifficultyType(exercise.excDifficulty) }}</p>
          </div>
          <div class="modal-sub-wrap">
            <p>1회당 칼로리 소모량</p>
            <p>:</p>
            <p>{{ exercise.excCaloriesPerRep }}</p>
          </div>
          <div class="modal-sub-wrap">
            <p>총 세트수</p>
            <p>:</p>
            <p>{{ exercise.excSetCount }}</p>
          </div>
          <div class="modal-sub-wrap flex">
            <p>세트 당 동작수</p>
            <p>:</p>
            <p>{{ exercise.excRepCountPerSet }}</p>
          </div>
          <div class="modal-sub-wrap">
            <p>세트 당 시간</p>
            <p>:</p>
            <p>{{ exercise.excTimePerSetInSec }}</p>
          </div>
          <div class="modal-sub-wrap">
            <p>생성 일자</p>
            <p>:</p>
            <p>{{ dateUtil.timestampToFullDate(exercise.excCreatedDate) }}</p>
          </div>
          <div class="modal-sub-wrap">
            <p>타겟 부위</p>
            <p>:</p>
            <div>
              <div
                v-for="(target, index) in exercise.exerciseTargets"
                :key="index"
                class="flex flex-col"
              >
                <p>
                  {{ ExctgUtils.mapExcAreaType(target.exctgArea) }} 비중 -
                  {{ target.exctgWeight * 100 }}
                </p>
              </div>
            </div>
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
  margin-bottom: 5px;
}
.modal-sub-wrap button {
  background-color: rgb(163, 163, 163);
  padding: 4px;
  color: white;
}
.modal-sub-wrap :first-child {
  text-align: start;
  width: 150px;
}
.modal-sub-wrap :nth-child(2) {
  margin-right: 10px;
}
.modal-sub-wrap :nth-child(3) {
  width: 510px;
  text-align: start;
}

.exc-img {
  width: 70%; /* 혹은 원하는 값, 예: */
  /* max-width: 300px;  */
  height: 250px;
  /*max-height: 50%;  혹은 원하는 값, 예: */
  max-height: 300px;
  object-fit: contain; /* 비율 유지 */
  object-fit: cover; /* 이미지 비율을 유지하면서 넘치는 부분을 잘라냄 */
  overflow: hidden; /* 넘치는 부분을 숨김 */
}

.deleteBtn {
  width: 100px;
}
</style>

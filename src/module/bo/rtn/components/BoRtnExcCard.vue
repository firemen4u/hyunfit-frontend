<template>
  <div
    class="exc-card flex flex-col shadow-md rounded-lg hover:translate-y-[-10px] hover:bg-gray-100"
    @click="handleClick"
  >
    <div>
      <video controls loop muted autoplay class="exc-img rounded-md">
          <source :src="videoSrc" /> 
      </video>
    </div>
    <div class="exc-name">운동 이름 : {{ exercise.excName }}</div>
    <div class="exc-content">운동 설명 : {{ exercise.excContent }}</div>
    <div class="exc-content">
      운동 시간 :
      {{
        ((exercise.excSetCount * exercise.excTimePerSetInSec) / 60).toFixed(1)
      }}
    </div>
  </div>
  <div class="text-center mt-2">
    <v-btn
      class="register-btn"
      color="#de819c"
      size="small"
      @click="registerExercise"
    >
      등록하기
    </v-btn>
  </div>
</template>

<script setup>
const props = defineProps({
  exercise: Object, // 운동 정보를 props로 받습니다.
})

import { FILE_SERVER_HYUNFIT_URL } from '/src/config.js' 
import { computed } from 'vue'

const videoSrc = computed( 
  () =>
    `${FILE_SERVER_HYUNFIT_URL}/low_quality_preview_video_${props.exercise.excSeq}.mp4`
)

const emit = defineEmits([])

const handleClick = () => {
  emit('openModal', props.exercise)
}

const registerExercise = () => {
  emit('click:register', props.exercise)
}
</script>

<style scoped>
/* 스타일을 원하는 대로 수정하세요. */
.exc-card {
  width: 200px;
  padding: 20px;
  margin: 5px;
}
.exc-img {
  max-width: 100%;
}
.exc-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.exc-content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.register-btn {
  width: 100px;
  border: solid 1px;
  border-color: rgb(158, 157, 157);
  background-color: rgb(210, 210, 210);
}
</style>

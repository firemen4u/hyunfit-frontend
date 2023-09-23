<template>
  <div v-if="loading === true">
    <h1 class="loading">로딩중</h1>
  </div>
  <div class="ai-training-container flex">
    <AITrainingMyVideo
      v-if="currentItem?.myVideoWidth !== 'NONE'"
      :progressQueue="currentItem"
      @squatsCountUpdated="squatsCount = $event"
    ></AITrainingMyVideo>
    <AITrainingTeachingVideo
      v-if="currentItem?.teachingVideoWidth !== 'NONE'"
      :progressQueue="currentItem"
    ></AITrainingTeachingVideo>
    <AITrainingStatusContainer
      :progressQueue="currentItem"
      :squatsCount="squatsCount"
      @skip="handleSkip"
      :key="rerenderKey"
    >
    </AITrainingStatusContainer>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import {
  AITrainingStatusContainer,
  AITrainingMyVideo,
  AITrainingTeachingVideo,
} from '/src/module/ai-training/component'

const baseURL = 'https://api.hyunfit.life/routines/'
const rerenderKey = ref(0)
const progressQueue = ref([])

let loading = ref(true)
let squatsCount = ref(0)
let currentIndex = ref(0)

const currentItem = computed(() => {
  if (progressQueue.value && currentIndex.value < progressQueue.value.length) {
    return progressQueue.value[currentIndex.value]
  }
  return null
})


function init() {
  try {
    axios.get('https://api.hyunfit.life/routines/1').then(response => {
      console.log('"API 통신 성공" \n API 통신 값', response.data)
      // Intro
      progressQueue.value.push({
        myVideoWidth: 'FULL',
        teachingVideoWidth: 'NONE',
        infoContainerVisible: false,
        countContainerVisible: false,
        timerVisible: false,
        timerLimit: -1,
      })
      // WarmUp
      progressQueue.value.push({
        myVideoWidth: 'HALF',
        teachingVideoWidth: 'HALF',
        infoContainerVisible: false,
        countContainerVisible: false,
        timerVisible: true,
        timerLimit: 100,
      })
      for (const seq of response.data.exercises) {
        console.log(seq)
        // Guide
        progressQueue.value.push({
          myVideoWidth: 'NONE',
          teachingVideoWidth: 'FULL',
          infoContainerVisible: false,
          countContainerVisible: true,
          timerVisible: true,
          timerLimit: 10,
          previewUrl: `${baseURL}preview_video_${seq.excSeq}`,
        })
        // Exercise
        progressQueue.value.push({
          myVideoWidth: 'HALF',
          teachingVideoWidth: 'HALF',
          infoContainerVisible: false,
          countContainerVisible: true,
          timerVisible: true,
          timerLimit: seq.excTimePerSetInSec,
          responseData: seq,
          exerciseUrl: `${baseURL}exercise_video_${seq.excSeq}`,
        })
      }
      // Exit
      progressQueue.value.push({
        myVideoWidth: 'NONE',
        teachingVideoWidth: 'HALF',
        infoContainerVisible: false,
        countContainerVisible: true,
        timerVisible: true,
        timerLimit: -1,
      })
      setTimeout(() => {
        loading.value = false
      }, 5000)
    })
  } catch (error) {
    console.error('데이터를 가져오는 중 에러 발생 : ', error)
  }
}

function handleSkip() {
  rerenderKey.value += 1
  currentIndex.value++
  progressQueue[currentIndex.value]
}

onMounted(() => {
  init()
})

// 모델 넣기
</script>
<style scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
}
.ai-training-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: azure;
}
</style>

<template>
  <div class="ai-training-container flex">
    <AITrainingMyVideo
      v-if="currentItem?.myVideoWidth !== 'NONE'"
      :progressQueue="currentItem"
    ></AITrainingMyVideo>
    <AITrainingTeachingVideo
      v-if="currentItem?.teachingVideoWidth !== 'NONE'"
      :progressQueue="currentItem"
    ></AITrainingTeachingVideo>
    <AITrainingStatusContainer
      :progressQueue="currentItem"
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

// 1. 전역 변수
let loading = ref(true)
const baseURL = 'https://api.hyunfit.life/routines/'
const rerenderKey = ref(0)
const progressQueue = ref([])
let currentIndex = ref(0)
const remainingTime = ref(0)
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
      console.log('Queue 출력', progressQueue)

      loading.value = false
    })
  } catch (error) {
    console.error('데이터를 가져오는 중 에러 발생 : ', error)
  }
}

function handleSkip() {
  rerenderKey.value += 1
  currentIndex.value++
  progressQueue[currentIndex.value]
  console.log('현재 큐 인덱스 확인=', progressQueue[currentIndex.value])
  console.log('현재 큐 확인', progressQueue[currentIndex.value])
}

const startTimer = () => {
  const timerInterval = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value-- // 시간을 1초씩 감소
    } else {
      clearInterval(timerInterval) // 시간이 0이 되면 타이머 중지
    }
  }, 1000) // 1초마다 업데이트
}

onMounted(() => {
  init()
  startTimer() // 컴포넌트가 마운트되면 타이머 시작
})
</script>

<style scoped>
.ai-training-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: azure;
}
.info {
  color: transparent;
  font-size: 35px;
  font-weight: 900;
  text-align: center;
  background: linear-gradient(111deg, rgb(133, 0, 38) 8%, rgb(249, 76, 16) 93%);
  -webkit-background-clip: text; /* 텍스트에 그라데이션을 적용하기 위해 필요한 속성입니다. */
  background-clip: text;
}
.ai-training-info {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 15%;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50px;
}
</style>

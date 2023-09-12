<template>
  <div class="ai-training-container flex">
    <AITrainingMyVideo
      v-if="data.myVideoStatus.value !== 3"
      :myVideoStatus="data.myVideoStatus.value"
    ></AITrainingMyVideo>
    <AITrainingTeachingVideo
      v-if="data.teachingVideoStatus.value !== 3"
      :teachingVideoStatus="data.teachingVideoStatus.value"
    ></AITrainingTeachingVideo>
    <AITrainingStatusContainer
      v-if="data.trainingStatus.value == 1"
      :trainingStatus="data.trainingStatus.value"
    >
    </AITrainingStatusContainer>
    <AITrainingTimer
      v-if="data.timerStatus.value == 1"
      :timerStatus="data.timerStatus.value"
    ></AITrainingTimer>
    <AITrainingInfo
      v-if="data.info.value == 1"
      :trainingInfo="data.infoContent.value"
    ></AITrainingInfo>
    <AITrainingBottomBar
      v-if="data.bottomBarStatus.value == 1"
      :trainingProgressStatus="data.trainingProgressStatus.value"
      :limitTime="data.limitTime.value"
      @skip="handleSkip"
      :key="rerenderKey"
    ></AITrainingBottomBar>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import {
  AITrainingStatusContainer,
  AITrainingTimer,
  AITrainingMyVideo,
  AITrainingBottomBar,
  AITrainingTeachingVideo,
  AITrainingInfo,
} from '/src/module/ai-training/component'
const INTRO = 1
const WARMUP = 2
const GUIDE = 3
const EXCERCISE = 4
const EXIT = 5

const data = {
  trainingProgressStatus: ref(0),
  myVideoStatus: ref(0),
  teachingVideoStatus: ref(0),
  info: ref(0),
  trainingStatus: ref(0),
  timerStatus: ref(0),
  bottomBarStatus: ref(1),
  infoContent: ref(''),
  limitTime: ref(-1),
  routine: [],
}
const rerenderKey = ref(0)
onMounted(() => {
  updateStatus(1)
})

function handleSkip() {
  rerenderKey.value += 1
  updateStatus()
}

const statusMap = new Map([
  [
    'INTRO',
    {
      trainingProgressStatus: 1,
      myVideoStatus: 1,
      teachingVideoStatus: 3,
      info: 0,
      trainingStatus: 0,
      timerStatus: 1,
      infoContent: '',
      limitTime: -1,
      routine: [],
    },
  ],
  [
    'WARMUP',
    {
      trainingProgressStatus: 1,
      myVideoStatus: 1,
      teachingVideoStatus: 2,
      info: 0,
      trainingStatus: 0,
      timerStatus: 1,
      infoContent: '',
      limitTime: -1,
      routine: [],
    },
  ],
  [
    'GUIDE',
    {
      trainingProgressStatus: ref(0),
      myVideoStatus: ref(0),
      teachingVideoStatus: ref(0),
      info: ref(0),
      trainingStatus: ref(0),
      timerStatus: ref(0),
      bottomBarStatus: ref(1),
      infoContent: ref(''),
      limitTime: ref(-1),
      routine: [],
    },
  ],
  [
    'EXERCISE',
    {
      trainingProgressStatus: ref(0),
      myVideoStatus: ref(0),
      teachingVideoStatus: ref(0),
      info: ref(0),
      trainingStatus: ref(0),
      timerStatus: ref(0),
      bottomBarStatus: ref(1),
      infoContent: ref(''),
      limitTime: ref(-1),
      routine: [],
    },
  ],
  [
    'EXIT',
    {
      trainingProgressStatus: ref(0),
      myVideoStatus: ref(0),
      teachingVideoStatus: ref(0),
      info: ref(0),
      trainingStatus: ref(0),
      timerStatus: ref(0),
      bottomBarStatus: ref(1),
      infoContent: ref(''),
      limitTime: ref(-1),
      routine: [],
    },
  ],
])

function updateStatus() {
  data.trainingProgressStatus.value += 1
  let newStatus = data.trainingProgressStatus.value

  data.value = statusMap.get(newStatus)
  switch (newStatus) {
    case INTRO:
      const introData = statusMap.get('INTRO')
      data.trainingProgressStatus.value = introData.trainingProgressStatus
      data.myVideoStatus.value = introData.myVideoStatus
      data.teachingVideoStatus.value = introData.teachingVideoStatus
      data.info.value = introData.info
      data.trainingStatus.value = introData.trainingStatus
      data.timerStatus.value = introData.timerStatus
      data.infoContent.value = introData.infoContent
      data.limitTime.value = introData.limitTime
      data.routine = introData.routine
      console.log('data', data)
      console.log('INTRO data', statusMap.get('INTRO'))
      break
    case WARMUP:
      data.value = newStatus.get('WARMUP')
      break
    // 잠깐 안내 창만 키우고 -> 있다가 함
    case GUIDE:
      data.info.value = 1
      data.infoContent.value = '운동 이름'
      data.myVideoStatus.value = 3
      data.teachingVideoStatus.value = 1
      data.trainingStatus.value = 1
      data.timerStatus.value = 1
      data.limitTime.value = 10 //임시
      break
    // reps 끝날때 10초 쉬는 시간 가지기 -> 영상 정지
    case EXCERCISE:
      data.myVideoStatus.value = 2
      data.teachingVideoStatus.value = 2
      data.trainingStatus.value = data.timerStatus.value = 1
      data.limitTime.value = 10 //임시
      break
    case EXIT:
      data.myVideoStatus.value = 3
      data.teachingVideoStatus.value = 3
      data.trainingStatus.value = 3
      data.timerStatus.value = 0
      data.limitTime.value = 2 //임시
      break
  }
}
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

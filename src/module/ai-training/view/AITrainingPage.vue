<template>
  <div class="ai-training-container flex">
    <AITrainingMyVideo
      v-if="data.myVideoWidth.value !== 'NONE'"
      :myVideoStatus="data.myVideoWidth.value"
    ></AITrainingMyVideo>
    <AITrainingTeachingVideo
      v-if="data.teachingVideoWidth.value !== 'NONE'"
      :teachingVideoStatus="data.teachingVideoWidth.value"
    ></AITrainingTeachingVideo>
    <AITrainingStatusContainer
      v-if="data.countContainerVisible.value === 'ON'"
      :trainingStatus="data.countContainerVisible.value"
    >
    </AITrainingStatusContainer>
    <AITrainingTimer
      v-if="data.timerVisible.value === 'ON'"
      :timerVisible="data.timerVisible.value"
    ></AITrainingTimer>
    <AITrainingInfo
      v-if="data.infoContainerVisible.value === 'ON'"
      :trainingInfo="data.infoContent.value"
    ></AITrainingInfo>
    <AITrainingBottomBar
      :trainingProgressStatus="data.trainingProgressStatus.value"
      :timerLimit="data.timerLimit.value"
      @skip="handleSkip"
      :key="rerenderKey"
    ></AITrainingBottomBar>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import {
  AITrainingStatusContainer,
  AITrainingTimer,
  AITrainingMyVideo,
  AITrainingBottomBar,
  AITrainingTeachingVideo,
  AITrainingInfo,
} from '/src/module/ai-training/component'

axios.get('서버의 AIP 엔드포인트 URL')
  .then(response => {
    
  })

const INTRO = 1
const WARMUP = 2
const GUIDE = 3
const EXCERCISE = 4
const EXIT = 5

const data = {
  trainingProgressStatus: ref(0),
  myVideoWidth: ref(''), // FULL, HALF, NONE
  teachingVideoWidth: ref(''), // FULL, HALF, NONE
  infoContainerVisible: ref(''), // ON, OFF
  countContainerVisible: ref(''), // ON, OFF
  timerVisible: ref(''), // ON, OFF
  infoContent: ref(''),
  timerLimit: ref(-1),
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
      myVideoWidth: 'FULL',
      teachingVideoWidth: 'NONE',
      infoContainerVisible: 'OFF',
      countContainerVisible: 'OFF',
      timerVisible: 'OFF',
      infoContent: '',
      timerLimit: -1,
      routine: [],
    },
  ],
  [
    'WARMUP',
    {
      trainingProgressStatus: 2,
      myVideoWidth: 'HALF',
      teachingVideoWidth: 'HALF',
      infoContainerVisible: 'OFF',
      countContainerVisible: 'OFF',
      timerVisible: 'ON',
      infoContent: '',
      timerLimit: 100,
      routine: [],
    },
  ],
  [
    'GUIDE',
    {
      trainingProgressStatus: 3,
      myVideoWidth: 'NONE',
      teachingVideoWidth: 'HALF',
      infoContainerVisible: 'OFF',
      countContainerVisible: 'ON',
      timerVisible: 'ON',
      infoContent: '',
      timerLimit: 10,
      routine: [],
    },
  ],
  [
    'EXERCISE',
    {
      trainingProgressStatus: 4,
      myVideoWidth: 'NONE',
      teachingVideoWidth: 'HALF',
      infoContainerVisible: 'OFF',
      countContainerVisible: 'ON',
      timerVisible: 'ON',
      infoContent: '',
      timerLimit: 100,
      routine: [],
    },
  ],
  [
    'EXIT',
    {
      trainingProgressStatus: 5,
      myVideoWidth: 'NONE',
      teachingVideoWidth: 'HALF',
      infoContainerVisible: 'OFF',
      countContainerVisible: 'ON',
      timerVisible: 'ON',
      infoContent: '',
      timerLimit: -1,
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
      var introData = statusMap.get('INTRO')
      data.trainingProgressStatus.value = introData.trainingProgressStatus
      data.myVideoWidth.value = introData.myVideoWidth
      data.teachingVideoWidth.value = introData.teachingVideoWidth
      data.infoContainerVisible.value = introData.infoContainerVisible
      data.countContainerVisible.value = introData.countContainerVisible
      data.timerVisible.value = introData.timerVisible
      data.infoContent.value = introData.infoContent
      data.timerLimit.value = introData.timerLimit
      data.routine = introData.routine
      break
    case WARMUP:
      var warmUpData = statusMap.get('WARMUP')
      data.trainingProgressStatus.value = warmUpData.trainingProgressStatus
      data.myVideoWidth.value = warmUpData.myVideoWidth
      data.teachingVideoWidth.value = warmUpData.teachingVideoWidth
      data.infoContainerVisible.value = warmUpData.infoContainerVisible
      data.countContainerVisible.value = warmUpData.countContainerVisible
      data.timerVisible.value = warmUpData.timerVisible
      data.infoContent.value = warmUpData.infoContent
      data.timerLimit.value = warmUpData.timerLimit
      data.routine = warmUpData.routine
      break
    // 잠깐 안내 창만 키우고 -> 있다가 함
    case GUIDE:
      data.info.value = 1
      data.infoContent.value = '운동 이름'
      data.myVideoWidth.value = 3
      data.teachingVideoWidth.value = 1
      data.countContainerVisible.value = 1
      data.timerVisible.value = 1
      data.timerLimit.value = 10 //임시
      break
    // reps 끝날때 10초 쉬는 시간 가지기 -> 영상 정지
    case EXCERCISE:
      data.myVideoWidth.value = 2
      data.teachingVideoWidth.value = 2
      data.countContainerVisible.value = data.timerVisible.value = 1
      data.timerLimit.value = 10 //임시
      break
    case EXIT:
      data.myVideoWidth.value = 3
      data.teachingVideoWidth.value = 3
      data.countContainerVisible.value = 3
      data.timerVisible.value = 0
      data.timerLimit.value = 2 //임시
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

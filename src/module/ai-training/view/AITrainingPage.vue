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

// 1. 전역 변수
let loading = ref(true)
let newStatus = ref(1)
let srcList = [ref('')]

const rerenderKey = ref(0)
const INTRO = 1
const WARMUP = 2
const GUIDE = 3
const EXCERCISE = 4
const EXIT = 5

// MAP 형태의 고정 상태 값
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
      teachingVideoWidth: 'FULL',
      infoContainerVisible: 'OFF',
      countContainerVisible: 'ON',
      timerVisible: 'ON',
      infoContent: '',
      timerLimit: 10,
      routine: [],
    },
  ],
  [
    'EXCERCISE',
    {
      trainingProgressStatus: 4,
      myVideoWidth: 'HALF',
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
// 화면을 조절하는 데이터
const data = {
  trainingProgressStatus: ref(0),
  myVideoWidth: ref('FULL'), // FULL, HALF, NONE
  teachingVideoWidth: ref('NONE'), // FULL, HALF, NONE
  infoContainerVisible: ref(''), // ON, OFF
  countContainerVisible: ref(''), // ON, OFF
  timerVisible: ref(''), // ON, OFF
  infoContent: ref(''),
  timerLimit: ref(-1),
  exercisesData: [ref()],
  exerciseIndex: ref(0),
  exerciesURL: ref('')
}

function init() {
  try {
    axios.get('http://localhost:8080/routines/1').then(response => {
      console.log('API 통신 성공')
      console.log('API 통신 값', response.data)
      data.exercisesData.value = response.data
      loading.value = false
    })
  } catch (error) {
    console.error('데이터를 가져오는 중 에러 발생 : ', error)
  }
}

function handleSkip() {
  rerenderKey.value += 1
  console.log('클릭했을 때', data.exercisesData.value)

  for (const ex of data.exercisesData.value.exercises) {
    console.log('검사 중', ex)
  }
  updateStatus()
}

onMounted(() => {
  init()
})

function isLastExercise() {
  let currentIndex = data.exerciseIndex.value++
  console.log('isLastExercise ', currentIndex)
  let size = data.exercisesData.value.exercises.length
  console.log('isLastExercise', size)
  if (currentIndex === size - 1) return true
}

function updateStatus() {
  console.log('update() 함수 안에서', newStatus.value)
  switch (newStatus.value) {
    case INTRO:
      var introData = statusMap.get('INTRO')
      data.myVideoWidth.value = introData.myVideoWidth
      data.teachingVideoWidth.value = introData.teachingVideoWidth
      data.infoContainerVisible.value = introData.infoContainerVisible
      data.countContainerVisible.value = introData.countContainerVisible
      data.timerVisible.value = introData.timerVisible
      data.infoContent.value = introData.infoContent
      data.timerLimit.value = introData.timerLimit
      data.routine = introData.routine
      console.log('INTRO CASE 호출')
      newStatus.value = WARMUP
      break
    case WARMUP:
      var warmUpData = statusMap.get('WARMUP')
      data.myVideoWidth.value = warmUpData.myVideoWidth
      data.teachingVideoWidth.value = warmUpData.teachingVideoWidth
      data.infoContainerVisible.value = warmUpData.infoContainerVisible
      data.countContainerVisible.value = warmUpData.countContainerVisible
      data.timerVisible.value = warmUpData.timerVisible
      data.infoContent.value = warmUpData.infoContent
      data.timerLimit.value = warmUpData.timerLimit
      // 워밍업 영상은 그냥 고정박아두기
      data.routine = warmUpData.routine
      console.log('WARMUP CASE 호출')
      newStatus.value = GUIDE
      break
    case GUIDE:
      // 가이드부터 운동 데이터 넣기
      var guideData = statusMap.get('GUIDE')
      console.log('GUIDE', guideData)
      data.infoContent.value = '운동 이름'
      data.myVideoWidth.value = guideData.myVideoWidth
      data.teachingVideoWidth.value = guideData.teachingVideoWidth
      data.countContainerVisible.value = guideData.countContainerVisible
      data.timerVisible.value = guideData.timerVisible
      data.infoContent.value = guideData.infoContent
      data.timerLimit.value = guideData.timerLimit
      data.routine =
        data.exercisesData.value.exercises[data.exerciseIndex.value].excUrl
      console.log(
        'GUIDE CASE URL',
        data.exercisesData.value.exercises[data.exerciseIndex.value].excUrl
      )
      newStatus.value = EXCERCISE
      console.log('GUIDE CASE 호출')
      break
    case EXCERCISE:
      // 운동 데이터 넣기
      var exerciseCaseData = statusMap.get('EXCERCISE')
      data.myVideoWidth.value = exerciseCaseData.myVideoWidth
      data.teachingVideoWidth.value = exerciseCaseData.teachingVideoWidth
      data.countContainerVisible.value = exerciseCaseData.countContainerVisible
      data.timerLimit.value = exerciseCaseData.timerLimit
      data.timerVisible.value = exerciseCaseData.timerVisible
      data.infoContent.value = exerciseCaseData.infoContent
      data.routine =
        data.exercisesData.value.exercises[data.exerciseIndex.value].excUrl
      if (isLastExercise()) {
        newStatus.value = EXIT
      } else {
        newStatus.value = GUIDE
      }
      console.log('EXCERCISE CASE 호출')
      break
    case EXIT:
      var exitData = statusMap.get('EXIT')
      data.myVideoWidth.value = exitData.myVideoWidth
      data.teachingVideoWidth.value = exitData.teachingVideoWidth
      data.countContainerVisible.value = exitData.countContainerVisible
      data.timerVisible.value = exitData.timerVisible
      data.timerLimit.value = -1
      // 새로운 버튼 만들어야 함 -> 그냥 새로운 컴포넌트로 보내기로 함(전체 페이지가 있는)
      console.log('EXIT CASE 호출')
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

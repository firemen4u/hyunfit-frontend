<template>
<<<<<<< HEAD:src/module/ai-training/view/AITrainingPage.vue
  <div class="fixed z-[1000] top-0 left-0 bg-[#FFFFFFBB]">
    <v-btn @click="timer.start(20)">Start</v-btn>
    <v-btn @click="timer.stop()">Stop</v-btn>
    <v-btn @click="timer.reset()">reset</v-btn>
    <v-btn @click="toggleTime()">Toggle Break</v-btn>
    <div class="md-2">현재 윈도우 옵션: {{ windowSize }}</div>
    <div class="md-2">현재 visible 옵션: {{ visibility }}</div>
    <div class="md-2">
      현재 Set: {{ setCount }} --- setFinished : {{ setFinished }}
    </div>
    <div class="md-2">
      현재 운동: {{ currentExercise?.type }} --- 현재 index: {{ currentIndex }}
    </div>

    <div>TimeDelta: {{ timeDelta }} --- 현재 시간: {{ timeLeft }}</div>
    <div>Break {{ breakTime }} || loading {{ loading }}</div>
    <br />
    video {{ videoList[currentIndex - 1] }}
=======
  <div v-if="loading === true">
    <h1 class="loading">로딩중</h1>
>>>>>>> f27daa916c2c07b42ef03587104a6b3e10a200ad:src/module/ai-training/view/AiTrainingPage.vue
  </div>

  <div class="ai-training-container flex">
    <!--    <AITrainingInfo exercise-name="사이드 레터럴 레이즈" />-->
    <AITrainingMyVideo
      v-show="visibility.my"
      :loading="loading"
      :windowSize="windowSize.my"
      :exercise="currentExercise"
    ></AITrainingMyVideo>

    <AITrainingBreak v-if="breakTime" />

    <AITrainingTeachingVideo
      v-if="visibility.teaching"
      :loading="loading"
      :windowSize="windowSize.teaching"
      :exercise="currentExercise"
      :break-time="breakTime"
      :pause-time="pauseTime"
      @event:ready="onTeachingVideoReady()"
      :video-url="videoList[currentIndex - 1]"
    />

    <AITrainingStatusContainer
      v-if="visibility.counter"
      :exercise="currentExercise"
      :exerciseCount="exerciseCount"
      :key="rerenderKey"
    />

    <AITrainingTimer v-show="visibility.timer" :timer-limit="timeLeft" />

    <AiTrainingSkipButton v-show="visibility.skip" @click="toNextExercise()" />

    <div
      class="fixed top-0 left-0 w-full h-full bg-gray-200 text-4xl"
      v-if="loading && currentExercise?.type !== 'INTRO'"
    >
      <div
        v-if="currentExercise?.type !== 'EXERCISE'"
        class="fixed top-1/2 left-1/2"
      >
        {{ currentExercise?.name }}
      </div>
      <div
        v-if="currentExercise?.type === 'EXERCISE' && !breakTime"
        class="fixed top-1/2 left-1/2"
      >
        운동 시작
        {{ currentExercise.videoUrl }}
      </div>
    </div>

    <div
      class="fixed top-0 left-0 w-full h-full bg-gray-200 bg-opacity-20 text-4xl"
      v-if="breakTime && !loading"
    >
      <div class="fixed top-1/2 left-1/2">쉬는시간</div>
    </div>

    <div
      class="fixed top-0 left-0 w-full h-full bg-gray-200 bg-opacity-20 text-4xl"
      v-if="pauseTime"
    >
      <div class="fixed top-1/2 left-1/2">일시정지</div>
    </div>

    <div class="absolute bottom-0 flex justify-center w-full">
      <div class="empty-container item bg-transparent"></div>
      <div class="status-navigation-container item">
        <button class="buttons">
          <img src="/src/assets/images/volume-high.png" />
        </button>
        <button class="buttons">
          <img src="/src/assets/images/volume-high.png" />
        </button>
        <button class="buttons">
          <img src="/src/assets/images/volume-high.png" />
        </button>
        <button class="buttons">
          <img src="/src/assets/images/volume-high.png" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import axios from 'axios'
import {
  AITrainingStatusContainer,
  AITrainingMyVideo,
  AITrainingTeachingVideo,
} from '/src/module/ai-training/component'
import AITrainingTimer from '@/module/ai-training/component/AITrainingTimer.vue'
import AiTrainingSkipButton from '@/module/ai-training/component/AiTrainingSkipButton.vue'
import AITrainingBreak from '@/module/ai-training/component/AITrainingBreak.vue'

const baseURL = 'https://api.hyunfit.life/routines/'
const rerenderKey = ref(0)
<<<<<<< HEAD:src/module/ai-training/view/AITrainingPage.vue
const exerciseQueue = ref(null)

let loading = ref(true)
let breakTime = ref(false)
let pauseTime = ref(false)

let exerciseCount = ref(0)
let setCount = ref(1)
let currentIndex = ref(0)

let setFinished = computed(
  () => setCount.value >= currentExercise.value?.setCount
)

let videoList = [
  'https://alycecloud-website.s3.ap-northeast-2.amazonaws.com/video/warming_up.mp4',
  'https://exercise-resource.s3.ap-northeast-2.amazonaws.com/previewVideo/355__1622594830959__%EC%A0%9C%EA%B8%B0%EC%B0%A8%EA%B8%B0.mp4',
  'https://exercise-resource.s3.ap-northeast-2.amazonaws.com/exerciseVideo/182__1621835352844__%ED%86%A0%ED%84%B0%EC%B9%98.mp4',
  'https://exercise-resource.s3.ap-northeast-2.amazonaws.com/previewVideo/298__1621838332275__%EC%82%AC%EC%9D%B4%EB%93%9C%EB%B0%B4%EB%93%9C.mp4',
  'https://exercise-resource.s3.ap-northeast-2.amazonaws.com/exerciseVideo/283__1621837823221__%ED%95%B4%EB%A8%B8%EC%BB%AC.mp4',
]

const windowSize = reactive({
  my: ref('w-full'),
  teaching: ref(''),
  counter: ref(''),
})

const visibility = reactive({
  my: ref(true),
  teaching: ref(false),
  counter: ref(false),
  timer: ref(false),
  exit: ref(false),
  skip: ref(true),
})

let interval

let timeDelta = 0
let timeout = 200

const timeLeft = ref(999)

const timer = {
  start: t => {
    timeLeft.value = t
    timeDelta = 0.2
  },
  stop: () => {
    timeDelta = 0
  },
  resume: () => {
    timeDelta = 0.2
  },
  reset: () => {
    timeLeft.value = 0
  },
}

const currentExercise = computed(() => {
  if (exerciseQueue.value && currentIndex.value < exerciseQueue.value.length) {
    return exerciseQueue.value[currentIndex.value]
=======
const progressQueue = ref([])

let loading = ref(true)
let squatsCount = ref(0)
let currentIndex = ref(0)

const currentItem = computed(() => {
  if (progressQueue.value && currentIndex.value < progressQueue.value.length) {
    return progressQueue.value[currentIndex.value]
>>>>>>> f27daa916c2c07b42ef03587104a6b3e10a200ad:src/module/ai-training/view/AiTrainingPage.vue
  }
  return null
})

<<<<<<< HEAD:src/module/ai-training/view/AITrainingPage.vue
function toggleTime() {
  if (timeDelta === 0) {
    timer.resume()
    pauseTime.value = false
  } else {
    timer.stop()
    pauseTime.value = true
=======

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
>>>>>>> f27daa916c2c07b42ef03587104a6b3e10a200ad:src/module/ai-training/view/AiTrainingPage.vue
  }
}

function setTimer() {
  interval = setInterval(() => {
    timeLeft.value -= timeDelta
    if (timeLeft.value <= 0 && timeDelta > 0) {
      timer.stop()
      timeLeft.value = 0
      toNextExercise()
    }
  }, timeout)
}

onMounted(() => {
  init()
})

async function init() {
  loading.value = true
  await loadData()
  setTimer()
  timer.stop()
  updateWindowUi()
}

async function toNextExercise() {
  if (!currentExercise.value) return

  if (currentExercise.value.type === 'EXERCISE' && !setFinished.value) {
    if (breakTime.value) {
      setCount.value += 1
      timer.start(currentExercise.value.timerLimit - 0.01)
      breakTime.value = false
    } else {
      // 운동 데이터 전송
      timer.start(10 - 0.01)
      breakTime.value = true
      sendExerciseData()
      // Break 윈도우 보여주기,
    }
    return
  }

  setCount.value = 1

  currentIndex.value++

  updateWindowUi()

  loading.value = true
  timer.stop()
  // 운동데이터 전송하기,
  // 운동 인덱스 다음으로 이동
}
function onTeachingVideoReady() {
  loading.value = false
  timer.start(currentExercise.value.timerLimit - 0.01)
}

function sendExerciseData() {
  //운동데이터 전송
}

function updateWindowUi() {
  switch (currentExercise.value?.type) {
    case 'INTRO':
      windowSize.my = 'w-full'
      visibility.my = true
      visibility.teaching = false
      visibility.counter = false
      visibility.timer = false
      break
    case 'WARMUP':
      windowSize.my = 'w-1/2'
      windowSize.teaching = 'w-1/2'

      visibility.my = true
      visibility.teaching = true
      visibility.counter = false
      visibility.timer = true
      break
    case 'GUIDE':
      windowSize.teaching = 'w-full'
      visibility.teaching = true
      visibility.my = false
      visibility.counter = false
      visibility.timer = true
      break
    case 'EXERCISE':
      windowSize.my = 'w-1/2'
      windowSize.teaching = 'w-1/2'
      visibility.my = true
      visibility.teaching = true
      visibility.counter = true
      visibility.timer = true
      break
    case 'EXIT':
      visibility.my = false
      visibility.teaching = false
      visibility.counter = false
      visibility.timer = false
      visibility.exit = true
  }
}

function createExerciseQueueItem(exercise, type) {
  const item = {
    type: type,
    name: exercise.excName,
    excSeq: exercise.excSeq,
    calorie: exercise.excCaloriesPerRep,
    // setCount: exercise.excSetCount,
    setCount: 2,
    exerciseCount: exercise.excRepCountPerSet,
  }
  if (type === 'GUIDE') {
    item['timerLimit'] = 10
    item['videoUrl'] = `${baseURL}preview_video_${exercise.excSeq}`
  } else {
    // item['timerLimit'] = exercise.excTimePerSetInSec
    item['timerLimit'] = 10
    item['videoUrl'] = `${baseURL}preview_video_${exercise.excSeq}`
  }

  return item
}

async function loadData() {
  try {
    await axios.get('https://api.hyunfit.life/routines/1').then(response => {
      const temp = [
        {
          type: 'INTRO',
          timerLimit: 999,
        },
        {
          type: 'WARMUP',
          name: '워밍업',
          timerLimit: 100,
        },
      ]

      for (const exercise of response.data.exercises) {
        // Guide
        temp.push(createExerciseQueueItem(exercise, 'GUIDE'))
        // Exercise
        temp.push(createExerciseQueueItem(exercise, 'EXERCISE'))
      }
      // Exit
      temp.push({
        type: 'EXIT',
        timerLimit: -1,
      })

      exerciseQueue.value = temp
    })
  } catch (error) {
    console.error('데이터를 가져오는 중 에러 발생 : ', error)
    alert('운동데이터 로딩 실패 ', error)
  }
}

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

<template>
  <!--  <div class="fixed z-[1000] top-0 left-0 bg-[#FFFFFFBB]">-->
  <!--    <v-btn @click="timer.start(20)">Start</v-btn>-->
  <!--    <v-btn @click="timer.stop()">Stop</v-btn>-->
  <!--    <v-btn @click="timer.reset()">reset</v-btn>-->
  <!--    <v-btn @click="updateCount()">Update Count</v-btn>-->
  <!--    <div class="md-2">현재 윈도우 옵션: {{ windowSize }}</div>-->
  <!--    <div class="md-2">현재 visible 옵션: {{ visibility }}</div>-->
  <!--    <div class="md-2">-->
  <!--      현재 Set: {{ setCount }} -&#45;&#45; setFinished : {{ setFinished }}-->
  <!--    </div>-->
  <!--    <div class="md-2">-->
  <!--      현재 운동: {{ currentExercise?.type }} -&#45;&#45; 현재 index: {{ currentIndex }}-->
  <!--    </div>-->

  <!--    <div>TimeDelta: {{ timeDelta }} -&#45;&#45; 현재 시간: {{ timeLeft }}</div>-->
  <!--    <div>Break {{ breakTime }} || loading {{ loading }}</div>-->
  <!--    <div>exercise Count {{ setScoreCount }}</div>-->
  <!--    <div>pause Time {{ pauseTime }}</div>-->

  <!--    <br/>-->
  <!--    video {{ videoList[currentIndex - 1] }}-->
  <!--  </div>-->
  <div class="ai-training-container flex">
    <AITrainingMyVideo
      v-show="visibility.my"
      :loading="loading"
      :windowSize="windowSize.my"
      :exercise="currentExercise"
      :break-time="breakTime"
      :pause-time="pauseTime"
      @prediction="score => updateCount(score)"
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
    />
    <AITrainingStatusContainer
      v-if="visibility.counter"
      :exercise="currentExercise"
      :setScoreCount="setScoreCount"
      :setCount="setCount"
      :key="rerenderKey"
    />
    <AITrainingTimer v-show="visibility.timer" :timer-limit="timeLeft" />
    <AiTrainingSkipButton v-show="visibility.skip" @click="toNextExercise()" />

    <div
      class="info-container fixed top-0 left-0 w-full h-full bg-gray-200"
      v-if="loading && currentExercise?.type !== 'INTRO'"
    >
      <a-i-training-info
        v-if="currentExercise?.type !== 'EXERCISE'"
        :exerciseType="currentExercise?.type"
        :exerciseName="currentExercise?.name"
      ></a-i-training-info>
      <a-i-training-info
        v-if="currentExercise?.type === 'EXERCISE' && !breakTime"
        :exerciseType="currentExercise?.type"
        :exerciseName="currentExercise?.name"
        :breakTime="breakTime"
      ></a-i-training-info>
    </div>
    <a-i-training-info
      v-if="
        notification !== '' &&
        currentExercise?.type === 'EXERCISE' &&
        !breakTime
      "
      :exercise-name="notification"
    ></a-i-training-info>
    <a-i-training-info
      v-if="breakTime && !loading"
      :breakTime="breakTime"
      :loading="loading"
    >
    </a-i-training-info>
    <a-i-training-info v-if="pauseTime" :pauseTime="pauseTime">
    </a-i-training-info>
    <a-i-training-bottom-bar
      @event:pause="toggleTime()"
    ></a-i-training-bottom-bar>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import ApiClient from '@/services/api'
import {
  AITrainingMyVideo,
  AITrainingStatusContainer,
  AITrainingTeachingVideo,
} from '/src/module/ai-training/component'
import AITrainingTimer from '@/module/ai-training/component/AITrainingTimer.vue'
import AiTrainingSkipButton from '@/module/ai-training/component/AiTrainingSkipButton.vue'
import AITrainingBreak from '@/module/ai-training/component/AITrainingBreak.vue'
import AITrainingInfo from '@/module/ai-training/component/AITrainingInfo.vue'
import AITrainingBottomBar from '@/module/ai-training/component/AITrainingBottomBar.vue'
import { FILE_SERVER_BASE_URL } from '@/config'

const memberData = ref(null)
const rerenderKey = ref(0)
const exerciseQueue = ref(null)

let loading = ref(true)
let breakTime = ref(false)
let pauseTime = ref(false)
let setCount = ref(1)
let currentIndex = ref(0)
let startExerciseTime = ref(0)
let endExerciseTime = ref(0)
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
  }
  return null
})
const scores = reactive({
  excellent: ref(0),
  good: ref(0),
  bad: ref(0),
})
const setScoreCount = ref(0)
const notification = ref('')
const totalScoreCount = ref(0)

function updateCount(scoreType) {
  if (setScoreCount.value < currentExercise.value.exerciseCount) {
    console.log('scoreType', scoreType)
    if (scoreType === 'excellent') {
      scores.excellent += 1
      setScoreCount.value += 1
      notification.value = 'excellent!'
    } else if (scoreType === 'good') {
      scores.good += 1
      setScoreCount.value += 1
      notification.value = 'good'
    } else if (scoreType === 'bad') {
      scores.bad += 1
      setScoreCount.value += 1
      notification.value = 'bad'
    }
    console.log('notification', notification.value)
    totalScoreCount.value = scores.excellent + scores.good + scores.bad
    setTimeout(() => {
      notification.value = ''
    }, 1000)
  }
}

function toggleTime() {
  if (timeDelta === 0) {
    console.log('쉬는 시간')
    timer.resume()
    pauseTime.value = false
  } else {
    console.log('쉬는 시간 22')
    timer.stop()
    pauseTime.value = true
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
  await loadMemberData()
  await loadData()
  setTimer()
  timer.stop()
  updateWindowUi()
}

function toNextExercise() {
  if (!currentExercise.value) return
  console.log('currentExercise', currentExercise.value)

  if (currentExercise.value.type === 'GUIDE') {
    startExerciseTime.value = Date.now()
    console.log('startExerciseTime : ', startExerciseTime.value)
  }

  if (currentExercise.value.type === 'EXERCISE' && !setFinished.value) {
    if (breakTime.value) {
      setCount.value += 1
      console.log('setCount', setCount.value)
      timer.start(currentExercise.value.timerLimit - 0.01)
      breakTime.value = false
    } else {
      console.log('쉬는 시간 체크', setCount.value)
      setScoreCount.value = 0
      timer.start(10 - 0.01)
      breakTime.value = true
    }
    return
  } else {
    if (setCount.value >= 3) {
      endExerciseTime.value = Date.now()
      console.log('endExerciseTime : ', endExerciseTime.value)
      sendExerciseData()
    }
  }
  setCount.value = 1
  currentIndex.value++
  updateWindowUi()
  loading.value = true
  timer.stop()
}

function onTeachingVideoReady() {
  loading.value = false
  timer.start(currentExercise.value.timerLimit - 0.01)
}

async function sendExerciseData() {
  const data = {
    excSeq: currentExercise.value.excSeq,
    mbrSeq: memberData.value.mbrSeq,
    exchStartTime: startExerciseTime.value,
    exchEndTime: endExerciseTime.value,
    exchExcelentCnt: scores.excellent,
    exchGoodCnt: scores.good,
    exchBadCnt: scores.bad,
    exchTotalCalories: totalScoreCount.value * currentExercise.value.calorie,
    // exchTotalCalories: 10
  }
  try {
    if (data.exchTotalCalories !== 0) {
      await ApiClient.post(`/exercise-history`, data)
      console.log('completed history', data)
      console.log('exchTotalCalories', currentExercise.value.calorie)
      totalScoreCount.value = 0
      setScoreCount.value = 0

      scores.good = 0
      scores.excellent = 0
      scores.bad = 0
      console.log('totalScoreCount 초기화', totalScoreCount.value)
    } else {
      console.log('칼로리가 0이라 데이터를 보내지 않아요')
    }
  } catch (error) {
    console.log('Exercise History API 통신 에러!', error)
    alert('Exercise History API 통신 에러!')
  }
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
    setCount: 3,
    exerciseCount: exercise.excRepCountPerSet,
    // exerciseCount: 4,
  }
  if (type === 'GUIDE') {
    item['timerLimit'] = 10
    item[
      'videoUrl'
    ] = `${FILE_SERVER_BASE_URL}/api/hyunfit/file/preview_video_${exercise.excSeq}.mp4`
  } else {
    item['timerLimit'] = exercise.excTimePerSetInSec
    item[
      'videoUrl'
    ] = `${FILE_SERVER_BASE_URL}/api/hyunfit/file/exercise_video_${exercise.excSeq}.mp4`
  }
  return item
}

async function loadMemberData() {
  memberData.value = await ApiClient.get('/members/me')
  if (memberData.value === null) {
    console.log('유저 데이터 로드 실패')
    alert('유저 데이터 로드 실패')
  }
}

async function loadData() {
  try {
    await axios.get('https://api.hyunfit.life/routines/108').then(response => {
      const temp = [
        {
          type: 'INTRO',
          timerLimit: 999,
        },
        {
          type: 'WARMUP',
          name: '워밍업',
          timerLimit: 100,
          videoUrl: `${FILE_SERVER_BASE_URL}/api/hyunfit/file/warmingup.mp4`,
        },
      ]
      for (const exercise of response.data.exercises) {
        temp.push(createExerciseQueueItem(exercise, 'GUIDE'))
        temp.push(createExerciseQueueItem(exercise, 'EXERCISE'))
      }
      temp.push({
        type: 'EXIT',
        timerLimit: -1,
      })
      console.log('response', response)
      console.log('temp', temp)
      exerciseQueue.value = temp
    })
  } catch (error) {
    console.error('데이터를 가져오는 중 에러 발생 : ', error)
    alert('운동데이터 로딩 실패 ', error)
  }
}
</script>
<style scoped>
.info-container {
  background-color: rgb(102, 102, 102);
}

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

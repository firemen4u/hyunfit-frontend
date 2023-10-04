<template>
  <!--  <div class="fixed z-[1000] top-0 left-0 bg-[#FFFFFFBB]">-->
  <!--    <v-btn @click="timer.start(20)">Start</v-btn>-->
  <!--    <v-btn @click="timer.stop()">Stop</v-btn>-->
  <!--    <v-btn @click="timer.reset()">reset</v-btn>-->
  <!--    <v-btn @click="updateCount()">Update Count</v-btn>-->
  <!--    <v-btn @click="exitButton()">Exit</v-btn>-->
  <!--    <div class="md-2">현재 윈도우 옵션: {{ windowSize }}</div>-->
  <!--    <div class="md-2">현재 visible 옵션: {{ visibility }}</div>-->
  <!--    <div class="md-2">-->
  <!--      현재 Set: {{ setCount }} -&#45;&#45; setFinished : {{ setFinished }}-->
  <!--    </div>-->
  <!--    <div class="md-2">-->
  <!--      현재 운동: {{ currentExercise?.type }} -&#45;&#45; 현재 index: {{ currentIndex }}-->
  <!--    </div>-->
  <!--    <div class="md-2">-->
  <!--      현재 STATUS: {{ visibility }}-->
  <!--    </div>-->

  <!--    <div>TimeDelta: {{ timeDelta }} -&#45;&#45; 현재 시간: {{ timeLeft }}</div>-->
  <!--    <div>Break {{ breakTime }} || loading {{ loading }}</div>-->
  <!--    <div>exercise Count {{ setScoreCount }}</div>-->
  <!--    <div>pause Time {{ pauseTime }}</div>-->
  <!--  </div>-->
  <div v-show="initialLoading" class="initial-loader">
    <div
      class="initial-loader-content flex flex-col items-center justify-center"
    >
      <div>카메라를 로딩중이에요</div>
      <div class="mb-5">잠시만 기다려 주세요</div>

      <AiTrainingLoader :size="30" />
    </div>
  </div>
  <div v-show="!initialLoading" class="ai-training-container flex">
    <AITrainingMyVideo
      v-show="visibility.my"
      :loading="loading"
      :windowSize="windowSize.my"
      :exercise="currentExercise"
      :break-time="breakTime"
      :pause-time="pauseTime"
      :debug-mode="debugMode"
      @model:ready="onModelReady()"
      @model:init="initialLoading = false"
      @prediction="score => updateCount(score)"
      @distance:ok="toNextExercise()"
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
      :breakTime="breakTime"
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
      @event:exit="exit()"
      @event:toggle-debug="debugMode = !debugMode"
    ></a-i-training-bottom-bar>

    <AITrainingExit
      v-if="currentExercise?.type === 'EXIT'"
      :exitStatus="currentExercise"
    >
    </AITrainingExit>
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
import { BACKEND_API_BASE_URL, FILE_SERVER_BASE_URL } from '@/config'
import AITrainingExit from '@/module/ai-training/component/AITrainingExit.vue'
import { useRoute } from 'vue-router'
import router, { pathNames } from '@/router'
import AiTrainingLoader from '@/module/ai-training/component/AiTrainingLoader.vue'

const memberData = ref(null)
const rerenderKey = ref(0)
const exerciseQueue = ref(null)

// const exitTime = ref(false)

// const exitStatus = ref(false)
const loading = computed(() => {
  return (
    videoLoading.value ||
    (modelLoading.value &&
      typesToLoadModel.includes(currentExercise.value?.type))
  )
})

const videoLoading = ref(true)
const modelLoading = ref(true)

const initialLoading = ref(true)

const breakTime = ref(false)
const pauseTime = ref(false)
const setCount = ref(1)
const currentIndex = ref(0)
const startExerciseTime = ref(0)
const endExerciseTime = ref(0)
const setFinished = computed(
  () => setCount.value >= currentExercise.value?.setCount
)

const debugMode = ref(false)

const typesToLoadModel = ['INTRO', 'WARMUP', 'EXERCISE']

const route = useRoute()

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

function exit() {
  sendExerciseData()
}

function updateCount(scoreType) {
  if (setScoreCount.value < currentExercise.value.exerciseCount) {
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

    totalScoreCount.value = scores.excellent + scores.good + scores.bad
    setTimeout(() => {
      notification.value = ''
    }, 1000)
  }
}

function updateEvent() {}

function toggleTime() {
  if (timeDelta === 0) {
    timer.resume()
    pauseTime.value = false
  } else {
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
  try {
    await loadMemberData()
  } catch (e) {
    alert('로그인이 필요한 페이지입니다.')
    await router.push(pathNames.loginPage)
    return
  }
  try {
    await loadData()
  } catch (e) {
    await router.push(pathNames.aiTrainingErrorPage)
    return
  }
  setTimer()
  timer.stop()
  updateWindowUi()
}

function toNextExercise() {
  if (!currentExercise.value) return
  console.log('currentExercise', currentExercise.value)

  if (currentExercise.value.type === 'EXERCISE' && !setFinished.value) {
    if (breakTime.value) {
      startExerciseTime.value = Date.now()
      setCount.value += 1
      timer.start(currentExercise.value.timerLimit - 0.01)
      breakTime.value = false
    } else {
      endExerciseTime.value = Date.now()
      sendExerciseData()
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

  if (currentExercise.value.type === 'EXIT') {
    sendPointData()
  }
  updateWindowUi()
  videoLoading.value = true
  modelLoading.value = true
  console.log('set to loading')
  timer.stop()
}

async function sendPointData() {
  const memberPoint = {
    mbrSeq: memberData.value.mbrSeq,
    mevType: 2,
    mevAmount: rtnRewardPoint,
  }
  try {
    console.log('루틴 포인트 보내기', memberPoint)
    await ApiClient.post(`/member-event`, memberPoint)
  } catch (error) {
    console.log('루틴 포인트 데이터 전송 실패')
    alert('루틴 포인트 데이터 전송 실패')
  }
}

function onTeachingVideoReady() {
  videoLoading.value = false
  console.log('teachingvideo ready!')
  timer.start(currentExercise.value.timerLimit - 0.01)
}

function onModelReady() {
  modelLoading.value = false
  console.log('modelLoaded!')
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
    exchTotalCalories: currentExercise.value.calorie,
  }
  const exp =
    ((data.exchExcelentCnt * 1.2 + data.exchGoodCnt + data.exchBadCnt * 0.6) /
      currentExercise.value.calorie) *
    (data.exchExcelentCnt + data.exchGoodCnt + data.exchBadCnt)
  const memberExp = {
    mbrSeq: memberData.value.mbrSeq,
    mevType: 1,
    mevAmount: exp,
  }
  try {
    if (totalScoreCount.value !== 0) {
      await ApiClient.post(`/exercise-history`, data)
      await ApiClient.post(`/member-event`, memberExp)

      totalScoreCount.value = 0
      setScoreCount.value = 0

      scores.good = 0
      scores.excellent = 0
      scores.bad = 0
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
      visibility.skip = false
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
  item[
    'audioUrl'
  ] = `${FILE_SERVER_BASE_URL}/api/hyunfit/file/guide_message_${exercise.excSeq}.mp3`

  return item
}

let rtnRewardPoint = 0

async function loadMemberData() {
  memberData.value = await ApiClient.get('/members/me')
}

async function loadData() {
  let rtnSeq = route.query.rtnSeq
  if (!rtnSeq) {
    throw new Error('유효하지 않은 접근입니다. rtnSeq not found.')
  }

  try {
    await axios
      .get(`${BACKEND_API_BASE_URL}/routines/${rtnSeq}`)
      .then(response => {
        rtnRewardPoint = response.data.rtnRewardPoint
        document.title = `${response.data.rtnName} | 현핏`
        const temp = [
          {
            type: 'INTRO',
            timerLimit: 999,
            excSeq: 0,
          },
          {
            type: 'WARMUP',
            name: '워밍업',
            timerLimit: 100,
            videoUrl: `${FILE_SERVER_BASE_URL}/api/hyunfit/file/warmingup.mp4`,
            audioUrl: `${FILE_SERVER_BASE_URL}/api/hyunfit/file/warming_up_audio.mp3`,
            excSeq: 0,
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
        exerciseQueue.value = temp
      })
  } catch (error) {
    throw new Error(`운동데이터 로딩에 실패하였습니다. ${error}`)
  }
}
</script>
<style scoped>
.initial-loader {
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
}
.initial-loader-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.info-container {
  background-color: rgb(102, 102, 102);
}

.ai-training-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: azure;
}
</style>

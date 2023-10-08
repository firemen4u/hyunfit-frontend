<script setup>
import '@tensorflow/tfjs'
import * as tmPose from '@teachablemachine/pose'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { FILE_SERVER_BASE_URL } from '@/config'
import DebugProgressBar from '@/module/ai-training/component/DebugProgressBar.vue'

const BASEURL = `${FILE_SERVER_BASE_URL}/api/hyunfit/model`
let model, webcam, ctx, labelContainer, maxPredictions

let flag = false
const width = 1000
const height = 1000

const maxPredictionInterval = 50
const predictions = ref([])
const lastPredictionTime = ref(0)
const predictedProbability = ref(null)
const minExerciseDuration = 100
const emit = defineEmits([
  'prediction',
  'model:ready',
  'model:init',
  'distance:ok',
])
let distanceOkTimeout
const freezePrediction = computed(
  () =>
    props.loading ||
    props.exercise?.type !== 'EXERCISE' ||
    props.breakTime ||
    props.pauseTime
)
const motionCaptureScore = ref(0)
const notificationMessages = [
  `머리부터 발끝까지
  다 보고 싶어요`,
  `조금만 더 뒤로
  가볼까요?`,
  `완벽해요 지금 바로
  레디! 액션!`,
]
const notificationMessageIndex = ref(0)
const isDistanceOk = ref(false)
const distanceOkMessageTriggered = ref(false)

// const exerciseCounts = reactive({
//   excellent: ref(0),
//   good: ref(0),
//   bad: ref(0),
// })

const classLabels = ref([])

const props = defineProps({
  exercise: Object,
  loading: Boolean,
  windowSize: String,
  breakTime: Boolean,
  pauseTime: Boolean,
  debugMode: Boolean,
})

const typesToLoadModel = ['INTRO', 'WARMUP', 'EXERCISE']

// model and webcam Loader
watch(
  () => props.exercise,
  async exercise => {
    if (typesToLoadModel.includes(exercise.type)) {
      await loadModel(exercise)
      if (exercise.type === 'INTRO') {
        await loadWebcam()
        emit('model:init')
      }
      emit('model:ready')
    }
  }
)

watch(
  () => props.exercise,
  exercise => {
    if (exercise.type !== 'INTRO' && distanceOkTimeout) {
      clearTimeout(distanceOkTimeout)
      distanceOkTimeout = null
    }
  }
)

onBeforeUnmount(() => {
  if (model) {
    model = undefined
  }
  if (webcam) {
    webcam.stop()
  }
})

function triggerDistanceOkMessage() {
  notificationMessageIndex.value = 2
  distanceOkTimeout = setTimeout(() => {
    emit('distance:ok')
    distanceOkMessageTriggered.value = true
  }, 3000)
}

function cancelDistanceOk(score) {
  notificationMessageIndex.value = score < 0.5 ? 0 : 1
  if (!isDistanceOk.value) return
  isDistanceOk.value = false
  clearTimeout(distanceOkTimeout)
}

function emitCountEvent() {
  if (freezePrediction.value) return
  let type = getScoreType()
  emit('prediction', type)
}

async function loadModel(exercise) {
  const modelURL = `${BASEURL}/ai_model_${exercise.excSeq}/model.json`
  const metadataURL = `${BASEURL}/ai_model_${exercise.excSeq}/metadata.json`
  model = await tmPose.load(modelURL, metadataURL)
  maxPredictions = model.getTotalClasses()
  classLabels.value = model.getClassLabels()
}

async function loadWebcam() {
  const flip = true // whether to flip the webcam
  try {
    webcam = new tmPose.Webcam(width, height, flip) // width, height, flip
  } catch (e) {
    console.log(e)
    alert('카메라 로드 실패. 카메라가 사용중이거나 권한이 없습니다')
    return
  }
  await webcam.setup() // request access to the webcam
  await webcam.play()
  window.requestAnimationFrame(loop)

  // append/get elements to the DOM
  const canvas = document.getElementById('canvas')
  canvas.width = width
  canvas.height = height
  ctx = canvas.getContext('2d')
  labelContainer = document.getElementById('label-container')
  for (let i = 0; i < maxPredictions; i++) {
    // and class labels
    labelContainer.appendChild(document.createElement('div'))
  }
}

function getScoreType() {
  if (predictedProbability.value > 0.98) return 'excellent'
  if (predictedProbability.value > 0.92) return 'good'
  if (predictedProbability.value > 0.5) return 'bad'
}

function updatePredictedProbability(probability) {
  if (probability === -1) predictedProbability.value = -1
  predictedProbability.value = Math.max(predictedProbability.value, probability)
}

async function loop(timestamp) {
  webcam.update() // update the webcam frame
  await predict()
  window.requestAnimationFrame(loop)
}

async function predict() {
  // Prediction #1: run input through posenet
  // estimatePose can take in an image, video or canvas html element

  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas)

  // Prediction 2: run input through teachable machine classification model
  drawPose(pose)

  motionCaptureScore.value = pose ? pose.score : 0
  // if (freezePrediction.value) return)
  if (!pose || pose.score < 0.8 || freezePrediction.value) {
    predictions.value = []
    return
  }

  const currentTime = new Date().getTime()

  if (currentTime - lastPredictionTime.value < maxPredictionInterval) return

  // 자세 예측
  predictions.value = await model.predict(posenetOutput)

  if (predictions.value.length !== maxPredictions) return

  let pred
  // 올바른 자세 찾기
  for (let i = 0; i < maxPredictions; i++) {
    if (predictions.value[i].className.startsWith('1')) {
      pred = predictions.value[i]
      break
    }
  }
  if (!pred) return
  // 올바른 자세일 확률이 50% 이상일 경우
  if (pred.probability > 0.5) {
    if (!flag) {
      flag = true
      lastPredictionTime.value = currentTime
    }
    updatePredictedProbability(pred.probability)
    return
  }
  // 일반 자세라면
  if (flag && currentTime - lastPredictionTime.value >= minExerciseDuration) {
    //일반 자세인데, flag가 켜져 있었고 충분한 시간이 지났다면
    // exerciseCounts[getScoreType()] += 1
    emitCountEvent()
  } else {
    flag = false
    updatePredictedProbability(-1)
  }
  lastPredictionTime.value = currentTime
}

function getColorFromPoseScore(score) {
  if (props.exercise.type === 'INTRO') {
    if (score < 0.9) {
      cancelDistanceOk(score)
      return '#e70000'
    }

    if (!isDistanceOk.value) {
      isDistanceOk.value = true
      triggerDistanceOkMessage()
    }
    return '#00c700'
  }
  if (score > 0.9) return '#FFFFFF'
  else return '#bababa'
}

function drawPose(pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0)
    // draw the keypoints and skeleton
    if (pose) {
      let drawColor = getColorFromPoseScore(pose.score)
      const minPartConfidence = 0.5
      tmPose.drawKeypoints(
        pose.keypoints,
        minPartConfidence,
        ctx,
        10,
        drawColor + 'BB',
        drawColor
      )
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx, 7, drawColor)
    }
  }
}
</script>

<template>
  <div class="my-video" :class="windowSize">
    <div
      v-if="props.debugMode && exercise.type === 'EXERCISE'"
      class="fixed px-3 py-3 z-[1000] w-[400px] top-[5%] left-[40%] bg-[#FFFFFFEE] rounded-lg"
    >
      <DebugProgressBar
        :labels="classLabels"
        :predictions="predictions"
        :score="motionCaptureScore"
      />
    </div>

    <div
      class="notification-card"
      v-if="!distanceOkMessageTriggered && props.exercise?.type === 'INTRO'"
    >
      <div class="notification-card-content">
        {{ notificationMessages[notificationMessageIndex] }}
      </div>
    </div>
    <canvas id="canvas" style="width: 100%; height: 100%"></canvas>
    <div id="label-container"></div>
  </div>
</template>

<style scoped>
#canvas {
  display: block;
  aspect-ratio: auto 1280 / 720;
  overflow-clip-margin: content-box;
  overflow: clip;
}

.notification-card {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100px;

  background-color: rgba(0, 0, 0, 0.75);
}

.notification-card-content {
  padding: 16px 44px;
  color: transparent;
  font-size: 60px;
  line-height: 78px;
  font-weight: 900;
  text-align: center;
  background: white;
  -webkit-background-clip: text;
  background-clip: text;
  white-space: pre-line;
}
</style>

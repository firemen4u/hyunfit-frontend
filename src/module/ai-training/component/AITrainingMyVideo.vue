<template>
  <div class="my-video bg-orange-200" :class="windowSize">
    <div class="fixed z-[1000] top-0 left-0 bg-[#FFFFFFBB]">
      <div
          class="md-2"
          :class="
          predictions[0]?.probability > 0.5 ? 'bg-red-500 text-white' : ''
        "
      >
        기본자세: {{ predictions[0]?.className }}:
        {{ Math.round(predictions[0]?.probability * 100) }}%
      </div>
      <div
          class="md-2"
          :class="
          predictions[1]?.probability > 0.5 ? 'bg-red-500 text-white' : ''
        "
      >
        운동자세: {{ predictions[1]?.className }}:
        {{ Math.round(predictions[1]?.probability * 100) }}%
      </div>
      <div>flag: {{ flag }}</div>
      <div>Count: {{ exerciseCounts }}</div>
      <div>확률: {{ predictedProbability }}</div>
      <div>인정된 자세: {{ getScoreType() }}</div>
      <div>
        쿨다운:
        {{ Math.max(minExerciseDuration - Date.now() + lastPredictionTime, 0) }}
      </div>
    </div>
    <canvas id="canvas" style="width: 100%; height: 100%"></canvas>
    <div id="label-container"></div>
  </div>
</template>

<style scoped>
canvas {
}
canvas video {
}
</style>

<script setup>
import '@tensorflow/tfjs'
import * as tmPose from '@teachablemachine/pose'
import { onMounted, reactive, ref } from 'vue'
import { FILE_SERVER_BASE_URL } from '@/config'

const BASEURL = `${FILE_SERVER_BASE_URL}/api/hyunfit/model`
let model, webcam, ctx, labelContainer, maxPredictions

const excSeq = 83
const modelName = `ai_model_${excSeq}`

let flag = false
const width = 1000
const height = 1000

const maxPredictionInterval = 100
const predictions = ref([])
const lastPredictionTime = ref(0)
const predictedProbability = ref(null)
const minExerciseDuration = 500
const emit = defineEmits(['prediction'])

const exerciseCounts = reactive({
  excellent: ref(0),
  good: ref(0),
  bad: ref(0),
})

const props = defineProps({
  exerciseData: Object,
  loading: Boolean,
  windowSize: String,
})

onMounted(() => {
  init()
})

function emitCountEvent() {
  console.log('counted')
  let type = getScoreType()
  emit('prediction', type)
}

async function loadModel() {
  const modelURL = `${BASEURL}/${modelName}/model.json`
  const metadataURL = `${BASEURL}/${modelName}/metadata.json`
  model = await tmPose.load(modelURL, metadataURL)
}
async function init() {
  await loadModel()
  maxPredictions = model.getTotalClasses()

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
  if (predictedProbability.value > 0.95) return 'excellent'
  if (predictedProbability.value > 0.5) return 'good'
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
  const currentTime = new Date().getTime()

  drawPose(pose)

  if (currentTime - lastPredictionTime.value < maxPredictionInterval) return

  // 자세 예측
  predictions.value = await model.predict(posenetOutput)
  if (predictions.value.length !== maxPredictions) return

  let pred
  for (let i = 0; i < maxPredictions; i++) {
    if (predictions.value[i].probability > 0.7) {
      pred = predictions.value[i]
      break
    }
  }
  if (!pred) return

  // 예측한 자세가 올바른 자세라면
  if (pred.className.startsWith('1')) {
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
    emitCountEvent(predictedProbability.value)
  } else {
    flag = false
    updatePredictedProbability(-1)
  }

  lastPredictionTime.value = currentTime
}

function drawPose(pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0)
    // draw the keypoints and skeleton
    if (pose) {
      const minPartConfidence = 0.5
      tmPose.drawKeypoints(
          pose.keypoints,
          minPartConfidence,
          ctx,
          10,
          '#FFFFFFBB',
          '#FFFFFF'
      )
      tmPose.drawSkeleton(
          pose.keypoints,
          minPartConfidence,
          ctx,
          10,
          '#ffffffBB'
      )
    }
  }
}
</script>

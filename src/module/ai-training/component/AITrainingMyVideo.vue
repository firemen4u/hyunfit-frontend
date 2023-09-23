<template>
  <div class="my-video bg-orange-200" :class="windowSize">
    <canvas id="canvas" style="width: 100%; height: 100%"></canvas>
    <div id="label-container"></div>
  </div>
</template>

<style scoped>
canvas {
  //object-fit: cover;
  //aspect-ratio: auto 1280 / 720;
  //overflow-clip-margin: content-box;
  //overflow: clip;
}
canvas video {
  object-fit: cover;
}
</style>

<script setup>
import '@tensorflow/tfjs'
import * as tmPose from '@teachablemachine/pose'
import { onMounted, ref } from 'vue'

const URL = 'https://fs.hyunfit.life/api/firemen/model/'
let model, webcam, ctx, labelContainer, maxPredictions

let flag = false
const width = 1000
const height = 1000
const minSquatDuration = 0
const maxPredictionInterval = 300
const modelName = 'squat'

const lastPredictionTime = ref(0)
const lastSquatStartTime = ref(0)

const emit = defineEmits([])

const props = defineProps({
  exerciseData: Object,
  loading: Boolean,
  windowSize: String,
})

onMounted(() => {
  init()
})
async function init() {
  const modelURL = URL + modelName + '/model.json'
  const metadataURL = URL + modelName + '/metadata.json'
  model = await tmPose.load(modelURL, metadataURL)
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
  if (currentTime - lastPredictionTime.value >= maxPredictionInterval) {
    // 자세 예측
    let prediction = await model.predict(posenetOutput)

    // 자세 확률 출력
    for (let i = 0; i < maxPredictions; i++) {
      labelContainer.childNodes[i].innerHTML =
        prediction[i].className + ': ' + prediction[i].probability.toFixed(2)

      if (prediction[i].className.startsWith('1')) {
        if (!flag && prediction[i].probability > 0.9) {
          flag = true
          lastSquatStartTime.value = currentTime
        }
      } else if (prediction[i].probability > 0.9) {
        if (
          flag &&
          currentTime - lastSquatStartTime.value >= minSquatDuration
        ) {
          emit('squatsCountUpdated')
        }
        flag = false
      }
    }

    lastPredictionTime.value = currentTime
  }

  // finally draw the poses
  drawPose(pose)
}

function drawPose(pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0)
    // draw the keypoints and skeleton
    if (pose) {
      const minPartConfidence = 0.5
      tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx)
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx)
    }
  }
}
</script>

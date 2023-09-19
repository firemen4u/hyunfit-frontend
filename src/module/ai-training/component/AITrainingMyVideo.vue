<template>
  <div
    class="my-video bg-orange-200"
    :class="progressQueue?.myVideoWidth === 'FULL' ? 'w-full' : 'w-1/2'"
  >
    <canvas id="canvas" style="width: 100%; height: 100%"></canvas>
    <div id="label-container"></div>
  </div>
</template>
<script>
import '@tensorflow/tfjs'
import * as tmPose from '@teachablemachine/pose'

const URL = 'https://fs.hyunfit.life/api/firemen/model/'
let model, webcam, ctx, labelContainer, maxPredictions

let flag = false

const minSquatDuration = 0
const maxPredictionInterval = 300
const modelName = 'squat'

export default {
  data() {
    return {
      squatsCount: 0,
      lastPredictionTime: 0,
      lastSquatStartTime: 0,
    }
  },
  props: {
    progressQueue: Object,
  },
  mounted() {
    console.log('myvideo mounted')
    this.init()
  },
  methods: {
    async init() {
      console.log('myvideo init', modelName)

      const modelURL = URL + modelName + '/model.json'
      const metadataURL = URL + modelName + '/metadata.json'
      console.log('--------init', modelURL)
      model = await tmPose.load(modelURL, metadataURL)
      console.log(tmPose)
      maxPredictions = model.getTotalClasses()

      // Convenience function to setup a webcam
      const size = 1000
      const flip = true // whether to flip the webcam
      webcam = new tmPose.Webcam(size, size, flip) // width, height, flip
      await webcam.setup() // request access to the webcam
      await webcam.play()
      window.requestAnimationFrame(this.loop)

      // append/get elements to the DOM
      const canvas = document.getElementById('canvas')
      canvas.width = size
      canvas.height = size
      ctx = canvas.getContext('2d')
      labelContainer = document.getElementById('label-container')
      for (let i = 0; i < maxPredictions; i++) {
        // and class labels
        labelContainer.appendChild(document.createElement('div'))
      }
    },

    async loop(timestamp) {
      webcam.update() // update the webcam frame
      await this.predict()
      window.requestAnimationFrame(this.loop)
    },

    async predict() {
      // Prediction #1: run input through posenet
      // estimatePose can take in an image, video or canvas html element

      const { pose, posenetOutput } = await model.estimatePose(webcam.canvas)

      // Prediction 2: run input through teachable machine classification model
      const currentTime = new Date().getTime()
      if (currentTime - this.lastPredictionTime >= maxPredictionInterval) {
        // 자세 예측
        let prediction = await model.predict(posenetOutput)

        // 자세 확률 출력
        for (let i = 0; i < maxPredictions; i++) {
          const classPrediction =
            prediction[i].className +
            ': ' +
            prediction[i].probability.toFixed(2)
          labelContainer.childNodes[i].innerHTML = classPrediction

          if (prediction[i].className.startsWith('1')) {
            if (!flag && prediction[i].probability > 0.9) {
              console.log(
                'flag set!',
                prediction[i].className,
                prediction[i].probability
              )
              flag = true
              this.lastSquatStartTime = currentTime
            }
          } else if (prediction[i].probability > 0.9) {
            console.log(
              '기본자세',
              currentTime - this.lastSquatStartTime,
              currentTime - this.lastSquatStartTime >= minSquatDuration
            )
            if (
              flag &&
              currentTime - this.lastSquatStartTime >= minSquatDuration
            ) {
              this.squatsCount++
              this.$emit('squatsCountUpdated', this.squatsCount)
              console.log(`스쿼트 ${this.squatsCount}회 수행됨`)
            }
            flag = false
          }
        }

        this.lastPredictionTime = currentTime
      }

      // finally draw the poses
      this.drawPose(pose)
    },

    drawPose(pose) {
      if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0)
        // draw the keypoints and skeleton
        if (pose) {
          const minPartConfidence = 0.5
          tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx)
          tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx)
        }
      }
    },
  },
}
</script>
<style scoped></style>

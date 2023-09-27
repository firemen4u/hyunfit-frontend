<template>
  <div v-show="!loading" class="teaching-video bg-white" :class="windowSize">
    <video
        :key="props.exercise.videoUrl"
        ref="videoElement"
        @loadeddata="onTeachingVideoReady()"
        preload="auto"
        style="width: 100%; height: 100%; object-fit: cover; border-radius: 0"
        @error="alert('Video 로드 실패 ' + props.exercise.videoUrl)"
    >
      <source :src="props.exercise.videoUrl"/>
    </video>
    <audio
        :key="props.exercise.audioUrl"
        ref="audioElement"
        preload="auto"
        loop
        autoplay
        @error="alert('Sound 로드 실패 ' + props.exercise.audioUrl)"
    />
  </div>
</template>
<script setup>
import {ref, watch} from 'vue'

const videoElement = ref(null)
const audioElement = ref(null)
const props = defineProps({
  loading: Boolean,
  windowSize: String,
  exercise: Object,
  breakTime: Boolean,
  videoUrl: String,
  pauseTime: Boolean,
  audioUrl: String,
})
const emit = defineEmits(['event:ready', 'event:start'])

watch(
    () => props.breakTime,
    newVal => {
      if (newVal === true) {
        videoElement.value.pause()
      } else {
        videoElement.value.currentTime = 0
        videoElement.value.play()
      }
    }
)

watch(
    () => props.pauseTime,
    newVal => {
      if (newVal === true) {
        videoElement.value.pause()
      } else {
        videoElement.value.play()
      }
    }
)

function onTeachingVideoReady() {
  setTimeout(() => {
    audioElement.value.play()
    videoElement.value.play()
    emit('event:ready')
  }, 1000)
}
</script>

<style scoped></style>

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
        @error="alert('Sound 로드 실패 ' + props.exercise.audioUrl)"
    >
      <source :src="props.exercise.audioUrl"/>
    </audio>
    <audio
        :key="props.exercise.bgmUrl"
        ref="bgmElement"
        preload="auto"
        @error="alert('Sound 로드 실패 ' + props.exercise.bgmUrl)"
    >
      <source :src="props.exercise.bgmUrl"/>
    </audio>
  </div>
</template>
<script setup>
import {ref, watch} from 'vue'

const videoElement = ref(null)
const audioElement = ref(null)
const bgmElement = ref(null)

const props = defineProps({
  loading: Boolean,
  windowSize: String,
  exercise: Object,
  breakTime: Boolean,
  videoUrl: String,
  pauseTime: Boolean,
})
const emit = defineEmits(['event:ready', 'event:start'])


watch(
    () => props.breakTime,
    newVal => {
      if (newVal === true) {
        videoElement.value.pause()
        audioElement.value.pause();
        bgmElement.value.pause();
      } else {
        videoElement.value.currentTime = 0
        videoElement.value.play()
        audioElement.value.play();
        bgmElement.value.play();
      }
    }
)

watch(
    () => props.pauseTime,
    newVal => {
      if (newVal === true) {
        videoElement.value.pause()
        audioElement.value.pause();
        bgmElement.value.pause();
      } else {
        videoElement.value.play()
        audioElement.value.play();
        bgmElement.value.play();
      }
    }
)

function onTeachingVideoReady() {
  setTimeout(() => {
    videoElement.value.play()
    emit('event:ready')
  }, 1000)
  console.log('audio 찾기 - in teaching video', props.exercise.audioUrl)
  audioElement.value.play()
  setTimeout(() => {
    console.log('bgm 실행 - after delay');
    bgmElement.value.volume = 0.3
    bgmElement.value.play();
    emit('event:ready')

  }, 10000);
}
</script>

<style scoped></style>

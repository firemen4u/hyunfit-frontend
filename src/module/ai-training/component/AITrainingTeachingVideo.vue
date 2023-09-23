<template>
  <div v-show="!loading" class="teaching-video bg-white" :class="windowSize">
    <video
      :key="props.videoUrl"
      ref="videoElement"
      @loadeddata="onTeachingVideoReady()"
      preload="auto"
      style="width: 100%; height: 100%; object-fit: cover; border-radius: 0"
    >
      <source :src="videoUrl" />
    </video>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'

const videoElement = ref(null)
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
    videoElement.value.play()
    emit('event:ready')
  }, 1000)
}
</script>

<style scoped></style>

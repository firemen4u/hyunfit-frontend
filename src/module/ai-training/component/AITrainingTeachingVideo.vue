<template>
  <div v-show="!loading" class="teaching-video bg-white" :class="windowSize">
    <video
      :key="props.exercise.videoUrl"
      ref="videoElement"
      @canplaythrough="onTeachingVideoReady()"
      preload="auto"
      style="width: 100%; height: 100%; object-fit: cover; border-radius: 0"
      @error="alert('Video 로드 실패 ' + props.exercise.videoUrl)"
      loop
      disablePictureInPicture
    >
      <source :src="props.exercise.videoUrl" />
    </video>
    <audio
      :key="props.exercise.audioUrl"
      ref="audioElement"
      preload="auto"
      @ended="onAudioEnded()"
      @error="alert('Sound 로드 실패 ' + props.exercise.audioUrl)"
    >
      <source :src="props.exercise.audioUrl" />
    </audio>
    <audio
      v-if="bgmUrl"
      :key="bgmUrl"
      ref="bgmElement"
      preload="auto"
      @canplaythrough="onBgmLoaded()"
      @ended="playNextBgm()"
      @error="alert('Sound 로드 실패 ' + bgmUrl)"
    >
      <source :src="bgmUrl" />
    </audio>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { FILE_SERVER_BASE_URL } from '@/config'

const loaded = ref(false)

const videoElement = ref(null)
const audioElement = ref(null)
const bgmElement = ref(null)
const bgmUrl = computed(() => {
  if (!bgmList.value[bgmIdx.value]) return null
  return `${FILE_SERVER_BASE_URL}/api/hyunfit/file/bgm${
    bgmList.value[bgmIdx.value]
  }.mp3`
})
const bgmList = ref([])
const bgmIdx = ref(0)

const audioEnded = ref(false)
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
  () => props.exercise,
  newVal => {
    loaded.value = false
  }
)
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
      bgmElement.value.pause()
    } else {
      videoElement.value.play()
      bgmElement.value.play()
    }
  }
)

onMounted(() => {
  let numbers = []
  for (let i = 1; i <= 20; i++) {
    numbers.push(i)
  }

  let newnum = []
  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length)
    const randomNum = numbers.splice(randomIndex, 1)[0]
    newnum.push(randomNum)
  }
  bgmList.value = newnum
})
function playNextBgm() {
  bgmIdx.value += 1
}

function onAudioEnded() {
  audioEnded.value = true
  bgmElement.value.volume = 0.2
  bgmElement.value.play()
}

function onBgmLoaded() {
  bgmElement.value.play()
}

function onTeachingVideoReady() {
  if (loaded.value) return
  setTimeout(() => {
    videoElement.value.play()
    if (props.exercise.type === 'GUIDE' || props.exercise.type === 'WARMUP') {
      audioElement.value.play()
      bgmElement.value.play()
      bgmElement.value.volume = 0.1
    }
    console.log('send event ready')
    emit('event:ready')
  }, 1000)
  loaded.value = true
}
</script>

<style scoped></style>

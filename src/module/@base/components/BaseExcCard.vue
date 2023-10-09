<template>
  <div class="exc-card flex flex-col shadow-md rounded-lg bg-white">
    <div class="flex justify-center">
      <video
        ref="videoRef"
        loop
        muted
        class="exc-img rounded-md"
        @mouseenter="playVideo"
        @mouseleave="pauseVideo"
        disablePictureInPicture
      >
        <source :src="videoSrc" />
      </video>
    </div>
    <div class="exc-name mt-2 font-extrabold text-lg">
      {{ exercise.excName }}
    </div>
    <div class="exc-content flex flex-wrap text-sm">
      {{ exercise.excContent }}
    </div>
  </div>
</template>

<script setup>
import { FILE_SERVER_HYUNFIT_URL } from '/src/config.js'
import { computed, ref } from 'vue'

const props = defineProps({
  exercise: Object,
})

const videoRef = ref(null) // 비디오 요소에 대한 참조

const videoSrc = computed(
  () =>
    `${FILE_SERVER_HYUNFIT_URL}/low_quality_preview_video_${props.exercise.excSeq}.mp4`
)
// 마우스를 올렸을 때 비디오를 재생하는 함수
const playVideo = () => {
  videoRef.value.play()
}

// 마우스를 벗어났을 때 비디오를 일시 중지하는 함수
const pauseVideo = () => {
  videoRef.value.pause()
}
</script>

<style scoped>
.exc-card {
  width: 295px;
  height: 290px;
  padding: 16px;
  margin: 5px;
}
.exc-img {
  max-width: 100%;
}
.exc-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
/* .exc-content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
} */
</style>

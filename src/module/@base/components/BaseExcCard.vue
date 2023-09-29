<template>
  <div class="exc-card flex flex-col shadow-md rounded-lg bg-white">
    <div class="flex justify-center">
      <video loop muted autoplay class="exc-img rounded-md">
        <source :src="videoSrc" />
      </video>
    </div>
    <div class="exc-name mt-2 font-extrabold text-xl">
      {{ exercise.excName }}
    </div>
    <div class="exc-content flex flex-wrap">{{ exercise.excContent }}</div>
  </div>
</template>

<script setup>
import { FILE_SERVER_HYUNFIT_URL } from '/src/config.js'
import { computed } from 'vue'

const props = defineProps({
  exercise: Object,
})

const videoSrc = computed(
  () =>
    `${FILE_SERVER_HYUNFIT_URL}/low_quality_preview_video_${props.exercise.excSeq}.mp4`
)
</script>

<style scoped>
.exc-card {
  width: 295px;
  height: 290px;
  padding: 20px;
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

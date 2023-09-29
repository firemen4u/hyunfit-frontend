<template>
  <div
    class="exc-card flex shadow-md rounded-lg hover:bg-gray-100 w-[1000px] cursor-pointer"
    @click="handleClick"
  >
    <div class="exc-name font-extrabold w-[150px]">{{ exercise.excName }}</div>
    <p class="px-2">|</p>
    <div class="exc-content">{{ exercise.excContent }}</div>
  </div>
</template>

<script setup>
import { FILE_SERVER_HYUNFIT_URL } from '/src/config.js'
import { computed } from 'vue'
const props = defineProps({
  exercise: Object,
})

const emit = defineEmits([])

const handleClick = () => {
  emit('openModal', props.exercise)
}

// 계산된 속성을 사용하여 비디오 URL을 생성
const videoSrc = computed(
  () =>
    `${FILE_SERVER_HYUNFIT_URL}/low_quality_preview_video_${props.exercise.excSeq}.mp4`
)
</script>

<style scoped>
.exc-card {
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
.exc-content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>

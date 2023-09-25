<template>
  <div
    class="exc-card flex flex-col shadow-md rounded-lg hover:translate-y-[-10px] hover:bg-gray-100"
    @click="handleClick"
  >
    <div>
      <video controls loop muted autoplay class="exc-img">
        <source :src="videoSrc" />
      </video>
    </div>
    <div class="exc-name">운동 이름 : {{ exercise.excName }}</div>
    <div class="exc-content">운동 설명 : {{ exercise.excContent }}</div>
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
  width: 200px;
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
